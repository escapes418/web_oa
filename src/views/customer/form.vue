<template>
    <div class="sjb-form-wrapper" v-if="ready">
        <div class="segment statistics">
            <div class="segment-header">
                基本信息
            </div>
            <div class="segment-area">
                <el-row>
                    <el-col :span="12" class="segment-brline">
                        <RedStar label="客户名称：" :required="true">
                            <span class="right-con">
                                <el-input placeholder="请输入" style="width:250px;" v-model.trim="filter.custName" :maxlength="30"></el-input>
                            </span>
                        </RedStar>
                        <RedStar label="地址：" :required="true">
                            <span class="right-con">
                                <region class="area" style="float:left;" v-on:back-region="selectAreaCode" :pointList="filter.custAddressCode"></region>
                            </span>
                        </RedStar>
                        <RedStar label="客户来源：">
                            <span class="right-con">
                                <el-input placeholder="请输入" style="width:250px;" v-model.trim="filter.custSource" :maxlength="200"></el-input>
                            </span>
                        </RedStar>
                        <RedStar label="所属区域：">
                            <span class="right-con long_area">
                                {{officeName}}
                            </span>
                        </RedStar>
                        
                    </el-col>
                    <el-col :span="12" class="segment-brline">
                        <RedStar label="客户简称：">
                            <span class="right-con">
                                <el-input placeholder="请输入" style="width:250px;" v-model.trim="filter.custAbbreviation" :maxlength="50"></el-input>
                            </span>
                        </RedStar>
                        <RedStar label="详细地址：" :required="true">
                             <span class="right-con">
                                <el-input placeholder="请输入详细地址" style="width:250px;" v-model.trim="filter.custAddress" :maxlength="100"></el-input>
                            </span>
                        </RedStar>
                        <RedStar label="市场负责人：">
                            <span class="right-con">{{leaderName}}</span>
                        </RedStar>
                        <RedStar label="市场负责人手机号：">
                            <span class="right-con">{{filter.marketLeaderPhone}}</span>
                        </RedStar>
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
                        <RedStar label="所属行业：" :required="true">
                            <span class="right-con">
                                <el-select clearable class="filter-item" v-model="businessDetail.custTrades" placeholder="请选择" style="width:250px;">
                                    <el-option v-for="item in dictionary.custTrades" :label="item.name" :value="item.value" :key="item.value">
                                    </el-option>
                                </el-select>
                            </span>
                        </RedStar>
                        <RedStar label="规模（万元/月）：">
                            <span class="right-con">
                                <el-input type="number" placeholder="请输入" style="width:250px;" v-model.number="businessDetail.custCompanySize"></el-input>
                            </span>
                        </RedStar>
                        <RedStar label="发货方式：">
                            <span class="right-con">
                                <el-select clearable class="filter-item" v-model="businessDetail.custDeliverMode" placeholder="请选择" style="width:250px;">
                                    <el-option v-for="item in dictionary.custDeliverMode" :label="item.name" :value="item.value" :key="item.value">
                                    </el-option>
                                </el-select>
                            </span>
                        </RedStar>
                        <RedStar label="结算对象：">
                            <span class="right-con">
                                <el-select clearable class="filter-item" v-model="businessDetail.custBalanceObj" placeholder="请选择" style="width:250px;">
                                    <el-option v-for="item in dictionary.custBalanceObj" :label="item.name" :value="item.value" :key="item.value">
                                    </el-option>
                                </el-select>
                            </span>
                        </RedStar>
                        <RedStar label="支付方式：">
                            <span class="right-con">
                                <el-select clearable multiple class="filter-item" v-model="businessDetail.payMethod" placeholder="请选择" style="width:250px;">
                                    <el-option v-for="item in dictionary.payMethod" :label="item.name" :value="item.value" :key="item.value">
                                    </el-option>
                                </el-select>
                            </span>
                        </RedStar>
                    </el-col>
                    <el-col :span="12" class="segment-brline">
                        <RedStar label="业务类型：">
                            <span class="right-con">
                                <el-select clearable class="filter-item" v-model="businessDetail.custBusinessType" placeholder="请选择" style="width:250px;">
                                    <el-option v-for="item in dictionary.custBusinessType" :label="item.name" :value="item.value" :key="item.value">
                                    </el-option>
                                </el-select>
                            </span>
                        </RedStar>
                        <RedStar label="运力组织方式：">
                            <span class="right-con">
                                <el-select clearable class="filter-item" v-model="businessDetail.custPowerMode" placeholder="请选择" style="width:250px;">
                                    <el-option v-for="item in dictionary.custPowerMode" :label="item.name" :value="item.value" :key="item.value">
                                    </el-option>
                                </el-select>
                            </span>
                        </RedStar>
                        <RedStar label="收货方式：">
                            <span class="right-con">
                                <el-select clearable class="filter-item" v-model="businessDetail.custReceiveMode" placeholder="请选择" style="width:250px;">
                                    <el-option v-for="item in dictionary.custReceiveMode" :label="item.name" :value="item.value" :key="item.value">
                                    </el-option>
                                </el-select>
                            </span>
                        </RedStar>
                        <RedStar label="结算周期（天）：">
                            <span class="right-con">
                                <el-input type="number" placeholder="请输入" style="width:250px;" v-model="businessDetail.custBalanceCycle"></el-input>
                            </span>
                        </RedStar>
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
                        <RedStar label="统一社会信用代码：">
                            <span class="right-con">
                                <el-input placeholder="请输入" style="width:250px;" v-model.trim="contractInfoSaveReq.creditCode" :maxlength="50"></el-input>
                            </span>
                        </RedStar>
                        <RedStar label="法定代表人：">
                            <span class="right-con">
                                <el-input placeholder="请输入" style="width:250px;" v-model.trim="contractInfoSaveReq.legalRepresentative" :maxlength="50"></el-input>
                            </span>
                        </RedStar>
                    </el-col>
                    <el-col :span="12" class="segment-brline">
                        <RedStar label="调度费比例（%）：">
                            <span class="right-con">
                                <el-input placeholder="请输入" style="width:250px;" type="number" :maxlength="50" v-model.trim="contractInfoSaveReq.dispatchProportion"></el-input>
                            </span>
                        </RedStar>
                        <RedStar label="注册地址：">
                            <span class="right-con">
                                <el-input placeholder="请输入" style="width:250px;" :maxlength="50" v-model.trim="contractInfoSaveReq.registeredAddress"></el-input>
                            </span>
                        </RedStar>
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
                <sjbtextarea type="textarea" :rows="4" placeholder="请输入企业名称、线路、地址、据点说明信息" v-model.trim="tradeStructure.upstream" :max="200"></sjbtextarea>
            </div>
            <div class="segment-area" style="margin-bottom:15px">
                <div class="textStyle-title">下游：</div>
                <sjbtextarea type="textarea" :rows="4" placeholder="请输入企业名称、线路、地址、据点说明信息" v-model.trim="tradeStructure.downstream" :max="200"></sjbtextarea>
            </div>
        </div>
        <div class="segment statistics">
            <div class="segment-header">
                <span class="left-red">*</span>
                联系人信息
            </div>
            <div class="segment-area">
                <div class="el-table__body-wrapper" style="padding: 15px 0;">
                    <el-table ref="multipleTable" border :data="itemList" tooltip-effect="dark" style="width:100%" @selection-change="handleSelectionChange">
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
                        <el-table-column align="center" label="邮箱（选填）" width="180px">
                            <template slot-scope="scope">
                                <el-input auto-complete="off" v-model.trim="scope.row.linkmanMail" :maxlength="50"></el-input>
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
                        <el-table-column align="center" label="合同联系人" >
                            <template slot-scope="scope">
                                <el-radio v-model="radioKey" :label="scope.row.index" @change="setContact(scope.row)">设为默认的合同联系人</el-radio>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="segment-foot">
                <el-button type="primary" size="small" @click="add">新增</el-button>
                <el-button type="danger" size="small" @click="del">删除</el-button>
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
import { fetchForm, saveCust , custChange} from "@/api/customer";
import { mapState } from "vuex";
import RedStar from '@/components/RedStar/RedStar.vue';
import sjbtextarea from '@/components/sjbTextarea';
import { parseTime } from "@/utils";

