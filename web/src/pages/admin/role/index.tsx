import RoleContent from "@/components/role/roleContent";
import RoleList from "@/components/role/roleList";
import { IdentityRoleDto } from "@/module/IdentityRoleDto";
import { Component, ReactNode } from "react";

export default class Role extends Component{
    state={
        clickData:null
    }

    render(): ReactNode {
        var {clickData} = this.state;
        return(<div>
            <RoleList style={{width:'400px',float: 'left',}} className={''} roleClick={(value:IdentityRoleDto)=>{
                console.log('IdentityRoleDto',value);
                
                this.setState({
                    clickData:value
                })
            }}> 
            </RoleList>
            <RoleContent role={clickData} style={{float: 'left',paddingLeft: '8px',width:'calc(100% - 410px)'}} className={""}/>"
        </div>)
    }
}