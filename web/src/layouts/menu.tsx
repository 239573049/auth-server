import {
    SettingOutlined,
    HomeOutlined,
    UserOutlined
} from '@ant-design/icons';

const routes = {
    routes: [
        {
            path: '/',
            flatMenu: true,
            component: '@/layouts/index',
            routes: [
                {
                    name: '首页',
                    path: '/',
                    component: '@/pages/admin/home/index',
                    icon: <HomeOutlined />,
                },
                {
                    name: '用户管理',
                    path: '/user',
                    icon: <UserOutlined />,
                    component: '@/pages/admin/user/index',
                },
                {
                    name: '系统设置',
                    path: '/setting',
                    icon: <SettingOutlined />,
                    component: '@/pages/admin/setting/index',
                },
            ],
        },
    ],
};
export default routes;