using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Simple.Users;
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

    private async Task<IQueryable<IdentityUser>> CreateUserListQuery(string keywords)
    {
        var dbContext = await GetDbContextAsync();

        var query = dbContext.Users.WhereIf(!keywords.IsNullOrEmpty(), x => x.UserName.Contains(keywords) || x.Name.Contains(keywords) || x.Email.Contains(keywords));

        return query;
    }
}