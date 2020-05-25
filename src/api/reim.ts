import request from '@/utils/request'

export function fetchList(params) {
    return request({
        url: '/webExpenseFlow/queryMyExpenseList',
        method: 'post',
        data: params
    })
}

export function fetchProDic(parmas) {
    return request({
        url: '/webCommonInfo/queryDictInfo',
        method: 'post',
        data:parmas
    })
}

export function fetchProList(params) {
    return request({
        url: '/webProjectInfo/projectInfoList',
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

export function getSubjectsNew(parmas) {
    return request({
        url: '/webCommonInfo/querySubInfoNew',
        method: 'post',
        data:parmas
    },false)
}

export function expApply(params){
    return request({
        url: '/webExpenseFlow/expenseApply',
        method: 'post',
        data:params
    })
}

export function expSave(params){
    return request({
        url:'/webExpenseFlow/saveExpenseInfo',
        method:'post',
        data:params
    })
}

export function getDetail(params){
    return request({
        url:'/webExpenseFlow/flowdetail',
        method:'post',
        data:params
    })
}

export function startExp(params){
    return request({
        url:'/webExpenseFlow/startWorkFlow',
        method:'post',
        data:params
    })
}

export function expFlow(params){
    return request({
        url:'/webExpenseFlow/completeTask',
        method:'post',
        data:params
    })
}

export function expDel(params){
    return request({
        url:`/webExpenseFlow/repealApply/${params}`,
        method:'delete',
        // data:params
    })
}

export function expCancel(params){
    return request({
        url:'/webExpenseFlow/repealTask',
        method:'post',
        data:params
    })
}


export function fetchThemeList(params){
    return request({
        url:'/webCommonInfo/flowRevencelist',
        method:'post',
        data:params
    })
}

export function getMember(params){
    return request({
        url:'/webCommonInfo/queryUserInfo',
        method:'post',
        data:params
    },false)
}

export function downFile(params){
    return request({
        url:'/webCommonInfo/downFiles',
        method:'post',
        data:params
    })
}

export function downReim(params){
    return request({
        url:'/webExpenseFlow/exportMyExpenseList',
        method:'post',
        data:params
    })
}

export function getAccountList(parmas) {
    return request({
        url:'/webCommonInfo/queryMyBankCardInfoList',
        method:'post',
        // data:parmas
    })
}

export function setActual(parmas) {
    return request({
        url:'/webExpenseFlow/backExpenseApply',
        method:'post',
        data:parmas
    })
}