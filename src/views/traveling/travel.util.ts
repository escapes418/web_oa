import { Message } from 'element-ui';
function toast(str) {
    Message({
        message: str,
        type: 'warning'
        // duration: 2 * 1000
    });
}
export function travelFormVali(self) {
    var flag = true;
    // console.log(self.filter.travelExpenseTypeList.length<1)
    // return
    if (self.relType == 1&&!self.filter.relationTheme) {
        toast('请关联主题！');
        flag = false;
    } 
    else if (self.relType == 2&&!self.filter.projectId) {
        toast('请选择项目名称！');
        flag = false;
    } 
    else if (self.filter.travelExpenseTypeList.length <= 0){
        toast('请选择报销分类！');
        flag = false;
    } 
    // else if (self.filter.demandBudgetList.length <= 0){
    //     toast('请填写出差明细！');
    //     flag = false;
    // } 
    else if (!itemVali()) {
        flag = false;
    }
    function itemVali() {
        let key = true;
        self.filter.demandBudgetList.forEach((item) => {
            if (!item.startDate) {
                toast('请选择正确的发生日期！');
                key = false;
            } else if (
                item.startPoint.length == 0 ||
                item.startPoint.indexOf('') != -1
            ) {
                toast('请选择起点！');
                key = false;
                
            } else if (!item.endDate) {
                toast('请选择正确的结束日期！');
                key = false;
                
            } else if (
                item.endPoint.length == 0 ||
                item.endPoint.indexOf('') != -1
            ) {
                toast('请选择终点！');
                key = false;
            } else if (
                item.selectedSubject.length == 0 ||
                item.selectedSubject[0] == ''
            ) {
                toast('请选择科目');
                key = false;
                
            } else if (typeof item.dayNum != 'number' || item.dayNum<0) {
                toast('请正确填写出差天数！');
                key = false;
               
            } else if (typeof item.personNum != 'number' || item.personNum<0) {
                toast('请正确填写出差人数！');
                key = false;
                
            } else if (
                !/^([0-9]{1,7})(\.[0-9]{1,2})?$/.test(item.expenseAmt)
            ) {
                toast('请正确填写出差金额！');
                key = false;
                
            } else if (item.startDate > item.endDate) {
                toast('结束日期不能早于发生日期！');
                key = false;
            }
        });
        return key;
    }

    return flag;
}

export function travelDetailVali(self) {
    var flag = true;
    if (self.budgetDetailList.length < 1) {
        toast('请填写申请明细！');
        flag = false;
    }
    self.budgetDetailList.forEach((item) => {
        if (item.startDate == '') {
            toast('请选择发生日期！');
            flag = false;
        } else if (item.startPointName == '') {
            toast('请选择起点！');
            flag = false;
        } else if (item.endDate == '') {
            toast('请选择结束日期！');
            flag = false;
        } else if (item.endPointName == '') {
            toast('请选择终点！');
            flag = false;
        } else if (item.firstSubName == '') {
            toast('请选择科目');
            flag = false;
        } else if (item.personNum == '') {
            toast('请正确填写报销人数！');
            flag = false;
        } else if (item.dayNum == '') {
            toast('请正确填写报销天数！');
            flag = false;
        } else if (item.expenseAmt == '') {
            toast('请正确填写预算金额！');
            flag = false;
        } else if (new Date(item.startDate) > new Date(item.endDate)) {
            toast('结束日期不能早于发生日期！');
            flag = false;
        } else {
            flag = true;
        }
    });
    return flag;
}
