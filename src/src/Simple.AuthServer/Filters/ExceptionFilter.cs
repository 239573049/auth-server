using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Simple.Filters;

public class ExceptionFilter : IAsyncExceptionFilter
{
    public async Task OnExceptionAsync(ExceptionContext context)
    {
        await Task.CompletedTask;
    }
}