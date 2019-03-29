import Layout from '@/views/layout/Layout.vue';

export default [
    {
        path: '/goods',
        show: false,
        id: 'goods',
        name: 'Goods',
        redirect: '/task/todo',
        // component:() => import('@/views/task/index'),
        component: Layout,
        meta: {
            title: '公共物品管理',
            icon: 'iconfont icon-OAxitong'
        },
        children: [
            {
                path: 'taskList',
                show: false,
                id: 'oa-taskList',
                name: 'OaTaskList',
                component: () => import('@/views/oa/taskList.vue'),
                meta: {
                    title: '任务列表',
                    icon: 'iconfont icon-renwuzhongxin'
                }
            },
            {
                path: 'coopList',
                id: 'oa-coopList',
                show: false,
                name: 'CoopList',
                component: () => import('@/views/cooperate/list.vue'),
                meta: {
                    title: '协作管理',
                    icon: 'iconfont icon-xiezuoxing'
                }
            },
            {
                path: 'coopPlan',
                id: 'oa-coopPlan',
                show: false,
                name: 'CoopPlan',
                component: () => import('@/views/cooperate/plan.vue'),
                meta: {
                    title: '协作进度',
                    icon: 'iconfont icon-yiban'
                },
                hidden: true
            },
            {
                path: 'coopForm',
                id: 'oa-coopForm',
                show: false,
                name: 'CoopForm',
                component: () => import('@/views/cooperate/form.vue'),
                meta: {
                    title: '新建协作',
                    icon: 'iconfont icon-yiban'
                },
                hidden: true
            },
            {
                path: 'coopDetail',
                id: 'oa-coopDetail',
                show: false,
                name: 'CoopDetail',
                component: () => import('@/views/cooperate/detail.vue'),
                meta: {
                    title: '协作详情',
                    icon: 'iconfont icon-yiban'
                },
                hidden: true
            }
        ]
    }
];