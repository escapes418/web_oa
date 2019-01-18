import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/custInfoClue/custInfoClueList',
    method: 'post',
    data:params
  })
}

export function getDetail(params){
  return request({
    url:'/custInfoClue/custInfoClueDetail',
    method:'post',
    data:params
  })
}

export function saveClue(params){
  return request({
    url:'/custInfoClue/saveCustInfoClue',
    method:'post',
    data:params
  })
}
