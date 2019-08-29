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
                                    <span class="left-title font-gray">项目编号：</span>
                                    <span class="right-con">
                                        {{ detail.projectCode }}
                                    </span>
                                </div>
                                <div class="clearfix  cominfo-item">
                                    <span class="left-title font-gray">项目名称：</span>
                                    <span class="right-con">
                                        {{ detail.projectName }}
                                    </span>
                                </div>
                                
                                <div class="clearfix  cominfo-item">
                                    <span class="left-title font-gray">客户名称：</span>
                                    <span class="right-con">
                                        {{ detail.custInfoName }}
                                    </span>
                                </div>
                                <div class="clearfix  cominfo-item">
                                    <span class="left-title font-gray">企业名称：</span>
                                    <span class="right-con">
                                        {{ companyList.join('，') }}
                                    </span>
                                </div>
                                <div class="clearfix  cominfo-item">
                                    <span class="left-title font-gray">项目等级：</span>
                                    <span class="right-con">
                                        {{ detail.projectLevel }}
                                    </span>
                                </div>
                                <div class="clearfix  cominfo-item">
                                    <span class="left-title font-gray">承运货物：</span>
                                    <span class="right-con">
                                        {{ goodsNames.join('，')}}
                                    </span>
                                </div>
                                <div class="clearfix  cominfo-item">
                                    <span class="left-title font-gray">计划上线时间：</span>
                                    <span class="right-con">
                                        {{ detail.onlinePlanTime | stamp2TextDate}}
                                    </span>
                                </div>
                                <div class="clearfix  cominfo-item">
                                    <span class="left-title font-gray">实际上线时间：</span>
                                    <span class="right-con">
                                        {{ detail.onlinePlanTime | stamp2TextDate}}
                                    </span>
                                </div>
                                <div class="clearfix  cominfo-item">
                                    <span class="left-title font-gray">商务助理：</span>
                                    <span class="right-con">
                                        {{ detail.businessAssistantName }}
                                    </span>
                                </div>
                                <div class="clearfix  cominfo-item">
                                    <span class="left-title font-gray">VIP客服：</span>
                                    <span class="right-con">
                                        {{ detail.vipCustomerName }}
                                    </span>
                                </div>
                            </el-col>
                            <el-col :span="12" class="segment-brline">
                                <div class="clearfix  cominfo-item">
                                    <span class="left-title font-gray">项目类型：</span>
                                    <span class="right-con">
                                        {{ detail.projectTypeName }}
                                    </span>
                                </div>
                                <div class="clearfix  cominfo-item">
                                    <span class="left-title font-gray">月开票频次(次/月)：</span>
                                    <span class="right-con">
                                        {{ detail.invoicingFrequency }}
                                    </span>
                                </div>
                                <div class="clearfix  cominfo-item">
                                    <span class="left-title font-gray">计划月运费(万元/月)：</span>
                                    <span class="right-con">
                                        {{ detail.transExpenssPlan }}
                                    </span>
                                </div>
                                <div class="clearfix  cominfo-item">
                                    <span class="left-title font-gray">项目负责人：</span>
                                    <span class="right-con">
                                        {{ detail.newProjectLeaderName }}
                                    </span>
                                </div>
                                <div class="clearfix  cominfo-item">
                                    <span class="left-title font-gray">归属部门：</span>
                                    <span class="right-con">
                                        {{ detail.newOfficeName }}
                                    </span>
                                </div>
                                <div class="clearfix  cominfo-item">
                                    <span class="left-title font-gray">归属部门负责人：</span>
                                    <span class="right-con">
                                        {{ detail.officeLeaderName }}
                                    </span>
                                </div>
                                <div class="clearfix  cominfo-item">
                                    <span class="left-title font-gray">项目管理负责人：</span>
                                    <span class="right-con">
                                        {{ detail.projectManager }}
                                    </span>
                                </div>
                                <div class="clearfix  cominfo-item">
                                    <span class="left-title font-gray">实施负责人：</span>
                                    <span class="right-con">
                                        {{ detail.impleLeaderName }}
                                    </span>
                                </div>
                                <div class="clearfix  cominfo-item">
                                    <span class="left-title font-gray">清结算：</span>
                                    <span class="right-con">
                                        {{ detail.accountLeaderName }}
                                    </span>
                                </div>
                                <div class="clearfix  cominfo-item" v-if="processFlag">
                                    <span class="float-con">
                                        <el-button type="text" size="small" @click="showEstablish">查看项目调研表<i class="el-icon-arrow-right el-icon--right"></i></el-button>
                                    </span>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
                <div class="segment statistics">
                    <div class="segment-header">
                        一般要求
                    </div>
                    <div class="segment-area">
                        <el-row>
                            <el-col :span="12" class="segment-brline">
                                <div class="clearfix  cominfo-item">
                                    <span class="left-title font-gray">开票方式：</span>
                                    <span class="right-con">
                                        {{ detail.generalRequireResponse&&detail.generalRequireResponse.invoiceModeName }}
                                    </span>
                                </div>
                                <div class="clearfix  cominfo-item" v-if="detail.generalRequireResponse&&detail.generalRequireResponse.projectTrusteeshipt == 1">
                                    <span class="left-title font-gray">托管渠道：</span>
                                    <span class="right-con">
                                        {{ detail.generalRequireResponse&&detail.generalRequireResponse.trusteeshiptChannelName }}
                                    </span>
                                </div>
                            </el-col>
                            <el-col :span="12" class="segment-brline">
                                <div class="clearfix  cominfo-item">
                                    <span class="left-title font-gray">托管：</span>
                                    <span class="right-con">
                                        {{ detail.generalRequireResponse&&detail.generalRequireResponse.projectTrusteeshiptName }}
                                    </span>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
                <div class="segment statistics">
                    <div class="segment-header">
                        特殊要求
                    </div>
                    <div class="segment-area">
                        <el-row>
                            <el-col :span="12" class="segment-brline">
                                <div class="clearfix  cominfo-item">
                                    <span class="left-title font-gray">自营：</span>
                                    <span class="right-con">
                                        {{ detail.specialRequireResponse&&detail.specialRequireResponse.selfMarketingName }}
                                    </span>
                                </div>
                                <div class="clearfix  cominfo-item">
                                    <span class="left-title font-gray">经纪人：</span>
                                    <span class="right-con">
                                        {{ detail.specialRequireResponse&&detail.specialRequireResponse.projectAgentName }}
                                    </span>
                                </div>
                                <div class="clearfix  cominfo-item">
                                    <span class="left-title font-gray">油气：</span>
                                    <span class="right-con">
                                        {{ detail.specialRequireResponse&&detail.specialRequireResponse.oilGasName }}
                                    </span>
                                </div>
                                <div class="clearfix  cominfo-item">
                                    <span class="left-title font-gray">贸易：</span>
                                    <span class="right-con">
                                        {{ detail.specialRequireResponse&&detail.specialRequireResponse.projectTradeName }}
                                    </span>
                                </div>
                                <div class="clearfix  cominfo-item">
                                    <span class="left-title font-gray">网商：</span>
                                    <span class="right-con">
                                        {{ detail.specialRequireResponse&&detail.specialRequireResponse.networkBusinessName }}
                                    </span>
                                </div>
                                <div class="clearfix  cominfo-item">
                                    <span class="left-title font-gray">托盘：</span>
                                    <span class="right-con">
                                        {{ detail.specialRequireResponse&&detail.specialRequireResponse.projectTrayName }}
                                    </span>
                                </div>
                            </el-col>
                            <el-col :span="12" class="segment-brline">
                                <div class="clearfix  cominfo-item">
                                    <span class="left-title font-gray">返点：</span>
                                    <span class="right-con">
                                        {{ detail.specialRequireResponse&&detail.specialRequireResponse.returnPointName }}
                                    </span>
                                </div>
                                <div class="clearfix  cominfo-item" v-if="detail.specialRequireResponse&&detail.specialRequireResponse.returnPoint == 1">
                                    <span class="left-title font-gray">返点比例（%）：</span>
                                    <span class="right-con">
                                        {{ detail.specialRequireResponse&&detail.specialRequireResponse.returnPointProportion }}
                                    </span>
                                </div>
                                <div class="clearfix  cominfo-item">
                                    <span class="left-title font-gray">车队长：</span>
                                    <span class="right-con">
                                        {{ detail.specialRequireResponse&&detail.specialRequireResponse.truckLeaderName }}
                                    </span>
                                </div>
                                <div class="clearfix  cominfo-item">
                                    <span class="left-title font-gray">叫车：</span>
                                    <span class="right-con">
                                        {{ detail.specialRequireResponse&&detail.specialRequireResponse.callTruckName }}
                                    </span>
                                </div>
                                <div class="clearfix  cominfo-item">
                                    <span class="left-title font-gray">账期：</span>
                                    <span class="right-con">
                                        {{ detail.specialRequireResponse&&detail.specialRequireResponse.accountPeriodName }}
                                    </span>
                                </div>
                                
                            </el-col>
                        </el-row>
                    </div>
                </div>
                <div class="segment statistics">
                    <div class="segment-header">
                        备注：
                    </div>
                    <div class="segment-area">
                        <sjbtextarea
                            :rows="3"
                            textStyle="margin-top:20px;margin-bottom:20px"
                            placeholder="请输入内容"
                            :max="200"
                            :readonly="true"
                            v-model.trim="detail.remarks">
                        </sjbtextarea>
                    </div>
                </div>
                <div class="segment statistics">
                    <div class="segment-header">
                        <span class="left-red">*</span>
                        联系人信息
                    </div>
                    <div class="segment-area">
                        <div class="el-table__body-wrapper" style="padding: 15px 0;">
                            <el-table ref="multipleTable" border :data="contactList" tooltip-effect="dark" style="width:800px">
                                <el-table-column align="center" label="编号" width="50px">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.index}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" label="联系人" width="320px">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.linkmanName}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" label="联系方式">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.linkmanPhone}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" label="职位">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.linkmanPost}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" label="备注（选填）">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.remarks}}</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <!-- <div class="pagination-container">
                            <el-pagination background @current-change="handleNodeChange" :current-page="pageNodeNo" :page-size="pageNodeSize" layout="total, prev, pager, next, jumper" :total="nodeTotal">
                            </el-pagination>
                        </div> -->
                    </div>
                </div>
                <div class="segment statistics">
                    <div class="segment-header">
                        <span class="left-red">*</span>
                        实施节点
                    </div>
                    <div class="segment-area">
                        <div class="el-table__body-wrapper" style="padding: 15px 0;">
                            <el-table ref="multipleTable" border :data="itemList" tooltip-effect="dark" style="width:800px">
                                <el-table-column align="center" label="编号" width="50px">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.index}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" label="地点节点" width="320px">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.nodeName}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" label="节点地址（选填）">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.nodeAddress}}</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <div class="pagination-container">
                            <el-pagination background @current-change="handleNodeChange" :current-page="pageNodeNo" :page-size="pageNodeSize" layout="total, prev, pager, next, jumper" :total="nodeTotal">
                            </el-pagination>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="签约合同" name="2">
                <div class="segment statistics">
                    <div class="segment-header">
                        签约合同
                    </div>
                    <div class="segment-area">
                        <div class="el-table__body-wrapper" style="padding: 15px 0;">
                            <el-table ref="multipleTable" border :data="connectList" tooltip-effect="dark" style="width:100%">
                                <el-table-column align="center" label="合同编号" width="200px">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.contractCode}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" label="合同名称" width="220px">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.contractName}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" label="合同开始日期" width="220px">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.contractStartTime | stamp2TextDate}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" label="合同结束日期">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.contractEndTime | stamp2TextDate}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" label="合同负责人">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.contractLeader}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" label="合同状态" width="220px">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.contractHisStatusName}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" label="操作" width="220px">
                                    <template slot-scope="scope">
                                        <el-button type="primary" size="mini" @click="showDetail(scope.row)">详情</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <div class="pagination-container">
                            <el-pagination background @current-change="handleCurrentChange" :current-page="pageNo" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
                            </el-pagination>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="实施情况" name="3">
                <div class="segment statistics">
                    <div class="segment-header">
                        实施情况
                    </div>
                    <div class="segment-area">
                        <div class="filter-container" style="margin-top:10px">
                            <span class="toolbar-item">
                                <span class="item-label">选择日期：</span>
                                <el-date-picker v-model="listQuery.timeRange" type="daterange" class="filter-item" style="width:287px" placeholder="选择日期范围"  :picker-options="pickerOptions">
                                </el-date-picker>
                            </span>
                            <span class="toolbar-item">
                                <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleImFilter">搜索</el-button>
                                <el-button class="filter-item" type="warning" icon="el-icon-refresh" @click="restListQuery(restCallback)">重置</el-button>
                            </span>
                            <span class="toolbar-item">
                                <el-button class="filter-item" type="primary" icon="el-icon-download"  @click="exportFile">导出excel</el-button>
                            </span>
                        </div>
                        <div class="el-table__body-wrapper" style="padding: 15px 0;">
                            <el-table ref="multipleTable" border :data="imList" tooltip-effect="dark" style="width:100%">
                                <el-table-column align="center" label="日期" width="200px">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.date | stamp2TextDate}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" label="节点" width="220px">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.nodeName}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" label="汇报人" width="220px">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.reporter}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" label="具体异常情况">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.anomalyDescription}}</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <div class="pagination-container">
                            <el-pagination background @current-change="handleImChange" :current-page="pageImNo" :page-size="pageImSize" layout="total, prev, pager, next, jumper" :total="imTotal">
                            </el-pagination>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
        <div class="segment statistics">
            <div class="sjb-foot-button">
                <el-button size="medium" @click="backStep">返回</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import common from "@/utils/common";
