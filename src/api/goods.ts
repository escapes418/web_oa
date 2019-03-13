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

export function getTypeList(params){
    return request({
        url:'/needFlow/queryNeedType',
        method:'post',
        data:params
    })
}

export function addComment(params){
    return request({
        url:'/needFlow/addComment',
        method:'post',
        data:params
    })
}

export function addProgress(params){
    return request({
        url:'/needFlow/promoteProgress',
        method:'post',
        data:params
    })
}

export function editPart(params){
    return request({
        url:'/needFlow/editParticipantList',
        method:'post',
        data:params
    })
}

export function getPart(params){
    return request({
        url:'/needFlow/queryCurParticipantList',
        method:'post',
        data:params
    })
}

export function selectcharge(params){
    return request({
        url:'/needFlow/setNextPrincipal',
        method:'post',
        data:params
    })
}

export function progressRecord(params){
    return request({
        url:'/needFlow/queryHisProgress',
        method:'post',
        data:params
    })
}

export function getCommentList(params){
    return request({
        url:'/needFlow/queryCommentList',
        method:'post',
        data:params
    })
}

export function chargeRecord(params){
    return request({
        url:'/needFlow/queryHisPrincipal',
        method:'post',
        data:params
    })
}

export function getDetail(params){
    return request({
        url:'/needFlow/queryDetail',
        method:'post',
        data:params
    })
}

export function getPlan(params){
    return request({
        url:'/needFlow/queryNeedProgress',
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

export function getMember(params){
    return request({
      url:'/commonInfo/queryUserInfo',
      method:'post',
      data:params
    })
}


export function moveCoops(params){
    return request({
      url:'/needFlow/needFlowBatchMove',
      method:'post',
      data:params
    })
}
