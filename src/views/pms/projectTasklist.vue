<template>
    <div class="sjb-container calendar-list-container ">
        <div class="filter-container">
            <div class="toolbar-item">
                <span class="item-label">关键词：</span>
                <el-input @keyup.enter.native="handleFilter" style="width: 180px;" class="filter-item" placeholder="请输入任务名称/任务编号" v-model.trim="listQuery.keyword">
                </el-input>
            </div>
            <div class="toolbar-item">
                <span class="item-label">状态：</span>
                <el-select clearable style="width: 120px" class="filter-item" v-model="listQuery.isFinish" placeholder="请选择">
                    <el-option v-for="item in expStatuList" :key="item.value" :label="item.name" :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="toolbar-item">
                <span class="item-label">任务发起人：</span>
                <el-input @keyup.enter.native="handleFilter" style="width: 220px;" class="filter-item" placeholder="请输入姓名" v-model.trim="listQuery.taskCreateName">
                </el-input>
            </div>
            <div class="toolbar-item">
                <span class="item-label">任务责任人：</span>
                <el-input @keyup.enter.native="handleFilter" style="width: 220px;" class="filter-item" placeholder="请输入姓名" v-model.trim="listQuery.principalName">
                </el-input>
            </div>
            <div class="toolbar-item">
                <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
                <el-button class="filter-item" type="warning" v-waves icon="el-icon-delete" @click="restListQuery(restCallback)">重置</el-button>
                <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">新增任务</el-button>
            </div>
            <div class="toolmore-control">
                <el-button icon="el-icon-arrow-up" v-if="toolexpand" class="toolmore-control-btn" @click="toolexpand = false">收起</el-button>
                <el-button icon="el-icon-arrow-down" v-else class="toolmore-control-btn" @click="toolexpand = true">展开</el-button>
            </div>
            <el-collapse-transition>
                <div v-show="toolexpand">
                    <div class="toolbar-row">
                        <div class="toolbar-item">
                            <span class="item-label">开始日期：</span>
                            <el-date-picker v-model="listQuery.timeRangeStart" type="daterange" class="filter-item" style="width:287px" placeholder="选择日期范围"  :picker-options="pickerOptions">
                            </el-date-picker>
                        </div>
                        <div class="toolbar-item">
                            <span class="item-label">截止日期：</span>
                            <el-date-picker v-model="listQuery.timeRangeEnd" type="daterange" class="filter-item" style="width:287px" placeholder="选择日期范围"  :picker-options="pickerOptions">
                            </el-date-picker>
                        </div>
                        <div class="toolbar-item" v-if="activeName != 0">
                            <span class="item-label">完成日期：</span>
                            <el-date-picker v-model="listQuery.timeRangeFinish" type="daterange" class="filter-item" style="width:287px" placeholder="选择日期范围"  :picker-options="pickerOptions">
                            </el-date-picker>
                        </div>
                    </div>
                </div>
            </el-collapse-transition>
        </div>
        <template>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label='我的任务（进行中）' name="0"></el-tab-pane>
                <el-tab-pane label='我的任务（全部）' name="1"></el-tab-pane>
                <el-tab-pane label='我发起的' name="2"></el-tab-pane>
            </el-tabs>
        </template>
        <template v-if="activeName == 0">
            <ProcessingList :list="list" @on-upload="onUpload"></ProcessingList>
        </template>
        <template v-if="activeName == 1">
            <AllList :list="list" @on-upload="onUpload"></AllList>
        </template>
        <template v-if="activeName == 2">
            <InitiatedByMeList :list="list" @on-upload="onUpload"></InitiatedByMeList>
        </template>
        
            

        <div class="pagination-container">
            <el-pagination background @current-change="handleCurrentChange" :current-page="pageNum" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
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
import { getProjectTasklist, reqUpload} from "@/api/pms";
import { queryAssetList, queryAssetTypeTree,assetExport,assetImportModel,deleteAssetById } from '@/api/fixedAssets'
import waves from "@/directive/waves"; // 水波纹指令
import { parseTime } from "@/utils";
import { getRegion } from "@/api/getRegion";
import AllList from '@/components/ProjectTasklist/AllList.vue'
import InitiatedByMeList from '@/components/ProjectTasklist/InitiatedByMeList.vue'
import ProcessingList from '@/components/ProjectTasklist/ProcessingList.vue'
import { toJS, fromJS, Map, List } from 'immutable';
import listQueryMix from '../../mixins/listQuery.mix'

