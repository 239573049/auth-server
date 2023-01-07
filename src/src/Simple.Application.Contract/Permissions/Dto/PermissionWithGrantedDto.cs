namespace Simple.Application.Contract.Permissions.Dto;

public class PermissionWithGrantedDto
{
    /// <summary>
    /// 权限名称
    /// </summary>
    public string Name { get; set; }

    /// <summary>
    /// 是否授权
    /// </summary>
    public bool IsGranted { get; set; }

    /// <summary>
    /// 描述
    /// </summary>
    public string Description { get; set; }
}