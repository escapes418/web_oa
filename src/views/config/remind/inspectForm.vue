<template>
<div class="sjb-form-wrapper">
    <div class="segment statistics">
        <div class="segment-area">
            <el-form ref='form' label-width="250px" label-position="left">
                <RedStar :required ="true">
                    <el-form-item label="模板类型：">
                        <el-select clearable class="filter-item" filterable v-model="postData.remindType" placeholder="请选择模板类型" style="width:260px;">
                            <el-option v-for="item in stencilList" :label="item.name" :value="item.value" :key="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </RedStar>
                <RedStar :required ="false">
                    <el-form-item label="提醒对象：">
                        当前审批人
                    </el-form-item>
                </RedStar>
                <RedStar :required ="true">
                    <el-form-item label="提醒方式：">
                        <el-select clearable multiple class="filter-item" filterable v-model="postData.remindWays" placeholder="请选择提醒类型" style="width:260px;">
                            <el-option v-for="item in remindList" :label="item.name" :value="item.value" :key="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </RedStar>
                <RedStar :required ="true">
                    <el-form-item label="发送频率：">
                        即时发送
                        <!-- <el-radio-group v-model="postData.sendFrequency" @change="initData">
                            <el-radio :label="0">按天</el-radio>
                            <el-radio :label="1">按星期</el-radio>
                            <el-radio :label="2">按月</el-radio>
                            <el-radio :label="3">一次</el-radio>
                        </el-radio-group>
                        <template v-if="postData.sendFrequency == 0">
                            <div class="pickOption">
                                每天
                                <el-time-select v-model="postData.pollHourMin"
                                    :picker-options="{
                                        start: '08:30',
                                        step: '00:15',
                                        end: '18:30'
                                    }"
                                    placeholder="选择时间" style="width:120px;">
                                </el-time-select>
                                <span>
                                    <el-checkbox v-model="isWeek" label="包含周六、周天"></el-checkbox>
                                </span>
                            </div>
                        </template>
                        <template v-if="postData.sendFrequency == 1">
                            <div class="pickOption">
                                每
                                <el-select clearable class="filter-item" filterable v-model="postData.pollWeek" style="width:100px;">
                                    <el-option v-for="item in periodList" :label="item.name" :value="item.value" :key="item.value">
                                    </el-option>
                                </el-select>
                                周
                                <el-select clearable class="filter-item" filterable v-model="postData.pollWeekday" style="width:100px;">
                                    <el-option v-for="item in weekList" :label="item.name" :value="item.value" :key="item.value">
                                    </el-option>
                                </el-select>
                                <el-time-select v-model="postData.pollHourMin"
                                    :picker-options="{
                                        start: '08:30',
                                        step: '00:15',
                                        end: '18:30'
                                    }"
                                    placeholder="选择时间" style="width:120px;">
                                </el-time-select>
                            </div>
                        </template>
                        <template v-if="postData.sendFrequency == 2">
                            <div class="pickOption">
                                每
                                <el-select clearable class="filter-item" filterable v-model="postData.pollMonth" style="width:100px;">
                                    <el-option v-for="item in periodList" :label="item.name" :value="item.value" :key="item.value">
                                    </el-option>
                                </el-select>
                                月
                                <el-select clearable class="filter-item" filterable v-model="postData.pollMonthday" style="width:100px;">
                                    <el-option v-for="item in monthList" :label="item.name" :value="item.value" :key="item.value">
                                    </el-option>
                                </el-select>
                                <el-time-select v-model="postData.pollHourMin"
                                    :picker-options="{
                                        start: '08:30',
                                        step: '00:15',
                                        end: '18:30'
                                    }"
                                    placeholder="选择时间" style="width:120px;">
                                </el-time-select>
                            </div>
                        </template>
                        <template v-if="postData.sendFrequency == 3">
                            <div class="pickOption">
                                 <el-date-picker
                                    v-model="startTime"
                                    type="datetime"
                                    placeholder="选择日期时间">
                                </el-date-picker>
                            </div>
                        </template> -->
                    </el-form-item>
                </RedStar>
                <RedStar>
                    <el-form-item label="黑名单设置：">
                        <div class="blackList">
                            <div class="header">黑名单内员工不会接收邮件提醒</div>
                            <el-select clearable multiple class="filter-item" filterable v-model="postData.emailBlack" placeholder="请选择人员" style="width:260px;">
                                <el-option v-for="item in memberList" :label="item.name" :value="item.id" :key="item.id">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="blackList">
                            <div class="header">黑名单内员工不会接收短信提醒</div>
                            <el-select clearable multiple class="filter-item" filterable v-model="postData.smsBlack" placeholder="请选择人员" style="width:260px;">
                                <el-option v-for="item in memberList" :label="item.name" :value="item.id" :key="item.id">
                                </el-option>
                            </el-select>
                        </div>
                        
                    </el-form-item>
                </RedStar>
                    <el-form-item>
                        <el-button type="primary" @click="submit">立即保存</el-button>
                        <el-button @click="goBack">返回</el-button>
                    </el-form-item>
            </el-form>
        </div>
    </div>
