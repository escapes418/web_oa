<template>
    <div class="sjb-form-wrapper">
        <div class="segment statistics">
            <div class="segment-header">
                基本信息
            </div>
            <div class="segment-area">
                <el-row>
                    <el-col :span="12" class="segment-brline">
                        <div class="clearfix cominfo-item">
                            <span class="left-title font-gray">日期：</span>
                            <span class="right-con">{{ detail.dailyDate | stamp2TextDate}}</span>
                        </div>
                        
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">所属部门：</span>
                            <span class="right-con">{{ detail.officeName }}</span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">当日拜访客户：</span>
                            <span class="right-con">
                                {{ detail.custVisitCount }}
                            </span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">当日签约客户：</span>
                            <span class="right-con">
                                {{ detail.custSignCount }}
                            </span>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="clearfix cominfo-item">
                            <span class="left-title font-gray">市场负责人：</span>
                            <span class="right-con">{{ detail.marketLeaderName }}</span>
                        </div>
                        
                        <div class="clearfix cominfo-item">
                            <span class="left-title font-gray">当日意向客户：</span>
                            <span class="right-con">{{ detail.custIntentionCount }}</span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">明日拜访客户：</span>
                            <span class="right-con">{{ detail.afterVisitCount }}</span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">备注：</span>
                            <span class="ignore-detail" :title="detail.remarks">{{ detail.remarks }}</span>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="segment statistics">
            <div class="segment-header">
                今日工作内容
            </div>
            <div class="segment-area">
                <div class="el-table__body-wrapper textArea">
                    <el-input readonly type="textarea" :rows="3" v-model="detail.dailyContent"></el-input>
                </div>
            </div>
        </div>
        <div class="segment statistics">
            <div class="segment-header">
                明日工作计划
            </div>
            <div class="segment-area">
                <div class="el-table__body-wrapper textArea">
                    <el-input readonly type="textarea" :rows="3" v-model="detail.afterDailyPlan"></el-input>
                </div>
            </div>
        </div>
        <div class="segment statistics">
            <div class="sjb-foot-button">
                <el-button size="medium" @click="backBtn">返回</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import common from "@/utils/common";
import { getDetail } from "@/api/log";
export default{
    data(){
        return {
            detail:{}
        }
    },
    created(){
        getDetail({
            id:this.$route.query.key
        }).then(res=>{
            if(res.status == 0){
                this.detail = res.data
            }
        })
    },
    methods: {
        backBtn(){
            this.$router.go(-1)
        }
    },
}

</script>
<style scoped>
.textArea{
    margin-top: 5px;
    margin-bottom: 5px;
    font-size: 14px;
    line-height: 32px;
    color: #343434;
}
.ignore-detail {
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
    color: #343434;
    font-size: 14px;
}
</style>


