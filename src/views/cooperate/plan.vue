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
                            <RedStar label="进度状态：" :required="true">
                                <span class="right-con">
                                    <el-select clearable class="filter-item ignore-detail" filterable v-model="postData.progressName" placeholder="请选择进度状态" style="width:260px;" @change="selectProgress" @clear="cleaProgress">
                                        <el-option v-for="item in statuList" :label="item.progressName" :value="item.progressName" :key="item.progressName">
                                        </el-option>
                                    </el-select>
                                </span>
                            </RedStar>
                        </li>
                        <!-- <li class="base-li">
                            <RedStar label="结束状态：" :required="true">
                                <span class="right-con">
                                    {{postData.isEnd =='1' ?'是':'否'}}
                                </span>
                            </RedStar>
                        </li> -->
                        <li class="base-li" v-if="postData.isEnd =='1'">
                            <RedStar label="结束状态：" :required="true">
                                <span class="right-con">
                                    是
                                </span>
                            </RedStar>
                        </li>
                        <template v-if="postData.progressName=='需求审核中'">
                            <li class="base-li">
                                <RedStar label="需求紧急度：" :required="true">
                                    <span class="right-con">
                                        <el-select clearable class="filter-item ignore-detail" filterable v-model="postData.urgency" placeholder="请选择需求紧急度" style="width:260px;">
                                            <el-option v-for="item in urgencyList" :label="item.name" :value="item.value" :key="item.value">
                                            </el-option>
                                        </el-select>
                                    </span>
                                </RedStar>
                            </li>
                        </template>
                        <template v-if="postData.progressName=='需求调研中'">
                            <li class="base-li">
                                <RedStar label="优先级：" :required="true">
                                    <span class="right-con">
                                        <el-select clearable class="filter-item ignore-detail" filterable v-model="postData.priority" placeholder="请选择优先级" style="width:260px;" >
                                            <el-option v-for="item in priorityList" :label="item.name" :value="item.value" :key="item.value">
                                            </el-option>
                                        </el-select>
                                    </span>
                                </RedStar>
                            </li>
                        </template>
                        <template v-if="postData.progressName=='产品设计中'">
                            <li class="base-li">
                                <RedStar label="产品端：" :required="true">
                                    <span class="right-con">
                                        <el-select clearable class="filter-item ignore-detail" filterable v-model="postData.productEnd" placeholder="请选择产品端" style="width:260px;" >
                                            <el-option v-for="item in productEndList" :label="item.name" :value="item.value" :key="item.value">
                                            </el-option>
                                        </el-select>
                                    </span>
                                </RedStar>
                            </li>
                            <li class="base-li">
                                <RedStar label="预计设计时间：" :required="true">
                                    <span class="right-con">
                                        <el-date-picker
                                            v-model="planDesignTime"
                                            type="date"
                                            style="width:260px;"
                                            placeholder="选择日期">
                                        </el-date-picker>
                                    </span>
                                </RedStar>
                            </li>
                        </template>
                        <template v-if="postData.progressName=='开发中'">
                            <li class="base-li">
                                <RedStar label="预计开发时间：" :required="true">
                                    <span class="right-con">
                                        <el-date-picker
                                            v-model="planDevTime"
                                            type="date"
                                            style="width:260px;"
                                            placeholder="选择日期">
                                        </el-date-picker>
                                    </span>
                                </RedStar>
                            </li>
                            <li class="base-li">
                                <RedStar label="预计提测时间：" :required="true">
                                    <span class="right-con">
                                        <el-date-picker
                                            v-model="planTestTime"
                                            type="date"
                                            style="width:260px;"
                                            placeholder="选择日期">
                                        </el-date-picker>
                                    </span>
                                </RedStar>
                            </li>
                            <li class="base-li">
                                <RedStar label="预计上线时间：" :required="true">
                                    <span class="right-con">
                                        <el-date-picker
                                            v-model="planReleaseTime"
                                            type="date"
                                            style="width:260px;"
                                            placeholder="选择日期">
                                        </el-date-picker>
                                    </span>
                                </RedStar>
                            </li>
                        </template>
                        <template v-if="postData.progressName=='上线'">
                            <li class="base-li">
                                <RedStar label="实际上线时间：" :required="true">
                                    <span class="right-con">
                                        <el-date-picker
                                            v-model="actualReleaseTime"
                                            type="date"
                                            style="width:260px;"
                                            placeholder="选择日期">
                                        </el-date-picker>
                                    </span>
                                </RedStar>
                            </li>
                            <li class="base-li">
                                <RedStar label="培训时间：" :required="true">
                                    <span class="right-con">
                                        <el-date-picker
                                            v-model="trainTime"
                                            type="date"
                                            style="width:260px;"
                                            placeholder="选择日期">
                                        </el-date-picker>
                                    </span>
                                </RedStar>
                            </li>
                        </template>
                        <li class="base-li">
                            <RedStar label="处理说明：" :required="true">
                                <span class="right-con">
                                    <sjbtextarea :rows="3" placeholder="请输入" textStyle="width:260px;" :max="100" v-model.trim="postData.handleExplain"></sjbtextarea>
                                </span>
                            </RedStar>
                        </li>
                    </ul>
                </base-temp>
                
            </div>
        </div>
        <div class="segment statistics">
            <div class="sjb-foot-button">
                <el-button type="primary" size="small" @click="submit">提交</el-button>
                <el-button size="small" @click="backStep">返回</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import common from '@/utils/common';
