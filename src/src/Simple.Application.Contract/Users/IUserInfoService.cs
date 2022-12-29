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
}