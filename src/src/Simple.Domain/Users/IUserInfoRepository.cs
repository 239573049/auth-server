using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Identity;

namespace Simple.Users;

public interface IUserInfoRepository : IRepository<IdentityUser>
{
    Task<List<IdentityUser>> GetListAsync(string keywords, int page, int pageSize);


    Task<int> GetCountAsync(string keywords);

    /// <summary>
    /// 获取角色下用户列表
    /// </summary>
    /// <param name="keywords"></param>
    /// <param name="roleId"></param>
    /// <param name="page"></param>
    /// <param name="pageSize"></param>
    /// <returns></returns>
    Task<List<IdentityUser>> GetRoleUserListAsync(string keywords,Guid roleId, int page, int pageSize);

    /// <summary>
    /// 获取角色下用户总数
    /// </summary>
    /// <param name="keywords"></param>
    /// <param name="roleId"></param>
    /// <param name="page"></param>
    /// <param name="pageSize"></param>
    /// <returns></returns>
    Task<int> GetRoleUserCountAsync(string keywords, Guid roleId);

}