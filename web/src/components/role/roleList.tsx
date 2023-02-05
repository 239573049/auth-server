import roleApi from '@/apis/roleApi';
import { IdentityRoleDto } from '@/module/IdentityRoleDto';
import { UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons';
import { Avatar, List, message, Typography } from 'antd';
import { Properties } from 'csstype';
import { Component, ReactNode } from 'react';
import './roleList.less';
import event from '@/utils/event';
import AddRole from './addRole';

interface IProps {
  style: Properties<string | number, string & {}>;
  className: string;
  roleClick: any;
}
interface IState {
  data: IdentityRoleDto[];
  selectIndex: number;
  addRoleOpen: boolean;
}

export default class RoleList extends Component<IProps, IState> {
  state: Readonly<IState> = {
    data: [],
    selectIndex: 0,
    addRoleOpen: false,
  };

  componentDidMount(): void {
    this.getRoleList();
  }

  getRoleList() {
    roleApi.all().then((res) => {
      if(res){
        // 默认选择第一个角色
        this.props.roleClick(res.items[0]);
        this.eventRoleClick(res.items[0]);
        this.setState({
          data: res.items,
          selectIndex: 0,
        });
      }
    });
  }

  eventRoleClick(value: IdentityRoleDto) {
    event.emit('RolePermission', value);
    event.emit('RoleUserList', value);
  }

  onRoleClick(item: IdentityRoleDto) {
    var { data } = this.state;
    this.props.roleClick(item);
    this.eventRoleClick(item);
    this.setState({
      selectIndex: data.indexOf(item),
    });
  }

  /**
   * 删除角色
   */
  deleteRole() {
    var { selectIndex, data } = this.state;
    var value = data[selectIndex];
    if (value && value.isStatic === false) {
      roleApi.delete(value.id).then((res) => {
        message.success('删除成功');
        this.getRoleList();
      });
    } else if (value.isStatic) {
      message.warning('静态角色无法删除');
    }
  }

  render() {
    var { data, selectIndex, addRoleOpen } = this.state;
    return (
      <div style={this.props.style} className={this.props.className}>
        <List
          header={
            <div>
              <span>角色列表</span>
              <span style={{ float: 'right', cursor: 'pointer' }}>
                <UserAddOutlined
                  onClick={() => {
                    this.setState({ addRoleOpen: true });
                  }}
                  style={{ padding: '5px' }}
                />
                <UserDeleteOutlined
                  style={{ padding: '5px' }}
                  onClick={() => this.deleteRole()}
                />
              </span>
            </div>
          }
          bordered
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item key={item.id} onClick={() => this.onRoleClick(item)}>
              <List.Item.Meta
                className={`list ${selectIndex === index ? 'list-select' : ''}`}
                avatar={
                  <Avatar src="https://blog-simple.oss-cn-shenzhen.aliyuncs.com/Avatar.jpg" />
                }
                title={item.name}
                description={`${item.isDefault ? '默认角色' : '非默认角色'} ${
                  item.isPublic ? '公开角色' : '非公开角色'
                } ${
                  item.isStatic
                    ? '静态角色(静态角色不能被删除或者重命名)'
                    : '非静态角色'
                }`}
              />
            </List.Item>
          )}
        />
        <AddRole
          open={addRoleOpen}
          onCancel={(value: boolean) => {
            if (value) {
              this.getRoleList();
            }
            this.setState({
              addRoleOpen: false,
            });
          }}
        />
      </div>
    );
  }
}
