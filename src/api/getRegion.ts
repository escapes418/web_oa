import request from '@/utils/request'

export function getRegion(parmas) {
    return request({
        url:'/webCommonInfo/queryAreaInfo',
        method:'post',
        data:parmas
    })
}
