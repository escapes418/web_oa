import request from '@/utils/request'

export function getSubList(params) {
    return request({
        url: '/webReport/querySubjectCostReportInfo',
        method: 'post',
        data: params
    })
}

export function downSubFile(params){
    return request({
        url:'/webReport/querySubjectCostReportInfoExport',
        method:'post',
        data:params
    })
}

export function getDepartList(params){
    return request({
        url:'/webReport/queryOfficeCostReportInfo',
        method:'post',
        data:params
    })
}

export function downDepFile(params){
    return request({
        url:'/webReport/queryOfficeCostReportInfoExport',
        method:'post',
        data:params
    })
}

export function getEmployeeList(params){
    return request({
        url:'/webReport/queryEmployeeReport',
        method:'post',
        data:params
    })
}

export function downEmpFile(params){
    return request({
        url:'/webReport/queryEmployeeReportExport',
        method:'post',
        data:params
    })
}

export function getProjectList(params){
    return request({
        url:'/webReport/queryProjectReport',
        method:'post',
        data:params
    })
}

export function getProSubList(params){
    return request({
        url:'/webReport/queryProjectSubjectCostReportInfo',
        method:'post',
        data:params
    })
}

export function downProFile(params){
  return request({
    url:'/webReport/exportProjectReport',
    method:'post',
    data:params
  })
}

export function downProSubFile(params){
    return request({
        url:'/webReport/queryProjectSubjectCostReportInfoExport',
        method:'post',
        data:params
    })
}

export function getImpleList(params){
    return request({
        url:'/webReport/queryEmpStatusDayReportInfo',
        method:'post',
        data:params
    })
}


export function getPastList(params){
    return request({
        url:'/webReport/queryEmpStatusDayReportDetailInfo',
        method:'post',
        data:params
    })
}

export function downImpleFile(params){
    return request({
        url:'/webReport/queryEmpStatusDayReportInfoExport',
        method:'post',
        data:params
    })
}


export function getImpleStatusList(params){
    return request({
        url:'/webReport/queryEmpStatusMonthReportInfo',
        method:'post',
        data:params
    })
}

export function getMonthList(params){
    return request({
        url:'/webReport/queryEmpStatusMonthDetailReportInfo',
        method:'post',
        data:params
    })
}


export function downImpleMonthList(params){
    return request({
        url:'/webReport/empStatusMonthReportExport',
        method:'post',
        data:params
    })
}


export function funcUseList(params){
    return request({
        url:'/usage/queryUsageList',
        method:'post',
        data:params
    })
}

export function funcUseDetail(params){
    return request({
        url:'/usage/queryUsageDetailList',
        method:'post',
        data:params
    })
}

export function reimDocList(params){
    return request({
        url:'/webExpenseFlow/queryExpenseList',
        method:'post',
        data:params
    })
}

export function overdueList(params){
    return request({
        url:'/webReport/contractOverdueList',
        method:'post',
        data:params
    })
}

export function exportOverdue(params){
    return request({
        url:'/webReport/contractOverdueExport',
        method:'post',
        data:params
    })
}

export function fetchProDic(parmas) {
    return request({
        url: '/commonInfo/queryDictInfo',
        method: 'post',
        data:parmas
    })
}

export function getSubjectsNew(parmas) {
    return request({
        url: '/commonInfo/querySubInfoNew',
        method: 'post',
        data:parmas
    },false)
}

export function downFuncUseFile(parmas) {
    return request({
        url: '/usage/exportUsageWeekOrDetail',
        method: 'post',
        data:parmas
    },false)
}


export function getChartData(parmas) {
    return request({
        url: '/webExpenseFlow/approveTimeInfo',
        method: 'post',
        data:parmas
    })
}


export function getApproval(parmas) {
    return request({
        url: '/webReport/approvalSituation',
        method: 'post',
        data:parmas
    })
}

export function downApprove(parmas) {
  return request({
      url: '/webReport/approvalSituationExport',
      method: 'post',
      data:parmas
  })
}

export function getSubmit(parmas) {
    return request({
        url: '/webReport/flowSubmitSituation',
        method: 'post',
        data:parmas
    })
}

export function downSubmit(parmas) {
    return request({
        url: '/webReport/flowSubmitSituationExport',
        method: 'post',
        data:parmas
    })
}

export function getMaintainStatistic(parmas) {
    return request({
        url: '/completionRateReport/queryMainCustMaintainReport',
        method: 'post',
        data:parmas
    })
}

export function getVipCustomer(parmas) {
    return request({
        url: '/completionRateReport/queryCompletionRateReport',
        method: 'post',
        data:parmas
    })
}


export function getMember(params){
    return request({
      url:'/commonInfo/queryUserInfo',
      method:'post',
      data:params
    })
}

export function getSalesOffice(params){
    return request({
      url:'/webReport/salesOfficeWorkStat',
      method:'post',
      data:params
    })
}

export function getSalesMan(params){
    return request({
      url:'/webReport/salesEmployeeWorkStat',
      method:'post',
      data:params
    })
}