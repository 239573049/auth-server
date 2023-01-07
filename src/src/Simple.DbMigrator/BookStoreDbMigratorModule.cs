using Simple.Application.Contract;
using Simple.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.Modularity;

namespace Simple.DbMigrator;

[DependsOn(
    typeof(AbpAutofacModule),
    typeof(SimpleEntityFrameworkCoreModule),
    typeof(SimpleApplicationContractModule)
    )]
public class BookStoreDbMigratorModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        Configure<AbpBackgroundJobOptions>(options => options.IsJobExecutionEnabled = false);
    }
}
