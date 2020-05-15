<template>
    <div class="sjb-form-wrapper">
        <div class="segment statistics">
            <div class="segment-header">
                任务基本信息
            </div>
            <div class="segment-area">
                <el-row>
                    <el-col :span="8" class="segment-brline">
                        <div class="changeTitle">
                            变更项
                        </div>
                        <div>
                            任务编号
                        </div>
                        <div>
                            上级任务编号
                        </div>
                        <div>
                            任务名称
                        </div>
                        <div>
                            所属阶段
                        </div>
                        <div>
                            任务责任人
                        </div>
                        <div>
                            参与人
                        </div>
                        <div>
                            开始日期
                        </div>
                        <div>
                            截止日期
                        </div>
                        <div>
                            任务详细说明
                        </div>
                        <div>
                            备注
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="changeTitle">变更前</div>
                        <div style="height:35px">{{detail.taskCode}}</div>
                        <div style="height:35px">{{detail.parentTaskCode}}</div>
                        <div class="ignore-detail" :title="detail.taskName" style="height:35px;line-height:35px">{{detail.taskName}}</div>
                        <div style="height:35px">{{detail.projectStageName}}</div>
                        <div style="height:35px">{{detail.principalName}}</div>
                        <div style="height:35px">{{detail.participantNames}}</div>
                        <div style="height:35px">{{detail.startTime | stamp2TextDate}}</div>
                        <div style="height:35px">{{detail.endTime | stamp2TextDate}}</div>
                        <div style="height:35px">{{detail.taskDesc}}</div>
                        <div style="height:35px">{{detail.remark}}</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="changeTitle red">变更后</div>
                        <div>{{detail.taskCode}}</div>
                        <div style="height:35px">{{detail.parentTaskCode}}</div>
                        <div>
                            <el-input type="text" placeholder="请输入" style="width:250px;" v-model.trim="postData.taskName" :maxlength="32"></el-input>
                        </div>
                        <div>
                            <el-select clearable class="filter-item" v-model="postData.projectStageId" placeholder="请选择" style="width:250px;">
                                <el-option v-for="item in stageList" :label="item.stageName" :value="item.id" :key="item.id">
                                </el-option>
                            </el-select>
                        </div>
                        <div>
                            <el-select clearable filterable class="filter-item " v-model="postData.principalId" placeholder="请选择" style="width:250px;">
                                <el-option v-for="item in memberList" :label="item.memberUserName" :value="item.memberUserId" :key="item.memberUserId">
                                </el-option>
                            </el-select>
                        </div>
                        <div>
                            <el-select clearable multiple filterable class="filter-item " v-model="postData.memberIds" placeholder="请选择" style="width:250px;">
                                <el-option v-for="item in memberList" :label="item.memberUserName" :value="item.id" :key="item.id">
                                </el-option>
                            </el-select>
                        </div>
                        <div>
                            <el-date-picker
                                v-model="startTime"
                                style="width:250px;"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                        </div>
                        <div>
                            <el-date-picker
                                v-model="endTime"
                                style="width:250px;"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                        </div>
                        <div>
                            <sjbtextarea 
                                    v-model.trim="postData.taskDesc" 
                                    placeholder="请输入" 
                                    :row="3" 
                                    :max="200"
                                    textStyle="width:250px"></sjbtextarea>
                        </div>
                        <div>
                            <sjbtextarea 
                                    v-model.trim="postData.remark" 
                                    placeholder="请输入" 
                                    :row="3" 
                                    :max="200"
                                    textStyle="width:250px"></sjbtextarea>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="segment statistics">
            <div class="sjb-foot-button">
                <el-button  type="primary" size="small" @click="submit">保存</el-button>
                <el-button  size="small" @click="backStep">返回</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import sjbtextarea from '@/components/sjbTextarea';
import common from '@/utils/common';
import config from '@/utils/config';
import utils from '@/utils/utils';
import { getChange,saveChange ,getMissionMember,getMissionStage, } from '@/api/project';

