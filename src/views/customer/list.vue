<template>
    <div class="sjb-container calendar-list-container ">
        <div class="filter-container">
            <div class="toolbar-item">
                <span class="item-label">查冲突：</span>
                <el-input @keyup.enter.native="handleFilter" style="width: 220px;" class="filter-item" placeholder="请输入客户名/统一社会信用代码" v-model.trim="listQuery.conflictName">
                </el-input>
            </div>
            
            <div class="toolbar-item">
                <span class="item-label">市场负责人：</span>
                <div class="item-value" @click="dialogMarketVisible = !dialogMarketVisible">
                    <i class="el-icon-search" style="color:#bfbfbf"></i>
                    <span style="color:#606266">{{marketLeader}}</span>
                </div>
            </div>
            <div class="toolbar-item">
                <span class="item-label">行业：</span>
                <el-select clearable style="width: 130px" class="filter-item" v-model="listQuery.custTrades" placeholder="请选择">
                    <el-option v-for="item in custTradesList" :key="item.value" :label="item.name" :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="toolbar-item">
                <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
                <el-button class="filter-item" type="warning" v-waves icon="el-icon-refresh" @click="restListQuery(restCallback)">重置</el-button>
                <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">新建客户</el-button>
            </div>
            <div class="toolmore-control">
                <el-button icon="el-icon-arrow-up" v-if="toolexpand" class="toolmore-control-btn" @click="toolexpand = false">收起</el-button>
                <el-button icon="el-icon-arrow-down" v-else class="toolmore-control-btn" @click="toolexpand = true">展开</el-button>
            </div>
            <el-collapse-transition>
                <div v-show="toolexpand" style="margin-top:8px">
                    <div class="toolbar-item">
                        <span class="item-label">时间：</span>
                        <el-date-picker v-model="listQuery.timeRange" type="daterange" class="filter-item" style="width:287px" placeholder="选择日期范围" :picker-options="pickerOptions">
                        </el-date-picker>
                    </div>
                </div>
            </el-collapse-transition>
        </div>
        <template>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane :label="'个人客户（' + custCount.ownNum + '）'" name="4"></el-tab-pane>
                <el-tab-pane :label="'签约客户（' + custCount.signingNum + '）'" name="5"></el-tab-pane>
                <el-tab-pane :label="'公海客户（' + custCount.highSeasNum + '）'" name="1"></el-tab-pane>
                <el-tab-pane :label="'区域公海客户（' + custCount.regionSeasNum + '）'" name="2"></el-tab-pane>
                <el-tab-pane :label="'其他个人/区域客户（' + custCount.otherNum + '）'" name="3"></el-tab-pane>
            </el-tabs>
        </template>
        <template v-if="ISPERSON">
            <PersonTable :list="list"></PersonTable>
        </template>
        <template v-if="ISSEA">
            <SeaTable :list="list"></SeaTable>
        </template>
        <template v-if="ISOTHER">
            <OtherTable :list="list"></OtherTable>
        </template>
            

        <div class="pagination-container">
            <el-pagination background @current-change="handleCurrentChange" :current-page="pageNo" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
        <el-dialog title="选择市场负责人" :visible.sync="dialogMarketVisible" width="25%" :center="true" @close="dialogMarketVisible = false">
            <el-input placeholder="输入关键字进行过滤" v-model="filterMarket" style="margin-bottom:10px"></el-input>
            <el-tree :data="treeData" node-key="id" show-checkbox check-strictly :props="defaultProps" @check-change="handleMarketClick" :filter-node-method="marketNode" ref="marketTree"></el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogMarketVisible = false">取消</el-button>
                <el-button type="primary" @click="selectMarket">确认</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import common from "@/utils/common";
import { fetchList, fetchComInfoList,downLoadContract, custNum} from "@/api/customer";
import waves from "@/directive/waves"; // 水波纹指令
import { parseTime } from "@/utils";
import { getRegion } from "@/api/getRegion";
import OtherTable from '@/components/OtherTable'
import SeaTable from '@/components/SeaTable'
import PersonTable from '@/components/PersonTable'
import { mapState } from "vuex";
import { toJS, fromJS, Map, List } from 'immutable';
import listQueryMix from '../../mixins/listQuery.mix'

