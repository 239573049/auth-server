using Simple.Application.Contract.OpenIddict.Dto;
using Volo.Abp.Application.Dtos;

namespace Simple.Application.Contract.OpenIddict;

/// <summary>
/// 应用程序
/// </summary>
public interface IOpenIddictApplicationService
{
    /// <summary>
    /// 获取应用程序列表
    /// </summary>
    /// <returns></returns>
    Task<PagedResultDto<OpenIddictApplicationDto>> GetListAsync(GetOpenIddictListInput input);

    /// <summary>
    /// 编辑应用程序
    /// </summary>
    /// <param name="input"></param>
    /// <returns></returns>
    Task UpdateAsync(OpenIddictApplicationInput input);

    /// <summary>
    /// 新增应用程序
    /// </summary>
    /// <param name="input"></param>
    /// <returns></returns>
    Task CreateAsync(OpenIddictApplicationInput input);
}