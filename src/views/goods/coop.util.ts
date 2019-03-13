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
export function coopFormVali(self) {
    var flag = true;
    if (!self.postData.title) {
        toast('请填写标题！');
        flag = false;
    }
    else if(!self.postData.type){
        toast('请选择类型！');
        flag = false;
    }
    else if(self.postData.labelList.length<1){
        toast('请选择标签！');
        flag = false;
    }
    else if(self.postData.labelList.length>3){
        toast('选择标签不能超过3个！');
        flag = false;
    }
    else if(!self.postData.description){
        toast('请填写描述！');
        flag = false;
    }
    else if(!self.postData.principal){
        toast('请选择一个子节点作为负责人！');
        flag = false;
    }
    else if(self.postData.participantList.length<1){
        toast('请选择子节点作为参与人！');
        flag = false;
    }
    return flag;
}


export function coopPlanVali(self) {
    var flag = true;
    if (!self.postData.progressName) {
        toast('请选择进度状态名称！');
        flag = false;
    }
    else if(self.postData.progressName=='需求审核中'&&!self.postData.urgency){
        toast('请选择需求紧急度！');
        flag = false;
    }
    else if(self.postData.progressName=='需求调研中'&&!self.postData.priority){
        toast('请选择优先级！');
        flag = false;
    }
    else if(self.postData.progressName=='产品设计中'&&!self.postData.productEnd){
        toast('请选择产品端！');
        flag = false;
    }
    else if(self.postData.progressName=='产品设计中'&&!self.postData.planDesignTime){
        toast('请选择预计设计时间！');
        flag = false;
    }
    else if(self.postData.progressName=='开发中'&&!self.postData.planDevTime){
        toast('请选择预计开发时间！');
        flag = false;
    }
    else if(self.postData.progressName=='开发中'&&!self.postData.planTestTime){
        toast('请选择预计提测时间！');
        flag = false;
    }
    else if(self.postData.progressName=='开发中'&&!self.postData.planReleaseTime){
        toast('请选择预计上线时间！');
        flag = false;
    }
    else if(self.postData.progressName=='上线'&&!self.postData.actualReleaseTime){
        toast('请选择实际上线时间！');
        flag = false;
    }
    else if(self.postData.progressName=='上线'&&!self.postData.trainTime){
        toast('请选择培训时间！');
        flag = false;
    }
    else if(!self.postData.handleExplain){
        toast('请填写处理说明！');
        flag = false;
    }
    return flag;
}
