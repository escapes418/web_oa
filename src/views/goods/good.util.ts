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
export function goodFormVali(self) {
    var flag = true;
    if (self.postData.goodCode&&!/^[a-zA-Z0-9]{1,18}$/.test(self.postData.goodCode)) {
        toast('物品编号只能是1-18位的大/小写字母和数字！');
        flag = false;
        return;
    }
    else if(!self.postData.goodName){
        toast('请填写物品名称！');
        flag = false;
        return;
    }
    else if(self.postData.goodType.length<1){
        toast('请选择物品类别！');
        flag = false;
        return;
    }
    // else if(self.postData.labelList.length>3){
    //     toast('选择标签不能超过3个！');
    //     flag = false;
    // }
    else if(!self.postData.goodUnit){
        toast('请填写物品单位！');
        flag = false;
        return;
    }
    // else if(!self.postData.goodSpec){
    //     toast('请填写规格型号！');
    //     flag = false;
    //     return;
    // }
    else if(self.showDetail){
        if(!self.postData.inTime){
            toast('请选择入库时间！');
            flag = false;
            return;
        }
        else if(!self.postData.inTime){
            toast('请选择入库时间！');
            flag = false;
            return;
        }
        else if(!self.postData.putinPlace){
            toast('请选择放置地！');
            flag = false;
            return;
        }
        else if(self.postData.inCount<0 || !/^[0-9]+([.]{1}[0-9]{1})?$/.test(self.postData.inCount) || self.postData.inCount>9999.9){
            toast('请正确填写入库数量！每次入库仅支持入库0.1-9999.9件物品！');
            flag = false;
            return;
        }
        else if(!self.postData.buyTime){
            toast('请选择购入时间！');
            flag = false;
            return;
        }
        else if(self.postData.inPrice<0 || !/^[0-9]+([.]{1}[0-9]{1,2})?$/.test(self.postData.inPrice) || self.postData.inPrice>99999999.99){
            toast('请正确填写单价！每次入库单价仅支持0.01-99999999.99！');
            flag = false;
            return;
        }
    }
    
    return flag;
}


export function goodStockVali(self) {
    var flag = true;
    if (!self.postData.inTime) {
        toast('请选择入库日期！');
        flag = false;
        return;
    }
    else if(!self.postData.putinPlace){
        toast('请选择放置地！');
        flag = false;
        return;
    }
    else if(self.itemList.length<1){
        toast('请添加物品入库！');
        flag = false;
        return;
    }
    else if(!itemVali()){
        flag = false;
        return
    }
    function itemVali(){
        let key = true
        self.itemList.forEach(item => {
            if(!item.buyTime){
                toast('请选择购入日期！');
                key = false;
                return;
            }
            if(item.inCount<0 || !/^[0-9]+([.]{1}[0-9]{1})?$/.test(item.inCount) || item.inCount>9999.9){
                toast('请正确填写入库数量！每次入库仅支持入库0.1-9999.9件物品!');
                key = false;
                return;
            }
            if(item.inPrice<0 || !/^[0-9]+([.]{1}[0-9]{1,2})?$/.test(item.inPrice) || item.inPrice>99999999.9){
                toast('请正确填写单价！每次入库单价仅支持0.01-99999999.99!');
                key = false;
                return;
            }
        });
        return key
    }
    return flag;
}


export function goodReceiveVali(self) {
    var flag = true;
    if (!self.postData.outUserId) {
        toast('请选择领用人！');
        flag = false;
        return;
    }
    else if(!self.postData.officeId){
        toast('请选择领用部门！');
        flag = false;
        return;
    }
    else if(!self.outTime){
        toast('请选择领用日期！');
        flag = false;
        return;
    }
    else if(self.itemList.length<1){
        toast('请添加物品出库！');
        flag = false;
        return;
    }
    else if(!itemVali()){
        flag = false;
        return
    }
    function itemVali(){
        let key = true
        self.itemList.forEach(item => {
            if(!item.outPlace){
                toast('请选择放置地！');
                key = false;
                return;
            }
            if(item.outCount<0 || !/^[0-9]+([.]{1}[0-9]{1})?$/.test(item.outCount) || item.outCount>9999.9){
                toast('请正确填写出库数量！每次出库仅支持入库0.1-9999.9件物品');
                key = false;
                return;
            }
            if(item.outCount>item.placeCount){
                toast('填写出库数量不能大于库存数量！');
                key = false;
                return;
            }
        });
        return key
    }
    return flag;
}

export function goodVerifyVali(self) {
    var flag = true;
    if (!self.postData.offWhy) {
        toast('请选择清理理由！');
        flag = false;
        return;
    }
    else if(!self.postData.offTime){
        toast('请选择清理时间！');
        flag = false;
        return;
    }
    else if(!self.postData.offCause){
        toast('请填写清理原因！');
        flag = false;
        return;
    }
    else if(self.itemList.length<1){
        toast('请添加物品核销！');
        flag = false;
        return;
    }
    else if(!itemVali()){
        flag = false;
        return
    }
    function itemVali(){
        let key = true
        self.itemList.forEach(item => {
            if(!item.outPlace){
                toast('请选择放置地！');
                key = false;
                return;
            }
            if(item.outCount<0 || !/^[0-9]+([.]{1}[0-9]{1})?$/.test(item.outCount) || item.outCount>9999.9){
                toast('请正确填写核销数量！每次核销仅支持入库0.1-9999.9件物品');
                key = false;
                return;
            }
            if(item.outCount>item.placeCount){
                toast('填写核销数量不能大于库存数量！');
                key = false;
                return;
            }
        });
        return key
    }
    return flag;
}

