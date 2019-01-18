import {
    Message
} from "element-ui";
function toast(str) {
    Message({
        message: str,
        type: "warning",
        // duration: 2 * 1000
    });
}
export function contractFormVali(self) {
    var flag = true;
    if (!self.filter.firstPartyName) {
        toast('请选择甲方名称！');
        flag = false;
    }
    else if (!self.filter.contractNameCode) {
        toast('请选择合同名称！');
        flag = false;
    }
    else if (!self.filter.contractDate) {
        toast('请选择签约日期！');
        flag = false;
    }
    // else if (!self.filter.expressCompany) {
    //     toast('请填写快递公司！');
    //     flag = false;
    // }
    // else if (!self.filter.expressBill) {
    //     toast('请填写快递单号！');
    //     flag = false;
    // }
    else if(self.contractAttachment.length<1){
        toast('请上传预签合同图片！');
        flag = false
    }
    else if(self.dataAttachment.length<1){
        toast('请上传资料图片！');
        flag = false
    }
    // function itemVali(){
    //     self.filter.expenseDetail.forEach(item => {
    //         if (!item.startDate) {
    //             toast('请选择发生日期！');
    //             flag = false;
    //             return 
    //         }else if (!item.startPoint.length>0 || item.startPoint.indexOf("") != -1) {
    //             toast('请选择起点！' );
    //             flag = false;
    //             return 
    //         } else if (!item.endDate) {
    //             toast('请选择结束日期！');
    //             flag = false;
    //             return 
    //         } else if (!item.endPoint.length>0 || item.endPoint.indexOf("") != -1) {
    //             toast('请选择终点！');
    //             flag = false;
    //             return 
    //         } else if (item.selectedSubject.length == 0 || item.selectedSubject[0] == "") {
    //             toast('请选择科目');
    //             flag = false;
    //             return 
    //         } else if (typeof (item.dayNum) != 'number') {
    //             toast('请正确填写报销天数！');
    //             flag = false;
    //             return 
    //         } else if (typeof (item.personNum) != 'number') {
    //             toast('请正确填写报销人数！');
    //             flag = false;
    //             return 
    //         } else if (typeof (item.billNum) != 'number') {
    //             toast('请正确填写票据张数！');
    //             flag = false;
    //             return 
    //         } else if (typeof (item.expenseAmt) != 'number' || !(item.expenseAmt > 0)) {
    //             toast('请正确填写报销金额！');
    //             flag = false;
    //             return 
    //         } else if (item.startDate >item.endDate) {
    //             toast('结束日期不能早于发生日期！');
    //             flag = false;
    //             return 
    //         }else if (item.remarks&&item.remarks.length>500) {
    //             toast('输入字符超出限额，请重新输入！');
    //             flag = false;
    //             return 
    //         } else if (item.subConfList.length>0) {
    //             item.subConfList.forEach((itm, idx) => {
    //                 if (itm.url == '') {
    //                     toast("请上传" + itm.confDesc);
    //                     flag = false;
    //                 }
    //             })
    //         }
    //     })
    //     return flag
    // }
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