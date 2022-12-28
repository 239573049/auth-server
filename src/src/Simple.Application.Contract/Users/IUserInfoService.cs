using Simple.Application.Contract.Users.Dto;
using Volo.Abp.Application.Dtos;

namespace Simple.Application.Contract.Users;

public interface IUserInfoService
{
    /// <summary>
    /// 获取用户列表
    /// </summary>
    /// <param name="input"></param>
    /// <returns></returns>
    Task<PagedResultDto<UserInfoDto>> GetListAsync(GetListInput input);
}