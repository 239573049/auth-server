import { IdentityRoleDto } from "@/module/IdentityRoleDto";
import { Tabs } from "antd";
import { Properties } from "csstype";
import { Component } from "react";
import RoleUserList from "../user/RoleUserList";

interface IProps{
    style:Properties<string | number, string & {}>,
    className:string,
    role:IdentityRoleDto|null
}
interface IState{

}

export default class RoleContent extends Component<IProps,IState>{

    state: Readonly<IState>={
    }

    render() {
        return(<div style={this.props.style} className={this.props.className}>
             <Tabs
                defaultActiveKey="1"
                type="card"
                size='small'
                items={[{
                    label: `用户列表`,
                    key: 'RoleUserList',
                    children: this.props.role?.id !== undefined ?<RoleUserList roleId={this.props.role?.id} skipCount={1} maxResultCount={10}/>:<div>没有数据</div>,
                },{
                    label: `角色权限配置`,
                    key: 'RolePermissionConfiguration',
                    children: <div>没有数据</div>,
                }]}
      />
        </div>)
    }
}