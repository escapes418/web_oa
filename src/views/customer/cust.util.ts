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
export function custMaintainVali(self) {
    var flag = true;
    if (!self.filter.custStage) {
        toast('请选择客户级别！');
        flag = false;
    }
    else if (!self.filter.linkmanId) {
        toast('请选择联系人！');
        flag = false;
    }
    else if (!self.filter.visitType) {
        toast('请选择拜访类型！');
        flag = false;
    }
    else if (!self.filter.custMaintenanceContent) {
        toast('请填写维护内容！');
        flag = false;
    }
    return flag;
}

