import { constantRouterMap } from '@/router';
import { menu, fetchPermissionId } from '@/api/login';
import routeMaps from '@/router/routerMaps';
import Layout from '@/views/layout/Layout.vue';
import { RouteConfig } from 'vue-router';

type myRouteConfig = RouteConfig | IF_compelteMenu;

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        return roles.some((role) => route.meta.roles.indexOf(role) >= 0);
    } else {
        return true;
    }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles

function filterAsyncRouter(asyncRouterMap, roles) {
    const accessedRouters = asyncRouterMap.filter((route) => {
        if (hasPermission(roles, route)) {
            if (route.children && route.children.length) {
                route.children = filterAsyncRouter(route.children, roles);
            }
            return true;
        }
        return false;
    });
    return accessedRouters;
}
*/

const permission = {
    state: {
        routers: constantRouterMap,
        addRouters: [],
        ids:[]
    },
    mutations: {
        SET_ROUTERS: (state, routers) => {
            state.addRouters = routers;
            state.routers = constantRouterMap.concat(routers);
        },
        SET_IDS:(state,ids)=>{
            state.ids = ids
        }
    },
    actions: {
        GetMenu({ commit }) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    commit('SET_ROUTERS', routeMaps);
                    resolve(routeMaps);
                }, 1000);
            });
        },
        /*
        通过接口标示的string 同本地routesMap的id进行比对，命中的添加到动态路由中
        */
        async handleMenusShow({ commit }) {
            let response: any = await fetchPermissionId();
            let ids = response.data;
            ids.push('publicGoods','publicGoods-consumList','publicGoods-fixedAssetsList')
            function compareIds(routes) {
                for (var i = 0; i < routes.length; i++) {
                    if (ids.indexOf(routes[i].id) !== -1) {
                        routes[i].show = true;
                    }
                    if (routes[i].children) {
                        compareIds(routes[i].children);
                    }
                }
            }
            compareIds(routeMaps); // 本地完整路由池
            commit('SET_ROUTERS', routeMaps);
            commit('SET_IDS',ids)
        },
        async FetchMenu_old({ commit }) {
            function trans(dataArr) {
                function transToTree(dataArr, newArr) {
                    for (var i = dataArr.length - 1; i >= 0; i--) {
                        if (dataArr[i].parentId == '0') {
                            newArr.push(dataArr[i]);
                            dataArr.splice(i, 1);
                        }
                        if (
                            dataArr[i] &&
                            find_insert(newArr, dataArr[i].parentId, dataArr[i])
                        ) {
                            dataArr.splice(i, 1);
                        }
                    }
                    // 递归断点
                    if (dataArr.length != 0) {
                        transToTree(dataArr, newArr);
                    }
                }
                //
                function find_insert(arr, key, data) {
                    // 待完善，value不是自定义
                    var flag = false;

                    function DG_f(arr, key, data) {
                        arr.map((item) => {
                            if (item.id == key) {
                                if (item.children) {
                                    item.children.push(data);
                                } else {
                                    item.children = [];
                                    item.children.push(data);
                                }
                                flag = true;
                                return;
                            }
                            if (item.children) {
                                DG_f(item.children, key, data);
                                return;
                            }
                        });
                    }
                    DG_f(arr, key, data);
                    return flag;
                }
                var newArr = [];
                transToTree(dataArr, newArr);
                return newArr;
            }
            /* this.$store.dispatch('FetchMenu').then(rtn => {
                console.log('interface data:', rtn.data);
                // trans(rtn.data);
                this.test1(rtn.data);
            }) */

            let response: any = await menu();
            let menus = trans(response.data);

            function convertArr(arr) {
                arr.map((item) => {
                    if (typeof item.component == 'string') {
                        if (item.component == 'Layout') {
                            item.component = Layout;
                        } else {
                            var tempString = item.component;
                            item.component = eval('() => import(tempString)');
                            // item.component = () =>
                            //     import (tempString);
                            // item.component = eval('(resolve) => require([tempString], resolve)');
                            // console.log(item.component);
                            // item.component = new Function('return import(temp)');
                        }
                    }
                    if (item.children && item.children.length !== 0) {
                        convertArr(item.children);
                    }
                });
            }
            convertArr(menus);

            let originMenu = [
                {
                    path: '/login',
                    component: () => import('@/views/login/index.vue'),
                    hidden: true
                },
                {
                    path: '/404',
                    component: () => import('@/views/404.vue'),
                    hidden: true
                }
            ];
            // let compelteMenu = originMenu.concat(menus);
            let compelteMenu: any = originMenu.concat(menus);
            /* let tempObj: IF_compelteMenu = {
                path: '*',
                component: () => import('@/views/404.vue'), // 为兼容ts，多写一个组件引入
                redirect: '/404',
                hidden: true
            }; */
            let tempObj: myRouteConfig = {
                path: '*',
                // component: () => import('@/views/404.vue'), // 为兼容ts，多写一个组件引入
                redirect: '/404',
                hidden: true
            };
            compelteMenu.push(tempObj);
            console.log(compelteMenu);
            // return;
            commit('SET_ROUTERS', compelteMenu);
        },
        GenerateRoutes({ commit }, data) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    commit('SET_ROUTERS', routeMaps);
                    resolve(routeMaps);
                }, 1000);
            });
            /*暂时不用做过滤
            // 获取权限表(路由表)
            return new Promise(resolve => {
                const { roles } = data;
                let accessedRouters;

                if (roles.indexOf('admin') >= 0) {
                accessedRouters = asyncRouterMap
                } else {
                accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
                }
                commit("SET_ROUTERS", accessedRouters);
                resolve();
            });
            */
        }
    }
};

// const tony: tony.ITony_inner = {};
export default permission;
