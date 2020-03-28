import request from '@/utils/request'

export function modifyPwd(parmas) {
  return request({
    url:'/user/modifyPwd',
    method:'post',
    data:parmas
  })
}

export function fetchList(parmas) {
  return request({
    url:'/webCommonInfo/findMessagePage',
    method:'post',
    data:parmas
  })
}

export function getRedCount(parmas) {
  return request({
    url:'/webCommonInfo/findRedCount',
    method:'post',
    data:parmas
  })
}