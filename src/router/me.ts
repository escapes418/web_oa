import Layout from '@/views/layout/Layout.vue';

export default [
    {
        path: '/me',
        show: false,
        id: 'me',
        component: Layout,
        redirect: '/me/reim',
        name: 'Me',
        meta: {
            title: '个人中心',
            icon: 'iconfont icon-weibiaoti562'
        },
        children: [
            {
                path: 'reim',
                id: 'me-reim',
                show: false,
                name: 'ReimList',
                component: () => import('@/views/reim/list.vue'),
                meta: {
                    title: '报销申请',
                    icon: 'iconfont icon-icon-test'
                }
            },
            {
                path: 'reimForm',
                show: false,
                id: 'me-reimForm',
                name: 'ReimForm',
                component: () => import('@/views/reim/form.vue'),
                meta: {
                    title: '新建报销申请',
                    icon: 'tree',
                    reGet:true
                },
                hidden: true
            },
            {
                path: 'reimDetail',
                id: 'me-reimDetail',
                show: false,
                name: 'ReimDetail',
                component: () => import('@/views/reim/detail.vue'),
                meta: {
                    title: '报销详情',
                    icon: 'tree'
                },
                hidden: true
            },
            {
                path: 'reimPay',
                id: 'me-reimPay',
                show: false,
                name: 'ReimPay',
                component: () => import('@/views/reimPay/list.vue'),
                meta: {
                    title: '报销付款管理',
                    icon: 'iconfont icon-changyongshili'
                },
                
            },
            {
                path: 'payList',
                id: 'me-payList',
                show: false,
                name: 'PayList',
                component: () => import('@/views/advancePay/list.vue'),
                meta: {
                    title: '提前打款管理',
                    icon: 'iconfont icon-qianbao'
                }
            },
            {
                path: 'payDetail',
                id: 'me-payDetail',
                show: false,
                name: 'PayDetail',
                component: () => import('@/views/advancePay/detail.vue'),
                meta: {
                    title: '提前打款详情',
                    icon: 'tree'
                },
                hidden: true
            },
            {
                path: 'recepList',
                id: 'me-recepList',
                show: false,
                name: 'RecepList',
                component: () => import('@/views/reception/list.vue'),
                meta: {
                    title: '接待申请',
                    icon: 'iconfont icon-gongwujiedai'
                }
            },
            {
                path: 'recepForm',
                id: 'me-recepForm',
                show: false,
                name: 'RecepForm',
                component: () => import('@/views/reception/form.vue'),
                meta: {
                    title: '新建接待申请',
                    icon: '',
                    reGet:true
                },
                hidden: true
            },
            {
                path: 'recepDetail',
                id: 'me-recepDetail',
                show: false,
                name: 'RecepDetail',
                component: () => import('@/views/reception/detail.vue'),
                meta: {
                    title: '接待申请详情',
                    icon: ''
                },
                hidden: true
            },
            //出差申请~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            {
                path: 'travelingList',
                id: 'me-travelingList',
                show: false,
                name: 'TravelingList',
                component: () => import('@/views/traveling/list.vue'),
                meta: {
                    title: '出差申请',
                    icon: 'iconfont icon-zhifuqianbao',
                   
                }
            },
            {
                path: 'travelingForm',
                id: 'me-travelingForm',
                show: false,
                name: 'TravelingForm',
                component: () => import('@/views/traveling/form.vue'),
                meta: {
                    title: '新建出差申请',
                    icon: '',
                    reGet:true
                },
                hidden: true
            },
            {
                path: 'travelingDetail',
                id: 'me-travelingDetail',
                show: false,
                name: 'TravelingDetail',
                component: () => import('@/views/traveling/detail.vue'),
                meta: {
                    title: '出差申请详情',
                    icon: ''
                },
                hidden: true
            },
            {
                path: 'loanList',
                id: 'me-loanList',
                show: false,
                name: 'LoanList',
                component: () => import('@/views/loan/list.vue'),
                meta: {
                    title: '借款申请',
                    icon: 'iconfont icon-jiekuan',
                   
                }
            },
            {
                path: 'loanForm',
                id: 'me-loanForm',
                show: false,
                name: 'LoanForm',
                component: () => import('@/views/loan/form.vue'),
                meta: {
                    title: '新建借款申请',
                    icon: '',
                },
                hidden: true
            },{
                path: 'loanDetail',
                id: 'me-loanDetail',
                show: false,
                name: 'LoanDetail',
                component: () => import('@/views/loan/detail.vue'),
                meta: {
                    title: '借款申请详情',
                    icon: ''
                },
                hidden: true
            },
            {
                path: 'repayList',
                id: 'me-repayList',
                show: false,
                name: 'RepayList',
                component: () => import('@/views/repay/list.vue'),
                meta: {
                    title: '还款申请',
                    icon: 'iconfont icon-huankuan',
                   
                }
            },
            {
                path: 'repayForm',
                id: 'me-repayForm',
                show: false,
                name: 'RepayForm',
                component: () => import('@/views/repay/form.vue'),
                meta: {
                    title: '新建还款申请',
                    icon: '',
                },
                hidden: true
            },
            {
                path: 'repayDetail',
                id: 'me-repayDetail',
                show: false,
                name: 'RepayDetail',
                component: () => import('@/views/repay/detail.vue'),
                meta: {
                    title: '还款详情',
                    icon: '',
                },
                hidden: true
            },
            {
                path: 'paymentList',
                id: 'me-paymentList',
                show: false,
                name: 'PaymentList',
                component: () => import('@/views/pay/list.vue'),
                meta: {
                    title: '付款申请',
                    icon: 'iconfont icon-fukuan',
                   
                }
            },
            {
                path: 'paymentForm',
                id: 'me-paymentForm',
                show: false,
                name: 'PaymentForm',
                component: () => import('@/views/pay/form.vue'),
                meta: {
                    title: '新建付款申请',
                    icon: '',
                },
                hidden: true
            },
            {
                path: 'paymentDetail',
                id: 'me-paymentDetail',
                show: false,
                name: 'PaymentDetail',
                component: () => import('@/views/pay/detail.vue'),
                meta: {
                    title: '付款详情',
                    icon: '',
                },
                hidden: true
            },

            //资源申请~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            {
                path: 'resourceList',
                id: 'me-resourceList',
                show: false,
                name: 'ResourceList',
                component: () => import('@/views/resource/list.vue'),
                meta: {
                    title: '资源申请',
                    icon: 'iconfont icon-changyongshili'
                }
            },
            {
                path: 'resourceForm',
                id: 'me-resourceForm',
                show: false,
                name: 'ResourceForm',
                component: () => import('@/views/resource/form.vue'),
                meta: {
                    title: '新建资源申请',
                    icon: '',
                    reGet:true
                },
                hidden: true
            },
            {
                path: 'resourceDetail',
                id: 'me-resourceDetail',
                show: false,
                name: 'ResourceDetail',
                component: () => import('@/views/resource/detail.vue'),
                meta: {
                    title: '资源申请详情',
                    icon: ''
                },
                hidden: true
            },
            // 资源申请办理 - 列表
            {
                path: 'resHandleList',
                id: 'me-resHandleList',
                show: false,
                name: 'ResHandleList',
                component: () => import('@/views/resHandle/list.vue'),
                meta: {
                    title: '资源申请办理',
                    icon: 'iconfont icon-banliliucheng'
                }
            },
            // 资源申请办理 - 详情
            {
                path: 'resHandleDetail',
                id: 'me-resHandleDetail',
                show: false,
                name: 'ResHandleDetail',
                component: () => import('@/views/resHandle/detail.vue'),
                meta: {
                    title: '资源申请办理详情',
                    icon: 'iconfont icon-changyongshili'
                },
                hidden: true
            },
            // 资源申请办理 - 表单
            {
                path: 'resHandleForm',
                id: 'me-resHandleForm',
                show: false,
                name: 'ResHandleForm',
                component: () => import('@/views/resHandle/form.vue'),
                meta: {
                    title: '新建资源申请办理',
                    icon: 'iconfont icon-changyongshili',
                    reGet:true
                },
                hidden: true
            },
            //合同审核申请 - 列表
            {
                path: 'contractCheckList',
                id: 'me-contractCheckList',
                show: false,
                name: 'ContractCheckList',
                component: () => import('@/views/contractCheck/list.vue'),
                meta: {
                    title: '合同审核办理',
                    icon: 'iconfont icon-hetong1'
                }
            },
            // 合同审核申请- 详情
            {
                path: 'contractCheckDetail',
                id: 'me-contractCheckDetail',
                show: false,
                name: 'ContractCheckDetail',
                component: () => import('@/views/contractCheck/detail.vue'),
                meta: {
                    title: '合同审核详情',
                    icon: 'iconfont icon-changyongshili'
                },
                hidden: true
            },
            // 合同审核申请 - 表单
            {
                path: 'contractCheckForm',
                id: 'me-contractCheckForm',
                show: false,
                name: 'ContractCheckForm',
                component: () => import('@/views/contractCheck/form.vue'),
                meta: {
                    title: '新建合同审核',
                    icon: 'iconfont icon-changyongshili'
                },
                hidden: true
            },
            {
                path: 'accountList',
                id: 'me-accountList',
                show: false,
                name: 'AccountList',
                component: () => import('@/views/account/list.vue'),
                meta: {
                    title: '账户管理',
                    icon: 'iconfont icon-changyongshili'
                },
            },
            {
                path: 'addAccount',
                id: 'me-addAccount',
                show: false,
                name: 'AddAccount',
                component: () => import('@/views/account/form.vue'),
                meta: {
                    title: '新建收款账户',
                    icon: 'iconfont icon-changyongshili'
                },
                hidden: true
            }
        ]
    }
];
