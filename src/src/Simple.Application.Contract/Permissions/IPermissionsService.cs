using Simple.Application.Contract.Permissions.Dto;

namespace Simple.Application.Contract.Permissions;

/// <summary>
/// 权限设置
/// </summary>
public interface IPermissionsService
{
    /// <summary>
    /// 添加角色授权
    /// </summary>
    /// <param name="inputs"></param>
    /// <returns></returns>
    Task PutForRoleAsync(List<AddPermissionsInput> inputs);

    /// <summary>
    /// 获取角色权限设置
    /// </summary>
    /// <param name="providerKey">角色Code</param>
    /// <returns></returns>
    Task<List<PermissionWithGrantedDto>> GetAllForRoleAsync(string providerKey);
}