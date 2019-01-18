import request from '@/utils/request'

export function modifyPwd(parmas) {
  return request({
    url:'/user/modifyPwd',
    method:'post',
    data:parmas
  })
}

