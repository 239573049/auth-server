using System.Threading.Tasks;

namespace Simple.Data;

public interface ISimpleDbSchemaMigrator
{
    Task MigrateAsync();
}
