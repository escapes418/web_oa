import request from '@/utils/request'

export function fetchList(params) {
    return request({
        url: '/webCustInfo/custInfoList',
        method: 'post',
        data:params
    })
}

export function getMainCust(params){
    return request({
        url:'/webCustInfo/mainCustList',
        method:'post',
        data:params
    })
}

export function getMember(params){
    return request({
        url:'/webCommonInfo/queryUserInfo',
        method:'post',
        data:params
    })
}

export function getMarket(params){
    return request({
        url:'/webCommonInfo/queryMarketOffice',
        method:'post',
        data:params
    })
}

// export function fetchForm(params){
//     return request({
//         url:'/custInfo/custInfoDetail',
//         method:'post',
//         data:params
//     })
// }

export function fetchForm(data){
    return request({
      url:'/webCustInfo/custInfoNewDetail/'+data,
      method:'get',
    })
  }

export function getCustDetail(params){
    return request({
        url:`/webCustInfo/custInfoNewDetail/${params}`,
        method:'get'
    })
}

export function getContact(params){
    return request({
        url:'/webCustLinkmanHisInfo/custLinkmanHisList',
        method:'post',
        data:params
    })
}

export function getPassContact(params){
    return request({
        url:'/webCustLinkmanHisInfo/custLinkmanList',
        method:'post',
        data:params
    })
}


export function saveContact(params){
    return request({
        url:'/webCustLinkmanHisInfo/saveCustLinkman',
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
        url: '/webCustInfo/findCustLinkman',
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
        url: '/webCustInfo/custBatchUpdate',
        method: 'post',
        data:params
    })
}

