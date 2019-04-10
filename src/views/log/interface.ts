import { type } from "os";

export interface QUERY_list {
    deptOrUserId:string,
    timeRange:string[],
    readStatus:string
}

export interface DEPART_tree {
    name:string,
    id:string
}

export interface DIC_list {
    name:string,
    value:string,
    type:string
}

export interface DATA_list {
    count?:number,
    createBy?: string,// 提交人id ,
    createByName ?:string,//提交人name ,
    createTime ?:number,
    dailyId ?:string,//关联id ,
    dailyOffice ?:string,// 提交人部门id ,
    dailyOfficeName ?:string,//提交人部门name ,
    dailyTemplate ?:string, //日志模板：0实施模板，1市场模板 ,
    dailyTemplateName ?:string,//日志模板name：0实施模板，1市场模板 ,
    delFlag ?:string,//
    id ?:string, //
    isNewRecord ?:boolean,// 
    limitString ?:string,//
    pageNo ?:number, //
    pageSize?:number,// 
    readStatus ?:string,// 阅读状态：0已读，1未读 ,
    readStatusName ?:string, // 阅读状态name：0已读，1未读 ,
    remarks ?:string, //
    updateTime ?:string, //
}


export interface POST_data {
    afterDailyPlan:string,// 明日计划 ,
    afterVisitCount:number,//  明日拜访客户数量 ,
    custIntentionCount :number,//当日意向客户数量 ,
    custPhotoCount :number,// 当日电话拜访数量 ,
    custSignCount :number,// 当日签约数量 ,
    custVisitCount :number, //当日上门拜访数量 ,
    dailyCustMaintenanceList:Array<POST_cust>,
    dailyTemplate:string,// 日志模板：0实施模板，1市场模板 ,
    remarks :string, // 备注 ,
    sendToList:string[] ,
    copyToList:string[]
}
interface POST_cust {
    index:number,
    custId:string,//客户id ,
    custMaintenanceContent :string, //维护内容 ,
    custMaintenanceDate:number, // 维护时间:yyyy-MM-dd HH:mm:ss ,
    visitTypeName :string,// 拜访名称,
    visitType :string, // 拜访类型
}

export interface CUST_list {
    count ?:number,//
    createTime ?:string, //
    custId ?:string, // 客户id ,
    custMaintenanceContent ?:string, //维护内容 ,
    custMaintenanceDate ?:number, // 维护时间:yyyy-MM-dd HH:mm:ss ,
    custName ?:string,// 客户name ,
    delFlag ?:string,//
    id ?:string, //
    isNewRecord ?:boolean,//
    limitString ?:string, //
    marketDailyId ?:string, // 市场日志表id ,
    pageNo ?:number, //optional),
    pageSize ?:number,// optional),
    remarks ?:string,// optional),
    updateTime ?:string,// optional),
    visitType ?:string, //optional): 拜访类型 ,
    visitTypeName ?:string, //optional): 拜访类型name
}

export interface MEMBER_list {
    admin?: boolean,
    createDate?: string,
    email?: string,
    id?:string,
    isNewRecord?:boolean,
    loginDate?: string,
    loginFlag?: string,
    loginIp?: string,
    loginName?: string,
    mobile?: string,
    name?: string,
    no?: string,
    oldLoginDate?: string,
    oldLoginIp?: string,
    phone?: string,
    photo?: string,
    postIds?: string,
    remarks?: string,
    roleNames?: string,
    updateDate?: string,
    userType?: string,
}

export interface POST_item {
    index:number,
    custId:string,//客户id ,
    custName:string,//客户名称
    custMaintenanceContent :string, //维护内容 ,
    custMaintenanceDate:number, // 维护时间:yyyy-MM-dd HH:mm:ss ,
    visitTypeName :string,// 拜访名称,
    visitType :string, // 拜访类型
}


