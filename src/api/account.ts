import request from '@/utils/request'

export function saveAccount(parmas) {
    return request({
        url:'/webCommonInfo/saveBankCardInfo',
        method:'post',
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

export function setDefaultAccount(parmas) {
    return request({
        url:'/webCommonInfo/updateDefaultAccount',
        method:'post',
        data:parmas
    })
}

export function delAccount(parmas) {
    return request({
        url:'/webCommonInfo/deleteAccount',
        method:'post',
        data:parmas
    })
}

export function queryBank(parmas) {
    return request({
        url:'/webCommonInfo/queryMyBankCardInfo',
        method:'post',
        data:parmas
    })
}

export function getBankList(parmas) {
    return request({
        url:'/webCommonInfo/queryBankList',
        method:'post',
        data:parmas
    })
}