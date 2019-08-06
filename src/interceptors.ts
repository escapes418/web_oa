import router from './router';
import store from './store';
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css'; // Progress 进度条样式
import { Message } from 'element-ui';
import { getToken, setToken } from '@/utils/auth'; // 验权

const whiteList = ['/login', '/reimburse']; // 不重定向白名单 ##这里必须写全名称##

function hasPermission(roles, permissionRoles) {
    if (roles.indexOf('admin') >= 0) return true; // admin permission passed directly
    if (!permissionRoles) return true;
    return roles.some((role) => permissionRoles.indexOf(role) >= 0);
}
router.beforeEach((to, from, next) => {
    NProgress.start();
    if (getToken()) {
        if (to.path === '/login') {
            next({
                path: '/'
            });
        } else {
            // 每次刷新会重新获取菜单ID、校验权限
            if (store.getters.addRouterLenght == 0) {
                store.dispatch('handleMenusShow').then(() => {
                    router.addRoutes(store.getters.addRouters);
                    // next({ ...to });
                    next(to.fullPath);
                    // next({ ...to, replace: true }); // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                });
            } else {
                next();
            }

        //    if(to.meta.reGet){
        //         store.dispatch('FetchDictsAndLocalstore').then(() => {
        //             console.log(JSON.parse(localStorage.getItem("web_oa_member")));
        //         }).catch(() => {
        //             this.loading = false;
        //             console.log('获取字典数据失败!');
        //         })
        //    }

            /*
            if (store.getters.roles.length === 0) {
                store
                    .dispatch("GetInfo")
                    .then(res => {
                        // 拉取用户信息
                        //获取用户信息中的动态路由表并根据返回的权限动态加入当前的路由中去
                        const roles = res.data.roles; // note: roles must be a array! such as: ['editor','develop']
                        store.dispatch("GenerateRoutes", { roles }).then(() => {
                            // 根据roles权限生成可访问的路由表
                            router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
                            next({ ...to, replace: true }); // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                        });
                    })
                    .catch(() => {
                        store.dispatch("FedLogOut").then(() => {
                            Message.error("验证失败,请重新登录");
                            next({ path: "/login" });
                        });
                    });
            } else {
                next();
            }
             */
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next();
        } else {
            next('/login');
            // next();
            NProgress.done();
        }
    }
});

router.afterEach(() => {
    NProgress.done(); // 结束Progress
});
