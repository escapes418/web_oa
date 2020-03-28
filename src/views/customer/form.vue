<template>
    <div class="sjb-form-wrapper" v-if="ready">
        <div class="segment statistics">
            <div class="segment-header">
                基本信息
            </div>
            <div class="segment-area">
                <el-row>
                    <el-col :span="12" class="segment-brline">
                        <RedStar label="客户类型：" :required="true" v-if="!routeKey">
                            <span class="right-con">
                                <el-select clearable class="filter-item" v-model="filter.baseCustInfo.custType" placeholder="请选择" style="width:250px;">
                                    <el-option v-for="item in dictionary.custType" :label="item.name" :value="item.value" :key="item.value">
                                    </el-option>
                                </el-select>
                            </span>
                        </RedStar>
                        <RedStar label="客户类型：" v-if="routeKey">
                            <span class="right-con">
                                {{['无车承运','煤链社'][routeCustType-1]}}
                            </span>
                        </RedStar>
                        <RedStar label="客户简称：">
                            <span class="right-con">
                                <el-input placeholder="请输入" style="width:250px;" v-model.trim="filter.baseCustInfo.custAbbreviation" :maxlength="50"></el-input>
                            </span>
                        </RedStar>
                        <RedStar label="详细地址：" :required="true">
                             <span class="right-con">
                                <el-input placeholder="请输入详细地址" style="width:250px;" v-model.trim="filter.baseCustInfo.custAddress" :maxlength="100"></el-input>
                            </span>
                        </RedStar>
                        <RedStar label="法定代表人：">
                            <span class="right-con">
                                <el-input placeholder="请输入" style="width:250px;" v-model.trim="filter.baseCustInfo.legalRepresentative" :maxlength="50"></el-input>
                            </span>
                        </RedStar>
                        
                    </el-col>
                    <el-col :span="12" class="segment-brline">
                        <RedStar label="客户名称：" :required="true">
                            <span class="right-con">
                                <el-input placeholder="请输入" style="width:250px;" v-model.trim="filter.baseCustInfo.custName" :maxlength="30"></el-input>
                            </span>
                        </RedStar>
                        <RedStar label="地址：" :required="true">
                            <span class="right-con">
                                <region class="area" style="float:left;" v-on:back-region="selectAreaCode" :pointList="filter.baseCustInfo.custAddressCode"></region>
                            </span>
                        </RedStar>
                        <RedStar label="统一社会信用代码：">
                            <span class="right-con">
                                <el-input placeholder="请输入" style="width:250px;" v-model.trim="filter.baseCustInfo.creditCode" :maxlength="50"></el-input>
                            </span>
                        </RedStar>
                        <RedStar label="注册地址：">
                            <span class="right-con">
                                <el-input placeholder="请输入" style="width:250px;" :maxlength="50" v-model.trim="filter.baseCustInfo.registeredAddress"></el-input>
                            </span>
                        </RedStar>
                    </el-col>
                </el-row>
            </div>
        </div>

        <!-- 无车 -->
        <div class="segment statistics" v-show="filter.baseCustInfo.custType == '1'">
            <div class="segment-header">
                业务情况
            </div>
            <div class="segment-area">
                <el-row>
                    <el-col :span="12" class="segment-brline">
                        <RedStar label="所属行业：" :required="true">
                            <span class="right-con">
                                <el-select clearable class="filter-item" v-model="filter.noCar.custTrades" placeholder="请选择" style="width:250px;">
                                    <el-option v-for="item in dictionary.custTrades" :label="item.name" :value="item.value" :key="item.value">
                                    </el-option>
                                </el-select>
                            </span>
                        </RedStar>
                        <RedStar label="规模（万元/月）：">
                            <span class="right-con">
                                <el-input type="number" placeholder="请输入" :maxlength="50" style="width:250px;" v-model.number="filter.noCar.custCompanySize"></el-input>
                            </span>
                        </RedStar>
                        <RedStar label="发货方式：">
                            <span class="right-con">
                                <el-select clearable class="filter-item" v-model="filter.noCar.custDeliverMode" placeholder="请选择" style="width:250px;">
                                    <el-option v-for="item in dictionary.custDeliverMode" :label="item.name" :value="item.value" :key="item.value">
                                    </el-option>
                                </el-select>
                            </span>
                        </RedStar>
                        <RedStar label="结算对象：">
                            <span class="right-con">
                                <el-select clearable class="filter-item" v-model="filter.noCar.custBalanceObj" placeholder="请选择" style="width:250px;">
                                    <el-option v-for="item in dictionary.custBalanceObj" :label="item.name" :value="item.value" :key="item.value">
                                    </el-option>
                                </el-select>
                            </span>
                        </RedStar>
                        <RedStar label="支付方式：">
                            <span class="right-con">
                                <el-select clearable multiple class="filter-item" v-model="filter.noCar.payMethod" placeholder="请选择" style="width:250px;">
                                    <el-option v-for="item in dictionary.payMethod" :label="item.name" :value="item.value" :key="item.value">
                                    </el-option>
                                </el-select>
                            </span>
                        </RedStar>
                    </el-col>
                    <el-col :span="12" class="segment-brline">
                        <RedStar label="业务类型：">
                            <span class="right-con">
                                <el-select clearable class="filter-item" v-model="filter.noCar.custBusinessType" placeholder="请选择" style="width:250px;">
                                    <el-option v-for="item in dictionary.custBusinessType" :label="item.name" :value="item.value" :key="item.value">
                                    </el-option>
                                </el-select>
                            </span>
                        </RedStar>
                        <RedStar label="运力组织方式：">
                            <span class="right-con">
                                <el-select clearable class="filter-item" v-model="filter.noCar.custPowerMode" placeholder="请选择" style="width:250px;">
                                    <el-option v-for="item in dictionary.custPowerMode" :label="item.name" :value="item.value" :key="item.value">
                                    </el-option>
                                </el-select>
                            </span>
                        </RedStar>
                        <RedStar label="收货方式：">
                            <span class="right-con">
                                <el-select clearable class="filter-item" v-model="filter.noCar.custReceiveMode" placeholder="请选择" style="width:250px;">
                                    <el-option v-for="item in dictionary.custReceiveMode" :label="item.name" :value="item.value" :key="item.value">
                                    </el-option>
                                </el-select>
                            </span>
                        </RedStar>
                        <RedStar label="结算周期（天）：">
                            <span class="right-con">
                                <el-input type="number" placeholder="请输入" style="width:250px;" :maxlength="12" v-model="filter.noCar.custBalanceCycle"></el-input>
                            </span>
                        </RedStar>
                        <RedStar label="调度费比例（%）：">
                            <span class="right-con">
                                <el-input placeholder="请输入" style="width:250px;" type="number" :maxlength="50" v-model.trim="filter.noCar.dispatchProportion"></el-input>
                            </span>
                        </RedStar>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="segment statistics" v-show="filter.baseCustInfo.custType == '1'">
            <div class="segment-header">
                贸易结构
            </div>
            <div class="segment-area">
                <div class="textStyle-title">上游：</div>
                <sjbtextarea type="textarea" :rows="4" placeholder="请输入企业名称、线路、地址、据点说明信息" v-model.trim="filter.noCar.upstream" :max="200"></sjbtextarea>
            </div>
            <div class="segment-area" style="margin-bottom:15px">
                <div class="textStyle-title">下游：</div>
                <sjbtextarea type="textarea" :rows="4" placeholder="请输入企业名称、线路、地址、据点说明信息" v-model.trim="filter.noCar.downstream" :max="200"></sjbtextarea>
            </div>
        </div>
        <div class="segment statistics" v-show="filter.baseCustInfo.custType == '1'">
            <div class="segment-header" style="margin-bottom: 20px;">
                <span class="left-red">*</span>
                联系人信息
            </div>
            <div class="segment-area">

                <div class="el-table__body-wrapper">
                    <table id="expenseDetails" class="table table-striped table-bordered table-condensed" style="margin-bottom: 20px;">
                        <thead>
                            <tr class="tableTitle">
                                <td style="text-align: center;width: 20px;padding: 0 10px 0 10px;">
                                    <el-checkbox @change="noCarSelectAll"></el-checkbox>
                                </td>
                                <td class="tableTitle" style="width:300px">联系人</td>
                                <td class="tableTitle" style="width:300px">联系方式</td>
                                <td class="tableTitle" style="width:300px">邮箱(选填)</td>
                                <td class="tableTitle" style="width:300px">职位</td>
                                <td class="tableTitle" style="width:500px">备注(选填)</td>
                                <td class="tableTitle" style="width:300px">合同联系人</td>

                            </tr>
                        </thead>
                        <tbody>
                            <tr  v-for="(item,index) in noCarCustLinkman" :key="index">
                                <td style="padding: 3px 10px 0 10px;">
                                    <el-checkbox v-model="item.checked"></el-checkbox>
                                </td>
                                <td style="padding: 5px 10px;">
                                    <el-input auto-complete="off" v-model.trim="item.linkmanName" :maxlength="50"></el-input>
                                </td>
                                <td style="padding: 0 10px 0 10px;">
                                    <el-input auto-complete="off" v-model.trim="item.linkmanPhone" :maxlength="50"></el-input>
                                </td>
                                <td style="padding: 0 10px 0 10px;">
                                    <el-input auto-complete="off" v-model.trim="item.linkmanMail" :maxlength="50"></el-input>
                                </td>
                                <td style="padding: 0 10px 0 10px;">
                                    <el-input auto-complete="off" v-model.trim="item.linkmanPost" :maxlength="50"></el-input>
                                </td>
                                <td style="padding: 0 10px 0 10px;">
                                    <el-input auto-complete="off" v-model.trim="item.remarks" :maxlength="200"></el-input>
                                </td>
                                <td style="padding: 0 10px 0 10px;">
                                <el-checkbox v-model="item.isContractLinkman" @change="noCarSetLinkman(index)" :true-label="'1'" :false-label="'0'">设为默认的合同联系人</el-checkbox>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="segment-foot">
                <el-button type="primary" size="small" @click="noCarAdd">新增</el-button>
                <el-button type="danger" size="small" @click="noCarDel">删除</el-button>
            </div>
        </div>

        <!-- 煤链社 -->
        <div class="segment statistics" v-show="filter.baseCustInfo.custType == '2'">
            <div class="segment-header">
                业务情况
            </div>
            <div class="segment-area">
                <el-row>
                    <el-col :span="12" class="segment-brline">
                        <RedStar label="客户分类：" :required="true">
                            <span class="right-con">
                                <el-select clearable multiple class="filter-item" v-model="filter.coalUnion.custSort" placeholder="请选择" style="width:250px;">
                                    <el-option v-for="item in dictionary.custSort" :label="item.name" :value="item.value" :key="item.value">
                                    </el-option>
                                </el-select>
                            </span>
                        </RedStar>
                        <RedStar label="服务费比例（%）：" :required="true" v-if="filter.coalUnion.custSort.includes('2')">
                            <span class="right-con">
                                <el-input placeholder="请输入" style="width:250px;" type="number" :maxlength="50" v-model.trim="filter.coalUnion.serviceFee"></el-input>
                            </span>
                        </RedStar>
                        
                        <RedStar label="规模（万元/月）：">
                            <span class="right-con">
                                <el-input type="number" placeholder="请输入" style="width:250px;" :maxlength="50" v-model.number="filter.coalUnion.custCompanySize"></el-input>
                            </span>
                        </RedStar>
                        <RedStar label="发货方式：">
                            <span class="right-con">
                                <el-select clearable class="filter-item" v-model="filter.coalUnion.custDeliverMode" placeholder="请选择" style="width:250px;">
                                    <el-option v-for="item in dictionary.custDeliverMode" :label="item.name" :value="item.value" :key="item.value">
                                    </el-option>
                                </el-select>
                            </span>
                        </RedStar>
                        <RedStar label="结算对象：">
                            <span class="right-con">
                                <el-select clearable class="filter-item" v-model="filter.coalUnion.custBalanceObj" placeholder="请选择" style="width:250px;">
                                    <el-option v-for="item in dictionary.custBalanceObj" :label="item.name" :value="item.value" :key="item.value">
                                    </el-option>
                                </el-select>
                            </span>
                        </RedStar>
                        <RedStar label="支付方式：">
                            <span class="right-con">
                                <el-select clearable multiple class="filter-item" v-model="filter.coalUnion.payMethod" placeholder="请选择" style="width:250px;">
                                    <el-option v-for="item in dictionary.payMethod" :label="item.name" :value="item.value" :key="item.value">
                                    </el-option>
                                </el-select>
                            </span>
                        </RedStar>
                    </el-col>
                    <el-col :span="12" class="segment-brline">
                        <RedStar label="所属行业：" :required="true">
                            <span class="right-con">
                                <el-select clearable class="filter-item" v-model="filter.coalUnion.custTrades" placeholder="请选择" style="width:250px;">
                                    <el-option v-for="item in dictionary.custTrades" :label="item.name" :value="item.value" :key="item.value">
                                    </el-option>
                                </el-select>
                            </span>
                        </RedStar>
                        <RedStar label="业务类型：">
                            <span class="right-con">
                                <el-select clearable class="filter-item" v-model="filter.coalUnion.custBusinessType" placeholder="请选择" style="width:250px;">
                                    <el-option v-for="item in dictionary.custBusinessType" :label="item.name" :value="item.value" :key="item.value">
                                    </el-option>
                                </el-select>
                            </span>
                        </RedStar>
                        <RedStar label="运力组织方式：">
                            <span class="right-con">
                                <el-select clearable class="filter-item" v-model="filter.coalUnion.custPowerMode" placeholder="请选择" style="width:250px;">
                                    <el-option v-for="item in dictionary.custPowerMode" :label="item.name" :value="item.value" :key="item.value">
                                    </el-option>
                                </el-select>
                            </span>
                        </RedStar>
                        <RedStar label="收货方式：">
                            <span class="right-con">
                                <el-select clearable class="filter-item" v-model="filter.coalUnion.custReceiveMode" placeholder="请选择" style="width:250px;">
                                    <el-option v-for="item in dictionary.custReceiveMode" :label="item.name" :value="item.value" :key="item.value">
                                    </el-option>
                                </el-select>
                            </span>
                        </RedStar>
                        <RedStar label="结算周期（天）：">
                            <span class="right-con">
                                <el-input type="number" placeholder="请输入" style="width:250px;" :maxlength="12" v-model="filter.coalUnion.custBalanceCycle"></el-input>
                            </span>
                        </RedStar>
                        
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="segment statistics" v-show="filter.baseCustInfo.custType == '2'">
            <div class="segment-header">
                贸易结构
            </div>
            <div class="segment-area">
                <div class="textStyle-title">上游：</div>
                <sjbtextarea type="textarea" :rows="4" placeholder="请输入企业名称、线路、地址、据点说明信息" v-model.trim="filter.coalUnion.upstream" :max="200"></sjbtextarea>
            </div>
            <div class="segment-area" style="margin-bottom:15px">
                <div class="textStyle-title">下游：</div>
                <sjbtextarea type="textarea" :rows="4" placeholder="请输入企业名称、线路、地址、据点说明信息" v-model.trim="filter.coalUnion.downstream" :max="200"></sjbtextarea>
            </div>
        </div>
        <div class="segment statistics" v-show="filter.baseCustInfo.custType == '2'">
            <div class="segment-header" style="margin-bottom: 20px;">
                <span class="left-red">*</span>
                联系人信息
            </div>
            <div class="segment-area">

                <div class="el-table__body-wrapper">
                    <table id="expenseDetails" class="table table-striped table-bordered table-condensed" style="margin-bottom: 20px;">
                        <thead>
                            <tr class="tableTitle">
                                <td style="text-align: center;width: 20px;padding: 0 10px 0 10px;">
                                    <el-checkbox @change="coalUnionSelectAll"></el-checkbox>
                                </td>
                                <td class="tableTitle" style="width:300px">联系人</td>
                                <td class="tableTitle" style="width:300px">联系方式</td>
                                <td class="tableTitle" style="width:300px">邮箱(选填)</td>
                                <td class="tableTitle" style="width:300px">职位</td>
                                <td class="tableTitle" style="width:500px">备注(选填)</td>
                                <td class="tableTitle" style="width:300px">合同联系人</td>

                            </tr>
                        </thead>
                        <tbody>
                            <tr  v-for="(item,index) in coalUnionCustLinkman" :key="index">
                                <td style="padding: 3px 10px 0 10px;">
                                    <el-checkbox v-model="item.checked"></el-checkbox>
                                </td>
                                <td style="padding: 5px 10px;">
                                    <el-input auto-complete="off" v-model.trim="item.linkmanName" :maxlength="50"></el-input>
                                </td>
                                <td style="padding: 0 10px 0 10px;">
                                    <el-input auto-complete="off" v-model.trim="item.linkmanPhone" :maxlength="50"></el-input>
                                </td>
                                <td style="padding: 0 10px 0 10px;">
                                    <el-input auto-complete="off" v-model.trim="item.linkmanMail" :maxlength="50"></el-input>
                                </td>
                                <td style="padding: 0 10px 0 10px;">
                                    <el-input auto-complete="off" v-model.trim="item.linkmanPost" :maxlength="50"></el-input>
                                </td>
                                <td style="padding: 0 10px 0 10px;">
                                    <el-input auto-complete="off" v-model.trim="item.remarks" :maxlength="200"></el-input>
                                </td>
                                <td style="padding: 0 10px 0 10px;">
                                <el-checkbox v-model="item.isContractLinkman" @change="coalUnionSetLinkman(index)" :true-label="'1'" :false-label="'0'">设为默认的合同联系人</el-checkbox>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="segment-foot">
                <el-button type="primary" size="small" @click="coalUnionAdd">新增</el-button>
                <el-button type="danger" size="small" @click="coalUnionDel">删除</el-button>
            </div>
        </div>
        <div class="segment statistics">
            <div class="sjb-foot-button">
                <el-button type="primary" size="small" @click="openConfirm('apply')">提交</el-button>
                <el-button v-if="$route.query.key&&custListPlace == 4" type="danger" size="small" @click="openConfirm('open')">开放客户</el-button>
                <el-button size="small" @click="backStep">返回</el-button>
            </div>
        </div>
        <el-dialog title="确认" width="25%" :visible.sync="confirmDialog">
            <span>确定提交？</span>
            <div slot="footer" class="dialog-footer">
                <el-button @click="confirmDialog = false">取消</el-button>
                <el-button type="primary" @click="saveCustForm">确认</el-button>
            </div>
        </el-dialog>
        <el-dialog title="开放客户" width="25%" :visible.sync="openDialog">
            <span>开放客户后，将无法再捡回该客户，是否开放客户？</span>
            <div slot="footer" class="dialog-footer">
                <el-button @click="openDialog = false">取消</el-button>
                <el-button type="primary" @click="openCust">确认</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import common from "@/utils/common";
