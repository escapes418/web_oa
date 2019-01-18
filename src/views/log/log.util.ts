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
    if (self.postData.custIntentionCount<0) {
        toast('请填写当日意向客户数！');
        flag = false;
    }
    else if (self.postData.custSignCount<0) {
        toast('请正确填写当日签约客户数！');
        flag = false;
    }
    else if (self.postData.afterVisitCount<0) {
        toast('请正确填写明日拜访客户数！');
        flag = false;
    }
    else if(!self.postData.afterDailyPlan){
        toast('请填写明日工作计划！');
        flag = false;
    }
    // else if(self.postData.dailyCustMaintenanceList.length<=0){
    //     toast('请添加客户情况！');
    //     flag = false;
    // }
    else if(!itemVali()){
        flag = false;
    }
    else if(self.postData.sendToList.length<=0){
        toast('请选择发送对象！');
        flag = false;
    }

    function itemVali(){
        let key = true
        self.postData.dailyCustMaintenanceList.length>0&&self.postData.dailyCustMaintenanceList.some(item=>{
            if(!item.custId){
                toast('请选择客户名称');
                key = false;
                return true;
            }
        })
        return key
    }
    function repeatVali(){
        let key = true
        for(let i =0;i<self.postData.dailyCustMaintenanceList.length;i++){
            for(let j=0;j<self.postData.dailyCustMaintenanceList.length;j++){
                if(self.postData.dailyCustMaintenanceList[i].custId==self.postData.dailyCustMaintenanceList[j].custId&&i!=j){
                    toast('不得重复添加客户！');
                    key = false;
                    return;
                }
            }
        }
        return key
    }

    
    return flag;
}

export function imFormVali(self){
    var flag = true;
    if(!self.postData.todayWork){
        toast('请填写今日工作！');
        flag = false;
        return;
    }else if(!self.postData.transportPoolBuild){
        toast('请填写运力池建设！');
        flag = false;
        return;
    }else if(!self.postData.revisitProjectStatus){
        toast('请填写回访项目情况！');
        flag = false;
        return;
    }else if(!self.postData.needAssistProblem){
        toast('请填写需要协助问题！');
        flag = false;
    }else if(!self.postData.todayThought){
        toast('请填写今日感想！');
        flag = false;
        return;
    }
    // else if(self.postData.projectImplementStatusList.length<1){
    //     toast('请选择项目情况！');
    //     flag = false;
    //     return;
    // }
    else if(!itemVali()){
        flag = false;
        return;
    }else if(self.postData.sendToUserList<1){
        toast('请选择发送对象！');
        flag = false;
        return;
    }
    function itemVali(){
        let key = true
        self.postData.projectImplementStatusList.length>0&&self.postData.projectImplementStatusList.forEach(item =>{
            if(!item.projectId){
                toast('请选择关联项目！');
                key = false;
                return;
            }
            else if(!item.nodeId){
                toast('请选择关联节点！');
                key = false;
                return;
            }
            else if(!item.nodeAddress){
                toast('节点具体地址不能为空，请补充完整！');
                key = false;
                return;
            }
            else if(item.nodeEmpNum<1){
                toast('请填写节点人数！');
                key = false;
                return;
            }
            else if(!/^[1-9]\d*$/.test(item.nodeEmpNum)){
                toast('节点人数为正整数！');
                key = false;
                return;
            }
            else if(!item.nodeEmpNames){
                toast('请填写节点具体人员！');
                key = false;
                return;
            }
            else if(!item.hasAbnormalStatus){
                toast('请选择异常情况！');
                key = false;
                return;
            }
            else if(item.hasAbnormalStatus=='1'&&!item.anomalyDescription){
                toast('请填写具体异常说明！');
                key = false;
                return;
            }
        })
        return key
    }
    return flag;
}