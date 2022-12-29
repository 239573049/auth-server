using Volo.Abp.Application.Dtos;

namespace Simple.Application.Contract.Users.Dto;

public class UserInfoDto : EntityDto<Guid>
{
    public Guid Key => Id;

    /// <summary></summary>
    public string? UserName { get; set; }

    /// <summary>昵称</summary>
    public string? Name { get; set; }

    /// <summary>
    /// 密码
    /// </summary>
    public string Password { get; set; }

    public string? PasswordHash { get; set; }
    
    /// <summary>Gets or sets the email address for this user.</summary>
    public string Email { get; set; }

    /// <summary>Gets or sets a telephone number for the user.</summary>
    public string? PhoneNumber { get; set; }

    /// <summary>Gets or sets a flag indicating if the user is active.</summary>
    public bool IsActive { get; set; }

    /// <summary>
    /// Gets or sets a flag indicating if two factor authentication is enabled for this user.
    /// </summary>
    /// <value>True if 2fa is enabled, otherwise false.</value>
    public bool TwoFactorEnabled { get; set; }

    public string? Avatar { get; set; }
}