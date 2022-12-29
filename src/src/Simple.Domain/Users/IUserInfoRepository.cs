using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Identity;

namespace Simple.Users;

public interface IUserInfoRepository : IRepository<IdentityUser>
{
    Task<List<IdentityUser>> GetListAsync(string keywords, int page, int pageSize);


    Task<int> GetCountAsync(string keywords);
}