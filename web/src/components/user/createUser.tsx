import { Component, ReactNode } from "react";
import { PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Drawer,
    message,
    Form,
    Input,
    Upload,
    InputNumber
} from 'antd';
import userApi from "../../apis/userApi";

interface IProps {
    onClose: any,
    open: boolean
}

interface IState {

}

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const validateMessages = {
    required: '${label}是必填项！',
    types: {
        email: '${label} 不是有效的电子邮件!',
        number: '${label} is not a valid number!',
    },
};

export default class CreateUser extends Component<IProps, IState>{
    state: Readonly<IState> = {

    }

    onFinish(value: any) {
        userApi.createUser(value.user)
            .then((res:any) => {
                message.success('创建成功')
                this.props.onClose(true)
            })
    }

    render() {
        return (
            <Drawer title="新增用户" placement="right" onClose={this.props.onClose} open={this.props.open}>
                <Form {...layout} name="nest-messages" onFinish={(value) => this.onFinish(value)} validateMessages={validateMessages}>
                    <Form.Item name={['user', 'userName']} label="账号" rules={[{ required: true, min: 6 }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['user', 'email']} label="邮箱" rules={[{ type: 'email', required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['user', 'password']} label="密码" rules={[{ required: true, min: 6 }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['user', 'name']} label="昵称" >
                        <Input />
                    </Form.Item>
                    <Form.Item name={['user', 'phoneNumber']} label="手机号">
                        <Input />
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button type="primary" htmlType="submit">
                            添加
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>)
    }
}