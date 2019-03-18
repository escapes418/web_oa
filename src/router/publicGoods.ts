import Layout from '@/views/layout/Layout.vue';

export default [
    {
        path: '/publicGoods',
        show: false,
        id: 'publicGoods',
        name: 'PublicGoods',
        redirect: '/publicGoods/fixedAssetsList',
        component: Layout,
        meta: {
            title: '公共物品管理',
            icon: 'iconfont icon-wupinguanli'
        },
        children: [
            {
                path: 'fixedAssetsList',
                id: 'publicGoods-fixedAssetsList',
                show: false,
                name: 'FixedAssetsList',
                component: () => import('@/views/fixedAssets/list.vue'),
                meta: {
                    title: '固定资产管理列表',
                    icon: 'iconfont icon-zichanguanli'
                }
            },
            {
                path: 'fixedAssetsFrom/:id',
                id: 'publicGoods-fixedAssetsFrom',
                show: false,
                name: 'FixedAssetsFrom',
                component: () => import('@/views/fixedAssets/from.vue'),
                meta: {
                    title: '固定资产管理',
                    icon: 'iconfont icon-xiezuoxing'
                }
            },
            {
                path: 'useOrMove',
                id: 'publicGoods-useOrMove',
                show: false,
                name: 'useOrMove',
                component: () => import('@/views/fixedAssets/useOrMove.vue'),
                meta: {
                    title: '资产领用/转移',
                    icon: 'iconfont icon-xiezuoxing'
                }
            },
            {
                path: 'relibrary',
                id: 'publicGoods-relibrary',
                show: false,
                name: 'relibrary',
                component: () => import('@/views/fixedAssets/relibrary.vue'),
                meta: {
                    title: '资产退库',
                    icon: 'iconfont icon-xiezuoxing'
                }
            },
            {
                path: 'verifyAssets',
                id: 'publicGoods-verifyAssets',
                show: false,
                name: 'verifyAssets',
                component: () => import('@/views/fixedAssets/verifyAssets.vue'),
                meta: {
                    title: '核销库存',
                    icon: 'iconfont icon-xiezuoxing'
                }
            },{
                path: 'consumList',
                id: 'publicGoods-consumList',
                show: false,
                name: 'ConsumList',
                component: () => import('@/views/goods/list.vue'),
                meta: {
                    title: '消耗品管理',
                    icon: 'iconfont icon-xiaohaopin'
                }
            },{
                path: 'consumForm',
                id: 'publicGoods-consumForm',
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
                id: 'publicGoods-consumStock',
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
                id: 'publicGoods-consumReceive',
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
                id: 'publicGoods-consumVerify',
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
