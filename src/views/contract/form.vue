<template>
    <div class="sjb-form-wrapper">
        <div class="segment statistics">
            <div class="segment-header">
                基本信息
            </div>
            <div class="segment-area">
                <base-temp :title="firstPart">
                    <div class="baseInfo">
                        <span class="left-red">*</span>
                        <span class="left-title font-gray">甲方名称：
                        </span>
                        <span class="item-value" @click="showForm">
                            <i class="el-icon-search" style="color:#bfbfbf"></i>
                            <span style="color:#606266;font-size:14px">{{filter.firstPartyName}}</span>
                            
                        </span>
                        <span style="margin-left:5px;float:left">
                            <el-button type="text" size="mini" @click="clearFirst">清空</el-button>
                        </span>
                        
                    </div>
                    <div class="baseInfo">
                        <span class="left-title font-gray">统一社会信用代码：</span>
                        <span class="right-con">{{filter.firstCreditCode}}</span>
                    </div>
                    <div class="baseInfo">
                        <span class="left-title font-gray">住址：</span>
                        <span class="right-con">{{ filter.firstAddress }}</span>
                    </div>
                    <div class="baseInfo">
                        <span class="left-title font-gray">法定代表人：</span>
                        <span class="right-con">{{ filter.firstLegalRepresentative }}</span>
                    </div>
                    <div class="baseInfo">
                        <span class="left-title font-gray">联系人：</span>
                        <span class="right-con">{{ filter.firstLinkman }}</span>
                    </div>
                    <div class="baseInfo">
                        <span class="left-title font-gray">联系电话：</span>
                        <span class="right-con">{{ filter.firstLinkmanPhone }}</span>
                    </div>
                    <div class="baseInfo">
                        <span class="left-title font-gray">联系邮箱：</span>
                        <span class="right-con">{{ filter.firstLinkmanMail }}</span>
                    </div>
                    <div class="baseInfo">
                        <span class="left-title font-gray">调度费比例：</span>
                        <span class="right-con">{{ filter.dispatchProportion }}%</span>
                    </div>
                </base-temp>
                <base-temp :title="secondPart">
                    <div class="baseInfo">
                        <span class="left-red">*</span>
                        <span class="left-title font-gray">合同名称：
                        </span>
                        <span class="right-con">
                            <el-select clearable class="filter-item ignore-detail" filterable v-model="filter.contractNameCode" placeholder="请选择合同名称" style="width:260px;" @change="selectContract" @clear="clearSecond">
                                <el-option v-for="item in comInfor" :label="item.contractName" :value="item.contractCompanyCode" :key="item.contractCompanyCode">
                                </el-option>
                            </el-select>
                        </span>
                    </div>
                    <div class="baseInfo">
                        <span class="left-title font-gray">乙方名称：</span>
                        <span class="right-con">{{filter.secondPartyName}}</span>
                    </div>
                    <div class="baseInfo">
                        <span class="left-title font-gray">统一社会信用代码：</span>
                        <span class="right-con">{{ filter.secondCreditCode }}</span>
                    </div>
                    <div class="baseInfo">
                        <span class="left-title font-gray">住所：</span>
                        <span class="right-con ignore-detail">{{ filter.secondAddress }}</span>
                    </div>
                    <div class="baseInfo">
                        <span class="left-title font-gray">法定代表人：</span>
                        <span class="right-con">{{ filter.secondLegalRepresentative }}</span>
                    </div>
                    <div class="baseInfo">
                        <span class="left-title font-gray">联系人：</span>
                        <span class="right-con">{{ filter.secondLinkman }}</span>
                    </div>
                    <div class="baseInfo">
                        <span class="left-title font-gray">联系电话：</span>
                        <span class="right-con">{{ filter.secondLinkmanPhone }}</span>
                    </div>
                    <div class="baseInfo">
                        <span class="left-title font-gray">联系邮箱：</span>
                        <span class="right-con">{{ filter.secondLinkmanMail }}</span>
                    </div>
                    <div class="baseInfo">
                        <span class="left-title font-gray">违约金比例：</span>
                        <span class="right-con">{{ filter.penaltyProportion }}</span>
                    </div>
                    <div class="baseInfo">
                        <span class="left-title font-gray">有效期（年）：</span>
                        <span class="right-con">{{ filter.validityDate }}</span>
                    </div>
                </base-temp>
                <base-temp>
                    <div class="baseInfo">
                        <span class="left-red">*</span>
                        <span class="left-title font-gray">签约日期：
                        </span>
                        <span class="right-con">
                            <el-date-picker
                                v-model="contractDate"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                        </span>
                    </div>
                    <!-- <div class="baseInfo">
                        <span class="left-title font-gray">市场负责人：</span>
                        <span class="right-con">{{ partyB.officeName }}</span>
                    </div> -->
                </base-temp>
            </div>
            <el-dialog title="关联甲方名称" :visible.sync="dialogFormVisible">
                <span class="toolbar-item">
                    <span class="item-label">客户名称：</span>
                    <el-input @keyup.enter.native="handleProFilter" style="width: 125px;" class="filter-item" placeholder="请输入客户名称" v-model="listQuery.custName">
                    </el-input>
                </span>
                <!-- <span class="toolbar-item">
                    <span class="item-label">市场负责人：</span>
                    <el-input @keyup.enter.native="handleProFilter" style="width: 135px;" class="filter-item" placeholder="请输入市场负责人" v-model="listQuery.marketLeaderName">
                    </el-input>
                </span> -->
                <span class="toolbar-item">
                    <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleProFilter">搜索</el-button>
                    <el-button class="filter-item" type="warning" icon="el-icon-delete" @click="restListQuery(restCallback)">重置</el-button>
                </span>
                <div class="dialog" style="margin-top:10px">
                    <el-table :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%;" @row-click="selectFirst">
                        <el-table-column align="center" label="客户名称">
                            <template slot-scope="scope">
                                <span class="ignore-detail" :title="scope.row.custName">{{scope.row.custName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="合同联系人">
                            <template slot-scope="scope">
                                <span>{{scope.row.linkmanName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="市场负责人">
                            <template slot-scope="scope">
                                <span class="ignore-detail" :title="scope.row.marketLeaderName">{{scope.row.marketLeaderName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="状态">
                            <template slot-scope="scope">
                                <span class="ignore-detail">{{scope.row.isOverAll == 1?"信息完全":"信息缺失"}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="操作">
                            <template slot-scope="scope">
                                <el-button v-if="scope.row.isOverAll == 0" type="primary" size="mini" @click="showDetail(scope.row)">补全信息</el-button>
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
                快递信息
            </div>
            <div class="segment-area">
                <el-row>
                    <el-col :span="12" class="segment-brline">
                        <div class="clearfix cominfo-item">
                            <span class="left-title font-gray">快递公司：</span>
                            <span class="right-con">
                                <el-input placeholder="请输入快递公司" style="width:250px;" v-model.trim="filter.expressCompany" :maxlength="250"></el-input>
                            </span>
                        </div>
                    </el-col>
                    <el-col :span="12" class="segment-brline">
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">快递单号：</span>
                            <span class="right-con">
                                <el-input placeholder="请输入快递单号" style="width:250px;" :maxlength="50" v-model.trim="filter.expressBill"></el-input>
                            </span>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="segment statistics">
            <div class="segment-header">
                附件
            </div>
            <div class="segment-area">
                <div class="el-table__body-wrapper">
                    <base-temp :title="tipsUpload1" :required ="true">
                        <el-upload class="upload-img" :action="fileURL" :headers='{ sessionid:token}' :on-remove="contractRemove" :before-upload = "beforeUpload" :on-success="contractSuccess" :file-list="contractAttachment">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">{{uploadTips}}</div>
                        </el-upload>
                    </base-temp>
                    <base-temp :title="tipsUpload2" :required ="true">
                        <el-upload class="upload-img" :action="fileURL" :headers='{ sessionid:token}' :on-remove="dataRemove" :before-upload = "beforeUpload" :on-success="dataSuccess" :file-list="dataAttachment">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">{{uploadTips}}</div>
                        </el-upload>
                    </base-temp>
                </div>
            </div>
        </div>
        <div class="segment statistics">
            <div class="sjb-foot-button">
                <el-button type="primary" size="small" @click="submit('apply')">提交申请</el-button>
                <el-button size="small" @click="backStep">返回</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import common from '@/utils/common'
import BaseTemp from '@/components/BaseTemp'
import { fetchComInfoList, conApply, getDetail, getFirstPart } from '@/api/contract'
import { mapState, mapGetters } from "vuex";
import { toJS, fromJS, Map, List } from 'immutable';
import listQueryMix from '../../mixins/listQuery.mix'

import { parseTime } from '@/utils'
import { contractFormVali } from './contract.util'
import config from '@/utils/config'
import utils from '@/utils/utils'
export default {
    components: {
        BaseTemp
    },
    mixins: [listQueryMix],
    data() {
        return {
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            },

            firstPart:'甲方基本明细',
            secondPart:'乙方基本明细',

            fileList: [],
            dialogFormVisible: false,
            contractDate:"",
            filter: {//筛选条件
                contractAttachmentList:[],// 合同附件信息 ,
                contractDate: "",//签约日期 ,
                expressBill:"",//快递单号 ,
                expressCompany:"",//快递公司 ,

                custId: "",//客户Id ,
                dispatchProportion:"", //调度费比例 ,
                firstAddress:"" ,//甲方住所 ,
                firstCreditCode:"",// 甲方统一社会信用代码 ,
                firstLegalRepresentative:"", //甲方法定代表人 ,
                firstLinkman:"",// 甲方联系人 ,
                firstLinkmanMail:"",//甲方联系人邮箱 ,
                firstLinkmanPhone:"",//甲方联系人电话 ,
                firstPartyName:"", //甲方名称 ,

                id:"" ,//主键ID ,
                procCode:"",//流程编号 ,
                procInsId:"",// 流程实例ID ,
                remarks:"",// 备注 ,

                contractName: "",//合同名称 ,
                contractNameCode: "",//合同名称编码 ,
                secondAddress:"",// 乙方住所 ,
                secondCreditCode:"",// 乙方统一社会信用代码 ,
                secondLegalRepresentative:"",// 乙方法定代表人 ,
                secondLinkman:"",// 乙方联系人 ,
                secondLinkmanMail:"",// 乙方联系人邮箱 ,
                secondLinkmanPhone:"",// 乙方联系人电话 ,
                secondPartyName:"",// 乙方名称 ,
                validityDate:"",// 有效期(年)
                penaltyProportion:"",//违约金比例 ,
            },
            
            total: undefined,
            listLoading: false,
            list: [],
            comInfor: [],

            pageNo: 1,
            pageSize: 10,
            listQuery: {
                custName: "",
                marketLeaderName:""
            },

            fileURL: process.env.BASE_API + '/commonInfo/fileUpload',
            uploadTips: config.tips,
            tipsUpload1:'预签合同图片（该处上传已签约合同照片）',
            tipsUpload2:'附件资料图片（该处上传营业执照和法人身份证正反面，需原件照片或复印件盖章）',
            dataAttachment:[],
            contractAttachment:[]
        }
    },
    created() {
        // 编辑时
        if (this.$route.query.key) {
            getDetail({
                contractFlowId: this.$route.query.key
            }).then(res => {
                this.contractDate = common.formatDateTime(res.data.contractFlowResponse.contractDate)
                this.filter = res.data.contractFlowResponse
                if (
                    res.data.contractFlowResponse.contractAttachmentList &&
                    res.data.contractFlowResponse.contractAttachmentList.length > 0
                ) {
                    res.data.contractFlowResponse.contractAttachmentList.forEach(item => {
                        let originUrl = item.contractAttachmentUrl;
                        item.url = item.urlPrefix + item.url;
                        if(item.fileType == 0){
                            this.contractAttachment.push({
                                url: item.url,
                                name: item.name,
                                contractAttachmentUrl: originUrl,
                                fileType:item.fileType
                            })
                        }
                        if(item.fileType == 1){
                            this.dataAttachment.push({
                                url: item.url,
                                name: item.name,
                                contractAttachmentUrl: originUrl,
                                fileType:item.fileType
                            })
                        }
                        
                    });
                }
                
            })
        }
    },
    computed: {
        ...mapState({
            token: state => state.user.token,
        }),
    },
    mounted() {
        //获取字典
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

        fetchComInfoList({}).then(res => {
            this.comInfor = res.data;
        })
    },
    methods: {
        showDetail(row){
            this.$router.push({
                path: "/inforManage/customerForm",
                query: { key: row.custId }
            });
        },
        handleProFilter(){
            this.pageNo = 1
            this.$$queryStub = fromJS(this.listQuery);
            this.getList()
            this.listLoading = false;
        },
        handleCurrentChange(val) {
            this.pageNo = val
            this.getList()
            this.listLoading = false;
        },
        showForm() {
            this.dialogFormVisible = true;
            this.listLoading = false;
            this.$$queryStub = this.$$listQuery;
            this.getList()
        },
        // 选择项目
        selectFirst(row) {
            if(row.isOverAll==1){
                // custCode: "",//客户编码 ,
                // dispatchProportion:"", //调度费比例 ,
                // firstAddress:"" ,//甲方住所 ,
                // firstCreditCode:"",// 甲方统一社会信用代码 ,
                // firstLegalRepresentative:"", //甲方法定代表人 ,
                // firstLinkman:"",// 甲方联系人 ,
                // firstLinkmanMail:"",//甲方联系人邮箱 ,
                // firstLinkmanPhone:"",//甲方联系人电话 ,
                // firstPartyName:"", //甲方名称 ,
                this.filter.custId = row.custId
                this.filter.firstAddress = row.custAddress
                this.filter.firstCreditCode = row.creditCode
                this.filter.firstLegalRepresentative = row.legalRepresentative
                this.filter.firstLinkman = row.linkmanName
                this.filter.firstLinkmanMail = row.linkmanMail
                this.filter.firstLinkmanPhone = row.linkmanPhone
                this.filter.firstPartyName = row.custName
                this.filter.dispatchProportion = row.dispatchProportion
                this.dialogFormVisible = false
            }else{
                this.$message({
                    message: "甲方信息不全，请补全相关信息！",
                    type: 'warning'
                })
            }
            
        },
        selectContract(){
            // secondAddress:"",// 乙方住所 ,
            // secondCreditCode:"",// 乙方统一社会信用代码 ,
            // secondLegalRepresentative:"",// 乙方法定代表人 ,
            // secondLinkman:"",// 乙方联系人 ,
            // secondLinkmanMail:"",// 乙方联系人邮箱 ,
            // secondLinkmanPhone:"",// 乙方联系人电话 ,
            // secondPartyName:"",// 乙方名称 ,
            // validityDate:"",// 有效期(年)
            //penaltyProportion:"",//
            // contractCompanyCode
            this.comInfor.forEach(item=>{
                if(item.contractCompanyCode == this.filter.contractNameCode){
                    this.filter.contractName = item.contractName
                    this.filter.secondAddress = item.secondAddress
                    this.filter.secondCreditCode = item.secondCreditCode
                    this.filter.secondLegalRepresentative = item.secondLegalRepresentative
                    this.filter.secondLinkman = item.secondLinkman
                    this.filter.secondLinkmanMail = item.secondLinkmanMail
                    this.filter.secondLinkmanPhone = item.secondLinkmanPhone
                    this.filter.secondPartyName = item.secondPartyName
                    this.filter.validityDate = item.validityTime
                    this.filter.penaltyProportion = item.penaltyProportion
                }
            })
        },
        clearFirst(){
            this.filter.custId = ""
            this.filter.firstAddress = ""
            this.filter.firstCreditCode = ""
            this.filter.firstLegalRepresentative = ""
            this.filter.firstLinkman = ""
            this.filter.firstLinkmanMail = ""
            this.filter.firstLinkmanPhone = ""
            this.filter.firstPartyName = ""
            this.filter.dispatchProportion = ""
        },
        clearSecond(){
            this.filter.contractName=""//合同名称 ,
            this.filter.contractNameCode= ""//合同名称编码 ,
            this.filter.secondAddress=""// 乙方住所 ,
            this.filter.secondCreditCode=""// 乙方统一社会信用代码 ,
            this.filter.secondLegalRepresentative=""// 乙方法定代表人 ,
            this.filter.secondLinkman=""// 乙方联系人 ,
            this.filter.secondLinkmanMail=""// 乙方联系人邮箱 ,
            this.filter.secondLinkmanPhone=""// 乙方联系人电话 ,
            this.filter.secondPartyName=""// 乙方名称 ,
            this.filter.validityDate="",// 有效期(年)
            this.filter.penaltyProportion=""//违约金比例 ,
        },
        getList() {
            this.listLoading = true
            var postData = this.$$queryStub.toJS();
            getFirstPart({
                ...postData,
                pageNo:this.pageNo,
                pageSize:this.pageSize
            }).then(res => {
                this.list = res.data.list
                this.total = res.data.total
                this.listLoading = false
            })
        },
        restCallback() {
            // 用来补充默认rest不足的问题
        },
        
        // 附件上传成功
        contractSuccess(res, file, fileList) {
            if(res.data.resCode == 1){
                let url =res.data.storfiles.serverUrl + res.data.storfiles.url
                this.contractAttachment.push({ contractAttachmentUrl:res.data.storfiles.url ,name:file.name,url:url,fileType:0})
            }
        },
        dataSuccess(res, file, fileList) {
            if(res.data.resCode == 1){
                let url =res.data.storfiles.serverUrl + res.data.storfiles.url
                this.dataAttachment.push({ contractAttachmentUrl:res.data.storfiles.url ,name:file.name,url:url,fileType:1})
            }
        },
        // 附件移除
        contractRemove(file, fileList) {
            this.contractAttachment.map((item, index) => {
                if (item.name == file.name) {
                    this.contractAttachment.splice(index, 1)
                }
            })
        },
        dataRemove(file, fileList) {
            this.dataAttachment.map((item, index) => {
                if (item.name == file.name) {
                    this.dataAttachment.splice(index, 1)
                }
            })
        },
        beforeUpload(file) {
            return utils.handleImgError(file)
        },
        backStep() {
            this.$router.go(-1)
        },
        // 提交
        submit(type) {
            this.filter.contractAttachmentList = [...this.dataAttachment,...this.contractAttachment]
            this.filter.contractDate = common.timeParse(this.contractDate)
            
            if (type == 'apply' && contractFormVali(this)) {
                conApply(this.filter).then(res => {
                    if (res.status == 0) {
                        this.$message({
                            message: res.message,
                            type: 'success'
                        })
                        this.$router.push({path:'/task/todo' })
                    }
                })
            }
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.baseInfo{
    width: 49%;
    display: inline-block;
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
    width: 500px;
}
.toolbar-item{
    margin-left: 10px
}
</style>
