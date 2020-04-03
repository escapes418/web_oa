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
                        <Department type="form" :DId="postData.costCenterId" :Dlabel="labelName" :Dvalue="costCenterName" @on-confirm="depConfirm"></Department>
                        <loan @on-select="loanSelect" :lValue="procLoanName" :required="true"></loan>
                        
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
                        <RedStar label="还款时间：">
                            <span class="right-con">{{ applyTime }}</span>
                        </RedStar>
                        <RedStar label="岗位名称：">
                            <span class="right-con">{{ userInfo.postName || "" }}</span>
                        </RedStar>
                        <RedStar label="发票公司：">
                            {{taxName}}
                        </RedStar>
                        
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="segment statistics">
            <div class="segment-header">
                还款信息
            </div>
            <div class="segment-area">
                <el-row>
                    <el-col :span="12" class="segment-brline">
                        <RedStar label="还款方式：" :required="true">
                            <el-select clearable class="filter-item " v-model="postData.repayMethod" placeholder="请选择" style="width:250px;" @change="changeMethod">
                                <el-option v-for="item in payType" :label="item.name" :value="item.value" :key="item.value">
                                </el-option>
                            </el-select>
                        </RedStar>
                        <RedStar label="待还款金额：">
                            <span class="right-con">
                                {{unpaidAmount.toFixed(2)}}
                            </span>
                        </RedStar>
                    </el-col>
                    <el-col :span="12" class="segment-brline">
                        <RedStar label="本次还款金额：" :required="postData.repayMethod == '2'">
                            <span class="right-con">
                                <el-input v-if="postData.repayMethod == '2'" type="number" placeholder="请输入" style="width:250px;" v-model.number="postData.currentRepayAmount"></el-input>
                                <span v-else>{{repayTotal.toFixed(2)}}</span>
                            </span>
                        </RedStar>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="segment statistics" v-if="postData.repayMethod == '1'">
            <div class="segment-header">
                <span class="left-red">*</span>
                付款明细
            </div>
            <div class="segment-area">
                <div class="el-table__body-wrapper" style="padding: 15px 0;">
                    <table id="expenseDetails" class="table table-striped table-bordered table-condensed" style="width:100%;margin-bottom: 20px;">
                        <thead>
                            <tr class="tableTitle">
                                <td style="text-align: center;width: 20px;padding: 0 10px 0 10px;">
                                    <el-checkbox @change="selectAll"></el-checkbox>
                                </td>
                                <td class="tableTitle">科目</td>
                                <td class="tableTitle">票据张数</td>
                                <td class="tableTitle">票据金额</td>
                                <td class="tableTitle">备注（限300字）</td>
                                <td class="tableTitle">上传图片</td>
                            </tr>
                        </thead>
                        <tbody>
                            <repayItem v-for="(item,index) in itemList" style="height:50px" :key="index" :itemData="item"></repayItem>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="segment-foot">
                <el-button type="primary" size="small" @click="add">新增</el-button>
                <el-button type="danger" size="small" @click="del">删除</el-button>
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
                <!-- <el-button type="primary" size="small" @click="submit('save')">报销保存</el-button> -->
                <el-button size="small" @click="backStep">返回</el-button>
            </div>
        </div>

    </div>
</template>

<script>
import common from '@/utils/common'
import repayItem from './repayItem'
import loan from './loan'
import RedStar from '@/components/RedStar/RedStar.vue'
import sjbtextarea from '@/components/sjbTextarea'
import Department from "@/components/Department";
import {repayApply, getDetail } from '@/api/repay'
import { mapState, mapGetters } from "vuex";

import { parseTime } from '@/utils'
import { repayFormVali } from './repay.util'
import config from '@/utils/config'
import utils from '@/utils/utils'
import { toJS, fromJS, Map, List } from 'immutable';

