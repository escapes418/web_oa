import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/webResourcesApplyFlow/queryMyResourcesApplyFlowList',
    method: 'post',
    data: params
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

export function saveResource(params) {
  return request({
    url: '/webResourcesApplyFlow/saveResourcesApplyInfo',
    method:'post',
    data: params
  })
}

export function applyResource(params) {
  return request({
    url:'/webResourcesApplyFlow/resourcesApply',
    method:'post',
    data: params
  })
}

export function getDetail(params){
  return request({
    url:'/webResourcesApplyFlow/resourcesApplyFlowDetail',
    method:'post',
    data:params
  })
}

export function delResource(params){
  return request({
    url:'/webResourcesApplyFlow/deleteResourcesApplyFlow',
    method:'post',
    data:params
  })
}

export function fetchMember(params){
  return request({
    url:'/webResourcesApplyFlow/queryResourcesApplyEmployeeList',
    method:'post',
    data:params
  },false)
}

export function resourcesApplyComplete(params){
  return request({
    url:'/webResourcesApplyFlow/resourcesApplyCompleteTask',
    method:'post',
    data:params
  })
}

export function resourseFlowRepealTask(params){
  return request({
    url:'/webResourcesApplyFlow/resourcesApplyFlowRepealTask',
    method:'post',
    data:params
  })
}