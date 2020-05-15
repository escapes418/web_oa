<template>
    <div class="sjb-container calendar-list-container">
        <div class="filter-container">
            <div class="toolbar-item">
                <span class="item-label">流程编号/标题：</span>
                <el-input @keyup.enter.native="handleFilter" style="width: 180px;" class="filter-item" placeholder="请输入流程编号/标题" v-model.trim="listQuery.procName">
                </el-input>
            </div>
            <div class="toolbar-item">
                <span class="item-label">申请状态：</span>
                <el-select clearable style="width: 120px" class="filter-item" v-model="listQuery.expenseStatus" placeholder="请选择">
                    <el-option v-for="item in expStatuList" :key="item.value" :label="item.name" :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="toolbar-item">
                <span class="item-label">项目名称：</span>
                <el-select 
                    filterable
                    clearable
                    remote 
                    style="width: 220px" 
                    class="filter-item" 
                    v-model="listQuery.projectId" 
                    :remote-method="searchProject"
                    placeholder="请输入项目名称">
                    <el-option v-for="item in proDic" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="toolbar-item">
                <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
                <el-button class="filter-item" type="warning" v-waves icon="el-icon-delete" @click="restListQuery(restCallback)">重置</el-button>
                <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">费用报销申请</el-button>
            </div>
            <div class="toolmore-control">
                <div class="toolbar-item">
                    <el-button class="filter-item" type="primary" v-waves icon="el-icon-download" @click="exportFile">导出Excel</el-button>
                </div>
                <el-button icon="el-icon-arrow-up" v-if="toolexpand" class="toolmore-control-btn" @click="toolexpand = false">收起</el-button>
                <el-button icon="el-icon-arrow-down" v-else class="toolmore-control-btn" @click="toolexpand = true">展开</el-button>
            </div>
            <el-collapse-transition>
                <div v-show="toolexpand">
                    <div class="toolbar-row">
                        <div class="toolbar-item">
                            <span class="item-label">申请时间：</span>
                            <el-date-picker v-model="listQuery.timeRange" type="daterange" class="filter-item" style="width:287px" placeholder="选择日期范围"  :picker-options="pickerOptions">
                            </el-date-picker>
                        </div>
                        <div class="toolbar-item">
                            <span class="item-label">流程名称：</span>
                            <el-input @keyup.enter.native="handleFilter" style="width: 180px;" class="filter-item" placeholder="请输入流程名称" v-model="listQuery.procName">
                            </el-input>
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
        <el-table-column width="320px" align="center" label="流程名称">
            <template slot-scope="scope">
                <a>{{scope.row.procName}}</a>
            </template>
        </el-table-column>
        <el-table-column width="320px" align="center" label="项目名称">
            <template slot-scope="scope">
                <a>{{scope.row.projectName}}</a>
            </template>
        </el-table-column>
        <el-table-column align="center" label="申请人名称">
            <template slot-scope="scope">
                <span>{{scope.row.applyPerName}}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="申请日期">
            <template slot-scope="scope">
                <span>{{scope.row.applyTime}}</span>
            </template>
        </el-table-column>
        <el-table-column width="120px" align="center" label="费用合计">
            <template slot-scope="scope">
                <span>{{scope.row.expenseTotal}}</span>
            </template>
        </el-table-column>
        <el-table-column width="120px" align="center" label="审批状态">
            <template slot-scope="scope">
                <span>{{scope.row.expenseStatusValue}}</span>
            </template>
        </el-table-column>
        <el-table-column width="120px" align="center" label="操作" class-name="small-padding fixed-width">
            <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="showDetail(scope.row)">详情</el-button>
            </template>
        </el-table-column>
        </el-table>

        <div class="pagination-container">
            <el-pagination background @current-change="handleCurrentChange" :current-page="pageNo" :page-size="20" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>

        <el-dialog title="选择市场负责人" :visible.sync="dialogMarketVisible" el-dialog>
            <el-input placeholder="输入关键字进行过滤" v-model="filterMarket"></el-input>
            <el-tree :data="treeData" :props="defaultProps" @node-click="handleMarketClick" :filter-node-method="marketNode" ref="marketTree"></el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogMarketVisible = false">取消</el-button>
                <el-button type="primary" @click="selectMarket">确认</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import common from '@/utils/common'
import { fetchList ,fetchProDic,downReim} from '@/api/reim'
import waves from '@/directive/waves' // 水波纹指令
import { toJS, fromJS, Map, List } from 'immutable';
import { parseTime } from '@/utils'

import listQueryMix from '../../mixins/listQuery.mix'


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
            // timeRange: [],
            list: null,
            total: null,
            dialogMarketVisible:false,
            filterMarket:'',
            treeData:[],
            defaultProps:{
                children: 'userInfo',
                label: 'name'
            },
            pageNo: 1,
            pageSize: 20,
            listLoading: true,
            listQuery: {
                timeRange: [],
                expenseFlowId:"",
                projectId:"",
                expenseStatus:"",
                procName:"",
            },
            expStatuList:[],
            proDic: [],
        }
    },
    created() {
        this.getList()
        this.listLoading = false
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
        selectMarket() {
            if(this.marketLeader ==''){
                this.$message({
                    message: '请选择市场负责人',
                    type: 'warning'
                })
                return
            }
            this.dialogMarketVisible = false
        },
        searchProject(val){
            if( val!==''){
                fetchProDic({
                    dictType:'oa_project',
                    projectName:val
                }).then(res =>{
                    this.proDic = res.data
                })
            }
        },
        handleMarketClick(data) {
            this.marketLeader = data.name
            this.filter.marketLeaderId = data.id
        },
        marketNode(value, data){
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        getList() {
            this.listLoading = true;
            var postData = this.reduceParams(this.$$queryStub);
            // var {applyTimeStart,applyTimeEnd } = common.rangeObjToTimestamp(this.listQuery.timeRange)
            fetchList({
                ...postData,
                pageNo:this.pageNo,
                pageSize:this.pageSize
            }).then(response => {
                this.list = response.data.list
                this.total = response.data.total
                this.listLoading = false
            })
        },
        restCallback() {
            this.proDic = []
                // 用来补充默认rest不足的问题
        },
        // 处理接口不一致情况
        reduceParams($$imData) {
            if (!$$imData || $$imData.size == 0) return {};
            const $$postData = $$imData
                .set('applyTimeStart', common.rangeObjToTimestamp($$imData.get('timeRange').toJS()).applyTimeStart)
                .set('applyTimeEnd', common.rangeObjToTimestamp($$imData.get('timeRange').toJS()).applyTimeEnd)
                .delete('timeRange')
            return $$postData.toJS();
        },
        handleFilter() {
            this.pageNo = 1
            if(!this.listQuery.timeRange){
                this.listQuery.timeRange = []
            }
            this.$$queryStub = fromJS(this.listQuery);
            this.getList()
            this.listLoading = false;
        },
        handleCurrentChange(val) {
            this.pageNo = val
            this.getList()
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
                path:'/me/reimDetail',
                query: { key: row.id ,pathType:'list'}
            })
        // }
        },
        handleCreate() {
            this.$router.push({path: '/me/reimForm'})
        },
        exportFile(){
            var postData = this.reduceParams(this.$$queryStub);
            downReim({
                ...postData
            }).then(res=>{
                if(res.code == 200){
                    var url = `./OA${res.data}`;
                    window.location.href = url;
                    this.$message({
                        message:res.message,
                        type:'success'
                    })
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

</style>