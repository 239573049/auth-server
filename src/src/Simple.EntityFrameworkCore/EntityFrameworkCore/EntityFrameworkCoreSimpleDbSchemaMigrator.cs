using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Simple.Data;
using Volo.Abp.DependencyInjection;

namespace Simple.EntityFrameworkCore;

public class EntityFrameworkCoreSimpleDbSchemaMigrator
    : ISimpleDbSchemaMigrator, ITransientDependency
{
    private readonly IServiceProvider _serviceProvider;

    public EntityFrameworkCoreSimpleDbSchemaMigrator(
        IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public async Task MigrateAsync()
    {
        await _serviceProvider
            .GetRequiredService<SimpleDbContext>()
            .Database
            .MigrateAsync();
    }
}
