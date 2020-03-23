import {
    Message
} from "element-ui";
function toast(str) {
    Message({
        message: str,
        type: "warning"
    });
}
export function maintainVali(self){
    var flag = true;
    if(!self.postData.custType){
        toast('请选择客户类型！');
        flag = false;
        return;
    }else if(!self.postData.linkmanId){
        toast('请选择联系人！');
        flag = false;
        return;
    }else if(!self.postData.visitType){
        toast('请选择拜访类型！');
        flag = false;
        return;
    }else if(self.postData.issuesClassification.length<1){
        toast('请选择问题归类！');
        flag = false;
        return;
    }else if(!self.postData.belongCustId){
        toast('请选择归属客户！');
        flag = false;
        return;
    }else if(!self.postData.custMaintenanceContent){
        toast('请填写维护内容！');
        flag = false;
        return;
    }

    
    return flag;
}