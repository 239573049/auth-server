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
public class UserInfoService : ApplicationService, IUserInfoService
{
    private readonly IUserInfoRepository _userInfoRepository;
    private readonly IPasswordHasher<IdentityUser> _passwordHasher;
    private readonly IRepository<IdentityRole> _roleRepository;
    public UserInfoService(IUserInfoRepository userInfoRepository, IPasswordHasher<IdentityUser> passwordHasher, IRepository<IdentityRole> roleRepository)
    {
        _userInfoRepository = userInfoRepository;
        _passwordHasher = passwordHasher;
        _roleRepository = roleRepository;
    }

    /// <inheritdoc />
    [Authorize(Roles = "admin")]
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
    [Authorize(Roles = "admin")]
    public async Task DeleteAsync([FromBody] List<Guid> ids)
    {
        // 不能删除自己
        ids = ids.Where(x => x != CurrentUser.Id).ToList();

        // 不能删除初始账号
        await _userInfoRepository.DeleteAsync(x => ids.Contains(x.Id) && x.UserName != "admin");
    }

    /// <inheritdoc />
    [Authorize(Roles = "admin")]
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
        
        // 获取所有默认的角色
        var roles = await _roleRepository.GetListAsync(x => x.IsDefault);
        
        // 将默认角色添加到新增用户
        roles.ForEach(x=>data.AddRole(x.Id));
        await _userInfoRepository.InsertAsync(data, true);
    }

    /// <inheritdoc />
    [Authorize(Roles = "admin")]
    public async Task<PagedResultDto<UserInfoDto>> GetRoleUserListAsync(GetRoleUserListInput input)
    {
        var data = await _userInfoRepository.GetRoleUserListAsync(input.Keywords, input.RoleId, input.SkipCount,
            input.MaxResultCount);

        var count = await _userInfoRepository.GetRoleUserCountAsync(input.Keywords, input.RoleId);

        var dto = ObjectMapper.Map<List<IdentityUser>, List<UserInfoDto>>(data);

        return new PagedResultDto<UserInfoDto>(count, dto);

    }

    /// <inheritdoc />
    [AllowAnonymous]
    public async Task RegisterAsync(CreateUserInput dto)
    {
        if (await _userInfoRepository.AnyAsync(x => x.UserName == dto.UserName || x.Email == dto.Email))
        {
            throw new BusinessException(SimpleDomainErrorCodes.AccountDuplication);
        }

        var data = new UserInfo(Guid.NewGuid(), dto.UserName, dto.Email);
        data.SetPassword(_passwordHasher.HashPassword(data, dto.Password));
        data.SetPhoneNumber(dto.PhoneNumber, true);
        data.ExtraProperties.Add("Avatar", dto.Avatar);

        // 获取所有默认的角色
        var roles = await _roleRepository.GetListAsync(x => x.IsDefault);

        // 将默认角色添加到新增用户
        roles.ForEach(x => data.AddRole(x.Id));
        await _userInfoRepository.InsertAsync(data, true);
    }
}