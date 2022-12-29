import { extend } from 'umi-request';
import { message } from 'antd';
// const baseUrl = 'http://auth.tokengo.top';
const baseUrl = 'https://localhost:44322';

const codeMessage = {
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
};

const errorHandler = (error: any) => {
    const { response = {} } = error;
};

function getToken() {
    return window.localStorage.getItem('token')
}

const request = extend({
    errorHandler, // 默认错误处理
    prefix: baseUrl,
    // 默认请求头
    headers: {
        "Authorization": `Bearer ${getToken()}` // 携带token
    },
    credentials: 'include', // 默认请求是否带上cookie
});

export default request;