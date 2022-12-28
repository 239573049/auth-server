import authserverApi from '@/apis/authserverApi';
import {
    GithubOutlined,
    LockOutlined,
    TaobaoCircleOutlined,
    UserOutlined,
    WeiboCircleOutlined,
} from '@ant-design/icons';
import {
    LoginForm,
    ProFormCheckbox,
    ProFormText,
} from '@ant-design/pro-components';
import { Space, message } from 'antd';
import { CSSProperties, useState } from 'react';
import { history } from 'umi';
import './login.less'

const iconStyles: CSSProperties = {
    marginLeft: '16px',
    color: 'rgba(0, 0, 0, 0.2)',
    fontSize: '24px',
    verticalAlign: 'middle',
    cursor: 'pointer',
};


export default () => {
    function onSubmit(value: any) {
        authserverApi.token(value.accountNumber, value.password)
            .then(res => {
                console.log(res);
            })
    }

    function setToken(value: string) {
        window.localStorage.setItem('token', value)
    }

    return (
        <div style={{ backgroundColor: 'white', }} className="plan">
            <LoginForm
                logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
                title="Iot管理系统"
                subTitle="更好的Iot管理系统"
                onFinish={async (value: any) => {
                    onSubmit(value);
                }}
                actions={
                    <Space>
                        其他登录方式
                        <GithubOutlined style={iconStyles} />
                        <TaobaoCircleOutlined style={iconStyles} />
                        <WeiboCircleOutlined style={iconStyles} />
                    </Space>
                }
            >
                <ProFormText
                    name="accountNumber"
                    fieldProps={{
                        size: 'large',
                        prefix: <UserOutlined className={'prefixIcon'} />,
                    }}
                    placeholder={'用户名: admin'}
                    rules={[
                        {
                            required: true,
                            message: '请输入用户名!',
                        },
                    ]}
                />
                <ProFormText.Password
                    name="password"
                    fieldProps={{
                        size: 'large',
                        prefix: <LockOutlined className={'prefixIcon'} />,
                    }}
                    placeholder={'密码: dd666666'}
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
                    <ProFormCheckbox noStyle name="autoLogin">
                        自动登录
                    </ProFormCheckbox>
                    <a
                        style={{
                            float: 'right',
                        }}
                    >
                        忘记密码
                    </a>
                </div>
            </LoginForm>
        </div>
    );
};