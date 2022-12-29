using Simple.Application.Contract.Users;
using Simple.Application.Contract.Users.Dto;
using Simple.Users;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Identity;
using Volo.Abp.Users;

namespace Simple.Application.Users;

/// <inheritdoc />
public class UserInfoService : ApplicationService, IUserInfoService
{
    private readonly IUserInfoRepository _userInfoRepository;

    public UserInfoService(IUserInfoRepository userInfoRepository)
    {
        _userInfoRepository = userInfoRepository;
    }

    /// <inheritdoc />
    public async Task<PagedResultDto<UserInfoDto>> GetListAsync(GetListInput input)
    {
        var data = await _userInfoRepository.GetListAsync(input.Keywords, input.SkipCount, input.MaxResultCount);
        var count = await _userInfoRepository.GetCountAsync(input.Keywords);

        var dto = ObjectMapper.Map<List<IdentityUser>, List<UserInfoDto>>(data);
        return new PagedResultDto<UserInfoDto>(count, dto);
    }

    /// <inheritdoc />
    public async Task<UserInfoDto> GetProfileAsync()
    {
        var user = await _userInfoRepository.FirstOrDefaultAsync(x => x.Id == CurrentUser.Id);

        var dto = ObjectMapper.Map<IdentityUser, UserInfoDto>(user);
        return dto;
    }
}