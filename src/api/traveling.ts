import request from '@/utils/request'

export function getMember(params){
  return request({
    url:'/webRecpFlow/escortEmployee',
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
