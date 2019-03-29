<template>
    <div class="sjb-form-wrapper">
    <div id="pdf-wrap">
        <div class="segment statistics">
            <div class="segment-header">
                基本信息
            </div>
            <div class="segment-area">
                <el-row>
                    <el-col :span="12" class="segment-brline">
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">流程编号：</span>
                            <span class="right-con">
                                {{ detail.procCode }}
                            </span>
                        </div>
                        <div class="clearfix cominfo-item">
                            <span class="left-title font-gray">申请人员：</span>
                            <span class="right-con">{{ detail.applyPerName }}</span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">所属部门：</span>
                            <span class="right-con">{{ detail.officeName }}</span>
                        </div>
                        <div class="clearfix  cominfo-item" v-if="detail.relType != 3">
                            <span class="left-title font-gray">项目名称：</span>
                            <span class="right-con">
                                {{ detail.projectName }}
                            </span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">报销类型：</span>
                            <span class="right-con">
                                {{ detail.travelExpenseTypeListName&&detail.travelExpenseTypeListName.join(',') }}
                            </span>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="clearfix cominfo-item">
                            <span class="left-title font-gray">申请日期：</span>
                            <span class="right-con">{{ detail.applyTime }}</span>
                        </div>
                        <div class="clearfix  cominfo-item" v-if="detail.relType != 3">
                            <span class="left-title font-gray">项目负责人：</span>
                            <span class="right-con">{{ detail.projectPersonel }}</span>
                        </div>

                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">预算合计：</span>
                            <span class="right-con">
                                {{ detail.budgetTotal | thousands(2) }}
                            </span>
                        </div>
                        <div class="clearfix  cominfo-item" v-if="detail.relationThemeName">
                            <span class="left-title font-gray">主题名称：</span>
                            <span class="right-con">
                                {{ detail.relationThemeName }}
                            </span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">随行人员：</span>
                            <span class="right-con">
                                {{ detail.entourageListName&&detail.entourageListName.join(',') }}
                            </span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">备注：</span>
                            <span class="right-con">
                                {{ detail.remarks }}
                            </span>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="segment statistics">
            <div class="segment-header">
                申请明细
            </div>
            <div class="segment-area">
                <div class="el-table__body-wrapper">
                    <el-table :data="budgetDetailList" border>
                        <el-table-column sortable prop="startDate" label="发生日期">
                            <template slot-scope="scope">
                                <span>{{scope.row.startDate | stamp2TextDate}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="起点" prop="startPointName">
                        </el-table-column>
                        <el-table-column label="结束日期">
                            <template slot-scope="scope">
                                <span>{{scope.row.endDate | stamp2TextDate}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="终点" prop="endPointName">
                        </el-table-column>
                        <el-table-column label="一级科目" prop="firstSubName" width="120">
                        </el-table-column>
                        <el-table-column label="二级科目" prop="secondSubName">
                        </el-table-column>
                        <el-table-column label="人数" prop="personNum">
                        </el-table-column>
                        <el-table-column label="天数" prop="dayNum">
                        </el-table-column>
                        <el-table-column label="预算金额" prop="expenseAmt">
                            <template slot-scope="scope">
                                <span class="font-orange">{{ scope.row.expenseAmt | thousands(2) }}元</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="备注" prop="remarks">
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <div class="segment statistics" v-if="!ISPUTIN">
            <div class="segment-header">
                流转信息
            </div>
            <div class="segment-area">
                <div class="el-table__body-wrapper">
                    <div class=" pt-20 pb-20">
                        <div class="log-w" v-for="(item,index) in flowLoglist" :key="index" :class="{'sub-row':(index+1)!==flowLoglist.length}">
                            <div class="log-dot">
                                <div class="dot-core"></div>
                            </div>
                            <div class="log-text">
                                <div class="log-title">
                                    <span class="color-black bold">{{item.assigneeName}}</span>
                                    <!-- 审批bug的补丁 -->
                                    <span class="log-header" v-if="index==0">{{item.activityName}}</span>
                                    <span class="log-header" v-else>{{item.comment?"已审批":"待审批"}}</span>
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
                        textStyle="width:420px;margin-top:20px;margin-bottom:20px"
                        :max="300"
                        placeholder="请输入内容"
                        v-model="comment">
                    </sjbtextarea>
                </div>
            </div>
        </template>
    </div>
        <div class="segment statistics">
            <div class="sjb-foot-button">
                <template v-if="pathType === 'list'">
                    <!-- <el-button v-if="ISEDIT" size="medium" type="primary" @click="expBtn">提交</el-button> -->
                    <el-button v-if="ISEDIT" size="medium" type="primary" @click="editBtn">编辑</el-button>
                    <el-button v-if="ISCANCEL&&!ISEDIT" size="medium" type="warning" @click="cancelBtn">撤销</el-button>
                    <el-button v-if="ISDEL" size="medium" type="danger" @click="dialogDelVisible = true">删除</el-button>
                    <!-- <el-button v-if="ISPRINT" size="medium" type="primary" @click="createPdf">打印</el-button> -->
                    <el-button size="medium" @click="backBtn">返回</el-button>
                </template>
                <template v-if="pathType === 'todo'">
                    <!-- <el-button v-if="ISME&&ISEDIT" size="medium" type="primary" @click="expBtn">提交</el-button> -->
                    <el-button v-if="ISME&&ISEDIT" size="medium" type="primary" @click="editBtn">编辑</el-button>
                    <el-button v-if="!ISEDIT&&ISME || !ISME" size="medium" type="primary" @click="agreeBtn">同意</el-button>
                    <el-button v-if="!ISEDIT&&ISME || !ISME" size="medium" type="info" @click="refuseBtn">驳回</el-button>
                    <el-button size="medium" @click="backBtn">返回</el-button>
                </template>
                <template v-if="pathType === 'done'">
                    <el-button v-if="ISCANCEL" size="medium" type="warning" @click="cancelBtn">撤销</el-button>
                    <el-button size="medium" @click="backBtn">返回</el-button>
                </template>
            </div>
        </div>
    <el-dialog title="系统提示？" width="25%" :visible.sync="dialogDelVisible">
      <span>确认删除该出差申请吗？</span>
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
    retravelFlowDetail, //Web出差申请-查询审批流程详情
    travelFlowStartWorkFlow, //Web出差申请-草稿发起申请
    travelFlowCompleteTask,//Web端出差申请-同意/驳回
    travelFlowRepealTask,//Web出差申请-流程撤销
    travelFlowRepealApply, //Web端出差申请-删除单据
} from "@/api/traveling";
import { parseTime } from "@/utils";
import { travelDetailVali } from './travel.util';
import sjbtextarea from '@/components/sjbTextarea';

export default {
    name: "complexTable",
    components: {
        sjbtextarea
    },
    data() {
        return {
            flowDetailList: [],
            budgetDetailList: [],
            flowLoglist: [],
            detail: {},
            comment: "",
            taskId: 0,
            pathType:"",
            dialogDelVisible:false,
            userInfo: "",
        };
    },
    computed: {
        ISME:function(){
            let result = this.userInfo.name == this.detail.applyPerName ? true : false
            return result
        },
        ISDEL:function(){
            let result = this.detail.recpStatus == 2 || this.detail.recpStatus == 3 || this.detail.recpStatus == 4 ? true : false
            return result
        },
        ISEDIT:function(){
            let result = this.detail.modify == 'modify' ? true :false;
            return result
        },
        ISPUTIN:function(){
            let result = this.detail.recpStatus == 4 ? true :false
            return result
        },
        ISCANCEL:function(){
            let result = this.detail.recpStatus == 2 ? true:false
            return result
        },
        ISPRINT:function(){
            let result = this.detail.recpStatus == 1  ? true:false
            return result
        }
    },
    created() {
        this.userInfo = JSON.parse(localStorage.getItem("web_oa_userInfor"));
        if(this.$route.query.taskId) this.taskId = this.$route.query.taskId
        if(this.$route.query.pathType) this.pathType = this.$route.query.pathType
        retravelFlowDetail({
            travelFlowId: this.$route.query.key
        }).then(res => {
            this.detail = res.data.travelFlowresponse;
            res.data.budgetDetailList = res.data.budgetDetailList || []
            this.budgetDetailList = res.data.budgetDetailList;
            res.data.flowLoglist = res.data.flowLoglist || [];
            this.flowLoglist = res.data.flowLoglist;
        });
    },
    methods: {
        backBtn() {
            this.$router.go(-1)
        },
        // expBtn() {
        //     if(travelDetailVali(this)){
        //         travelFlowStartWorkFlow({
        //             expenseFlowId: this.$route.query.key,
        //             procInsId: this.detail.procInsId
        //         }).then(res => {
        //             if (res.status == 0) {
        //                 this.$message({
        //                     message: res.message,
        //                     type: "success"
        //                 });
        //                 this.$router.push({ path: "/me/travelingList" });
        //             }
        //         });
        //     }
        // },
        editBtn() {
            this.$router.push({
                path: "/me/travelingForm",
                query: { key: this.$route.query.key }
            });
        },
        agreeBtn() {
            if(this.comment.length>100) {
                this.$message({
                    message:'输入字符超出限额，请重新输入！',
                    type:'warning'
                })
                return 
            }
            travelFlowCompleteTask({
                travelFlowId: this.$route.query.key,
                comment: this.comment,
                flag: "yes",
                procInsId: this.detail.procInsId
            }).then(res => {
                if (res.status == 0) {
                    this.$message({
                        message: res.message,
                        type: "success"
                    });
                    this.$router.go(-1)
                }
            });
        },
        refuseBtn() {
            if (this.comment == "") {
                this.$message({
                    message: "审批意见不能为空！",
                    type: "warning"
                });
                return
            }
            if(this.comment.length>100) {
                this.$message({
                    message:'输入字符超出限额，请重新输入！',
                    type:'warning'
                })
                return 
            }
            
            travelFlowCompleteTask({
                travelFlowId : this.$route.query.key,
                comment: this.comment,
                flag: "no",
                procInsId: this.detail.procInsId
            }).then(res => {
                if (res.status == 0) {
                    this.$message({
                        message: res.message,
                        type: "success"
                    });
                    this.$router.go(-1);
                }
            });
        },
        cancelBtn() {
            // console.log(this.taskId);
            travelFlowRepealTask({
                procInsId: this.detail.procInsId,
                taskId: this.taskId || 0
            }).then(res => {
                if (res.status == 0) {
                    this.$message({
                        message: res.message,
                        type: "success"
                    });
                    this.$router.go(-1);
                }
            });
        },
        createPdf(){
            var pdfstr = document.getElementById('pdf-wrap')
            // 2. 复制给body，并执行window.print打印功能
            var newstr = pdfstr.innerHTML
            // 3. 还原：将旧的页面储存起来，当打印完成后返给给页面。
            var oldstr = document.body.innerHTML
            document.body.innerHTML = newstr
            window.print()
            window.location.reload()
            document.body.innerHTML = oldstr
            return false
        },
        delBtn() {
            travelFlowRepealApply({
                travelFlowId: this.$route.query.key
            }).then(res => {
                if (res.status == 0) {
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

