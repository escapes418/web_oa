import request from '@/utils/request'

export function getReimPay(params) {
    return request({
        url: '/webExpenseFlow/queryExpensePaymentList',
        method: 'post',
        data: params
    })
}

export function exportReimPay(params){
    return request({
        url: '/webExpenseFlow/exportExpensePaymentList',
        method: 'post',
        data: params
    })
}