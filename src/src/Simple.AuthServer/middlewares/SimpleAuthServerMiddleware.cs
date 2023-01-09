using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Simple.Middlewares;

public class SimpleAuthServerMiddleware : IMiddleware
{
    private static Dictionary<string, string> _contentTypes = new()
    {
        { ".html", "text/html; charset=utf-8" },
        { ".css", "text/css; charset=utf-8" },
        { ".js", "application/javascript" },
        { ".png", "image/png" },
        { ".svg", "image/svg+xml" },
        { ".json", "application/json;charset=utf-8" },
        { ".ico", "image/x-icon" }
    };

    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        await next(context);

        if (context.Response.StatusCode == 404 || context.Request.Path.Value == "/")
        {
            if ((!context.Request.Path.ToString().StartsWith("/api") &&
                !context.Request.Path.Value.StartsWith("/connect")) || context.Request.Path.Value == "/")
            {
                var extType = Path.GetExtension(context.Request.Path);
                context.Response.StatusCode = 200;
                if (_contentTypes.TryGetValue(extType, out var contentType))
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
            // 由于openiddict的实现是重定向 这个修改状态码
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
                // 测试环境需要替换url
                context.Response.Headers["Location"] = location.Replace("https://localhost:44322", "http://localhost:8000");
            }

#endif
        }
    }
}