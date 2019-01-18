import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/webRecpFlow/queryMyRecpFlowList',
    method: 'post',
    data: params
  })
}

export function fetchMember(params){
  return request({
    url:'/webRecpFlow/escortEmployee',
    method:'post',
    data:params
  })
}

export function recepSave(params){
  return request({
    url:'/webRecpFlow/saveRecpFlowInfo',
    method:'post',
    data:params
  })
}

export function fetchProDic(parmas) { //获取字典信息,tax_city:发票所属城市,oa_project:项目,oa_expense_type:报销类型
  return request({
    url: '/commonInfo/queryDictInfo',
    method: 'post',
    data:parmas
  })
}

export function fetchProList(params) { //项目管理-查询列表
  return request({
    url: '/projectInfo/projectInfoList',
    method: 'post',
    data: params
  })
}



export function recepApply(params){ //Web端接待申请-发起申请
  return request({
    url: '/webRecpFlow/recpApply',
    method: 'post',
    data:params
  })
}


export function getDetail(params){ //接待申请-查询审批流程详情
  return request({
    url:'/webRecpFlow/recpFlowDetail',
    method:'post',
    data:params
  })
}

export function startRecep(params){
  return request({
    url:'/webRecpFlow/recpFlowStartWorkFlow',
    method:'post',
    data:params
  })
}

export function recepFlow(params){//接待申请-同意/驳回
  return request({
    url:'/webRecpFlow/recpFlowCompleteTask',
    method:'post',
    data:params
  })
}

export function recepDel(params){ //接待删除
  return request({
    url:'/webRecpFlow/recpFlowRepealApply',
    method:'post',
    data:params
  })
}

export function recepCancel(params){ //接待撤销
  return request({
    url:'/webRecpFlow/recpFlowRepealTask',
    method:'post',
    data:params
  })
}



export function queryMyTravelFlowList(params){ //Web端出差申请-查询列表
  return request({
    url:'/webTravelFlow/queryMyTravelFlowList',
    method:'post',
    data:params
  })
}

export function retravelFlowDetail(params){ //Web出差申请-查询审批流程详情
  return request({
    url:'/webTravelFlow/retravelFlowDetail',
    method:'post',
    data:params
  })
}

export function saveTravelFlowInfo(params){ // Web端出差申请-单据保存草稿
  return request({
    url:'/webTravelFlow/saveTravelFlowInfo',
    method:'post',
    data:params
  })
}

export function travelApply(params){ //Web端出差申请-发起申请
  return request({
    url:'/webTravelFlow/travelApply',
    method:'post',
    data:params
  })
}

export function travelFlowCompleteTask(params){ //Web端出差申请-同意/驳回
  return request({
    url:'/webTravelFlow/travelFlowCompleteTask',
    method:'post',
    data:params
  })
}

export function travelFlowRepealApply(params){ //Web端出差申请-删除单据
  return request({
    url:'/webTravelFlow/travelFlowRepealApply',
    method:'post',
    data:params
  })
}

export function travelFlowRepealTask(params){ //Web出差申请-流程撤销
  return request({
    url:'/webTravelFlow/travelFlowRepealTask',
    method:'post',
    data:params
  })
}

export function travelFlowStartWorkFlow(params){ //Web出差申请-草稿发起申请
  return request({
    url:'/webTravelFlow/travelFlowStartWorkFlow',
    method:'post',
    data:params
  })
}

export function resourcesRelationHandleFlowList(params){ //Web端资源申请办理-关联列表
  return request({
    url:'/webResourcesHandleFlow/resourcesRelationHandleFlowList',
    method:'post',
    data:params
  })
}
