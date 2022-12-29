import { Component, ReactNode } from 'react';
import { GithubFilled, InfoCircleFilled, QuestionCircleFilled } from '@ant-design/icons';
import { PageContainer, ProLayout, ProCard } from '@ant-design/pro-components';
import menu from './menu'
import { history } from 'umi'
import userApi from '@/apis/userApi';
import { UserInfoDto } from '@/module/Users';

interface IProps {

}

interface IState {
  pathname: string,
  user: UserInfoDto
}

export default class App extends Component<IProps, IState>{
  state: Readonly<IState> = {
    pathname: '',
    user: {
      userName: 'test',
      name: 'test',
      avatar: '',
      surname: '',
      email: '239573049@qq.com',
      phoneNumber: '',
      isActive: false,
      twoFactorEnabled: false,
      id: ""
    }
  }

  constructor(props: any) {
    super(props);
    this.getProfile()
  }

  getProfile() {
    userApi.getProfile()
      .then(res => {
        this.setState({
          user: res
        })
      })
  }

  render(): ReactNode {
    var { pathname, user } = this.state;

    return (
      <div
        id="test-pro-layout"
        style={{
          height: '100vh',
        }}
      >
        <ProLayout
          siderWidth={216}
          bgLayoutImgList={[
            {
              src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
              left: 85,
              bottom: 100,
              height: '303px',
            },
            {
              src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
              bottom: -68,
              right: -45,
              height: '303px',
            },
            {
              src: 'https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png',
              bottom: 0,
              left: 0,
              width: '331px',
            },
          ]}
          {...menu}
          location={{
            pathname,
          }}
          title="授权中心"
          logo="https://blog-simple.oss-cn-shenzhen.aliyuncs.com/logo.png"
          avatarProps={{
            src: user?.avatar ?? '',
            title: user?.name ?? '',
            size: 'small',
          }}
          actionsRender={(props) => {
            if (props.isMobile) return [];
            return [
              <InfoCircleFilled key="InfoCircleFilled" />,
              <QuestionCircleFilled key="QuestionCircleFilled" />,
              <GithubFilled key="GithubFilled" href='https://github.com/239573049' />,
            ];
          }}
          menuItemRender={(item, dom) =>
          (
            <div
              onClick={() => {
                pathname = item.path || '/';
                history.push(pathname)
                this.setState({
                  pathname,
                });
              }}
            >
              {dom}
            </div>
          )}
        >
          <PageContainer>
            <ProCard
              style={{
                height: '90vh',
              }}
            >
              {this.props.children}
            </ProCard>
          </PageContainer>
        </ProLayout>
      </div>
    );
  }
}