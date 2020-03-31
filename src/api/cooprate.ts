import request from '@/utils/request'

export function fetchList(params) {
    return request({
        url: '/webNeedFlow/queryNeedFlowList',
        method:'post',
        data: params
    })
}


export function addCoop(params){
    return request({
        url:'/webNeedFlow/addNeedFlow',
        method:'post',
        data:params
    })
}

export function getLabelList(params){
    return request({
        url:`/webNeedFlow/queryNeedLabel`,
        method:'get',
        // data:params
    })
}

export function getTypeList(params){
    return request({
        url:`/webNeedFlow/queryNeedType`,
        method:'get',
        // data:params
    })
}

export function addComment(params){
    return request({
        url:'/webNeedFlow/addComment',
        method:'post',
        data:params
    })
}

export function addProgress(params){
    return request({
        url:'/webNeedFlow/promoteProgress',
        method:'post',
        data:params
    })
}

export function editPart(params){
    return request({
        url:'/webNeedFlow/editParticipantList',
        method:'post',
        data:params
    })
}

export function getPart(params){
    return request({
        url:`/webNeedFlow/queryCurParticipantList/${params}`,
        method:'get',
        // data:params
    })
}

export function selectcharge(params){
    return request({
        url:'/webNeedFlow/setNextPrincipal',
        method:'post',
        data:params
    })
}

export function progressRecord(params){
    return request({
        url:'/webNeedFlow/queryHisProgress',
        method:'post',
        data:params
    })
}

export function getCommentList(params){
    return request({
        url:'/webNeedFlow/queryCommentList',
        method:'post',
        data:params
    })
}

export function chargeRecord(params){
    return request({
        url:'/webNeedFlow/queryHisPrincipal',
        method:'post',
        data:params
    })
}

export function getDetail(params){
    return request({
        url:`/webNeedFlow/queryDetail/${params}`,
        method:'get',
        // data:params
    })
}

export function getPlan(params){
    return request({
        url:'/webNeedFlow/queryNeedProgress',
        method:'post',
        data:params
    })
}


export function downFile(params){
    return request({
        url:'/webNeedFlow/exportProgressOrComment',
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


export function moveCoops(params){
    return request({
      url:'/webNeedFlow/needFlowBatchMove',
      method:'post',
      data:params
    })
}
