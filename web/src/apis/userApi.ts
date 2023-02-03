import { GetRoleUserListInput } from "@/module/GetRoleUserListInput";
import { GetListInput, UserInfoDto } from "@/module/Users";
import request from "@/utils/request";
const prefix = "/api/app/user-info";

class UserApi {
    /**
     * 获取用户列表
     * @param input 
     * @returns 
     */
    getList(input: GetListInput | undefined) {
        return request.get(prefix, {
            params: input
        })
    }

    /**获取用户信息 */
    getProfile() {
        return request.get(prefix + '/profile')
    }

    /**
     * 创建用户
     * @param dto 
     * @returns 
     */
    createUser(dto: UserInfoDto) {
        dto.avatar = "https://blog-simple.oss-cn-shenzhen.aliyuncs.com/Avatar.jpg";
        return request.post(prefix, {
            data: dto,
            requestType: 'json'
        })
    }

    /**
     * 批量删除用户
     * @param ids 
     * @returns 
     */
    delete(ids: any[]) {
        return request.delete(prefix, {
            data: ids
        })
    }

    /**
     * 获取角色下所有用户
     * @param input 
     * @returns 
     */
    roleUserList(input:GetRoleUserListInput){
        return request.get(prefix+'/role-user-list',{
            params:input
        })
    }
    
    /**
     * 创建用户
     * @param dto 
     * @returns 
     */
    register(dto: UserInfoDto) {
        dto.avatar = "https://blog-simple.oss-cn-shenzhen.aliyuncs.com/Avatar.jpg";
        return request.post(prefix+'/register', {
            data: dto,
            requestType: 'json'
        })
    }
}

export default new UserApi