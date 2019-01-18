import Layout from '@/views/layout/Layout.vue';

export default [
    {
        path: '/process',
        show: false,
        id: 'process',
        name: 'Process',
        redirect: '/process/taskList',
        // component:() => import('@/views/task/index'),
        component: Layout,
        meta: {
            title: 'OA栏目',
            icon: 'iconfont icon-woderenwu'
        },
        children: [
            {
                path: 'taskList',
                show: false,
                id: 'process-taskList',
                name: 'TaskList',
                component: () => import('@/views/process/taskList.vue'),
                meta: {
                    title: '任务列表',
                    icon: 'iconfont icon-daiban'
                }
            },
            {
                path: 'moduleList',
                id: 'process-moduleList',
                show: false,
                name: 'ModuleList',
                component: () => import('@/views/process/moduleList.vue'),
                meta: {
                    title: '模块列表',
                    icon: 'iconfont icon-yiban'
                }
            }
        ]
    }
];
