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
export function resHandleVali(self) {
    var flag = true;
    if (!self.filter.projectId || self.filter.projectId == "") {
        if(self.filter.handleType == 2){
            toast('请关联主题！');
            flag = false;
        } else if(self.filter.handleType == 1){
            toast('请选择项目名称！');
            flag = false;
        }
    }else if(self.filter.handleType == 1){
        if( !handleTpye()){
            flag = false; 
        }
    } 
    return flag;
    function handleTpye(){
        var flag = true
         
        if (!self.filter.expectDate) {
            toast('请填选择期望抵达时间！');
            flag = false;
        }
        else if (!self.filter.timeLong) {
            toast('填写预计时长！');
            flag = false;
        }
        else if (self.filter.timeLong<= 0) {
            toast('预计时长填写有误！');
            flag = false;
        }
        else if (!self.filter.amountSum) {
            toast('请填写预算费用合计！');
            flag = false;
        }
        else if (self.filter.amountSum< 0) {
            toast('预算费用合计填写有误！');
            flag = false;
        }
        else if (!self.filter.resourcesType) {
            toast('请选择资源类型！');
            flag = false;
        }
        return flag
    }
    
    
}
