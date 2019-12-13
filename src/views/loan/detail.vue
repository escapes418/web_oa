<template>
    <div class="sjb-form-wrapper">
        <div id="pdf-wrap">
            <div class="segment statistics part-wrap" id="part-wrap">
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
                                <span class="left-title font-gray">借款人：</span><span class="right-con">{{ detail.applyPerName }}</span>
                                <span style="margin-left:55%">
                                    <el-button type="primary" size="small" @click="showloanMember">查看历史借款人</el-button>
                                </span>
                            </div>
                            <div class="clearfix  cominfo-item">
                                <span class="left-title font-gray">岗位名称：</span><span class="right-con">{{ detail.officeName }}</span>
                            </div>
                            <div class="clearfix  cominfo-item">
                                <span class="left-title font-gray">所属公司：</span>
                                <span class="right-con">
                                {{ detail.projectName }}
                                </span>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="clearfix cominfo-item">
                                <span class="left-title font-gray">借款时间：</span><span class="right-con">{{ detail.applyTime | stamp2TextDate}}</span>
                            </div>
                            <div class="clearfix cominfo-item">
                                <span class="left-title font-gray">所属部门：</span><span class="right-con">{{ detail.officeName }}</span>
                            </div>
                            <div class="clearfix  cominfo-item">
                                <span class="left-title font-gray">项目名称：</span><span class="right-con">{{  detail.projectName }}</span>
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
                    借款信息
                </div>
                <div class="segment-area">
                    <div class="el-table__body-wrapper">
                        <el-row>
                            <el-col :span="12" class="segment-brline">
                                <div class="clearfix cominfo-item">
                                    <span class="left-title font-gray">收款方：</span><span class="right-con">{{ detail.payeeName }}</span>
                                </div>
                                <div class="clearfix cominfo-item">
                                    <span class="left-title font-gray">开户行：</span><span class="right-con">{{ detail.payeeOpeningBank }}</span>
                                </div>
                                <div class="clearfix  cominfo-item">
                                    <span class="left-title font-gray">预计还款时间：</span><span class="right-con">{{ detail.planRepayTime | stamp2TextDate }}</span>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="clearfix cominfo-item">
                                    <span class="left-title font-gray">收款账号：</span><span class="right-con">{{ detail.payeeCardNum }}</span>
                                </div>
                                <div class="clearfix cominfo-item">
                                    <span class="left-title font-gray">借款金额：</span><span class="right-con">{{ detail.loanAmount }}</span>
                                </div>
                                <div class="clearfix  cominfo-item">
                                    <span class="left-title font-gray">借款事由：</span><span class="right-con">{{ detail.loanReason }}</span>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </div>
            <div class="segment statistics">
                <div class="segment-header">
                    还款信息
                </div>
                <div class="segment-area">
                    <div class="el-table__body-wrapper">
                        <el-table :data="detail.repaymentRecordResponses " border fit highlight-current-row style="width: 100%">
                            <el-table-column align="center" label="流程编号" width="150px">
                                <template slot-scope="scope">
                                    <span>{{scope.row.procCode}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column width="320px" align="center" label="流程名称">
                                <template slot-scope="scope">
                                    <a>{{scope.row.procName}}</a>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="还款人">
                                <template slot-scope="scope">
                                    <span>{{scope.row.repayPersonName}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="还款时间">
                                <template slot-scope="scope">
                                    <span>{{scope.row.repayTime | stamp2TextDate}}</span>
                                </template>
                            </el-table-column>
                            
                            <el-table-column width="120px" align="center" label="还款金额">
                                <template slot-scope="scope">
                                    <span>{{scope.row.repayAmount}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column width="120px" align="center" label="待还款金额">
                                <template slot-scope="scope">
                                    <span>{{scope.row.remainingRepayAmount}}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
            <div class="segment statistics part-wrap" id="part-wrap" v-if="!ISPUTIN">
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
                                        <span class="log-header" v-else>{{item.startTime&&item.endTime?"已审批":item.startTime&&!item.endTime?"待审批":!item.startTime&&!item.endTime?"已删除":""}}</span>
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
            <div class="segment statistics part-wrap" v-if="expenseAttachment.length > 0">
                <div class="segment-header">
                    附件
                </div>
                <div class="segment-area">
                    <div class="el-table__body-wrapper" id="imgList" @click="showImg">
                        <div v-for="(val,index) in expenseAttachment" :key="index" style="width:40%;margin-bottom:15px">
                            <div v-if="val.url != ''" class="upload-list">
                                <span class="img-font">{{val.name}}</span>
                                <el-button v-if="['png','gif','jpeg','jpg'].indexOf((val.name.split('.')[val.name.split('.').length - 1]).toLowerCase()) == -1" type="text" @click="downAttach(val)" style="float:right">下载</el-button>
                                <el-button v-else type="text" style="float:right" @click="showImg(index,1)">
                                    查看<img :src="val.url" style="display:none">
                                </el-button>
                                <!-- <img :src="val.url" style="display:none"> -->
                                <!-- <el-button type="text" style="float:right" @click="downAttach(val)">下载</el-button> -->
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
        <div class="segment statistics">
            <div class="sjb-foot-button">
                <template v-if="pathType === 'list'">
                    
                    <el-button v-if="ISEDIT&&!ISBACK" size="medium" type="primary" @click="editBtn">编辑</el-button>
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

        <el-dialog title="历史借款人" :visible.sync="dialogLoan">
            <el-table :data="loanMemberList" border fit highlight-current-row style="width: 100%">
                <el-table-column align="center" label="开始负责时间">
                    <template slot-scope="scope">
                        <span style="color:#409EFF;cursor: Pointer;">{{scope.row.createTime | stamp2TextDateFull}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="人员姓名">
                    <template slot-scope="scope">
                        <span class="ignore-detail" :title="scope.row.contractLeader">{{scope.row.contractLeader}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="登录账号">
                    <template slot-scope="scope">
                        <span>{{scope.row.loginName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="部门">
                    <template slot-scope="scope">
                        <span class="ignore-detail" :title="scope.row.officeName">{{scope.row.officeName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="修改人">
                    <template slot-scope="scope">
                        <span class="ignore-detail" :title="scope.row.createByName">{{scope.row.createByName}}</span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-container">
                <el-pagination background @current-change="handleCurrentChange" :current-page="pageNo" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </el-dialog>

        <el-dialog title="系统提示？" width="25%" :visible.sync="dialogDelVisible">
            <span>确认删除该报销单吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="delBtn">确认</el-button>
                <el-button @click="dialogDelVisible = false">取消</el-button>
            </span>
        </el-dialog>
  </div>
</template>

<script>
import common from '@/utils/common';
import { getDetail  , loanFlow , loanCancel , loanDel,getLoanMember } from '@/api/loan';
import { toJS, fromJS, Map, List } from 'immutable';
import { parseTime } from '@/utils';
import { mapState } from 'vuex';
import sjbtextarea from '@/components/sjbTextarea/index.vue';
import "viewerjs/dist/viewer.css";
import Viewer from 'viewerjs';

export default {
    components: {
        sjbtextarea
    },
    data() {
        return {
            expenseAttachment:[],
            flowLoglist:[],
            detail:{},
            comment:'',
            taskId:0,
            pathType:"",
            dialogDelVisible:false,
            finish:false,

            dialogLoan:false,
            loanMemberList:[],
            total:0,
            pageNo:1,
            pageSize:10,
            listQuery:{
                loanId:''
            },
        }
    },
    computed:{
        ISME:function(){
            let result = this.userInfo.name == this.detail.applyPerName ? true : false
            return result
        },
        ISDEL:function(){
            let result = this.detail.loanFlowStatus == 2 || this.detail.loanFlowStatus == 3 || this.detail.loanFlowStatus == 4 ? true : false
            return result
        },
        ISEDIT:function(){
            let result = this.detail.modify == 'modify' ? true :false;
            return result
        },
        ISBACK:function(){
            let result = this.detail.costSenterBack == 'back' ? true :false;
            return result
        },
        ISPUTIN:function(){
            let result = this.detail.loanFlowStatus == 4 ? true :false
            return result
        },
        ISCANCEL:function(){
            let result = this.detail.loanFlowStatus == 2 ? true:false
            return result
        },
        ISPRINT:function(){
            let result = this.detail.expenseStatus == 1  ? true:false
            return result
        }
    },
    created(){
        this.userInfo = JSON.parse(localStorage.getItem("web_oa_userInfor"));
        if(this.$route.query.taskId) this.taskId = this.$route.query.taskId
        if(this.$route.query.pathType) this.pathType = this.$route.query.pathType
        getDetail({
            loanFlowId:this.$route.query.key
        }).then(res =>{
            this.detail = res.data;
            if (res.data.attachmentWebResponseList && res.data.attachmentWebResponseList.length > 0) {
                res.data.attachmentWebResponseList.forEach(item => {
                    let originUrl = item.url;
                    item.url = res.data.urlPrefix + item.url;
                    this.expenseAttachment.push({ url: item.url, name: item.name, originUrl: originUrl ,uid:new Date().getTime()});
                })
            }
            // if(res.data.recpFlowresponse.employeesName &&res.data.recpFlowresponse.employeesName.length>0){
            //     this.detail.employeesName = res.data.recpFlowresponse.employeesName.join(' , ')
            // }
            res.data.budgetDetailList = res.data.budgetDetailList || []
            this.budgetDetailList = res.data.budgetDetailList
            res.data.flowLogResponseList = res.data.flowLogResponseList || []
            this.flowLoglist = res.data.flowLogResponseList
        })
  },
  methods:{
        showloanMember(){
            this.dialogLoan = true;
            this.$$queryStub = fromJS(this.listQuery);
            this.getLoanList();
        },
        getLoanList(){
            var postData = this.$$queryStub.toJS();
            getLoanMember({
                ...postData,
                pageNo:this.pageNo,
                pageSize:this.pageSize
            }).then(res=>{
                this.loanMemberList = res.data.list;
                this.total = res.data.total;
            })
        },
        restCallback(){
            this.listQuery.loanFlowId = this.$route.query.key
            this.$$queryStub = fromJS(this.listQuery);
        },
        handleCurrentChange(val) {
            this.pageNo = val;
            this.getLoanList();
        },
        showImg(index, type) {
            if (type == 1) {
                // 如果已初始化过 直接show出
                if (this.expenseAttachment[index].viewer) {
                    this.expenseAttachment[index].viewer.show();
                    return;
                    // this.clientimg[index].viewer.destroy();//也可以销毁后再重新初始化
                }
                // 初始化
                this.expenseAttachment[index].viewer = new Viewer(event.target, {});
                // 调用show
                this.expenseAttachment[index].viewer.show();
            } else {
                if (this.urlArr[index].viewer) {
                    this.urlArr[index].viewer.show();
                    return;
                }
                this.urlArr[index].viewer = new Viewer(event.target, {});
                this.urlArr[index].viewer.show();
            }
            // window.open(url);
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

        backBtn(){
            this.$router.go(-1)
        },
       
        editBtn(){
            this.$router.push({
                path:'/me/loanForm',
                query:{ key: this.$route.query.key }
            })
        },
        agreeBtn(){
            loanFlow({
                loanFlowId:this.$route.query.key,
                comment:this.comment,
                flag:'yes',
                procInsId:this.detail.procInsId 
            }).then(res =>{
                if(res.status ==0){
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
                    // this.$router.push({
                    //     path:'/me/recepList'
                    // })
                    this.$router.go(-1)
                }
            })
        },
        refuseBtn(){
            if(this.comment == ''){
                this.$message({
                        message:'审批意见不能为空！',
                        type: 'warning'
                })
                return 
            }
            // if(this.comment.length>300) {
            //     this.$message({
            //         message:'输入字符超出限额，请重新输入！',
            //         type:'warning'
            //     })
            //     return 
            // }
            loanFlow({
                loanFlowId:this.$route.query.key,
                comment:this.comment,
                flag:'no',
                procInsId:this.detail.procInsId 
            }).then(res =>{
                if(res.status ==0){
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
                    // this.$router.push({
                    //     path:'/me/recepList'
                    // })
                    this.$router.go(-1)
                }
            })
        },
        cancelBtn(){
            loanCancel({
                procInsId:this.detail.procInsId,
                taskId:this.taskId || 0
            }).then(res =>{
                if(res.status ==0){
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
                    // this.$router.push({
                    //     path:'/me/recepList'
                    // })
                    this.$router.go(-1)
                }
            })
        },
        delBtn(){
            loanDel({
                loanFlowId:this.$route.query.key
            }).then(res =>{
                if(res.status ==0){
                    this.dialogDelVisible = false
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
                    // this.$router.push({
                    //     path:'/me/recepList'
                    // })
                    this.$router.go(-1)
                }
            })
        }
    },
    mounted(){
        Viewer.setDefaults({
            navbar: false,
            toolbar: {
                zoomIn: 4,
                zoomOut: 4,
                oneToOne: {
                    show: 4,
                    size: "large"
                },
                reset: {
                    show: 4,
                    size: "large"
                },
                // prev:4,
                // next:4,
                rotateLeft: 4,
                rotateRight: 4
            }
        });
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.segment .el-table__body-wrapper {
  padding: 40px 20px 35px;
}
.img-font {
    font-size: 14px;
    padding-right: 10px;
    color: #343434;
    margin-bottom: 10px;
    width: 400px;
    line-height: 32px;
}
</style>