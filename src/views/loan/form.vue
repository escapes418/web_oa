<template>
    <div class="sjb-form-wrapper">
        <el-alert
            title="如关联项目，则费用归属于项目；如不关联项目，则费用归属于个人。"
            class="remarkInfo"
            :closable="false"
            show-icon
            type="info">
        </el-alert>
        <div class="segment statistics">
            <div class="segment-header">
                基本信息
            </div>
            <div class="segment-area">
                <el-row>
                    <el-col :span="12" class="segment-brline">
                        <RedStar label="借款人：">
                            <span class="right-con">{{userInfo.name || ""}}</span>
                        </RedStar>
                        <Department type="form" :DId="postData.officeId" :Dlabel="labelName" :Dvalue="postData.officeName" @on-confirm="depConfirm"></Department>
                        <Project @on-select="proSelect" :Pvalue="this.postData.projectName"></Project>
                        
                        <RedStar label="备注：">
                            <span class="right-con">
                                <sjbtextarea placeholder="请输入"
                                textStyle="width:250px;"
                                :rows="3"
                                :max="700"
                                v-model.trim="postData.remarks"></sjbtextarea>
                            </span>
                        </RedStar>
                    </el-col>
                    <el-col :span="12" class="segment-brline">
                        <RedStar label="借款时间：">
                            <span class="right-con">{{ applyTime }}</span>
                        </RedStar>
                        <RedStar label="岗位名称：">
                            <span class="right-con">{{ userInfo.postName || "" }}</span>
                        </RedStar>
                        <RedStar label="所属公司：" :required="true">
                            <el-select clearable class="filter-item " v-model="postData.companyId" placeholder="请选择" style="width:250px;" @change="setCompany">
                                <el-option v-for="item in taxList" :label="item.name" :value="item.value" :key="item.value">
                                </el-option>
                            </el-select>
                        </RedStar>
                        
                        
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="segment statistics">
            <div class="segment-header">
                借款信息
            </div>
            <div class="segment-area">
                <el-row>
                    <el-col :span="12" class="segment-brline">
                        <RedStar label="收款帐号：" :required="true">
                            <el-select clearable class="filter-item " v-model="postData.receivablesAccountId" placeholder="请选择" style="width:250px;" @change="setAccount">
                                <el-option v-for="item in bankList" :label="item.splitName" :value="item.id" :key="item.id">
                                </el-option>
                            </el-select>
                        </RedStar>
                        <RedStar label="预计还款时间：" :required="true">
                            <span class="right-con">
                                <el-date-picker
                                    v-model="planRepayTime"
                                    style="width:250px;"
                                    type="date"
                                    placeholder="选择日期">
                                </el-date-picker>
                            </span>
                        </RedStar>
                        
                    </el-col>
                    <el-col :span="12" class="segment-brline">
                        <RedStar label="借款金额：" :required="true">
                            <span class="right-con">
                                <el-input type="number" placeholder="请输入" style="width:250px;" v-model.number="postData.loanAmount"></el-input>
                            </span>
                        </RedStar>
                        <RedStar label="借款事由：" :required="true">
                            <span class="right-con">
                                <sjbtextarea placeholder="请输入"
                                textStyle="width:250px;"
                                :rows="3"
                                :max="700"
                                v-model.trim="postData.loanReason"></sjbtextarea>
                            </span>
                        </RedStar>
                        
                        
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
                    <el-upload class="upload-img" :action="fileURL" :headers='{ sessionid:token}' :on-remove="handleRemove" :before-upload = "beforeUpload" :on-success="handleSuccess" :file-list="expenseAttachment">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">{{uploadTips}}</div>
                    </el-upload>
                </div>
            </div>
        </div>
        <div class="segment statistics">
            <div class="sjb-foot-button">
                <el-button type="primary" size="small" @click="submit('apply')">提交申请</el-button>
                <!-- <el-button type="primary" size="small" @click="submit('save')">借款保存</el-button> -->
                <el-button size="small" @click="backStep">返回</el-button>
            </div>
        </div>
        <el-dialog title="新增收款账户" :visible.sync="dialogAccount" width="26%" :center="true" :close-on-click-modal="false" :show-close="false" :close-on-press-escape="false">
            <span class="">亲爱的用户，请在个人中心-账户管理-新增添加收款账户，让借款更便利</span>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="jumpAccount">前往设置</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import common from '@/utils/common'
import Approval from '@/components/Approval'
import Project from '@/components/Project'
import RedStar from '@/components/RedStar/RedStar.vue'
import sjbtextarea from '@/components/sjbTextarea'
import Department from "@/components/Department";
import { getAccountList , loanApply , loanSave ,getDetail } from '@/api/loan'
import { mapState, mapGetters } from "vuex";

import { parseTime } from '@/utils'
import { loanFormVali } from './loan.util'
import config from '@/utils/config'
import utils from '@/utils/utils'
import { toJS, fromJS, Map, List } from 'immutable';
import listQueryMix from '../../mixins/listQuery.mix'

