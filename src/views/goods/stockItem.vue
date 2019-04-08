<template>
    <tr>
        <td style="padding: 0 10px 0 10px;">
            <el-checkbox v-model="itemData.checked"></el-checkbox>
        </td>
        <td class="tableTitle" style="padding: 0 10px 0 10px;">
            <span class="tableTitle">{{itemData.goodName}}</span>
        </td>
        <td class="tableTitle" style="padding: 0 10px 0 10px;">
            <span>{{itemData.goodCode}}</span>
        </td>
        <td class="tableTitle">
            <span>{{itemData.goodTypeName}}</span>
        </td>
        <td class="tableTitle">
            <span>{{itemData.goodUnit}}</span>
        </td>
        <td class="tableTitle">
            <span>{{itemData.goodSpec}}</span>
        </td>
        <td style="width:240px">
             <el-date-picker v-model="itemData.buyTime" type="date" :picker-options="pickerOptions" placeholder="选择日期">
            </el-date-picker>
        </td>
        <td>
            <el-input v-model.number="itemData.inCount" type="number"></el-input>
        </td>
        <td>
            <el-input v-model.number="itemData.inPrice" type="number"></el-input>
        </td>
        <td class="tableTitle">
            <span>{{inTotal.toFixed(2)}}</span>
        </td>
        <td>
            <el-input auto-complete="off" :maxlength="200" v-model="itemData.remarks"></el-input>
        </td>
    </tr>
</template>

<script>
import common from '@/utils/common';
export default {
    props: {
        itemData: Object,
        // isType: String, // reim/reception/traveling
    },
    data() {
        return {
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            },
        }
    },
    computed: {
        inTotal(){
            return this.itemData.inCount*this.itemData.inPrice
        }
    },
    watch:{
        inTotal:function(val){
            this.itemData.inTotal = val 
        },
    },
    created() {

    },
    methods: {
     
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
