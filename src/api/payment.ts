import request from '@/utils/request'


export function getPaytList(parmas) {
    return request({
        url:'/paymentFlow/queryPaymentList',
        method:'post',
        data:parmas
    })
}


export function fetchProDic(parmas) {
    return request({
        url: '/commonInfo/queryDictInfo',
        method: 'post',
        data:parmas
    })
}

export function getAccountList(parmas) {
    return request({
        url:'/commonInfo/queryMyBankCardInfoList',
        method:'post',
        // data:parmas
    })
}

export function payApply(parmas) {
    return request({
        url:'/paymentFlow/paymentApply',
        method:'post',
        data:parmas
    })
}

export function getDetail(parmas) {
    return request({
        url:'/paymentFlow/flowdetail/'+parmas,
        method:'post',
    })
}

export function payFlow(parmas) {
    return request({
        url:'/paymentFlow/completeTask',
        method:'post',
        data:parmas
    })
}


export function payCancel(parmas) {
    return request({
        url:'/paymentFlow/repealTask',
        method:'post',
        data:parmas
    })
}

export function payDel(parmas) {
    return request({
        url:'/paymentFlow/repealApply/'+parmas,
        method:'post',
    })
}