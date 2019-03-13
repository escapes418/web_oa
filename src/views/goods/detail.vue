<template>
    <div class="sjb-form-wrapper">

        <div id="pdf-wrap">
            <div class="segment statistics part-wrap">
                <div class="segment-header">
                    基本信息
                </div>
                <div class="segment-area">
                    <div class="segment-area">
                        <base-temp>
                            <ul class="base-ul">
                                <li class="base-li">
                                    <span class="left-title font-gray">标题：</span>
                                    <span class="right-con">{{detail.title}}</span>
                                </li>
                                <li class="base-li">
                                    <span class="left-title font-gray">类型：</span>
                                    <span class="right-con">{{ detail.type }}</span>
                                </li>
                                <li class="base-li">
                                    <span class="left-title font-gray">标签：</span>
                                    <span class="right-con">{{ detail.labelList&&detail.labelList.join('，') }}</span>
                                </li>
                                <li class="base-li">
                                    <span class="left-title font-gray">提交人：</span>
                                    <span class="right-con">{{ detail.initiator }}</span>
                                </li>
                                <li class="base-li">
                                    <span class="left-title font-gray">提交时间：</span>
                                    <span class="right-con">{{detail.initiateTime | stamp2TextDateFull}}</span>
                                </li>
                                <li class="base-li">
                                    <span class="left-title font-gray">描述：</span>
                                    <span class="right-con" style="max-width:400px">{{ detail.description }}</span>
                                </li>
                            </ul>
                        </base-temp>
                        <base-temp :title="progressTitle">
                            <ul class="base-ul">
                                <li class="base-li">
                                    <span class="left-title font-gray">进度状态：</span>
                                    <span class="right-con">{{detail.progressStatus}}</span>
                                    <span style="margin-left:35%">
                                        <el-button type="primary" size="small" @click="showProgress">查看历史进度</el-button>
                                    </span>
                                </li>
                                <li class="base-li">
                                    <span class="left-title font-gray">结束状态：</span>
                                    <span class="right-con">{{detail.isEnd == 1 ?'是':'否'}}</span>
                                </li>
                                <template v-if="detail.progressStatus=='需求审核中'">
                                    <li class="base-li">
                                        <span class="left-title font-gray">需求紧急度：</span>
                                        <span class="right-con">{{detail.urgency}}</span>
                                    </li>
                                </template>
                                <template v-if="detail.progressStatus=='需求调研中'">
                                    <li class="base-li">
                                        <span class="left-title font-gray">优先级：</span>
                                        <span class="right-con">{{detail.priority}}</span>
                                    </li>
                                </template>
                                <template v-if="detail.progressStatus=='产品设计中'">
                                    <li class="base-li">
                                        <span class="left-title font-gray">产品端：</span>
                                        <span class="right-con">{{detail.productEnd}}</span>
                                    </li>
                                    <li class="base-li">
                                        <span class="left-title font-gray">预计设计时间：</span>
                                        <span class="right-con">{{detail.planDesignTime | stamp2TextDate}}</span>
                                    </li>
                                </template>
                                <template v-if="detail.progressStatus=='开发中'">
                                    <li class="base-li">
                                        <span class="left-title font-gray">预计开发时间：</span>
                                        <span class="right-con">{{detail.planDevTime | stamp2TextDate}}</span>
                                    </li>
                                    <li class="base-li">
                                        <span class="left-title font-gray">预计提测时间：</span>
                                        <span class="right-con">{{detail.planTestTime | stamp2TextDate}}</span>
                                    </li>
                                    <li class="base-li">
                                        <span class="left-title font-gray">预计上线时间：</span>
                                        <span class="right-con">{{detail.planReleaseTime | stamp2TextDate}}</span>
                                    </li>
                                </template>
                                <template v-if="detail.progressStatus=='上线'">
                                    <li class="base-li">
                                        <span class="left-title font-gray">实际上线时间：</span>
                                        <span class="right-con">{{detail.actualReleaseTime | stamp2TextDate}}</span>
                                    </li>
                                    <li class="base-li">
                                        <span class="left-title font-gray">培训时间：</span>
                                        <span class="right-con">{{detail.trainTime | stamp2TextDate}}</span>
                                    </li>
                                </template>
                                <li class="base-li">
                                    <span class="left-title font-gray">处理说明：</span>
                                    <span class="right-con" style="max-width:400px">{{detail.handleExplain}}</span>
                                </li>
                                <li class="base-li">
                                    <span class="left-title font-gray">状态变更时间：</span>
                                    <span class="right-con">{{ detail.changeTime | stamp2TextDateFull}}</span>
                                </li>
                                <li class="base-li">
                                    <span class="left-title font-gray">进度负责人：</span>
                                    <span class="right-con">{{ detail.progressPrincipal}}</span>
                                </li>
                                
                            </ul>
                        </base-temp>
                        <base-temp :title="chargeTitle">
                            <ul class="base-ul">
                                <li class="base-li">
                                    <span class="left-title font-gray">当前负责人：</span>
                                    <span class="right-con">{{detail.curPrincipal}}</span>
                                    <span style="margin-left:35%">
                                        <el-button type="primary" size="small" @click="showChargeMan">查看历史负责人</el-button>
                                    </span>
                                </li>
                            </ul>
                        </base-temp>
                        <base-temp :title="partTitle">
                            <ul class="base-ul">
                                <li class="base-li">
                                    <span class="left-title font-gray">当前参与人：</span>
                                    <span class="right-con">{{detail.participantList&&detail.participantList.join('，')}}</span>
                                    <!-- <span style="margin-left:65%">
                                        <el-button type="primary" size="small" @click="showChargeMan">查看历史参与人</el-button>
                                    </span> -->
                                </li>
                            </ul>
                        </base-temp>
                    </div>
                </div>
            </div>
            
           
            <div class="segment statistics part-wrap">
                <div class="segment-header">
                    评论
                </div>
                <div class="segment-area">
                    <div class="el-table__body-wrapper">
                        <el-table :data="commentList" border fit highlight-current-row style="width: 100%">
                            <el-table-column align="center" label="编号">
                                <template slot-scope="scope">
                                    <span style="color:#409EFF;cursor: Pointer;">{{scope.row.no}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="评论人">
                                <template slot-scope="scope">
                                    <span class="ignore-detail" :title="scope.row.commentator">{{scope.row.commentator}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="时间">
                                <template slot-scope="scope">
                                    <span>{{scope.row.time | stamp2TextDateFull}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="评论内容">
                                <template slot-scope="scope">
                                    <span class="ignore-detail" :title="scope.row.content">{{scope.row.content}}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="pagination-container">
                            <el-pagination background @current-change="handleComCurrentChange" :current-page="pageComNo" :page-size="pageComSize" layout="total, prev, pager, next, jumper" :total="comTotal">
                            </el-pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <el-dialog title="历史进度" :visible.sync="dialogProgress">
            <el-table :data="progressList" border fit highlight-current-row style="width: 100%">
                <el-table-column type="expand" label-class-name="progress__label"> 
                    <template slot-scope="scope">
                        <el-form label-position="left" inline class="progress-table-expand" style="font-size:12px;" >
                            <el-form-item label="需求紧急度：">
                                <span  style="color:#409EFF;cursor: Pointer;">{{scope.row.urgency}}</span>
                            </el-form-item>
                            <el-form-item label="优先级：">
                                <span  style="color:#409EFF;cursor: Pointer;">{{scope.row.priority}}</span>
                            </el-form-item>
                            <el-form-item label="产品端：">
                                <span  style="color:#409EFF;cursor: Pointer;">{{scope.row.productEnd}}</span>
                            </el-form-item>
                            <el-form-item label="预计设计时间：" style="font-size:12px;">
                                <span  style="color:#409EFF;cursor: Pointer;">{{scope.row.planDesignTime | stamp2TextDate}}</span>
                            </el-form-item>
                            <el-form-item label="预计开发时间：">
                                <span  style="color:#409EFF;cursor: Pointer;">{{scope.row.planDevTime | stamp2TextDate}}</span>
                            </el-form-item>
                            <el-form-item label="预计提测时间：">
                                <span  style="color:#409EFF;cursor: Pointer;">{{scope.row.planTestTime | stamp2TextDate}}</span>
                            </el-form-item>
                            <el-form-item label="预计上线时间：">
                                <span  style="color:#409EFF;cursor: Pointer;">{{scope.row.planReleaseTime | stamp2TextDate}}</span>
                            </el-form-item>
                            <el-form-item label="实际上线时间：">
                                <span  style="color:#409EFF;cursor: Pointer;">{{scope.row.actualReleaseTime | stamp2TextDate}}</span>
                            </el-form-item>
                            <el-form-item label="培训时间：">
                                <span  style="color:#409EFF;cursor: Pointer;">{{scope.row.trainTime | stamp2TextDate}}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="进度状态">
                    <template slot-scope="scope">
                        <span>{{scope.row.progressName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="结束状态">
                    <template slot-scope="scope">
                        <span>{{scope.row.isEnd == 1 ? "是":"否"}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="进度负责人">
                    <template slot-scope="scope">
                        <span class="ignore-detail" :title="scope.row.principal">{{scope.row.principal}}</span>
                    </template>
                </el-table-column>
                
                
                <el-table-column align="center" label="状态变更时间">
                    <template slot-scope="scope">
                        <span>{{scope.row.changeTime | stamp2TextDateFull}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="处理说明">
                    <template slot-scope="scope">
                        <span class="ignore-detail" :title="scope.row.handleExplain">{{scope.row.handleExplain}}</span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-container">
                <el-pagination background @current-change="handleProCurrentChange" :current-page="pageProNo" :page-size="pageProSize" layout="total, prev, pager, next, jumper" :total="proTotal">
                </el-pagination>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogProgress = false">取消</el-button>
            </div>
        </el-dialog>

        <el-dialog title="历史负责人" :visible.sync="dialogCharge">
            <el-table :data="chargeList" border fit highlight-current-row style="width: 100%">
                <el-table-column align="center" label="开始负责时间">
                    <template slot-scope="scope">
                        <span>{{scope.row.startTime | stamp2TextDateFull}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="人员姓名">
                    <template slot-scope="scope">
                        <span class="ignore-detail" :title="scope.row.name ">{{scope.row.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="登录账号">
                    <template slot-scope="scope">
                        <span>{{scope.row.loginName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="部门">
                    <template slot-scope="scope">
                        <span class="ignore-detail" :title="scope.row.dept">{{scope.row.dept}}</span>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogCharge = false">取消</el-button>
            </div>
            <div class="pagination-container">
                <el-pagination background @current-change="handleCurrentChange" :current-page="pageNo" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </el-dialog>
        <div class="segment statistics">
            <div class="sjb-foot-button">
                <el-button size="medium" @click="backBtn">返回</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import common from "@/utils/common";
import BaseTemp from '@/components/BaseTemp';
import {
    getDetail,
    progressRecord,
    chargeRecord,
    getCommentList
} from "@/api/cooprate";
import { parseTime } from "@/utils";
import utils from '@/utils/utils';


export default {
    components: {
        BaseTemp
    },
    data() {
        return {
            
            detail: {},
            partTitle:' 参与人情况',
            chargeTitle:'负责人情况',
            progressTitle:'进度情况',
            commentList:[],
            pageComNo:1,
            pageComSize:10,
            comTotal:0,

            dialogCharge:false,
            chargeList:[],
            pageNo:1,
            pageSize:10,
            total:0,

            dialogProgress:false,
            progressList:[],
            pageProNo:1,
            pageProSize:10,
            proTotal:0,
        };
    },
    created() {
        getDetail({
            id:this.$route.query.key
        }).then(res=>{
            this.detail = res.data
        })
        this.getComment()
    },
    methods: {
        getComment(){
            getCommentList({
                needFlowId:this.$route.query.key,
                pageNo:this.pageComNo,
                pageSize:this.pageComSize
            }).then(res=>{
                this.commentList = res.data.list;
                this.comTotal = res.data.total;
            })
        },
        handleComCurrentChange(val) {
            this.pageComNo = val;
            this.getComment();
        },
        backBtn() {
            this.$router.go(-1);
            //   this.$router.push({
            //       path:'/me/reim'
            //   })
        },
        showChargeMan(){
            this.dialogCharge = true;
            this.getChargeList()
        },
        showProgress(){
            this.dialogProgress = true;
            this.getProgressList()
        },
        handleCurrentChange(val) {
            this.pageNo = val;
            this.getChargeList();
        },
        handleProCurrentChange(val) {
            this.pageProNo = val;
            this.getProgressList();
        },
        getChargeList(){
            chargeRecord({
                needFlowId:this.$route.query.key,
                pageNo:this.pageNo,
                pageSize:this.pageSize
            }).then(res=>{
                this.chargeList = res.data.list;
                this.total = res.data.total;
            })
        },
        getProgressList(){
            progressRecord({
                needFlowId:this.$route.query.key,
                pageNo:this.pageProNo,
                pageSize:this.pageProSize
            }).then(res=>{
                this.progressList = res.data.list;
                this.proTotal = res.data.total;
            })
        },
    },
    mounted() {
        
    }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.progress-table-expand{
    font-size: 0;
}
.progress-table-expand label {
    width: 90px;
    color: #99a9bf;
    font-size: 12px;
}
.progress__label{
    font-size: 12px!important;
}
.progress-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 33%;
    font-size: 12px!important;
}
.base-ul{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.base-li{
    flex-basis: 50%;
    // height: 32plx;
    // display: inline-block;
    .font-gray.left-title {
        font-size: 13px;
        float: left;
        width: 150px;
        padding-right: 10px;
        color: #99a9bf;
    }
    .right-con {
        float: left;
        color: rgb(52, 52, 52);
        font-size: 13px ;
    }
}
.segment .el-table__body-wrapper {
    padding: 40px 20px 35px;
}

.img-font {
    font-size: 14px;
    padding-right: 10px;
    color: #343434;
    margin-bottom: 10px;
}
.upload-img{
    width: 500px;
}
.info-color{
    color: #409EFF;
}
</style>
