import { ChromeFilled, HomeFilled, SettingFilled, UserOutlined } from '@ant-design/icons';

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