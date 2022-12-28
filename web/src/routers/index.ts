export const routes: any[] = [
    {
        name: '登录',
        path: '/login',
        component: '@/pages/user/login',
    },
    {
        path: '/',
        flatMenu: true,
        component: '@/layouts/index',
        routes: [
            {
                name: '首页',
                path: '/admin',
                component: '@/pages/home/index',
                icon: 'HomeOutlined',
            },
            {
                name: '系统设置',
                path: '/setting',
                icon: 'UserOutlined',
                component: '@/pages/setting/index',
            },
        ],
    },
];

export default routes;