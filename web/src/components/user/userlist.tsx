import { Component } from "react";
import { Table, Avatar, Tag, message, Space, Input, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import UserApi from "@/apis/userApi";
import { GetListInput, UserInfoDto } from "@/module/Users";
import { PagedResultDto } from "@/module/PagedResultDto";
import type { TableRowSelection } from 'antd/es/table/interface';
import CreateUser from "./createUser";
import userApi from "@/apis/userApi";

const { Search } = Input;

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

interface IProps {

}

interface IState {
  input: GetListInput,
  data: PagedResultDto<UserInfoDto>,
  rowSelection: TableRowSelection<UserInfoDto>,
  addDrawer: boolean,
}

class UserList extends Component<IProps, IState> {
  state: Readonly<IState> = {
    input: {
      keywords: '',
      page: 1,
      loading: false,
      pageSize: 20
    },
    data: {
      items: [],
      totalCount: 0
    },
    rowSelection: {
      selectedRowKeys: [],
      onChange: (key) => this.rowSelected(key)
    },
    addDrawer: false
  }

  rowSelected(key: any) {
    var { rowSelection } = this.state;
    rowSelection.selectedRowKeys = key;
    this.setState({
      rowSelection
    })
  }

  constructor(props: IProps) {
    super(props)
    this.getUserList()
  }

  /**
   * 获取用户表格
   */
  getUserList() {
    var { input } = this.state;
    input!.loading = true;
    this.setState({
      input
    })
    console.log('input', input);

    UserApi.getList(input)
      .then((res: PagedResultDto<UserInfoDto>) => {
        console.log('result', res);
        input.loading = false;
        this.setState({
          data: res,
          input
        })
      }).catch(error => {
        input.loading = false;
        this.setState({
          input
        })
      })
  }

  onDeleteUser() {
    var { rowSelection } = this.state;
    console.log('rowSelection', rowSelection);
    if (rowSelection.selectedRowKeys) {
      userApi.delete(rowSelection.selectedRowKeys)
        .then(res => {
          message.success('删除成功')
          this.getUserList()
        })
    }

  }

  onCreateUser() {
    this.setState({
      addDrawer: true
    })
  }

  render() {
    var { data, input, rowSelection, addDrawer } = this.state
    return (
      <div>
        <Space style={{ marginBottom: 16 }}>
          <Search loading={input.loading} placeholder="搜索用户列表" value={input?.keywords} onChange={(value) => {
            if (input) {
              input.keywords = value.target.value;
              this.setState({
                input
              })
            }
          }} onSearch={() => this.getUserList()} enterButton />
          <Button type="primary" ghost onClick={() => this.onCreateUser()}>
            新增用户
          </Button>
          <Button type="primary" danger ghost onClick={() => this.onDeleteUser()}>
            删除用户
          </Button>
        </Space>
        <Table rowSelection={rowSelection} loading={input.loading} columns={columns} dataSource={data.items} scroll={{ x: 1500, y: 300 }} />
        <CreateUser open={addDrawer} onClose={(value: any) => {
          if (value) {
            this.getUserList()
          }
          this.setState({
            addDrawer: false
          })
        }} />
      </div>)
  }
}

export default UserList