import Layout from '@/views/layout/Layout.vue';

export default [
    {
        path: '/task',
        show: false,
        id: 'task',
        name: 'Task',
        redirect: '/task/todo',
        // component:() => import('@/views/task/index'),
        component: Layout,
        meta: {
            title: '我的任务',
            icon: 'iconfont icon-woderenwu'
        },
        children: [
            {
                path: 'todo',
                show: false,
                id: 'task-todo',
                name: 'Todo',
                component: () => import('@/views/task/todoList.vue'),
                meta: {
                    title: '待办任务',
                    icon: 'iconfont icon-daiban',
                    reGet:true
                }
            },
            {
                path: 'done',
                id: 'task-done',
                show: false,
                name: 'Done',
                component: () => import('@/views/task/doneList.vue'),
                meta: {
                    title: '已办任务',
                    icon: 'iconfont icon-yiban',
                    reGet:true
                }
            }
        ]
    }
];
