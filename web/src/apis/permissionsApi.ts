import { AddPermissionsInput } from "@/module/AddPermissionsInput";
import request from "@/utils/request";
const prefix = "/api/app/permissions";


class PermissionsApi {
    /**
     * 编辑权限配置
     * @param input 
     * @returns 
     */
    put(input:AddPermissionsInput[]){
        return request.put(prefix+'/for-role',{
            data:input
        })
    }

    /**
     * 获取角色权限配置
     * @param providerKey 
     * @returns 
     */
    get(providerKey:string){
        return request.get(prefix+'/for-role',{
            params:{
                providerKey:providerKey
            }
        })
    }
}

export default new PermissionsApi()