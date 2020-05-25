import request from '@/utils/request'

export function getConfig(params) {
    return request({
        url: `/processVisual/getConfig?processType=${params}`,
        method: 'get'
    })
}

export function getConfigDetails(params) {
    return request({
        url: `/processVisual/getConfigDetails?type=${params.type}&processType=${params.processType}`,
        method: 'get'
    })
}

export function getFlow(params) {
    return request({
        url: `/processVisual/list?name=${params.name}`,
        method: 'get'
    })
}

export function createFlow(params) {
    return request({
        url: `/processVisual/create?name=${params.name}&key=${params.key}&description=${params.description}`,
        method: 'get'
    })
}

export function delFlow(params) {
    return request({
        url: `/processVisual/delete/${params}`,
        method: 'get'
    })
}

export function getMember(params){
    return request({
      url:`/webCommonInfo/queryUserInfo`,
      method:'post',
      data:params
    })
}

export function saveFlow(params){
    return request({
        url:`/processVisual/save`,
        method:'post',
        data:params
    })
}

export function deployFlow(params) {
    return request({
        url: `/processVisual/deploy/${params}`,
        method: 'get'
    })
}

export function getDetail(params) {
    return request({
        url: `/processVisual/getProcessData/${params}`,
        method: 'get'
    })
}