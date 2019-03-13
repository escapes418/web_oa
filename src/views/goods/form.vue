<template>
    <div class="sjb-form-wrapper">
        <div class="segment statistics">
            <div class="segment-header">
                基本信息
            </div>
            <div class="segment-area">
                <base-temp>
                    <ul class="base-ul">
                        <li class="base-li">
                            <RedStar label="物品编号：" :required="true">
                                <span class="right-con">
                                    <el-input style="width: 260px;" class="filter-item" placeholder="请输入物品编号" v-model.trim="postData.goodCode">
                                    </el-input>
                                </span>
                            </RedStar>
                        </li>
                        <li class="base-li">
                            <RedStar label="物品名称：" :required="true">
                                <span class="right-con">
                                    <el-input style="width: 260px;" class="filter-item" placeholder="请输入物品名称" v-model.trim="postData.goodName">
                                    </el-input>
                                </span>
                            </RedStar>
                        </li>
                        <li class="base-li">
                            <RedStar label="物品类别：" :required="true">
                                <span class="right-con">
                                    <el-cascader style="width: 260px;" :options="subsTree" v-model="postData.goodType" change-on-select label="value" :clearable="true"></el-cascader>
                                </span>
                            </RedStar>
                        </li>
                        <li class="base-li">
                            <RedStar label="单位：" :required="true">
                                <span class="right-con">
                                    <el-input style="width: 260px;" class="filter-item" placeholder="请输入物品单位" v-model.trim="postData.goodUnit">
                                    </el-input>
                                </span>
                            </RedStar>
                        </li>
                        <li class="base-li">
                            <RedStar label="规格型号：" :required="true">
                                <span class="right-con">
                                    <el-input style="width: 260px;" class="filter-item" placeholder="请输入规格型号" v-model.trim="postData.goodSpec">
                                    </el-input>
                                </span>
                            </RedStar>
                        </li>
                        
                        
                        <li class="base-li">
                            <RedStar label="备注：">
                                <span class="right-con">
                                    <el-input type="textarea" :rows="3" placeholder="请输入" style="width:260px;" :maxlength="1000" v-model.trim="postData.remarks"></el-input>
                                </span>
                            </RedStar>
                        </li>
                    </ul>
                </base-temp>
                <base-temp title="入库信息">
                    <ul class="base-ul">
                        <li class="base-li">
                            <RedStar label="入库日期：" :required="true">
                                <span class="right-con">
                                    <el-date-picker style="width:260px" v-model="inTime" type="date" placeholder="选择日期"></el-date-picker>
                                </span>
                            </RedStar>
                        </li>
                        <li class="base-li">
                            <RedStar label="放置地：" :required="true">
                                <span class="right-con">
                                    <el-select clearable class="filter-item ignore-detail" filterable v-model="postData.putinPlace" placeholder="请选择标签名称" style="width:260px;">
                                        <el-option v-for="item in placeArr" :label="item.labelName" :value="item.id" :key="item.id">
                                        </el-option>
                                    </el-select>
                                </span>
                            </RedStar>
                        </li>
                        <li class="base-li">
                            <RedStar label="入库数量：" :required="true">
                                <span class="right-con">
                                    <el-input style="width: 260px;" type="number" class="filter-item" placeholder="请输入入库数量" v-model.trim="postData.inCount">
                                    </el-input>
                                </span>
                            </RedStar>
                        </li>
                        <li class="base-li">
                            <RedStar label="购入日期：" :required="true">
                                <span class="right-con">
                                    <el-date-picker style="width:260px" v-model="buyTime" type="date" placeholder="选择日期"></el-date-picker>
                                </span>
                            </RedStar>
                        </li>
                        <li class="base-li">
                            <RedStar label="单价：" :required="true">
                                <span class="right-con">
                                    <el-input style="width: 260px;" type="number" class="filter-item" placeholder="请输入单价" v-model.trim="postData.inPrice">
                                    </el-input>
                                </span>
                            </RedStar>
                        </li>
                        <li class="base-li">
                            <RedStar label="金额：" :required="true">
                                <span class="right-con">
                                    {{totalCount}}
                                </span>
                            </RedStar>
                        </li>
                    </ul>
                </base-temp>
            </div>
        </div>

        <div class="segment statistics">
            <div class="sjb-foot-button">
                <el-button type="primary" size="small" @click="submit">提交申请</el-button>
                <el-button size="small" @click="backStep">返回</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import common from '@/utils/common';
