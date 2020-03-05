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
export function custMaintainVali(self) {
    var flag = true;
    if (!self.filter.custStage) {
        toast('请选择客户级别！');
        flag = false;
    }
    else if (!self.filter.linkmanId) {
        toast('请选择联系人！');
        flag = false;
    }
    else if (!self.filter.visitType) {
        toast('请选择拜访类型！');
        flag = false;
    }
    else if (!self.filter.custMaintenanceContent) {
        toast('请填写维护内容！');
        flag = false;
    }
    return flag;
}
export function custBaseVali(self) {
    var flag = true;
    if (self.filter.baseCustInfo.custType == '') {
        toast('选择客户类型');
        flag = false;
    }
    else if (self.filter.baseCustInfo.custName == '') {
        toast('请填写客户名称');
        flag = false;
    }
    else if (self.filter.baseCustInfo.custAddressCode.length == 0) {
        toast('请选择地址');
        flag = false;
    }
    else if (self.filter.baseCustInfo.custAddress == '') {
        toast('请填写详细地址');
        flag = false;
    }
    return flag;
}
export function custNoCarVali(self) {
    var flag = true;
    if (self.filter.noCar.custTrades == '') {
        toast('请选择所属行业');
        flag = false;
    }
    return flag;
}
export function custCoalUnionVali(self) {
    var flag = true;
    if (!self.filter.coalUnion.custSort || self.filter.coalUnion.custSort.length == 0) {
        toast('请选择客户分类');
        flag = false;
    }
    else if ((self.filter.coalUnion.custSort.includes("2"))&&(!/^([0-9]{1,5})(\.[0-9]{1,2})?$/.test(self.filter.coalUnion.serviceFee))) {
        toast('服务费比例填写有误');
        flag = false;
    }
    else if (!self.filter.coalUnion.custTrades) {
        toast('请选择所属行业');
        flag = false;
    }
    return flag;
}
export function linkManVali(itemList,self) {
    var flag = true;
    itemList.forEach(item=>{
        if(!item.linkmanName){
            toast('请填写联系人');
            flag = false;
        }
        else if(item.linkmanPhone == ''){
            toast('请填写联系方式');
            flag = false
        }
        else if(!item.linkmanPhone || !/^1[3456789][0-9]{9}$/.test(item.linkmanPhone)){
            toast('联系方式填写有误');
            flag = false
        }
        else if (item.linkmanMail && item.linkmanMail != '') {
            if (!/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(item.linkmanMail)) {
                toast('邮箱格式填写有误');
                flag = false
            }
          }
        else if(!item.linkmanPost){
            toast('请填写职位');
            flag = false
        }
        
    })
    return flag;
}
