import Layout from '@/views/layout/Layout.vue';

export default [
    {
        path: '/report',
        id: 'report',
        show: false,
        component: Layout,
        meta: {
            title: '统计报表',
            icon: 'iconfont icon-tongjibaobiao'
        },
        redirect: '/inforManage/implement',
        children: [
            {
                path: 'feeSubject',
                id: 'report-feeSubject',
                show: false,
                name: 'FeeSubject',
                component: () => import('@/views/report/feeSubject.vue'),
                meta: {
                    title: '科目费用统计',
                    icon: 'iconfont icon-feiyongkemu'
                },
                hidden: false
            },
            {
                path: 'financeSub',
                id: 'report-financeSub',
                show: false,
                name: 'FinanceSub',
                component: () => import('@/views/report/financeSub.vue'),
                meta: {
                    title: '财务费用统计',
                    icon: 'iconfont icon-feiyongkemu'
                },
                hidden: false
            },
            // {
            //     path: 'financedetail',
            //     id: 'report-financedetail',
            //     show: false,
            //     name: 'Financedetail',
            //     component: () => import('@/views/report/financedetail.vue'),
            //     meta: {
            //         title: '财务费用详情',
            //         icon: 'iconfont icon-feiyongkemu'
            //     },
            //     hidden: false
            // },
            {
                path: 'feeDepartment',
                id: 'report-feeDepartment',
                show: false,
                name: 'FeeDepartment ',
                component: () => import('@/views/report/feeDepartment.vue'),
                meta: {
                    title: '部门费用统计',
                    icon: 'iconfont icon-bumenfeiyongfenxi'
                },
                hidden: false
            },
            {
                path: 'feeEmployee',
                id: 'report-feeEmployee',
                show: false,
                name: 'FeeEmployee  ',
                component: () => import('@/views/report/feeEmployee.vue'),
                meta: {
                    title: '员工费用统计',
                    icon: 'iconfont icon-ygzjbx'
                },
                hidden: false
            },
            {
                path: 'feeProject',
                id: 'report-feeProject',
                show: false,
                name: 'FeeProject',
                component: () => import('@/views/report/feeProject.vue'),
                meta: {
                    title: '项目费用统计',
                    icon: 'iconfont icon-xiangmufeiyong'
                },
                hidden: false
            },
            {
                path: 'feeProjectSub',
                id: 'report-feeProjectSub',
                show: false,
                name: 'FeeProjectSub',
                component: () => import('@/views/report/feeProjectSub.vue'),
                meta: {
                    title: '项目科目费用统计',
                    icon: 'iconfont icon-xiangmufeiyong'
                },
                hidden: false
            },
            {
                path: 'feeImple',
                id: 'report-feeImple',
                show: false,
                name: 'FeeImple',
                component: () => import('@/views/report/feeImple.vue'),
                meta: {
                    title: '实施每日报表',
                    icon: 'iconfont icon-renwutiaodu'
                },
                hidden: false
            },
            {
                path: 'implementer',
                id: 'report-implementer',
                show: false,
                name: 'Implementer',
                component: () => import('@/views/report/implementer.vue'),
                meta: {
                    title: '实施人员报表',
                    icon: 'iconfont icon-Fun_icon03'
                },
                hidden: false
            },
            {
                path: 'functionUse',
                id: 'report-functionUse',
                show: false,
                name: 'FunctionUse',
                component: () => import('@/views/report/functionUse.vue'),
                meta: {
                    title: '功能使用报表',
                    icon: 'iconfont icon-gongnengshiyong'
                },
                hidden: false
            },
            {
                path: 'reimDoc',
                id: 'report-reimDoc',
                show: false,
                name: 'ReimDoc',
                component: () => import('@/views/report/reimDoc.vue'),
                meta: {
                    title: '报销单据报表',
                    icon: 'iconfont icon-baoxiao'
                },
                hidden: false
            },
            {
                path: 'presentDoc',
                id: 'report-presentDoc',
                show: false,
                name: 'PresentDoc',
                component: () => import('@/views/report/presentDoc.vue'),
                meta: {
                    title: '单据提交报表',
                    icon: 'iconfont icon-danju'
                },
                hidden: false
            },{
                path: 'approveDoc',
                id: 'report-approveDoc',
                show: false,
                name: 'ApproveDoc',
                component: () => import('@/views/report/approveDoc.vue'),
                meta: {
                    title: '单据审批报表',
                    icon: 'iconfont icon-renyuanpaiban'
                },
                hidden: false
            },
            {
                path: 'trendChart',
                id: 'report-trendChart',
                show: false,
                name: 'TrendChart',
                component: () => import('@/views/report/trendChart.vue'),
                meta: {
                    title: '单据审批趋势',
                    icon: 'iconfont icon-danjutongji'
                },
                hidden: false
            },
            {
                path: 'overdue',
                id: 'report-overdue',
                show: false,
                name: 'Overdue',
                component: () => import('@/views/report/overdue.vue'),
                meta: {
                    title: '合同逾期报表',
                    icon: 'iconfont icon-daohangtubiao_huabanfuben'
                },
                hidden: false
            },
            {
                path: 'maintainStatistic',
                id: 'report-maintainStatistic',
                show: false,
                name: 'MaintainStatistic',
                component: () => import('@/views/report/maintainStatistic.vue'),
                meta: {
                    title: '主客户维护报表',
                    icon: 'iconfont icon-zhongyaokehu'
                },
                hidden: false
            },
            {
                path: 'vipCustomer',
                id: 'report-vipCustomer',
                show: false,
                name: 'VipCustomer',
                component: () => import('@/views/report/vipCustomer.vue'),
                meta: {
                    title: 'vip客服维护报表',
                    icon: 'iconfont icon-vipkefu'
                },
                hidden: false
            },
            {
                path: 'saleStatistic',
                id: 'report-saleStatistic',
                show: false,
                name: 'SaleStatistic',
                component: () => import('@/views/report/saleStatistic.vue'),
                meta: {
                    title: '销售工作统计',
                    icon: 'iconfont icon-xiaoshoutongji'
                },
                hidden: false
            },{
                path: 'saleManStatistic',
                id: 'report-saleManStatistic',
                show: false,
                name: 'SaleManStatistic',
                component: () => import('@/views/report/saleManStatistic.vue'),
                meta: {
                    title: '销售工作统计',
                    icon: 'iconfont'
                },
                hidden: false
            },{
                path: 'rentCarRefuel',
                id: 'report-rentCarRefuel',
                show: false,
                name: 'RentCarRefuel',
                component: () => import('@/views/report/rentFuel.vue'),
                meta: {
                    title: '租车加油',
                    icon: 'iconfont icon-xiaoshoutongji'
                },
                hidden: false
            },{
                path: 'rentFuelDetail',
                id: 'report-rentFuelDetail',
                show: false,
                name: 'RentCarDetail',
                component: () => import('@/views/report/rentFuelDetail.vue'),
                meta: {
                    title: '租车加油详情',
                    icon: 'iconfont icon-xiaoshoutongji'
                },
                hidden: false
            }
        ]
    }
];
