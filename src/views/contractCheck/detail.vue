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
                                    <span class="left-title font-gray">流程编号：</span>
                                    <span class="right-con">{{detail.procCode}}</span>
                                </li>
                                <li class="base-li" v-if="detail.contractCode">
                                    <span class="left-title font-gray">合同编号：</span>
                                    <span class="right-con">{{detail.contractCode}}</span>
                                </li>
                                <li class="base-li">
                                    <span class="left-title font-gray">合同名称：</span>
                                    <span class="right-con">{{ detail.contractName }}</span>
                                </li>
                                <li class="base-li">
                                    <span class="left-title font-gray">合同类型：</span>
                                    <span class="right-con">{{ contractTypeName }}</span>
                                </li>
                                <li class="base-li">
                                    <span class="left-title font-gray">合同关键字：</span>
                                    <span class="right-con">{{  detail.keyWordName&&detail.keyWordName.join('，') }}</span>
                                </li>
                                <li class="base-li" v-if="ISMODIFY">
                                    <span class="left-title font-gray">修改合同关键字：</span>
                                    <span class="right-con">
                                        <el-select clearable class="filter-item ignore-detail" filterable multiple v-model="keyWord" placeholder="请选择合同关键字" style="width:260px;">
                                            <el-option v-for="item in keyWords" :label="item.value" :value="item.key" :key="item.key">
                                            </el-option>
                                        </el-select>
                                    </span>
                                </li>
                                <li class="base-li" v-if="associationMain">
                                    <span class="left-title font-gray">关联主合同编号：</span>
                                    <span class="right-con">{{ detail.associationMainCode }}</span>
                                </li>
                                <li class="base-li" v-if="!associationMain">
                                    <span class="left-title font-gray">关联项目：</span>
                                    <span class="right-con" style="max-width:400px">{{ projectName.join(',') }}</span>
                                </li>
                                <li class="base-li">
                                    <span class="left-title font-gray">合同申请人：</span>
                                    <span class="right-con">{{ detail.applyPerName }}</span>
                                </li>
                                <li class="base-li">
                                    <span class="left-title font-gray">备注：</span>
                                    <span class="right-con">{{ detail.remarks }}</span>
                                </li>
                            </ul>
                        </base-temp>
                        <base-temp v-for="(itemData,index) in detail.contractPartyList" :title="itemData.partyName" :key="index">
                            <ul class="base-ul">
                                <li class="base-li" v-for="(item,index) in itemData.contractPartyType">
                                    <span class="left-title font-gray">{{item.columnLabel+'：'}}</span>
                                    <span class="right-con">{{item.value}}</span>
                                </li>
                            </ul>
                        </base-temp>
                        <base-temp :title="contractPart">
                            <ul class="base-ul">
                                <li class="base-li">
                                    <span class="left-title font-gray">合同开始日期：</span>
                                    <span class="right-con">{{detail.contractStartTime | stamp2TextDate}}</span>
                                </li>
                                <li class="base-li">
                                    <span class="left-title font-gray">合同结束日期：</span>
                                    <span class="right-con">{{detail.contractEndTime | stamp2TextDate}}</span>
                                </li>
                                <li class="base-li">
                                    <span class="left-title font-gray">合同签约人：</span>
                                    <span class="right-con">{{ detail.signLeaderName }}</span>
                                </li>
                                <li class="base-li">
                                    <span class="left-title font-gray">合同负责人：</span>
                                    <span class="right-con">{{ detail.contractLeaderName }}</span>
                                </li>
                                <li class="base-li">
                                    <span class="left-title font-gray">用章类型：</span>
                                    <span class="right-con">{{ detail.chapterTypeName&&detail.chapterTypeName.join(' ，') }}</span>
                                </li>
                                <li class="base-li">
                                    <span class="left-title font-gray">用章份数：</span>
                                    <span class="right-con">{{ detail.contractLeaderName }}</span>
                                </li>
                            </ul>
                        </base-temp>
                    </div>
                </div>
            </div>
            <!-- <div class="segment statistics">
                <div class="segment-header">
                    快递信息
                </div>
                <div class="segment-area">
                    <el-row>
                        <el-col :span="12" class="segment-brline">
                            <div class="clearfix cominfo-item">
                                <span class="left-title font-gray">快递公司：</span>
                                <span class="right-con">
                                    {{detail.expressCompany}}
                                </span>
                            </div>
                        </el-col>
                        <el-col :span="12" class="segment-brline">
                            <div class="clearfix  cominfo-item">
                                <span class="left-title font-gray">快递单号：</span>
                                <span class="right-con">
                                    {{detail.expressBill}}
                                </span>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div> -->
            <div class="segment statistics part-wrap" v-if="detail.contractAttachmentList&&detail.contractAttachmentList.length > 0">
                <div class="segment-header">
                    附件
                </div>
                <div class="segment-area">
                    <div class="el-table__body-wrapper">
                        <base-temp :title="tipsUpload1" v-if="contractAttachment.length>0">
                            <div v-for="(val,index) in contractAttachment" :key="index" style="width:40%;margin-bottom:15px">
                                <div v-if="val.url != ''" class="upload-list">
                                    <span class="img-font">{{val.name}}</span>
                                    <el-button v-if="['png','gif','jpeg','jpg'].indexOf((val.name.split('.')[val.name.split('.').length - 1]).toLowerCase()) == -1" type="text" style="float:right" @click="downAttach(val)">下载</el-button>
                                    <el-button v-else type="text" @click="showImg(index,1)" style="float:right">
                                        查看<img :src="val.url" style="display:none">
                                    </el-button>
                                    <!-- <el-button type="text" style="float:right" @click="downAttach(val)">下载</el-button> -->
                                </div>
                            </div>
                        </base-temp>
                        <base-temp :title="tipsUpload2" v-if="dataAttachment.length>0">
                            <div v-for="(val,index) in dataAttachment" :key="index" style="width:40%;margin-bottom:15px">
                                <div v-if="val.url != ''" class="upload-list">
                                    <span class="img-font">{{val.name}}</span>
                                    <el-button v-if="['png','gif','jpeg','jpg'].indexOf((val.name.split('.')[val.name.split('.').length - 1]).toLowerCase()) == -1" type="text" style="float:right" @click="downAttach(val)">下载</el-button>
                                    <el-button v-else type="text" @click="showImg(index,2)" style="float:right">
                                        查看<img :src="val.url" style="display:none">
                                    </el-button>
                                    <!-- <el-button type="text" style="float:right" @click="downAttach(val)">下载</el-button> -->
                                </div>
                            </div>
                        </base-temp>
                        <base-temp :title="tipsUpload3" v-if="scanConAttachment.length>0">
                            <div v-for="(val,index) in scanConAttachment" :key="index" style="width:40%;margin-bottom:15px">
                                <div v-if="val.url != ''" class="upload-list">
                                    <span class="img-font">{{val.name}}</span>
                                    <el-button v-if="['png','gif','jpeg','jpg'].indexOf((val.name.split('.')[val.name.split('.').length - 1]).toLowerCase()) == -1" type="text" style="float:right" @click="downAttach(val)">下载</el-button>
                                    <el-button v-else type="text" @click="showImg(index,3)" style="float:right">
                                        查看<img :src="val.url" style="display:none">
                                    </el-button>
                                    <!-- <el-button type="text" style="float:right" @click="downAttach(val)">下载</el-button> -->
                                </div>
                            </div>
                        </base-temp>
                    </div>
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
            
            
        </div>
        <template v-if="pathType === 'todo'">
            <div class="segment statistics" v-if="!ISEDIT&&ISME || !ISME">
                <div class="segment-header">
                    审批意见
                </div>
                <div class="segment-area">
                    <sjbtextarea :rows="3" :max="600" textStyle="width:420px;margin-top:20px;margin-bottom:20px" placeholder="请输入内容" v-model.trim="comment">
                    </sjbtextarea>
                </div>
            </div>
            <div class="segment statistics" v-if="detail.isUploadFile == 1">
                <div class="segment-header">
                    合同扫描件
                </div>
                <div class="segment-area">
                    <div class="el-table__body-wrapper" v-if="scanMustCount">
                        <el-upload class="upload-img" :action="fileURL" :headers='{ sessionid:token}' :on-remove="scanRemove" :before-upload = "beforeUpload" :on-success="scanSuccess" :file-list="scanAttachment">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">
                                只能上传pdf、png、gif、jpeg、jpg格式文件!
                                <span v-if='scanMustCount' slot="tip" class="el-upload__tip">且最少上传{{scanMustCount }}张！</span>
                            </div>
                        </el-upload>
                    </div>
                </div>
            </div>
        </template>
        
        <div class="segment statistics">
            <div class="sjb-foot-button">
                <template v-if="pathType === 'list'">
                    <!-- <el-button v-if="ISEDIT" size="medium" type="primary" @click="expBtn">提交</el-button> -->
                    <el-button v-if="ISAPPLY&&ISEDIT" size="medium" type="primary" @click="editBtn">编辑</el-button>
                    <el-button v-if="ISAPPLY&&ISCANCEL&&!ISEDIT" size="medium" type="warning" @click="dialogCanVisible = true">撤销</el-button>
                    <!-- <el-button v-if="ISAPPLY&&ISDEL" size="medium" type="danger" @click="dialogDelVisible = true">删除</el-button> -->
                    <!-- <el-button v-if="ISPRINT" size="medium" type="primary" @click="createPdf">打印</el-button>
                    <el-button v-if="ISPRINT" size="medium" type="primary" @click="createPartPdf">部分打印</el-button> -->
                    <el-button size="medium" @click="backBtn">返回</el-button>
                </template>
                <template v-if="pathType === 'todo'">
                    <el-button v-if="ISMODIFY" size="medium" type="primary" @click="updateBtn">提交</el-button>
                    <el-button v-if="ISME&&ISEDIT" size="medium" type="primary" @click="editBtn">编辑</el-button>
                    <el-button v-if="!ISEDIT&&ISME || !ISME" size="medium" type="primary" @click="agreeBtn">同意</el-button>
                    <el-button v-if="!ISEDIT&&ISME || (!ISME&&ISBACK)" size="medium" type="info" @click="refuseBtn">驳回</el-button>
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
            </div>
        </div>
    <el-dialog title="系统提示？" width="25%" :visible.sync="dialogDelVisible">
        <span>确认删除该申请单吗？</span>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="delBtn">确认</el-button>
            <el-button @click="dialogDelVisible = false">取消</el-button>
        </span>
    </el-dialog>
    <el-dialog title="系统提示？" width="25%" :visible.sync="dialogCanVisible">
        <span>确认撤销该申请单吗？</span>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="cancelBtn">确认</el-button>
            <el-button @click="dialogCanVisible = false">取消</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import common from "@/utils/common";
