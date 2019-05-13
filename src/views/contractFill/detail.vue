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
                                <li class="base-li" v-if="detail.contractCode">
                                    <span class="left-title font-gray">合同编号：</span>
                                    <span class="right-con">{{detail.contractCode}}</span>
                                </li>
                                <li class="base-li">
                                    <span class="left-title font-gray">合同名称：</span>
                                    <span class="right-con">{{ detail.contractName }}</span>
                                </li>
                                <li class="base-li">
                                    <span class="left-title font-gray">合同归档方式：</span>
                                    <span class="right-con">{{ detail.contractHisMethodName }}</span>
                                </li>
                                <li class="base-li">
                                    <span class="left-title font-gray">合同类型：</span>
                                    <span class="right-con">{{ detail.contractTypeName }}</span>
                                </li>
                                <li class="base-li">
                                    <span class="left-title font-gray">合同归档时间：</span>
                                    <span class="right-con">{{ detail.createTime | stamp2TextDateFull }}</span>
                                </li>
                                <li class="base-li" v-if="associationMain">
                                    <span class="left-title font-gray">关联主合同编号：</span>
                                    <span class="right-con">{{ detail.associationMainCode }}</span>
                                </li>
                                <li class="base-li" v-if="!associationMain">
                                    <span class="left-title font-gray">关联项目：</span>
                                    <span class="right-con">{{ projectName.join('，') }}</span>
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
                                    <span style="margin-left:65%">
                                        <el-button type="primary" size="small" @click="showChargeMan">前负责人</el-button>
                                    </span>
                                </li>
                                <li class="base-li">
                                    <span class="left-title font-gray">合同保管人：</span>
                                    <span class="right-con">{{ detail.custodian }}</span>
                                </li>
                            </ul>
                        </base-temp>
                        <base-temp :title="receiptPart">
                            <ul class="base-ul">
                                <li class="base-li">
                                    <span class="left-title font-gray">回执状态：</span>
                                    <span class="right-con">{{detail.receiptStatusName}}</span>
                                </li>
                                <li class="base-li">
                                    <span class="left-title font-gray">回执操作人：</span>
                                    <span class="right-con">{{detail.personName}}</span>
                                </li>
                                <li class="base-li">
                                    <span class="left-title font-gray">回执操作人手机号：</span>
                                    <span class="right-con">{{ detail.personPhone }}</span>
                                </li>
                                <li class="base-li">
                                    <span class="left-title font-gray">回执操作时间：</span>
                                    <span class="right-con">{{ detail.receiptTime | stamp2TextDateFull }}</span>
                                </li>
                            </ul>
                        </base-temp>
                    </div>
                </div>
            </div>
            
            <div class="segment statistics part-wrap" v-if="detail.contractAttachmentResponse&&detail.contractAttachmentResponse.length > 0">
                <div class="segment-header">
                    附件
                </div>
                <div class="segment-area">
                    <div class="el-table__body-wrapper">
                        <!-- <base-temp :title="tipsUpload1" v-if="contractAttachment.length>0">
                            <div v-for="(val,index) in contractAttachment" :key="index" style="width:40%;margin-bottom:15px">
                                <div v-if="val.url != ''" class="upload-list">
                                    <span class="img-font">{{val.name}}</span>
                                    <el-button v-if="['png','gif','jpeg','jpg'].indexOf(val.name.split('.')[val.name.split('.').length - 1]) == -1" type="text" style="float:right" @click="downAttach(val)">下载</el-button>
                                    <el-button v-else type="text" @click="showImg(index,1)" style="float:right">
                                        查看<img :src="val.url" style="display:none">
                                    </el-button>
                                    
                                </div>
                            </div>
                        </base-temp>
                        <base-temp :title="tipsUpload2" v-if="dataAttachment.length>0">
                            <div v-for="(val,index) in dataAttachment" :key="index" style="width:40%;margin-bottom:15px">
                                <div v-if="val.url != ''" class="upload-list">
                                    <span class="img-font">{{val.name}}</span>
                                    <el-button v-if="['png','gif','jpeg','jpg'].indexOf(val.name.split('.')[val.name.split('.').length - 1]) == -1" type="text" style="float:right" @click="downAttach(val)">下载</el-button>
                                    <el-button v-else type="text" @click="showImg(index,2)" style="float:right">
                                        查看<img :src="val.url" style="display:none">
                                    </el-button>
                                    
                                </div>
                            </div>
                        </base-temp> -->
                        <base-temp :title="tipsUpload3" v-if="scanConAttachment.length>0">
                            <div v-for="(val,index) in scanConAttachment" :key="index" style="width:40%;margin-bottom:15px">
                                <div v-if="val.url != ''" class="upload-list">
                                    <span class="img-font">{{val.name}}</span>
                                    <el-button v-if="['png','gif','jpeg','jpg'].indexOf((val.name.split('.')[val.name.split('.').length - 1]).toLowerCase()) == -1" type="text" style="float:right" @click="downAttach(val)">下载</el-button>
                                    <el-button v-else type="text" @click="showImg(index,3)" style="float:right">
                                        查看<img :src="val.url" style="display:none">
                                    </el-button>
                                </div>
                            </div>
                        </base-temp>
                        <base-temp :title="tipsUpload4" v-if="renewAttachment.length>0">
                            <div v-for="(val,index) in renewAttachment" :key="index" style="width:40%;margin-bottom:15px">
                                <div v-if="val.url != ''" class="upload-list">
                                    <span class="img-font">{{val.name}}</span>
                                    <el-button v-if="['png','gif','jpeg','jpg'].indexOf((val.name.split('.')[val.name.split('.').length - 1]).toLowerCase()) == -1" type="text" style="float:right" @click="downAttach(val)">下载</el-button>
                                    <el-button v-else type="text" @click="showImg(index,4)" style="float:right">
                                        查看<img :src="val.url" style="display:none">
                                    </el-button>
                                </div>
                            </div>
                        </base-temp>
                        <base-temp :title="tipsUpload5" v-if="abandonAttachment.length>0">
                            <div v-for="(val,index) in abandonAttachment" :key="index" style="width:40%;margin-bottom:15px">
                                <div v-if="val.url != ''" class="upload-list">
                                    <span class="img-font">{{val.name}}</span>
                                    <el-button v-if="['png','gif','jpeg','jpg'].indexOf((val.name.split('.')[val.name.split('.').length - 1]).toLowerCase()) == -1" type="text" style="float:right" @click="downAttach(val)">下载</el-button>
                                    <el-button v-else type="text" @click="showImg(index,5)" style="float:right">
                                        查看<img :src="val.url" style="display:none">
                                    </el-button>
                                </div>
                            </div>
                        </base-temp>
                    </div>
                </div>
            </div>
            <div class="segment statistics part-wrap" v-if="detail.suppResp&&detail.suppResp.length > 0">
                <div class="segment-header">
                    附件协议
                </div>
                <div class="segment-area">
                    <div class="el-table__body-wrapper">
                        <el-collapse>
                            <ul v-for="(item,index) in detail.suppResp">
                                <li :key="index">
                                    <el-collapse-item :name="item.suppId">
                                        <template slot="title">
                                            <span class="info-color">
                                                {{item.suppName}}
                                            </span>
                                            <i class="header-icon el-icon-info info-color"></i>
                                        </template>
                                        <ContractDetail :contractId="item.suppId"></ContractDetail>
                                    </el-collapse-item>
                                </li>
                            </ul>
                        </el-collapse>
                    </div>
                </div>
            </div>
        </div>
        
        <el-dialog title="前负责人" :visible.sync="dialogCharge">
            <!-- <div class="filter-container">
                <div class="toolbar-item">
                    <span class="item-label">合同编号/甲方/乙方/丙方：</span>
                    <el-input @keyup.enter.native="handleFilter" style="width: 140px;" class="filter-item" placeholder="请输入合同编号/甲方/乙方/丙方" v-model.trim="listQuery.faint">
                    </el-input>
                </div>
                <div class="toolbar-item">
                    <span class="item-label">合同方名称：</span>
                    <el-input @keyup.enter.native="handleFilter" style="width: 140px;" class="filter-item" placeholder="请输入甲/乙方名称" v-model.trim="listQuery.companyName">
                    </el-input>
                </div>
                <div class="toolbar-item">
                    <span class="item-label">合同名称：</span>
                    <el-select clearable filterable style="width: 220px" class="filter-item" v-model="listQuery.contractId" placeholder="请输入项目名称">
                        <el-option v-for="item in comInfor" :key="item.id" :label="item.contractName" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="toolbar-item">
                    <span class="item-label">合同签约人：</span>
                    <el-select clearable filterable class="filter-item" filterable v-model="listQuery.contractLeaderId" placeholder="请选择合同负责人" style="width:220px;">
                        <el-option v-for="item in memberList" :label="item.name" :value="item.id" :key="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="toolbar-item">
                    <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
                    <el-button class="filter-item" type="warning" v-waves icon="el-icon-delete" @click="restListQuery(restCallback)">重置</el-button>
                    <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">新建合同归档</el-button>
                </div>
                <div class="toolmore-control">
                    <el-button icon="el-icon-arrow-up" v-if="toolexpand" class="toolmore-control-btn" @click="toolexpand = false">收起</el-button>
                    <el-button icon="el-icon-arrow-down" v-else class="toolmore-control-btn" @click="toolexpand = true">展开</el-button>
                </div>
                <el-collapse-transition>
                    <div v-show="toolexpand">
                        <div class="toolbar-row">
                            <div class="toolbar-item">
                                <span class="item-label">归档日期：</span>
                                <el-date-picker v-model="listQuery.timeRange" type="daterange" class="filter-item" style="width:287px" placeholder="选择日期范围"  :picker-options="pickerOptions">
                                </el-date-picker>
                            </div>
                            <div class="toolbar-item">
                                <span class="item-label">合同名称：</span>
                                <el-select clearable filterable style="width: 220px" class="filter-item" v-model="listQuery.contractNameCode" placeholder="请输入项目名称">
                                    <el-option v-for="item in comInfor" :key="item.contractCompanyCode" :label="item.contractName" :value="item.contractCompanyCode">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="toolbar-item">
                                <span class="item-label">合同状态：</span>
                                <el-select clearable style="width: 120px" class="filter-item" v-model="listQuery.contractHisStatus" placeholder="请选择">
                                    <el-option v-for="item in conStatuList" :key="item.value" :label="item.name" :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="toolbar-item">
                                <span class="item-label">合同类型：</span>
                                <el-select clearable style="width: 120px" class="filter-item" v-model="listQuery.contractType" placeholder="请选择">
                                    <el-option v-for="item in conTypeList" :key="item.value" :label="item.name" :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                    </div>
                </el-collapse-transition>
            </div> -->

            <el-table :data="chargeList" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
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
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogCharge = false">取消</el-button>
            </div>
        </el-dialog>
        <div class="segment statistics">
            <div class="sjb-foot-button">
                <el-button size="medium" type="warning" v-if="detail.button == '1'" @click="confirmHandle(1)">已经续签</el-button>
                <el-button size="medium" type="warning" v-if="detail.button == '1'" @click="confirmHandle(2)">不再续签</el-button>
                <el-button size="medium" @click="backBtn">返回</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import common from "@/utils/common";
