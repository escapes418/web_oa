import request from '@/utils/request'


export function fetchProList(params) { //项目管理-查询列表
  return request({
    url: '/webProjectInfo/projectInfoList',
    method: 'post',
    data: params
  })
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export function resourcesHandleFlowList(params){ //Web端资源申请办理-查询列表
  return request({
    url:'/webResourcesHandleFlow/resourcesHandleFlowList',
    method:'post',
    data:params
  })
}

export function resourcesHandleInfoDetail(params){ //WEB端资源办理-资源申请流程详细信息
  return request({
    url:'/webResourcesHandleFlow/resourcesHandleInfoDetail',
    method:'post',
    data:params
  })
}

export function queryRelationResourcesApplyFlowList(params){ //Web端资源申请-查询关联列表
  return request({
    url:'/webResourcesApplyFlow/queryRelationResourcesApplyFlowList',
    method:'post',
    data:params
  })
}

export function resourcesHandleApply(params){ //Web端资源办理-发起申请
  return request({
    url:'/webResourcesHandleFlow/resourcesHandleApply',
    method:'post',
    data:params
  })
}

export function saveResourcesHandleInfo(params){ //WEB端资源办理-保存草稿
  return request({
    url:'/webResourcesHandleFlow/saveResourcesHandleInfo',
    method:'post',
    data:params
  })
}

export function queryHandleEmployeeList(params){ //WEB端资源办理-查询指派人员信息
  return request({
    url:'/webResourcesHandleFlow/queryHandleEmployeeList',
    method:'post',
    data:params
  })
}

export function deleteResourcesHandleInfo(params){ //WEB端资源办理-删除
  return request({
    url:'/webResourcesHandleFlow/deleteResourcesHandleInfo',
    method:'post',
    data:params
  })
}

export function resourcesHandleFlowCompleteTask(params){ //Web端资源办理-同意
  return request({
    url:'/webResourcesHandleFlow/resourcesHandleFlowCompleteTask',
    method:'post',
    data:params
  })
}

export function resourcesHandleFlowRepealTask(params){ //Web端资源办理-流程撤销
  return request({
    url:'/webResourcesHandleFlow/resourcesHandleFlowRepealTask',
    method:'post',
    data:params
  })
}

export function fetchProDic(parmas) { //获取字典信息,tax_city:发票所属城市,oa_project:项目,oa_expense_type:报销类型
  return request({
    url: '/webCommonInfo/queryDictInfo',
    method: 'post',
    data:parmas
  })
}

