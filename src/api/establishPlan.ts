import request from '@/utils/request'

export function getDetail(params){
    return request({
        url:'/webProjectApprovalFlow/flowdetail',
        method:'post',
        data:params
    })
}

export function proFlow(params){
    return request({
        url:'/webProjectApprovalFlow/completeTask',
        method:'post',
        data:params
    })
}


export function proCancel(params){
    return request({
        url:'/webProjectApprovalFlow/repealTask',
        method:'post',
        data:params
    })
}


export function proDel(params){
    return request({
        url:'/webProjectApprovalFlow/repealApply',
        method:'post',
        data:params
    })
}