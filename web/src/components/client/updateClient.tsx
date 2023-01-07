import { Component, ReactNode } from 'react';
import { Button, Drawer, Space } from 'antd';
import { OpenIddictApplication } from '@/module/OpenIddictApplication';
import { Col, Tag, Form, Input, Row, Select } from 'antd';

const { Search } = Input;

interface IProps {
  onClose: any;
  open: boolean;
  value: OpenIddictApplication | null;
}
interface IState {
  value:OpenIddictApplication | null;
  permission:string
}

export default class UpdateClient extends Component<IProps, IState> {

  state: Readonly<IState>={
    value: null,
    permission:''
  }

  componentDidMount(): void {
    this.setState({
      value:this.props.value
    })
  }

  onOk() {
    this.props.onClose(true)
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
      return <Tag visible={true} closable onClose={()=>this.deletePermission(x)}>{x}</Tag>;
    });
    return s;
  }

  /**
   * 添加权限项
   */
  addPermissions(){
    var {permission,value} = this.state;
    // 解析成数组
    var p = JSON.parse(value?.permissions ?? '[]') as string[];
    // 将权限项添加到数组
    p.push(permission)
    // 在解析成字符串赋值到permissions
    value!.permissions = JSON.stringify(p);
    this.setState({
      permission:'',
      value:value
    })

  }

  deletePermission(data:string){
    var { value } = this.state;
    var p = JSON.parse(value?.permissions ?? '[]') as string[];
    
    p.splice(p.indexOf(data),1)

    if(value){
      value.permissions = JSON.stringify(p)
      this.setState({
        value
      })
    }
    
  }

  render() {
    var { value ,permission} = this.state;
    return (<Drawer
      title="编辑客户端"
      width={720}
      onClose={this.props.onClose}
      open={this.props.open}
      bodyStyle={{ paddingBottom: 80 }}
      extra={
        <Space>
          <Button onClick={this.props.onClose}>取消</Button>
          <Button onClick={()=>this.onOk()} type="primary">
            保存
          </Button>
        </Space>
      }
    >
      <Form layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <span>请输入客户端uri:</span>
              <Input value={value?.clientUri} placeholder="请输入客户端uri" />
          </Col>
          <Col span={12}>
            <span>请输入许可类型:</span>
              <Input
                value={value?.consentType}
                placeholder="请输入许可类型"
              />
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <span>请输入显示名称:</span>
              <Input
                value={value?.displayName}
                placeholder="请输入显示名称"
              />
          </Col>
          <Col span={12}>
            <span>请输入logo地址:</span>
              <Input value={value?.logoUri} placeholder="请输入logo地址" />
          </Col>
        </Row>
        <Row gutter={16} >
          <Col>
            <div>权限项:</div>
              {this.getPermissions(value?.permissions)}
              <Search
                placeholder="添加权限项"
                allowClear
                enterButton="添加"
                size="large"
                value={permission}
                onChange={(e)=>{
                  this.setState({
                    permission:e.target.value
                  })
                }}
                onSearch={()=>this.addPermissions()}
              />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={16}>
            <span>请输入type:</span>
              <Input value={value?.type} placeholder="请输入type" />
          </Col>
        </Row>
      </Form>
    </Drawer>
    );
  }
}
