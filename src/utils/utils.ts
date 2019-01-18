import config from './config'
import {
    Message
} from "element-ui";
const util = {
    handleImgError: function (file) {
        const isImage = config.type.indexOf(file.type) != -1
        const isLt5M = file.size / 1024 / 1024 < config.imgLimit;
        if (!isImage) {
            Message({
                message: config.tips,
                type: "error",
                duration: 5 * 1000
            });
        }
        if (!isLt5M) {
            Message({
                message: '上传图片不能超过' + config.imgLimit + 'M',
                type: "error",
                duration: 5 * 1000
            });
        }
        return isImage && isLt5M;
    },
    treeArray: function (orignArr) {
        var resultArr = orignArr.filter(item => {
            if (item.parentId == 0) {
                return true;
            }
        });
        resultArr.map(i => {
            i.chilren = [];
            orignArr.map(y => {
                if (y.parentId == i.id) {
                    i.chilren.push(y);
                }
            });
        });
        return resultArr;
    }
}

export default util
