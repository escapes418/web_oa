import request from '@/utils/request'

export function saveAccount(parmas) {
    return request({
        url:'/commonInfo/saveBankCardInfo',
        method:'post',
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

export function setDefaultAccount(parmas) {
    return request({
        url:'/commonInfo/updateDefaultAccount',
        method:'post',
        data:parmas
    })
}

export function delAccount(parmas) {
    return request({
        url:'/commonInfo/deleteAccount',
        method:'post',
        data:parmas
    })
}

export function queryBank(parmas) {
    return request({
        url:'/commonInfo/queryMyBankCardInfo',
        method:'post',
        data:parmas
    })
}

export function getBankList(parmas) {
    return request({
        url:'/commonInfo/queryBankList',
        method:'post',
        data:parmas
    })
}