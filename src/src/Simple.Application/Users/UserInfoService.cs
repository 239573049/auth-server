using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Simple.Application.Contract.Users;
using Simple.Application.Contract.Users.Dto;
using Simple.Users;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Identity;

namespace Simple.Application.Users;

/// <inheritdoc />
[Authorize]
public class UserInfoService : ApplicationService, IUserInfoService
{
    private readonly IUserInfoRepository _userInfoRepository;
    private readonly IPasswordHasher<IdentityUser> _passwordHasher;
    public UserInfoService(IUserInfoRepository userInfoRepository, IPasswordHasher<IdentityUser> passwordHasher)
    {
        _userInfoRepository = userInfoRepository;
        _passwordHasher = passwordHasher;
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

    /// <inheritdoc />
    public async Task DeleteAsync([FromBody] List<Guid> ids)
    {
        // 不能删除自己
        ids = ids.Where(x => x != CurrentUser.Id).ToList();

        // 不能删除初始账号
        await _userInfoRepository.DeleteAsync(x => ids.Contains(x.Id) && x.UserName != "admin");
    }

    /// <inheritdoc />
    public async Task CreateAsync(CreateUserInput dto)
    {
        if (await _userInfoRepository.AnyAsync(x => x.UserName == dto.UserName || x.Email == dto.Email))
        {
            throw new BusinessException(SimpleDomainErrorCodes.AccountDuplication);
        }

        var data = new UserInfo(Guid.NewGuid(), dto.UserName, dto.Email);
        data.SetPassword(_passwordHasher.HashPassword(data, dto.Password));
        data.SetPhoneNumber(dto.PhoneNumber, true);
        data.ExtraProperties.Add("Avatar", dto.Avatar);

        await _userInfoRepository.InsertAsync(data, true);
    }
}