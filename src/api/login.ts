import request from "@/utils/request";

/**
 * 登录接口
 * @param {*} username
 * @param {*} password
 */
export function login(username, password) {
    return request({
        url: "/auth/login",
        method: "post",
        data: {
            username,
            password
        }
    },false);
}
export function fetchPermissionId() {
    return request({
        url: "/webCommonInfo/permission",
        method: "post"
    },false);
}

export function menu() {
    return request({
        url: "/menu",
        method: "post"
    });
}

export function getDic(params){
    return request({
        url: "/webCommonInfo/queryDict",
        method: 'post',
        data:params
    },false);
}
export function expApply(params){
    return request({
        url: '/webExpenseFlow/expenseApply',
        method: 'post',
        data:params
    })
}


export function getMember(params){
    return request({
        url:"/webCommonInfo/orgAndUserInfo",
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

export function findUser(params) {
    return request({
        url: "/webCommonInfo/findUserRealTimeInfo",
        method: "post",
        data:params
    });
}