export default {
    components: {
        Approval,
        Project,
        RedStar,
        sjbtextarea,
        Department
    },
    computed: {
        ...mapState({
            token: state => state.user.token,
        }),
    },
    data() {
        return {
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            },
            itemList: [],
            applyTime:common.time.monthlast,
            labelName:"所属部门",
            planRepayTime:"",
            postData: {//筛选条件
                applyPerCode: "",//借款人id ,
                applyPerName:"",// 借款人姓名 ,
                companyId: "",//借款人公司id ,
                companyName:"",// 借款人公司名称 ,
                loanAmount:"",// 借款金额 ,
                loanReason:"",//借款事由 ,
                officeId:"",// 借款人所属部门id ,
                officeName:"",// 借款人所属部门名称 ,
                payeeCardNum:"",// 收款人银行卡号 ,
                payeeName:"",// 收款人姓名 ,
                payeeOpeningBank: "",//收款人开户行 ,
                planRepayTime : "",//预计还款日期 ,
                projectId: "",//关联项目id ,
                projectName:"",// 关联项目名称 ,
                receivablesAccountId:"",// 收款账户id ,
                remarks: "",//备注 ,
                loanAttachment:[]
            },
            expenseAttachment: [], // 读取和提交时均做转换
            bankList:[],
            dialogAccount:false,
            taxList: [],

            fileURL: process.env.BASE_API + '/webCommonInfo/fileUpload',
            uploadTips: config.tips,
            userInfo:{}
        }
    },
    async created() {
        await this.$store.dispatch('FetchDictsAndLocalstore');
        this.userInfo = JSON.parse(localStorage.getItem("web_oa_userInfor"));

        this.postData.applyPerCode = this.userInfo.loginName;
        this.postData.applyPerName = this.userInfo.name;

        if(this.userInfo.useable=="1"){
            this.postData.officeName  = this.userInfo.officeName;
            this.postData.officeId  = this.userInfo.officeId;
        }
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

        this.taxList = selectDic(dicList, "tax_city");

        // 清空store集合
        // 编辑时
        if (this.$route.query.key) {
            getDetail(
                this.$route.query.key
            ).then(res => {
                this.postData = res.data;
                this.planRepayTime = common.timeParseObj(res.data.planRepayTime);
                this.applyTime = common.formatDateTime(res.data.applyTime)
                if (res.data.attachmentResponseList && res.data.attachmentResponseList.length > 0) {
                    res.data.attachmentResponseList.forEach(item => {
                        let originUrl = item.url;
                        item.url = res.data.urlPrefix + item.url;
                        this.expenseAttachment.push({ url: item.url, name: item.name, originUrl: originUrl ,uid:new Date().getTime()});
                    })
                }
                
            })
        }

    },
    async mounted() {
        
        getAccountList().then(res => {
            if(res.code == 200&&res.data){
                this.bankList = res.data;
            }
            if(this.bankList.length<1){
                this.dialogAccount = true
            }
        })

    },
    methods: {
        jumpAccount(){
            this.$router.push({path:"/me/addAccount"})
        },
        depConfirm(data) {
            if(data){
                this.postData.officeName  = data.name;
                this.postData.officeId  = data.id;
            }else{
                this.costCenterName = "";
                this.postData.costCenterId = "";
            }
            
        },

        proSelect(data){
            this.postData.projectId = data.id;
            this.postData.projectName = data.projectName;
        },
        setAccount(){
            this.bankList.map(item=>{
                if(this.postData.receivablesAccountId == item.id){
                    this.postData.payeeCardNum = item.accountNumber// 收款人银行卡号 ,
                    this.postData.payeeName = item.accountName// 收款人姓名 ,
                    this.postData.payeeOpeningBank = item.belongBank//收款人开户行 ,
                }
            })
        },
        setCompany(){
            this.taxList.forEach(item=>{
                if(this.postData.companyId== item.value){
                    this.postData.companyName = item.name;
                }
            })
        },
        // 附件上传成功
        handleSuccess(res, file, fileList) {
            if(res.data.resCode == 1){
                let url =res.data.storfiles.serverUrl + res.data.storfiles.url
                this.expenseAttachment.push({ originUrl:res.data.storfiles.url ,name:file.name,url:url,uid:file.uid})
            }
        },
        // 附件移除
        handleRemove(file, fileList) {
            this.expenseAttachment.map((item, index) => {
                if (item.uid == file.uid) {
                    this.expenseAttachment.splice(index, 1)
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
            this.postData.planRepayTime = common.timeParse(this.planRepayTime)
            this.postData.loanAttachment = [];
            this.expenseAttachment.forEach(item => {
                this.postData.loanAttachment.push({ url: item.originUrl, name: item.name })
            })
            if (type == 'apply' && loanFormVali(this)) {
                loanApply(this.postData).then(res => {
                    if (res.code == 200) {
                        this.$message({
                            message: res.message,
                            type: 'success'
                        })
                        this.$router.push({path:'/me/loanList' })
                    }
                })
            }
            if(type == 'save') {
                loanSave(this.filter).then(res => {
                    if (res.code == 200) {
                        this.$message({
                            message: res.message,
                            type: 'success'
                        })
                        this.$router.go(-1)
                    }
                })
            }
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

.el-input--small .el-input__inner {
    height: 40px!important;
}
.left-red{
    color: red;
    position: absolute;
    left: 15px;
}
.right-red{
    color: red;
    position: absolute;
    left: 49%;
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
  display:inline-block;
  border: 1px solid #dcdfe6;
  border-radius:4px;
  background: white;
  padding-left: 7px;
  line-height: 30px;
  width: 250px
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
