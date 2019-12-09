import request from '@/utils/request'

export function getLoan(params) {
    return request({
        url: '/webLoanFlow/queryMyLoanFlowList',
        method: 'post',
        data: params
    })
}

export function fetchProDic(parmas) {
    return request({
        url: '/commonInfo/queryDictInfo',
        method: 'post',
        data:parmas
    })
}

export function payApplay(params){
    return request({
        url:'/webExpenseFlow/bringRemitSave',
        method:'post',
        data:params
    })
}

export function getAccountList(params){
    return request({
        url:'/commonInfo/queryMyBankCardInfoList',
        method:'post',
        data:params
    })
}

export function loanApply(params){
    return request({
        url:'/webLoanFlow/apply',
        method:'post',
        data:params
    })
}

export function loanSave(params){
    return request({
        url:'/webLoanFlow/apply',
        method:'post',
        data:params
    })
}

export function getDetail(params){
    return request({
        url:'/webLoanFlow/queryMyLoanFlowDetail',
        method:'post',
        data:params
    })
}

export function loanFlow(params){
    return request({
        url:'/webLoanFlow/completeTask',
        method:'post',
        data:params
    })
}

export function loanCancel(params){
    return request({
        url:'/webLoanFlow/repealTask',
        method:'post',
        data:params
    })
}

export function loanDel(params){
    return request({
        url:'/webLoanFlow/repealApply',
        method:'post',
        data:params
    })
}

export function getLoanMember(params){
    return request({
        url:'/webLoanFlow/queryLoanPersonHisList',
        method:'post',
        data:params
    })
}

export function getMember(params){
    return request({
        url:'/commonInfo/queryUserInfo',
        method:'post',
        data:params
    })
}

export function modifyLoan(params){
    return request({
        url:'/webLoanFlow/modifyLoanPerson',
        method:'post',
        data:params
    })
}