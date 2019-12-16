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
                                <span class="right-con">{{ detail.procCode }}</span>
                            </div>
                            <div class="clearfix cominfo-item">
                                <span class="left-title font-gray">申请人：</span>
                                <span class="right-con">{{ detail.applyPerName }}</span>
                            </div>
                            <div class="clearfix  cominfo-item">
                                <span class="left-title font-gray">成本中心：</span>
                                <span class="right-con">{{  detail.costCenterName }}</span>
                            </div>
                            <div class="clearfix cominfo-item">
                                <span class="left-title font-gray">发票公司：</span>
                                <span class="right-con">{{ detail.taxCityName }}</span>
                            </div>
                            <div class="clearfix  cominfo-item">
                                <span class="left-title font-gray">备注：</span>
                                <span class="right-con">{{ detail.remarks }}</span>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="clearfix cominfo-item">
                                <span class="left-title font-gray">申请时间：</span>
                                <span class="right-con">{{ detail.applyTime | stamp2TextDate}}</span>
                            </div>
                            <div class="clearfix cominfo-item">
                                <span class="left-title font-gray">岗位名称：</span>
                                <span class="right-con">{{ detail.postName }}</span>
                            </div>
                            <div class="clearfix cominfo-item">
                                <span class="left-title font-gray">项目名称：</span>
                                <span class="right-con">{{ detail.projectName }}</span>
                            </div>
                            
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div class="segment statistics">
                <div class="segment-header">
                    付款信息
                </div>
                <div class="segment-area">
                    <div class="el-table__body-wrapper">
                        <el-row>
                            <el-col :span="12" class="segment-brline">
                                <div class="clearfix cominfo-item">
                                    <span class="left-title font-gray">收款方：</span>
                                    <span class="right-con">{{ detail.bankAccountName }}</span>
                                </div>
                                <div class="clearfix cominfo-item">
                                    <span class="left-title font-gray">开户行：</span>
                                    <span class="right-con">{{ detail.belongBank  }}</span>
                                </div>
                                <div class="clearfix  cominfo-item">
                                    <span class="left-title font-gray">付款金额：</span>
                                    <span class="right-con">{{ detail.expenseTotal }}</span>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="clearfix cominfo-item">
                                    <span class="left-title font-gray">收款账号：</span>
                                    <span class="right-con">{{ detail.bankAccountNumber }}</span>
                                </div>
                                <div class="clearfix cominfo-item">
                                    <span class="left-title font-gray">银行支行：</span>
                                    <span class="right-con">{{ detail.belongBranchBank }}</span>
                                </div>
                                <div class="clearfix cominfo-item">
                                    <span class="left-title font-gray">付款事由：</span>
                                    <span class="right-con">{{ detail.payReason }}</span>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </div>
            <div class="segment statistics">
                <div class="segment-header">
                    科目明细
                </div>
                <div class="segment-area">
                    <div class="el-table__body-wrapper">
                        <el-table :data="flowDetailList" border fit highlight-current-row style="width: 100%">
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
                                    <span>{{scope.row.expenseAmt}}</span>
                                </template>
                            </el-table-column>
                            
                            <el-table-column width="120px" align="center" label="备注">
                                <template slot-scope="scope">
                                    <span>{{scope.row.remarks}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column width="120px" align="center" label="查看附件">
                                <template slot-scope="scope">
                                    <el-button type="primary" @click="showImgDia(scope.row.subConfList)" :disabled="!scope.row.subConfList">查看图片</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="sum-title">
                            合计：
                        </div>
                        <div v-for="(item,index) in amtList" :key="index" class="sum-item">
                            <span class="sum-name">
                                {{item.firstSubName}}
                                <span v-if="item.secondSubName">/</span>
                                {{item.secondSubName}}
                            </span>
                            <span class="sum-value">{{item.amt}}元</span>
                        </div>
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
import { getDetail, payFlow, payCancel, payDel, downFile} from '@/api/payment';
import { toJS, fromJS, Map, List } from 'immutable';
import { parseTime } from '@/utils';
import { mapState } from 'vuex';
import sjbtextarea from '@/components/sjbTextarea/index.vue';
import "viewerjs/dist/viewer.css";
import Viewer from 'viewerjs';

export default {
    name: 'complexTable',
    components: {
        sjbtextarea
    },
    data() {
        return {
            expenseAttachment:[],
            flowDetailList:[],
            flowLoglist:[],
            amtList:[],
            detail:{},
            comment:'',
            taskId:0,
            pathType:"",
            dialogDelVisible:false,

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
            let result = this.detail.expenseStatus == 2 || this.detail.expenseStatus == 3 || this.detail.expenseStatus == 4 ? true : false
            return result
        },
        ISEDIT:function(){
            let result = this.detail.modify == 'modify' ? true :false;
            return result
        },
        ISPUTIN:function(){
            let result = this.detail.expenseStatus == 4 ? true :false
            return result
        },
        ISCANCEL:function(){
            let result = this.detail.expenseStatus == 2 ? true:false
            return result
        },
        ISPRINT:function(){
            let result = this.detail.repayFlowStatus == 1  ? true:false
            return result
        }
    },
    created(){
        this.userInfo = JSON.parse(localStorage.getItem("web_oa_userInfor"));
        if(this.$route.query.taskId) this.taskId = this.$route.query.taskId
        if(this.$route.query.pathType) this.pathType = this.$route.query.pathType
        getDetail(
           this.$route.query.key
        ).then(res =>{
            this.detail = res.data.detail;
            res.data.flowDetailList = res.data.flowDetailList || [];
            this.flowDetailList = res.data.flowDetailList;
            this.flowLoglist = res.data.flowLoglist;
            this.amtList = res.data.amtList;
            if (
                res.data.detail.expenseAttachmentWeb &&
                res.data.detail.expenseAttachmentWeb.length > 0
            ) {
                res.data.detail.expenseAttachmentWeb.forEach(item => {
                    let originUrl = item.url;
                    item.url = res.data.detail.expenseAttachmentPrefix + item.url;
                    this.expenseAttachment.push({
                        url: item.url,
                        name: item.fileName,
                        originUrl: originUrl,
                        previewUrl: item.url,
                        viewer: null
                    });
                });
            }
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
                if (res.status == 0) {
                    var url = `./OA${res.data}`;
                    console.log("url", url);
                    window.location.href = url;
                }
            });
        },
        backBtn(){
            this.$router.go(-1)
        },
        editBtn(){
            this.$router.push({
                path:'/me/paymentForm',
                query:{ key: this.$route.query.key }
            })
        },
        agreeBtn(){
            payFlow({
                expenseFlowId:this.$route.query.key,
                comment:this.comment,
                flag:'yes',
                procInsId:this.detail.procInsId 
            }).then(res =>{
                if(res.status ==0){
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
            payFlow({
                expenseFlowId:this.$route.query.key,
                comment:this.comment,
                flag:'no',
                procInsId:this.detail.procInsId 
            }).then(res =>{
                if(res.status ==0){
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
                    this.$router.go(-1)
                }
            })
        },
        cancelBtn(){
            payCancel({
                procInsId:this.detail.procInsId,
                taskId:this.taskId || 0
            }).then(res =>{
                if(res.status ==0){
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
                    this.$router.go(-1)
                }
            })
        },
        delBtn(){
            payDel(
                this.$route.query.key
            ).then(res =>{
                if(res.status ==0){
                    this.dialogDelVisible = false
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
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

.img-font {
    font-size: 14px;
    padding-right: 10px;
    color: #343434;
    margin-bottom: 10px;
    width: 400px;
    line-height: 32px;
}
</style>