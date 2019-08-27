<template>
  <div class="sjb-form-wrapper">
    <div class="segment statistics">
        <div class="segment-header">
            基本信息
        </div>
        <div class="segment-area">
            <el-row>
                <el-col :span="12" class="segment-brline">
                    <RedStar label="项目编号：" v-if="showNum">
                        <span class="right-con">
                            {{projectCode}}
                        </span>
                    </RedStar>

                    <RedStar label="项目名称：" :required="true">
                        <span class="right-con">
                            <el-input placeholder="请输入" style="width:250px;" v-model.trim="filter.projectName" :maxlength="64"></el-input>
                        </span>
                    </RedStar>
                    
                    
                    <RedStar label="客户名称：" :required="true">
                        <span class="right-con">
                            <el-select filterable remote reserve-keyword  clearable class="filter-item" v-model="filter.custInfoId" placeholder="请输入客户名称" style="width:250px;" :remote-method="searchCust">
                                <el-option v-for="item in custArr" :label="item.custName" :value="item.id" :key="item.id">
                                </el-option>
                            </el-select>
                        </span>
                    </RedStar>

                    <RedStar label="企业名称：" :required="true">
                        <span class="right-con">
                            <el-select 
                                filterable
                                remote 
                                multiple
                                style="width: 250px" 
                                class="filter-item" 
                                v-model="filter.holderCode" 
                                placeholder="请输入企业名称" 
                                :remote-method="searchCom">
                                <el-option v-for="item in comList" :key="item.holderCode" :label="item.companyName" :value="item.holderCode">
                                </el-option>
                            </el-select>
                        </span>
                    </RedStar>
                    <RedStar label="项目等级：" :required="true">
                        <span class="right-con">
                            <el-select clearable class="filter-item" v-model="filter.projectLevel" placeholder="请选择" style="width:250px;" >
                                <el-option v-for="item in LevelList" :label="item.name" :value="item.value" :key="item.value">
                                </el-option>
                            </el-select>
                        </span>
                    </RedStar>
                    <RedStar label="计划上线时间：" :required="true">
                        <span class="right-con">
                            <el-date-picker style="width:250px" v-model="onlinePlanTime" type="date" placeholder="选择日期">
                            </el-date-picker>
                        </span>
                    </RedStar>
                    <RedStar label="商务助理：">
                        <span class="right-con">
                            <div class="item-value" @click="showDialog(1)">
                                <i class="el-icon-search" style="color:#bfbfbf"></i>
                                <span style="color:#606266">{{assistLeader}}</span>
                            </div>
                        </span>
                    </RedStar>
                    <RedStar label="VIP客服：">
                        <span class="right-con">
                            <div class="item-value" @click="showDialog(2)">
                                <i class="el-icon-search" style="color:#bfbfbf"></i>
                                <span style="color:#606266">{{serviceLeader}}</span>
                            </div>
                        </span>
                    </RedStar>
                </el-col>
                <el-col :span="12" class="segment-brline">
                    <RedStar label="项目类型：" :required="true">
                        <span class="right-con">
                            <el-select clearable class="filter-item" v-model="filter.projectType" placeholder="请选择" style="width:250px;" >
                                <el-option v-for="item in proTypeList" :label="item.name" :value="item.value" :key="item.value">
                                </el-option>
                            </el-select>
                        </span>
                    </RedStar>
                    <RedStar label="月开票频次(次/月)：" :required="true">
                        <span class="right-con">
                            <el-input v-model.number="filter.invoicingFrequency" type="number" style="width:250px;"></el-input>
                        </span>
                    </RedStar>
                     <RedStar label="计划月运费(万元/月)：" :required="true">
                        <span class="right-con">
                            <el-input v-model.number="filter.transExpenssPlan" type="number" style="width:250px;"></el-input>
                        </span>
                    </RedStar>
                    <RedStar label="承运货物：" :required="true">
                        <span class="right-con">
                            <el-select clearable multiple filterable class="filter-item" v-model="filter.carrierGoods" placeholder="请选择" style="width:250px;" >
                                <el-option v-for="item in goods" :label="item.name" :value="item.value" :key="item.value">
                                </el-option>
                            </el-select>
                        </span>
                    </RedStar>
                    <!-- <Department type="form" :DId="filter.officeId" :Dvalue="depart" @on-confirm="depConfirm"></Department> -->
                    <RedStar label="项目管理负责人：" :required="true">
                        <span class="right-con">
                            <div class="item-value" @click="showDialog(3)">
                                <i class="el-icon-search" style="color:#bfbfbf"></i>
                                <span style="color:#606266">{{proLeader}}</span>
                            </div>
                        </span>
                    </RedStar>
                   
                    <RedStar label="实施负责人：">
                        <span class="right-con">
                            <div class="item-value" @click="showDialog(4)">
                                <i class="el-icon-search" style="color:#bfbfbf"></i>
                                <span style="color:#606266">{{impleLeader}}</span>
                            </div>
                        </span>
                    </RedStar>
                    <RedStar label="清结算：">
                        <span class="right-con">
                            <div class="item-value" @click="showDialog(5)">
                                <i class="el-icon-search" style="color:#bfbfbf"></i>
                                <span style="color:#606266">{{settleLeader}}</span>
                            </div>
                        </span>
                    </RedStar>
                </el-col>
            </el-row>
        </div>
    </div>
    <div class="segment statistics">
        <div class="segment-header">
           一般要求：
        </div>
        <div class="segment-area">
            <el-row>
                <el-col :span="12" class="segment-brline">
                    <RedStar label="开票方式：" :required="true">
                        <span class="right-con">
                            <el-select clearable class="filter-item" v-model="generalRequire.invoiceMode" placeholder="请选择开票方式" style="width:250px;" >
                                <el-option v-for="item in invoiceList" :label="item.name" :value="item.value" :key="item.value">
                                </el-option>
                            </el-select>
                        </span>
                    </RedStar>
                    <RedStar label="托管渠道：" :required="true" v-if="generalRequire.projectTrusteeshipt == 1">
                        <span class="right-con">
                            <el-select clearable class="filter-item" v-model="generalRequire.trusteeshiptChannel" placeholder="请选择托管渠道" style="width:250px;" >
                                <el-option v-for="item in channelList" :label="item.name" :value="item.value" :key="item.value">
                                </el-option>
                            </el-select>
                        </span>
                    </RedStar>
                </el-col>
                <el-col :span="12" class="segment-brline">
                    <RedStar label="托管：" :required="true">
                        <span class="right-con">
                            <el-select clearable class="filter-item" v-model="generalRequire.projectTrusteeshipt" placeholder=" 请选择是否托管" style="width:250px;" >
                                <el-option v-for="item in yesNo" :label="item.name" :value="item.value" :key="item.value">
                                </el-option>
                            </el-select>
                        </span>
                    </RedStar>
                </el-col>
            </el-row>
        </div>
    </div>
    <div class="segment statistics">
        <div class="segment-header">
           特殊要求：
        </div>
        <div class="segment-area">
            <el-row>
                <el-col :span="12" class="segment-brline">
                    <RedStar label="自营：" :required="true">
                        <span class="right-con">
                            <el-select clearable class="filter-item" v-model="specialRequire.selfMarketing" placeholder="请选择" style="width:250px;" >
                                <el-option v-for="item in yesNo" :label="item.name" :value="item.value" :key="item.value">
                                </el-option>
                            </el-select>
                        </span>
                    </RedStar>
                    <RedStar label="经纪人：" :required="true">
                        <span class="right-con">
                            <el-select clearable class="filter-item" v-model="specialRequire.projectAgent" placeholder="请选择" style="width:250px;" >
                                <el-option v-for="item in yesNo" :label="item.name" :value="item.value" :key="item.value">
                                </el-option>
                            </el-select>
                        </span>
                    </RedStar>
                    <RedStar label="油气：" :required="true">
                        <span class="right-con">
                            <el-select clearable class="filter-item" v-model="specialRequire.oilGas" placeholder="请选择" style="width:250px;" >
                                <el-option v-for="item in oilGasList" :label="item.name" :value="item.value" :key="item.value">
                                </el-option>
                            </el-select>
                        </span>
                    </RedStar>
                    <RedStar label="贸易：" :required="true">
                        <span class="right-con">
                            <el-select clearable class="filter-item" v-model="specialRequire.projectTrade" placeholder="请选择" style="width:250px;" >
                                <el-option v-for="item in yesNo" :label="item.name" :value="item.value" :key="item.value">
                                </el-option>
                            </el-select>
                        </span>
                    </RedStar>
                    <RedStar label="网商：" :required="true">
                        <span class="right-con">
                            <el-select clearable class="filter-item" v-model="specialRequire.networkBusiness" placeholder="请选择" style="width:250px;" >
                                <el-option v-for="item in yesNo" :label="item.name" :value="item.value" :key="item.value">
                                </el-option>
                            </el-select>
                        </span>
                    </RedStar>
                    <RedStar label="托盘：" :required="true">
                        <span class="right-con">
                            <el-select clearable class="filter-item" v-model="specialRequire.projectTray" placeholder="请选择" style="width:250px;" >
                                <el-option v-for="item in yesNo" :label="item.name" :value="item.value" :key="item.value">
                                </el-option>
                            </el-select>
                        </span>
                    </RedStar>
                </el-col>
                <el-col :span="12" class="segment-brline">
                    <RedStar label="返点：" :required="true">
                        <span class="right-con">
                            <el-select clearable class="filter-item" v-model="specialRequire.returnPoint" placeholder="请选择" style="width:250px;">
                                <el-option v-for="item in yesNo" :label="item.name" :value="item.value" :key="item.value">
                                </el-option>
                            </el-select>
                        </span>
                    </RedStar>
                    <RedStar label="返点比例（%）：" :required="true" v-if="specialRequire.returnPoint == 1">
                        <span class="right-con">
                            <el-input v-model.number="specialRequire.returnPointProportion" type="number" style="width:250px;"></el-input>
                        </span>
                    </RedStar>
                    <RedStar label="车队长：" :required="true">
                        <span class="right-con">
                            <el-select clearable class="filter-item" v-model="specialRequire.truckLeader" placeholder="请选择" style="width:250px;" >
                                <el-option v-for="item in yesNo" :label="item.name" :value="item.value" :key="item.value">
                                </el-option>
                            </el-select>
                        </span>
                    </RedStar>
                    <RedStar label="叫车：" :required="true">
                        <span class="right-con">
                            <el-select clearable class="filter-item" v-model="specialRequire.callTruck" placeholder="请选择" style="width:250px;" >
                                <el-option v-for="item in yesNo" :label="item.name" :value="item.value" :key="item.value">
                                </el-option>
                            </el-select>
                        </span>
                    </RedStar>
                    <RedStar label="账期：" :required="true">
                        <span class="right-con">
                            <el-select clearable class="filter-item"v-model="specialRequire.accountPeriod" placeholder="请选择" style="width:250px;" >
                                <el-option v-for="item in yesNo" :label="item.name" :value="item.value" :key="item.value">
                                </el-option>
                            </el-select>
                        </span>
                    </RedStar>
                    
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
                v-model.trim="filter.remarks">
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
                    <el-table ref="multipleTable" border :data="contactList" tooltip-effect="dark" style="width:100%" @selection-change="handleSelectionChange">
                        <el-table-column
                            type="selection"
                            width="55">
                        </el-table-column>
                        <el-table-column align="center" label="联系人" width="150px">
                            <template slot-scope="scope">
                                <el-input auto-complete="off" v-model.trim="scope.row.linkmanName" :maxlength="50"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="联系方式" width="180px">
                            <template slot-scope="scope">
                                <el-input auto-complete="off" v-model.trim="scope.row.linkmanPhone" :maxlength="50"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="职位" width="150px">
                            <template slot-scope="scope">
                                <el-input auto-complete="off" v-model.trim="scope.row.linkmanPost" :maxlength="50"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="备注（选填）" >
                            <template slot-scope="scope">
                                <el-input auto-complete="off" v-model.trim="scope.row.remarks" :maxlength="200"></el-input>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="segment-foot">
                <el-button type="primary" size="small" @click="addContact">新增</el-button>
                <el-button type="danger" size="small" @click="delContact">删除</el-button>
            </div>
        </div>
    <div class="segment statistics">
        <div class="segment-header">
            实施节点
        </div>
        <div class="segment-area">

            <div class="el-table__body-wrapper">
                <table id="expenseDetails" class="table table-striped table-bordered table-condensed" style="margin-bottom: 20px;">
                    <thead>
                        <tr class="tableTitle">
                            <td style="text-align: center;width: 20px;padding: 0 10px 0 10px;">
                                <el-checkbox @change="selectAll"></el-checkbox>
                            </td>
                            <td class="tableTitle" style="width:320px">地点节点</td>
                            <td class="tableTitle" style="width:400px">节点地址</td>
                        </tr>
                    </thead>
                    <tbody>
                        <ImplyNode v-for="(item,index) in itemList" style="height:50px" :key="index" :itemData="item"></ImplyNode>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="segment-foot">
            <el-button type="primary" size="small" @click="add">新增</el-button>
            <el-button type="danger" size="small" @click="del">删除</el-button>
        </div>
    </div>
    <el-dialog :title="title" :visible.sync="dialogVisible"  width="25%" :center="true">
        <el-input placeholder="输入关键字进行过滤" v-model="filterTree" style="margin-bottom:10px"></el-input>
        <el-tree node-key="id" :data="treeData" show-checkbox check-strictly :props="defaultProps" @check-change="handleClick"  :filter-node-method="memberNode" ref="tree"></el-tree>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="selectMember">确认</el-button>
        </div>
    </el-dialog>
    <div class="segment statistics">
        <div class="sjb-foot-button">
            <el-button  type="primary" size="small" @click="saveProForm">保存</el-button>
            <el-button  size="small" @click="backStep">返回</el-button>
        </div>
    </div>
  </div>