import { fetchForm, saveCust, modifyCust, custChange, verifyCust} from "@/api/customer";
import { mapState } from "vuex";
import RedStar from '@/components/RedStar/RedStar.vue';
import sjbtextarea from '@/components/sjbTextarea';
import { custBaseVali,custNoCarVali,custCoalUnionVali,linkManVali } from './cust.util';
import { parseTime } from "@/utils";

export default {
    components:{
        RedStar,
        sjbtextarea
    },
    data() {
        return {
            radioKey:"",
            openDialog:false,
            ready: false,
            leaderName: "",
            leaderPhone: null,
            confirmDialog: false,
            routeKey: this.$route.query.key,
            routeCustType:this.$route.query.custType,
            filter: {
                baseCustInfo: {
                    custType:"",
                    id:this.$route.query.key,
                    custCode: "",
                    custName: "",
                    custAbbreviation: "",
                    custAddressCode: [],
                    custAddress: "",
                    creditCode: "",
                    legalRepresentative: "",
                    registeredAddress: ""
                },
                noCar: {
                    noCarId:"",
                    custTrades: "",
                    custBusinessType: "",
                    custCompanySize: "",
                    custPowerMode: "",
                    custDeliverMode: "",
                    custReceiveMode: "",
                    custBalanceObj: "",
                    custBalanceCycle: "",
                    payMethod: [],
                    dispatchProportion: "",
                    upstream: "",
                    downstream: "",
                    custLinkman: []
                },
                coalUnion: {
                    coalUnionId:"",
                    custSort: [],
                    custTrades: "",
                    custCompanySize: "",
                    custPowerMode: "",
                    custDeliverMode: "",
                    custReceiveMode: "",
                    custBalanceObj: "",
                    custBalanceCycle: "",
                    payMethod: [],
                    serviceFee: "",
                    upstream: "",
                    downstream: "",
                    custLinkman: []
                },
            },
            noCarCustLinkman: [
                {
                linkmanName: '', //联系人姓名
                linkmanPhone: '', //联系人电话
                linkmanPost: '', //联系人职位
                remarks: '', //备注
                isContractLinkman: '0', //合同联系人：0否，1是
                linkmanMail: '', //邮箱
                checked:false,
                id:""
                }
            ],
            coalUnionCustLinkman: [
                {
                linkmanName: '', //联系人姓名
                linkmanPhone: '', //联系人电话
                linkmanPost: '', //联系人职位
                remarks: '', //备注
                isContractLinkman: '0', //合同联系人：0否，1是
                linkmanMail: '', //邮箱
                checked:false,
                id:""
                }
            ],
            dictionary: {
                //字典
                custTrades: [], //所属行业
                custDeliverMode: [], //发货方式
                custBalanceObj: [],
                payMethod: [], //支付方式
                custBusinessType: [], //业务类型
                custPowerMode: [], //运力组织方式
                custReceiveMode: [], //收货方式
                custType: [],
                custSort: []
            },
            opendialog: false,
            officeName:""
        };
    },
    computed:{
        ...mapState({
            custListPlace:state => state.cust.custListPlace,
        }),
    },
    methods: {
        openConfirm(type) {
            var _this = this;
            if (!custBaseVali(this)) return; //校验
            if(this.filter.baseCustInfo.custType == "1"){//无车
                if (!custNoCarVali(this)) return; 
                if (!linkManVali(this.noCarCustLinkman,this)) return; 
            } else {//煤链社
                if (!custCoalUnionVali(this)) return;
                if (!linkManVali(this.coalUnionCustLinkman,this)) return;
            }
            this.filter.noCar.custLinkman = this.noCarCustLinkman;
            this.filter.coalUnion.custLinkman = this.coalUnionCustLinkman;
            console.log(this.filter)
            verifyCust({
                custType:this.filter.baseCustInfo.custType,
                custName:this.filter.baseCustInfo.custName,
                custId:this.routeKey || '0',
            }).then(res=>{
                if(res.code == 200){
                    var flag = false;
                    if(res.data.exist == 0){
                        var title = '客户已存在，是否更新基本信息?'
                        flag = true
                    } else if(res.data.exist == 1){
                        var title = '是否保存?'
                        flag = true
                    }else if(res.data.exist == 2){
                        var title = '客户已存在，不可重复新增客户'
                    }
                    this.$confirm(title, {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    }).then(() => {
                        if(type =="apply"){
                            if (flag) _this.saveCustForm()
                        }
                        if(type =="open"){
                            if (flag) _this.openCustDia()
                        }
                    }).catch(() => {      
                });

                }
            });
            
        },
        openCustDia(){
            this.$confirm("开放客户后，将无法再捡回该客户，是否开放客户？", {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                }).then(() => {
                    this.openCust()
                }).catch(() => {        
            });
        },
        openCust(){
            if (this.$route.query.key) {
                modifyCust(this.filter).then(res=>{
                    if(res.code == 200){
                        return new Promise((resolve, reject)=>{
                            custChange({
                                isChange:1,
                                id:this.$route.query.key,
                                custType:this.filter.baseCustInfo.custType,
                            }).then(res=>{
                                if(res.code == 200){
                                    this.$message({
                                        message: res.message,
                                        type: "success"
                                    });
                                    this.$router.push({
                                        path: "/inforManage/customerList"
                                    });
                                    this.openDialog = false
                                }
                            })
                            resolve()
                        })
                    }
                });
            } else {
                saveCust(this.filter).then(res=>{
                    if(res.code == 200){
                        return new Promise((resolve, reject)=>{
                            custChange({
                                isChange:1,
                                id:this.$route.query.key,
                                custType:this.filter.baseCustInfo.custType,
                            }).then(res=>{
                                if(res.code == 200){
                                    this.$message({
                                        message: res.message,
                                        type: "success"
                                    });
                                    this.$router.push({
                                        path: "/inforManage/customerList"
                                    });
                                    this.openDialog = false
                                }
                            })
                            resolve()
                        })
                    }
                });
            }
            
        },
        saveCustForm() {
            if (this.$route.query.key) {
                modifyCust(this.filter).then(res => {
                    this.confirmDialog = false;
                    if(res.status ==0){
                        this.$message({
                            message: res.message,
                            type: "success"
                        });
                        this.$router.push({
                            path: "/inforManage/customerList"
                        });
                    } else {
                        this.$message({
                            message: res.message,
                            type: "error"
                        });
                    }
                });
            } else {
                saveCust(this.filter).then(res => {
                    this.confirmDialog = false;
                    if(res.status ==0){
                        this.$message({
                            message: res.message,
                            type: "success"
                        });
                        this.$router.push({
                            path: "/inforManage/customerList"
                        });
                    } else {
                        this.$message({
                            message: res.message,
                            type: "error"
                        });
                    }
                });
            }
            
        },
        backStep() {
            this.$router.push({
                path: "/inforManage/customerList"
            });
        },
        selectAreaCode(data) {
            this.filter.baseCustInfo.custAddressCode = data;
        },
        noCarSelectAll(val) {
            if (val) {
                this.noCarCustLinkman.forEach((element) => {
                    element.checked = true;
                });
            } else {
                this.noCarCustLinkman.forEach((element) => {
                    element.checked = false;
                });
            }
        },
        noCarAdd() {
            this.noCarCustLinkman.push({
                linkmanName: '', //联系人姓名
                linkmanPhone: '', //联系人电话
                linkmanPost: '', //联系人职位
                remarks: '', //备注
                isContractLinkman: '0', //合同联系人：0否，1是
                linkmanMail: '', //邮箱
                id:"",
                checked:false
            });
        },
        noCarDel() {
            let newItemList = this.noCarCustLinkman.filter((i) => {
                if (!i.checked) {
                    return true;
                }
            });
            this.noCarCustLinkman = newItemList;
        },
        noCarSetLinkman(index) {
            if (this.noCarCustLinkman[index].isContractLinkman == '1') {
                for (let i in this.noCarCustLinkman) {
                    if (index != i) {
                        this.noCarCustLinkman[i].isContractLinkman = '0';
                    }
                }
            }
        },
        coalUnionSelectAll(val) {
            if (val) {
                this.coalUnionCustLinkman.forEach((element) => {
                    element.checked = true;
                });
            } else {
                this.coalUnionCustLinkman.forEach((element) => {
                    element.checked = false;
                });
            }
        },
        coalUnionAdd() {
            this.coalUnionCustLinkman.push({
                linkmanName: '', //联系人姓名
                linkmanPhone: '', //联系人电话
                linkmanPost: '', //联系人职位
                remarks: '', //备注
                isContractLinkman: '0', //合同联系人：0否，1是
                linkmanMail: '', //邮箱
                id:"",
                checked:false
            });
        },
        coalUnionDel() {
            let newItemList = this.coalUnionCustLinkman.filter((i) => {
                if (!i.checked) {
                    return true;
                }
            });
            this.coalUnionCustLinkman = newItemList;
        },
        coalUnionSetLinkman(index) {
            if (this.coalUnionCustLinkman[index].isContractLinkman == '1') {
                for (let i in this.coalUnionCustLinkman) {
                    if (index != i) {
                        this.coalUnionCustLinkman[i].isContractLinkman = '0';
                    }
                }
            }
        },
    },
    created() {
        var _this = this;
        // this.add();
        if (this.$route.query.key) {
            fetchForm(this.$route.query.key).then(response => {
                var data = response.data;
                this.filter = data;
                this.noCarCustLinkman = [];
                if(data.noCar.custLinkman.length!= 0){
                    data.noCar.custLinkman.forEach((item,index)=>{
                        this.noCarCustLinkman.push({
                            checked: false,
                            ...item
                        })
                    })
                } else {
                    this.noCarAdd()
                }
                this.coalUnionCustLinkman = [];
                if(data.coalUnion.custLinkman.length!= 0){
                    data.coalUnion.custLinkman.forEach((item,index)=>{
                        this.coalUnionCustLinkman.push({
                            checked: false,
                            ...item
                        })
                    })
                }else{
                    this.coalUnionAdd()
                }
                this.filter.baseCustInfo.custType = this.$route.query.custType;
                this.ready = true;
            });
        } else {
            this.leaderName = JSON.parse(
                localStorage.getItem("web_oa_userInfor")
            ).name;
            this.filter.marketLeaderPhone = JSON.parse(
                localStorage.getItem("web_oa_userInfor")
            ).mobile;
            this.ready = true;
        }
        this.officeName = JSON.parse(
            localStorage.getItem("web_oa_userInfor")
        ).officeName;
    },
    mounted() {
        //下拉列表数据转换
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
        this.dictionary.custTrades = selectDic(dicList, "cust_trades"); //所属行业
        this.dictionary.custDeliverMode = selectDic( dicList, "cust_deliver_mode"); //发货方式
        this.dictionary.custBalanceObj = selectDic(dicList, "cust_balance_obj"); //发货方式
        this.dictionary.payMethod = selectDic(dicList, "pay_method"); //发货方式
        this.dictionary.custBusinessType = selectDic( dicList,"cust_business_type"); //发货方式
        this.dictionary.custPowerMode = selectDic(dicList, "cust_power_mode"); //运力组织方式
        this.dictionary.custReceiveMode = selectDic(dicList, "cust_receive_mode"); //手货方式
        this.dictionary.custSort = selectDic(dicList, "cust_sort");
        this.dictionary.custType = selectDic(dicList, "cust_type");

        //联系人列表兼容
    }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
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
.item-value {
    display: inline-block;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background: white;
    padding-left: 7px;
    line-height: 30px;
    width: 250px;
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

.upload-container {
    margin: 50px;
}
.editor-slide-upload {
    margin-bottom: 15px;
}
.segment-area {
    .textStyle-title {
        // line-height: 20px;
        padding: 12px 0px;
        font-size: 14px;
    }
}
</style>
<style>
.area .el-cascader {
    width: 250px !important;
}
</style>
