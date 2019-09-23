import Layout from '@/views/layout/Layout.vue';

export default [
    {
        path: '/config',
        show: false,
        id: 'config',
        name: 'Config',
        component: Layout,
        meta: {
            title: '配置管理',
            icon: 'iconfont icon-icon-test1'
        },
        children: [
            {
                path: '/remind',
                id: 'config-remind',
                show: false,
                name: 'ConfigRemind',
                meta: {
                    title: '提醒管理',
                    icon: 'iconfont icon-iconfontzhizuobiaozhun41'
                },
                component:() => import('@/views/config/index.vue'),
                children:[{
                    path: 'todoList',
                    id: 'config-remind-todoList',
                    show: false,
                    name: 'TodoList',
                    component: () => import('@/views/config/remind/todoList.vue'),
                    meta: {
                        title: '待办提醒',
                        icon: 'iconfont icon-daiban1'
                    },
                },{
                    path: 'todoForm',
                    id: 'config-remind-todoForm',
                    show: false,
                    name: 'TodoForm',
                    component: () => import('@/views/config/remind/todoForm.vue'),
                    meta: {
                        title: '待办提醒',
                        icon: ''
                    },
                },{
                    path: 'inspectList',
                    id: 'config-remind-inspectList',
                    show: false,
                    name: 'InspectList',
                    component: () => import('@/views/config/remind/inspectList.vue'),
                    meta: {
                        title: '审批提醒',
                        icon: 'iconfont icon-shenpi'
                    },
                },{
                    path: 'inspectForm',
                    id: 'config-remind-inspectForm',
                    show: false,
                    name: 'InspectForm',
                    component: () => import('@/views/config/remind/inspectForm.vue'),
                    meta: {
                        title: '审批提醒',
                        icon: ''
                    },
                }]
            },
        ]
    }
];
