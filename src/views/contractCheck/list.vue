<template>
    <div class="sjb-container calendar-list-container">
        <div class="filter-container">
            <div class="toolbar-item">
                <span class="item-label">流程/合同编号：</span>
                <el-input @keyup.enter.native="handleFilter" style="width: 180px;" class="filter-item" placeholder="请输入流程/合同编号" v-model.trim="listQuery.queryText">
                </el-input>
            </div>
            <div class="toolbar-item">
                <span class="item-label">合同方名称：</span>
                <el-input @keyup.enter.native="handleFilter" style="width: 180px;" class="filter-item" placeholder="请输入甲方/乙方/丙方名称" v-model.trim="listQuery.contractPartyName">
                </el-input>
            </div>
            
            <div class="toolbar-item">
                <span class="item-label">合同签约人：</span>
                <el-input @keyup.enter.native="handleFilter" style="width: 180px;" class="filter-item" placeholder="请输入合同签约人" v-model.trim="listQuery.signLeaderName">
                </el-input>
            </div>
            <div class="toolbar-item">
                <span class="item-label">合同关键字：</span>
                <el-input @keyup.enter.native="handleFilter" style="width: 180px;" class="filter-item" placeholder="请输入关键字" v-model.trim="listQuery.keyWords">
                </el-input>
            </div>
            <div class="toolbar-item">
                <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
                <el-button class="filter-item" type="warning" v-waves icon="el-icon-delete" @click="restListQuery(restCallback)">重置</el-button>
                <el-button v-if="ids.indexOf('me-contractList-addBtn')!==-1" class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">新建合同审核</el-button>
            </div>
            <div class="toolmore-control">
                <el-button icon="el-icon-arrow-up" v-if="toolexpand" class="toolmore-control-btn" @click="toolexpand = false">收起</el-button>
                <el-button icon="el-icon-arrow-down" v-else class="toolmore-control-btn" @click="toolexpand = true">展开</el-button>
            </div>

            <el-collapse-transition>
                <div v-show="toolexpand">
                    <div class="toolbar-row">
                        <Department type="list" Dlabel="申请部门：" @on-confirm="depConfirm" :Dvalue="officeName"></Department>
                        <div class="toolbar-item">
                            <span class="item-label">合同日期类型：</span>
                            <el-select clearable filterable style="width: 170px" class="filter-item" v-model="listQuery.contractTimeType" placeholder="请选择合同日期类型">
                                <el-option v-for="item in dateTypeList" :key="item.value" :label="item.name" :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="toolbar-item">
                            <span class="item-label">日期：</span>
                            <el-date-picker v-model="listQuery.timeRange" type="daterange" class="filter-item" style="width:287px" placeholder="选择日期范围"  :picker-options="pickerOptions">
                            </el-date-picker>
                        </div>
                        <div class="toolbar-item">
                            <span class="item-label">合同名称：</span>
                            <el-select clearable filterable style="width: 220px" class="filter-item" v-model="listQuery.configId" placeholder="请选择合同名称">
                                <el-option v-for="item in comInfor" :key="item.id" :label="item.contractName" :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="toolbar-item">
                            <span class="item-label">合同状态：</span>
                            <el-select clearable style="width: 120px" class="filter-item" v-model="listQuery.contractFlowStatus" placeholder="请选择合同状态">
                                <el-option v-for="item in expStatuList" :key="item.value" :label="item.name" :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
            </el-collapse-transition>
        </div>
        <div class="filter-container">
            <div class="toolbar-item">
                <el-button v-if="ids.indexOf('me-contractCheckList-batchDeleteBtn')!==-1" class="filter-item" type="primary" @click="moveContract">批量删除合同</el-button>
            </div>
        </div>
        <el-table :data="list" border fit highlight-current-row style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column
                type="selection"
                width="55px">
            </el-table-column>
            <el-table-column align="center" label="流程编号" width="150px">
                <template slot-scope="scope">
                    <span style="color:#409EFF;cursor: Pointer;"  @click="showDetail(scope.row)">{{scope.row.procCode}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="合同编号" width="155px">
                <template slot-scope="scope">
                    <span>{{scope.row.contractCode}}</span>
                </template>
            </el-table-column>
            <el-table-column width="180px" align="center" label="合同名称">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.contractName">{{scope.row.contractName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="甲方名称">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.firstMemberName">{{scope.row.firstMemberName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="乙方名称">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.secondMemberName">{{scope.row.secondMemberName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="丙方名称">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.thirdMemberName">{{scope.row.thirdMemberName}}</span>
                </template>
            </el-table-column>
            <el-table-column width="90px" align="center" label="合同签约人">
                <template slot-scope="scope">
                    <span>{{scope.row.signLeaderName}}</span>
                </template>
            </el-table-column>
            <el-table-column width="100px" align="center" label="合同关键字">
                <template slot-scope="scope">
                    <span>{{scope.row.keyWordName&&scope.row.keyWordName.join('，')}}</span>
                </template>
            </el-table-column>
            <el-table-column width="100px" align="center" label="申请部门">
                <template slot-scope="scope">
                    <span>{{scope.row.officeName}}</span>
                </template>
            </el-table-column>
            <el-table-column width="100px" align="center" label="合同开始日期">
                <template slot-scope="scope">
                    <span>{{scope.row.contractStartTime | stamp2TextDate}}</span>
                </template>
            </el-table-column>
            <el-table-column width="100px" align="center" label="合同结束日期">
                <template slot-scope="scope">
                    <span>{{scope.row.contractEndTime | stamp2TextDate}}</span>
                </template>
            </el-table-column>
            <el-table-column width="90px" align="center" label="合同状态">
                <template slot-scope="scope">
                    <span>{{scope.row.contractFlowStatusTxt}}</span>
                </template>
            </el-table-column>
            <el-table-column width="90px" align="center" label="操作" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="showDetail(scope.row)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        
        <div class="pagination-container">
            <el-pagination background @current-change="handleCurrentChange" :current-page="pageNo" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
        <el-dialog title="系统提示？" width="25%" :visible.sync="dialogDelVisible">
            <span>确认批量删除合同申请吗？删除后，将不可恢复！</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="delBtn">确认</el-button>
                <el-button @click="dialogDelVisible = false">取消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import common from '@/utils/common';
import Department from "@/components/Department";
import { fetchList ,getContractTemlist,delContracts} from '@/api/contractCheck';
import waves from '@/directive/waves' // 水波纹指令
import { toJS, fromJS, Map, List } from 'immutable';
import { parseTime } from '@/utils';

import listQueryMix from '../../mixins/listQuery.mix';
import { mapState, mapGetters } from "vuex";

export default {
    directives: {
        waves
    },
    components: {
        Department
    },
    mixins: [listQueryMix],
    data() {
        return {
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            },
            toolexpand:false,
            list: [],
            total: null,
            pageNo: 1,
            pageSize: 20,
            officeName:"",
            listQuery: {
                officeId:"",
                keyWords:"",
                timeRange: [],
                contractTimeType:"",
                signLeaderName:"",// 合同签约人姓名(模糊匹配) ,
                procCode:"",// 流程编号 ,
                contractFlowStatus:"",// 流程状态:1审批结束2审批中3单据被驳回4单据保存 ,
                configId:"",//合同名称
                contractPartyName:"",//合同方名称
                queryText:"",//流程编号/合同编号
            },
            expStatuList:[],
            comInfor: [],

            selectContract:[],
            contractChecked:false,
            contractLeaderId:'',
            memberList:[],
            dialogMoveVisible:false,
            dialogDelVisible:false,

            dateTypeList:[],
        }
    },
    computed: {
        ...mapState({
            ids:state => state.permission.ids
        })
    },
    created() {
        this.$$queryStub = this.$$listQuery;
        this.getList();
        getContractTemlist({}).then(res => {
            this.comInfor = res.data;
        })
    },
    mounted(){
        let dicList = JSON.parse(localStorage.getItem("web_oa_dicList"));
        function selectDic(arr,type){
            let temp = [];
            for(var i = 0;i<arr.length;i++){
                if(arr[i].type == type){
                    temp.push(arr[i])
                };
            }
            return temp
        }

        this.expStatuList = selectDic(dicList,"expense_status");
        this.dateTypeList = selectDic(dicList,"contract_time_type")
    },
    methods: {
        depConfirm(data){
            if(data){
                this.listQuery.officeId = data.id;
                this.officeName = data.name;
            }else{
                this.listQuery.officeId = "";
                this.officeName = "";
            }
        },
        getList() {
            var postData = this.reduceParams(this.$$queryStub);
            fetchList({
                ...postData,
                pageNo:this.pageNo,
                pageSize:this.pageSize
            }).then(response => {
                this.list = response.data.list;
                this.total = response.data.total;
            })
        },
        restCallback() {
            this.officeName = ""
                // 用来补充默认rest不足的问题
        },
        // 处理接口不一致情况
        reduceParams($$imData) {
            if (!$$imData || $$imData.size == 0) return {};
            const $$postData = $$imData
                .set('startTime', common.rangeObjToTimestamp($$imData.get('timeRange').toJS()).applyTimeStart)
                .set('endTime', common.rangeObjToTimestamp($$imData.get('timeRange').toJS()).applyTimeEnd)
                .delete('timeRange');
            return $$postData.toJS();
        },
        handleFilter() {
            this.pageNo = 1;
            if(!this.listQuery.timeRange){
                this.listQuery.timeRange = [];
            }
            this.$$queryStub = fromJS(this.listQuery);
            this.getList();
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.getList();
        },
        handleCurrentChange(val) {
            this.pageNo = val;
            this.getList();
        },
        showDetail(row){
        // if(row.expenseStatus == 2){
        //     this.$router.push({
        //       path:'/me/reimDetail',
        //       query: { key: row.id , taskId:row.taskId}
        //   })
        // }else{
            this.$router.push({
                path:'/me/contractCheckDetail',
                query: { key: row.id ,pathType:'list'}
            })
        // }
        },
        handleCreate() {
            this.$router.push({path: '/me/contractCheckForm'});
        },
        handleSelectionChange(val){
            this.selectContract = val;
        },
        moveContract(){
            
            if(this.selectContract.length){
                if(!this.selectContract.find(item=>{return item.contractFlowStatus=="0"||item.contractFlowStatus=="1"})){
                    this.dialogDelVisible = true;
                }else{
                    this.$message({
                        message: "批量删除的合同包含已删除的合同或已经结束的合同，请重新选择！",
                        type: 'warning'
                    })
                }
            }else{
                this.$message({
                    message: "请选择要批量删除的合同！",
                    type: 'warning'
                })
            }
        },
        delBtn(){
            let idList = []
            this.selectContract.forEach(item => {
                idList.push({contractFlowId:item.id,procInsId:item.procInsId})
            });
            delContracts({
                idList:idList
            }).then(res=>{
                if (res.code == 200) {
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
                    this.dialogDelVisible = false;
                    this.getList()
                }
            })
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.toolbar-row{
    margin: 5px 0 0 0 
}
.ignore-detail {
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
}

.merge-item{
    margin: 5px;
}
.select-item{
    margin-right: 5px
}
.move-item{
    padding: 10px;
    background: #f2f7fa;
    color: #343434;
    .item-label{
        float: left;
        width: 100px;
    }
    .filter-item{
        display: inline-block;
        margin-left: 30px
    }
}
</style>