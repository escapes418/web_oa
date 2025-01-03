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
    if (!self.postData.contractNameId) {
        toast('请选择合同名称！');
        flag = false;
    }
    else if(self.associationMain&&!self.postData.associationMainId){
        toast('请关联关联主合同！');
        flag = false;
    }
    else if(self.postData.businessType==1&&!self.associationMain&&self.postData.projectIds.length<1){
        toast('请关联项目！');
        flag = false;
    }
    else if(self.postData.businessType==2&&self.postData.custIds.length<1){
        toast('请选择关联客户！');
        flag = false;
    }
    else if(!itemVali()){
        flag = false;
    }
    else if (!self.postData.contractStartTime) {
        toast('请选择合同开始日期！');
        flag = false;
    }
    else if (!self.postData.contractEndTime) {
        toast('请选择合同结束日期！');
        flag = false;
    }else if(self.postData.contractStartTime>self.postData.contractEndTime){
        toast('合同开始日期不能大于合同结束日期！');
        flag = false;
    }
    
    else if(!self.postData.signLeaderId){
        toast('请选择合同签约人！');
        flag = false;
    }
    else if(!self.postData.contractLeaderId){
        toast('请选择合同负责人！');
        flag = false;
    }
    // // else if (!self.postData.expressCompany) {
    // //     toast('请填写快递公司！');
    // //     flag = false;
    // // }
    // // else if (!self.postData.expressBill) {
    // //     toast('请填写快递单号！');
    // //     flag = false;
    // // }
    else if(self.contractMustCount&&(self.contractAttachment.length<self.contractMustCount)){
        toast('请至少上传'+self.contractMustCount+'张预签合同图片！');
        flag = false
    }
    else if(self.dataMustCount&&(self.dataAttachment.length<self.dataMustCount)){
        toast('请至少上传'+self.dataMustCount+'张附件资料图片！');
        flag = false
    }
    else if(self.scanMustCount&&(self.scanAttachment.length<self.scanMustCount)){
        toast('请至少上传'+self.scanMustCount+'张合同扫描件！');
        flag = false
    }
    
    function itemVali(){
        let key = true
        self.initData.some(item=>{
            if(!vali(item)){
                toast('请补充完'+item.partyName+'再提交！');

                key = false;
                return true;
            }
        })
        return key
    }
    function vali(item){
        let key = true
        item&&item.contractPartyType.some(i=>{
            if(i.required == 1){
                // /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]i.test("内蒙古自治区呼和浩特市呼准公路５７．６公里路西")
                if(i.value==''|| /[`~!@$%^*\+=?:"{}|\/;\\[\]·~！@￥%……*\+={}|《》？：【】；]/i.test(i.value)){
                    key = false;
                    return true;
                }
            }
        })
        return key
    }
    return flag;
}
