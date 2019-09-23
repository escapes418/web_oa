import request from '@/utils/request'

export function getMember(params){
    return request({
        url:'/commonInfo/queryUserInfo',
        method:'post',
        data:params
    },false)
}

export function saveRemind(params){
    return request({
        url:'/messageRemind/saveMessageRemind',
        method:'post',
        data:params
    },false)
}

export function getRemindList(params){
    return request({
        url:'/messageRemind/messageRemindList',
        method:'post',
        data:params
    },false)
}

export function getDetail(params){
    return request({
        url:'/messageRemind/messageRemindDetail',
        method:'post',
        data:params
    },false)
}

export function delRemind(params){
    return request({
        url:'/messageRemind/delMessageRemind',
        method:'post',
        data:params
    },false)
}