import {
    Message
} from "element-ui";
function toast(str) {
    Message({
        message: str,
        type: "warning"
    });
}
export function resourceFormVali(self) {
    var flag = true;
    if (!self.filter.projectId) {
        toast('请选择项目名称！');
        flag = false;
    }
    else if (!self.filter.resourcesType) {
        toast('请选择资源类型！');
        flag = false;
    }
    else if (typeof (self.filter.demandPersonelNum) != 'number') {
        toast('请正确填写需求数量！');
        flag = false;
    }
    else if (!self.filter.expectDate) {
        toast('请选择期待到达时间！');
        flag = false;
    }
    else if (typeof (self.filter.timeLong) !='number') {
        toast('请正确填写预计时长！');
        flag = false;
    }
    else if(typeof (self.filter.amountSum) != 'number'){
        toast('请正确填写费用合计！');
        flag = false;
    }
    else if(self.filter.remarks&&self.filter.remarks.length >301){
        toast('输入备注字符超出限制！');
        flag = false;
    }
    return flag;
}

export function reimDetailVali(self){
    var flag = true;
    if(self.itemList<1){
        toast('添加审批意见！');
        flag = false;
    }
    else if(!itemVali()){
        flag = false
    }
    else if(!targetVali()){
        flag = false
    }
    function targetVali(){
        for(let i =0;i<self.itemList.length;i++){
            for(let j = 0;j<self.itemList.length;j++){
                if(self.itemList[i].targetAssign == self.itemList[j].targetAssign && i!=j){
                    toast('不得重复指派！');
                    flag = false;
                    return;
                }
            }
        }
        return flag
    }
    function itemVali(){
        self.itemList.forEach(item => {
            if (!item.targetAssign) {
                toast('请选择指派对象！');
                flag = false;
                return 
            }
            else if (typeof(item.personelNum) !='number') {
                toast('正确填写满足数量！');
                flag = false;
                return 
            }
        })
        return flag
    }
    return flag;
}