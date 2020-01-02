import router from './router';
import store from './store';
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css'; // Progress 进度条样式
import { Message } from 'element-ui';
import { getToken, setToken,} from '@/utils/auth'; // 验权

const whiteList = ['/login', '/reimburse']; // 不重定向白名单 ##这里必须写全名称##

function hasPermission(roles, permissionRoles) {
    if (roles.indexOf('admin') >= 0) return true; // admin permission passed directly
    if (!permissionRoles) return true;
    return roles.some((role) => permissionRoles.indexOf(role) >= 0);
}
router.beforeEach(async(to, from, next) => {
    NProgress.start();
    if (getToken()) {
        console.log(to)
        if (to.path === '/login') {
            next({
                path: '/'
            });
        } else {
            // 每次刷新会重新获取菜单ID、校验权限
            if (store.getters.addRouterLenght == 0) {
                try{ 
                    await store.dispatch('handleMenusShow');
                    router.addRoutes(store.getters.addRouters);
                    next(to.fullPath);
                }catch(err){
                    console.log(err)
                }
            } else {
                next();
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next();
        } else {
            if(to.path == "/cas"){
                try{ 
                    const res = await store.dispatch("getRunning")
                    if(res.status == 0){
                        if(to.query.type == "1"){
                            next({
                                path:'/inforManage/contractFillList',
                                query:{companyName:to.query.companyName}
                            })
                        }
                    }
                } 
                catch(error){ 
                    next('/login');
                    NProgress.done();
                }      
            }else{
                next('/login');
                NProgress.done();
            }
            
        }
    }
});

router.afterEach(() => {
    NProgress.done(); // 结束Progress
});
