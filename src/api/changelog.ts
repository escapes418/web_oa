import request from '@/utils/request'

export function sysVersionLists(params) {
  return request({
    url: '/sysVersion/sysVersionLists',
    method: 'post',
    data: params
  })
}

