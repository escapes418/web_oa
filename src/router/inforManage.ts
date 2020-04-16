import Layout from '@/views/layout/Layout.vue';

export default [
    {
        path: '/inforManage',
        id: 'inforManage',
        show: false,
        component: Layout,
        meta: {
            title: '基本信息管理',
            icon: 'iconfont icon-jibenxinxi'
        },
        redirect: '/inforManage/implement',
        children: [
            {
                path: 'primaryCust',
                id: 'inforManage-primaryCust',
                show: false,
                name: 'PrimaryCust',
                component: () => import('@/views/primaryCust/list.vue'),
                meta: {
                    title: '主客户管理',
                    icon: 'iconfont icon-keycustomer'
                }
            },
            {
                path: 'maintainPrimary',
                id: 'inforManage-maintainPrimary',
                show: false,
                name: 'MaintainPrimary',
                component: () => import('@/views/primaryCust/maintain.vue'),
                meta: {
                    title: '维护管理',
                    icon: 'iconfont icon-kehuguanli'
                }
            },
            {
                path: 'modifyPrimary',
                id: 'inforManage-modifyPrimary',
                show: false,
                name: 'ModifyPrimary',
                component: () => import('@/views/primaryCust/modifyContact.vue'),
                meta: {
                    title: '编辑联系人',
                    icon: 'iconfont icon-kehuguanli'
                }
            },
            {
                path: 'primaryDetail',
                id: 'inforManage-primaryDetail',
                show: false,
                name: 'PrimaryDetail',
                component: () => import('@/views/primaryCust/detail.vue'),
                meta: {
                    title: '主客户详情',
                    icon: 'iconfont icon-kehuguanli'
                }
            },
            {
                path: 'contactRecord',
                id: 'inforManage-contactRecord',
                show: false,
                name: 'ContactRecord',
                component: () => import('@/views/primaryCust/contactList.vue'),
                meta: {
                    title: '联系人记录',
                    icon: 'iconfont icon-kehuguanli'
                }
            },
            {
                path: 'customerList',
                id: 'inforManage-customerList',
                show: false,
                name: 'CustomerList',
                component: () => import('@/views/customer/list.vue'),
                meta: {
                    title: '客户信息管理',
                    icon: 'iconfont icon-kehuguanli'
                }
            },
            {
                path: 'custPool',
                id: 'inforManage-custPool',
                show: false,
                name: 'CustPool',
                component: () => import('@/views/customer/custPool.vue'),
                meta: {
                    title: '客户池管理',
                    icon: 'iconfont icon-kehuchi'
                }
            },
            {
                path: 'customerForm',
                id: 'inforManage-customerForm',
                show: false,
                name: 'CustomerForm',
                component: () => import('@/views/customer/form.vue'),
                meta: {
                    title: '新建',
                    icon: ''
                },
                hidden: true
            },
            {
                path: 'customerDetail',
                id: 'inforManage-customerDetail',
                show: false,
                name: 'CustomerDetail',
                component: () => import('@/views/customer/detail.vue'),
                meta: {
                    title: '详情',
                    icon: ''
                },
                hidden: true
            },
            {
                path: 'maintainCust',
                id: 'inforManage-maintainCust',
                show: false,
                name: 'MaintainCust',
                component: () => import('@/views/customer/maintain.vue'),
                meta: {
                    title: '维护管理',
                    icon: ''
                },
                hidden: true
            },
            {
                path: 'clueList',
                id: 'inforManage-clueList',
                show: false,
                name: 'ClueList',
                component: () => import('@/views/clue/list.vue'),
                meta: {
                    title: '线索管理',
                    icon: 'iconfont icon-xiansuo1'
                }
            },
            {
                path: 'clueForm',
                id: 'inforManage-clueList',
                show: false,
                name: 'ClueForm',
                component: () => import('@/views/clue/form.vue'),
                meta: {
                    title: '新建线索',
                    icon: ''
                },
                hidden: true
            },
            {
                path: 'projectList',
                id: 'inforManage-projectList',
                show: false,
                name: 'ProjectList',
                component: () => import('@/views/project/list.vue'),
                meta: {
                    title: '项目管理',
                    icon: 'iconfont icon-xiangmuguanli1'
                }
            },
            {
                path: 'projectForm',
                id: 'inforManage-projectForm',
                show: false,
                name: 'ProjectForm',
                component: () => import('@/views/project/form.vue'),
                meta: {
                    title: '新建项目',
                    icon: '',
                    reGet:true
                },
                hidden: true
            },
            {
                path: 'projectDetail',
                id: 'inforManage-projectDetail',
                show: false,
                name: 'ProjectDetail',
                component: () => import('@/views/project/detail.vue'),
                meta: {
                    title: '项目详情',
                    icon: ''
                },
                hidden: true
            },
            {
                path: 'maintainProject',
                id: 'inforManage-maintainProject',
                show: false,
                name: 'MaintainProject',
                component: () => import('@/views/project/maintain.vue'),
                meta: {
                    title: '维护管理',
                    icon: ''
                },
                hidden: true
            },
            {
                path: 'establishDetail',
                id: 'inforManage-establishDetail',
                show: false,
                name: 'EstablishDetail',
                component: () => import('@/views/establishPlan/detail.vue'),
                meta: {
                    title: '立项详情',
                    icon: ''
                },
                hidden: true
            },
            // 工作日志  - 列表
            {
                path: 'logList',
                id: 'inforManage-logList',
                show: false,
                name: 'LogList',
                component: () => import('@/views/log/list.vue'),
                meta: {
                    title: '工作日志',
                    icon: 'iconfont icon-gongzuorizhi'
                },
                hidden: false
            },
            //实施日志  - 表单
            {
                path: 'impleLogForm',
                id: 'inforManage-logForm',
                show: false,
                name: 'ImpleLogForm',
                component: () => import('@/views/log/imForm.vue'),
                meta: {
                    title: '新建实施工作日志',
                    icon: 'iconfont icon-gongzuorizhi'
                },
                hidden: true
            },
            
            // 市场日志  - 表单
            {
                path: 'marketLogForm',
                id: 'inforManage-logForm',
                show: false,
                name: 'MaLogForm',
                component: () => import('@/views/log/maForm.vue'),
                meta: {
                    title: '新建市场工作日志',
                    icon: 'iconfont icon-gongzuorizhi'
                },
                hidden: true
            },
            // 工作日志  - 详情
            {
                path: 'maDetail',
                id: 'inforManage-logDetail',
                show: false,
                name: 'MaLogDetail',
                component: () => import('@/views/log/maDetail.vue'),
                meta: {
                    title: '市场工作日志详情',
                    icon: 'iconfont icon-gongzuorizhi'
                },
                hidden: true
            },
            // 工作日志  - 详情
            {
                path: 'imDetail',
                id: 'inforManage-logDetail',
                show: false,
                name: 'ImLogDetail',
                component: () => import('@/views/log/imDetail.vue'),
                meta: {
                    title: '实施工作日志详情',
                    icon: 'iconfont icon-gongzuorizhi'
                },
                hidden: true
            },
            //合同归档 - 列表
            {
                path: 'contractFillList',
                id: 'inforManage-contractFillList',
                show: false,
                name: 'ContractFillList',
                component: () => import('@/views/contractFill/list.vue'),
                meta: {
                    title: '合同归档列表',
                    icon: 'iconfont icon-qiandinghetong'
                }
            },
            // 合同归档- 详情
            {
                path: 'contractFillDetail',
                id: 'inforManage-contractFillDetail',
                show: false,
                name: 'ContractFillDetail',
                component: () => import('@/views/contractFill/detail.vue'),
                meta: {
                    title: '合同归档详情',
                    icon: 'iconfont icon-changyongshili'
                },
                hidden: true
            },
            // 合同归档 - 表单
            {
                path: 'contractFillForm',
                id: 'inforManage-contractFillForm',
                show: false,
                name: 'ContractFillForm',
                component: () => import('@/views/contractFill/form.vue'),
                meta: {
                    title: '新建合同归档',
                    icon: 'iconfont icon-changyongshili'
                },
                hidden: true
            },
            {
                path: 'pmsDeploy',
                id: 'inforManage-contractFillForm',
                show: false,
                name: 'pmsDeploy',
                component: () => import('@/views/pms/pmsDeploy.vue'),
                meta: {
                    title: 'PMS配置',
                    icon: 'iconfont icon-changyongshili'
                },
                hidden: true
            },
            {
                path: 'projectTasklist',
                id: 'inforManage-contractFillForm',
                show: false,
                name: 'projectTasklist',
                component: () => import('@/views/pms/projectTasklist.vue'),
                meta: {
                    title: 'PMS配置',
                    icon: 'iconfont icon-changyongshili'
                },
                hidden: true
            }
        ]
    }
];
