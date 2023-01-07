import request from "@/utils/request";
const prefix = "/api/identity/roles";


class RoleApi {

    all(){
        return request.get(prefix+'/all')
    }

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
}

export default new RoleApi()