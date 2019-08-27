import request from '@/utils/request'

export function getRegion(parmas) {
    return request({
        url:'/commonInfo/queryAreaInfo',
        method:'post',
        data:parmas
    })
}
