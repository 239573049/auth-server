using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Serilog;
using Serilog.Events;

namespace Simple;

public class Program
{
    private static Dictionary<string, string> _contentTypes = new Dictionary<string, string>
    {
        { ".html", "text/html; charset=utf-8" },
        { ".css", "text/css; charset=utf-8" },
        { ".js", "application/javascript" },
        { ".png", "image/png" },
        { ".svg", "image/svg+xml" },
        { ".json", "application/json;charset=utf-8" },
        { ".ico", "image/x-icon" }
    };

    public static async Task<int> Main(string[] args)
    {
        Log.Logger = new LoggerConfiguration()
#if DEBUG
            .MinimumLevel.Debug()
#else
            .MinimumLevel.Information()
#endif
            .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
            .MinimumLevel.Override("Microsoft.EntityFrameworkCore", LogEventLevel.Warning)
            .Enrich.FromLogContext()
            .WriteTo.Async(c => c.File("Logs/logs.txt"))
            .WriteTo.Async(c => c.Console())
            .CreateLogger();

        try
        {
            Log.Information("Starting Simple.AuthServer.");
            var builder = WebApplication.CreateBuilder(args);
            builder.Host.AddAppSettingsSecretsJson()
                .UseAutofac()
                .UseSerilog();
            await builder.AddApplicationAsync<SimpleAuthServerModule>();
            var app = builder.Build();
            app.Use(async (context, next) =>
            {
                await next(context);

                if (context.Response.StatusCode == 404)
                {
                    if (File.Exists(Path.Combine(AppContext.BaseDirectory, "wwwroot", "index.html")) &&
                        !context.Request.Path.ToString().StartsWith("/api") &&
                        !context.Request.Path.Value.StartsWith("/connect"))
                    {
                        var extType = Path.GetExtension(context.Request.Path);
                        if (_contentTypes.TryGetValue(extType, out string contentType))
                        {
                            context.Response.ContentType = contentType;
                        }
                        else
                        {
                            context.Response.ContentType = "text/html; charset=utf-8";
                        }

                        var bytes = await File.ReadAllBytesAsync(Path.Combine(AppContext.BaseDirectory, "wwwroot",
                            "index.html"));
                        await context.Response.BodyWriter.WriteAsync(bytes);
                    }
                }
                else if (context.Response.StatusCode == 302)
                {
                    if (context.User.Identity?.IsAuthenticated == true)
                    {
                        context.Response.StatusCode = 403;
                    }
                    else
                    {
                        context.Response.StatusCode = 401;
                    }
                }
                else
                {
#if DEBUG
                    var location = context.Response.Headers.GetOrDefault("Location").FirstOrDefault();
                    if (!string.IsNullOrEmpty(location))
                    {
                        location = location.Replace("https://localhost:44322", "http://localhost:8000");
                        context.Response.Headers["Location"] = location;
                    }

#endif
                }
            });
            await app.InitializeApplicationAsync();
            await app.RunAsync();


            return 0;
        }
        catch (Exception ex)
        {
            Log.Fatal(ex, "Simple.AuthServer terminated unexpectedly!");
            return 1;
        }
        finally
        {
            Log.CloseAndFlush();
        }
    }
}