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
}