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
export function clueFormVali(self) {
    var flag = true;
    if (!self.filter.custName||self.filter.custName&&self.filter.custName.indexOf(' ') != -1) {
        toast('请正确填写客户名称！');
        flag = false;
    }
    // else if (!self.filter.custAbbreviation || self.filter.custAbbreviation&&self.filter.custAbbreviation.indexOf(' ') != -1) {
    //     toast('请正确填写客户简称！');
    //     flag = false;
    // }
    // else if (!self.filter.custClassify) {
    //     toast('请选择客户分类！');
    //     flag = false;
    // }
    // else if (self.filter.areaId.length == 0) {
    //     toast('请选择所属区域！');
    //     flag = false;
    // }
    else if (self.filter.custCompanySize&&self.filter.custCompanySize<0) {
        toast('请正确填写运输规模！');
        flag = false;
    }
    // else if (self.filter.tranMethod.length == 0) {
    //     toast('请选择运输方式！');
    //     flag = false;
    // }
    // else if (!self.filter.custLinkmanName || self.filter.custLinkmanName&&self.filter.custLinkmanName.indexOf(' ') != -1) {
    //     toast('请正确填写联系人');
    //     flag = false;
    // }
    // else if (!self.filter.linkmanPost || self.filter.linkmanPost&&self.filter.linkmanPost.indexOf(' ') != -1) {
    //     toast('请正确填写联系人职位');
    //     flag = false;
    // }
    else if(self.filter.linkmanPhone && !/^1[3456789][0-9]{9}$/.test(self.filter.linkmanPhone)){
        toast('请正确填写联系人联系方式！');
        flag = false;
    }
    // else if(!self.filter.custActuality){
    //     toast('请填写客户现状！');
    //     flag = false;
    // }
    // else if(!self.filter.custBusinessProfile){
    //     toast('请填写业务概况！');
    //     flag = false;
    // }
    else if(!self.filter.custClueExplain){
        toast('请填写线索说明！');
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