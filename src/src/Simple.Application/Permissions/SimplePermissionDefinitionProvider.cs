using Simple.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;

namespace Simple.Application.Permissions;

public class SimplePermissionDefinitionProvider : PermissionDefinitionProvider
{
    public override void Define(IPermissionDefinitionContext context)
    {
        var simple = context.AddGroup(SimplePermissions.Simple);

        // 添加openiddictApplication权限策略
        var openiddictApplication =  simple.AddPermission(SimplePermissions.OpenIddictApplication.Default, L(SimplePermissions.OpenIddictApplication.Default));

        // 添加openiddictApplication子权限策略
        openiddictApplication.AddChild(SimplePermissions.OpenIddictApplication.List, L(SimplePermissions.OpenIddictApplication.List));
        openiddictApplication.AddChild(SimplePermissions.OpenIddictApplication.Update, L(SimplePermissions.OpenIddictApplication.Update));
    }

    private static LocalizableString L(string name)
    {
        return LocalizableString.Create<PermissionsResource>(name);
    }
}