import BaseTemp from '@/components/BaseTemp';
import sjbtextarea from '@/components/sjbTextarea'
import {
    getContractConfig,
    getProject,
    getDetail,
    contractCancel,
    contractFlow,
    findAllProject,
    expDel,
    downFile,
    updateKeyWord
} from "@/api/contractCheck";
import { parseTime } from "@/utils";
import { mapState } from "vuex";
import config from '@/utils/config';
import utils from '@/utils/utils';
import "viewerjs/dist/viewer.css";
import Viewer from 'viewerjs';

export default {
    components: {
        BaseTemp,
        sjbtextarea
    },
    data() {
        return {
            contractPart:'合同情况',
            expressPart:'快递信息',
            tipsUpload1:'预签合同图片（必填）（该处上传已签约合同照片）',
            tipsUpload2:'附件资料图片（必填）（该处上传营业执照和法人身份证正反面，需原件照片或复印件盖章）',
            tipsUpload3:'合同扫描件图片（必填）',
            dataAttachment:[],
            contractAttachment:[],
            keyWord:[],
            keyWords:[],
            keyWordName:[],
            contractTypeName:"",
            keyWordName:[],
            scanConAttachment:[],
            fileURL: process.env.BASE_API + "/commonInfo/fileUpload",
            // uploadTips: config.tips,
            flowLoglist: [],
            expenseAttachment: [],
            detail: {},
            projectName:[],
            comment: "",
            taskId: "",
            dialogCanVisible: false,
            dialogDelVisible: false,
            pathType: "",
            associationMain:false,

            scanAttachment:[],
            scanMustCount:0,
            scanMaxCount:0,
        };
    },
    computed: {
        ...mapState({
            token: state => state.user.token
        }),
        ISMODIFY: function() {
            let result = this.detail.showModify  == "0" ? true : false;
            return result;
        },
        ISAPPLY:function(){
            let result =
                this.userInfo.loginName == this.detail.applyPerCode ? true : false;
            return result;
        },
        ISME: function() {
            let result =
                this.userInfo.name == this.detail.applyPerName ? true : false;
            return result;
        },
        ISDEL: function() {
            let result =
                this.detail.contractFlowStatus == 2 ||
                this.detail.contractFlowStatus == 3 ||
                this.detail.contractFlowStatus == 4
                    ? true
                    : false;
            return result;
        },
        ISEDIT: function() {
            let result = this.detail.modify == "modify" ? true : false;
            return result;
        },
        ISPUTIN: function() {
            let result = this.detail.contractFlowStatus == 4 ? true : false;
            return result;
        },
        ISCANCEL: function() {
            let result = this.detail.contractFlowStatus == 2 && this.detail.isCancel == 1 ? true : false;
            return result;
        },
        ISPRINT: function() {
            let result =
                this.detail.contractFlowStatus == 1 || this.detail.contractFlowStatus == 2
                    ? true
                    : false;
            return result;
        },
        ISBACK:function(){
            let result = this.detail.isBack == 1 ? true :false
            return result
        }
    },
    created() {
        this.userInfo = JSON.parse(localStorage.getItem("web_oa_userInfor"));
        if (this.$route.query.taskId) this.taskId = this.$route.query.taskId;
        if (this.$route.query.pathType)
            this.pathType = this.$route.query.pathType;

        //先获取详情根据详情返回的模版ID再获取相关的配置数据，并将详情的数据回填到配置文件然后渲染详情页面
        this.detailPromise().then(async res=>{

            let respond = await getContractConfig({id:res.data.contractFlowDetailInfoNewResponse.configId});
            respond.data.contractConfigAttachmentList.forEach(item=>{
                if(item.attachmentType == 2){
                    this.scanMustCount = item.mustCount;
                    this.scanMaxCount = item.maxCount;
                }
            })
            respond.data.contractPartyList.forEach(item=>{
                item.contractPartyType.forEach(i=>{
                    res.data.contractFlowDetailInfoNewResponse.contractPartyList.forEach(item=>{
                        for (let key in item){
                            if(i.columnName == key){
                                if(i.columnType=='select' || i.columnType=='select-cust'){
                                    i.value = item['value']
                                }else{
                                    i.value = item[key]
                                }
                            }
                        }
                    })
                })
            })
            this.contractTypeName = respond.data.contractTypeName;
            respond.data.keyWords = res.data.keyWords || [];
            this.keyWords = respond.data.keyWords;
            // this.keyWords.forEach(i=>{
            //     if(res.data.contractFlowDetailInfoNewResponse.keyWord.indexOf(i.key)!=-1){
            //         this.keyWordName.push(i.value)
            //     }
            // })
            this.associationMain = respond.data.associationMain == 1
            this.detail.contractPartyList = respond.data.contractPartyList;
        })
    },
    methods: {
        detailPromise(){
            return new Promise(async (resolve,reject)=>{
                let res = await getDetail({contractFlowId: this.$route.query.key})
                this.detail = res.data.contractFlowDetailInfoNewResponse;
                this.detail.projectList&&this.detail.projectList.forEach(item=>{
                    this.projectName.push(item.projectName)
                })
                this.flowLoglist = res.data.flowLoglist;
                if (
                    res.data.contractFlowDetailInfoNewResponse.contractAttachmentList &&
                    res.data.contractFlowDetailInfoNewResponse.contractAttachmentList.length > 0
                ) {
                    res.data.contractFlowDetailInfoNewResponse.contractAttachmentList.forEach(item => {
                        let originUrl = item.contractAttachmentUrl;
                        item.url = item.urlPrefix + item.contractAttachmentUrl;
                        if(item.fileType == 1){
                            this.contractAttachment.push({
                                url: item.url,
                                name: item.name,
                                originUrl: originUrl,
                                fileType:item.fileType,
                                previewUrl: item.url,
                                viewer: null
                            })
                        }
                        if(item.fileType == 3){
                            this.dataAttachment.push({
                                url: item.url,
                                name: item.name,
                                originUrl: originUrl,
                                fileType:item.fileType,
                                previewUrl: item.url,
                                viewer: null
                            });
                        }
                        if(item.fileType == 2){
                            this.scanConAttachment.push({
                                url: item.url,
                                name: item.name,
                                originUrl: originUrl,
                                fileType:item.fileType,
                                previewUrl: item.url,
                                viewer: null
                            });
                        }
                        
                    });
                }
                resolve(res)
            })
        },
        updateBtn(){
            this.keyWords.forEach(i=>{
                if(this.keyWord.indexOf(i.key)!=-1){
                    this.keyWordName.push(i.value)
                }
            })
            updateKeyWord({
                id:this.$route.query.key,
                keyWord:this.keyWord,
                keyWordName:this.keyWordName
            }).then(res=>{
                if(res.status == 0){
                    this.$message({
                        message: res.message,
                        type: "success"
                    })
                    this.$router.go(0);
                }
            })
        },
        showImg(index,type) {
            if(type==1){
                if (this.contractAttachment[index].viewer) {
                    this.contractAttachment[index].viewer.show();
                    return;
                    // this.clientimg[index].viewer.destroy();//也可以销毁后再重新初始化
                }
                // 初始化
                this.contractAttachment[index].viewer = new Viewer(event.target, {});
                // 调用show
                this.contractAttachment[index].viewer.show();
            }
            if(type==2){
                if (this.dataAttachment[index].viewer) {
                    this.dataAttachment[index].viewer.show();
                    return;
                    // this.clientimg[index].viewer.destroy();//也可以销毁后再重新初始化
                }
                // 初始化
                this.dataAttachment[index].viewer = new Viewer(event.target, {});
                // 调用show
                this.dataAttachment[index].viewer.show();
            }
            if(type==3){
                if (this.scanConAttachment[index].viewer) {
                    this.scanConAttachment[index].viewer.show();
                    return;
                    // this.clientimg[index].viewer.destroy();//也可以销毁后再重新初始化
                }
                // 初始化
                this.scanConAttachment[index].viewer = new Viewer(event.target, {});
                // 调用show
                this.scanConAttachment[index].viewer.show();
            }
        },
        backBtn() {
            this.$router.go(-1);
            //   this.$router.push({
            //       path:'/me/reim'
            //   })
        },
        downAttach(val) {
            downFile({ url: val.originUrl, fileName: val.name }).then(res => {
                if (res.status == 0) {
                    var url = `./OA${res.data}`;
                    window.location.href = url;
                }
            });
        },
        scanSuccess(res, file, fileList) {
            if(res.data.resCode == 1){
                let url =res.data.storfiles.serverUrl + res.data.storfiles.url
                this.scanAttachment.push({ contractAttachmentUrl:res.data.storfiles.url ,name:file.name,url:url,fileType:2,uid:file.uid})
            }
        },
        // 附件移除
       scanRemove(file, fileList) {
            this.scanAttachment.map((item, index) => {
                if (item.uid == file.uid) {
                    this.scanAttachment.splice(index, 1);
                }
            })
        },
        beforeUpload(file) {
            // const isPDF = "application/pdf" == file.type;
            // if(!isPDF){
            //     this.$message({
            //         message:"只能上传pdf格式文件!",
            //         type: 'error'
            //     })
            // }
            const isMax = this.scanAttachment.length < this.scanMaxCount;
            if(!isMax){
                this.$message({
                    message: "合同扫描件上传不能超过"+this.scanMaxCount+'个',
                    type: 'error'
                })
            }
            // const isLt3M = file.size / 1024 / 1024 < config.imgLimit;
            // if(!isLt3M){
            //     this.$message({
            //         message: '上传文件不能超过' + config.imgLimit + 'M',
            //         type: 'error'
            //     })
            // }
            return isMax&&utils.handleImgError(file);
        },
        editBtn() {
            this.$router.push({
                path: "/me/contractCheckForm",
                query: { key: this.$route.query.key }
            });
        },
        agreeBtn() {
            // if (this.comment.length > 100) {
            //     this.$message({
            //         message: "输入字符超出限额，请重新输入！",
            //         type: "warning"
            //     });
            //     return;
            // }
            if(this.detail.isUploadFile == 1 && this.scanAttachment.length<this.scanMustCount){
                this.$message({
                    message: '请至少上传'+this.scanMustCount+'张合同扫描件！',
                    type: "warning"
                });
                return;
            }
            contractFlow({
                contractFlowId: this.$route.query.key,
                comment: this.comment,
                flag: "yes",
                procInsId: this.detail.procInsId,
                contractAttachmentList:[...this.scanAttachment]
            }).then(res => {
                if (res.status == 0) {
                    this.$message({
                        message: res.message,
                        type: "success"
                    });
                    this.$router.push({
                        path:'/task/todo'
                    })
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
            
            // if(this.detail.isUploadFile == 1 && this.scanAttachment.length<this.scanMustCount){
            //     this.$message({
            //         message: '请至少上传'+this.scanMustCount+'张合同扫描件！',
            //         type: "warning"
            //     });
            //     return;
            // }
            contractFlow({
                contractFlowId: this.$route.query.key,
                comment: this.comment,
                flag: "no",
                procInsId: this.detail.procInsId,
                contractAttachmentList:[...this.scanAttachment]
            }).then(res => {
                if (res.status == 0) {
                    this.$message({
                        message: res.message,
                        type: "success"
                    });
                    this.$router.push({
                        path:'/task/todo'
                    })
                }
            });
        },
        cancelBtn() {
            contractCancel({
                procInsId: this.detail.procInsId,
                taskId: this.taskId || 0
            }).then(res => {
                if (res.status == 0) {
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
            expDel({
                contractFlowId: this.$route.query.key
            }).then(res => {
                if (res.status == 0) {
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
        },
    },
    mounted() {
        Viewer.setDefaults({
            navbar: false,
            toolbar: {
                zoomIn: 4,
                zoomOut: 4,
                oneToOne: {
                    show: 4,
                    size: 'large',
                },
                reset: {
                    show: 4,
                    size: 'large',
                },
                rotateLeft: 4,
                rotateRight: 4
            }
        })

        // findAllProject({}).then(res=>{
        //     res.data.list.forEach(item=>{
        //         for(let key in this.detail.projectIds){
        //             if(item.id == this.detail.projectIds[key]){
        //                 this.projectName.push(item.projectName)
        //             }
        //         }
        //     })
        // })
    }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
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
</style>
