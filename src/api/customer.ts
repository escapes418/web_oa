import request from '@/utils/request'

export function fetchList(params) {
    return request({
        url: '/custInfo/custInfoList',
        method: 'post',
        data:params
    })
}

export function custNum(params) {
    return request({
        url: '/custInfo/custInfoListNum',
        method: 'post',
        data:params
    })
}

export function getLinkman(params) {
    return request({
        url: '/custInfo/findCustLinkman',
        method: 'post',
        data:params
    })
}

export function custChange(params) {
    return request({
        url: '/custInfo/custChangePick',
        method: 'post',
        data:params
    })
}

export function fetchForm(data){
  return request({
    url:'/custInfo/custInfoNewDetail/'+data,
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
    url:'/custInfo/deleteCustInfo',
    method:'post',
    data:params
  })
}

export function modifyCust(params){
  return request({
    url:'/custInfo/saveCustInfo',
    method:'put',
    data:params
  })
}

export function saveCust(params){
  return request({
    url:'/custInfo/saveCustInfo',
    method:'post',
    data:params
  })
}

export function verifyCust(params){
  return request({
    url:'/custInfo/verify',
    method:'get',
    params:params
  })
}

export function getPhone(params){
  return request({
    url:'/commonInfo/queryUserInfoForId',
    method:'post',
    data:params
  })
}

export function getMaintain(parmas){
  return request({
    url:'/custInfo/custMaintenanceList',
    method:'post',
    data:parmas
  })
}

export function saveMaintain(params){
  return request({
    url:'/custInfo/saveCustMaintenance',
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
    url:'/custInfo/downLoadContractPdf',
    method:'post',
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

export function getMainCust(params){
  return request({
    url:'/custInfo/queryCustInstant',
    method:'post',
    data:params
  })
}

export function mergeCust(params){
  return request({
    url:'/custInfo/custMerge',
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
// export function getMember(params){
//   return request({
//     url:'/commonInfo/queryMemberInfo',
//     method:'post',
//     data:params
//   })
// }

export function getMarket(params){
  return request({
    url:'/commonInfo/queryMarketOffice',
    method:'post',
    data:params
  })
}

export function moveBatchCust(params){
  return request({
    url:'/custInfo/custBatchMove',
    method:'post',
    data:params
  })
}

export function openBatchCust(params){
  return request({
    url:'/custInfo/custBatchOpen',
    method:'post',
    data:params
  })
}

export function unboundCust(params){
  return request({
    url:'/custInfo/custUnbind',
    method:'post',
    data:params
  })
}