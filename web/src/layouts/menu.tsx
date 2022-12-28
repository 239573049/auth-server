import {
    SettingOutlined,
    HomeOutlined,
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
                    component: '@/pages/home/index',
                    icon: <HomeOutlined />,
                },
                {
                    name: '系统设置',
                    path: '/setting',
                    icon: <SettingOutlined />,
                    component: '@/pages/setting/index',
                },
            ],
        },
    ],
};
export default routes;