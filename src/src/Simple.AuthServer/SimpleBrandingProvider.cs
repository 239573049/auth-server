using Volo.Abp.Ui.Branding;
using Volo.Abp.DependencyInjection;

namespace Simple;

[Dependency(ReplaceServices = true)]
public class SimpleBrandingProvider : DefaultBrandingProvider
{
    public override string AppName => "Simple";
}
