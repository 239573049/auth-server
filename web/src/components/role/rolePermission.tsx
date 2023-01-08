import { Checkbox, List, message } from 'antd';
import { Component } from 'react';
import event from '@/utils/event';
import { IdentityRoleDto } from '@/module/IdentityRoleDto';
import permissionsApi from '@/apis/permissionsApi';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

interface IProps{
    role:IdentityRoleDto|null
}   

export default class RolePermission extends Component<IProps>{
  state = {
    roleName: '',
    data: [] as any[],
  };

  componentDidMount(): void {
    // 先删除监听器 防止重复监听
    event.removeAllListeners('RolePermission');
    
    event.on('RolePermission', (value: IdentityRoleDto) => {
      console.log('RolePermission', value);
      this.getPermissionList(value.name);
    });

    this.getPermissionList(this.props.role!.name)
  }

  componentWillUnmount(): void {
    // 清除监听器
    event.removeAllListeners('RolePermission');
  }

  /**
   * 获取角色权限配置
   * @param value
   */
  getPermissionList(value: string) {
    this.setState({
      roleName: value,
    });
    permissionsApi.get(value).then((res) => {
      this.setState({
        data: res,
      });
    });
  }

  /**
   * 角色权限变更
   * @param value 
   * @param item 
   */
  onChange(value: CheckboxChangeEvent, item: any) {
    permissionsApi
      .put([
        {
          isGranted: value.target.checked,
          name: item.name,
          roleName: this.state.roleName,
        },
      ])
      .then((res) => {
        message.success('成功');
        
      });
  }

  getDescription(item: any) {
    var {data} = this.state;
    return (
      <span>
        {item.description}
        <Checkbox
          style={{ float: 'right' }}
          checked={item.isGranted}
          onChange={(value: CheckboxChangeEvent) => {
            this.onChange(value, item);
            item.isGranted = value.target.checked;
            data[data.indexOf(item)] = item;
            this.setState({
                data
            })
          }}
        >
          授权
        </Checkbox>
      </span>
    );
  }

  render() {
    var { data } = this.state;
    return (
      <List
        itemLayout="horizontal"
        dataSource={data}
        style={{ maxHeight: '100%', height: '700px', overflowY: 'scroll' }}
        renderItem={(item: any) => (
          <List.Item>
            <List.Item.Meta
              title={item.name}
              description={this.getDescription(item)}
            ></List.Item.Meta>
          </List.Item>
        )}
      />
    );
  }
}
