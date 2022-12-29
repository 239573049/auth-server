import { GetOpenIddictListInput } from "@/module/OpenIddictApplication";
import request from "@/utils/request";
const prefix = "/api/app/open-iddict";

class OpenIddictApi {
    getlist(input: GetOpenIddictListInput) {
        return request.get(prefix, {
            data: input
        })
    }
}

export default new OpenIddictApi;