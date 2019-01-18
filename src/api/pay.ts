import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/webExpenseFlow/bringRemitList',
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

export function getDetail(params){
  return request({
    url:'/webExpenseFlow/flowdetail',
    method:'post',
    data:params
  })
}

export function payApplay(params){
  return request({
    url:'/webExpenseFlow/bringRemitSave',
    method:'post',
    data:params
  })
}