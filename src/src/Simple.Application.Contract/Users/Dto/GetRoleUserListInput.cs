namespace Simple.Application.Contract.Users.Dto;

/// <summary>
/// 获取角色下所有用户 input模型
/// </summary>
public class GetRoleUserListInput : PagedRequestDto
{
    /// <summary>
    /// 搜索关键词
    /// </summary>
    public string? Keywords { get; set; }

    /// <summary>
    /// 角色Id
    /// </summary>
    public Guid RoleId { get; set; }
}