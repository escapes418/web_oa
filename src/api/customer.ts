import request from '@/utils/request'

export function fetchList(params) {
    return request({
        url: '/webCustInfo/custInfoList',
        method: 'post',
        data:params
    })
}

export function custNum(params) {
    return request({
        url: '/webCustInfo/custInfoListNum',
        method: 'post',
        data:params
    })
}

export function getLinkman(params) {
    return request({
        url: '/webCustInfo/findCustLinkman',
        method: 'post',
        data:params
    })
}

export function custChange(params) {
    return request({
        url: '/webCustInfo/custChangePick',
        method: 'post',
        data:params
    })
}

export function fetchForm(data){
  return request({
    url:'/webCustInfo/custInfoNewDetail/'+data,
    method:'get',
  })
}

// export function fetchForm(params){
//   return request({
//     url:'/custInfo/custInfoDetail',
//     method:'post',
//     data:{id:params}
//   })
// }

export function deleCust(params){
  return request({
    url:'/webCustInfo/deleteCustInfo',
    method:'post',
    data:params
  })
}

export function modifyCust(params){
  return request({
    url:'/webCustInfo/saveCustInfo',
    method:'put',
    data:params
  })
}

export function saveCust(params){
  return request({
    url:'/webCustInfo/saveCustInfo',
    method:'post',
    data:params
  })
}

export function verifyCust(params){
  return request({
    url:'/webCustInfo/verify',
    method:'get',
    params:params
  })
}

export function getPhone(params){
  return request({
    url:'/webCommonInfo/queryUserInfoForId',
    method:'post',
    data:params
  })
}

export function getMaintain(parmas){
  return request({
    url:'/webCustInfo/custMaintenanceList',
    method:'post',
    data:parmas
  })
}

export function saveMaintain(params){
  return request({
    url:'/webCustInfo/saveCustMaintenance',
    method:'post',
    data:params
  })
}

export function fetchComInfoList(params) {
  return request({
    url: '/webContractFlow/contractCompanyInfoList',
    method: 'post',
    data: params
  })
}

export function downLoadContract(params){
  return request({
    url:'/webCustInfo/downLoadContractPdf',
    method:'post',
    data:params
  })
}

export function getCustPool(params){
  return request({
    url:'/webCustInfo/custPoolList',
    method:'post',
    data:params
  })
}

export function getMainCust(params){
  return request({
    url:'/webCustInfo/queryCustInstant',
    method:'post',
    data:params
  })
}

export function mergeCust(params){
  return request({
    url:'/webCustInfo/custMerge',
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
// export function getMember(params){
//   return request({
//     url:'/commonInfo/queryMemberInfo',
//     method:'post',
//     data:params
//   })
// }

export function getMarket(params){
  return request({
    url:'/webCommonInfo/queryMarketOffice',
    method:'post',
    data:params
  })
}

export function moveBatchCust(params){
  return request({
    url:'/webCustInfo/custBatchMove',
    method:'post',
    data:params
  })
}

export function openBatchCust(params){
  return request({
    url:'/webCustInfo/custBatchOpen',
    method:'post',
    data:params
  })
}

export function unboundCust(params){
  return request({
    url:'/webCustInfo/custUnbind',
    method:'post',
    data:params
  })
}