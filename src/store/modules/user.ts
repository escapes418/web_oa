import { login, logout, findUser, getDic, getMember } from '@/api/login';
import { getRegion } from '@/api/getRegion';
import { fetchList,getRedCount } from '@/api/user';
import { getToken, setToken, removeToken } from '@/utils/auth';

import common from '@/utils/common';
import { resolve } from 'url';


const user = {
    state: {
        token: getToken(),
        name: '',
        avatar: '',
        roles: [],
        userInfo: null,
        count:0,
        reTry:false
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_NAME: (state, name) => {
            state.name = name;
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar;
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles;
        },
        SET_USERINFO: (state, obj) => {
            state.userInfo = obj;
        },
        SET_REDCOUNT:(state,res) =>{
            if(res.status=="0"){
                state.count = res.data.redCount
            }
        },
        SET_RETRY:(state,data) =>{
            state.reTry = data
        }

    },

    actions: {
        // 登录
        Login({ commit }, userInfo) {
            const username = userInfo.username.trim();
            return new Promise((resolve, reject) => {
                login(username, userInfo.password)
                    .then((res: Ajax.AjaxResponse) => {
                        setToken(res.data.sessionid);
                        commit('SET_TOKEN', res.data.sessionid);
                        findUser({}).then((res:Ajax.AjaxResponse)=>{
                            localStorage.setItem(
                                'web_oa_userInfor',
                                JSON.stringify(res.data)
                            );
                            commit('SET_USERINFO', res.data);
                            resolve();
                        })
                    })
                    .catch((error) => {
                        console.log(error);
                        reject(error);
                    });
            });
        },
        FetchDictsAndLocalstore({ commit }) {
            // 获取所有字典，写入本地
            // 通用配置字典
            var dictList = new Promise((resolve, reject) => {
                getDic({
                    typeList:[]
                }).then((res: Ajax.AjaxResponse) => {
                    localStorage.removeItem('web_oa_dicList');
                    localStorage.setItem(
                        'web_oa_dicList',
                        JSON.stringify(res.data)
                    );
                    resolve();
                });
            });
            // 所有人员
            var member = new Promise((resolve, reject) => {
                getMember({
                    queryType: 2
                }).then((res: Ajax.AjaxResponse) => {
                    localStorage.removeItem('web_oa_member');
                    localStorage.setItem(
                        'web_oa_member',
                        JSON.stringify(res.data)
                    );
                    resolve();
                });
            });
            // 纯组织架构
            var depart = new Promise((resolve, reject) => {
                getMember({
                    queryType: 1
                }).then((res: Ajax.AjaxResponse) => {
                    localStorage.removeItem('web_oa_depart');
                    localStorage.setItem(
                        'web_oa_depart',
                        JSON.stringify(res.data)
                    );
                    resolve();
                });
            });
            //省市区数据
            var region = new Promise((resolve, reject) => {
                getRegion({}).then((res: Ajax.AjaxResponse) => {
                    localStorage.removeItem('web_oa_region');
                    localStorage.setItem(
                        'web_oa_region',
                        JSON.stringify(res.data)
                    );
                    resolve();
                });
            });

            var userInfo = new Promise((resolve,reject) =>{
                findUser({}).then((res:Ajax.AjaxResponse)=>{
                    localStorage.setItem(
                        'web_oa_userInfor',
                        JSON.stringify(res.data)
                    );
                    commit('SET_USERINFO', res.data);
                    resolve();
                })
            })
            return Promise.all([dictList, member, depart, region, userInfo]);
            // return Promise.all([dictList, member, depart, region]);
        },
        // 获取用户信息

        /* GetInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                getInfo(state.token)
                    .then((res: Ajax.AjaxResponse) => {
                        const data = res.data;
                        commit('SET_ROLES', data.roles);
                        commit('SET_NAME', data.name);
                        commit('SET_AVATAR', data.avatar);
                        resolve(res);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        }, */

        // 获取菜单 - 暂时屏蔽，不在user状态机中做，在permission状态机中做

        /* GetMenu({ commit, state }) {
            return new Promise((resolve, reject) => {
                menu().then(rtn => {
                    resolve(rtn);
                });
            });
        }, */

        // 登出
        LogOut({ commit, state }) {
            return new Promise((resolve, reject) => {
                logout()
                    .then(() => {
                        commit('SET_TOKEN', '');
                        commit('SET_ROLES', []);
                        removeToken();
                        localStorage.clear();
                        resolve();
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },

        // 前端 登出
        FedLogOut({ commit,state }) {
            return new Promise((resolve) => {
                setInterval(() => {
                    getDic({
                        typeList:[] 
                    }).then(res=>{
                        state.msgCount = res
                        resolve(res)
                    })
                }, 10000);
            });
        },
        fetchMessage({},listQuery){
            return new Promise((resolve)=>{
                fetchList({
                    ...listQuery
                }).then(res=>{
                    resolve(res)
                })
            })
        },
        fetchCount({commit,state},userInfor){
            return new Promise((resolve)=>{
                let websocket = null;
                let url;
                if('WebSocket' in window) {
                    const argv = process.env.NODE_ENV;
                    if (argv == "test") {
                        url  = 'ws://oa.sijibao.co/OA/websocket/myHandler?userId='+ userInfor.mobile;
                    } else if (argv == "production") {
                        url  = 'wss://oa.sijibao.com/OA/websocket/myHandler?userId='+ userInfor.mobile;
                    } else {
                        url  = 'ws://192.168.12.134/OA/websocket/myHandler?userId='+ userInfor.mobile; 
                    }
                    websocket = new WebSocket(url);
                    websocket.onopen = function (event) {
                        commit('SET_RETRY',false);
                        console.log('建立连接');
                    }
        
                    websocket.onclose = function (event) {
                        console.log('连接关闭');
                        commit('SET_RETRY',true);
                        // websocket = new WebSocket(url);
                    }
        
                    websocket.onmessage = function (event) {
                        console.log('收到消息:' + event.data);
                        commit('SET_REDCOUNT', JSON.parse(event.data));
                        // resolve(JSON.parse(event.data))
                    }
        
                    websocket.onerror = function (event) {
                        alert('websocket通信发生错误！');
                    }
                    resolve()
                }else {
                    alert('该浏览器不支持websocket!');
                }
            })
        }
    }
};

export default user;
