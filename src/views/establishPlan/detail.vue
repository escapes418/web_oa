<template>
  <div class="sjb-form-wrapper">
        <div class="segment statistics">
            <div class="segment-header">
                基本信息
            </div>
            <div class="segment-area">
                <el-row>
                    <el-col :span="12" class="segment-brline">
                        <!-- <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">项目编号：</span>
                            <span class="right-con">
                                {{ detail.projectCode }}
                            </span>
                        </div> -->
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">项目名称：</span>
                            <span class="right-con">
                                {{ detail.projectName }}
                            </span>
                        </div>
                        
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">客户名称：</span>
                            <span class="right-con">
                                {{ detail.custName }}
                            </span>
                        </div>
                        
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">企业名称：</span>
                            <span class="right-con">
                                {{ detail.companyName }}
                            </span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">项目等级：</span>
                            <span class="right-con">
                                {{ detail.projectLevelName }}
                            </span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">承运货物：</span>
                            <span class="right-con">
                                {{ detail.carrierGoodsName }}
                            </span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">计划上线时间：</span>
                            <span class="right-con">
                                {{ detail.onlinePlanTime | stamp2TextDate}}
                            </span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">项目类型：</span>
                            <span class="right-con">
                                {{ detail.projectTypeName }}
                            </span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">是否新签合同：</span>
                            <span class="right-con">
                                {{ detail.contractNew == "1" ? "是" : "否" }}
                            </span>
                        </div>
                        <!-- <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">实际上线时间：</span>
                            <span class="right-con">
                                {{ detail.onlinePlanTime | stamp2TextDate}}
                            </span>
                        </div> -->
                        <!-- <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">商务助理：</span>
                            <span class="right-con">
                                {{ detail.businessAssistantName }}
                            </span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">VIP客服：</span>
                            <span class="right-con">
                                {{ detail.vipCustomerName }}
                            </span>
                        </div> -->
                    </el-col>
                    <el-col :span="12" class="segment-brline">
                        
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">月开票频次(次/月)：</span>
                            <span class="right-con">
                                {{ detail.invoicingFrequency }}
                            </span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">主客户名称：</span>
                            <span class="right-con">
                                {{ detail.mainCustName }}
                            </span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">计划月运费(万元/月)：</span>
                            <span class="right-con">
                                {{ detail.transExpensesPlan  }}
                            </span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">项目负责人：</span>
                            <span class="right-con">
                                {{ detail.newProjectLeaderName }}
                            </span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">归属部门：</span>
                            <span class="right-con">
                                {{ detail.newOfficeName }}
                            </span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">归属部门负责人：</span>
                            <span class="right-con">
                                {{ detail.officeLeaderName }}
                            </span>
                        </div>
                        <!-- <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">项目管理负责人：</span>
                            <span class="right-con">
                                {{ detail.projectManager }}
                            </span>
                        </div> -->
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">实施负责人：</span>
                            <span class="right-con">
                                {{ detail.implyLeaderName }}
                            </span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">合同名称：</span>
                            <span class="right-con">
                                {{ detail.contractNew == "1" ? "" : detail.contractName.join('，') }}
                            </span>
                        </div>
                        <!-- <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">清结算：</span>
                            <span class="right-con">
                                {{ detail.accountLeaderName }}
                            </span>
                        </div> -->
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="segment statistics">
            <div class="segment-header">
                一般要求
            </div>
            <div class="segment-area">
                <el-row>
                    <el-col :span="12" class="segment-brline">
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">开票方式：</span>
                            <span class="right-con">
                                {{ detail.invoiceModeName }}
                            </span>
                        </div>
                        <div class="clearfix  cominfo-item" v-if="detail.projectTrusteeshipt == 1"> 
                            <span class="left-title font-gray">托管渠道：</span>
                            <span class="right-con">
                                {{ detail.trusteeshiptChannelName }}
                            </span>
                        </div>
                    </el-col>
                    <el-col :span="12" class="segment-brline">
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">托管：</span>
                            <span class="right-con">
                                {{ detail.projectTrusteeshiptName }}
                            </span>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="segment statistics">
            <div class="segment-header">
                特殊要求
            </div>
            <div class="segment-area">
                <el-row>
                    <el-col :span="12" class="segment-brline">
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">自营：</span>
                            <span class="right-con">
                                {{ detail.selfMarketingName }}
                            </span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">经纪人：</span>
                            <span class="right-con">
                                {{ detail.projectAgentName }}
                            </span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">油气：</span>
                            <span class="right-con">
                                {{ detail.oilGasName }}
                            </span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">贸易：</span>
                            <span class="right-con">
                                {{ detail.projectTradeName }}
                            </span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">网商：</span>
                            <span class="right-con">
                                {{ detail.networkBusinessName }}
                            </span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">托盘：</span>
                            <span class="right-con">
                                {{ detail.projectTrayName }}
                            </span>
                        </div>
                    </el-col>
                    <el-col :span="12" class="segment-brline">
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">返点：</span>
                            <span class="right-con">
                                {{ detail.returnPointName }}
                            </span>
                        </div>
                        <div class="clearfix  cominfo-item" v-if="detail.returnPoint == 1">
                            <span class="left-title font-gray">返点比例（%）：</span>
                            <span class="right-con">
                                {{ detail.returnPointProportion }}
                            </span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">车队长：</span>
                            <span class="right-con">
                                {{ detail.truckLeaderName }}
                            </span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">叫车：</span>
                            <span class="right-con">
                                {{ detail.callTruckName }}
                            </span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">账期：</span>
                            <span class="right-con">
                                {{ detail.accountPeriodName }}
                            </span>
                        </div>
                        
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="segment statistics">
            <div class="segment-header">
                备注：
            </div>
            <div class="segment-area">
                <sjbtextarea
                    :rows="3"
                    textStyle="margin-top:20px;margin-bottom:20px"
                    placeholder="请输入内容"
                    :max="200"
                    :readonly="true"
                    v-model.trim="detail.remarks">
                </sjbtextarea>
            </div>
        </div>
        <div class="segment statistics">
            <div class="segment-header">
                <span class="left-red">*</span>
                联系人信息
            </div>
            <div class="segment-area">
                <div class="el-table__body-wrapper" style="padding: 15px 0;">
                    <el-table ref="multipleTable" border :data="contactList" tooltip-effect="dark" style="width:800px">
                        <el-table-column align="center" label="编号" width="50px">
                            <template slot-scope="scope">
                                <span>{{scope.row.index}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="联系人" width="320px">
                            <template slot-scope="scope">
                                <span>{{scope.row.linkmanName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="联系方式">
                            <template slot-scope="scope">
                                <span>{{scope.row.linkmanPhone}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="职位">
                            <template slot-scope="scope">
                                <span>{{scope.row.linkmanPost}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="备注（选填）">
                            <template slot-scope="scope">
                                <span>{{scope.row.linkmanPost}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <!-- <div class="pagination-container">
                    <el-pagination background @current-change="handleNodeChange" :current-page="pageNodeNo" :page-size="pageNodeSize" layout="total, prev, pager, next, jumper" :total="nodeTotal">
                    </el-pagination>
                </div> -->
            </div>
        </div>
        <div class="segment statistics part-wrap" v-if="!ISPUTIN">
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
                    <sjbtextarea :rows="3" :max="600" textStyle="width:420px;margin-top:20px;margin-bottom:20px" placeholder="请输入内容" v-model="comment">
                    </sjbtextarea>
                </div>
            </div>
        </template>
        <div class="segment statistics">
            <div class="sjb-foot-button">
                <template v-if="pathType === 'list'">
                    <!-- <el-button v-if="ISEDIT" size="medium" type="primary" @click="expBtn">提交</el-button> -->
                    <el-button v-if="ISEDIT" size="medium" type="primary" @click="editBtn">编辑</el-button>
                    <el-button v-if="ISCANCEL&&!ISEDIT" size="medium" type="warning" @click="dialogCanVisible = true">撤销</el-button>
                    <el-button v-if="ISDEL" size="medium" type="danger" @click="dialogDelVisible = true">删除</el-button>
                    <!-- <el-button v-if="ISPRINT" size="medium" type="primary" @click="createPdf">打印</el-button>
                    <el-button v-if="ISPRINT" size="medium" type="primary" @click="createPartPdf">部分打印</el-button> -->
                    <el-button size="medium" @click="backBtn">返回</el-button>
                </template>
                <template v-if="pathType === 'todo'">
                    <!-- <el-button v-if="ISME&&ISEDIT" size="medium" type="primary" @click="expBtn">提交</el-button> -->
                    <el-button v-if="ISME&&ISEDIT" size="medium" type="primary" @click="editBtn">编辑</el-button>
                    <el-button v-if="!ISEDIT&&ISME || !ISME" size="medium" type="primary" @click="agreeBtn">同意</el-button>
                    <el-button v-if="!ISEDIT&&ISME || !ISME" size="medium" type="info" @click="refuseBtn">驳回</el-button>
                    <!-- <el-button v-if="ISPRINT" size="medium" type="primary" @click="createPdf">打印</el-button>
                    <el-button v-if="ISPRINT" size="medium" type="primary" @click="createPartPdf">部分打印</el-button> -->
                    <el-button size="medium" @click="backBtn">返回</el-button>
                </template>
                <template v-if="pathType === 'done'">
                    <el-button v-if="ISCANCEL" size="medium" type="warning" @click="dialogCanVisible = true">撤销</el-button>
                    <!-- <el-button v-if="ISPRINT" size="medium" type="primary" @click="createPdf">打印</el-button>
                    <el-button v-if="ISPRINT" size="medium" type="primary" @click="createPartPdf">部分打印</el-button> -->
                    <el-button size="medium" @click="backBtn">返回</el-button>
                </template>
                <!-- <template v-if="pathType === 'report'">
                    <el-button v-if="ISPRINT" size="medium" type="primary" @click="createPdf">打印</el-button>
                    <el-button v-if="ISPRINT" size="medium" type="primary" @click="createPartPdf">部分打印</el-button>
                    <el-button size="medium" @click="backBtn">返回</el-button>
                </template> -->
            </div>
            <el-dialog title="系统提示？" width="25%" :visible.sync="dialogDelVisible">
                <span>确认删除该立项申请吗？</span>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="delBtn">确认</el-button>
                    <el-button @click="dialogDelVisible = false">取消</el-button>
                </span>
            </el-dialog>
            <el-dialog title="系统提示？" width="25%" :visible.sync="dialogCanVisible">
                <span>确认撤销该立项申请吗？</span>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="cancelBtn">确认</el-button>
                    <el-button @click="dialogCanVisible = false">取消</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import common from "@/utils/common";
import RedStar from "@/components/RedStar/RedStar.vue";
import sjbtextarea from '@/components/sjbTextarea/index.vue';
import { getDetail,proFlow,proCancel,proDel } from "@/api/establishPlan";
import { parseTime } from "@/utils";
import { toJS, fromJS, Map, List } from 'immutable';
import listQueryMix from '../../mixins/listQuery.mix';

export default {
    components: {
        RedStar,
        sjbtextarea
    },
    mixins: [listQueryMix],
    data() {
        let self = this;
        return {
            detail:{},
            companyList:[],
            contactList:[],
            flowLoglist:[],
            taskId:"",
            pathType:"",
            comment:"",
            projectApprovalFlowId:"",
            dialogCanVisible:false,
            dialogDelVisible:false
        };
    },
    computed:{
        ISME: function() {
            let result =
                this.userInfo.name == this.detail.applyPerName ? true : false;
            return result;
        },
        ISDEL: function() {
            let result =
                this.detail.projectApprovalStatus == 2 ||
                this.detail.projectApprovalStatus == 3 ||
                this.detail.projectApprovalStatus == 4
                ? true
                : false;
            return result;
        },
        ISEDIT: function() {
            let result = this.detail.modify == "modify" ? true : false;
            return result;
        },
        ISPUTIN: function() {
            let result = this.detail.projectApprovalStatus == 4 ? true : false;
            return result;
        },
        ISCANCEL: function() {
            let result = this.detail.projectApprovalStatus  == 2 ? true : false;
            return result;
        },
        ISPRINT: function() {
            let result =
                this.detail.projectApprovalStatus == 1 || this.detail.projectApprovalStatus == 2
                ? true
                : false;
            return result;
        }
    },
    watch: {
        
    },
    created() {
        this.userInfo = JSON.parse(localStorage.getItem("web_oa_userInfor"));
        if (this.$route.query.taskId) this.taskId = this.$route.query.taskId;
        if (this.$route.query.pathType) this.pathType = this.$route.query.pathType;
        if(this.$route.query.key) this.projectApprovalFlowId = this.$route.query.key
        // if (this.$route.query.key) {
        this.showNum = true;
        getDetail({
            projectApprovalFlowId: this.projectApprovalFlowId
        }).then(res => {
            this.detail = res.data.projectApprovalFlowResp;
            this.flowLoglist = res.data.flowLoglist;
            this.contactList = res.data.projectApprovalFlowResp.projectApprovalLinkman&&res.data.projectApprovalFlowResp.projectApprovalLinkman.map((i,key)=>{
                return {
                    ...i,
                    index:key+1
                }
            })
        });
        // }
    },
    mounted() {
        
    },
    methods: {
        backBtn() {
            this.$router.push({
                path: "/inforManage/projectList"
            });
        },
        editBtn() {
            this.$message({
                message: "请前往app端重新编辑立项申请单！",
                type: "warning"
            })
            // this.$router.push({
            //     path: "/me/reimForm",
            //     query: { key: this.$route.query.key }
            // });
        },
        agreeBtn() {
            proFlow({
                projectApprovalFlowId: this.$route.query.key,
                comment: this.comment,
                flag: "yes",
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
        refuseBtn() {
            if (this.comment == "") {
                this.$message({
                    message: "审批意见不能为空！",
                    type: "warning"
                });
                return;
            }
            proFlow({
                projectApprovalFlowId: this.$route.query.key,
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
            proCancel({
                procInsId: this.detail.procInsId,
                taskId: this.taskId || 0
            }).then(res => {
                if (res.code == 200) {
                    this.$message({
                        message: res.message,
                        type: "success"
                    });
                    this.dialogCanVisible = false
                    this.$router.go(-1);
                }
            });
            },
        delBtn() {
            proDel({
                projectApprovalFlowId: this.$route.query.key
            }).then(res => {
                if (res.code == 200) {
                    this.dialogDelVisible = false;
                    this.$message({
                        message: res.message,
                        type: "success"
                    });
                    // this.$router.push({
                    //     path:'/me/reim'
                    // })
                    this.$router.go(-1);
                }
            });
        }
    }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.segment .el-table__body-wrapper {
    padding: 40px 20px 35px;
}
.sum-title {
    font-size: 14px;
    margin: 15px 0 15px 0;
}
.sum-item {
    margin-left: 40px;
    font-size: 14px;
    width: 40%;
    .sum-name {
        line-height: 32px;
        color: #99a9bf;
    }
    .sum-value {
        float: right;
        line-height: 32px;
    }
}
.tabs{
    padding-left:15px; 
}
.amap-con{
    margin-top: 10px;
    height:450px
}
.item-value {
    display: inline-block;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background: white;
    padding-left: 7px;
    line-height: 30px;
    width: 250px;
    overflow:hidden;
}
.map-value {
    margin-top: 6px;
    display: inline-block;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background: white;
    padding-left: 7px;
    width: 350px;
    overflow:hidden;
}
.left-red {
    color: red;
    position: absolute;
    left: 15px;
}
.right-red {
    color: red;
    position: absolute;
    left: 49%;
}
.remark {
    margin-top: 25px;
    margin-bottom: 8px;
    background-color: #fdfdfd;
    border: 1px solid#F2F7FA;
}
.remarkTitle {
    margin-right: 100px;
    float: left;
    margin-top: 28px;
    margin-left: 5px;
}

.upload-container {
    margin: 50px;
}
.editor-slide-upload {
    margin-bottom: 15px;
}
.toolbar-item{
    margin-left: 10px
}
.item-label{
    color: #616367;
    font-size: 12px;
}
</style>