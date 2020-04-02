import request from '@/utils/request'


export function getRepaytList(parmas) {
    return request({
        url:'/webRepayFlow/queryMyRepayFlowList',
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
        url:'/webRepayFlow/apply',
        method:'post',
        data:parmas
    })
}


export function getDetail(parmas) {
    return request({
        url:'/webRepayFlow/queryMyRepayFlowDetail',
        method:'post',
        data:parmas
    })
}


export function repayFlow(params){
    return request({
        url:'/webRepayFlow/completeTask',
        method:'post',
        data:params
    })
}

export function repayCancel(params){
    return request({
        url:'/webRepayFlow/repealTask',
        method:'post',
        data:params
    })
}

export function repayDel(params){
    return request({
        url:'/webRepayFlow/repealApply',
        method:'post',
        data:params
    })
}


export function downFile(params){
    return request({
        url:'/webCommonInfo/downFiles',
        method:'post',
        data:params
    })
}