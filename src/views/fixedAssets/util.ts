import {
    Message
} from "element-ui";
function toast(str) {
    Message({
        message: str,
        type: "warning"
    });
}
export default {
    assetsFrom(_this){
        var flag = true;
        if (_this.postData.name == "") {
            toast('请填写资产名称！');
            return (flag = false);
        }
        if (_this.postData.code == "") {
            toast('请填写资产编号！');
            return (flag = false);
        }
        if (!/^[a-zA-Z0-9]{1,18}$/.test(_this.postData.code)) {
            toast('资产编号只能是1-18位的大/小写字母和数字！');
            return (flag = false);
        }
        if (_this.time.entryTime == "" || _this.postData.entryTime == undefined) {
            toast('请选择入库时间！');
            return (flag = false);
        }
        if (_this.postData.assetTypeIdList == "") {
            toast('请选择资产类别！');
            return (flag = false);
        }
        if (_this.postData.assetPlaceId == "") {
            toast('请选择放置地！');
            return (flag = false);
        }
        if (_this.postData.serialNo == "") {
            toast('请填写序列号！');
            return (flag = false);
        }
        if (_this.postData.source == "") {
            toast('请选择来源！');
            return (flag = false);
        }
        if (_this.postData.money == "") {
            toast('请填写金额！');
            return (flag = false);
        }
        if(_this.postData.money<=0|| !/^[0-9]+([.]{1}[0-9]{1,2})?$/.test(_this.postData.money)){
            toast('请正确填写金额！只能是最多保留2位小数的正数');
            return (flag = false);
        }
        if (_this.time.buyTime == "" || _this.time.buyTime == undefined) {
            toast('请选择租用/购入时间！');
            return (flag = false);
        }
        if(_this.postData.source == "3"){
            if (_this.time.dueTime == "" || _this.time.dueTime == undefined) {
                toast('请选择付费截止时间！');
                return (flag = false);
            }
        }
        if(_this.postData.source == "3"){
            if (_this.time.dueTime<_this.time.buyTime) {
                toast('付费截止时间不能小于购买时间！');
                return (flag = false);
            }
        }
        if (_this.time.guaranteeEndTime<_this.time.guaranteeBeginTime) {
            toast('过保时间不能小于保修起始时间！');
            return (flag = false);
        }
        if(_this.postData.source == "3"){
            if (_this.time.dueTime<_this.time.buyTime) {
                toast('付费截止时间不能小于租用/购入时间！');
                return (flag = false);
            }
        }
        return flag;
    },
    useOrMove(_this){
        var flag = true;
        if (_this.postData.usingOffice == "") {
            toast('请选择使用部门！');
            return (flag = false);
        }
        if (_this.postData.usingPerson == "") {
            toast('请填选择使用人！');
            return (flag = false);
        }
        if (_this.postData.assetPlaceId == "") {
            toast('请选择放置地！');
            return (flag = false);
        }
        if (_this.postData.pickOrTransferDate == "" || _this.postData.pickOrTransferDate == undefined) {
            toast('请选择领用/转移日期！');
            return (flag = false);
        }
        if (_this.postData.assetId.length == 0) {
            toast('请选择资产！');
            return (flag = false);
        }
        return flag;
    },
    relibrary(_this){
        var flag = true;
        if (_this.postData.assetPlaceId == "") {
            toast('请选择放置地！');
            return (flag = false);
        }
        if (_this.postData.outTime == "" || _this.postData.outTime == undefined) {
            toast('请选择退库时间！');
            return (flag = false);
        }
        if (_this.postData.assetCode.length == 0) {
            toast('请选择资产！');
            return (flag = false);
        }
        return flag;
    },
    verifyAssets(_this){
        var flag = true;
        if (_this.postData.cleanTime == "" || _this.postData.cleanTime == undefined) {
            toast('请选择清理时间！');
            return (flag = false);
        }
        if (_this.postData.cleanType == "") {
            toast('请选择清理理由！');
            return (flag = false);
        }
        if (_this.postData.cleanReason == "") {
            toast('请输入详细清理原因！');
            return (flag = false);
        }
        if (_this.postData.assetCode.length == 0) {
            toast('请选择资产！');
            return (flag = false);
        }
        return flag;
    },
    
}