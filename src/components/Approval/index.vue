<template>
    <tr>
        <td style="padding: 0 10px 0 10px;">
            <el-checkbox v-model="itemData.checked"></el-checkbox>
        </td>
        <td style="padding: 0 10px 0 10px;">
            <el-date-picker style="width:133px" v-model="itemData.startDate" type="date" placeholder="选择日期">
            </el-date-picker>
        </td>
        <td style="padding: 0 10px 0 10px;">
            <region style="width:133px" v-on:back-region="selectStartCode" :pointList="itemData.startPoint"></region>
        </td>
        <td>
            <el-date-picker style="width:133px" v-model="itemData.endDate" type="date" placeholder="选择日期">
            </el-date-picker>
        </td>
        <td>
            <region style="width:133px" v-on:back-region="selectEndCode" :pointList="itemData.endPoint"></region>
        </td>
        <td>
            <el-cascader :options="subsTree" v-model="itemData.selectedSubject" @change="subjectOnChange" label="value" :clearable="true">
            </el-cascader>
        </td>
        <td>
            <el-input style="width:120px" v-model.number="itemData.personNum" type="number"></el-input>
        </td>
        <td>
            <el-input v-model.number="itemData.dayNum" type="number"></el-input>
        </td>
        <td>
            <el-input style="width:120px" v-model.number="itemData.billNum" :disabled="canInputBillNum"></el-input>
        </td>
        <td>
            <el-input auto-complete="off" style="width:120px" v-model.number="itemData.expenseAmt" type="number"></el-input>
        </td>
        <td>
            <el-input auto-complete="off" :maxlength="500" v-model="itemData.remarks"></el-input>
        </td>
        <td>
            <el-button icon='el-icon-upload' size="mini" @click="dialogVisible=true" type="primary" :disabled="canUpload">上传图片
            </el-button>
        </td>
        <el-dialog append-to-body :visible.sync="dialogVisible" calss="approval-dialog" width="30%" title="上传图片">
            <div class="detailCollectionImgs">
                <div class="item" v-for="(item,index) in itemData.subConfList" :key="index">
                    <el-upload class="avatar-uploader" :show-file-list="false" :action="uploadApi" :data="{id:item.id}" :headers="{ sessionid:token}" :on-success="uploadDone" :before-upload="beforeUpload">
                        <div>
                            <img ref="imgWrap" v-if="item.url" :src="item.urlPrefix+item.url" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </div>
                    </el-upload>
                    <!-- <i v-if="item.url" class="iconfont icon-xuanzhuan" @click="rotateImage(index)"></i> -->
                    <div>
                        <p>{{item.confDesc}}</p>
                    </div>
                </div>
            </div>
            <div class="foot-btn">
                
                <el-button type="primary" @click="dialogVisible =false">确 定</el-button>
            </div>
        </el-dialog>
    </tr>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { upLoadIm } from '@/api/reim'
export default {
    props: {
        itemData: Object,
        isType: String, // reim/reception/traveling
    },
    data() {
        return {
            // selectedSubject: [], //  新的科目选中值[01,0101] 办公用品采购/办公用品
            dialogVisible: false,
            uploadApi: process.env.BASE_API + '/commonInfo/fileUpload',
            current:0,
        }
    },
    computed: {
        ...mapState({
            token: state => state.user.token,
            subsTree: state => state.reim.subsTree,
            subsPar: state => state.reim.subsPar,
        }),
        // 是否禁用上传图片
        canUpload() {
            console.log(this.itemData.subConfList)
            if (!this.itemData.subConfList) this.itemData.subConfList = []
            if (this.itemData.subConfList.length == 0 || this.isType != 'reim') {
                return true;
            } else {
                return false;
            }
        },
        // 是否禁用票据数量
        canInputBillNum() {
            if (this.isType != 'reim') {
                return true;
            } else {
                return false;
            }
        }
    },
    created() {
        // 编辑时，并不会触发科目onchange，需根据以后的科目值手动触发??? --- 这里有bug，周一晚19:26
        // this.updateItemConf();
        console.log()
    },
    methods: {
        // 图片上传完成
        uploadDone(res) {
            /* this.itemData.subConfList.forEach(i => {
                if (i.id == res.data.id) {
                    i.url = res.data.storfiles.url;
                    i.urlPrefix = res.data.storfiles.serverUrl;
                }
            })
            return; */
            var updateData = {
                uid: this.itemData.uid,
                id: res.data.id,
                url: res.data.storfiles.url,
                urlPrefix: res.data.storfiles.serverUrl,
            }
            this.$store.dispatch('updateCollectionImg', updateData);
        },
        // 根据已选择科目，从字典中拉去图片配置，赋值到store中(这里直接用引用，实际是不规范的)
        // 只要选择科目，全部用字典重置，编辑时有逻辑错误...如果编辑也走updateItemConf会把图片也清空掉
        // 场景一：编辑时已有科目，需手动触发(why？form中填充表单时会做数据转换，不用也不能updateItemConf)
        // 场景二：手动操作级联筛选触发
        updateItemConf(id) {
            /*
            逻辑不通
            if (!id) {
                id = this.itemData.selectedSubject[1] || "";
            } */
            this.subsPar.map(i => {
                if (i.value == id) {
                    // 给字典返回值加空url/urlPrefix 和 空数组
                    if (!i.subConfList) i.subConfList = [];
                    i.subConfList.forEach(x => {
                        x.url = "";
                        x.urlPrefix = "";
                    })
                    /*
                    this.itemData.subConfList = i.subConfList;
                    在编辑时，直接更新又出现了视图不刷新的情况
                    以下为兼容处理！！！
                    1.先联动赋值
                    2.更新store
                    */
                    this.itemData.subConfList = i.subConfList;
                    this.$store.dispatch('updateCollectionImg', {
                        uid: this.itemData.uid,
                        id: i.subConfList.id,
                        url: '',
                        urlPrefix: '',
                    });

                }
            })
        },
        subjectOnChange(val) {
            // 只要科目发生变化，立即清除图片配置
            console.log('val', val);
            this.itemData.subConfList = [];
            if (val.length == 1) return;
            this.updateItemConf(val[1]);
        },
        selectStartCode(data) {
            this.itemData.startPoint = data;
        },
        selectEndCode(data) {
            this.itemData.endPoint = data;
        },
        beforeUpload(file) {
            const isImage = (file.type === 'image/jpeg') || (file.type === 'image/png');
            const isLt3M = file.size / 1024 / 1024 < 5;
            if (!isImage) {
                this.$message.error('上传图片只能是 JPG、PNG 格式!');
            }
            if (!isLt3M) {
                this.$message.error(`上传图片大小不能超过5MB!`);
            }
            return isImage && isLt3M;
        },
        rotateImage(index){
            this.current = this.current + 90
            this.rotate(index,this.current)
        },
        rotate(index,current){
            this.$refs.imgWrap[index].style.transform = 'rotate('+ current +'deg)';
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
}
.editor-slide-upload{
    margin-bottom: 10px;
    margin-left: 10px
}
.foot-btn{
    margin-left: 80%
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
.detailCollectionImgs{
    width:100%;
}
.detailCollectionImgs .item{
    display: inline-block;
    text-align: center;
    margin:10px;
}

</style>
