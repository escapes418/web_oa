<template>
    <div class="sjb-container calendar-list-container">
        <div class="filter-container">
            <div class="toolbar-item">
                <span class="item-label">流程/合同编号：</span>
                <el-input @keyup.enter.native="handleFilter" style="width: 220px;" class="filter-item" placeholder="请输入流程/合同编号" v-model.trim="listQuery.queryText">
                </el-input>
            </div>
            <div class="toolbar-item">
                <span class="item-label">合同方名称：</span>
                <el-input @keyup.enter.native="handleFilter" style="width: 220px;" class="filter-item" placeholder="请输入甲方/乙方/丙方名称" v-model.trim="listQuery.contractPartyName">
                </el-input>
            </div>
            
            <div class="toolbar-item">
                <span class="item-label">合同签约人：</span>
                <el-input @keyup.enter.native="handleFilter" style="width: 220px;" class="filter-item" placeholder="请输入合同签约人" v-model.trim="listQuery.signLeaderName">
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
                        <!-- <div class="toolbar-item">
                            <span class="item-label">用印时间：</span>
                            <el-date-picker v-model="listQuery.timeRange" type="daterange" class="filter-item" style="width:287px" placeholder="选择日期范围"  :picker-options="pickerOptions">
                            </el-date-picker>
                        </div> -->
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
        <el-table :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
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
            <el-table-column width="100px" align="center" label="合同签约人">
                <template slot-scope="scope">
                    <span>{{scope.row.signLeaderName}}</span>
                </template>
            </el-table-column>
            <el-table-column width="120px" align="center" label="合同状态">
                <template slot-scope="scope">
                    <span>{{scope.row.contractFlowStatusTxt}}</span>
                </template>
            </el-table-column>
            <el-table-column width="120px" align="center" label="操作" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="showDetail(scope.row)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        
        <div class="pagination-container">
            <el-pagination background @current-change="handleCurrentChange" :current-page="pageNo" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import common from '@/utils/common';
import { fetchList ,getContractTemlist,} from '@/api/contractCheck';
import waves from '@/directive/waves' // 水波纹指令
import { toJS, fromJS, Map, List } from 'immutable';
import { parseTime } from '@/utils';

import listQueryMix from '../../mixins/listQuery.mix';
import { mapState, mapGetters } from "vuex";

export default {
    directives: {
        waves
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
            listLoading: true,
            listQuery: {
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
            dialogMoveVisible:false
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
        this.listLoading = false;
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

        this.expStatuList = selectDic(dicList,"expense_status")
    },
    methods: {
        getList() {
            this.listLoading = true;
            var postData = this.reduceParams(this.$$queryStub);
            fetchList({
                ...postData,
                pageNo:this.pageNo,
                pageSize:this.pageSize
            }).then(response => {
                this.list = response.data.list;
                this.total = response.data.total;
                this.listLoading = false;
            })
        },
        restCallback() {
                // 用来补充默认rest不足的问题
        },
        // 处理接口不一致情况
        reduceParams($$imData) {
            if (!$$imData || $$imData.size == 0) return {};
            const $$postData = $$imData;
            return $$postData.toJS();
        },
        handleFilter() {
            this.pageNo = 1;
            // if(!this.listQuery.timeRange){
            //     this.listQuery.timeRange = [];
            // }
            this.$$queryStub = fromJS(this.listQuery);
            this.getList();
            this.listLoading = false;
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.getList();
        },
        handleCurrentChange(val) {
            this.pageNo = val;
            this.getList();
            this.listLoading = false;
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