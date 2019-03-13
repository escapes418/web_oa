import Layout from '@/views/layout/Layout.vue';
import report from '@/router/report';
import me from '@/router/me';
import inforManage from '@/router/inforManage';
import task from '@/router/task';
import process from '@/router/process';
import oa from '@/router/oa';
import goods from '@/router/goods';

export default [
    {
        path: '/login',
        show: false,
        component: () => import('@/views/login/index.vue'),
        hidden: true
    },
    {
        path: '/404',
        show: false,
        component: () => import('@/views/404.vue'),
        hidden: true
    },
    {
        path: '/',
        show: false,
        component: Layout,
        redirect: '/dashboard',
        name: 'Dashboard',
        hidden: true,
        children: [
            {
                path: 'dashboard',
                show: false,
                component: () => import('@/views/dashboard/index.vue')
            },
            {
                path: 'password',
                show: false,
                component: () => import('@/views/user/password.vue')
            }
            // ,{
            //     path: 'password',
            //     id: 'Dashboard-password',
            //     show: false,
            //     name: 'Password ',
            //     component: () =>
            //         import ('@/views/user/password'),
            //     meta: {
            //         title: '修改密码',
            //         icon: 'iconfont icon-bumenfeiyongfenxi'
            //     },
            //     hidden: false
            // }
        ]
    },
    {
        path: '/changelog',
        show: false,
        id: 'changelog',
        name: 'Changelog',
        component: () => import('@/views/changelog.vue'),
        meta: {
            title: '更新日志',
            icon: 'iconfont icon-woderenwu'
        },
        hidden: true
    },
    {
        path: '*',
        show: false,
        redirect: '/404',
        hidden: true
    },
    ...task,
    ...me,
    ...inforManage,
    ...report,
    ...process,
    ...oa,
    ...goods
];
