using Simple.Application.Contract.Users.Dto;
using Volo.Abp.Application.Dtos;

namespace Simple.Application.Contract.Users;

/// <summary>
/// 用户管理
/// </summary>
public interface IUserInfoService
{
    /// <summary>
    /// 获取用户列表
    /// </summary>
    /// <param name="input"></param>
    /// <returns></returns>
    Task<PagedResultDto<UserInfoDto>> GetListAsync(GetListInput input);

    /// <summary>
    /// 获取用户信息
    /// </summary>
    /// <returns></returns>
    Task<UserInfoDto> GetProfileAsync();

    /// <summary>
    /// 删除用户
    /// </summary>
    /// <param name="ids"></param>
    /// <returns></returns>
    Task DeleteAsync(List<Guid> ids);

    /// <summary>
    /// 创建用户
    /// </summary>
    /// <param name="dto"></param>
    /// <returns></returns>
    Task CreateAsync(CreateUserInput dto);

    /// <summary>
    /// 获取角色下所有用户
    /// </summary>
    /// <returns></returns>
    Task<PagedResultDto<UserInfoDto>> GetRoleUserListAsync(GetRoleUserListInput input);
}