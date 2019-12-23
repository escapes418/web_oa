<template>
    <div class="sjb-form-wrapper">
        <div class="segment statistics">
            <div class="segment-header">
                基本信息
            </div>
            <div class="segment-area">
                <base-temp>
                    <ul class="base-ul">
                        <li class="base-li">
                            <RedStar label="合同名称：" :required="true">
                                <span class="right-con">
                                    <el-select clearable class="filter-item ignore-detail" filterable v-model="postData.configCode" placeholder="请选择合同名称" style="width:260px;" @change="selectContract" @clear="clearContract">
                                        <el-option v-for="item in conInfor" :label="item.contractName" :value="item.code" :key="item.code">
                                        </el-option>
                                    </el-select>
                                </span>
                            </RedStar>
                        </li>
                        <li class="base-li">
                            <RedStar label="合同类型：">
                                <span class="right-con">{{contractTypeName}}</span>
                            </RedStar>
                        </li>
                        <li class="base-li">
                            <RedStar label="业务类型：">
                                <span class="right-con">{{businessTypeName}}</span>
                            </RedStar>
                        </li>
                        <li class="base-li">
                            <RedStar label="业务模块：">
                                <span class="right-con">{{businessModelName}}</span>
                            </RedStar>
                        </li>
                        <li class="base-li" v-if="keyWords.length>1">
                            <RedStar label="合同关键字：" :required="true">
                                <span class="right-con">
                                    <el-select clearable class="filter-item ignore-detail" filterable multiple v-model="postData.keyWord" placeholder="请选择合同名称" style="width:260px;">
                                        <el-option v-for="item in keyWords" :label="item.value" :value="item.key" :key="item.key">
                                        </el-option>
                                    </el-select>
                                </span>
                            </RedStar>
                        </li>
                        <li class="base-li" v-if="associationMain">
                            <RedStar label="关联主合同编号：" :required="true">
                                <span class="item-value" @click="showForm">
                                    <i class="el-icon-search" style="color:#bfbfbf"></i>
                                    <span style="color:#606266;font-size:14px">{{postData.associationMainCode}}</span>
                                </span>
                            </RedStar>
                        </li>
                        <li class="base-li" v-if="!associationMain">
                            <RedStar label="关联项目：" :required="true">
                                <span class="right-con">
                                    <el-select 
                                        class="filter-item" 
                                        filterable
                                        multiple
                                        remote 
                                        reserve-keyword 
                                        v-model="postData.projectIds" 
                                        placeholder="请输入项目名称" 
                                        style="width:260px;" 
                                        :remote-method="searchProject">
                                        <el-option v-for="item in projectList" :label="item.projectName" :value="item.id" :key="item.id">
                                        </el-option>
                                    </el-select>
                                </span>
                            </RedStar>
                        </li>
                        <li class="base-li">
                            <RedStar label="备注" :required="false">
                                <span class="right-con">
                                    <sjbtextarea :rows="3" placeholder="请输入" textStyle="width:260px;" :max="200" v-model.trim="postData.remarks"></sjbtextarea>
                                </span>
                            </RedStar>
                        </li>
                    </ul>
                </base-temp>
                
            </div>
            <el-dialog title="关联主合同名称" :visible.sync="dialogFormVisible">
                <!-- <span class="toolbar-item">
                    <span class="item-label">合同编号：</span>
                    <el-input @keyup.enter.native="handleProFilter" style="width: 150px;" class="filter-item" placeholder="请输入客户名称" v-model.trim="listQuery.queryText">
                    </el-input>
                </span>
                <span class="toolbar-item">
                    <span class="item-label">合同方名称：</span>
                    <el-input @keyup.enter.native="handleProFilter" style="width: 150px;" class="filter-item" placeholder="请输入合同方名称" v-model.trim="listQuery.contractPartyName">
                    </el-input>
                </span> -->
                <span class="toolbar-item">
                    <span class="item-label">合同编号/甲方/乙方/丙方：</span>
                    <el-input @keyup.enter.native="handleFilter" style="width: 220px;" class="filter-item" placeholder="请输入合同编号/甲方/乙方/丙方" v-model.trim="listQuery.faint">
                    </el-input>
                </span>
                <span class="toolbar-item">
                    <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleProFilter">搜索</el-button>
                    <el-button class="filter-item" type="warning" icon="el-icon-delete" @click="restListQuery(restCallback)">重置</el-button>
                </span>
                <div class="dialog" style="margin-top:10px">
                    <el-table :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%;" @row-click="selectMain">
                        <el-table-column align="center" label="合同编号">
                            <template slot-scope="scope">
                                <span class="ignore-detail" :title="scope.row.contractCode">{{scope.row.contractCode}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="合同名称">
                            <template slot-scope="scope">
                                <span>{{scope.row.contractName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="甲方名称">
                            <template slot-scope="scope">
                                <span class="ignore-detail" :title="scope.row.firstMemberName">{{scope.row.firstMemberName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="乙方名称">
                            <template slot-scope="scope">
                                <span class="ignore-detail" :title="scope.row.secondMemberName">{{scope.row.secondMemberName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="丙方名称">
                            <template slot-scope="scope">
                                <span class="ignore-detail" :title="scope.row.thirdMemberName">{{scope.row.thirdMemberName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="合同负责人">
                            <template slot-scope="scope">
                                <span class="ignore-detail">{{scope.row.contractLeaderName}}</span>
                            </template>
                        </el-table-column>
                        
                    </el-table>
                </div>

                <div class="pagination-container" style="margin-top:20px">
                    <el-pagination background @current-change="handleCurrentChange" :current-page="pageNo" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
                    </el-pagination>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">返回</el-button>
                </div>
            </el-dialog>
           
        </div>
        <div class="segment statistics">
            <div class="segment-header">
                合同方信息
            </div>
            <div class="segment-area">
                <template  v-for="(item,index) in initData">
                    <base-temp :title="item.partyName">
                        <dynamic-form ref="base-form" :data="item.contractPartyType"></dynamic-form>
                    </base-temp>
                </template>
                <base-temp title="合同情况">
                    <ul class="base-ul">
                        <li class="base-li">
                            <RedStar label="合同开始日期：" :required="true">
                                <span class="right-con">
                                    <el-date-picker
                                        v-model="contractStartTime"
                                        type="date"
                                        style="width:260px;"
                                        placeholder="选择日期">
                                    </el-date-picker>
                                </span>
                            </RedStar>
                        </li>
                        <li class="base-li">
                            <RedStar label="合同结束日期：" :required="true">
                                <span class="right-con">
                                    <el-date-picker
                                        v-model="contractEndTime"
                                        type="date"
                                        style="width:260px;"
                                        placeholder="选择日期">
                                    </el-date-picker>
                                </span>
                            </RedStar>
                        </li>
                        <li class="base-li">
                            <RedStar label="合同签约人：" :required="true">
                                <span class="right-con">
                                    <el-select clearable filterable class="filter-item ignore-detail" v-model="postData.signLeaderId" placeholder="请选择合同签约人" style="width:260px;">
                                        <el-option v-for="item in memberFullList" :label="item.name" :value="item.id" :key="item.id">
                                        </el-option>
                                    </el-select>
                                </span>
                            </RedStar>
                        </li>
                        <li class="base-li">
                            <RedStar label="合同负责人：" :required="true">
                                <span class="right-con">
                                    <el-select clearable filterable class="filter-item ignore-detail" v-model="postData.contractLeaderId" placeholder="请选择合同负责人" style="width:260px;">
                                        <el-option v-for="item in memberList" :label="item.name" :value="item.id" :key="item.id">
                                        </el-option>
                                    </el-select>
                                </span>
                            </RedStar>
                        </li>
                        <!-- <li class="base-li">
                            <RedStar label="用章类型：" :required="true">
                                <span class="right-con">
                                    <el-select clearable filterable multiple class="filter-item ignore-detail" v-model="postData.chapterType" placeholder="请选择用章类型" style="width:260px;">
                                        <el-option v-for="item in chapterList" :label="item.name" :value="item.id" :key="item.id">
                                        </el-option>
                                    </el-select>
                                </span>
                            </RedStar>
                        </li>
                        <li class="base-li">
                            <RedStar label="用章份数：" :required="true">
                                <span class="right-con">
                                    <el-input style="width: 260px;" class="filter-item" placeholder="请输入用章份数" v-model.number="postData.chapterNum"></el-input>
                                </span>
                            </RedStar>
                        </li> -->
                    </ul>
                </base-temp>
            </div>
        </div>
        <div class="segment statistics" v-if="contractMustCount||dataMustCount||scanMustCount">
            <div class="segment-header">
                附件
            </div>
            <div class="segment-area">
                <div class="el-table__body-wrapper">
                    <!-- <base-temp :title="tipsUpload1" :required ="true" v-if="contractMustCount">
                        <el-upload class="upload-img" :action="fileURL" :headers='{sessionid:token}' :on-remove="contractRemove" :before-upload = "beforeUploadContract" :on-success="contractSuccess" :file-list="contractAttachment">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">
                                {{uploadTips}}
                                <span v-if='contractMustCount' slot="tip" class="el-upload__tip">且最少上传{{contractMustCount}}张！</span>
                            </div>
                        </el-upload>
                    </base-temp>
                    <base-temp :title="tipsUpload2" :required ="true" v-if="dataMustCount">
                        <el-upload class="upload-img" :action="fileURL" :headers='{ sessionid:token}' :on-remove="dataRemove" :before-upload = "beforeUploadData" :on-success="dataSuccess" :file-list="dataAttachment">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">
                                {{uploadTips}}
                                <span v-if='dataMustCount' slot="tip" class="el-upload__tip">且最少上传{{dataMustCount}}张！</span>
                            </div>
                        </el-upload>
                    </base-temp> -->
                    <base-temp :title="tipsUpload3" :required ="true" v-if="scanMustCount">
                        <el-upload class="upload-img" :action="fileURL" :headers='{sessionid:token}' :on-remove="scanRemove" :before-upload = "beforeUploadScan" :on-success="scanSuccess" :file-list="scanAttachment">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">
                                {{uploadTips}}
                                <span v-if='scanMustCount' slot="tip" class="el-upload__tip">且最少上传{{scanMustCount}}张！</span>
                            </div>
                        </el-upload>
                    </base-temp>
                </div>
            </div>
        </div>
        <div class="segment statistics">
            <div class="sjb-foot-button">
                <el-button type="primary" size="small" @click="submit">提交申请</el-button>
                <el-button size="small" @click="backStep">返回</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import common from '@/utils/common';
import BaseTemp from '@/components/BaseTemp';
import RedStar from '@/components/RedStar/RedStar.vue';
import dynamicForm from "@/components/DynamicForm/dynamic-form";
import sjbtextarea from '@/components/sjbTextarea'

import { getContractTemlist,getContractConfig,getProject,getMainContract,getDetail,getMember,conApply} from '@/api/contractFill';
import { mapState, mapGetters } from "vuex";
import { toJS, fromJS, Map, List } from 'immutable';
import listQueryMix from '../../mixins/listQuery.mix';

import { parseTime } from '@/utils';
import { contractFormVali } from './contract.util';
import config from '@/utils/config';
import utils from '@/utils/utils';
export default {
    components: {
        BaseTemp,
        RedStar,
        dynamicForm,
        sjbtextarea
    },
    mixins: [listQueryMix],
    data() {
        return {
            // pickerOptions: {
            //     disabledDate(time) {
            //         return time.getTime() > Date.now();
            //     }
            // },

            memberFullList:[],
            memberList:[],

            associationMain:false,
            contractTypeName:"",
            businessTypeName:"",
            businessModelName:"",
            keyWords:[],
            chapterList:[],
            projectList:[],
            conInfor: [],
            postData: {//提交数据
                chapterNum:"",
                keyWord:[],
                keyWordName:[],
                // chapterType:[],
                associationMainCode:'',
                associationMainName:'',
                associationMainId:'',
                contractAttachmentRequest: [],//合同附件信息 ,
                contractEndTime : '',//合同结束日期 ,
                contractLeaderId : '',//合同负责人ID ,
                // contractName : '',//合同名称 ,
                configCode:'',
                contractNameId: '',//合同名称模版ID ,
                signLeaderId:'', //合同签约人ID ,
                contractStartTime: '',//合同开始日期 ,
                contractHisMethod:1,
                // expressBill: '',//快递单号 ,
                // expressCompany : '',//快递公司 ,
                // firstAddress : '',//甲方住所 ,
                // firstCreditCode : '',//甲方统一社会信用代码 ,
                // firstLegalRepresentative :'',// 甲方法定代表人 ,
                // firstLinkmanPhone : '',//甲方联系方式 ,
                // firstPartyName:'',// 甲方名称 ,
                id: '',//主键ID ,
                procCode : '',//流程编号 ,
                procInsId : '',//流程实例ID ,
                projectIds : [],//关联项目ID ,
                remarks :'',// 备注 ,
                // secondAddress: '',//乙方住所 ,
                // secondCreditCode : '',// 乙方统一社会信用代码 ,
                // secondLegalRepresentative : '',// 乙方法定代表人 ,
                // secondLinkmanPhone:  '',//乙方联系方式 ,
                // secondPartyName :  '',//乙方名称 ,
                // thirdAddress: '',// 丙方住所 ,
                // thirdCreditCode :  '',//丙方统一社会信用代码 ,
                // thirdLegalRepresentative : '',// 丙方法定代表人 ,
                // thirdLinkmanPhone :  '',//丙方联系方式 ,
                // thirdPartyName : '',// 丙方名称
            },
            contractStartTime : '',//合同开始日期 ,
            contractEndTime : '',//合同结束日期 ,

            total: 0,
            listLoading: false,
            list: [],
            
            dialogFormVisible: false,
            pageNo: 1,
            pageSize: 10,
            listQuery: {
                // queryText: "",
                // contractPartyName:"",
                faint:"",
            },

            fileURL: process.env.BASE_API + '/commonInfo/fileUpload',
            uploadTips: config.tips,
            tipsUpload1:'预签合同图片（该处上传已签约合同照片）',
            tipsUpload2:'附件资料图片（该处上传营业执照和法人身份证正反面，需原件照片或复印件盖章）',
            tipsUpload3:'合同扫描件',
            contractAttachment:[],
            dataAttachment:[],
            scanAttachment:[],
            fileList: [],
            contractMustCount:0,
            contractMaxCount:0,
            dataMustCount:0,
            dataMaxCount:0,
            scanMustCount:0,
            scanMaxCount:0,
        }
    },
    created() {
        this.$store.dispatch('cleanInit')
        // 编辑时
        // if (this.$route.query.key) {
        //     getDetail({
        //         contractFlowId: this.$route.query.key
        //         // contractFormId:"147db155fc2a499f987f89ef9c88ab33"
        //     }).then(res => {
        //         this.postData = res.data.contractFlowDetailInfoNewResponse
        //         getContractConfig({
        //             id:res.data.contractFlowDetailInfoNewResponse.configId
        //         }).then(respond=>{
        //             respond.data.contractPartyList.forEach(item=>{
        //                 item.contractPartyType.forEach(i=>{
        //                     res.data.contractFlowDetailInfoNewResponse.contractPartyList.forEach(item=>{
        //                         for (let key in item){
        //                             if(i.columnName == key){
        //                                 // if(i.columnType=='select'){
        //                                 //     i.value = item['value']
        //                                 // }else{
        //                                     i.value = item[key]
        //                                 // }
        //                             }
        //                         }
        //                     })
        //                 })
        //             })
        //             // this.associationMain = respond.data.associationMain == 1
        //             // this.detail.contractPartyList = respond.data.contractPartyList;
        //             // this.detail
        //             this.$store.dispatch('setData',respond.data)
        //         })
        //         if (
        //             res.data.contractFlowDetailInfoNewResponse.contractAttachmentList &&
        //             res.data.contractFlowDetailInfoNewResponse.contractAttachmentList.length > 0
        //         ) {
        //             res.data.contractFlowDetailInfoNewResponse.contractAttachmentList.forEach(item => {
        //                 let originUrl = item.contractAttachmentUrl;
        //                 item.url = item.urlPrefix + item.url;
        //                 if(item.fileType == 1){
        //                     this.contractAttachment.push({
        //                         url: item.url,
        //                         name: item.name,
        //                         contractAttachmentUrl: originUrl,
        //                         fileType:item.fileType
        //                     })
        //                 }
        //                 if(item.fileType == 3){
        //                     this.dataAttachment.push({
        //                         url: item.url,
        //                         name: item.name,
        //                         contractAttachmentUrl: originUrl,
        //                         fileType:item.fileType
        //                     })
        //                 }
                        
        //             });
        //         }
                
        //     })
        // }
    },
    computed: {
        ...mapState({
            token: state => state.user.token,
            initData:state => state.contract.initData
        })
    },
    mounted() {
        getContractTemlist({}).then(res => {
            this.conInfor = res.data;
        })

        getMember({}).then(res => {
            this.memberFullList = res.data;
            this.memberList = res.data.filter((item)=>{
                return item.userStatus == '1'
            });
        })

        let dicList = JSON.parse(localStorage.getItem("web_oa_dicList"));
        function selectDic(arr, type) {
            let temp = [];
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].type == type) {
                    temp.push(arr[i]);
                };
            }
            return temp;
        }
        this.chapterType = selectDic(dicList, "chapter_type")
    },
    methods: {
        showDetail(row){
            this.$router.push({
                path: "/inforManage/customerForm",
                query: { key: row.custId }
            });
        },
        searchProject(val){
            if(val !==''){
                getProject({
                    //还有项目名称
                    projectName:val,
                    timeType:2,
                    pageNo:1,
                    pageSize:20
                }).then(res=>{
                    this.projectList = res.data.list;
                })
            }
        },
        getConfig(id){
            getContractConfig({
                id:id
            }).then(res=>{
                this.associationMain = res.data.associationMain == 1
                this.contractTypeName = res.data.contractTypeName;
                this.businessTypeName = res.data.businessTypeName;
                this.businessModelName = res.data.businessModelName;
                res.data.keyWords = res.data.keyWords || [];
                this.keyWords = res.data.keyWords;
                res.data.contractConfigAttachmentList.forEach(item=>{
                    // if(item.attachmentType == 1){
                    //     this.contractMustCount = item.mustCount;
                    //     this.contractMaxCount = item.maxCount;
                    // }
                    if(item.attachmentType == 2){
                        this.scanMustCount = item.mustCount;
                        this.scanMaxCount = item.maxCount;
                    }
                    // if(item.attachmentType == 3){
                    //     this.dataMustCount = item.mustCount;
                    //     this.dataMaxCount = item.maxCount;
                    // }
                })
                this.$store.dispatch('cleanInit')
                if(this.initData.length==0){
                    res.data.contractPartyList = res.data.contractPartyList || []
                    this.$store.dispatch('setData',res.data.contractPartyList)
                }
            })
        },
        handleProFilter(){
            this.pageNo = 1;
            this.$$queryStub = fromJS(this.listQuery);
            this.getList();
            this.listLoading = false;
        },
        handleCurrentChange(val) {
            this.pageNo = val;
            this.getList();
            this.listLoading = false;
        },
        showForm() {
            this.dialogFormVisible = true;
            this.$$queryStub = this.$$listQuery;
            this.getList();
            this.listLoading = false;
        },
        // 关联主合同
        selectMain(row) {
            this.postData.associationMainName = row.contractName;
            this.postData.associationMainCode = row.contractCode;
            this.postData.associationMainId = row.id;
            this.dialogFormVisible = false;
        },
        selectContract(){
            if(this.postData.configCode){
                this.conInfor.forEach(item=>{
                    if(item.code == this.postData.configCode){
                        this.postData.contractNameId = item.id
                    }
                })
                this.getConfig(this.postData.contractNameId);
            }
            this.postData.associationMainName = "";
            this.postData.associationMainCode = "";
            this.postData.associationMainId = "";
            this.postData.projectIds = [];
            this.postData.keyWord = [];
            this.postData.keyWordName = [];
        },
        clearContract(){
            this.$store.dispatch('cleanInit');
            this.postData.contractNameId = "";
            this.associationMain = false;
            this.contractMustCount = 0;
            this.contractMaxCount = 0;
            this.dataMustCount = 0;
            this.dataMaxCount = 0;
            this.scanMustCount = 0;
            this.scanMaxCount = 0;
            this.contractTypeName = "";
            this.businessTypeName = "";
            this.businessModelName = "";
        },
        getList() {
            this.listLoading = true;
            var postData = this.$$queryStub.toJS();
            getMainContract({
                ...postData,
                pageNo:this.pageNo,
                pageSize:this.pageSize
            }).then(res => {
                this.list = res.data.list;
                this.total = res.data.total;
                this.listLoading = false;
            })
        },
        restCallback() {
            // 用来补充默认rest不足的问题
        },
        
        // 附件上传成功
        contractSuccess(res, file, fileList) {
            if(res.data.resCode == 1){
                let url = res.data.storfiles.serverUrl + res.data.storfiles.url;
                this.contractAttachment.push({ contractAttachmentUrl:res.data.storfiles.url ,name:file.name,url:url,fileType:1,uid:file.uid});
            }
        },
        dataSuccess(res, file, fileList) {
            if(res.data.resCode == 1){
                let url =res.data.storfiles.serverUrl + res.data.storfiles.url;
                this.dataAttachment.push({ contractAttachmentUrl:res.data.storfiles.url ,name:file.name,url:url,fileType:3,uid:file.uid});
            }
        },
        scanSuccess(res,file,fileList){
            if(res.data.resCode == 1){
                let url =res.data.storfiles.serverUrl + res.data.storfiles.url;
                this.scanAttachment.push({ contractAttachmentUrl:res.data.storfiles.url ,name:file.name,url:url,fileType:2,uid:file.uid});
            }
        },
        // 附件移除
        contractRemove(file, fileList) {
            this.contractAttachment.map((item, index) => {
                if (item.uid == file.uid) {
                    this.contractAttachment.splice(index, 1);
                }
            })
        },
        dataRemove(file, fileList) {
            this.dataAttachment.map((item, index) => {
                if (item.uid == file.uid) {
                    this.dataAttachment.splice(index, 1);
                }
            })
        },
        scanRemove(file,fileList){
            this.scanAttachment.map((item, index) => {
                if (item.uid == file.uid) {
                    this.scanAttachment.splice(index, 1);
                }
            })
        },
        beforeUploadContract(file) {
            const isMax = this.contractAttachment.length < this.contractMaxCount;
            if(!isMax){
                this.$message({
                    message: "预签合同图片上传不能超过"+this.contractMaxCount+'个',
                    type: 'error'
                })
            }
            return isMax&&utils.handleImgError(file)
        },
        beforeUploadData(file) {
            const isMax = this.dataAttachment.length < this.dataMaxCount;
            if(!isMax){
                this.$message({
                    message: "附件资料图片上传不能超过"+this.dataMaxCount+'个',
                    type: 'error'
                })
            }
            return isMax&&utils.handleImgError(file);
        },
        beforeUploadScan(file){
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
        backStep() {
            this.$router.go(-1);
        },
        // 提交
        submit() {
            let tempObj = {}
            this.initData.forEach(item=>{
                item.contractPartyType.forEach(i=>{
                    if(i.required == 1){
                        tempObj[i.columnName] = i.value;
                    }
                })
            })

            this.keyWords.forEach(i=>{
                if(this.postData.keyWord.indexOf(i.key)!=-1){
                    this.postData.keyWordName.push(i.value)
                }
            })

            this.postData.contractAttachmentRequest = [...this.dataAttachment,...this.contractAttachment,...this.scanAttachment];
            this.postData.contractStartTime = common.timeParse(this.contractStartTime);
            this.postData.contractEndTime = common.timeParse(this.contractEndTime);
            if (contractFormVali(this)) {
                conApply({...this.postData,...tempObj}).then(res => {
                    if (res.status == 0) {
                        this.$message({
                            message: res.message,
                            type: 'success'
                        })
                        this.$router.push({path:'/inforManage/contractFillList' });
                    }
                })
            }
        }
    }
}
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
.el-form-item--small .el-form-item__label {
    line-height: 32px;
    font-size: 14px;
    padding-right: 10px;
    color: #99a9bf;
}
.el-input--small .el-input__inner {
    height: 40px!important;
}
.left-red{
    color: red;
    position: absolute;
    left: 50px;
}
.remark{
    margin-top: 25px;
    margin-bottom: 8px;
    background-color: #fdfdfd;
    border: 1px solid#F2F7FA;
}
.remarkTitle{
  margin-right: 100px;
  float: left;
  margin-top: 28px;
  margin-left: 5px
}

.upload-container{
    margin: 50px
}
.editor-slide-upload{
    margin-bottom: 15px
}
.item-value{
    float: left;
    border: 1px solid #dcdfe6;
    border-radius:4px;
    background: white;
    padding-left: 7px;
    line-height: 30px;
    width: 260px
}
.segment .el-table__body-wrapper {
    padding: 40px 20px 35px;
}
.ignore-detail {
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
}
.upload-img{
    width: 550px;
}
.toolbar-item{
    margin-left: 10px
}
</style>
