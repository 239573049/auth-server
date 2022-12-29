namespace Simple.Application.Contract.Users.Dto;

public class CreateUserInput
{
    /// <summary>
    /// 账号
    /// </summary>
    public string? UserName { get; set; }

    /// <summary>昵称</summary>
    public string? Name { get; set; }

    /// <summary>
    /// 密码
    /// </summary>
    public string Password { get; set; }
    

    /// <summary>邮箱</summary>
    public string? Email { get; set; }

    /// <summary>手机号</summary>
    public string? PhoneNumber { get; set; }
    
    /// <summary>
    /// 头像
    /// </summary>
    public string? Avatar { get; set; }
}