</div>
    
</template>

<script>
import common from '@/utils/common'

import RedStar from '@/components/RedStar/RedStar.vue'
import {getDetail, getMember , saveRemind} from '@/api/remind'
import { remindFormVali } from './remind.util'

export default {
    components: {
        RedStar,
    },
    data() {
        return {
            postData:{
                id:"",
                remindCategory:1,
                remindType:"",
                sendFrequency:4,
                remindWays:[],
                pollHourMin:"",
                isWeek:0,
                pollWeek:1,
                pollWeekday:"",
                pollMonth:"",
                pollMonthday:"",
                startTime:"",
                emailBlack:[],
                smsBlack:[]
            },
            stencilList:[{ 
                value:0,
                name:"报销申请"
            },{
                value:1,
                name:"接待申请"
            },{
                value:2,
                name:"出差申请"
            },{
                value:3,
                name:"合同申请"
            },{
                value:4,
                name:"协作申请"
            },{
                value:5,
                name:"立项申请"
            },{
                value:6,
                name:"借款申请"
            },{
                value:7,
                name:"还款申请"
            },{
                value:8,
                name:"付款申请"
            }],
            remindList:[{
                value:"0",
                name:"邮件"
            },{
                value:"1",
                name:"短信"
            }],
            // periodList:[{
            //     value:"1",
            //     name:"1"
            // },{
            //     value:"2",
            //     name:"2"
            // },{
            //     value:"3",
            //     name:"3"
            // },{
            //     value:"4",
            //     name:"4"
            // }],
            // weekList:[{
            //     value:"1",
            //     name:"周一"
            // },{
            //     value:"2",
            //     name:"周二"
            // },{
            //     value:"3",
            //     name:"周三"
            // },{
            //     value:"4",
            //     name:"周四"
            // },{
            //     value:"5",
            //     name:"周五"
            // },{
            //     value:"6",
            //     name:"周六"
            // },{
            //     value:"7",
            //     name:"周天"
            // }],
            // monthList:[{
            //     value:"1",
            //     name:"1"
            // },{
            //     value:"2",
            //     name:"2"
            // },{
            //     value:"3",
            //     name:"3" 
            // },{
            //     value:"4",
            //     name:"4" 
            // },{
            //     value:"5",
            //     name:"5" 
            // },{
            //     value:"6",
            //     name:"6" 
            // },{
            //     value:"7",
            //     name:"7" 
            // },{
            //     value:"8",
            //     name:"8" 
            // },{
            //     value:"9",
            //     name:"9" 
            // },{
            //     value:"10",
            //     name:"10" 
            // },{
            //     value:"11",
            //     name:"11" 
            // },{
            //     value:"12",
            //     name:"12" 
            // },{
            //     value:"13",
            //     name:"13" 
            // },{
            //     value:"14",
            //     name:"14" 
            // },{
            //     value:"15",
            //     name:"15"  
            // },{
            //     value:"16",
            //     name:"16"  
            // },{
            //     value:"17",
            //     name:"17"    
            // },{
            //     value:"18",
            //     name:"18"   
            // },{
            //     value:"19",
            //     name:"19"   
            // },{
            //     value:"20",
            //     name:"20"   
            // },{
            //     value:"21",
            //     name:"21"   
            // },{
            //     value:"22",
            //     name:"22"   
            // },{
            //     value:"23",
            //     name:"23"   
            // },{
            //     value:"24",
            //     name:"24"   
            // },{
            //     value:"25",
            //     name:"25"   
            // },{
            //     value:"26",
            //     name:"26"   
            // },{
            //     value:"27",
            //     name:"27"   
            // },{
            //     value:"28",
            //     name:"28"   
            // },{
            //     value:"29",
            //     name:"29"   
            // },{
            //     value:"30",
            //     name:"30"   
            // },{
            //     value:"31",
            //     name:"31"   
            // }],
            memberList:[],
            // startTime :"",
            // isWeek:false
        }
    },
    async created() {
        if(this.$route.query.key){
            getDetail({
                id:this.$route.query.key,
                remindCategory:this.postData.remindCategory
            }).then(res => {
                res.data.emailBlack = res.data.emailBlack || []
                res.data.smsBlack = res.data.smsBlack || []
                this.postData = res.data;
            })
        }
      
    },
    computed: {
        
    },
    async mounted() {
        getMember({}).then(res => {
            // this.memberFullList = res.data;
            this.memberList = res.data.filter((item)=>{
                return item.userStatus == '1'
            });
        })
    },
    methods: {
        // initData(type){
        //     if(type==0){
        //         this.postData.pollHourMin = "";
        //         // this.postData.isWeek = false;
        //         this.postData.pollWeek = "";
        //         this.postData.pollWeekday = "";
        //         this.postData.pollMonth = "";
        //         this.postData.pollMonthday = "";
        //         this.startTime = "";
        //     }
        //     if(type ==1){
        //         this.postData.pollHourMin = "";
        //         this.isWeek = false;
        //         // this.postData.pollWeek = "";
        //         // this.postData.pollWeekday = "";
        //         this.postData.pollMonth = "";
        //         this.postData.pollMonthday = "";
        //         this.startTime = "";
        //     }
        //     if(type ==2){
        //         this.postData.pollHourMin = "";
        //         this.isWeek = false;
        //         this.postData.pollWeek = "";
        //         this.postData.pollWeekday = "";
        //         // this.postData.pollMonth = "";
        //         // this.postData.pollMonthday = "";
        //         this.startTime = "";
        //     }
        //     if(type ==3){
        //         this.postData.pollHourMin = "";
        //         this.isWeek = false;
        //         this.postData.pollWeek = "";
        //         this.postData.pollWeekday = "";
        //         this.postData.pollMonth = "";
        //         this.postData.pollMonthday = "";
        //         // this.startTime = "";
        //     }
        // },
        goBack(){
            this.$router.push({path:'/remind/inspectList'})
        },
        // 提交
        submit() {
            // if(this.isWeek){
            //     this.postData.isWeek = 1
            // }else{
            //     this.postData.isWeek = 0
            // }
            if(this.startTime){
                this.postData.startTime = common.timeParse(this.startTime)
            }
            if (remindFormVali(this)) {
                saveRemind(this.postData).then(res => {
                    if (res.code == 200) {
                        this.$message({
                            message: res.message,
                            type: 'success'
                        })
                        this.$router.push({path:'/remind/inspectList' })
                    }
                })
            }
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.star-item {
    padding-top:10px!important
}
.blackList .header{
    margin-bottom:5px;
}
.pickOption{
    background: #F5F6F5;
    padding: 5px
}
.pickOption span{
    margin-left:30px
}
</style>
