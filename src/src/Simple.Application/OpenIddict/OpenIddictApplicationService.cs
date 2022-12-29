using Microsoft.AspNetCore.Authorization;
using Simple.Application.Contract.OpenIddict;
using Simple.Application.Contract.OpenIddict.Dto;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.OpenIddict.Applications;

namespace Simple.Application.OpenIddict;

/// <inheritdoc />
[Authorize]
public class OpenIddictApplicationService : ApplicationService, IOpenIddictApplicationService
{
    private readonly IOpenIddictApplicationRepository _openIddictApplicationRepository;

    public OpenIddictApplicationService(IOpenIddictApplicationRepository openIddictApplicationRepository)
    {
        _openIddictApplicationRepository = openIddictApplicationRepository;
    }

    /// <inheritdoc />
    public async Task<PagedResultDto<OpenIddictApplicationDto>> GetListAsync(GetOpenIddictListInput input)
    {
        var data = await _openIddictApplicationRepository
            .GetListAsync(nameof(OpenIddictApplication.CreationTime), input.SkipCount, input.MaxResultCount, input.Keywords);

        var count = await _openIddictApplicationRepository.GetCountAsync(input.Keywords);

        var dto = ObjectMapper.Map<List<OpenIddictApplication>, List<OpenIddictApplicationDto>>(data);

        return new PagedResultDto<OpenIddictApplicationDto>(count, dto);
    }
}