export default {
    components: {
        sjbtextarea
    },
    data(){
        return{
            postData:{
                taskCode:"",
                projectStageId:"",
                projectStageName:"",
                parentTaskCode:"",
                taskName:"",
                principalId:"",
                principalName:"",
                memberIds:[],
                startTime:"",
                endTime:"",
                taskDesc:"",
                remark:""
            },
            detail:{
                // projectStageId:"1",
                // projectStageName:"调研阶段",
                // taskCode:"RW100000101"	,
                // parentTaskCode:"RW1000001",
                // taskName:"线路上下游调研"	,
                // principalId:"12513",
                // principalName:"赵云",
                // memberIds:[],
                // startTime:99565656565656,
                // endTime:5554455,
                // taskDesc:"调研企业每条线路的上下游企业"	,
                // remark:"调研企业每条线路的上下游企业"
            },

            startTime:"",
            endTime:"",
            memberNames:[],
            memberList:[],
            stageList:[],
        }
    },
    created(){
        getMissionMember(
            this.$route.query.projectId
        ).then(res=>{
            if(res.code == 200){
                this.memberList = res.data
            }
        })

        getMissionStage(this.$route.query.projectId).then(res=>{
            if(res.code == 200){
                this.stageList = res.data
            }
        })
        this.getDetail()
    },
    methods: {
        submit(){
            if(!this.postData.taskName){
                this.$message({
                    message: "请填写任务名称",
                    type: "warning"
                });
                return;
            }
            if(!this.postData.projectStageId){
                this.$message({
                    message: "请选择所属阶段",
                    type: "warning"
                });
                return;
            }
            if(!this.postData.principalId){
                this.$message({
                    message: "请选择任务责任人",
                    type: "warning"
                });
                return;
            }
            if(!this.endTime){
                this.$message({
                    message: "请选择截止日期",
                    type: "warning"
                });
                return;
            }
            if(!this.postData.taskDesc){
                this.$message({
                    message: "请填写任务详细说明",
                    type: "warning"
                });
                return;
            }
            this.memberList.forEach(item=>{
                if(this.postData.principalId == item.memberUserId){
                    this.postData.principalName = item.memberUserName
                }
            })
            this.stageList.forEach(item=>{
                if(this.postData.projectStageId == item.id){
                    this.postData.projectStageName = item.stageName
                }
            })
            this.postData.startTime = common.timeParse(this.startTime)
            this.postData.endTime = common.timeParse(this.endTime)
            saveChange(this.$route.query.taskId,{
                ...this.postData
            }).then(res=>{
                if(res.code == 200){
                   this.$message({
                        message: res.message,
                        type: "success"
                    })
                    this.$router.go(-1);
                    // this.initData()
                    // this.getDetail()
                }
            })
        },
        // initData(){
        //     this.postData.projectStageId = "";
        //     this.postData.parentTaskCode = "";
        //     this.postData.taskName = "";
        //     this.postData.principalId = "";
        //     this.postData.principalName = "";
        //     this.postData.memberIds = [];
        //     this.startTime = "";
        //     this.endTime = "";
        //     this.postData.taskDesc = "";
        //     this.postData.remark = "";
        // },
        getDetail(){
            getChange(this.$route.query.taskId).then(res=>{
                this.detail = res.data;
                this.postData.taskCode = res.data.taskCode;
                this.postData.projectStageId = res.data.projectStageId;
                this.postData.parentTaskCode = res.data.parentTaskCode;
                this.postData.taskName = res.data.taskName;
                this.postData.principalId = res.data.principalId;
                this.postData.principalName = res.data.principalName;

                res.data.memberIds.forEach(item => {
                    this.postData.memberIds.push(item.memberId)
                });
                this.startTime = common.timeParseObj(res.data.startTime);
                this.endTime = common.timeParseObj(res.data.endTime);
                this.postData.taskDesc = res.data.taskDesc;
                this.postData.remark = res.data.remark;
            })
        },
        backStep(){
            this.$router.go(-1); 
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.segment .el-table__body-wrapper {
    padding: 40px 20px 35px;
    
}
.segment-area{
    font-size: 13px;
}
.changeTitle{
    text-align: center;
    background: rgb(238,241,246);
    margin-top: 15px;
    font-size: 16px;
}
.red{
    color: red;
}
.ignore-detail {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
}
</style>