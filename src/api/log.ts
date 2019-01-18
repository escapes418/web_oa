import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/marketDaily/findPage',
    method: 'post',
    data:params
  })
}

export function getMaDetail(params){
  return request({
    url:'/marketDaily/getMarketDailyById',
    method:'post',
    data:params
  })
}

export function getMaCust(params){
  return request({
    url:'/marketDaily/getDailyCustMaintenance',
    method:'post',
    data:params
  })
}

export function saveMaLog(params){
  return request({
    url:'/marketDaily/saveMarketDaily',
    method:'post',
    data:params
  })
}

export function getCustList(params){
  return request({
    url:'/marketDaily/queryDailyCustMaintenance',
    method:'post',
    data:params
  })
}

export function fetchMember(parmas) {
  return request({
      url: '/webRecpFlow/escortEmployee',
      method: 'post',
      data:parmas
  },false)
}

export function exportFile(parmas) {
  return request({
      url: '/marketDaily/marketDailyExport',
      method: 'post',
      data:parmas
  },false)
}


export function exportImFile(parmas) {
  return request({
      url: '/implyDaily/implyDailyExport',
      method: 'post',
      data:parmas
  },false)
}

export function saveImLog(params){
  return request({
    url:'/implyDaily/saveImplyDaily',
    method:'post',
    data:params
  })
}

export function getProject(params){
  return request({
    url:'/projectInfo/queryProjectInfo',
    method:'post',
    data:params
  })
}

export function getNode(params){
  return request({
    url:'/implyDaily/queryProjectNodeList',
    method:'post',
    data:params
  })
}

export function getImDetail(params){
  return request({
    url:'/implyDaily/queryImplyDailyDetail',
    method:'post',
    data:params
  })
}