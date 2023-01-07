import {  AddRoleInput } from "@/module/Role";
import request from "@/utils/request";
const prefix = "/api/identity/roles";


class RoleApi {

    all(){
        return request.get(prefix+'/all')
    }

    /**
     * 获取角色列表
     * @param filter 
     * @param sorting 
     * @param skipCount 
     * @param maxResultCount 
     * @returns 
     */
    get(filter:string,sorting:string,skipCount:number,maxResultCount:number){
        return request.get(prefix,{
            params:{
                filter,
                sorting,
                skipCount,
                maxResultCount
            }
        })
    }

    /**
     * 删除角色
     * @param id 
     * @returns 
     */
    delete(id:string){
        return request.delete(prefix+'/'+id)
    }

    /**
     * 添加角色
     * @param input 
     * @returns 
     */
    create(input:AddRoleInput){
        return request.post(prefix,{
            data:input
        })
    }
}

export default new RoleApi()