import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/webContractFlow/queryMyContractFlowList',
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

export function fetchComInfoList(params) {
  return request({
    url: '/webContractFlow/contractCompanyInfoList',
    method: 'post',
    data: params
  })
}

export function getFirstPart(parmas) {
  return request({
    url: '/webContractFlow/firstCompanyInfoList',
    method: 'post',
    data:parmas
  })
}

export function conApply(params){
  return request({
    url: '/webContractFlow/contractFlowApply',
    method: 'post',
    data:params
  })
}

export function getDetail(params){
  return request({
    url:'/webContractFlow/contractFlowDetail',
    method:'post',
    data:params
  })
}

export function startExp(params){
  return request({
    url:'/webExpenseFlow/startWorkFlow',
    method:'post',
    data:params
  })
}

export function contractFlow(params){
  return request({
    url:'/webContractFlow/contractFlowCompleteTask',
    method:'post',
    data:params
  })
}


export function contractCancel(params){
  return request({
    url:'/webContractFlow/contractFlowRepealTask',
    method:'post',
    data:params
  })
}


export function fetchThemeList(params){
  return request({
    url:'/commonInfo/flowRevencelist',
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


