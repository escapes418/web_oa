import request from '@/utils/request'


export function getPaytList(parmas) {
    return request({
        url:'/webPaymentFlow//queryPaymentList',
        method:'post',
        data:parmas
    })
}


export function fetchProDic(parmas) {
    return request({
        url: '/webCommonInfo/queryDictInfo',
        method: 'post',
        data:parmas
    })
}

export function getAccountList(parmas) {
    return request({
        url:'/webCommonInfo/queryMyBankCardInfoList',
        method:'post',
        // data:parmas
    })
}

export function payApply(parmas) {
    return request({
        url:'/webPaymentFlow//paymentApply',
        method:'post',
        data:parmas
    })
}

export function getDetail(parmas) {
    return request({
        url:'/webPaymentFlow//flowdetail/'+parmas,
        method:'get',
    })
}

export function payFlow(parmas) {
    return request({
        url:'/webPaymentFlow//completeTask',
        method:'post',
        data:parmas
    })
}


export function payCancel(parmas) {
    return request({
        url:'/webPaymentFlow//repealTask',
        method:'post',
        data:parmas
    })
}

export function payDel(parmas) {
    return request({
        url:'/webPaymentFlow//repealApply/'+parmas,
        method:'post',
    })
}

export function downFile(params){
    return request({
        url:'/commonInfo/downFiles',
        method:'post',
        data:params
    })
}