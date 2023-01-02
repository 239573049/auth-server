import { extend } from 'umi-request';
import { message } from 'antd';
import { GetQueryValue } from './locationhelper';
// const baseUrl = 'http://auth.tokengo.top';
const baseUrl = 'https://localhost:44322';

const errorHandler = (error: any) => {
    const { response } = error;
    console.log("response",response.status);
    
};

function getToken() {
    var token =  window.localStorage.getItem('token')
    if(token){
        return token
    }
    token= GetQueryValue("token");
    if(token){
        window.localStorage.setItem("token",token)
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

request.interceptors.response.use(async(response,option)=>{
    console.log('重定向',response);
    if(response.status === 302){
        console.log('需要重定向',response);
        
    }
    return response;
})
export default request;