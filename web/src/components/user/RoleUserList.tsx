import userApi from "@/apis/userApi";
import { GetRoleUserListInput } from "@/module/GetRoleUserListInput";
import { UserInfoDto } from "@/module/Users";
import { Avatar, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import { Component, ReactChild, ReactFragment, ReactPortal } from "react";

const columns: ColumnsType<UserInfoDto> = [
    {
      title: '用户名',
      width: 100,
      dataIndex: 'userName',
      key: 'key',
      fixed: 'left',
    },
    {
      title: '昵称',
      width: 100,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 150,
    },
    {
      title: '手机号',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: 150,
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (value: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined, recod: any) => {
        console.log('value', value, 'recod', recod);
        return <Avatar shape="square" size={64} src={value} />
      },
      width: 150,
    },
    {
      title: '是否活跃',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (value: boolean) => {
        return value ? <Tag color="success">活跃</Tag> : <Tag color="warning">非活跃</Tag>
      },
      width: 150,
    }
  ];
  
interface IProps{
    roleId:string|undefined,
    skipCount:number,
    maxResultCount:number
}

interface IState{
    input:GetRoleUserListInput | undefined,
    rowSelection: TableRowSelection<UserInfoDto>,
    data:{
        items:UserInfoDto[],
        totalCount:number
    }
}

export default class RoleUserList extends Component<IProps,IState>{
    state: Readonly<IState>={
        input: {
            keywords:'',
            roleId:'',
            page:1,
            pageSize:10,
            loading:false
        },
        rowSelection: {
          selectedRowKeys: [],
          onChange: (key) => this.rowSelected(key)
        },
        data: {
            items: [],
            totalCount: 0
        }
    }

    rowSelected(key: any) {
        var { rowSelection } = this.state;
        rowSelection.selectedRowKeys = key;
        this.setState({
          rowSelection
        })
      }


    constructor(props:IProps){
        super(props)
        this.getUserList()
    }

    /**
     * 获取角色下所有用户
     */
    getUserList(){
        var {input} = this.state
        if(input){
            input.roleId = this.props.roleId!;
            input.page = this.props.skipCount;
            input.pageSize = this.props.maxResultCount;
            userApi.roleUserList(input)
                .then(res=>{
                    this.setState({
                        data:res
                    })
                })
        }
    }

    render() {
        var {input,data,rowSelection} = this.state;
        return(<div  >
                <Table rowSelection={rowSelection} loading={input?.loading} columns={columns} dataSource={data.items} scroll={{ x: 1500, y: 300 }} />
        </div>)
    }
}