export default {
    components: {
        repayItem,
        RedStar,
        loan,
        sjbtextarea,
        Department
    },
    computed:{
        ...mapState({
            token: state => state.user.token,
            subsTree: state => state.reim.subsTree,
            subsList: state => state.reim.subsList,

            firstSub: state => state.repay.firstSub,
            itemList: state => state.repay.itemList,
        }),
        unpaidAmount:function(){
            let result = 0;
            if(this.pendingTotal){
                if(this.postData.repayMethod =="1"){
                    result = Number(this.pendingTotal) - Number(this.repayTotal)
                }
                if(this.postData.repayMethod =="2"){
                    if(this.postData.currentRepayAmount){
                        result = Number(this.pendingTotal) - Number(this.postData.currentRepayAmount)
                    }else{
                        result = Number(this.pendingTotal)
                    }
                }
                
            }
            return result
        },
        repayTotal() {
            let result = 0;
            if(this.itemList.length>0){
                for (let i = 0; i < this.itemList.length; i++) {
                    if(this.itemList[i].expenseAmt){
                        result += Number(this.itemList[i].expenseAmt*100);
                    }
                }
            }
            return result/100;
        },
    },
    data() {
        return {
            costCenterName:"",
            labelName:"成本中心",
            applyTime: common.time.monthlast, // 报销日期
            procLoanName:"",
            taxName:"",
            pendingTotal:"",
            postData: {//筛选条件
                applyPerCode:"",// 还款人id ,
                costCenterId:"",// 成本中心id ,
                currentRepayAmount:"",// 本次还款金额 ,
                loanFlowId:"", //关联借款流程id ,
                remarks:"" ,
                repayFlowCashAttachmentList: [],//现金还款附件列表 ,
                repayFlowInvoiceList:[],// 发票还款明细列表 ,
                repayMethod:"",
                procInsId:""
            },
            expenseAttachment: [], // 读取和提交时均做转换

            projectName:"",

            payType: [{
                value:"1",
                name:"发票还款"
            },{
                value:"2",
                name:"现金还款"
            }],
            fileURL: process.env.BASE_API + '/webCommonInfo/fileUpload',

            uploadTips: config.tips,
            userInfo:{},
        }
    },
    async created() {
        // 清空store集合
        this.$store.dispatch("cleanItemList");
        await this.$store.dispatch('FetchDictsAndLocalstore');
        this.userInfo = JSON.parse(localStorage.getItem("web_oa_userInfor"));
        this.postData.applyPerCode = this.userInfo.loginName;
        if(this.userInfo.useable=="1"){
            this.costCenterName = this.userInfo.officeName;
            this.postData.costCenterId =  this.userInfo.officeId;
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
        //时间转换
        this.$store.dispatch('getSubs');

        if (this.$route.query.key) {
            getDetail({
                repayFlowId: this.$route.query.key
            }).then(res => {
                this.postData.repayMethod  = res.data.repayMethod;
                this.postData.applyPerCode = res.data.applyPerCode;
                this.postData.costCenterId = res.data.costCenterId;// 还款人id ,
                this.postData.currentRepayAmount = res.data.currentRepayAmount;
                this.postData.loanFlowId = res.data.loanFlowId;
                this.postData.remarks = res.data.remarks
                this.postData.procInsId = res.data.procInsId 
                this.procLoanName = res.data.loanFlowProcName.substring(0,20)+'...';
                this.costCenterName = res.data.costCenterName;
                this.taxName = res.data.invoiceCompanyName;
                this.pendingTotal = res.data.unpaidAmount

                var itemDatas = res.data.repayFlowInvoiceDetailResponseList || [];
                this.$store.dispatch('fillItemList',this.transDetailData(itemDatas))
                if (res.data.repayFlowCashAttachmentResponseList  && res.data.repayFlowCashAttachmentResponseList.length > 0) {
                    res.data.repayFlowCashAttachmentResponseList.forEach(item => {
                        let originUrl = item.url;
                        item.url = item.urlPrefix + item.url;
                        this.expenseAttachment.push({ url: item.url, name: item.name, originUrl: originUrl ,uid:new Date().getTime()});
                    })
                }
                
            })
        }
    },
    async mounted() {
        
    },
    methods: {
        selectAll(val){
            this.$store.dispatch("setItemChecked",val)
        },
        add(){
            if (this.itemList.length > 30) {
                this.$message({
                    message:'明细条目超出限制',
                    type:'warning'
                })
            } else {
                this.$store.dispatch("addRepay");
            }
        },
        del(){
            this.$store.dispatch('delItemListChecked');
        },
        changeMethod(){
            this.$store.dispatch("cleanItemList");
            this.postData.currentRepayAmount = "";
        },
        depConfirm(data) {
            if(data){
                this.costCenterName = data.name;
                this.postData.costCenterId = data.id;
            }else{
                this.costCenterName = "";
                this.postData.costCenterId = "";
            }
            
        },
        transDetailData(dataArr) {
            function createUid() {
                return parseInt(Math.random() * 100000) + "" + new Date().getTime();
            }
            // 转换接口明细的数据结构
            let detailCollection = dataArr.map(i => {
                return {
                    ...i,
                    subject: [i.firstSub, i.secondSub],
                    uid: createUid(),
                    checked: false
                }
            })
            return detailCollection;
        },
        getItemsInStore() {
            let itemDetail = this.itemList.map(i => {
                return {
                    ...i,
                    firstSub: i.subject[0] || '',
                    secondSub: i.subject[1] || '',
                }
            })
            return itemDetail;
        },
        loanSelect(data){
            this.postData.loanFlowId = data.id;
            this.procLoanName = data.procName.substring(0,20)+'...';
            console.log(this.procLoanName)
            this.taxName = data.companyName;
            this.pendingTotal = data.unpaidAmount
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
            // this.postData.billNum = this.billNum;
            // this.postData.expenseTotal = this.expenseTotal
            this.postData.repayFlowCashAttachmentList = [];
            this.expenseAttachment.forEach(item => {
                this.postData.repayFlowCashAttachmentList.push({ url: item.originUrl, name: item.name })
            })
            this.postData.repayFlowInvoiceList = this.getItemsInStore();
            if (type == 'apply' && repayFormVali(this)) {
                repayApply(this.postData).then(res => {
                    if (res.code == 200) {
                        this.$message({
                            message: res.message,
                            type: 'success'
                        })
                        this.$router.push({path:'/me/repayList' })
                    }
                })
            }
            // if(type == 'save') {
            //     expSave(this.filter).then(res => {
            //         if (res.code == 200) {
            //             this.$message({
            //                 message: res.message,
            //                 type: 'success'
            //             })
            //             this.$router.go(-1)
            //         }
            //     })
            // }
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
