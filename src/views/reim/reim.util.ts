import { Message } from 'element-ui';
function toast(str) {
    Message({
        message: str,
        type: 'warning'
        // duration: 2 * 1000
    });
}
export function reimFormVali(self) {
    var flag = true;
    if(!self.filter.receivablesAccountId){
        toast('请选择收款账户！');
        flag = false;
    }
    else if (!self.filter.costCenterId) {
        toast('请选择成本中心！');
        flag = false;
    }else if (!self.filter.applyType) {
        toast('请选择报销类型！');
        flag = false;
    } else if (!self.filter.taxCity) {
        toast('请选择发票公司！');
        flag = false;
    } else if (
        (self.filter.applyType == 2 || self.filter.applyType == 3) &&
        !self.filter.relationTheme
    ) {
        toast('请选择关联主题！');
        flag = false;
    } else if (
        self.filter.applyType == 2 &&
        self.filter.employees.length == 0
    ) {
        toast('请选择陪客人员！');
        flag = false;
    } else if (self.filter.expenseDetail.length < 1) {
        toast('请填写报销明细！');
        flag = false;
    } else if (!itemVali()) {
        flag = false;
    }
    function itemVali() {
        self.filter.expenseDetail.forEach((item) => {
            if (!item.startDate) {
                toast('请选择正确的发生日期！');
                flag = false;
                return;
            } else if (
                item.startPoint.length == 0 ||
                item.startPoint.indexOf('') != -1
            ) {
                toast('请选择起点！');
                flag = false;
                return;
            } else if (!item.endDate) {
                toast('请选择正确的结束日期！');
                flag = false;
                return;
            } else if (
                item.endPoint.length == 0 ||
                item.endPoint.indexOf('') != -1
            ) {
                toast('请选择终点！');
                flag = false;
                return;
            } else if (
                item.selectedSubject.length == 0 ||
                item.selectedSubject[0] == ''
            ) {
                toast('请选择科目');
                flag = false;
                return;
            } else if (typeof item.dayNum != 'number' || item.dayNum<0) {
                toast('请正确填写报销天数！');
                flag = false;
                return;
            } else if (typeof item.personNum != 'number' || item.personNum<0) {
                toast('请正确填写报销人数！');
                flag = false;
                return;
            } else if (typeof item.billNum != 'number' || item.billNum<0) {
                toast('请正确填写票据张数！');
                flag = false;
                return;
            } else if (
                !/^([0-9]{1,7})(\.[0-9]{1,2})?$/.test(item.expenseAmt)
            ) {
                toast('请正确填写报销金额！');
                flag = false;
                return;
            } else if (item.startDate > item.endDate) {
                toast('结束日期不能早于发生日期！');
                flag = false;
                return;
            } else if (item.remarks && item.remarks.length > 500) {
                toast('输入字符超出限额，请重新输入！');
                flag = false;
                return;
            } else if (item.subConfList.length > 0) {
                item.subConfList.forEach((itm, idx) => {
                    if (itm.url == '') {
                        toast('请上传' + itm.confDesc);
                        flag = false;
                    }
                });
            }
        });
        return flag;
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
