import {
  HomeFilled,
  SettingFilled,
  UserOutlined,
} from '@ant-design/icons';
import Icon from '@ant-design/icons';
import Texty from 'rc-texty';

const clientSvg = () => {
  return (
    <svg
      viewBox="0 0 1250 900"
      focusable="false"
      data-icon="user"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        d="M823.532308 1024H397.390769a19.692308 19.692308 0 0 1 0-39.384615h426.141539a19.692308 19.692308 0 0 1 0 39.384615zM1122.461538 905.846154h-1024A98.461538 98.461538 0 0 1 0 807.384615v-708.923077A98.461538 98.461538 0 0 1 98.461538 0h1024A98.461538 98.461538 0 0 1 1220.923077 98.461538v708.923077a98.461538 98.461538 0 0 1-98.461539 98.461539zM98.461538 39.384615A59.076923 59.076923 0 0 0 39.384615 98.461538v708.923077A59.076923 59.076923 0 0 0 98.461538 866.461538h1024a59.076923 59.076923 0 0 0 59.076924-59.076923v-708.923077A59.076923 59.076923 0 0 0 1122.461538 39.384615z"
        p-id="2690"
      ></path>
    </svg>
  );
};

const roleSvg = () => {
  return (
    <svg
    viewBox="0 0 1250 900"
    focusable="false"
    data-icon="user"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
    >
      <path
        d="M401.066667 384a64 64 0 1 1-64 64A64 64 0 0 1 401.066667 384m0-85.333333a149.333333 149.333333 0 1 0 149.333333 149.333333A149.333333 149.333333 0 0 0 401.066667 298.666667z"
        fill="#666666"
        p-id="2702"
      ></path>
      <path
        d="M571.733333 768a42.666667 42.666667 0 0 1-42.666666-42.666667 128 128 0 0 0-256 0 42.666667 42.666667 0 0 1-85.333334 0 213.333333 213.333333 0 0 1 426.666667 0 42.666667 42.666667 0 0 1-42.666667 42.666667z"
        fill="#666666"
        p-id="2703"
      ></path>
      <path
        d="M870.4 213.333333v597.333334h-725.333333V213.333333h725.333333m0-85.333333h-725.333333a85.333333 85.333333 0 0 0-85.333334 85.333333v597.333334a85.333333 85.333333 0 0 0 85.333334 85.333333h725.333333a85.333333 85.333333 0 0 0 85.333333-85.333333V213.333333a85.333333 85.333333 0 0 0-85.333333-85.333333z"
        fill="#666666"
        p-id="2704"
      ></path>
      <path
        d="M742.4 341.333333h-85.333333a42.666667 42.666667 0 1 0 0 85.333334h85.333333a42.666667 42.666667 0 0 0 0-85.333334zM785.066667 469.333333h-128a42.666667 42.666667 0 1 0 0 85.333334h128a42.666667 42.666667 0 0 0 0-85.333334z"
        fill="#666666"
        p-id="2705"
      ></path>
    </svg>
  );
};

export default {
  route: {
    path: '/',
    routes: [
      {
        path: '/',
        name: <Texty mode="random">首页</Texty>,
        icon: <HomeFilled />,
        component: '@/pages/admin/home/index',
      },
      {
        path: '/role',
        name: <Texty mode="random">角色管理</Texty>,
        icon: <Icon component={roleSvg as any} />,
        component: '@/pages/admin/role/index',
      },
      {
        path: '/user',
        name: <Texty  mode="random">用户管理</Texty>,
        icon: <UserOutlined />,
        component: '@/pages/admin/user/index',
      },
      {
        path: '/application',
        name: <Texty  mode="random">应用管理</Texty>,
        icon: <Icon component={clientSvg} />,
        component: '@/pages/admin/application/index',
      },
      {
        path: '/setting',
        name: <Texty  mode="random">系统设置</Texty>,
        icon: <SettingFilled />,
        component: '@/pages/admin/setting/index',
      },
    ],
  },
  location: {
    pathname: '/',
  },
  appList: [],
};
