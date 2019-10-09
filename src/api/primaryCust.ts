import request from '@/utils/request'

export function fetchList(params) {
    return request({
        url: '/custInfo/custInfoList',
        method: 'post',
        data:params
    })
}

export function getCustPool(params){
    return request({
        url:'/custInfo/custPoolList',
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

export function getMarket(params){
    return request({
        url:'/commonInfo/queryMarketOffice',
        method:'post',
        data:params
    })
}

export function fetchForm(params){
    return request({
        url:'/custInfo/custInfoDetail',
        method:'post',
        data:params
    })
}

export function getContact(params){
    return request({
        url:'/custLinkmanHisInfo/custLinkmanHisList',
        method:'post',
        data:params
    })
}

export function getPassContact(params){
    return request({
        url:'/custLinkmanHisInfo/custLinkmanList',
        method:'post',
        data:params
    })
}


export function saveContact(params){
    return request({
        url:'/custLinkmanHisInfo/saveCustLinkman',
        method:'post',
        data:params
    })
}

export function getBelongCust(params){
    return request({
        url:'/masterCust/getBelongCust',
        method:'get',
        params:params
    })
}

export function getLinkman(params) {
    return request({
        url: '/custInfo/findCustLinkman',
        method: 'post',
        data:params
    })
}


export function saveMaintain(params) {
    return request({
        url: '/masterCust/saveMasterCustMaintain',
        method: 'post',
        data:params
    })
}


export function getActiveList(params) {
    return request({
        url: '/masterCust/masterCustMaintainList',
        method: 'post',
        data:params
    })
}

export function getPassiveList(params) {
    return request({
        url: '/masterCust/passiveMaintainList',
        method: 'post',
        data:params
    })
}

export function updateCust(params) {
    return request({
        url: '/custInfo/custBatchUpdate',
        method: 'post',
        data:params
    })
}

