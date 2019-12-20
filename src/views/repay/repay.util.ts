import { Message } from 'element-ui';
function toast(str) {
    Message({
        message: str,
        type: 'warning'
        // duration: 2 * 1000
    });
}
export function repayFormVali(self) {
    console.log(/^([0-9]{1,7})(\.[0-9]{1,2})?$/.test(self.postData.currentRepayAmount))
    var flag = true;
    if (!self.postData.costCenterId) {
        toast('请选择成本中心！');
        flag = false;
    } else if (!self.postData.loanFlowId) {
        toast('请选择关联借款申请！');
        flag = false;
    }else if (!self.postData.repayMethod) {
        toast('请选择还款方式！');
        flag = false;
    }else if(self.postData.repayMethod=="1"&&self.postData.repayFlowDetailRequestList.length<1){
        toast('请添加还款明细！');
        flag = false;
    }else if (self.postData.repayMethod=="2"&&!/^([0-9]{1,7})(\.[0-9]{1,2})?$/.test(self.postData.currentRepayAmount)){
        toast('请正确输入本次还款金额！');
        flag = false;
    }else if (!itemVali()) {
        flag = false;
    } 
    function itemVali() {
        self.postData.repayFlowDetailRequestList.forEach((item) => {
            if (
                item.subject.length == 0 ||
                item.subject[0] == ''
            ) {
                toast('请选择科目');
                flag = false;
                return;
            }  else if (!/^([0-9]{1,7})?$/.test(item.billNum)&& item.billNum == 0) {
                toast('请正确填写票据张数！');
                flag = false;
                return;
            } else if (
                !/^([0-9]{1,7})(\.[0-9]{1,2})?$/.test(item.expenseAmt)
            ) {
                toast('请正确填写票据金额！');
                flag = false;
                return;
            }  else if (item.remarks && item.remarks.length > 500) {
                toast('输入字符超出限额，请重新输入！');
                flag = false;
                return;
            } else if (item.subConfList.length > 0) {
                item.subConfList.forEach((itm, idx) => {
                    if (itm.url == '') {
                        toast('请上传' + itm.confDesc);
                        flag = false;
                    }
                });
            }
        });
        return flag;
    }
    return flag;
}

