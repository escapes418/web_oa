import request from "@/utils/request";

/**
 * 登录接口
 * @param {*} username
 * @param {*} password
 */
export function login(username, password) {
    return request({
        url: "/login",
        method: "post",
        data: {
            username,
            password
        }
    },false);
}
export function fetchPermissionId() {
    return request({
        url: "/permission",
        method: "post"
    },false);
}

export function menu() {
    return request({
        url: "/menu",
        method: "post"
    });
}

export function getDic(){
    return request({
        url: "/commonInfo/queryDict",
        method: "post"
    },false);
}

export function getMember(params){
    return request({
        url:"/commonInfo/orgAndUserInfo",
        method:"post",
        data:params
    },false)
}

export function logout() {
    return request({
        url: "/logout",
        method: "post"
    });
}
export function getMenu() {
    return request({
        url: "/menu",
        method: "post"
    });
}