export default {
    components:{
        RedStar,
        sjbtextarea
    },
    data() {
        const validatePass = (rule, value, callback) => {
            if (value.length < 5) {
                callback(new Error("密码不能小于5位"));
            } else {
                callback();
            }
        };
        return {
            radioKey:"",
            openDialog:false,
            ready: false,
            leaderName: "",
            leaderPhone: null,
            confirmDialog: false,
            filter: {
                //筛选条件
                custName: "",
                remarks: "",
                custAbbreviation: "", //简称
                areaId: "", //所属区域
                custAddress: "", //注册地址
                custAddressCode: [], //注册地址编号
                marketLeaderPhone: "", //市场负责人手机号
                oldCustName: "",
                custSource:""
            },
            businessDetail: {
                custTrades: "", // 所属行业
                custCompanySize: "", //规模（万吨/月）
                custDeliverMode: "", //发货方式
                custBalanceObj: "", //结算对象
                payMethod: [], //支付方式
                custPowerMode: "", //运力组织方式
                custReceiveMode: "", //收货方式
                custBalanceCycle: "", //结算周期
                custBusinessType: "" //业务类型
            },
            contractInfoSaveReq:{
                creditCode:"", //统一社会信用代码 ,
                dispatchProportion:"5.7", //调度费比例 ,
                legalRepresentative:"", //法定代表人 ,
                oldCreditCode:"",
                registeredAddress:"",//注册地址
            },
            tradeStructure: {
                //贸易结构
                upstream: "",
                downstream: ""
            },
            itemList: [],
            dictionary: {
                //字典
                custTrades: [], //所属行业
                custDeliverMode: [], //发货方式
                custBalanceObj: [],
                payMethod: [], //支付方式
                custBusinessType: [], //业务类型
                custPowerMode: [], //运力组织方式
                custReceiveMode: [] //收货方式
            },
            dialogIndex: "",
            opendialog: false,
            custStatus: undefined, //报备状态 0为提交(表单未填写完整)，1报备提交(表单填写完整)
            multipleSelection:[],
            officeName:""
        };
    },
    computed:{
        ...mapState({
            custListPlace:state => state.cust.custListPlace,
        }),
    },
    methods: {
        setContact(row){
            this.radioKey = row.index
        },
        // openDialog(index) {
        //     // console.log(index)
        //     this.opendialog = true;
        //     this.dialogIndex = index;
        // },
        openConfirm(type) {
            var _this = this;
            if (!this.filter.custName || this.filter.custName == "") {
                //客户名称为必填
                this.$message({
                    message: "请填写客户名称",
                    type: "warning"
                });
                return;
            }
            if (!this.filter.custAddressCode || this.filter.custAddressCode == "") {
                //客户名称为必填
                this.$message({
                    message: "请选择地址",
                    type: "warning"
                });
                return;
            }
            if(!this.filter.custAddress){
                this.$message({
                    message: "请填写详细地址",
                    type: "warning"
                });
                return;
            }
            if (!this.businessDetail.custTrades) {
                this.$message({
                    message: "请填写所属行业！",
                    type: "warning"
                });
                return
            }
            if(this.itemList.length < 1){
                this.$message({
                    message: "请添加合同联系人",
                    type: "warning"
                });
                return;
            }
            var validSpace  = /^[\s]*$/; 
            if (validSpace.test(this.filter.custName)) {
                //客户名称为必填
                this.$message({
                    message: "客户名称不能为空",
                    type: "warning"
                });
                return;
            }
            let flag = true;
            this.itemList.forEach(item=>{
                if(!item.linkmanName){
                    this.$message({
                        message: "联系人名称不能为空",
                        type: "warning"
                    });
                    flag = false;
                }
                else if(!item.linkmanPhone || !/^1[3456789][0-9]{9}$/.test(item.linkmanPhone)){
                    this.$message({
                        message: "请正确填写联系人联系方式",
                        type: "warning"
                    });
                    flag = false
                }
                else if(!item.linkmanPost){
                    this.$message({
                        message: "联系人职位不能为空",
                        type: "warning"
                    });
                    flag = false
                }
                
            })
            if(flag&&type =="apply"){
                this.confirmDialog = true;
            }
            if(flag&&type =="open"){
                this.openDialog = true;
            }
        },
        openCust(){
            if (this.$route.query.key) {
                this.filter = {
                    ...this.filter,
                    id: this.$route.query.key
                };
            }
            this.itemList.forEach(item=>{
                if(this.radioKey === item.index){
                    item.isContractLinkman = 1
                }else{
                    item.isContractLinkman = 0
                }
            })
            saveCust({
                ...this.filter,
                ...this.businessDetail,
                contractInfoSaveReq:this.contractInfoSaveReq,
                custTradeStructureReq: this.tradeStructure,
                custLinkman: this.itemList,
                custStatus: this.custStatus
            }).then(res=>{
                if(res.status == 0){
                    return new Promise((resolve, reject)=>{
                        custChange({
                            isChange:1,
                            id:this.$route.query.key
                        }).then(res=>{
                            if(res.status == 0){
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
        },
        saveCustForm() {
            if (this.$route.query.key) {
                this.filter = {
                    ...this.filter,
                    id: this.$route.query.key
                };
            }
            this.itemList.forEach(item=>{
                if(this.radioKey === item.index){
                    item.isContractLinkman = 1
                }else{
                    item.isContractLinkman = 0
                }
            })
            saveCust({
                ...this.filter,
                ...this.businessDetail,
                contractInfoSaveReq:this.contractInfoSaveReq,
                custTradeStructureReq: this.tradeStructure,
                custLinkman: this.itemList,
                custStatus: this.custStatus
            }).then(res => {
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
        },
        backStep() {
            this.$router.push({
                path: "/inforManage/customerList"
            });
        },
        selectAreaCode(data) {
            this.filter.custAddressCode = data;
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        add() {
            this.itemList.push({ index: new Date().getTime()});
        },
        del(){
            var _this = this
            var newindex = [];
            var newBox = [];
            _this.multipleSelection.forEach((value,idx)=>{
                newindex.push(value.index)
            })
            var arrBox = JSON.parse(JSON.stringify(this.itemList||[]))
            arrBox.forEach((val,num)=>{
                if(newindex.indexOf(val.index) == -1){
                    newBox.push(arrBox[num])
                }
            })
            this.itemList = newBox
        },
    },
    created() {
        var _this = this;
        this.add();
        if (this.$route.query.key) {
            fetchForm({
                id: this.$route.query.key
            }).then(response => {
                var data = response.data;
                this.filter.custName = data.custName;
                this.filter.remarks = data.remarks;
                this.filter.custSource = data.custSource
                this.filter.custAbbreviation = data.custAbbreviation;
                this.filter.oldCustName = data.custName;
                this.filter.custAddress = data.custAddress;
                this.filter.custAddressCode = data.custAddressCode;

            
                this.filter.marketLeaderPhone = data.marketLeaderPhone;
                this.leaderName = data.marketLeaderName;

                this.businessDetail.custTrades = data.custTrades;
                this.businessDetail.custCompanySize = Number(data.custCompanySize);
                this.businessDetail.custDeliverMode = data.custDeliverMode;
                this.businessDetail.custBalanceObj = data.custBalanceObj;
                this.businessDetail.payMethod = data.payMethod || [];
                this.businessDetail.custPowerMode = data.custPowerMode;
                this.businessDetail.custReceiveMode = data.custReceiveMode;
                this.businessDetail.custBalanceCycle = data.custBalanceCycle;
                this.businessDetail.custBusinessType = data.custBusinessType;

                this.tradeStructure.upstream = data.custTradeStructureResponse.upstream;
                this.tradeStructure.downstream = data.custTradeStructureResponse.downstream;

                this.itemList = data.custLinkmanResponse || [];

                this.contractInfoSaveReq = data.contractInfoDetailResponse || {}
                this.contractInfoSaveReq.oldCreditCode = data.contractInfoDetailResponse.creditCode
                this.itemList.forEach((item, idx) => {
                    _this.itemList[idx] = {
                        ..._this.itemList[idx],
                        index: idx
                    };
                    if(item.isContractLinkman == 1){
                        this.radioKey = idx
                    }
                });
                this.leaderPhone = response.data.leaderPhone;
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
