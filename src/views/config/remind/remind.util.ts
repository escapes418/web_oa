import { Message } from 'element-ui';
function toast(str) {
    Message({
        message: str,
        type: 'warning'
        // duration: 2 * 1000
    });
}
export function remindFormVali(self) {
    var flag = true;
    if (self.postData.remindType==="") {
        toast('请选择模版类型！');
        flag = false;
    }else if (self.postData.remindWays.length<1) {
        toast('请选择提醒方式！');
        flag = false;
    } else if (self.postData.remindCategory == 0&&self.postData.sendFrequency == 0 && !self.postData.pollHourMin) {
        toast('请选择每天发送时间！');
        flag = false;
    } else if (self.postData.remindCategory == 0&&self.postData.sendFrequency == 1 && !self.postData.pollWeek) {
        toast('请选择每周频率！');
        flag = false;
    } else if (self.postData.remindCategory == 0&&self.postData.sendFrequency == 1 && self.postData.pollWeek &&!self.postData.pollWeekday) {
        toast('请选择周时间！');
        flag = false;
    } else if (self.postData.remindCategory == 0&&self.postData.sendFrequency == 1 && self.postData.pollWeek &&self.postData.pollWeekday&&!self.postData.pollHourMin) {
        toast('请填写具体天的时间！');
        flag = false;
    } else if (self.postData.remindCategory == 0&&self.postData.sendFrequency == 2&& !self.postData.pollMonth) {
        toast('请选择每月频率！');
        flag = false;
    }
    else if (self.postData.remindCategory == 0&&self.postData.sendFrequency == 2&& self.postData.pollMonth&&!self.postData.pollMonthday) {
        toast('请选择月时间！');
        flag = false;
    }
    else if (self.postData.remindCategory == 0&&self.postData.sendFrequency == 2&& self.postData.pollMonth&&self.postData.pollMonthday&&!self.postData.pollHourMin) {
        toast('请选择具体天的时间！');
        flag = false;
    }
    else if (self.postData.remindCategory == 0&&self.postData.sendFrequency == 3&&!self.postData.startTime) {
        toast('请选择频率为的一次具体的时间！');
        flag = false;
    }
    // else if (self.postData.emailBlack.length < 1) {
    //     toast('请选择邮件黑名单！');
    //     flag = false;
    // }
    // else if (self.postData.smsBlack.length < 1) {
    //     toast('请选择短信黑名单！');
    //     flag = false;
    // }
    return flag;
}


