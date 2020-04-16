import request from '@/utils/request'

export function getProjectTasklist(params) {
    return request({
        url: '/webCustInfo/getPage',
        method: 'post',
        data:params
    })
}

export function getPmsDeployList(parmas) {
    return request({
        url:'/webPms/role',
        method:'get',
    })
}

export function projectTasklistUpdate(params) {
    return request({
        url: '/webPms/role',
        method: 'put',
        data:params
    })
}