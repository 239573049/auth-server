import { LoginForm, ProFormText } from "@ant-design/pro-components";
import { Component, CSSProperties } from "react";
import {
    UserOutlined,
  } from '@ant-design/icons';
  const iconStyles: CSSProperties = {
    marginLeft: '16px',
    color: 'rgba(0, 0, 0, 0.2)',
    fontSize: '24px',
    verticalAlign: 'middle',
    cursor: 'pointer',
  };
import {history} from 'umi'
import userApi from "@/apis/userApi";
import {message} from 'antd'

export default class Register extends Component{
    render() {
        return(    
        <div style={{ backgroundColor: 'white' }} className="plan" key="login">
        <LoginForm
          title="授权中心管理平台"
          subTitle="简单好用的授权中心管理平台"
          onFinish={async (value: any) => {
            console.log('zc',value);
            userApi.register(value)
                .then(res=>{
                    message.success('注册成功')
                    history.push('/login')
                })
          }}
        >
        <ProFormText
          name="userName"
          placeholder='请输入用户名'
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined className={'prefixIcon'} />,
          }}
          rules={[
            {
              required: true,
              message: '请输入用户名!',
            },
          ]}
        />
        <ProFormText
          name="name"
          placeholder='请输入昵称'
          fieldProps={{
            size: 'large',
          }}
          rules={[
            {
              required: true,
              message: '请输入昵称!',
            },
          ]}
        />
        <ProFormText
          name="email"
          placeholder='请输入邮箱'
          fieldProps={{
            size: 'large',
          }}
          rules={[
            {
              required: true,
              message: '请输入邮箱!',
            },
          ]}
        />
        <ProFormText
          name="phoneNumber"
          placeholder='请输入手机号'
          fieldProps={{
            size: 'large',
          }}
        />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
            }}
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
        <div
          style={{
            marginBottom: 24,
          }}
        >
          <a
            style={{
              float: 'right',
            }}
            onClick={()=>history.push('/login')}
          >
            登录账号
          </a>
        </div>
        </LoginForm>
      </div>)
    }
}