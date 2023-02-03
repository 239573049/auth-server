import { extend } from 'umi-request';
import { history } from 'umi';
import { GetQueryValue } from './locationhelper';
import { message } from 'antd';
var baseUrl ='https://auth.tokengo.top';

if (process.env.NODE_ENV === "development") {

    baseUrl = 'http://localhost:44322';
}

const errorHandler = (error: any) => {
};

function getToken() {
    var token = window.localStorage.getItem('token')
    if (token) {
        return token
    }
    token = GetQueryValue("token");
    if (token) {
        window.localStorage.setItem("token", token)
    }
    return token;
}

const request = extend({
    errorHandler, // 默认错误处理
    prefix: baseUrl,
    // 默认请求头
    headers: {
        "Authorization": `Bearer ${getToken()}`, // 携带token
    },
    credentials: 'include', // 默认请求是否带上cookie
});

request.use(async (context, next) => {
    var token = getToken();
    if (context.req.options.headers && token) {
        context.req.options.headers["Authorization"] = `Bearer ${token}`;
    }
    await next()
})

request.interceptors.response.use(async (response, option) => {
    if (response.status === 401) {
        history.push('/login')
        return response;
    } else if (response.status === 403) {
        message.error('403 无操作权限')
    }
    return response;
})

export default request;