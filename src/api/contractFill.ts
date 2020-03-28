import request from '@/utils/request'

export function fetchList(params) {
    return request({
        url: '/webContractHis/contractHisList',
        method: 'post',
        data: params
    })
}

export function getContractTemlist(params) {
    return request({
        url: '/webContractFlowNew/queryContractTempletList',
        method: 'post',
        data: params
    })
}


export function getCust(params){
    return request({
        url: `webCustInfo/queryCustWithBusiness/${params}`,
        method: 'get'
    },false)
}

export function getProject(params){
    return request({
        url:'/webProjectInfo/projectInfoList',
        method:'post',
        data:params
    })
}

export function getContractConfig(params) {
    return request({
        url: '/webContractFlowNew/queryContractConfig',
        method: 'post',
        data: params
    })
}

export function getMainContract(params) {
    return request({
        url: '/webContractFlowNew/queryMainContractList',
        method: 'post',
        data: params
    })
}

export function fetchProDic(parmas) {
    return request({
        url: '/webCommonInfo/queryDictInfo',
        method: 'post',
        data:parmas
    })
}

export function conApply(params){
    return request({
        url: '/webContractHis/saveContractHis',
        method: 'post',
        data:params
    })
}

export function getDetail(params){
    return request({
        url:'/webContractHis/contractHisDetail',
        method:'post',
        data:params
    })
}

export function eidtList(params){
    return request({
        url:'/webContractHis/changeContractHis',
        method:'post',
        data:params
    })
}

export function renewList(params){
    return request({
        url:'/webContractHis/contractHisRenewal',
        method:'post',
        data:params
    })
}

export function abandonList(params){
    return request({
        url:'/webContractHis/contractHisAbandon',
        method:'post',
        data:params
    })
}


export function findAllProject(params){
    return request({
        url:'/webProjectInfo/projectInfoList',
        method:'post',
        data:params
    })
}

export function changeRecord(params){
    return request({
        url:'/webContractHis/contractHisChangeLider',
        method:'post',
        data:params
    })
}

export function downFile(params){
    return request({
        url:'/commonInfo/downFiles',
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


export function moveContracts(params){
    return request({
      url:'/webContractHis/contractHisBatchMove',
      method:'post',
      data:params
    })
}

export function changeReceipt(params){
    return request({
      url:'/webContractHis/changeReceipt',
      method:'post',
      data:params
    })
}