import BaseTemp from '@/components/BaseTemp';
import RedStar from '@/components/RedStar/RedStar.vue';
import sjbtextarea from '@/components/sjbTextarea';

import {getTypeList,addProgress,getPlan} from '@/api/cooprate';

import { toJS, fromJS, Map, List } from 'immutable';
import listQueryMix from '../../mixins/listQuery.mix';

import { parseTime } from '@/utils';
import { coopPlanVali } from './coop.util';
import config from '@/utils/config';
import utils from '@/utils/utils';
export default {
    components: {
        BaseTemp,
        RedStar,
        sjbtextarea
    },
    data() {
        return {

            statuList:[],
            urgencyList:[],
            productEndList:[],
            priorityList:[],
            
            postData: {//提交数据
                actualReleaseTime: "",//实际上线时间 ,
                handleExplain:"",// 处理说明 ,
                needFlowId:"",// 协作ID ,
                isEnd:'',
                planDesignTime:"",// 预计设计时间 ,
                planDevTime: "",//预计开发时间 ,
                planReleaseTime: "",//预计上线时间 ,
                planTestTime :"",// 预计提测时间 ,
                priority :"",// 优先级 ,
                productEnd :"",// 产品端，以英文逗号分隔 ,
                progressName :"",// 进度状态名称 ,
                trainTime:"",// 培训时间 ,
                urgency :"",// 需求紧急度

            },
            actualReleaseTime: "",//实际上线时间 ,
            planDesignTime:"",// 预计设计时间 ,
            planDevTime: "",//预计开发时间 ,
            planReleaseTime: "",//预计上线时间 ,
            planTestTime :"",// 预计提测时间 ,
            trainTime:"",// 培训时间 ,
        }
    },
    async created() {
        this.postData.needFlowId = this.$route.query.key;
        let res = await getPlan({id:this.$route.query.key})
        this.postData.progressName = res.data.curNeedProgressName;
        this.postData.isEnd = res.data.isEnd
        this.statuList = res.data.mainNeedTypeResponse.needProgressList;
    },
    mounted() {
        let dicList = JSON.parse(localStorage.getItem("web_oa_dicList"));
        function selectDic(arr, type) {
            let temp = [];
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].type == type) {
                    temp.push(arr[i]);
                };
            }
            return temp;
        }
        this.urgencyList = selectDic(dicList, "urgency");
        this.priorityList = selectDic(dicList, "priority");
        this.productEndList = selectDic(dicList, "product_end");
    },
    methods: {
        backStep() {
            this.$router.go(-1);
        },
        cleaProgress(){
            this.postData.actualReleaseTime= "";//实际上线时间 ,
            this.postData.handleExplain="";// 处理说明 ,
            this.postData.isEnd = '';
            this.postData.planDesignTime="";// 预计设计时间 ,
            this.postData.planDevTime= "";//预计开发时间 ,
            this.postData.planReleaseTime="";//预计上线时间 ,
            this.postData.planTestTime ="";// 预计提测时间 ,
            this.postData.priority="";// 优先级 ,
            this.postData.productEnd ="";// 产品端，以英文逗号分隔 ,
            this.postData.progressName ="";// 进度状态名称 ,
            this.postData.trainTime="";// 培训时间 ,
            this.postData.urgency ="";// 需求紧急度
        },
        selectProgress(){
            this.statuList.forEach(item=>{
                if(item.progressName == this.postData.progressName){
                    this.postData.isEnd = item.isEnd;
                }
            })
        },
        // 提交
        submit() {
            this.postData.actualReleaseTime = common.timeParse(this.actualReleaseTime);
            this.postData.planDesignTime = common.timeParse(this.planDesignTime);
            this.postData.planDevTime = common.timeParse(this.planDevTime);
            this.postData.planReleaseTime = common.timeParse(this.planReleaseTime);
            this.postData.planTestTime = common.timeParse(this.planTestTime);
            this.postData.trainTime = common.timeParse(this.trainTime);
            if (coopPlanVali(this)) {
                addProgress(this.postData).then(res => {
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
</style>
