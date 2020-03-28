import request from '@/utils/request'

export function fetchList(params) {
    return request({
        url: '/webProjectInfo/projectInfoList',
        method: 'post',
        data:params
    })
}

export function fetchForm(params){
    return request({
        url:'/webProjectInfo/projectInfoDetail',
        method:'post',
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

export function custList(params){
    return request({
        url: '/webCustInfo/custInfos',
        method: 'post',
        data:params
    },false)
}

export function savePro(params){
    return request({
        url:'/webProjectInfo/saveProjectInfo',
        method:'post',
        data:params
    })
}

export function getMaintain(params){
    return request({
        url:'/webProjectInfo/projectMaintenanceList',
        method:'post',
        data:params
    })
}

export function saveMaintain(params){
    return request({
        url:'/webProjectInfo/saveProjectMaintenance',
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
        url:'/webProjectInfo/queryProjectContractHis',
        method:'post',
        data:params
    })
}

export function getNodeList(params){
    return request({
        url:'/webProjectInfo/pagedQueryNodeList',
        method:'post',
        data:params
    })
}

export function getImList(params){
    return request({
        url:'/webProjectInfo/projectImplyStatusList',
        method:'post',
        data:params
    })
}

export function downFile(params){
    return request({
        url:'/webProjectInfo/exportProjectImplyStatus',
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


export function moveProjects(params){
    return request({
      url:'/webProjectInfo/projectBatchMove',
      method:'post',
      data:params
    })
}