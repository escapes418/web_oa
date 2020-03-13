<template>
    <div class="sjb-form-wrapper">
        <el-tabs v-model="activeName" @tab-click="tabClick" class="tabs">
            <el-tab-pane label="基本信息" name="1">
                <div class="segment statistics">
                    <div class="segment-header">
                        基本信息
                    </div>
                    <div class="segment-area">
                        <el-row>
                            <el-col :span="12" class="segment-brline">
                                <div class="clearfix  cominfo-item">
                                    <span class="left-title font-gray">主客户：</span>
                                    <span class="right-con">
                                        {{baseData.custName}}
                                    </span>
                                </div>
                                
                                <div class="clearfix cominfo-item">
                                    <span class="left-title font-gray">客户名称：</span>
                                    <span class="right-con" v-for="(item,index) in baseData.childCustList" :key="index">
                                        <span style="color:#409EFF;cursor: Pointer;"  @click="handleDetail(item)">
                                            {{item.childCustName}}  
                                        </span>
                                        <span v-if="baseData.childCustList.length!=1 &&index+1 !== baseData.childCustList.length "> 、</span>
                                    </span>
                                    
                                </div>
                                <div class="clearfix cominfo-item">
                                    <span class="left-title font-gray">客户简称：</span>
                                    <span class="right-con">{{baseData.custAbbreviation}}</span>
                                </div>
                                <div class="clearfix  cominfo-item">
                                    <span class="left-title font-gray">统一社会信用代码：</span>
                                    <span class="right-con">
                                        {{baseData.creditCode}}
                                    </span>
                                </div>
                                <div class="clearfix  cominfo-item">
                                    <span class="left-title font-gray">注册地址：</span>
                                    <span class="right-con" v-if="baseData.custAddressCode">
                                        {{baseData.registeredAddress}}
                                    </span>
                                </div>
                                 <div class="clearfix  cominfo-item">
                                    <span class="left-title font-gray">清结算：</span>
                                    <span class="right-con">
                                        {{baseData.accountLeaderName}}
                                    </span>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="clearfix  cominfo-item">
                                    <span class="left-title font-gray">客户编号：</span>
                                    <span class="right-con">
                                        {{baseData.custCode}}
                                    </span>
                                </div>
                                <div class="clearfix  cominfo-item">
                                    <span class="left-title font-gray">地址：</span>
                                    <span class="right-con">{{baseData.custAddressCodeName}}</span>
                                </div>
                                <div class="clearfix  cominfo-item">
                                    <span class="left-title font-gray">详细地址：</span>
                                    <span class="right-con" v-if="baseData.custAddressCode">
                                        {{baseData.custAddress}}
                                    </span>
                                </div>
                                <div class="clearfix  cominfo-item">
                                    <span class="left-title font-gray">首次跑单时间：</span>
                                    <span class="right-con">
                                        {{baseData.firstOrderTime}}
                                    </span>
                                </div>
                                <div class="clearfix  cominfo-item">
                                    <span class="left-title font-gray">VIP客服：</span>
                                    <span class="right-con">
                                        {{baseData.vipCustomerName}}
                                    </span>
                                </div>
                                <div class="clearfix  cominfo-item">
                                    <span class="left-title font-gray">商务助理：</span>
                                    <span class="right-con">
                                        {{baseData.businessAssistantName}}
                                    </span>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
                <el-tabs type="border-card" v-if="nocarData.noCarId&&coalUnionData.coalUnionId">
                    <el-tab-pane label="无车承运" v-if="nocarData.noCarId">
                        <div class="segment statistics">
                            <div class="segment-header">
                                市场联系人信息
                            </div>
                            <div class="segment-area">
                                <el-row>
                                    <el-col :span="12" class="segment-brline">
                                        <div class="clearfix  cominfo-item">
                                            <span class="left-title font-gray">市场负责人：</span>
                                            <span class="right-con">
                                                {{nocarData.marketLeaderName}}
                                            </span>
                                        </div>
                                        <div class="clearfix cominfo-item">
                                            <span class="left-title font-gray">邮箱：</span>
                                            <span class="right-con">
                                                {{nocarData.marketLeaderMail}}  
                                            </span>
                                        </div>
                                        <div class="clearfix cominfo-item">
                                            <span class="left-title font-gray">职位：</span>
                                            <span class="right-con">{{nocarData.marketLeaderPostName}}</span>
                                        </div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div class="clearfix  cominfo-item">
                                            <span class="left-title font-gray">联系方式：</span>
                                            <span class="right-con">
                                                {{nocarData.marketLeaderPhone}}
                                            </span>
                                        </div>
                                        <div class="clearfix  cominfo-item">
                                            <span class="left-title font-gray">所在部门：</span>
                                            <span class="right-con">{{nocarData.marketLeaderOfficeName}}</span>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                        <div class="segment statistics">
                            <div class="segment-header">
                                客户联系人信息
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
                                            <tr v-for="(itemData,index) in nocarData.custLinkman" :key="index">
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
                    </el-tab-pane>
                    <el-tab-pane label="煤联社" v-if="coalUnionData.coalUnionId">
                        <div class="segment statistics">
                            <div class="segment-header">
                                市场联系人信息
                            </div>
                            <div class="segment-area">
                                <el-row>
                                    <el-col :span="12" class="segment-brline">
                                        <div class="clearfix  cominfo-item">
                                            <span class="left-title font-gray">市场负责人：</span>
                                            <span class="right-con">
                                                {{coalUnionData.marketLeaderName}}
                                            </span>
                                        </div>
                                        
                                        <div class="clearfix cominfo-item">
                                            <span class="left-title font-gray">邮箱：</span>
                                            <span class="right-con">
                                                <span>
                                                    {{coalUnionData.marketLeaderMail}}  
                                                </span>
                                            </span>
                                            
                                        </div>
                                        <div class="clearfix cominfo-item">
                                            <span class="left-title font-gray">职位：</span>
                                            <span class="right-con">{{coalUnionData.marketLeaderPostName}}</span>
                                        </div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div class="clearfix  cominfo-item">
                                            <span class="left-title font-gray">联系方式：</span>
                                            <span class="right-con">
                                                {{coalUnionData.marketLeaderPhone}}
                                            </span>
                                        </div>
                                        <div class="clearfix  cominfo-item">
                                            <span class="left-title font-gray">所在部门：</span>
                                            <span class="right-con">{{coalUnionData.marketLeaderOfficeName}}</span>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                        <div class="segment statistics">
                            <div class="segment-header">
                                客户联系人信息
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
                                            <tr v-for="(itemData,index) in coalUnionData.custLinkman" :key="index">
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
                    </el-tab-pane>
                </el-tabs>
                
            </el-tab-pane>
            <el-tab-pane label="主动维护记录" name="2">
                <div class="segment statistics">
                    <div class="segment-header">
                        主动维护记录
                    </div>
                    <div class="segment-area">
                        <div class="el-table__body-wrapper" style="padding: 15px 0;">
                            <activeList :custId="key"></activeList>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="被动维护记录" name="3">
                 <div class="segment statistics">
                    <div class="segment-header">
                        被动维护记录
                    </div>
                    <div class="segment-area">
                        <div class="el-table__body-wrapper" style="padding: 15px 0;">
                            <passiveList :custId="key"></passiveList>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
        
        <div class="segment statistics">
            <div class="sjb-foot-button">
                <el-button @click="goBack" size="medium">返回</el-button>
            </div> 
        </div>
    </div>
</template>

<script>
import common from "@/utils/common";
import { getCustDetail} from "@/api/primaryCust";
import sjbtextarea from '@/components/sjbTextarea';
import activeList from './activeList';
import passiveList from './passiveList';
import { parseTime } from "@/utils";

export default {
    name: "complexTable",
    components: {
        sjbtextarea,
        activeList,
        passiveList
    },
    data() {
        return {
            activeName:'1',
            baseData: {},
            nocarData:{},
            coalUnionData:{},
            key:this.$route.query.key,
        };
    },
    created() {
        this.getDetail();
    },
    methods: {
        getDetail() {
            getCustDetail(
                this.key
            ).then(response => {
                this.baseData = response.data.baseCustInfo;
                this.nocarData = response.data.noCar;
                this.coalUnionData = response.data.coalUnion;
            });
        },
        tabClick(value){
            this.activeName = value.name;
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
        handleDetail(item){
            this.$router.push({
                path: "/inforManage/customerDetail",
                query: { key: item.childCustId}
            });
        }
    }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.tabs{
    padding-left:15px; 
}
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