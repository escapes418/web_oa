import request from '@/utils/request'

export function fetchList(params) {
    return request({
        url: '/webContractFlowNew/queryMyContractFlowList',
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

export function getCust(params){
    return request({
        url: `/webCustInfo/queryCustWithBusiness/${params}`,
        method: 'get',
    },false)
}

export function conApply(params){
    return request({
        url: '/webContractFlowNew/contractApplyNew',
        method: 'post',
        data:params
    })
}

export function getDetail(params){
    return request({
        url:'/webContractFlowNew/contractFlowDetail',
        method:'post',
        data:params
    })
}

export function contractFlow(params){
    return request({
        url:'/webContractFlowNew/contractFlowNewCompleteTask',
        method:'post',
        data:params
    })
}


export function contractCancel(params){
    return request({
        url:'/webContractFlowNew/repealTask',
        method:'post',
        data:params
    })
}

export function expDel(params){
    return request({
        url:'/webContractFlowNew/repealApply',
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
      url:'/webProjectInfo/projectBatchMove',
      method:'post',
      data:params
    })
}


export function delContracts(params){
    return request({
      url:'/webContractFlowNew/batchDeleteContractFlow',
      method:'post',
      data:params
    })
}


export function updateKeyWord(params){
    return request({
      url:'/webContractFlowNew/updateKeyWord',
      method:'post',
      data:params
    })
}