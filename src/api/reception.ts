import request from '@/utils/request'

export function fetchList(params) {
    return request({
        url: '/webRecpFlow/queryMyRecpFlowList',
        method: 'post',
        data: params
    })
}

export function fetchProDic(parmas) {
    return request({
        url: '/commonInfo/queryDictInfo',
        method: 'post',
        data:parmas
    })
}

export function fetchProList(params) {
    return request({
        url: '/projectInfo/projectInfoList',
        method: 'post',
        data: params
    })
}

export function getSubjects(parmas) {
    return request({
        url: '/webCommonInfo/querySubInfo',
        method: 'post',
        data:parmas
    },false)
}

export function recepApply(params){
    return request({
        url: '/webRecpFlow/recpApply',
        method: 'post',
        data:params
    })
}

export function recepSave(params){
    return request({
        url:'/webRecpFlow/saveRecpFlowInfo',
        method:'post',
        data:params
    })
}

export function getDetail(params){
    return request({
        url:'/webRecpFlow/recpFlowDetail',
        method:'post',
        data:params
    })
}

export function startRecep(params){
    return request({
        url:'/webRecpFlow/recpFlowStartWorkFlow',
        method:'post',
        data:params
    })
}

export function recepFlow(params){
    return request({
        url:'/webRecpFlow/recpFlowCompleteTask',
        method:'post',
        data:params
    })
}

export function recepDel(params){
    return request({
        url:'/webRecpFlow/recpFlowRepealApply',
        method:'post',
        data:params
    })
}

export function recepCancel(params){
    return request({
        url:'/webRecpFlow/recpFlowRepealTask',
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
