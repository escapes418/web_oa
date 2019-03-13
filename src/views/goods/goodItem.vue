<template>
    <tr>
        <td style="padding: 0 10px 0 10px;">
            <el-checkbox v-model="itemData.checked"></el-checkbox>
        </td>
        <td style="padding: 0 10px 0 10px;">
            <span>{{itemData.goodName}}</span>
        </td>
        <td style="padding: 0 10px 0 10px;">
            <span>{{itemData.goodCode}}</span>
        </td>
        <td>
            <span>{{itemData.goodTypeName}}</span>
        </td>
        <td>
            <span>{{itemData.goodUnit}}</span>
        </td>
        <td>
            <span>{{itemData.goodSpec}}</span>
        </td>
        <td style="width:240px">
            <el-select clearable filterable class="filter-item" v-model="itemData.outPlace" placeholder="请选择放置地" @change="selectPlace">
                <el-option v-for="item in itemData.places" :key="item.placeId" :label="item.placeName" :value="item.placeId">
                </el-option>
            </el-select>
        </td>
        <td>
            <span class="tableTitle">{{itemData.placeCount}}</span>
        </td>
        <td>
            <el-input v-model.number="itemData.inCount" type="number"></el-input>
        </td>
        <td>
            <span class="tableTitle">{{itemData.inPrice}}</span>
        </td>
        <td>
            <span class="tableTitle">{{inTotal || 0}}</span>
        </td>
        <td>
            <el-input auto-complete="off" :maxlength="500" v-model="itemData.remarks"></el-input>
        </td>
    </tr>
</template>

<script>
export default {
    props: {
        itemData: Object,
        // isType: String, // reim/reception/traveling
    },
    data() {
        return {
            
        }
    },
    computed: {
        // 是否禁用上传图片
        inTotal(){
            return this.itemData.inCount*this.itemData.inPrice
        }
    },
    watch:{
        inTotal:function(val){
            this.itemData.inTotal = val 
        }
    },
    created() {

    },
    methods: {
        selectPlace(){
            this.itemData.places.forEach(item => {
                if(this.itemData.outPlace==item.placeId){
                    this.itemData.placeCount = item.placeCount
                }
            });
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
