import { Message } from 'element-ui';
function toast(str) {
    Message({
        message: str,
        type: 'warning'
        // duration: 2 * 1000
    });
}
export function recepFormVali(self) {
    var flag = true;
    if (
        !self.filter.recpTheme ||
        (self.filter.recpTheme && self.filter.recpTheme.indexOf(' ') != -1)
    ) {
        toast('请正确填写接待主题！');
        flag = false;
    } else if (!self.filter.projectId) {
        toast('请选择项目名称！');
        flag = false;
    } else if (typeof self.filter.recpNum != 'number' || self.filter.recpNum<0) {
        toast('请正确填写接待人数！');
        flag = false;
    } else if (self.filter.employees.length == 0) {
        toast('请选择陪客人员！');
        flag = false;
    } else if (!self.filter.recpTime) {
        toast('请选择接待时间！');
        flag = false;
    } else if (self.filter.demandBudgetList.length < 1) {
        toast('请填写接待申请明细！');
        flag = false;
    } else if (!itemVali()) {
        flag = false;
    }
    function itemVali() {
        self.filter.demandBudgetList.forEach((item) => {
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
            } else if (
                typeof item.expenseAmt != 'number' ||
                !(item.expenseAmt > 0)
            ) {
                toast('请正确填写报销金额！');
                flag = false;
                return;
            } else if (item.startDate > item.endDate) {
                toast('结束日期不能早于发生日期！');
                flag = false;
                return;
            }
        });
        return flag;
    }
    return flag;
}

export function recepDetailVali(self) {
    var flag = true;
    if (!self.detail.recpTheme) {
        toast('请填写接待主题！');
        flag = false;
    } else if (!self.detail.projectId) {
        toast('请选择项目名称！');
        flag = false;
    } else if (self.budgetDetailList.length < 1) {
        toast('请填写申请明细！');
        flag = false;
    } else if (self.detail.recpNum == '') {
        toast('请填写接待人数！');
        flag = false;
    } else if (self.detail.employees.length == 0) {
        toast('请选择陪客人员！');
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
