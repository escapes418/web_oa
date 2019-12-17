import { Message } from 'element-ui';
function toast(str) {
    Message({
        message: str,
        type: 'warning'
        // duration: 2 * 1000
    });
}
export function accountFormVali(self) {
    var flag = true;
    if (!self.postData.accountName) {
        toast('请填写账户名！');
        flag = false;
    }else if (!self.postData.accountNumber) {
        toast('请填写帐号！');
        flag = false;
    } else if (self.postData.accountType == 2&&!self.postData.belongBank) {
        toast('请填写银行！');
        flag = false;
    } else if (self.postData.accountType == 1&&!self.postData.identityCard) {
        toast('请填写身份证号码！');
        flag = false;
    } else if (self.postData.accountType == 1&&!self.postData.defaultAccount) {
        toast('请选择是否设为默认收款账户！');
        flag = false;
    } else if (self.postData.accountType == 2&&!self.postData.belongBranchBank) {
        toast('请填写银行支行！');
        flag = false;
    }
    return flag;
}

