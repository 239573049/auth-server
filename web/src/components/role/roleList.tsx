import roleApi from "@/apis/roleApi";
import { IdentityRoleDto } from "@/module/IdentityRoleDto";
import { UserAddOutlined } from "@ant-design/icons";
import { Avatar, List, Typography } from "antd";
import { Properties } from "csstype";
import { Component, ReactNode } from "react";
import './roleList.less'

interface IProps{
    style:Properties<string | number, string & {}>,
    className:string,
    roleClick:any

}
interface IState{
    data:IdentityRoleDto[]
}

export default class RoleList extends Component<IProps,IState>{

    state: Readonly<IState>={
        data: []
    }

    constructor(props:IProps){
        super(props)
        this.getRoleList()
    }

    getRoleList(){
        roleApi.all()
            .then(res=>{
                if(res){
                    this.setState({
                        data:res.items
                    })
                }
            })
    }

    onRoleClick(item:IdentityRoleDto){
        this.props.roleClick(item)
    }

    render() {
        var {data} = this.state
        return(<div style={this.props.style} className={this.props.className}>
                <List
                    header={<div><span>角色列表</span><span style={{float: 'right',cursor:'pointer'}} ><UserAddOutlined /></span></div>}
                    bordered
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item 
                        className="list"
                        key={item.id} onClick={()=>this.onRoleClick(item)}>
                        <List.Item.Meta
                          avatar={<Avatar src='https://blog-simple.oss-cn-shenzhen.aliyuncs.com/Avatar.jpg' />}
                          title={item.name}
                          description={`${item.isDefault?"默认角色":"非默认角色"} ${item.isPublic?"公开角色":"非公开角色"} ${item.isStatic?"静态角色(静态角色不能被删除或者重命名)":"非静态角色"}`}
                        />
                      </List.Item>
                    )}
                    />
        </div>)
    }
}