import { Message } from 'element-ui';
function toast(str) {
    Message({
        message: str,
        type: 'warning'
        // duration: 2 * 1000
    });
}
export function loanFormVali(self) {
    var flag = true;
    if (!self.postData.companyId) {
        toast('请选择所属公司！');
        flag = false;
    } else if (!self.postData.receivablesAccountId) {
        toast('请选择收款账号！');
        flag = false;
    } else if (self.postData.loanAmount<0 || !/^[0-9]+([.]{1}[0-9]{1,2})?$/.test(self.postData.loanAmount) || self.postData.loanAmount>99999999.9) {
        toast('请正确填写借款金额！');
        flag = false;
    }else if (!self.postData.planRepayTime) {
        toast('请选择预计还款时间！');
        flag = false;
    } else if (!self.postData.loanReason) {
        toast('请填写借款事由！');
        flag = false;
    } 
    return flag;
}

