using Microsoft.Extensions.Localization;
using Simple.Application.Contract.Permissions;
using Simple.Application.Contract.Permissions.Dto;
using Simple.Localization;
using Volo.Abp.Application.Services;
using Volo.Abp.ObjectMapping;
using Volo.Abp.PermissionManagement;

namespace Simple.Application.Permissions;

//[Authorize(Roles = "admin")]
/// <inheritdoc />
public class PermissionsService : ApplicationService , IPermissionsService
{
    private readonly IPermissionManager _permissionManager;

    private readonly IStringLocalizer<PermissionsResource> L;
    public PermissionsService(IPermissionManager permissionManager, IStringLocalizer<PermissionsResource> localizer)
    {
        _permissionManager = permissionManager;
        L = localizer;
    }


    /// <inheritdoc />
    public async Task PutForRoleAsync(List<AddPermissionsInput> inputs)
    {
        foreach (var input in inputs)
        {
            await _permissionManager.SetForRoleAsync(input.RoleName, input.Name, input.IsGranted);
        }
    }

    /// <inheritdoc />
    public async Task<List<PermissionWithGrantedDto>> GetAllForRoleAsync(string providerKey)
    {
        // 获取指定角色的权限配置
        var data = await _permissionManager.GetAllAsync("R", providerKey);

        // 转换实体
        var dto = ObjectMapper.Map<List<PermissionWithGrantedProviders>, List<PermissionWithGrantedDto>>(data);

        // 将本地化描述添加到实体
        dto.ForEach(x => x.Description = L[x.Name]);

        return dto;

    }
}