</template>

<script>
import common from "@/utils/common";
import Department from "@/components/Department";
import ImplyNode from '@/components/ImplyNode'
import RedStar from "@/components/RedStar/RedStar.vue";
import { fetchForm, custList, savePro , getCompanyList , getContractList } from "@/api/project";
import { parseTime } from "@/utils";
import { mapState, mapGetters } from "vuex";
import sjbtextarea from '@/components/sjbTextarea/index.vue';
// import Vue from 'vue';
// import VueAMap from 'vue-amap';


// Vue.use(VueAMap);
// VueAMap.initAMapApiLoader({
//     key: 'dc6f7d81b97b1e3f13fe76a55949a503',
//     plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch','AMap.Geocoder']
// });



export default {
    components: {
        Department,
        RedStar,
        ImplyNode,
        sjbtextarea
    },
     computed:{
        ...mapState({
            itemList:state => state.map.itemList,
        })
    },
    data() {
        let self = this;
        return {
            showNum: false,
            dialogVisible: false,
            title:"",
            dialogType:"",
            filterTree: "",
            serviceLeader: "",
            assistLeader: "",
            proLeader: "",
            impleLeader: "",
            settleLeader:"",
            defaultProps: {
                children: "children",
                label: "name"
            },
            treeData: [],
            proTypeList: [],
            proStateList: [],
            projectCode: "",
            multipleSelection:[],
            onlinePlanTime:'',
            filter: {
                //筛选条件
                accountLeaderId: "",//清结算 ,
                businessAssistantId:"" ,//商务助理 ,
                carrierGoods:[],// 承运货物:1煤炭2钢铁3商砼4其他 ,
                custInfoId:"",// 归属客户 ,
                // generalRequire:"",// 一般要求 ,
                holderCode:[],// 企业编号 ,
                id:"" ,//主键id ,
                impleLeaderId: "",//实施负责人 ,
                invoicingFrequency:"", //月开票频次（次/月） ,
                // marketLeaderId:"",// 市场负责人 ,
                // officeId:"",// 归属部门 ,
                onlinePlanTime:"", //计划上线时间 ,
                // producSide :"",
                // projectLeaderId:"",// 项目负责人 ,
                projectLevel:"",// 项目等级ABCD ,
                projectManagerId:"",// 项目管理负责人 ,
                projectName:"",// 项目名称 ,
                projectNodeReqs:[],// 项目节点 ,
                projectType:"",// 项目类型0公司项目1市场项目 ,
                remarks:"",// 备注 ,
                // specialRequire: 特殊要求 ,
                transExpenssPlan : "",//计划月运费(万元) ,
                vipCustomerId :"", //VIP客服
            },
            // 一般要求 ,
            generalRequire:{
                invoiceMode:"",
                projectTrusteeshipt:"",
                trusteeshiptChannel:"1"
            },
            //特殊要求 ,
            specialRequire:{
                accountPeriod:"0",// 账期：1是，0否 ,
                callTruck:"0",// 叫车：1是，0否 ,
                networkBusiness:"0",// 网商：1是，0否 ,
                oilGas:"1",// 油气：1不做油气，2带油,3带气,4带油和气 ,
                projectAgent:"0",// 项目经纪人：1是，0否 ,
                projectTrade:"0",// 贸易：1是，0否 ,
                projectTray:"0",// 项目托盘：1是，0否 ,
                returnPoint:"0",// 返点：1是，0否 ,
                returnPointProportion:"",
                selfMarketing:"0",// 自营：1是，0否 ,
                truckLeader:"0",// 车队长：1是，0否
            },
            custArr: [],
            memberData:[],

            comList:[],

            companyList:[],
            contactList:[],
            yesNo:[],
            oilGasList:[],
            invoiceList:[],
            channelList:[],
            goods:[],
            LevelList:[],
            processFlag:""
        };
    },
    watch: {
        filterTree(val) {
            this.$refs.tree.filter(val);
        },
    },
    created() {
        this.$store.dispatch('clearList');
        if (this.$route.query.key) {
            this.showNum = true;
            fetchForm({
                id: this.$route.query.key
            }).then(res => {
                this.processFlag = res.data.processFlag || ""
                this.filter.id = res.data.id;
                this.filter.custInfoId= res.data.custInfoId;
                this.custArr.push({custName:res.data.custInfoName,id:res.data.custInfoId});
                this.filter.transExpenssPlan = res.data.transExpenssPlan;
                this.filter.invoicingFrequency = res.data.invoicingFrequency;
                this.filter.projectLevel = res.data.projectLevel
                this.filter.projectType= res.data.projectType;
                this.filter.projectName= res.data.projectName;
                this.filter.remarks= res.data.remarks;
                res.data.mainCompany = res.data.mainCompany || [];
                this.comList = res.data.mainCompany;
                res.data.mainCompany.forEach(item=>{
                    this.filter.holderCode.push(item.holderCode)
                })
                this.projectCode = res.data.projectCode;
                this.filter.vipCustomerId = res.data.vipCustomerId;
                this.serviceLeader = res.data.vipCustomerName;
                this.filter.businessAssistantId = res.data.businessAssistantId;
                this.assistLeader = res.data.businessAssistantName;
                this.filter.projectManagerId = res.data.projectManagerId;
                this.proLeader= res.data.projectManager;
                this.filter.impleLeaderId = res.data.impleLeaderId;
                this.impleLeader= res.data.impleLeaderName;
                this.filter.accountLeaderId = res.data.accountLeaderId
                this.settleLeader= res.data.accountLeaderName;
                if(res.data.generalRequireResponse){
                    this.generalRequire = res.data.generalRequireResponse;
                }
                if(res.data.specialRequireResponse){
                    this.specialRequire = res.data.specialRequireResponse;
                }
                if(res.data.onlinePlanTime){
                    this.onlinePlanTime = common.timeParseObj(res.data.onlinePlanTime)
                }
                if(res.data.projectLinkmanDetailResponse){
                    this.contactList = res.data.projectLinkmanDetailResponse&&res.data.projectLinkmanDetailResponse.map(item=>{   
                        return{
                            ...item,
                            index: (parseInt((Math.random() * 100000)) + new Date().getTime())
                        }
                    })
                }
                res.data.carrierGoods&&res.data.carrierGoods.forEach(item=>{
                    this.filter.carrierGoods.push(item.carrierGood)
                })
                res.data.projectNodeDetailResponse = res.data.projectNodeDetailResponse || [];
                this.$store.dispatch('fillItemList', res.data.projectNodeDetailResponse);
            });
        }
    },
    async mounted() {
        await this.$store.dispatch('FetchDictsAndLocalstore')
        let dicList = JSON.parse(localStorage.getItem("web_oa_dicList"));
        function selectDic(arr, type) {
            let temp = [];
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].type == type) {
                temp.push(arr[i]);
                }
            }
            return temp;
        }
        this.proTypeList = selectDic(dicList, "project_type");
        this.proStateList = selectDic(dicList, "project_state");
        this.yesNo = selectDic(dicList,"yes_no");
        this.oilGasList = selectDic(dicList, "oil_gas");
        this.invoiceList = selectDic(dicList, "invoice_mode");
        this.channelList = selectDic(dicList, "trusteeshipt_channel");
        this.goods = selectDic(dicList, "carrier_goods");
        this.LevelList = selectDic(dicList, "project_level")
        //人员树
        let memberList = JSON.parse(localStorage.getItem("web_oa_member"));
        var newArr = [];
        let len = memberList.length;
        function filterResign (memberList) {
            let ids = [];
            memberList.forEach(item=>{
                ids.push(item.pId)
                if(item.userInfo.length){
                    let tem = item.userInfo;
                    tem = tem.filter(i=>{
                        return i.status=="1"
                    })
                    item.userInfo = tem;
                }
            })

            ids = Array.from(new Set(ids))
            for(var i = memberList.length - 1; i >= 0; i--){
                if(ids.indexOf(memberList[i].id)=="-1"&&memberList[i].type=="1"&&memberList[i].userInfo.length=="0"){
                    memberList.splice(i,1)
                }
            }
        }
        filterResign(memberList);
        while(len != memberList.length){
            len = memberList.length
            filterResign(memberList);
        }

        common.transToTree(memberList, newArr);
        common.mapAndAddChildren(newArr);
        this.treeData = newArr;
    },
    methods: {
        handleSelectionChange(val){
            this.multipleSelection = val;
        },
        showDialog(type){
            this.dialogType = type;
            this.dialogVisible = true;
            if(type==1){
                this.title = "请选择商务助理"
            }
            if(type==2){
                this.title = "请选择VIP客服"
            }
            if(type==3){
                this.title = "请选择项目管理负责人"
            }
            if(type==4){
                this.title = "请选择实施负责人"
            }
            if(type==5){
                this.title = "请选择清结算"
            }
        },
        searchCust(val){
            if(val !==''){
                custList({
                    //还有项目名称
                    custName:val,
                }).then(res=>{
                    this.custArr = res.data;
                })
            }
        },
        selectAll(val) {
            this.$store.dispatch('fillItemListChecked', val);
        },
        add() {
            this.$store.dispatch("addItem");
        },
        del() {
            let flag = true;
            let temp = JSON.parse(JSON.stringify(this.itemList))
            temp.some(item=>{
                if(item.nodeId&&item.checked == true){
                    this.$message({
                        message: "不能删除已保存的地址节点！",
                        type: "warning"
                    })
                    flag = false;
                    return true;
                }
            })
            if(flag){
                this.$store.dispatch('delItemListChecked');
            }
            
        },
        addContact(){
            this.contactList.push({ index: parseInt((Math.random() * 100000))+new Date().getTime(),});
        },
        delContact(){
            var _this = this
            var newindex = [];
            var newBox = [];
            _this.multipleSelection.forEach((value,idx)=>{
                newindex.push(value.index)
            })
            var arrBox = JSON.parse(JSON.stringify(this.contactList||[]))
            arrBox.forEach((val,num)=>{
                if(newindex.indexOf(val.index) == -1){
                    newBox.push(arrBox[num])
                }
            })
            this.contactList = newBox
        },
        searchCom(val){
            if(val !== ''){
                getCompanyList({
                    pageNo: 1,
                    pageSize: 20,
                    companyName:val
                }).then(res=>{
                    if(res.status == 0){
                        this.comList = res.data.list
                    }
                })
            }
        },
       
        memberNode(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        
        handleClick(data,select,childSelect) {
            let index = this.memberData.indexOf(data)
            if(index<0&&this.memberData.length ===1&&select){
                if(data.type =='2'&&data.status == '1'){
                    this.$refs.tree.setChecked(this.memberData[0],false);
                    this.memberData = [];
                    this.$refs.tree.setChecked(data,true);
                    this.memberData.push(data)
                }else{
                    this.$message({
                        message: "该节点不可选！",
                        type: 'warning'
                    })
                    this.$refs.tree.setChecked(data,false);
                    this.$refs.tree.setChecked(this.memberData[0],true);
                    return
                }
                
            }else if(this.memberData.length ===0&&select){
                if(data.type =='2'&&data.status == '1'){
                    this.memberData = [];
                    this.memberData.push(data)
                }else{
                    this.$message({
                        message: "该节点不可选！",
                        type: 'warning'
                    })
                    this.$refs.tree.setChecked(data,false);
                    return
                }
            }else if(index>=0&&this.memberData.length===1&&!select){
                this.memberData = []
            }
        },
        backStep() {
            this.$router.push({
                path: "/inforManage/projectList"
            });
        },
        selectMember() {
            if(this.memberData.length&&this.dialogType){
                if(this.dialogType == 1){
                    this.assistLeader = this.memberData[0].name;
                    this.filter.businessAssistantId  = this.memberData[0].id;
                }
                if(this.dialogType == 2){
                    this.serviceLeader = this.memberData[0].name;
                    this.filter.vipCustomerId = this.memberData[0].id;
                }
                if(this.dialogType == 3){
                    this.proLeader = this.memberData[0].name;
                    this.filter.projectManagerId = this.memberData[0].id;
                }
                if(this.dialogType == 4){
                    this.impleLeader = this.memberData[0].name;
                    this.filter.impleLeaderId = this.memberData[0].id;
                }
                if(this.dialogType == 5){
                    this.settleLeader = this.memberData[0].name;
                    this.filter.accountLeaderId  = this.memberData[0].id;
                }
                this.dialogVisible = false;
            }else{
                this.$message({
                    message: this.title,
                    type: "warning"
                });
                return;
            }
        },
        saveProForm() {
            this.filter.onlinePlanTime = common.timeParse(this.onlinePlanTime);
            if(this.specialRequire.returnPoint == 0){
                this.specialRequire.returnPointProportion = ""
            }
             
            if (!this.filter.projectName) {
                this.$message({
                    message: "请填写项目名称",
                    type: "warning"
                });
                return;
            }
            if (!this.filter.projectType) {
                this.$message({
                    message: "请选择项目类别",
                    type: "warning"
                });
                return;
            }
            if (!this.filter.custInfoId) {
                this.$message({
                    message: "请选择客户名称",
                    type: "warning"
                });
                return;
            }
            if(!/^[1-9]\d{0,16}$/.test(this.filter.invoicingFrequency)){
                this.$message({
                    message: "请正确填写月开票频次(次/月)",
                    type: "warning"
                });
                return;
            }
            if (this.filter.holderCode.length == 0) {
                this.$message({
                    message: "请输入企业名称",
                    type: "warning"
                });
                return;
            }
            // if(!/^([0-9][1-16]*)+(.[0-9]{1,2})?$/.test(this.filter.transExpenssPlan) || this.filter.transExpenssPlan == 0){
            if(!/^([0-9][1-16]*)+(.[0-9]{1,2})?$/.test(this.filter.transExpenssPlan)){
                this.$message({
                    message: "请正确填写计划月运费(万元/月)",
                    type: "warning"
                });
                return;
            }
            if (!this.filter.projectLevel) {
                this.$message({
                    message: "请选择项目等级",
                    type: "warning"
                });
                return;
            }
            if(!this.filter.carrierGoods.length){
                this.$message({
                    message: "请选择承运货物",
                    type: "warning"
                });
                return;
            }
            if(!this.filter.onlinePlanTime){
                this.$message({
                    message: "请选择计划上线时间",
                    type: "warning"
                });
                return;
            }
            if (!this.filter.projectManagerId) {
                this.$message({
                    message: "请选择项目管理负责人",
                    type: "warning"
                });
                return;
            }
            if (!this.generalRequire.invoiceMode) {
                this.$message({
                    message: "请选择开票方式",
                    type: "warning"
                });
                return;
            }
            if (!this.generalRequire.projectTrusteeshipt) {
                this.$message({
                    message: "请选择是否托管",
                    type: "warning"
                });
                return;
            }
            if (this.generalRequire.projectTrusteeshipt==1&&!this.generalRequire.trusteeshiptChannel) {
                this.$message({
                    message: "请选择托管渠道",
                    type: "warning"
                });
                return;
            }
            if (!this.specialRequire.selfMarketing) {
                this.$message({
                    message: "请选择是否自营",
                    type: "warning"
                });
                return;
            }
            if (!this.specialRequire.returnPoint) {
                this.$message({
                    message: "请选择是否返点",
                    type: "warning"
                });
                return;
            }
            // if (this.specialRequire.returnPoint == 1 && (!/^([0-9][1-16]*)+(.[0-9]{1,2})?$/.test(this.specialRequire.returnPointProportion) || this.specialRequire.returnPointProportion == 0)) {
            if (this.specialRequire.returnPoint == 1 && !/^([0-9][1-16]*)+(.[0-9]{1,2})?$/.test(this.specialRequire.returnPointProportion)) {
                this.$message({
                    message: "请正确填写返点比例",
                    type: "warning"
                });
                return;
            }
            if (!this.specialRequire.projectAgent) {
                this.$message({
                    message: "请选择是否经纪人",
                    type: "warning"
                });
                return;
            }
            if (!this.specialRequire.truckLeader) {
                this.$message({
                    message: "请选择是否车队长",
                    type: "warning"
                });
                return;
            }
            if (!this.specialRequire.oilGas) {
                this.$message({
                    message: "请选择油气",
                    type: "warning"
                });
                return;
            }
            if (!this.specialRequire.callTruck) {
                this.$message({
                    message: "请选择是否叫车",
                    type: "warning"
                });
                return;
            }
            if (!this.specialRequire.projectTrade) {
                this.$message({
                    message: "请选择是否贸易",
                    type: "warning"
                });
                return;
            }
            if (!this.specialRequire.accountPeriod) {
                this.$message({
                    message: "请选择是否账期",
                    type: "warning"
                });
                return;
            }
            if (!this.specialRequire.networkBusiness) {
                this.$message({
                    message: "请选择是否网商",
                    type: "warning"
                });
                return;
            }
            if (!this.specialRequire.projectTray) {
                this.$message({
                    message: "请选择是否托盘",
                    type: "warning"
                });
                return;
            }

            if(this.contactList.length<1){
                this.$message({
                    message: "请填写联系人信息！",
                    type: "warning"
                });
                return;
            }
            let self = this
            function vali(){
                let flag = true;
                self.contactList.forEach(item=>{
                    if(!item.linkmanName){
                        self.$message({
                            message: "联系人名称不能为空",
                            type: "warning"
                        });
                        flag = false;
                    }
                    else if(!item.linkmanPhone || !/^1[345678][0-9]{9}$/.test(item.linkmanPhone)){
                        self.$message({
                            message: "请正确填写联系人联系方式",
                            type: "warning"
                        });
                        flag = false
                    }
                    else if(!item.linkmanPost){
                        self.$message({
                            message: "联系人职位不能为空",
                            type: "warning"
                        });
                        flag = false
                    }
                })
                return flag
            }
            let flag = true;
            if(this.itemList.length>0){
                this.itemList.forEach(item=>{
                    if(!item.nodeName&&!item.nodeAddress){
                        flag  = false
                        this.$message({
                            message: "请填写地点节点或选择节点地址！",
                            type: "warning"
                        });
                        return;
                    }
                }) 
            }
            if(vali()&&flag){
                savePro({
                    ...this.filter,
                    processFlag:this.processFlag,
                    projectNodeReqs:this.itemList,
                    generalRequire:this.generalRequire,
                    specialRequire:this.specialRequire,
                    mainProjectContacts:this.contactList
                }).then(res => {
                    this.$message({
                        message: res.message,
                        type: "success"
                    });
                    this.$router.push({
                        path: "/inforManage/projectList"
                    });
                });
            }
        
        },
    }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
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
</style>