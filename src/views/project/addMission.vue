<template>
    <div class="sjb-form-wrapper">
        <div class="segment statistics">
            <div class="segment-header">
                任务基本信息
            </div>
            <div class="segment-area">
                <el-row>
                    <el-col :span="12" class="segment-brline">
                        <RedStar label="上级任务编号：" v-if="$route.query.parentTaskCode">
                            <span class="right-con">{{$route.query.parentTaskCode || ""}}</span>
                        </RedStar>
                        <RedStar label="任务名称：" :required="true">
                            <el-input type="text" placeholder="请输入" style="width:250px;" v-model.trim="postData.taskName" :maxlength="32"></el-input>
                        </RedStar>
                        <RedStar label="任务负责人：" :required="true">
                            <el-select clearable class="filter-item" v-model="postData.principalId" placeholder="请选择" style="width:250px;">
                                <el-option v-for="item in memberList" :label="item.memberUserName" :value="item.memberUserId" :key="item.memberUserId">
                                </el-option>
                            </el-select>
                        </RedStar>
                        <RedStar label="开始日期：">
                            <el-date-picker
                                v-model="startTime"
                                style="width:250px;"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                        </RedStar>
                        <RedStar label="任务详细说明：" :required="true">
                            <sjbtextarea 
                                v-model.trim="postData.taskDesc" 
                                placeholder="请输入" 
                                :row="3" 
                                :max="200"
                                textStyle="width:250px">
                            </sjbtextarea>
                        </RedStar>
                    </el-col>
                    <el-col :span="12" class="segment-brline">
                        <RedStar label="所属阶段：" :required="true">
                            <el-select clearable class="filter-item" v-model="postData.projectStageId" placeholder="请选择" style="width:250px;">
                                <el-option v-for="item in stageList" :label="item.stageName" :value="item.id" :key="item.id">
                                </el-option>
                            </el-select>
                        </RedStar>
                        <RedStar label="参与人：">
                            <el-select clearable multiple filterable class="filter-item " v-model="postData.memberIds" placeholder="请选择" style="width:250px;">
                                <el-option v-for="item in memberList" :label="item.memberUserName" :value="item.id" :key="item.id">
                                </el-option>
                            </el-select>
                        </RedStar>
                        <RedStar label="截止日期：" :required="true">
                            <el-date-picker
                                v-model="endTime"
                                style="width:250px;"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                        </RedStar>
                        <RedStar label="备注：">
                            <span class="right-con">
                                <sjbtextarea 
                                    v-model.trim="postData.remark" 
                                    placeholder="请输入" 
                                    :row="3" 
                                    :max="200"
                                    textStyle="width:250px"></sjbtextarea>
                            </span>
                        </RedStar>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="segment statistics">
            <div class="segment-header">
                附件
            </div>
            <div class="segment-area">
                <div class="el-table__body-wrapper">
                    <el-upload class="upload-img" :action="fileURL" :headers='{ sessionid:token}' :on-remove="handleRemove" :before-upload = "beforeUpload" :on-success="handleSuccess" :file-list="attachment">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">{{uploadTips}}</div>
                    </el-upload>
                </div>
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
import { mapState, mapGetters } from "vuex";
import RedStar from '@/components/RedStar/RedStar.vue';
import sjbtextarea from '@/components/sjbTextarea';
import common from '@/utils/common';
import config from '@/utils/config';
import utils from '@/utils/utils';
import { getMissionMember,getMissionStage,saveMission } from '@/api/project';

export default {
    components: {
        RedStar,
        sjbtextarea
    },
    data(){
        return{
            fileURL: process.env.BASE_API + '/webCommonInfo/fileUpload',
            postData:{
                projectStageId:"",
                parentTaskCode:"",
                taskName:"",
                principalId:"",
                principalName:"",
                memberIds:[],
                startTime:"",
                endTime:"",
                taskDesc:"",
                remark:"",
                pmsAttachment:[]
            },
            startTime:"",
            endTime:"",
            uploadTips: config.tips,
            memberList:[],
            stageList:[],
            attachment:[]
        }
    },
    computed:{
        ...mapState({
            token: state => state.user.token,
        }),
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
    },
    methods: {
        handleSuccess(res, file, fileList) {
            if(res.data.resCode == 1){
                let url =res.data.storfiles.serverUrl + res.data.storfiles.url
                this.attachment.push({ originUrl:res.data.storfiles.url ,name:file.name,url:url,uid:file.uid})
            }else{
                this.$message({
                    message:  res.data.resDesc,
                    type: 'error',
                    duration:10000
                })
                this.attachment = []
            }
        },
        // 附件移除
        handleRemove(file, fileList) {
            this.attachment.map((item, index) => {
                if (item.uid == file.uid) {
                    this.attachment.splice(index, 1)
                }
            })
        },
        beforeUpload(file) {
            return utils.handleImgError(file)
        },
        submit(){
            this.memberList.map(item=>{
                if(this.postData.principalId == item.memberUserId){
                    this.postData.principalName = item.memberUserName
                }
            })
            this.postData.parentTaskCode = this.$route.query.parentTaskCode
            this.postData.pmsAttachment = []
            this.attachment.forEach(item=>{
                let obj = {}
                obj.fileName = item.name
                obj.attachmentUrl = item.originUrl
                this.postData.pmsAttachment.push(obj)
            })
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
            this.postData.startTime = common.timeParse(this.startTime)
            this.postData.endTime = common.timeParse(this.endTime)
            saveMission({
                ...this.postData
            }).then(res=>{
                if(res.code == 200){
                   this.$message({
                        message: res.message,
                        type: "success"
                    })
                    this.$router.go(-1); 
                }
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
</style>