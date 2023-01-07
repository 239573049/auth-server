import { IdentityRoleDto } from "@/module/IdentityRoleDto";
import { Tabs } from "antd";
import { Properties } from "csstype";
import { Component } from "react";
import RoleUserList from "../user/RoleUserList";
import RolePermission from "./rolePermission";

interface IProps{
    style:Properties<string | number, string & {}>,
    className:string,
    role:IdentityRoleDto|null
}
interface IState{

}

export default class RoleContent extends Component<IProps,IState>{
    render() {
        return(<div style={this.props.style} className={this.props.className}>
             <Tabs
                defaultActiveKey="1"
                type="card"
                size='small'
                items={[{
                    label: `用户列表`,
                    key: 'RoleUserList',
                    children: <RoleUserList roleId={this.props.role?.id} skipCount={1} maxResultCount={10}/>,
                },{
                    label: `角色权限配置`,
                    key: 'RolePermissionConfiguration',
                    children: <RolePermission role={this.props.role}/>,
                }]}
      />
        </div>)
    }
}