import { Component, ReactNode } from 'react';
import { Button, Drawer, Space, message } from 'antd';
import { OpenIddictApplication } from '@/module/OpenIddictApplication';
import { Col, Tag, Form, Input, Row, Select } from 'antd';
import openiddictApi from '@/apis/openiddictApi';

const { Search } = Input;

interface IProps {
  onClose: any;
  open: boolean;
  value: OpenIddictApplication | null;
}
interface IState {
  value: OpenIddictApplication | null;
  permission: string;
}

export default class CreateClient extends Component<IProps, IState> {
  state: Readonly<IState> = {
    value: {
      clientId: null,
      clientSecret: null,
      clientUri: null,
      consentType: null,
      isDeleted:false,
      deleterId:null,
      deletionTime:null,
      displayName: null,
      displayNames: null,
      permissions: null,
      postLogoutRedirectUris: null,
      properties: null,
      redirectUris: null,
      requirements: null,
      type: null,
      logoUri: null,
    },
    permission: '',
  };

  componentDidMount(): void {
    this.setState({
      value: this.props.value,
    });
  }

  onOk() {
    var { value } = this.state;
    console.log(value);

    if (value) {
      openiddictApi.create(value).then((res) => {
        message.success('成功');
        this.props.onClose(true);
      });
    }
  }

  /**
   * 解析权限项为组件
   * @param permissions
   * @returns
   */
  getPermissions(permissions: string | undefined) {
    var permission = JSON.parse(permissions ?? '[]') as string[];
    var s = permission.map((x) => {
      // 不添加visible如果点击关闭组件会自动隐藏
      return (
        <Tag visible={true} closable onClose={() => this.deletePermission(x)}>
          {x}
        </Tag>
      );
    });
    return s;
  }

  /**
   * 添加权限项
   */
  addPermissions() {
    var { permission, value } = this.state;
    // 解析成数组
    var p = JSON.parse(value?.permissions ?? '[]') as string[];
    // 将权限项添加到数组
    p.push(permission);
    // 在解析成字符串赋值到permissions
    value!.permissions = JSON.stringify(p);
    this.setState({
      permission: '',
      value: value,
    });
  }

  deletePermission(data: string) {
    var { value } = this.state;
    var p = JSON.parse(value?.permissions ?? '[]') as string[];

    p.splice(p.indexOf(data), 1);

    if (value) {
      value.permissions = JSON.stringify(p);
      this.setState({
        value,
      });
    }
  }

  setValue(key: string, data: any) {
    var { value } = this.state;
    if (value) {
      value[key] = data;
      this.setState({
        value,
      });
    }
  }

  render() {
    var { value, permission } = this.state;

    return (
      <Drawer
        title="新增客户端"
        width={720}
        onClose={() => this.props.onClose(false)}
        open={this.props.open}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={() => this.props.onClose(false)}>取消</Button>
            <Button onClick={() => this.onOk()} type="primary">
              保存
            </Button>
          </Space>
        }
      >
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <span>请输入客户端uri:</span>
              <Input
                onChange={(e) => this.setValue('clientUri', e.target.value)}
                value={value?.clientUri}
                placeholder="请输入客户端uri"
              />
            </Col>
            <Col span={12}>
              <span>请输入许可类型:</span>
              <Select
                defaultValue={value?.consentType}
                value={value?.consentType}
                style={{ width: 120, padding: '5px' }}
                onChange={(e) => this.setValue('consentType', e)}
                options={[
                  {
                    value: 'explicit',
                    label: 'explicit',
                  },
                  {
                    value: 'external',
                    label: 'external',
                  },
                  {
                    value: 'implicit',
                    label: 'implicit',
                  },
                  {
                    value: 'systematic',
                    label: 'systematic',
                  },
                ]}
              />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <span>请输入显示名称:</span>
              <Input
                value={value?.displayName}
                onChange={(e) => this.setValue('displayName', e.target.value)}
                placeholder="请输入显示名称"
              />
            </Col>
            <Col span={12}>
              <span>请输入logo地址:</span>
              <Input
                onChange={(e) => this.setValue('logoUri', e.target.value)}
                value={value?.logoUri}
                placeholder="请输入logo地址"
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <div>权限项:</div>
              {this.getPermissions(value?.permissions)}
              <Search
                placeholder="添加权限项"
                allowClear
                enterButton="添加"
                size="large"
                style={{ padding: '5px' }}
                value={permission}
                onChange={(e) => {
                  this.setState({
                    permission: e.target.value,
                  });
                }}
                onSearch={() => this.addPermissions()}
              />
            </Col>
            <Col span={12}>
              <span>请输入回调地址:</span>
              <Input
                onChange={(e) => this.setValue('logoUri', e.target.value)}
                value={value?.logoUri}
                placeholder="请输入回调地址"
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={16}>
              <span>请输入type:</span>
              <Select
                defaultValue={value?.type}
                value={value?.type}
                style={{ width: 120, padding: '5px' }}
                onChange={(e) => this.setValue('type', e)}
                options={[
                  {
                    value: 'confidential',
                    label: 'confidential',
                  },
                  {
                    value: 'public',
                    label: 'public',
                  },
                ]}
              />
            </Col>
          </Row>
        </Form>
      </Drawer>
    );
  }
}
