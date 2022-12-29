import { ChromeFilled, HomeFilled, SettingFilled, UserOutlined } from '@ant-design/icons';
import Icon from '@ant-design/icons';

const clientSvg = () => {
  return <svg viewBox="0 0 1250 900" focusable="false" data-icon="user" width="1em" height="1em" fill="currentColor" aria-hidden="true">
    <path d="M823.532308 1024H397.390769a19.692308 19.692308 0 0 1 0-39.384615h426.141539a19.692308 19.692308 0 0 1 0 39.384615zM1122.461538 905.846154h-1024A98.461538 98.461538 0 0 1 0 807.384615v-708.923077A98.461538 98.461538 0 0 1 98.461538 0h1024A98.461538 98.461538 0 0 1 1220.923077 98.461538v708.923077a98.461538 98.461538 0 0 1-98.461539 98.461539zM98.461538 39.384615A59.076923 59.076923 0 0 0 39.384615 98.461538v708.923077A59.076923 59.076923 0 0 0 98.461538 866.461538h1024a59.076923 59.076923 0 0 0 59.076924-59.076923v-708.923077A59.076923 59.076923 0 0 0 1122.461538 39.384615z" p-id="2690">
    </path>
  </svg >
}

export default {
  route: {
    path: '/',
    routes: [
      {
        path: '/',
        name: '首页',
        icon: <HomeFilled />,
        component: '@/pages/admin/home/index',
      },
      {
        path: '/user',
        name: '用户管理',
        icon: <UserOutlined />,
        component: '@/pages/admin/user/index',
      },
      {
        path: '/client',
        name: '客户端管理',
        icon: <Icon component={clientSvg} />,
        component: '@/pages/admin/client/index',
      },
      {
        path: '/setting',
        name: '系统设置',
        icon: <SettingFilled />,
        component: '@/pages/admin/setting/index',
      },
    ],
  },
  location: {
    pathname: '/',
  },
  appList: [
  ],
};