import request from '@/utils/request'


export function getRepaytList(parmas) {
    return request({
        url:'/repayFlow/queryMyRepayFlowList',
        method:'post',
        data:parmas
    })
}

export function getLoanList(parmas) {
    return request({
        url:'/webLoanFlow/queryRelatedLoanFlows',
        method:'post',
        data:parmas
    })
}

export function repayApply(parmas) {
    return request({
        url:'/repayFlow/apply',
        method:'post',
        data:parmas
    })
}


export function getDetail(parmas) {
    return request({
        url:'/repayFlow/queryMyRepayFlowDetail',
        method:'post',
        data:parmas
    })
}


export function repayFlow(params){
    return request({
        url:'/repayFlow/completeTask',
        method:'post',
        data:params
    })
}

export function repayCancel(params){
    return request({
        url:'/repayFlow/repealTask',
        method:'post',
        data:params
    })
}

export function repayDel(params){
    return request({
        url:'/repayFlow/repealApply',
        method:'post',
        data:params
    })
}


export function downFile(params){
    return request({
        url:'/commonInfo/downFiles',
        method:'post',
        data:params
    })
}