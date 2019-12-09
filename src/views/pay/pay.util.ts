import { Message } from 'element-ui';
function toast(str) {
    Message({
        message: str,
        type: 'warning'
        // duration: 2 * 1000
    });
}
export function paymentFormVali(self) {
    var flag = true;
    if (!self.postData.costCenterId) {
        toast('请选择成本中心！');
        flag = false;
    }else if(!self.postData.taxCity){
        toast('请选择发票公司！');
        flag = false;
    }else if(!self.postData.bankAccountId){
        toast('请选择收款账户！');
        flag = false;
    }else if(!self.postData.payReason){
        toast('请付款原因！');
        flag = false;
    }else if(self.postData.payDetail.length<1){
        toast('请添加还款明细！');
        flag = false;
    }else if (!itemVali()) {
        flag = false;
    } 
    function itemVali() {
        self.postData.payDetail.forEach((item) => {
            if (
                item.subject.length == 0 ||
                item.subject[0] == ''
            ) {
                toast('请选择科目');
                flag = false;
                return;
            }  else if (!/^([0-9]{1,7})$/.test(item.billNum) && self.postData.billNum == 0) {
                toast('请正确填写票据张数！');
                flag = false;
                return;
            } else if (
                !/^([0-9]{1,7})(\.[0-9]{1,2})?$/.test(item.expenseAmt)
            ) {
                toast('请正确填写报销金额！');
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

