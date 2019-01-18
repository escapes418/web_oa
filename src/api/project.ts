import request from '@/utils/request'

export function fetchList(params) {
    return request({
        url: '/projectInfo/projectInfoList',
        method: 'post',
        data:params
    })
}

export function fetchForm(params){
    return request({
        url:'/projectInfo/projectInfoDetail',
        method:'post',
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

export function custList(params){
    return request({
        url: '/custInfo/custInfos',
        method: 'post',
        data:params
    },false)
}

export function savePro(params){
    return request({
        url:'/projectInfo/saveProjectInfo',
        method:'post',
        data:params
    })
}

export function getMaintain(params){
    return request({
        url:'/projectInfo/projectMaintenanceList',
        method:'post',
        data:params
    })
}

export function saveMaintain(params){
    return request({
        url:'/projectInfo/saveProjectMaintenance',
        method:'post',
        data:params
    })
}

export function getCompanyList(params){
    return request({
        url:'/company/queryListByNameAndState',
        method:'post',
        data:params
    })
}

export function getContractList(params){
    return request({
        url:'/projectInfo/queryProjectContractHis',
        method:'post',
        data:params
    })
}

export function getNodeList(params){
    return request({
        url:'/projectInfo/pagedQueryNodeList',
        method:'post',
        data:params
    })
}

export function getImList(params){
    return request({
        url:'/projectInfo/projectImplyStatusList',
        method:'post',
        data:params
    })
}

export function downFile(params){
    return request({
        url:'/projectInfo/exportProjectImplyStatus',
        method:'post',
        data:params
    })
}