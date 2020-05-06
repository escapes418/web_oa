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
        url:'/webCommonInfo/queryListByNameAndState',
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


export function getRoleDrop(params){
    return request({
        url:'/webPms/role/dropdownList',
        method:'get',
    })
}

export function getMemberList(params){
    return request({
        url:`/webPms/member/${params}`,
        method:'get',
    })
}

export function addMember(params){
    return request({
        url:'/webPms/member',
        method:'post',
        data:params
    })
}

export function modifyMember(params){
    return request({
        url:'/webPms/member',
        method:'put',
        data:params
    })
}

export function delMember(params){
    return request({
        url:`/webPms/member/${params}`,
        method:'delete'
    })
}

export function getStage(params){
    return request({
        url:`/webPms/stage?pageNum=${params.pageNum}&pageSize=${params.pageSize}&projectId=${params.projectId}`,
        method:'get',
    })
}

export function saveStage(id,params){
    return request({
        url:`/webPms/stage/${id}`,
        method:'put',
        data:params
    })
}

export function pushStage(params){
    return request({
        url:`/webPms/stage`,
        method:'post',
        data:params
    })
}

export function delStage(params){
    return request({
        url:`/webPms/stage/${params}`,
        method:'delete',
        // data:params
    })
}

export function checkDel(params){
    return request({
        url:`/webPms/stage/delcheck/${params}`,
        method:'get',
        // data:params
    })
}


export function getRunPage(params){
    return request({
        url:`/webPms/task/running/getPage`,
        method:'post',
        data:params
    })
}

export function getAllPage(params){
    return request({
        url:`/webPms/task/getPage`,
        method:'post',
        data:params
    })
}

export function addProgress(taskId,params){
    return request({
        url:`/webPms/task/progress/update/${taskId}`,
        method:'put',
        data:params
    })
}

export function getMissionMember(params){
    return request({
        url:`/webPms/task/member/downlist/${params}`,
        method:'get',
        // data:params
    })
}

export function getMissionStage(params){
    return request({
        url:`/webPms/stage/getList/${params}`,
        method:'get'
    })
}

export function saveMission(params){
    return request({
        url:`/webPms/task/save`,
        method:'post',
        data:params
    })
}


export function getBaseInfo(params){
    return request({
        url:`/webPms/generalMsg/baseInfo/${params}`,
        method:'get'
    })
}

export function getProgress(params){
    return request({
        url:`/webPms/generalMsg/progress/${params}`,
        method:'get'
    })
}

export function getDynamic(params){
    return request({
        url:`/webPms/generalMsg/dynamicInfo`,
        method:'post',
        data:params
    })
}

export function addDynamic(params){
    return request({
        url:`/webPms/generalMsg/project/dynamic/add`,
        method:'post',
        data:params
    })
}


export function getChange(params){
    return request({
        url:`/webPms/task/change/info/${params}`,
        method:'get'
    })
}

export function saveChange(id,params){
    return request({
        url:`/webPms/task/change/update/${id}`,
        method:'put',
        data:params
    })
}