export interface DETAIL_info {
    afterDailyPlan ?:string, //明日计划 ,
    afterVisitCount ?:string,// 明日拜访客户数量 ,
    createByName?:string,// 提交人 ,
    createTime ?:number, // 提交时间 ,
    custIntentionCount ?:string,// 当日意向客户数量 ,
    custPhotoCount?:string,//当日电话拜访数量 ,
    custSignCount?:string,// 当日签约数量 ,
    custVisitCount ?:string,//当日上门拜访数量 ,
    dailyCode ?:string,// 日志编号 ,
    dailyTemplate ?:string,// 日志模板：0实施模板，1市场模板 ,
    dailyTemplateName ?:string,//日志模板name：0实施模板，1市场模板 ,
    officeName?:string,// 部门名称 ,
    sendToList?:Array<SEND_info>
}

interface SEND_info{
    count ?:number,
    createTime ?:string,
    dailyId ?:string,// 日志id ,
    delFlag ?:string,
    id?:string,
    isNewRecord ?:boolean,
    limitString ?:string,
    pageNo ?:number,
    pageSize ?:number,
    readStatus ?:string,//阅读状态：0已读，1未读 ,
    remarks ?:string,
    sendToId ?:string,// 发送给id ,
    sendToName ?:string,//发送给name ,
    updateTime ?:string,
}

export interface POST_imply{
    needAssistProblem :string,// 需要协助问题 ,
    projectImplementStatusList:any[],// 项目(实施)情况 ,
    remarks:string,// 备注 ,
    revisitProjectStatus:string, //回访项目情况 ,
    sendToUserList:string[],// 发给谁 ,
    copyToList:string[],
    todayThought:string,// 今日感想 ,
    todayWork:string,// 今日工作 ,
    transportPoolBuild:string,// 运力池建设
}

export interface IMPLY_item{
    index:number,
    anomalyDescription:string,// 具体异常说明 ,
    hasAbnormalStatus :string,//是否有异常情况，0无，1有 ,
    nodeAddress :string,//节点具体地址 ,
    nodeEmpNames :string,//节点具体人员name ,
    nodeEmpNum :number,//节点人数 ,
    nodeId :string,//节点ID ,
    nodeName:string,// 节点名称 ,
    projectId:string,//项目ID ,
    projectName:string,// 项目名称
    mapNodeList:string[]
}

export interface PROJECT_list{
    custInfoId?: string,
    custInfoName?: string,
    id?: string
    impleLeaderName?: string
    officeName?: string
    onLineDate?: number
    projectCode?: string
    projectLeaderName?: string
    projectName?: string
    projectStateName?: string
    projectTypeName?: string
    remarks?: string
    updateTime?: number
}

export interface DETAIL_list{
    createBy?:string,// 提交人 ,
    createByDept ?:string,//部门 ,
    createTime ?:number,//提交时间 ,
    needAssistProblem?:string,//需要协助问题 ,
    projectImplementStatusPage?:PagerResponse,//: 项目(实施)情况 ,
    remarks ?:string,//备注 ,
    revisitProjectStatus ?:string,// 回访项目情况 ,
    sendToUserList ?:string[],//: 发给谁 ,
    todayThought ?:string,// 今日感想 ,
    todayWork ?:string,// 今日工作 ,
    transportPoolBuild?:string,//运力池建设
}

interface PagerResponse{
    count ?:number,
    empty?:boolean,
    list:Array<ProjectImplyStatusForDetail>
}

interface ProjectImplyStatusForDetail{
    anomalyDescription?:string,// 具体异常说明 ,
    hasAbnormalStatus ?:string,//  是否有异常情况 ,
    nodeAddress ?:string,// 节点具体地址 ,
    nodeEmpNames ?:string,//  节点具体人员name ,
    nodeEmpNum ?:number,// 节点人数 ,
    nodeName ?:string,//  节点名称 ,
    projectName ?:string,//  项目名称
}