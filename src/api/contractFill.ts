import request from '@/utils/request'

export function fetchList(params) {
    return request({
        url: '/contractHis/contractHisList',
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

export function fetchMember(parmas) {
    return request({
        url: '/webRecpFlow/escortEmployee',
        method: 'post',
        data:parmas
    },false)
}

export function conApply(params){
    return request({
        url: '/contractHis/saveContractHis',
        method: 'post',
        data:params
    })
}

export function getDetail(params){
    return request({
        url:'/contractHis/contractHisDetail',
        method:'post',
        data:params
    })
}

export function eidtList(params){
    return request({
        url:'/contractHis/changeContractHis',
        method:'post',
        data:params
    })
}

export function renewList(params){
    return request({
        url:'/contractHis/contractHisRenewal',
        method:'post',
        data:params
    })
}

export function abandonList(params){
    return request({
        url:'/contractHis/contractHisAbandon',
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

export function changeRecord(params){
    return request({
        url:'/contractHis/contractHisChangeLider',
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
      url:'/contractHis/contractHisBatchMove',
      method:'post',
      data:params
    })
}