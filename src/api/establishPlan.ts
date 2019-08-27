import request from '@/utils/request'

export function getDetail(params){
    return request({
        url:'/projectApprovalFlow/flowdetail',
        method:'post',
        data:params
    })
}

export function proFlow(params){
    return request({
        url:'/projectApprovalFlow/completeTask',
        method:'post',
        data:params
    })
}


export function proCancel(params){
    return request({
        url:'/projectApprovalFlow/repealTask',
        method:'post',
        data:params
    })
}


export function proDel(params){
    return request({
        url:'/projectApprovalFlow/repealApply',
        method:'post',
        data:params
    })
}