export default {
    name:'customerList',
    directives: {
        waves
    },
    components:{
        SeaTable,
        OtherTable,
        PersonTable
    },
    mixins: [listQueryMix],
    data() {
        return {
            activeName:"4",
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            },
            toolexpand: false,
            tableKey: 0,
            list: [],
            total: null,
            listLoading: true,
            pageNo: 1,
            pageSize: 20,

            dialogMarketVisible:false,
            defaultProps: {
                children: "children",
                label: "name"
            },
            marketLeader:'',
            treeData: [],
            filterMarket: "",
            marketData: [],
            
            listQuery: {
                timeRange: [],
                custName: "",
                conflictName:"",
                marketLeaderId: "",
                startTime: "",
                endTime: "",
            },
            downLoadId:"",
            contractCompanyCode:"",
            custTradesList: [],
            dialogFormVisible: false,

            custCount:{},
            custMaxList:[],//配置限制新增数量字典
        };
    },
    computed:{
        ...mapState({
            custListPlace:state => state.cust.custListPlace,
        }),
        ISSEA:function(){
            let result = this.custListPlace == 1 || this.custListPlace == 2 ? true : false
            return result
        },
        ISPERSON:function(){
            let result = this.custListPlace == 4 || this.custListPlace == 5 ? true : false
            return result
        },
        ISOTHER:function(){
            let result = this.custListPlace == 3 ? true : false
            return result
        }
    },
    watch: {
        filterMarket(val) {
            this.$refs.marketTree.filter(val);
        }
    },
    created() {
        this.$$queryStub = this.$$listQuery;
        this.activeName = this.custListPlace
        // this.getListData();
        // this.listLoading = false;
    },
    activated() {
        console.log(11111)
        this.getListData();
    },
    mounted() {
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
        this.custTradesList = selectDic(dicList, "cust_trades");
        this.custMaxList = selectDic(dicList, "cust_max_count");


        //人员树
        let memberList = JSON.parse(localStorage.getItem("web_oa_member"));
        var newArr = [];
        common.transToTree(memberList, newArr);
        common.mapAndAddChildren(newArr);
        this.treeData = newArr;
    },
    methods: {
        handleMarketClick(data,select,childSelect) {
            console.log(data,select)

            let index = this.marketData.indexOf(data)
            if(index<0&&this.marketData.length ===1&&select){

                // this.$message({
                //     message: "只能选择一个子节点作为市场负责人！",
                //     type: 'warning'
                // })
                this.$refs.marketTree.setChecked(this.marketData[0],false);
                this.marketData = []
                this.marketData.push(data)
            }else if(this.marketData.length ===0&&select){
                // if(data.type =='2'&&data.status == '1'){
                if(data.type =='2'){
                    this.marketData = [];
                    this.marketData.push(data)
                }else{
                    this.$message({
                        message: "该节点不可选！",
                        type: 'warning'
                    })
                    this.$refs.marketTree.setChecked(data,false);
                    return
                }
            }else if(index>=0&&this.marketData.length===1&&!select){
                this.marketData = []
            }
        },
        marketNode(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        selectMarket() {
            if(this.marketData.length){
                this.marketLeader = this.marketData[0].name;
                this.listQuery.marketLeaderId = this.marketData[0].id;
                this.dialogMarketVisible = false;
            }else{
                this.$message({
                    message: "请选择市场负责人",
                    type: "warning"
                });
                return;
            }
        },
        handleClick(val){
            this.$store.dispatch('changeCust', val.name);
            this.getListData()
            this.listLoading = false
        },
        restCallback() {
            // 用来补充默认rest不足的问题
            this.marketLeader = ''
        },
        getListData() {
            var _this = this;
            this.listLoading = true;
            var postData = this.reduceParams(this.$$queryStub);
            custNum({
                ...postData
            }).then(res=>{
                this.custCount = res.data
            })
            fetchList({
                ...postData,
                pageNo:this.pageNo,
                pageSize:this.pageSize,
                custListPlace:this.custListPlace
            }).then(response => {
                this.list = response.data.list;
                this.total = response.data.total;
                this.listLoading = false;
            });
        },
        reduceParams($$imData) {
            if (!$$imData || $$imData.size == 0) return {};
            const $$postData = $$imData
                .set('beginTime', common.rangeObjToTimestamp($$imData.get('timeRange').toJS()).applyTimeStart)
                .set('endTime', common.rangeObjToTimestamp($$imData.get('timeRange').toJS()).applyTimeEnd)
                .delete('timeRange')
            return $$postData.toJS();
        },
        handleFilter() {
            this.pageNo = 1;
            if(!this.listQuery.timeRange){
                this.listQuery.timeRange = []
            }
            this.$$queryStub = fromJS(this.listQuery);
            this.getListData();
            this.listLoading = false;
        },
        handleCurrentChange(val) {
            this.pageNo = val;
            this.getListData();
            this.listLoading = false;
        },
        handleCreate() {
            if(this.custCount.ownNum >this.custMaxList[0].name || this.custCount.ownNum == this.custMaxList[0].name){
                this.$message({
                    message: "个人客户数量不能超过" + this.custMaxList[0].name,
                    type: "warning"
                })
                return;
            }
            this.$router.push({ path: "/inforManage/customerForm" });
        },
        
    }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.toolbar-row {
    margin: 5px 0 0 0;
}
.item-value {
    display: inline-block;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background: white;
    padding-left: 7px;
    line-height: 30px;
    width: 200px;
}

.self-table-expand {
    font-size: 0;
}

.el-form--inline .el-form-item__content {
    font-size: 12px;
}
.el-form--inline .el-form-item__label {
    font-size: 12px;
    width: 90px;
    color: #99a9bf;
    float: none;
    display: inline-block;
}

.self-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}

.ignore-detail {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
    margin-top: -3px;
}
</style>

