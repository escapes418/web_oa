import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/webExpenseFlow/queryMyExpenseList',
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

export function fetchProList(params) {
  return request({
    url: '/projectInfo/projectInfoList',
    method: 'post',
    data: params
  })
}

export function getSubjects(parmas) {
  return request({
    url: '/commonInfo/querySubInfo',
    method: 'post',
    data:parmas
  })
}

export function expApply(params){
  return request({
    url: '/webExpenseFlow/expenseApply',
    method: 'post',
    data:params
  })
}

export function expSave(params){
  return request({
    url:'/webExpenseFlow/saveExpenseInfo',
    method:'post',
    data:params
  })
}

export function getDetail(params){
  return request({
    url:'/webExpenseFlow/flowdetail',
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

export function expFlow(params){
  return request({
    url:'/webExpenseFlow/completeTask',
    method:'post',
    data:params
  })
}

export function expDel(params){
  return request({
    url:'/webExpenseFlow/repealApply',
    method:'post',
    data:params
  })
}

export function expCancel(params){
  return request({
    url:'/webExpenseFlow/repealTask',
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

export function fetchMember(params){
  return request({
    url:'/webRecpFlow/escortEmployee',
    method:'post',
    data:params
  },false)
}

export function downFile(params){
  return request({
    url:'/commonInfo/downFiles',
    method:'post',
    data:params
  })
}

export function downReim(params){
  return request({
    url:'/webExpenseFlow/exportMyExpenseList',
    method:'post',
    data:params
  })
}