export default {
    name:'projectTasklist',
    directives: {
        waves
    },
    components:{
        AllList,
        InitiatedByMeList,
        ProcessingList
    },
    mixins: [listQueryMix],
    data() {
        return {
            activeName:"0",
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
            pageNum: 1,
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
                keyword:"",
                isFinish:"",
                taskCreateName:"",
                principalName:"",
                startTimeBegin:"",
                startTimeEnd:"",
                endTimeBegin:"",
                endTimeEnd:"",
                finishTimeBegin:"",
                finishTimeEnd:"",
                timeRangeStart: [],
                timeRangeEnd: [],
                timeRangeFinish: [],
                // custName: "",
                // conflictName:"",
                // marketLeaderId: "",
                // startTime: "",
                // endTime: "",
            },
            expStatuList:[],
            downLoadId:"",
            contractCompanyCode:"",
            custTradesList: [],
            dialogFormVisible: false,

            custCount:{},
            custMaxList:[],//配置限制新增数量字典
        };
    },
    computed:{
    },
    watch: {
        filterMarket(val) {
            this.$refs.marketTree.filter(val);
        }
    },
    created() {
        this.$$queryStub = this.$$listQuery;
        this.getListData();
    },
    activated() {
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
        this.expStatuList = selectDic(dicList,"pms_task_status")


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
                    // tem = tem.filter(i=>{
                    //     return i.status=="1"
                    // })
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
        handleMarketClick(data,select,childSelect) {
            let index = this.marketData.indexOf(data)
            if(index<0&&this.marketData.length ===1&&select){
                this.$refs.marketTree.setChecked(this.marketData[0],false);
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
            this.dialogMarketVisible = false;
            if(this.marketData.length){
                this.marketLeader = this.marketData[0].name;
                this.listQuery.marketLeaderId = this.marketData[0].id;
            }else{
                this.marketLeader = "";
                this.listQuery.marketLeaderId = "";
            }
        },
        handleClick(val){
            // this.$store.dispatch('changeCust', val.name);
            console.log(this.activeName);
            this.getListData()
            this.listLoading = false
        },
        restCallback() {
            // 用来补充默认rest不足的问题
            this.marketLeader = '';
            if(this.marketData[0]){
                this.$nextTick(_=>{
                    this.$refs.marketTree.setChecked(this.marketData[0],false);
                })
            } 
        },
        getListData() {
            var _this = this;
            this.listLoading = true;
            console.log(11111);
            var postData = this.reduceParams(this.$$queryStub);
            getProjectTasklist({
                ...postData,
                pageNum:this.pageNum,
                pageSize:this.pageSize,
                taskType:this.activeName
            }).then(response => {
                this.list = response.data.list;
                this.total = response.data.total;
                this.listLoading = false;
            });
        },
        reduceParams($$imData) {
            if (!$$imData || $$imData.size == 0) return {};
            const $$postData = $$imData
                .set('startTimeBegin', common.rangeObjToTimestamp($$imData.get('timeRangeStart').toJS()).applyTimeStart)
                .set('startTimeEnd', common.rangeObjToTimestamp($$imData.get('timeRangeStart').toJS()).applyTimeEnd)
                .set('endTimeBegin', common.rangeObjToTimestamp($$imData.get('timeRangeEnd').toJS()).applyTimeStart)
                .set('endTimeEnd', common.rangeObjToTimestamp($$imData.get('timeRangeEnd').toJS()).applyTimeEnd)
                .set('finishTimeBegin', common.rangeObjToTimestamp($$imData.get('timeRangeFinish').toJS()).applyTimeStart)
                .set('finishTimeEnd', common.rangeObjToTimestamp($$imData.get('timeRangeFinish').toJS()).applyTimeEnd)
                .delete('timeRange').delete('timeRangeStart').delete('timeRangeEnd').delete('timeRangeFinish')
            return $$postData.toJS();
        },
        handleFilter() {
            this.pageNum = 1;
            if(!this.listQuery.timeRange){
                this.listQuery.timeRange = []
            }
            this.$$queryStub = fromJS(this.listQuery);
            this.getListData();
            this.listLoading = false;
        },
        handleCurrentChange(val) {
            this.pageNum = val;
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
        onUpload(el){
            reqUpload({
                ...el,
                taskId:el.id
            }).then(response => {
                this.getListData()
                this.listLoading = false
            });
        }
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

