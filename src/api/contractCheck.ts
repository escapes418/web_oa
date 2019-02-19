import request from '@/utils/request'

export function fetchList(params) {
    return request({
        url: '/contractFlowNew/queryMyContractFlowList',
        method: 'post',
        data: params
    })
}

export function getContractTemlist(params) {
    return request({
        url: '/contractFlowNew/queryContractTempletList',
        method: 'post',
        data: params
    })
}

export function getProject(params){
    return request({
        url:'/projectInfo/projectInfoList',
        method:'post',
        data:params
    })
}

export function getContractConfig(params) {
    return request({
        url: '/contractFlowNew/queryContractConfig',
        method: 'post',
        data: params
    })
}

export function getMainContract(params) {
    return request({
        url: '/contractFlowNew/queryMainContractList',
        method: 'post',
        data: params
    })
}

export function fetchProDic(parmas) {
    return request({
        url: '/commonInfo/queryDictInfo',
        method: 'post',
        data:parmas
    })
}

export function conApply(params){
    return request({
        url: '/contractFlowNew/contractApplyNew',
        method: 'post',
        data:params
    })
}

export function getDetail(params){
    return request({
        url:'/contractFlowNew/contractFlowDetail',
        method:'post',
        data:params
    })
}

export function contractFlow(params){
    return request({
        url:'/contractFlowNew/contractFlowNewCompleteTask',
        method:'post',
        data:params
    })
}


export function contractCancel(params){
    return request({
        url:'/contractFlowNew/repealTask',
        method:'post',
        data:params
    })
}

export function expDel(params){
    return request({
        url:'/contractFlowNew/repealApply',
        method:'post',
        data:params
    })
}


export function findAllProject(params){
    return request({
        url:'/projectInfo/projectInfoList',
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
      url:'/commonInfo/queryUserInfo',
      method:'post',
      data:params
    })
}


export function moveContracts(params){
    return request({
      url:'/projectInfo/projectBatchMove',
      method:'post',
      data:params
    })
}