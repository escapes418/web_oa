import { Message } from 'element-ui';
function toast(str) {
    Message({
        message: str,
        type: 'warning'
        // duration: 2 * 1000
    });
}
export function remindFormVali(self) {
    var flag = true;
    if (self.postData.remindType==="") {
        toast('请选择模版类型！');
        flag = false;
    }else if (self.postData.remindWays.length<1) {
        toast('请选择提醒方式！');
        flag = false;
    } else if (self.postData.remindCategory == 0&&self.postData.sendFrequency == 0 && !self.postData.pollHourMin) {
        toast('请选择每天发送时间！');
        flag = false;
    } else if (self.postData.remindCategory == 0&&self.postData.sendFrequency == 1 && !self.postData.pollWeek) {
        toast('请选择每周频率！');
        flag = false;
    } else if (self.postData.remindCategory == 0&&self.postData.sendFrequency == 1 && self.postData.pollWeek &&!self.postData.pollWeekday) {
        toast('请选择周时间！');
        flag = false;
    } else if (self.postData.remindCategory == 0&&self.postData.sendFrequency == 1 && self.postData.pollWeek &&self.postData.pollWeekday&&!self.postData.pollHourMin) {
        toast('请填写具体天的时间！');
        flag = false;
    } else if (self.postData.remindCategory == 0&&self.postData.sendFrequency == 2&& !self.postData.pollMonth) {
        toast('请选择每月频率！');
        flag = false;
    }
    else if (self.postData.remindCategory == 0&&self.postData.sendFrequency == 2&& self.postData.pollMonth&&!self.postData.pollMonthday) {
        toast('请选择月时间！');
        flag = false;
    }
    else if (self.postData.remindCategory == 0&&self.postData.sendFrequency == 2&& self.postData.pollMonth&&self.postData.pollMonthday&&!self.postData.pollHourMin) {
        toast('请选择具体天的时间！');
        flag = false;
    }
    else if (self.postData.remindCategory == 0&&self.postData.sendFrequency == 3&&!self.postData.startTime) {
        toast('请选择频率为的一次具体的时间！');
        flag = false;
    }
    else if (self.postData.emailBlack.length < 1) {
        toast('请选择邮件黑名单！');
        flag = false;
    }
    else if (self.postData.smsBlack.length < 1) {
        toast('请选择短信黑名单！');
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
