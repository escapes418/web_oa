import request from '@/utils/request'

export function getProjectTasklist(params) {
    return request({
        url: '/webPms/task/my/getPage',
        method: 'post',
        data:params
    })
}
export function reqUpload(params) {
    return request({
        url: '/webPms/task/progress/update/'+params.id,
        method: 'PUT',
        data:params
    })
}

export function getdetailDynamic(params){
    return request({
        url:`/webPms/task/dynamic/info`,
        method:'post',
        data:params
    })
}

export function getdetailChangeRecord(params){
    return request({
        url:`/webPms/task/change/record/`+params.businessType+"/"+params.businessId,
        method:'get',
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

export function getSignContractlist(params) {
    return request({
        url: '/webPms/contractRelation',
        method: 'post',
        data:params
    })
}

export function contractRelationDel(params) {
    return request({
        url:'/webPms/contractRelation/'+params,
        method:'delete',
    })
}

export function getContractlist(params) {
    return request({
        url: '/webPms/contract',
        method: 'post',
        data:params
    })
}

export function saveContractRelation(params) {
    return request({
        url: '/webPms/saveContractRelation/'+params.id,
        method: 'post',
        data:{
            contractIds:params.contractIds
        }
    })
}

export function taskDetailInfo(params) {
    return request({
        url: '/webPms/task/detailInfo/'+params,
        method: 'get',
    })
}

export function taskDetailInfoAttachmentlist(params) {
    return request({
        url: '/webPms/task/detailInfo/attachmentlist',
        method: 'post',
        data:params
    })
}

export function taskDetailInfoSubTask(params) {
    return request({
        url: '/webPms/task/detailInfo/subTask',
        method: 'post',
        data:params
    })
}