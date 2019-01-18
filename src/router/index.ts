import Vue from 'vue';
import Router from 'vue-router';

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router);

/* Layout */
import Layout from '../views/layout/Layout.vue';

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
    {
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        hidden: true
    },
    { path: '/404', component: () => import('@/views/404.vue'), hidden: true }
    // {
    //     path: "/",
    //     component: Layout,
    //     redirect: "/dashboard",
    //     name: "Dashboard",
    //     hidden: true,
    //     // alwaysShow: true,
    //     meta: { title: "dashboard" },
    //     children: [
    //         {
    //             path: "dashboard",
    //             component: () => import("@/views/dashboard/index"),
    //             meta: { title: "dashboard" }
    //         }
    //     ]
    // },
];

export default new Router({
    // mode: 'history', //后端支持可开
    // scrollBehavior: (to, from, savedPosition) => ({ y: 0 }),  先屏蔽掉，可能是vue-router的版本问题导致
    routes: constantRouterMap
});

/* 以下为测试内容 */
let rtn = [
    {
        path: '/components',
        component: Layout,
        redirect: '/components/tinymce',
        name: 'component-demo',
        meta: {
            title: 'components',
            icon: 'component'
        },
        children: [
            /*  {
                path: 'tinymce',
                component: () => import('@/views/components-demo/tinymce.vue'),
                name: 'tinymce-demo',
                meta: { title: 'tinymce' }
            },
            {
                path: 'markdown',
                component: () => import('@/views/components-demo/markdown.vue'),
                name: 'markdown-demo',
                meta: { title: 'markdown' }
            } */
            // { path: 'json-editor', component: _import('components-demo/jsonEditor'), name: 'jsonEditor-demo', meta: { title: 'jsonEditor' }},
            // { path: 'dnd-list', component: _import('components-demo/dndList'), name: 'dndList-demo', meta: { title: 'dndList' }},
            // { path: 'splitpane', component: _import('components-demo/splitpane'), name: 'splitpane-demo', meta: { title: 'splitPane' }},
            // { path: 'avatar-upload', component: _import('components-demo/avatarUpload'), name: 'avatarUpload-demo', meta: { title: 'avatarUpload' }},
            // { path: 'dropzone', component: _import('components-demo/dropzone'), name: 'dropzone-demo', meta: { title: 'dropzone' }},
            // { path: 'sticky', component: _import('components-demo/sticky'), name: 'sticky-demo', meta: { title: 'sticky' }},
            // { path: 'count-to', component: _import('components-demo/countTo'), name: 'countTo-demo', meta: { title: 'countTo' }},
            // { path: 'mixin', component: _import('components-demo/mixin'), name: 'componentMixin-demo', meta: { title: 'componentMixin' }},
            // { path: 'back-to-top', component: _import('components-demo/backToTop'), name: 'backToTop-demo', meta: { title: 'backToTop' }}
        ]
    }
];

function convertArr(arr) {
    arr.map((item) => {
        if (typeof item.component == 'string') {
            item.component = () => item.component;
        }
        if (item.children && item.children.length !== 0) {
            convertArr(item.children);
        }
    });
}
convertArr(rtn);

// export const asyncRouterMap = rtn;
