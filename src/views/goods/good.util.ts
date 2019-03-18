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
    // if (!self.postData.goodCode) {
    //     toast('请填写物品编号！');
    //     flag = false;
    //     return;
    // }
    // else
    if(!self.postData.goodName){
        toast('请选择名称！');
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
    else if(!self.postData.goodSpec){
        toast('请填写规格型号！');
        flag = false;
        return;
    }
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
        else if(!self.postData.inCount){
            toast('请填写入库数量！');
            flag = false;
            return;
        }
        else if(!self.postData.buyTime){
            toast('请填写购入时间！');
            flag = false;
            return;
        }
        else if(!self.postData.inPrice){
            toast('请填写单价！');
            flag = false;
            return;
        }
    }
    
    return flag;
}


export function goodStockVali(self) {
    var flag = true;
    if (!self.postData.inTime) {
        toast('请选择购物日期！');
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
            if(item.inCount<0){
                toast('请填写出库数量！');
                key = false;
                return;
            }
            if(item.inPrice<0){
                toast('请填写单价！');
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
        toast('请领用日期！');
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
            if(item.outCount<0){
                toast('请填写出库数量！');
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
            if(item.outCount<0){
                toast('请填写出库数量！');
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
