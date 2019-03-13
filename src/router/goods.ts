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
                path: 'consumList',
                id: 'goods-consumList',
                show: false,
                name: 'ConsumList',
                component: () => import('@/views/goods/list.vue'),
                meta: {
                    title: '消耗品管理',
                    icon: 'iconfont icon-xiezuoxing'
                }
            },{
                path: 'consumForm',
                id: 'goods-consumForm',
                show: false,
                name: 'ConsumForm',
                component: () => import('@/views/goods/form.vue'),
                meta: {
                    title: '新增消耗品',
                    icon: 'iconfont icon-xiezuoxing'
                },
                hidden: true
            },{
                path: 'consumStock',
                id: 'goods-consumStock',
                show: false,
                name: 'ConsumStock',
                component: () => import('@/views/goods/stock.vue'),
                meta: {
                    title: '物品入库',
                    icon: 'iconfont icon-xiezuoxing'
                },
                hidden: true
            },{
                path: 'consumReceive',
                id: 'goods-consumReceive',
                show: false,
                name: 'ConsumReceive',
                component: () => import('@/views/goods/receive.vue'),
                meta: {
                    title: '出库领用',
                    icon: 'iconfont icon-xiezuoxing'
                },
                hidden: true
            },{
                path: 'consumVerify',
                id: 'goods-consumVerify',
                show: false,
                name: 'ConsumVerify',
                component: () => import('@/views/goods/verify.vue'),
                meta: {
                    title: '核销库存',
                    icon: 'iconfont icon-xiezuoxing'
                },
                hidden: true
            }
        ]
    }
];
