import { GetListInput } from "@/module/Users";
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
}

export default new UserApi