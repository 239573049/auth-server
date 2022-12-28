using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Identity;

namespace Simple.Users;

public interface IUserInfoRepository
{
    Task<List<IdentityUser>> GetListAsync(string keywords, int page, int pageSize);


    Task<int> GetCountAsync(string keywords);
}