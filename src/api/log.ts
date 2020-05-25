import request from '@/utils/request'

export function fetchList(params) {
    return request({
        url: '/webMarketDaily/findPage',
        method: 'post',
        data:params
    })
}

export function getMaDetail(params){
    return request({
        url:'/webMarketDaily/getMarketDailyById',
        method:'post',
        data:params
    })
}

export function getMaCust(params){
    return request({
        url:'/webMarketDaily/getDailyCustMaintenance',
        method:'post',
        data:params
    })
}

export function saveMaLog(params){
    return request({
        url:'/webMarketDaily/saveMarketDaily',
        method:'post',
        data:params
    })
}

export function getCustList(params){
    return request({
        url:'/webMarketDaily/queryDailyCustMaintenance',
        method:'post',
        data:params
    })
}

export function getMember(params){
    return request({
        url:'/webCommonInfo/queryUserInfo',
        method:'post',
        data:params
    })
}

export function exportFile(parmas) {
    return request({
        url: '/webMarketDaily/marketDailyExport',
        method: 'post',
        data:parmas
    },false)
}


export function exportImFile(parmas) {
    return request({
        url: '/webImplyDaily/implyDailyExport',
        method: 'post',
        data:parmas
    },false)
}

export function saveImLog(params){
    return request({
        url:'/webImplyDaily/saveImplyDaily',
        method:'post',
        data:params
    })
}

export function getProject(params){
    return request({
        url:'/webProjectInfo/queryProjectInfo',
        method:'post',
        data:params
    })
}

export function getNode(params){
    return request({
        url:'/webImplyDaily/queryProjectNodeList',
        method:'post',
        data:params
    })
}

export function getImDetail(params){
    return request({
        url:'/webImplyDaily/queryImplyDailyDetail',
        method:'post',
        data:params
    })
}

export function saveCritique(params){
    return request({
        url:'/webMarketDaily/saveDailyComment',
        method:'post',
        data:params
    })
}

export function getCritique(params){
    return request({
        url:'/webMarketDaily/queryDailyComment',
        method:'post',
        data:params
    })
}

export function getSend(params){
    return request({
        url:'/webMarketDaily/querySendToByUserId',
        method:'post',
        data:params
    })
}