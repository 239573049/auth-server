import request from "@/utils/request";

class AuthServerApi {
    token(username: string, password: string) {
        return request.post('/connect/token', {
            requestType: 'form',
            data: {
                grant_type: "password",
                client_id: "Simple_App",
                client_secret: null,
                username: username,
                scope: 'Simple',
                password: password
            }
        })
    }
}

export default new AuthServerApi;