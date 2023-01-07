import roleApi from '@/apis/roleApi';
import { AddRoleInput } from '@/module/Role';
import { Input, message, Modal, Switch } from 'antd';
import { Component } from 'react';


interface IProps {
  open: boolean;
  onCancel: any;
}

interface IState {
    data:AddRoleInput
}

export default class AddRole extends Component<IProps, IState> {
state: Readonly<IState>={
    data: {
        name: '',
        isDefault: false,
        isPublic: false
    }
}

  constructor(props: IProps) {
    super(props);

    // 为了在回调中使用 `this`，这个绑定是必不可少的
    this.handleOk = this.handleOk.bind(this);
  }
  handleOk() {
    var {data}= this.state;
    roleApi.create(data)
        .then(res=>{
            message.success('添加成功')
            this.props.onCancel(true)
        }).catch(error=>{
            message.error('添加异常')
        })
  }

  setData(name:string,value:any){
    var {data}= this.state;
    data[name] = value;
    this.setState({
        data
    })

  }
  render() {
    var {data} = this.state;
    return (
      <Modal
        title="添加角色"
        open={this.props.open}
        onOk={this.handleOk}
        onCancel={this.props.onCancel}
      >
        <Input placeholder="角色名称"  value={data.name} onChange={(e)=>{this.setData('name',e.target.value)}}/>
        <div>
          <Switch
            checkedChildren="公开角色"
            unCheckedChildren="私有角色"
            defaultChecked
            checked={data.isPublic}
            onChange={(e)=>{this.setData('isPublic',e)}}
          />
        </div>
        <div>
          <Switch
            checkedChildren="默认角色"
            unCheckedChildren="非默认角色"
            defaultChecked
            checked={data.isDefault}
            onChange={(e)=>{this.setData('isDefault',e)}}
          />
        </div>
      </Modal>
    );
  }
}