import BaseTemp from '@/components/BaseTemp';
import RedStar from '@/components/RedStar/RedStar.vue';


import {getPlaceList,addGood,getSubjectsNew} from '@/api/goods';
import { mapState, mapGetters } from "vuex";

import { parseTime } from '@/utils';
import { coopFormVali } from './coop.util';
import config from '@/utils/config';
import utils from '@/utils/utils';
export default {
    components: {
        BaseTemp,
        RedStar,
    },
    computed:{
        totalCount:function(){
            return this.postData.inPrice*this.postData.inCount
        }
    },
    watch:{

    },
    data() {
        return {
            subsTree:[],
            placeArr:[],
            postData: {//提交数据
                goodCode:"",
                goodName:"",
                goodType:[],
                goodUnit:"",
                goodSpec:"",
                remarks:"",
                inTime:"",
                putinPlace:"",
                inCount:"",
                buyTime:"",
                inPrice:""
            },
            inTime:"",
            buyTime:"",
        }
    },
    async created() {
        let res = await getSubjectsNew({});
        this.subsTree = res.data.list
    },
    mounted() {
        
        getLabelList({}).then(res=>{
            this.labelList = res.data
        })
        
    },
    methods: {
        
        backStep() {
            this.$router.go(-1);
        },
        // 提交
        submit() {
            this.postData.inTime = common.timeParse(this.inTime);
            this.postData.buyTime = common.timeParse(this.buyTime)
            console.log(this.postData)
            return 
            if(coopFormVali(this)){
                addGood({
                    ...this.postData
                }).then(res=>{
                    if (res.status == 0) {
                        this.$message({
                            message: res.message,
                            type: 'success'
                        })
                        this.$router.push({path:'/oa/coopList' });
                    }
                })
            }
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.base-ul{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.base-li{
    flex-basis: 50%;
    // height: 32plx;
    // display: inline-block;
    .font-gray.left-title {
        font-size: 13px;
        float: left;
        width: 150px;
        padding-right: 10px;
        color: #99a9bf;
    }
    .right-con {
        float: left;
        color: rgb(52, 52, 52);
        font-size: 13px ;
    }
}
.el-form-item--small .el-form-item__label {
    line-height: 32px;
    font-size: 14px;
    padding-right: 10px;
    color: #99a9bf;
}
.el-input--small .el-input__inner {
    height: 40px!important;
}
.left-red{
    color: red;
    position: absolute;
    left: 50px;
}
.remark{
    margin-top: 25px;
    margin-bottom: 8px;
    background-color: #fdfdfd;
    border: 1px solid#F2F7FA;
}
.remarkTitle{
  margin-right: 100px;
  float: left;
  margin-top: 28px;
  margin-left: 5px
}

.upload-container{
    margin: 50px
}
.editor-slide-upload{
    margin-bottom: 15px
}
.item-value{
    float: left;
    border: 1px solid #dcdfe6;
    border-radius:4px;
    background: white;
    padding-left: 7px;
    line-height: 30px;
    width: 260px
}
.segment .el-table__body-wrapper {
    padding: 40px 20px 35px;
}
.ignore-detail {
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
}
.upload-img{
    width: 550px;
}
.toolbar-item{
    margin-left: 10px
}
.move-item{
    padding: 10px;
    background: #f2f7fa;
    color: #343434;
    .item-label{
        float: left;
        width: 100px;
    }
    .filter-item{
        display: inline-block;
        margin-left: 30px
    }
}
</style>
