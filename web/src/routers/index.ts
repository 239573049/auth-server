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
                name: '角色管理',
                path: '/role',
                component: '@/pages/admin/role/index',
            },
            {
                name: '用户管理',
                path: '/user',
                component: '@/pages/admin/user/index',
            },
            {
                name: '应用管理',
                path: '/application',
                component: '@/pages/admin/application/index',
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