export interface QUERY_list{
    date?:string,//日期 ,
    functionName?:string,// 功能名称 ,
}

export interface ENTITY_list{
    fridayStr?:string,
    mondayStr?:string,
    saturdayStr?:string,
    sundayStr?:string,
    thursdayStr?:string
    tuesdayStr?:string
    wednesdayStr?:string
}

export interface FUNCUSE_list{
    fridayNum?:number,
    functionCode?: string,
    functionName?: string,
    mondayNum?:number,
    saturdayNum?:number,
    sundayNum?:number,
    terminalCode?: string,
    terminalName?: string,
    thursdayNum?:number,
    tuesdayNum?:number,
    wednesdayNum?:number,
}

export interface DETAIL_list{
    date?: string,
    functionName?: string,
    num?:number,
    terminalName?: string,
    userName?: string,
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


export interface REIM_list {
    timeRange:string[],
    officeId:string,
    officeName:string,
    projectId:string,
    expenseStatus:string,
    timeType:string,
    expenseAmtStart:number | string,
    expenseAmtEnd:number | string,
    subNum:string[],
    procCode:string
}


export interface REIMDOC_list {
    applyPerCode:string,
    applyPerName: string,
    applyTime: string,
    applyType:string,
    billNum:string,
    bringRemitStatus:string,
    createDate: string,
    expenseStatus: string,
    expenseStatusValue:string,
    expenseTotal: number,
    id: string,
    isNewRecord: false
    office: object,
    procCode: string,
    procName: string,
    recpParticNum: 0
    recpProcCode: string,
    taxCityCode: string,
    taxCityName: string,
    updateDate: string,
}

export interface OVERDUE_list {
    officeName:string,		// 所属部门名称
    applyPerName:string,	// 申请人名称
    openAccountTime:string,//开户时间
    procCode:string,		// 流程编号
    contractName:string,	// 合同名称
    firstPartyName:string,// 甲方名称
    secondPartyName:string,	// 乙方名称
    thirdMemberName:string,	//丙方名称
    contractFlowStatus:string,	// 合同状态
    overdueDays:string,
}