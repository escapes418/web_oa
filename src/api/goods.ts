import request from '@/utils/request'

export function getSubjectsNew(parmas) {
    return request({
        url: '/commonInfo/querySubInfoNew',
        method: 'post',
        data:parmas
    },false)
}

export function fetchList(params) {
    return request({
        url: '/consumables/findPageConsumables',
        method: 'post',
        data: params
    })
}


export function addGood(params){
    return request({
        url:'/consumables/saveConsumables',
        method:'post',
        data:params
    })
}

export function getPlaceList(params){
    return request({
        url:'/asset/queryAssetPlaceList',
        method:'post',
        data:params
    })
}

export function addStore(params){
    return request({
        url:'/consumables/putinConsumables',
        method:'post',
        data:params
    })
}

export function addReceive(params){
    return request({
        url:'/consumables/putoutConsumables',
        method:'post',
        data:params
    })
}

export function addVerify(params){
    return request({
        url:'/consumables/offConsumables',
        method:'post',
        data:params
    })
}

export function downFile(params){
    return request({
        url:'/needFlow/exportProgressOrComment',
        method:'post',
        data:params
    })
}


export function getTypes(params){
    return request({
        url:'/consumables/queryGoodType',
        method:'post',
        data:params
    })
}

export function delConsum(params){
    return request({
        url:'/consumables/deleteConsumables',
        method:'post',
        data:params
    })
}

export function consumDetail(params){
    return request({
        url:'/consumables/detailConsumables',
        method:'post',
        data:params
    })
}

export function exportGood(params){
    return request({
        url:'/consumables/consumablesExport',
        method:'post',
        data:params
    })
}

export function importTemp(params){
    return request({
        url:'/consumables/assetImportModel',
        method:'post',
        data:params
    })
}