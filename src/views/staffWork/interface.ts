export interface IF_filter {
    afterDailyPlan: string; // 明日计划 ,
    afterVisitCount: string; // 明日拜访客户数量 ,
    custIntentionCount: string; // 当日意向客户数量 ,
    custSignCount: string; // 当日签约数量 ,
    custVisitCount: string; // 当日拜访数量 ,
    dailyContent: string; // 日志内容 ,
    dailyDate: string; // 日志记录时间：yyyy-MM-dd ,
    id: string; // 主键ID ,
    marketLeaderId: string; // 市场负责人ID ,
    officeId: string; // 部门id ,
    remarks: string; // 备注
    areaId?: string;
}
interface IF_roleListMember {
    name: string;
}
export interface IF_userInfor {
    id?: string;
    loginName?: string;
    mobile?: string;
    mobileLogin?: boolean;
    name?: string;
    officeId?: string;
    officeName?: string;
    postId?: string;
    postName?: string;
    roleList?: Array<IF_roleListMember>;
    sessionid?: string;
    version?: string;
}
