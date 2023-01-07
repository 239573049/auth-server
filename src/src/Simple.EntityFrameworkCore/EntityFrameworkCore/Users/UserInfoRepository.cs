using Microsoft.EntityFrameworkCore;
using Simple.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.Identity;

namespace Simple.EntityFrameworkCore.Users;

public class UserInfoRepository : EfCoreRepository<SimpleDbContext, IdentityUser, Guid>, IUserInfoRepository, ITransientDependency
{
    public UserInfoRepository(IDbContextProvider<SimpleDbContext> dbContextProvider) : base(dbContextProvider)
    {
    }

    public async Task<List<IdentityUser>> GetListAsync(string keywords, int page, int pageSize)
    {
        var query = await CreateUserListQuery(keywords);

        return await query.PageBy(page, pageSize).ToListAsync();
    }

    public async Task<int> GetCountAsync(string keywords)
    {
        var query = await CreateUserListQuery(keywords);

        return await query.CountAsync();
    }

    public async Task<List<IdentityUser>> GetRoleUserListAsync(string keywords, Guid roleId, int page, int pageSize)
    {
        var query = await CreateUserListQuery(keywords, roleId);

        return await query.PageBy(page, pageSize).ToListAsync();
    }

    public async Task<int> GetRoleUserCountAsync(string keywords, Guid roleId)
    {
        var query = await CreateUserListQuery(keywords, roleId);

        return await query.CountAsync();
    }

    private async Task<IQueryable<IdentityUser>> CreateUserListQuery(string keywords, Guid? roleId = null)
    {
        var dbContext = await GetDbContextAsync();

        var query = dbContext.Users
            .WhereIf(!keywords.IsNullOrEmpty(), x => x.UserName.Contains(keywords) || x.Name.Contains(keywords) || x.Email.Contains(keywords));

        if (roleId != null)
        {
            query = from identityUser in query
                    join userRole in dbContext.UserRoles on identityUser.Id equals userRole.UserId
                    where userRole.RoleId == roleId
                    select identityUser;
        }

        return query;
    }
}