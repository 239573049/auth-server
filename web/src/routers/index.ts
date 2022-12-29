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
                component: '@/pages/admin/home/index',
            },
            {
                name: '用户管理',
                path: '/user',
                component: '@/pages/admin/user/index',
            },
            {
                name: '客户端管理',
                path: '/client',
                component: '@/pages/admin/client/index',
            },
            {
                name: '系统设置',
                path: '/setting',
                component: '@/pages/admin/setting/index',
            },
        ],
    },
];

export default routes;