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
                    icon: 'iconfont icon-renyuanpaiban'
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
                    icon: 'iconfont icon-renyuanpaiban'
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
                    icon: 'iconfont icon-renyuanpaiban'
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
                    icon: 'iconfont icon-renyuanpaiban'
                },
                hidden: false
            }
        ]
    }
];
