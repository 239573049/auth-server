import { extend } from 'umi-request';
import { GetQueryValue } from './locationhelper';
// const baseUrl = 'http://auth.tokengo.top';
const baseUrl = 'https://localhost:44322';

const errorHandler = (error: any) => {
    const { response } = error;
    
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

// 全局相应拦截
const responseInterceptor = (response:any, options:any) => {
    console.log('返回了');
    return response;
  };

  
const request = extend({
    errorHandler, // 默认错误处理
    prefix: baseUrl,
    // 默认请求头
    headers: {
        "Authorization": `Bearer ${getToken()}`, // 携带token
    },
    responseInterceptors: [responseInterceptor],
    credentials: 'include', // 默认请求是否带上cookie
});

request.interceptors.response.use(async(response,option)=>{
    console.log('重定向',response.status);
    return response;
})

export default request;