import request from "@/utils/request";

class AuthServerApi {
    token(username: string, password: string) {
        return request.post('/connect/token', {
            requestType: 'form',
            data: {
                grant_type: "password",
                client_id: "Blogger_App",
                client_secret: null,
                username: username,
                password: password
            }
        })
    }
}

export default new AuthServerApi;