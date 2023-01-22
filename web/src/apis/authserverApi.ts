import request from '@/utils/request';

class AuthServerApi {
  token(
    username: string,
    password: string,
    client_secret: string | null = null,
    scope: string | null = 'Simple',
    client_id: string | null = 'Simple_App',
    grant_type: string | null = 'password',
  ) {
    return request.post('/connect/token', {
      requestType: 'form',
      data: {
        grant_type: grant_type,
        client_id: client_id,
        client_secret: client_secret,
        username: username,
        scope: scope,
        password: password,
      },
    });
  }
}

export default new AuthServerApi();
