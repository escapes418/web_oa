<template>
    <div class="sjb-form-wrapper">
        <div class="segment statistics">
            <div class="segment-header">
                基本信息
            </div>
            <div class="segment-area">
                <el-row>
                    <el-col :span="12" class="segment-brline">
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">客户编号：</span>
                            <span class="right-con">
                                {{detailData.custCode}}
                            </span>
                        </div>
                        <div class="clearfix cominfo-item">
                            <span class="left-title font-gray">客户名称：</span>
                            <span class="right-con">{{detailData.custName}}</span>
                        </div>
                        <div class="clearfix cominfo-item">
                            <span class="left-title font-gray">客户简称：</span>
                            <span class="right-con">{{detailData.custAbbreviation}}</span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">主客户名称：</span>
                            <span class="right-con">
                                {{detailData.mainCustName}}
                            </span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">市场负责人：</span>
                            <span class="right-con">
                                {{detailData.marketLeaderName}}
                            </span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">市场负责人手机号：</span>
                            <span class="right-con">
                                {{detailData.marketLeaderPhone}}
                            </span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">清结算：</span>
                            <span class="right-con">
                                {{detailData.accountLeaderName}}
                            </span>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="clearfix cominfo-item">
                            <span class="left-title font-gray">所属区域：</span>
                            <span class="right-con">{{detailData.custOfficeName}}</span>
                        </div>
                        <div class="clearfix cominfo-item">
                            <span class="left-title font-gray">客户来源：</span>
                            <span class="right-con">{{detailData.custSource}}</span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">地址：</span>
                            <span class="right-con">{{detailData.custAddressCodeName}}</span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">详细地址：</span>
                            <span class="right-con" v-if="detailData.custAddressCode">
                                {{detailData.custAddress}}
                            </span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">VIP客服：</span>
                            <span class="right-con">
                                {{detailData.vipCustomerName}}
                            </span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">商务助理：</span>
                            <span class="right-con">
                                {{detailData.businessAssistantName}}
                            </span>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="segment statistics">
            <div class="segment-header">
                合同信息
            </div>
            <div class="segment-area">
                <el-row>
                    <el-col :span="12" class="segment-brline">
                        <div class="clearfix cominfo-item">
                            <span class="left-title font-gray">统一社会信用代码：</span>
                            <span class="right-con">
                                {{detailData.contractInfoDetailResponse&&detailData.contractInfoDetailResponse.creditCode}}
                            </span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">法定代表人：</span>
                            <span class="right-con">
                                {{detailData.contractInfoDetailResponse&&detailData.contractInfoDetailResponse.legalRepresentative}}
                            </span>
                        </div>
                    </el-col>
                    <el-col :span="12" class="segment-brline">
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">调度费比例（%）：</span>
                            <span class="right-con">
                                {{detailData.contractInfoDetailResponse&&detailData.contractInfoDetailResponse.dispatchProportion}}%
                            </span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">注册地址：</span>
                            <span class="right-con">
                                {{detailData.contractInfoDetailResponse&&detailData.contractInfoDetailResponse.registeredAddress}}
                            </span>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="segment statistics">
            <div class="segment-header">
                业务情况
            </div>
            <div class="segment-area">
                <el-row>
                    <el-col :span="12" class="segment-brline">
                        <div class="clearfix cominfo-item">
                            <span class="left-title font-gray">所属行业：</span>
                            <span class="right-con">{{detailData.custTrades}}</span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">规模（万吨/月）：</span>
                            <span class="right-con">{{detailData.custCompanySize}}</span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">发货方式：</span>
                            <span class="right-con">
                                {{detailData.custDeliverMode}}
                            </span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">结算对象：</span>
                            <span class="right-con">
                                {{detailData.custBalanceObj}}
                            </span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">支付方式：</span>
                            <span class="right-con">
                                {{detailData.payMethod}}
                            </span>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="clearfix cominfo-item">
                            <span class="left-title font-gray">业务类型：</span>
                            <span class="right-con">{{detailData.custBusinessType}}</span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">运力组织方式：</span>
                            <span class="right-con">{{detailData.custPowerMode}}</span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">收货方式：</span>
                            <span class="right-con">{{detailData.custReceiveMode}}</span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">结算周期（天）：</span>
                            <span class="right-con">
                                {{detailData.custBalanceCycle}}
                            </span>
                        </div>

                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="segment statistics">
            <div class="segment-header">
                贸易结构
            </div>
            <div class="segment-area">
                <div class="textStyle-title">上游：</div>
                <sjbtextarea :readonly="true" :rows="4" placeholder="请输入企业名称、线路、地址、据点说明信息" v-model="upstream"></sjbtextarea>
            </div>
            <div class="segment-area" style="margin-bottom:15px">
                <div class="textStyle-title">下游：</div>
                <sjbtextarea readonly :rows="4" placeholder="请输入企业名称、线路、地址、据点说明信息" v-model="downstream"></sjbtextarea>
            </div>
        </div>
        <div class="segment statistics">
            <div class="segment-header">
                联系人信息
            </div>
            <div class="segment-area">
                <div class="el-table__body-wrapper">
                    <table id="expenseDetails" class="table table-striped table-bordered table-condensed" style="width:100%;margin-bottom: 20px; margin-top:15px">
                        <thead>
                            <tr class="tableTitle">
                                <td class="tableTitle">联系人</td>
                                <td class="tableTitle">联系方式</td>
                                <td class="tableTitle">邮箱</td>
                                <td class="tableTitle">职位</td>
                                <td class="tableTitle">备注</td>
                                <td class="tableTitle">合同联系人</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(itemData,index) in detailData.custLinkmanResponse">
                                <td class="left" style="width:220px;text-align: center">
                                    <span class="table_text">{{itemData.linkmanName}}</span>
                                </td>
                                <td class="left" style="width:220px;text-align: center">
                                    <span class="table_text">{{itemData.linkmanPhone}}</span>
                                </td>
                                <td class="left" style="width:220px;text-align: center">
                                    <span class="table_text">{{itemData.linkmanMail}}</span>
                                </td>
                                <td class="left" style="width:220px;text-align: center">
                                    <span class="table_text">{{itemData.linkmanPost}}</span>
                                </td>
                                <td class="left" style="text-align: center">
                                    <span class="table_text">{{itemData.remarks}}</span>
                                </td>
                                <td class="left" style="text-align: center">
                                    <span class="table_text">{{itemData.isContractLinkman == 1 ? "是":"否"}}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    
                </div>
            </div>
        </div>
        <div class="segment statistics">
            <div class="segment-header">
                维护记录
            </div>
            <div class="segment-area">
                <div class="el-table__body-wrapper" style="padding: 15px 0;">
                    <el-table ref="multipleTable" border :data="itemList" tooltip-effect="dark" style="width:100%">
                        <el-table-column align="center" label="编号" width="100px">
                            <template slot-scope="scope">
                                <span>{{scope.row.index}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="维护时间" width="180px">
                            <template slot-scope="scope">
                                <span>{{scope.row.custMaintenanceDate | stamp2TextDateFull}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="维护人" width="100px">
                            <template slot-scope="scope">
                                <span>{{scope.row.custMaintenanceMan}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="维护人部门" width="100px">
                            <template slot-scope="scope">
                                <span>{{scope.row.maintainerDeptName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="客户级别" width="150px">
                            <template slot-scope="scope">
                                <span>{{scope.row.custStageName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="拜访类型" width="150px">
                            <template slot-scope="scope">
                                <span>{{scope.row.visitTypeName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="问题归类" width="150px">
                            <template slot-scope="scope">
                                <span>{{scope.row.issuesClassification}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="维护内容" width="200px">
                            <template slot-scope="scope">
                                <span>{{scope.row.custMaintenanceContent}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="联系人" width="100px">
                            <template slot-scope="scope">
                                <span>{{scope.row.linkmanName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="备注" >
                            <template slot-scope="scope">
                                <span>{{scope.row.remarks}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="pagination-container">
                    <el-pagination background @current-change="handleCurrentChange" :current-page="listQuery.pageNo" :page-size="20" layout="total, prev, pager, next, jumper" :total="total">
                    </el-pagination>
                </div>
            </div>
        </div>
        <div class="segment statistics">
            <div class="sjb-foot-button">
                <!-- <el-button size="medium" type="primary">同意</el-button>
                <el-button size="medium" type="info">驳回</el-button> -->
                <el-button v-if="ISPICK&&!ISME" size="medium" type="primary" @click="getCustBack">捡入</el-button>
                <el-button @click="goBack" size="medium">返回</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import common from "@/utils/common";
import {getRegion} from '@/api/getRegion'
import { fetchForm, saveCust , custChange,getMaintain} from "@/api/customer";
import sjbtextarea from '@/components/sjbTextarea';
import { parseTime } from "@/utils";

export default {
    name: "complexTable",
    components: {
        sjbtextarea
    },
    data() {
        return {
            upstream:"",
            downstream:"",
            filter: {
                //筛选条件
                ordercreatetimestart: common.time.timestart,
                ordercreatetimeend: common.time.timeend,
                orderfilterstate: 0,
                orderstate: "",
                sourceaddresscode: null,
                targetaddresscode: null,
                querykey: null
            },
            detailData: {},
            tradeStructure: {
                //贸易结构
                upstream: undefined,
                downstream: undefined
            },
            key:this.$route.query.key,
            total:null,
            itemList:[],
            listQuery: {
                custId:this.$route.query.key,
                pageNo: 1,
                pageSize: 20
            }
        };
    },
    created() {
        this.getDetail();
        this.getListData()
    },
    computed:{
        ISPICK:function(){
            let result = this.detailData.custListPlace == 1 || this.detailData.custListPlace == 2 ? true : false 
            if(this.$route.query.type){
                result = false
            }
            return result
        },
        ISME:function(){
            let result = this.detailData.letGoMan == JSON.parse(localStorage.getItem("web_oa_userInfor")).id ? true : false 
            return result
        }
    },
    methods: {
        getDetail() {
            fetchForm({
                id: this.key
            }).then(response => {
                var data = response.data
                this.detailData = data;
                this.downstream = data.custTradeStructureResponse.downstream;
                this.upstream = data.custTradeStructureResponse.upstream;
                this.detailData.custClassify = this.getDictionary("cust_classify", data.custClassify)//客户分类
                this.detailData.custType = this.getDictionary("cust_type", data.custType)//客户类别
            
                this.detailData.custNature = this.getDictionary("cust_nature", data.custNature)//公司性质
                this.detailData.custStage = this.getDictionary("cust_stage", data.custStage)//公司性质

                this.detailData.custTrades = this.getDictionary("cust_trades", data.custTrades)//所属行业
                this.detailData.custDeliverMode = this.getDictionary("cust_deliver_mode", data.custDeliverMode)//发货方式
                this.detailData.custBalanceObj = this.getDictionary("cust_balance_obj", data.custBalanceObj)//结算对象
                if(data.payMethod){
                    this.detailData.payMethod = this.getPayMent(data.payMethod)//支付方式
                }
                this.detailData.custBusinessType = this.getDictionary("cust_business_type", data.custBusinessType)//业务类型
                this.detailData.custPowerMode = this.getDictionary("cust_power_mode", data.custPowerMode)//业务类型
                this.detailData.custReceiveMode = this.getDictionary("cust_receive_mode", data.custReceiveMode)//收货方式
            });
        },
        handleCurrentChange(val) {
            this.listQuery.pageNo = val;
            this.getListData();
            this.listLoading = false;
        },
        getListData(){
            getMaintain(this.listQuery).then(res=>{
                if(res.status == 0){
                    res.data.list.forEach((item,index) =>{
                        item.index = index + 1;
                    });
                    this.itemList = res.data.list;
                    this.total = res.data.total;
                }
            })
        },
        getPayMent(item){
            let dicList = JSON.parse(localStorage.getItem("web_oa_dicList"));
            let temp = [];
            let getName = "";
            for (var i = 0; i < dicList.length; i++) {
                if (dicList[i].type == "pay_method") {
                    temp.push(dicList[i]);
                }
            }
            temp.forEach((itm,index)=>{
                item.forEach((it,idx)=>{
                    if(itm.value == it){
                        if(item.length == 2){
                            getName += itm.name + " "
                        } else {
                            getName = itm.name  
                        }
                    }
                })
            })
            return getName;
            
        },
        getDictionary(type, item) {
            let dicList = JSON.parse(localStorage.getItem("web_oa_dicList"));
            let temp = [];
            let getName = "";
            for (var i = 0; i < dicList.length; i++) {
                if (dicList[i].type == type) {
                    temp.push(dicList[i]);
                }
            }
            temp.forEach((itm,index)=>{
                if(itm.value == item){
                    getName = itm.name;
                }
            })
            return getName;
        },
        getCustBack(){
            custChange({
                id:this.$route.query.key,
                isChange:2
            }).then(res=>{
                if(res.status == 0){
                    this.$message({
                        message: res.message,
                        type: "success"
                    });
                    this.$router.push({
                        path: "/inforManage/customerList"
                    });
                }
            })
        },
        goBack() {
            // this.$router.go(-1);
            if(this.$route.query.type){
                this.$router.push({
                    path: "/inforManage/custPool"
                })
            }else{
                this.$router.go(-1)
            }
        },
    }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.el-table__body-wrapper {
    overflow: auto;
    position: relative;
}
.segment {
    background: #ffffff;
    border: 1px solid #e6ebef;
    margin-bottom: 15px;
}

.segment-green {
    background: #fbfff8;
    border: 1px solid #b3d99c;
    margin-bottom: 15px;
}

.segment:last-child,
.segment-green:last-child {
    margin-bottom: 0;
}

/* 普通el-row排版 */

.segment .el-row {
    line-height: 36px;
    padding: 0 28px;
}

.segment .el-row.segment-title {
    height: 40px;
    line-height: 40px;
}

.segment .segment-label {
    display: inline;
    color: #99a9bf;
}

.segment .labelright {
    text-align: right;
    padding-right: 5px;
}

.segment .segment-content {
    display: inline-block;
    color: #333333;
}

.segment-line {
    width: 97%;
    height: 1px;
    margin: 0 auto;
    background: #e2e7ed;
}

.segment-fullline {
    width: 100%;
    height: 1px;
    margin: 0 auto;
    background: #e2e7ed;
}

.segment-header {
    height: 40px;
    line-height: 40px;
    text-indent: 15px;
    font-weight: 700;
    border-bottom: 1px solid #f2f7fa;
}

.segment-header-sub {
    font-size: 14px;
    color: #99a9bf;
    font-weight: normal;
    padding-left: 15px;
}

.segment-area {
    padding: 0 15px;
}

.segment-foot {
    background: #fcfdff;
    height: 50px;
    line-height: 50px;
    padding-left: 15px;
    border-top: 1px solid #f2f7fa;
}

.cominfo-item {
    margin: 10px 0;
}

.clearfix:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
}

.left-title {
    float: left;
    width: 150px;
    padding-right: 10px;
}

.font-gray {
    color: #99a9bf !important;
}

.right-con {
    float: left;
    // width: 850px;
}

.el-input--small .el-input__inner {
    height: 40px !important;
}

.remark {
    margin-top: 25px;
    margin-bottom: 8px;
    background-color: #fdfdfd;
    border: 1px solid#F2F7FA;
}
.remarkTitle {
    margin-right: 100px;
    float: left;
    margin-top: 28px;
    margin-left: 5px;
}
.tableTitle {
    font-size: 15px;
}
.foot {
    float: right;
    margin-right: 25px;
    margin-bottom: 25px;
    margin-top: 15px;
}
.segment-area{
    .textStyle-title{
        // line-height: 20px;
        padding: 12px 0px;
        font-size: 14px;
    }
}
.table_text{
    font-size: 14px;
    color: #333333;
    line-height: 35px;
    text-align: center;
}

</style>