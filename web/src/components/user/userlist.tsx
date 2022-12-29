import { Component, ReactNode } from "react";
import { Table, Avatar, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import UserApi from "@/apis/userApi";
import { GetListInput, UserInfoDto } from "@/module/Users";
import { PagedResultDto } from "@/module/PagedResultDto";
import request from "@/utils/request";

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
    render: (value, recod) => {
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

request.get('/api/app/user-info/profile')
  .then(res => {

  })
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
      items: []
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

        this.setState({
          data: res
        })
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