import BaseTemp from '@/components/BaseTemp';
import ContractDetail from '@/components/ContractDetail';
import { toJS, fromJS, Map, List } from 'immutable';
import listQueryMix from '../../mixins/listQuery.mix';
import {
    getContractConfig,
    getDetail,
    findAllProject,
    changeRecord,
    changeReceipt,
    downFile
} from "@/api/contractFill";
import { parseTime } from "@/utils";
import { mapState } from "vuex";
import config from '@/utils/config';
import utils from '@/utils/utils';
import "viewerjs/dist/viewer.css";
import Viewer from 'viewerjs';

export default {
    components: {
        BaseTemp,
        ContractDetail
    },
    mixins: [listQueryMix],
    data() {
        return {
            contractPart:'合同情况',
            receiptPart:"回执情况",
            tipsUpload1:'预签合同图片（必填）（该处上传已签约合同照片）',
            tipsUpload2:'附件资料图片（必填）（该处上传营业执照和法人身份证正反面，需原件照片或复印件盖章）',
            tipsUpload3:'合同扫描件图片（必填）',
            tipsUpload4:'续签合同凭证（必填）',
            tipsUpload5:'废弃合同凭证（必填）',
            dataAttachment:[],
            contractAttachment:[],
            scanConAttachment:[],
            renewAttachment:[],
            abandonAttachment:[],
            fileURL: process.env.BASE_API + "/commonInfo/fileUpload",
            uploadTips: config.tips,
            detail: {},
            projectName:[],
            associationMain:false,


            dialogCharge:false,
            chargeList:[],
            total:0,
            pageNo:1,
            pageSize:10,
            listLoading:false,
            listQuery:{
                contractId:''
            },


            configId:''
        };
    },
    created() {
        this.detailPromise().then(res=>{
            getContractConfig({
                id:res.data.contractHisDetailResponse.configId
            }).then(respond=>{
                respond.data.contractPartyList.forEach(item=>{
                    item.contractPartyType.forEach(i=>{
                        res.data.contractHisDetailResponse.contractPartyList.forEach(item=>{
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
                this.associationMain = respond.data.associationMain == 1
                this.detail.contractPartyList = respond.data.contractPartyList;
                // this.detail
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
        })

        // getDetail({
        //     id: this.$route.query.key
        // }).then(res => {
        //     this.detail = res.data.contractHisDetailResponse;
        //     getContractConfig({
        //         id:res.data.contractHisDetailResponse.configId
        //     }).then(respond=>{
        //         respond.data.contractPartyList.forEach(item=>{
        //             item.contractPartyType.forEach(i=>{
        //                 res.data.contractHisDetailResponse.contractPartyList.forEach(item=>{
        //                     for (let key in item){
        //                         if(i.columnName == key){
        //                             if(i.columnType=='select'){
        //                                 i.value = item['value']
        //                             }else{
        //                                 i.value = item[key]
        //                             }
        //                         }
        //                     }
        //                 })
        //             })
        //         })
        //         this.associationMain = respond.data.associationMain == 1
        //         this.detail.contractPartyList = respond.data.contractPartyList;
        //         // this.detail
        //     })
        //     if (
        //         res.data.contractHisDetailResponse.contractAttachmentResponse &&
        //         res.data.contractHisDetailResponse.contractAttachmentResponse.length > 0
        //     ) {
        //         res.data.contractHisDetailResponse.contractAttachmentResponse.forEach(item => {
        //             let originUrl = item.contractAttachmentUrl;
        //             item.url = item.urlPrefix + item.contractAttachmentUrl;
        //             if(item.fileType == 1){
        //                 this.contractAttachment.push({
        //                     url: item.url,
        //                     name: item.name,
        //                     originUrl: originUrl,
        //                     fileType:item.fileType,
        //                     previewUrl: item.url,
        //                     viewer: null
        //                 })
        //             }
        //             if(item.fileType == 3){
        //                 this.dataAttachment.push({
        //                     url: item.url,
        //                     name: item.name,
        //                     originUrl: originUrl,
        //                     fileType:item.fileType,
        //                     previewUrl: item.url,
        //                     viewer: null
        //                 });
        //             }
        //             if(item.fileType == 2){
        //                 this.scanConAttachment.push({
        //                     url: item.url,
        //                     name: item.name,
        //                     originUrl: originUrl,
        //                     fileType:item.fileType,
        //                     previewUrl: item.url,
        //                     viewer: null
        //                 });
        //             }
        //             if(item.fileType == 4){
        //                 this.renewAttachment.push({
        //                     url: item.url,
        //                     name: item.name,
        //                     originUrl: originUrl,
        //                     fileType:item.fileType,
        //                     previewUrl: item.url,
        //                     viewer: null
        //                 });
        //             }
        //             if(item.fileType == 5){
        //                 this.abandonAttachment.push({
        //                     url: item.url,
        //                     name: item.name,
        //                     originUrl: originUrl,
        //                     fileType:item.fileType,
        //                     previewUrl: item.url,
        //                     viewer: null
        //                 });
        //             }
        //         });
        //     }
        // });
    },
    methods: {
        detailPromise(){
            return new Promise((resolve,reject)=>{
                getDetail({
                    id: this.$route.query.key
                }).then(res=>{
                    this.detail = res.data.contractHisDetailResponse;
                    this.detail.projectList&&this.detail.projectList.forEach(item=>{
                        this.projectName.push(item.projectName)
                    })
                    if (
                        res.data.contractHisDetailResponse.contractAttachmentResponse &&
                        res.data.contractHisDetailResponse.contractAttachmentResponse.length > 0
                    ) {
                        res.data.contractHisDetailResponse.contractAttachmentResponse.forEach(item => {
                            let originUrl = item.contractAttachmentUrl;
                            item.url = item.urlPrefix + item.contractAttachmentUrl;
                            // if(item.fileType == 1){
                            //     this.contractAttachment.push({
                            //         url: item.url,
                            //         name: item.name,
                            //         originUrl: originUrl,
                            //         fileType:item.fileType,
                            //         previewUrl: item.url,
                            //         viewer: null
                            //     })
                            // }
                            // if(item.fileType == 3){
                            //     this.dataAttachment.push({
                            //         url: item.url,
                            //         name: item.name,
                            //         originUrl: originUrl,
                            //         fileType:item.fileType,
                            //         previewUrl: item.url,
                            //         viewer: null
                            //     });
                            // }
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
                            if(item.fileType == 4){
                                this.renewAttachment.push({
                                    url: item.url,
                                    name: item.name,
                                    originUrl: originUrl,
                                    fileType:item.fileType,
                                    previewUrl: item.url,
                                    viewer: null
                                });
                            }
                            if(item.fileType == 5){
                                this.abandonAttachment.push({
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
            if(type == 4){
                if (this.renewAttachment[index].viewer) {
                    this.renewAttachment[index].viewer.show();
                    return;
                    // this.clientimg[index].viewer.destroy();//也可以销毁后再重新初始化
                }
                // 初始化
                this.renewAttachment[index].viewer = new Viewer(event.target, {});
                // 调用show
                this.renewAttachment[index].viewer.show();
            }
            if(type == 5){
                if (this.abandonAttachment[index].viewer) {
                    this.abandonAttachment[index].viewer.show();
                    return;
                    // this.clientimg[index].viewer.destroy();//也可以销毁后再重新初始化
                }
                // 初始化
                this.abandonAttachment[index].viewer = new Viewer(event.target, {});
                // 调用show
                this.abandonAttachment[index].viewer.show();
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
        showChargeMan(){
            this.dialogCharge = true;
            this.listQuery.contractId = this.detail.id 
            this.$$queryStub = fromJS(this.listQuery);
            // this.$$queryStub = this.$$listQuery;

            this.getChangeList()
        },
        handleProFilter(){
            this.pageNo = 1;
            this.$$queryStub = fromJS(this.listQuery);
            this.getConnect();
            this.listLoading = false;
        },
        handleCurrentChange(val) {
            this.pageNo = val;
            this.getConnect();
            this.listLoading = false;
        },
        getChangeList(){
            this.listLoading = true;
            var postData = this.$$queryStub.toJS();
            changeRecord({
                ...postData,
                pageNo:this.pageNo,
                pageSize:this.pageSize
            }).then(res=>{
                this.chargeList = res.data.list;
                this.total = res.data.total;
                this.listLoading = false;
            })
        },
        restCallback(){
            this.listQuery.projectId = this.$route.query.key
            this.$$queryStub = fromJS(this.listQuery);
        },
        confirmHandle(receiptStatus){
            changeReceipt({
                contractId:this.$route.query.key,
                receiptStatus:receiptStatus
            }).then(res=>{
                if (res.status == 0) {
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
                    this.$router.push({path:'/inforManage/contractFillList' });
                }
            })
        }
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
.info-color{
    color: #409EFF;
}
</style>
