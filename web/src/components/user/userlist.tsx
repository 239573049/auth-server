import { Component, ReactNode } from "react";
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import UserApi from "@/apis/userApi";
import { GetListInput, UserInfoDto } from "@/module/Users";
import { PagedResultDto } from "@/module/PagedResultDto";

const columns: ColumnsType<UserInfoDto> = [
  {
    title: '用户名',
    width: 100,
    dataIndex: 'userName',
    key: 'userName',
    fixed: 'left',
  },
  {
    title: '昵称',
    width: 100,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
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
    render: (value) => {
      console.log('avatar', value);

      return value
    },
    width: 150,
  },
  {
    title: '是否活跃',
    dataIndex: 'isActive',
    key: 'isActive',
    width: 150,
  }
];

interface IProps {

}

interface IState {
  input: GetListInput | undefined,
  data: PagedResultDto<UserInfoDto>
}

class UserList extends Component<IProps, IState> {
  state: Readonly<IState> = {
    input: undefined,
    data: {
      items: [
        { userName: "admin", name: "admin", surname: null, email: "admin@abp.io", phoneNumber: null, isActive: true, twoFactorEnabled: false, avatar: null, id: "a2017009-8282-02c7-0b34-3a086dd0812e" }]
      ,
      totalCount: 0
    }
  }

  constructor(props: IProps) {
    super(props)
    this.getUserList()
  }

  /**
   * 获取用户表格
   */
  getUserList() {
    UserApi.getList(this.state.input)
      .then((res: PagedResultDto<UserInfoDto>) => {
        console.log('result', res);

        // this.setState({
        //   data: res
        // })
      })
  }

  render() {
    var { data } = this.state
    return (<div>
      <Table columns={columns} dataSource={data.items} scroll={{ x: 1500, y: 300 }} />
    </div>)
  }
}

export default UserList