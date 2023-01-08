using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Serilog;
using Serilog.Events;
using Simple.Middlewares;
using System;
using System.Threading.Tasks;

namespace Simple;

public class Program
{

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
            
            builder.Services.AddTransient<SimpleAuthServerMiddleware>();

            await builder.AddApplicationAsync<SimpleAuthServerModule>();
            var app = builder.Build();
            app.UseMiddleware<SimpleAuthServerMiddleware>();

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