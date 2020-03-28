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
                            <span class="left-title font-gray">申请人员：</span>
                            <span class="right-con">{{ detail.applyPerName }}</span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">所属部门：</span>
                            <span class="right-con">{{ detail.officeName }}</span>
                        </div>
                        <div class="clearfix  cominfo-item" >
                            <span class="left-title font-gray">办理类型：</span>
                            <span class="right-con">{{ detail.handleTypeValue }}</span>
                        </div>
                        
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">项目名称：</span>
                            <span class="right-con">{{ detail.projectName }}</span>
                        </div>
                        <div class="clearfix  cominfo-item" v-if="detail.handleType == 1">
                            <span class="left-title font-gray">资源类型：</span>
                            <span class="right-con">{{ detail.resourcesTypeValue }}</span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">期望抵达时间：</span>
                            <span class="right-con">{{ expectDate | stamp2TextDateFull }}</span>
                        </div>
                        <div class="clearfix  cominfo-item" v-if="detail.handleType == 1">
                            <span class="left-title font-gray">费用合计：</span>
                            <span class="right-con">{{ detail.amountSum }}</span>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">流程编号：</span>
                            <span class="right-con">{{ detail.procCode}}</span>
                        </div>
                        <div class="clearfix cominfo-item">
                            <span class="left-title font-gray">申请日期：</span>
                            <span class="right-con">{{ detail.applyTime}}</span>
                        </div>
                        <div class="clearfix cominfo-item">
                            <span class="left-title font-gray">所属岗位：</span>
                            <span class="right-con">{{ detail.postName }}</span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">项目负责人：</span>
                            <span class="right-con">{{ detail.projectPersonel }}</span>
                        </div>
                        <div class="clearfix  cominfo-item" v-if="detail.handleType">
                            <span class="left-title font-gray">需求数量：</span>
                            <span class="right-con">{{ detail.personelNum }}</span>
                        </div>
                        <!-- <div class="clearfix  cominfo-item" v-if="detail.handleType == 2">
                            <span class="left-title font-gray">满足数量：</span>
                            <span class="right-con">{{ detail.personelNum }}</span>
                        </div> -->
                        <div class="clearfix  cominfo-item" v-if="detail.handleType == 1">
                            <span class="left-title font-gray">预计时长：</span>
                            <span class="right-con">{{ detail.timeLong }}</span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">备注：</span>
                            <span class="right-con">{{ detail.remarks }}</span>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="segment statistics">
            <div class="segment-header">
                指派明细
            </div>
            <div class="segment-area">
                <div class="el-table__body-wrapper">
                    <el-table :data="detail.resourcesAssignResponseList" border>
                        <el-table-column label="对象" prop="targetAssignName" width="200">
                        </el-table-column>
                        <el-table-column label="满足数量" prop="personelNum" width="200">
                        </el-table-column>
                        <el-table-column label="意见" prop="remarks">
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <!-- <div class="segment statistics">
            <div class="segment-header">
                审批历史
            </div>
            <div class="segment-area">
                <div class="el-table__body-wrapper">
                    <el-table :data="budgetDetailList" >
                        <el-table-column label="执行环节" prop="startDate" width="200">
                        </el-table-column>
                        <el-table-column label="审批人" prop="startPointName" width="200">
                        </el-table-column>
                        <el-table-column label="审批结果" prop="endDate">
                            <template slot-scope="scope">
                                <el-tag v-if="scope.row.custStatus == '已报备'" type="success">{{scope.row.custStatus}}</el-tag>
                                <el-tag v-else type="warning">驳回</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column label="审批意见" prop="endDate">
                        </el-table-column>
                        <el-table-column label="开始时间" prop="endDate">
                        </el-table-column>
                        <el-table-column label="结束时间" prop="endDate">
                        </el-table-column>
                        <el-table-column label="耗时" prop="endDate">
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div> -->
        <div class="segment statistics" v-if="!ISPUTIN">
            <div class="segment-header">
                流转信息
            </div>
            <div class="segment-area">
                <div class="el-table__body-wrapper">
                    <div class=" pt-20 pb-20">
                        <div class="log-w" v-for="(item,index) in flowLoglist" :key="index" :class="{'sub-row':item.activityName != '待审批'}">
                            <div class="log-dot">
                                <div class="dot-core"></div>
                            </div>
                            <div class="log-text">
                                <div class="log-title">
                                    <span class="color-black bold">{{item.assigneeName}}</span>
                                    <span class="log-header">{{item.activityName}}</span>
                                </div>
                                <div class="state-item">
                                    <span class="font-size14">{{item.endTime}}</span>
                                    <span v-if="item.durationTime" class="state-name">历时:{{item.durationTime}}</span>
                                </div>
                                <p v-if="item.comment" class="font-gray font-size14 mt-2">{{item.comment}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <template v-if="pathType === 'todo'">
            <div class="segment statistics" v-if="!ISEDIT&&ISME || !ISME">
                <div class="segment-header">
                    审批意见
                </div>
                <div class="segment-area">
                    <sjbtextarea
                        :rows="3"
                        :max="600"
                        textStyle="width:420px;margin-top:20px;margin-bottom:20px"
                        placeholder="请输入内容"
                        v-model="comment">
                    </sjbtextarea>
                </div>
            </div>
        </template>
        <template v-if="ISASSIGN">
            <div class="segment statistics" >
                <div class="segment-header">
                    审批意见
                </div>
                <div class="segment-area"  v-if="isReady">
                    <Appoint ref="appoint" :itemData="itemData"></Appoint>
                </div>
            </div>
        </template>
        <div class="segment statistics">
            <div class="sjb-foot-button">
                <template v-if="pathType === 'list'">
                    <!-- <el-button v-if="ISEDIT" size="medium" type="primary" @click="expBtn">提交</el-button> -->
                    <el-button v-if="ISEDIT" size="medium" type="primary" @click="editBtn">编辑</el-button>
                    <el-button v-if="ISCANCEL&&!ISEDIT" size="medium" type="warning" @click="cancelBtn">撤销</el-button>
                    <el-button v-if="ISDEL" size="medium" type="danger" @click="dialogDelVisible = true">删除</el-button>
                    <el-button size="medium" @click="backBtn">返回</el-button>
                </template>
                <template v-if="pathType === 'todo'">
                    <!-- <el-button v-if="ISME&&ISEDIT" size="medium" type="primary" @click="expBtn">提交</el-button> -->
                    <el-button v-if="ISME&&ISEDIT" size="medium" type="primary" @click="editBtn">编辑</el-button>
                    <el-button v-if="!ISEDIT&&ISME || !ISME" size="medium" type="primary" @click="agreeBtn">同意</el-button>
                    <el-button v-if="ISBACK" size="medium" type="info" @click="refuseBtn">驳回</el-button>
                    <el-button size="medium" @click="backBtn">返回</el-button>
                </template>
                <template v-if="pathType === 'done'">
                    <el-button v-if="ISCANCEL" size="medium" type="warning" @click="cancelBtn">撤销</el-button>
                    <el-button size="medium" @click="backBtn">返回</el-button>
                </template>
            </div>
        </div>
    <el-dialog title="系统提示？" :visible.sync="dialogDelVisible" width="25%">
      <span>确认删除该资源申请吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="delBtn">确认</el-button>
        <el-button @click="dialogDelVisible = false">取消</el-button>
      </span>
    </el-dialog>
    </div>
</template>

<script>
import common from "@/utils/common";
import {
    resourcesHandleInfoDetail,//WEB端资源办理-资源申请流程详细信息
    resourcesHandleFlowCompleteTask, //Web端资源办理-同意
    resourcesHandleFlowRepealTask,//Web端资源办理-流程撤销
    deleteResourcesHandleInfo, //WEB端资源办理-删除
} from "@/api/resHandle";
import { parseTime } from "@/utils";
import Appoint from "@/components/Appoint";
import sjbtextarea from '@/components/sjbTextarea'
export default {
    name: "complexTable",
    components: { 
        Appoint,
        sjbtextarea
    },
    data() {
        return {
            applyType: 2,//1被动发起，2主动发起
            flowDetailList: [],
            itemData:[],
            budgetDetailList: [],
            flowLoglist: [],
            detail: {},
            comment: "",
            pathType:"",
            dialogDelVisible:false,
            userInfo: "",
            expectDate:"",
            isReady:false,
            taskId: "",
        };
    },
    computed: {
        // resourcesHandleStatus 1审批结束2审批中3单据被驳回4单据保存
        ISME:function(){//是否为自己
            let result = this.userInfo.name == this.detail.applyPerName ? true : false
            return result
        },
        ISDEL:function(){//删除
            let result = this.detail.resourcesHandleStatus == 2 || this.detail.resourcesHandleStatus == 3 || this.detail.resourcesHandleStatus == 4 ? true : false
            return result
        },
        ISEDIT:function(){//是否可编辑
            let result = this.detail.isDeit == 1 ? true :false;
            return result
        },
        ISPUTIN:function(){//查看草稿
            let result = this.detail.resourcesHandleStatus == 4 ? true :false
            return result
        },
        ISCANCEL:function(){//撤销
            let result = this.detail.isCancel == 1 ? true:false
            return result
        },
        ISASSIGN:function(){//可指派
            let result = this.detail.isAssign == 1 && this.$route.query.pathType == "todo" ? true:false
            return result
        },
        ISBACK:function(){//可驳回
            let result = this.detail.isBack == 1 ? true:false
            return result
        },
        
    },
    created() {
        this.userInfo = JSON.parse(localStorage.getItem("web_oa_userInfor"));
        if(this.$route.query.taskId) this.taskId = this.$route.query.taskId
        if(this.$route.query.pathType) this.pathType = this.$route.query.pathType
        resourcesHandleInfoDetail({
            resHandleFlowId: this.$route.query.key,
            // taskId: this.taskId
        }).then(res => {
            this.detail = res.data.resourcesHandleFlowResponse;
            this.budgetDetailList = res.data.budgetDetailList;
            this.flowLoglist = res.data.flowLoglist || [];
            if(this.detail.expectDate){
                this.expectDate = this.detail.expectDate
            }
            if(this.ISASSIGN){
                this.itemData = this.getAssignList(res.data.resourcesHandleFlowResponse.resourcesAssignResponseList)
            }
            this.isReady = true;
        });
    },
    methods: {
        backBtn() {
            this.$router.go(-1);
        },
        expBtn() {
            travelFlowStartWorkFlow({
                expenseFormId: this.$route.query.key,
                procInsId: this.detail.procInsId
            }).then(res => {
                if (res.code == 200) {
                    this.$message({
                        message: res.message,
                        type: "success"
                    });
                    this.$router.go(-1);
                }
            });
        },
        editBtn() {
            this.$router.push({
                path: "/me/resHandleForm",
                query: { key: this.$route.query.key }
            });
        },
        agreeBtn() {
            var reqTabData = []
            if(this.ISASSIGN){//可指派
                var tableData = this.$refs['appoint'].componentValiAndReturn();
                if(!tableData.flag) return
                reqTabData = tableData.afterFilterEmptyArr;
                if(reqTabData.length == 0){
                    this.$message({
                        message:"请指派人员",
                        type: "error"
                    });
                    return
                }
            }
            resourcesHandleFlowCompleteTask({
                resHandleFlowId: this.$route.query.key,
                comment: this.comment,
                flag: "yes",
                assignList: reqTabData,
                procInsId: this.detail.procInsId
            }).then(res => {
                if (res.code == 200) {
                    this.$message({
                        message: res.message,
                        type: "success"
                    });
                    this.$router.go(-1);
                }
            });
        },
        getAssignList(data){
            var newArr = []
            data.forEach((item,idx)=>{
                if(item.sourceAssign == this.userInfo.id){
                    newArr.push({
                        personelNum:item.personelNum,
                        remarks:item.remarks,
                        targetAssign:item.targetAssign,
                        targetAssignName:item.targetAssignName,
                    })
                }
            })
            return newArr
        },
        refuseBtn() {
            if (!this.comment) {
                this.$message({
                    message: "审批意见不能为空！",
                    type: "warning"
                });
                return
            }
            resourcesHandleFlowCompleteTask({
                resHandleFlowId: this.$route.query.key,
                comment: this.comment,
                flag: "no",
                procInsId: this.detail.procInsId
            }).then(res => {
                if (res.code == 200) {
                    this.$message({
                        message: res.message,
                        type: "success"
                    });
                    this.$router.go(-1);
                }
            });
        },
        cancelBtn() {
            resourcesHandleFlowRepealTask({
                procInsId: this.detail.procInsId,
                taskId: this.taskId || 0
            }).then(res => {
                if (res.code == 200) {
                    this.$message({
                        message: res.message,
                        type: "success"
                    });
                    this.$router.go(-1);
                }
            });
        },
        delBtn() {
            deleteResourcesHandleInfo({
                resHandleFlowId: this.$route.query.key
            }).then(res => {
                if (res.code == 200) {
                    this.$message({
                        message: res.message,
                        type: "success"
                    });
                    this.$router.go(-1);
                }
            });
        },
    },
    mounted() {}
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.segment .el-table__body-wrapper {
    padding: 40px 20px 35px;
}
</style>