<template>
    <div class="sjb-form-wrapper">
        <div id="printWrapper">
            <div class="printCont">
                <!-- 基本信息 -->
                <div class="areaHead">
                    还款审批单
                </div>
                <table class="areaCont">
                    <tbody>
                        <tr>
                            <td class="table-title">
                                <p>流程编号</p>
                            </td>
                            <td class="table-left">
                                <p>{{detail.procCode}}</p>
                            </td>
                            <td class="table-title">
                                <p>还款时间</p>
                            </td>
                            <td>
                                <p>{{ detail.applyTime }}</p>
                            </td>
                        </tr>
                        <tr>
                            <td class="table-title">
                                <p>公司</p>
                            </td>
                            <td class="table-left">
                                <p>{{detail.invoiceCompanyName}}</p>
                            </td>
                            <td class="table-title">
                                <p>还款人</p>
                            </td>
                            <td>
                                <p>{{detail.applyPerName}}</p>
                            </td>
                        </tr>
                        <tr>
                            <td class="table-title">
                                <p>成本中心</p>
                            </td>
                            <td class="table-left">
                                <p>{{ detail.costCenterName }}</p>
                            </td>
                            <td class="table-title">
                                <p>还款金额</p>
                            </td>
                            <td>
                                <p>{{ detail.unpaidAmount | thousands(2) }}</p>
                            </td>
                        </tr>
                        <tr>
                            <td class="table-title">
                                <p>还款方式</p>
                            </td>
                            <td colspan="3">
                                <p>{{ detail.repayMethodName }}</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table id="partEle" class="areaCont" v-if="detail.repayFlowInvoiceList&&detail.repayFlowInvoiceList.length>0">
                    <tbody>
                        <tr>
                            <!-- <td class="table-title bold">
                                <p>日期</p>
                            </td> -->
                            <td class="table-left bold">
                                <p>科目明细</p>
                            </td>
                            <!-- <td class="table-title bold">
                                <p>起点-终点</p>
                            </td> -->
                            <td class="bold">
                                <p>&nbsp;金额</p>
                            </td>
                        </tr>
                        <tr v-for="(scope,index) in detail.repayFlowInvoiceList" :key="index">
                            <!-- <td class="table-title">
                                <p>{{scope.startDate | stamp2TextDate}} 至 {{scope.endDate | stamp2TextDate}}</p>
                            </td> -->
                            <td class="table-left">
                                <p>{{scope.firstSubName}}{{scope.secondSubName ? "/"+scope.secondSubName :""}}</p>
                            </td>
                            <!-- <td class="table-title">
                                <p>{{scope.startPointName | specialTrim}} - {{scope.endPointName | specialTrim}}</p>
                            </td> -->
                            <td>
                                <p>{{ scope.expenseAmt | thousands(2) }}</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table class="areaCont" v-if="subSummary.length>0">
                    <tbody>
                        <tr>
                            <td class="table-title bold">
                                <p>科目汇总</p>
                            </td>
                            <td class="bold">
                                <p>金额</p>
                            </td>
                        </tr>
                        <tr v-for="(item,index) in subSummary" :key="index">
                            <td class="table-title">
                                {{item.subName}}
                            </td>
                            <td>
                                <p>{{item.subTotal | thousands(2)}}元</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table class="areaCont">
                    <tbody>
                        <tr v-for="(item,index) in printFlowLogList" :key="index">
                            <td class="table-title" :rowspan="printFlowLogList.length" v-if="index==0">
                                审批流程
                            </td>
                            <td>
                                <div class="baseInfo">
                                    <div class="assignName">{{item.assigneeName}}</div>
                                    <!-- 审批bug的补丁 -->
                                    <div class="flowName" v-if="index==0">{{item.activityName}}</div>
                                    <div class="flowName" v-else>{{item.startTime&&item.endTime?"已审批":item.startTime&&!item.endTime?"待审批":!item.startTime&&!item.endTime?"已删除":""}}</div>
                                    <!-- 时间 -->
                                    <div class="endTime">{{item.endTime}}</div>
                                    <div class="costTime" v-if="item.durationTime">历时：{{item.durationTime}}</div>
                                </div>
                                <div class="commit">
                                    <p v-if="item.comment">{{item.comment}}</p>
                                    <!-- <p v-if="item.comment">{{item.comment}}</p> -->
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
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
                                <span class="right-con">{{ detail.procCode }}</span>
                            </div>
                            <div class="clearfix cominfo-item">
                                <span class="left-title font-gray">公司：</span>
                                <span class="right-con">{{ detail.invoiceCompanyName }}</span>
                            </div>
                            <div class="clearfix  cominfo-item">
                                <span class="left-title font-gray">关联借款单：</span>
                                <span class="right-con">{{ detail.loanFlowProcName }}</span>
                            </div>
                            <div class="clearfix  cominfo-item">
                                <span class="left-title font-gray">备注：</span>
                                <span class="right-con">{{ detail.remarks }}</span>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="clearfix cominfo-item">
                                <span class="left-title font-gray">还款时间：</span>
                                <span class="right-con">{{ detail.applyTime | stamp2TextDate}}</span>
                            </div>
                            <div class="clearfix cominfo-item">
                                <span class="left-title font-gray">还款人：</span>
                                <span class="right-con">{{ detail.payeeName }}</span>
                            </div>
                            <div class="clearfix  cominfo-item">
                                <span class="left-title font-gray">成本中心：</span>
                                <span class="right-con">{{  detail.costCenterName }}</span>
                            </div>
                            
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div class="segment statistics">
                <div class="segment-header">
                    还款信息
                </div>
                <div class="segment-area">
                    <div class="el-table__body-wrapper">
                        <el-row>
                            <el-col :span="12" class="segment-brline">
                                <!-- <div class="clearfix cominfo-item">
                                    <span class="left-title font-gray">收款方：</span>
                                    <span class="right-con">{{ detail.payeeName }}</span>
                                </div>
                                <div class="clearfix cominfo-item">
                                    <span class="left-title font-gray">开户行：</span>
                                    <span class="right-con">{{ detail.payeeOpeningBank  }}</span>
                                </div> -->
                                <div class="clearfix  cominfo-item">
                                    <span class="left-title font-gray">待还款金额：</span>
                                    <span class="right-con">{{ detail.unpaidAmount | thousands(2) }}</span>
                                </div>
                                <div class="clearfix  cominfo-item">
                                    <span class="left-title font-gray">还款金额：</span>
                                    <span class="right-con">{{ detail.currentRepayAmount | thousands(2) }}</span>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <!-- <div class="clearfix cominfo-item">
                                    <span class="left-title font-gray">收款账号：</span>
                                    <span class="right-con">{{ detail.payeeCardNum }}</span>
                                </div> -->
                                <div class="clearfix cominfo-item">
                                    <span class="left-title font-gray">还款方式：</span>
                                    <span class="right-con">{{ detail.repayMethodName }}</span>
                                </div>
                                
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </div>
            <div class="segment statistics" v-if="detail.repayFlowInvoiceList&&detail.repayFlowInvoiceList.length>0">
                <div class="segment-header">
                    还款信息
                </div>
                <div class="segment-area">
                    <div class="el-table__body-wrapper">
                        <el-table :data="detail.repayFlowInvoiceList" border fit highlight-current-row style="width: 100%">
                            <el-table-column align="center" label="一级科目" width="150px">
                                <template slot-scope="scope">
                                    <span>{{scope.row.firstSubName}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column width="320px" align="center" label="二级科目">
                                <template slot-scope="scope">
                                    <a>{{scope.row.secondSubName}}</a>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="票据数量">
                                <template slot-scope="scope">
                                    <span>{{scope.row.billNum}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="票据金额">
                                <template slot-scope="scope">
                                    <span>{{scope.row.expenseAmt | thousands(2)}}</span>
                                </template>
                            </el-table-column>
                            
                            <el-table-column width="120px" align="center" label="备注">
                                <template slot-scope="scope">
                                    <span>{{scope.row.remarks}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column width="120px" align="center" label="查看附件">
                                <template slot-scope="scope">
                                    <el-button type="primary" @click="showImgDia(scope.row.subConfList)" :disabled="scope.row.subConfList.length == 0">查看图片</el-button>
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
                    <!-- <el-button v-if="ISEDIT" size="medium" type="primary" @click="expBtn">提交</el-button> -->
                    <el-button v-if="ISEDIT" size="medium" type="primary" @click="editBtn">编辑</el-button>
                    <el-button v-if="ISCANCEL&&!ISEDIT" size="medium" type="warning" @click="cancelBtn">撤销</el-button>
                    <el-button v-if="ISDEL" size="medium" type="danger" @click="dialogDelVisible = true">删除</el-button>
                    <el-button v-if="ISPRINT" size="medium" type="primary" @click="createPdf">打印</el-button>
                    <el-button size="medium" @click="backBtn">返回</el-button>
                </template>
                <template v-if="pathType === 'todo'">
                    <!-- <el-button v-if="ISME&&ISEDIT" size="medium" type="primary" @click="expBtn">提交</el-button> -->
                    <el-button v-if="ISME&&ISEDIT" size="medium" type="primary" @click="editBtn">编辑</el-button>
                    <el-button v-if="!ISEDIT&&ISME || !ISME" size="medium" type="primary" @click="agreeBtn">同意</el-button>
                    <el-button v-if="!ISEDIT&&ISME || !ISME" size="medium" type="info" @click="refuseBtn">驳回</el-button>
                    <el-button v-if="ISPRINT" size="medium" type="primary" @click="createPdf">打印</el-button>
                    <el-button size="medium" @click="backBtn">返回</el-button>
                </template>
                <template v-if="pathType === 'done'">
                    <el-button v-if="ISCANCEL" size="medium" type="warning" @click="cancelBtn">撤销</el-button>
                    <el-button v-if="ISPRINT" size="medium" type="primary" @click="createPdf">打印</el-button>
                    <el-button size="medium" @click="backBtn">返回</el-button>
                </template>
            </div>
        </div>

        <el-dialog title="图片详情" width="25%" :visible.sync="dialogImg">
            <div v-for="(val,index) in urlArr" :key="index" >
                <div v-if="val.url != ''" class="upload-list" @click="showImg(index,2)">
                    <img :src="val.url" alt="" style="width:120px;height:120px">
                    <div class="img-font">{{val.name}}</div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogImg = false">返回</el-button>
            </span>
        </el-dialog>
        <el-dialog title="系统提示？" width="25%" :visible.sync="dialogDelVisible">
            <span>确认删除该还款单吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="delBtn">确认</el-button>
                <el-button @click="dialogDelVisible = false">取消</el-button>
            </span>
        </el-dialog>
  </div>
</template>

<script>
import common from '@/utils/common';
import { getDetail, repayFlow, repayCancel, repayDel, downFile} from '@/api/repay';
import { toJS, fromJS, Map, List } from 'immutable';
import { parseTime } from '@/utils';
import { mapState } from 'vuex';
import sjbtextarea from '@/components/sjbTextarea/index.vue';
import "viewerjs/dist/viewer.css";
import Viewer from 'viewerjs';

import "./print.scss";

export default {
    name: 'complexTable',
    components: {
        sjbtextarea
    },
    data() {
        return {
            expenseAttachment:[],
            flowLoglist:[],
            subSummary:[],
            printFlowLogList:[],
            detail:{},
            comment:'',
            taskId:0,
            pathType:"",
            dialogDelVisible:false,
            finish:false,

            urlArr:[],
            dialogImg:false
        }
    },
    computed:{
        ISME:function(){
            let result = this.userInfo.name == this.detail.applyPerName ? true : false
            return result
        },
        ISDEL:function(){
            let result = this.detail.repayFlowStatus == 2 || this.detail.repayFlowStatus == 3 || this.detail.repayFlowStatus == 4 ? true : false
            return result
        },
        ISEDIT:function(){
            let result = this.detail.modify == 'modify' ? true :false;
            return result
        },
        ISPUTIN:function(){
            let result = this.detail.repayFlowStatus == 4 ? true :false
            return result
        },
        ISCANCEL:function(){
            let result = this.detail.repayFlowStatus == 2 ? true:false
            return result
        },
        ISPRINT:function(){
            let result = this.detail.repayFlowStatus == 1 || this.detail.repayFlowStatus == 2 ? true:false
            return result
        }
    },
    created(){
        this.userInfo = JSON.parse(localStorage.getItem("web_oa_userInfor"));
        if(this.$route.query.taskId) this.taskId = this.$route.query.taskId
        if(this.$route.query.pathType) this.pathType = this.$route.query.pathType
        getDetail({
            repayFlowId:this.$route.query.key
        }).then(res =>{
            this.detail = res.data
            if (res.data.repayFlowCashAttachmentList  && res.data.repayFlowCashAttachmentList.length > 0) {
                res.data.repayFlowCashAttachmentList.forEach(item => {
                    let originUrl = item.url;
                    item.url = item.urlPrefix + item.url;
                    this.expenseAttachment.push({ url: item.url, name: item.name, originUrl: originUrl ,uid:new Date().getTime()});
                })
            }
            res.data.budgetDetailList = res.data.budgetDetailList || []
            this.budgetDetailList = res.data.budgetDetailList
            res.data.flowLogResponseList = res.data.flowLogResponseList || []
            res.data.subSummary = res.data.subSummary || [];
            this.subSummary = res.data.subSummary;
            this.printFlowLogList = res.data.printFlowLogList
            this.flowLoglist = res.data.flowLogResponseList
        })
  },
  methods:{
        showImgDia(subConfList) {
            this.urlArr = [];
            if (subConfList) {
                subConfList.forEach(item => {
                    let url = "";
                    url = item.urlPrefix + item.url;
                    this.urlArr.push({
                        url: url,
                        name: item.confDesc,
                        previewUrl: url,
                        viewer: null
                    });
                });
                this.dialogImg = true;
            }
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
        downAttach(val) {
            downFile({ url: val.originUrl, fileName: val.name }).then(res => {
                if (res.code == 200) {
                    var url = `./OA${res.data}`;
                    console.log("url", url);
                    window.location.href = url;
                }
            });
        },
        createPdf(){
                var pdfstr = document.getElementById('printWrapper')
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
                path:'/me/repayForm',
                query:{ key: this.$route.query.key }
            })
        },
        agreeBtn(){
            repayFlow({
                flowId:this.$route.query.key,
                comment:this.comment,
                flag:'yes',
                procInsId:this.detail.procInsId 
            }).then(res =>{
                if(res.code == 200){
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
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
            repayFlow({
                flowId:this.$route.query.key,
                comment:this.comment,
                flag:'no',
                procInsId:this.detail.procInsId 
            }).then(res =>{
                if(res.code == 200){
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
                    this.$router.go(-1)
                }
            })
        },
        cancelBtn(){
            console.log(this.taskId)
            repayCancel({
                procInsId:this.detail.procInsId,
                taskId:this.taskId || 0
            }).then(res =>{
                if(res.code == 200){
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
            repayDel({
                repayFlowId:this.$route.query.key
            }).then(res =>{
                if(res.code == 200){
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

@media screen {
    #printWrapper {
        display: none;
    }
}
</style>