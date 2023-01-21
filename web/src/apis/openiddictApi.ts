import { GetOpenIddictListInput, OpenIddictApplication } from "@/module/OpenIddictApplication";
import request from "@/utils/request";
const prefix = "/api/app/open-iddict";

class OpenIddictApi {
    /**
     * 获取应用程序列表
     * @param input 
     * @returns 
     */
    getlist(input: GetOpenIddictListInput) {
        return request.get(prefix, {
            data: input
        })
    }

    /**
     * 编辑应用程序
     * @param input 
     * @returns 
     */
    put(input:OpenIddictApplication){
        return request.put(prefix,{
            data:input
        })
    }

    
    /**
     * 新增应用程序
     * @param input 
     * @returns 
     */
    create(input:OpenIddictApplication){
        return request.post(prefix,{
            data:input
        })
    }
}

export default new OpenIddictApi;