import Department from "@/components/Department";
import RedStar from "@/components/RedStar/RedStar.vue";
import sjbtextarea from '@/components/sjbTextarea/index.vue';
import { fetchForm, custList, savePro , getCompanyList , getContractList ,getNodeList,getImList,downFile} from "@/api/project";
import { parseTime } from "@/utils";
import { toJS, fromJS, Map, List } from 'immutable';
import listQueryMix from '../../mixins/listQuery.mix';

export default {
    components: {
        Department,
        RedStar,
        sjbtextarea
    },
    mixins: [listQueryMix],
    data() {
        let self = this;
        return {
            activeName:'1',
            detail:{},
            showNum: false,

            dialogMarketVisible: false,
            dialogImpleVisible: false,
            filterDepart: "",
            filterPro: "",
            filterMarket: "",
            filterImple: "",
            proLeader: "",
            depart: "",
            marketLeader: "",
            impleLeader: "",
            departProps: {
                children: "children",
                label: "name"
            },
            defaultProps: {
                children: "children",
                label: "name"
            },
            treeData: [],
            proTypeList: [],
            proStateList: [],
            departTreeList: [],
            itemList: [],
            projectCode: "",
            filter: {
                //筛选条件
                id: null,
                custInfoId: "",
                officeId: "",
                impleLeaderId: "",
                marketLeaderId: "",
                projectLeaderId: "",
                projectType: "",
                projectName: "",
                remarks: "",
                holderCode:[]
            },
            custArr: [],
            proTreeData: {},
            marketTreeData: {},
            impTreeData: {},
            comList:[],


            connectList:[],
            pageNo:1,
            pageSize:10,
            total:null,

            dialogMap:false,
            mapCenter:[114.42158, 30.4549],
            markers: [],
            windows: [],
            window: '',
            position:{},
            tempId:'',

            pageNodeNo:1,
            pageNodeSize:10,
            nodeTotal:0,

            listQuery:{
                timeRange:[
                    common.time.currentMonFirDayObj,
                    common.time.currentMonNowDayObj
                ],
            },
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            },
            pageImNo:1,
            pageImSize:10,
            imTotal:0,
            imList:[],
            companyList:[],
            contactList:[],
            goodsNames:[],
            processFlag:""
        };
    },
    watch: {
        
    },
    created() {
        if (this.$route.query.key) {
            this.showNum = true;
            fetchForm({
                id: this.$route.query.key
            }).then(res => {
                this.detail = res.data;
                this.processFlag = res.data.processFlag || ""
                res.data.carrierGoods&&res.data.carrierGoods.forEach(item=>{
                    this.goodsNames.push(item.carrierGoodName)
                })
                res.data.mainCompany&&res.data.mainCompany.forEach(item=>{
                    this.companyList.push(item.companyName)
                })
                // res.data.projectLinkmanDetailResponse.forEach((item,index)=>{
                //     item.index = index+1
                // })
                this.contactList = res.data.projectLinkmanDetailResponse&&res.data.projectLinkmanDetailResponse.map((i,key)=>{
                    return {
                        ...i,
                        index:key+1
                    }
                })
            });
            this.$$queryStub = this.$$listQuery;
            this.getIm()
            this.getConnect();
            this.getNode();

        }
    },
    mounted() {
        
    },
    methods: {
        tabClick(value){
            this.activeName = value.name;
        },
        handleCurrentChange(val) {
            this.pageNo = val;
            this.getConnect();
        },
        handleNodeChange(val){
            this.pageNodeNo = val;
            this.getNode();
        },
        getNode(){
            getNodeList({
                projectId:this.$route.query.key,
                pageNo:this.pageNodeNo,
                pageSize:this.pageNodeSize
            }).then(res=>{
                res.data.list.forEach((item,index)=>{
                    item.index = index;
                })
                this.itemList = res.data.list;
                this.nodeTotal = res.data.total;
            })
        },
        getConnect() {
            getContractList({
                projectId:this.$route.query.key,
                pageNo:this.pageNo,
                pageSize:this.pageSize
            }).then(res => {
                this.connectList = res.data.list;
                this.total = res.data.total;
            })
        },

        getIm(){
            var postData = this.reduceParams(this.$$queryStub);
            getImList({
                ...postData,
                projectId:this.$route.query.key,
                pageNo:this.pageImNo,
                pageSize:this.pageImSize
            }).then(res=>{
                this.imList = res.data.list;
                this.imTotal = res.data.total
            })
        },
        reduceParams($$imData) {
            if (!$$imData || $$imData.size == 0) return {};
            const $$postData = $$imData
                .set('beginTime', common.rangeObjToTimestamp($$imData.get('timeRange').toJS()).applyTimeStart)
                .set('endTime', common.rangeObjToTimestamp($$imData.get('timeRange').toJS()).applyTimeEnd)
                .delete('timeRange')
            return $$postData.toJS();
        },
        restCallback(){
            this.listQuery.timeRange = [common.time.currentMonFirDayObj,common.time.currentMonNowDayObj]
            this.$$queryStub = fromJS(this.listQuery);
        },
        backStep() {
            this.$router.push({
                path: "/inforManage/projectList"
            });
        },
        handleImChange(val){
            this.pageImNo = val;
            this.getIm();
        },
        handleImFilter(){
            this.pageNo = 1;
            if(!this.listQuery.timeRange){
                this.listQuery.timeRange = []
            }
            this.$$queryStub = fromJS(this.listQuery);
            this.getIm();
        },
        exportFile(){
            var postData = this.reduceParams(this.$$queryStub);
            downFile({
                ...postData,
                projectId:this.$route.query.key
            }).then(res=>{
                if(res.status == 0){
                    var url = `./OA${res.data}`;
                    window.location.href = url;
                    this.$message({
                        message:res.message,
                        type:'success'
                    })
                }
            })
        },
        showDetail(row){
            this.$router.push({
                path:'/inforManage/contractFillDetail',
                query: { key: row.contractHisId }
            })
        },
        showEstablish(){
            this.$router.push({
                path:'/inforManage/establishDetail',
                query: { key: this.processFlag ,pathType: 'list' }
            })
        }
    }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.tabs{
    padding-left:15px; 
}
.amap-con{
    margin-top: 10px;
    height:450px
}
.item-value {
    display: inline-block;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background: white;
    padding-left: 7px;
    line-height: 30px;
    width: 250px;
    overflow:hidden;
}
.map-value {
    margin-top: 6px;
    display: inline-block;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background: white;
    padding-left: 7px;
    width: 350px;
    overflow:hidden;
}
.left-red {
    color: red;
    position: absolute;
    left: 15px;
}
.right-red {
    color: red;
    position: absolute;
    left: 49%;
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

.upload-container {
    margin: 50px;
}
.editor-slide-upload {
    margin-bottom: 15px;
}
.toolbar-item{
    margin-left: 10px
}
.item-label{
    color: #616367;
    font-size: 12px;
}
.float-con{
    float:right
}
</style>