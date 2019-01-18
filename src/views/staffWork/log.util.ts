import {
    Message
} from "element-ui";
function toast(str) {
    Message({
        message: str,
        type: "warning"
    });
}
export function logFormVali(self) {
    var flag = true;
    if (!self.filter.dailyDate) {
        toast('请选择日期！');
        flag = false;
    }
    // else if (!self.filter.remarks) {
    //     toast('请正确填写备注！');
    //     flag = false;
    // }
    
    else if (typeof(self.filter.custVisitCount) !='number' || self.filter.custVisitCount<0) {
        toast('请正确填写当日拜访客户数！');
        flag = false;
    }
    else if (typeof(self.filter.custIntentionCount) !='number' || self.filter.custIntentionCount<0) {
        toast('请正确填写当日意向客户数！');
        flag = false;
    }
    else if (typeof(self.filter.custSignCount) !='number' || self.filter.custSignCount<0) {
        toast('请正确填写当日签约客户数！');
        flag = false;
    }
    else if (typeof(self.filter.afterVisitCount) !='number' || self.filter.afterVisitCount<0) {
        toast('请正确填写明日拜访客户数！');
        flag = false;
    }
    else if(!self.filter.dailyContent){
        toast('请填写今日工作内容！');
        flag = false;
    }
    else if(!self.filter.afterDailyPlan){
        toast('请填写明日工作计划！');
        flag = false;
    }
    return flag;
}

// export function reimDetailVali(self){
//     console.log(self.detail.applyTypeName)
//     var flag = true;
//     if(!self.detail.applyTypeName){
//         toast('请选择报销类型！');
//         flag = false;
//     }else if(!self.detail.taxCity){
//         toast('请选择发票公司！');
//         flag = false;
//     }else if(self.flowDetailList.length<1){
//         toast('请填写报销明细！');
//         flag = false;
//     }else if((self.detail.applyType ==2 || self.detail.applyType == 3)&&self.detail.procName == undefined){
//         toast('请选择关联主题！');
//         flag = false;
//     }else if((self.detail.applyType ==2) && self.detail.employees.length == 0){
//         toast('请选择陪客人员！');
//         flag = false;
//     }
//     self.flowDetailList.forEach(item =>{
//         if(item.startDate == undefined){
//             toast('请选择发生日期！');
//             flag = false;
//         }
//         else if(item.startPointName == undefined){
//             toast('请选择起点！');
//             flag = false;
//         }
//         else if(item.endDate == undefined){
//             toast('请选择结束日期！');
//             flag = false;
//         }
//         else if(item.endPointName == undefined){
//             toast('请选择终点！');
//             flag = false;
//         }
//         else if(item.firstSubName == undefined){
//             toast('请选择科目');
//             flag = false;
//         }
//         else if(item.personNum == undefined){
//             toast('请正确填写报销人数！');
//             flag = false;
//         }
//         else if(item.dayNum == undefined){
//             toast('请正确填写报销天数！');
//             flag = false;
//         }
//         else if(item.billNum == undefined){
//             toast('请正确填写票据张数！');
//             flag = false;
//         }
//         else if(item.expenseAmt == undefined){
//             toast('请正确填写报销金额！');
//             flag = false;
//         }
//         else if (new Date(item.startDate) > new Date(item.endDate)) {
//             toast('结束日期不能早于发生日期！');
//             flag = false;
//         }
//         else if(item.subConfList.length>0){
//             item.subConfList.forEach((itm, idx) => {
//                 if (itm.url == '') {
//                     toast("请上传" + itm.confDesc);
//                     flag = false;
//                 }
//             })
//         }else{
//             flag = true;
//         }
//     })
//     return flag;
// }