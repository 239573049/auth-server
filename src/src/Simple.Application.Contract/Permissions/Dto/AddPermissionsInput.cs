namespace Simple.Application.Contract.Permissions.Dto;

public class AddPermissionsInput
{
    /// <summary>
    /// 角色名称
    /// </summary>
    public string RoleName { get; set; }

    /// <summary>
    /// 授权权限名称
    /// </summary>
    public string Name { get; set; }

    /// <summary>
    /// 是否授权
    /// </summary>
    public bool IsGranted { get; set; }
}