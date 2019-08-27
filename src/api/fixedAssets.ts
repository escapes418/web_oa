import request from '@/utils/request'

export function queryAssetList(params) {
    return request({
        url: '/asset/queryAssetList',
        method: 'post',
        data:params
    })
}


export function saveOrUpdateAsset(params){
    return request({
        url:'/asset/saveOrUpdateAsset',
        method:'post',
        data:params
    })
}

export function queryAssetTypeTree(){
    return request({
        url:'/asset/queryAssetTypeTree',
        method:'post',
    })
}

export function pickOrTransferAsset(params){
    return request({
        url:'/asset/pickOrTransferAsset',
        method:'post',
        data:params
    })
}

export function saveAssetOut(params){
    return request({
        url:'/asset/saveAssetOut',
        method:'post',
        data:params
    })
}

export function saveAssetWriteOff(params){
    return request({
        url:'/asset/saveAssetWriteOff',
        method:'post',
        data:params
    })
}

export function queryAssetPlaceList(){
    return request({
        url:'/asset/queryAssetPlaceList',
        method:'post',
    })
}

export function queryAssetSupplierList(){
    return request({
        url:'/asset/queryAssetSupplierList',
        method:'post',
    })
}

export function fetchDetail(params){
    return request({
        url:'/asset/queryAssetDetail',
        method:'post',
        data:params
    })
}

export function assetExport(params){
    return request({
        url:'/asset/assetExport',
        method:'post',
        data:params
    })
}

export function assetImportModel(){
    return request({
        url:'/asset/assetImportModel',
        method:'post',
    })
}

export function deleteAssetById(params){
    return request({
        url:'/asset/deleteAssetById',
        method:'post',
        data:params
    })
}


