using System;
using Volo.Abp.Identity;

namespace Simple.Users;

public class UserInfo : IdentityUser
{
    protected UserInfo()
    {
    }

    public UserInfo(Guid id, string userName, string email, Guid? tenantId = null) : base(id, userName, email, tenantId)
    {
    }

    public void SetPassword(string password)
    {
        PasswordHash = password;
    }
}