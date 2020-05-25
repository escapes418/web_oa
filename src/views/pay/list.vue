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
                <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">付款申请</el-button>
            </div>
            <div class="toolmore-control">
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
                    </div>
                </div>
            </el-collapse-transition>
        </div>
        <el-table :data="list" border fit highlight-current-row style="width: 100%">
            <el-table-column align="center" label="流程编号" width="150px">
                <template slot-scope="scope">
                    <span style="color:#409EFF;cursor: Pointer;"  @click="showDetail(scope.row)">{{scope.row.procCode}}</span>
                </template>
            </el-table-column>
            <el-table-column width="320px" align="center" label="流程名称">
                <template slot-scope="scope">
                    <span>{{scope.row.procName}}</span>
                </template>
            </el-table-column>
            <el-table-column width="320px" align="center" label="项目名称">
                <template slot-scope="scope">
                    <span>{{scope.row.projectName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="付款类别">
                <template slot-scope="scope">
                    <span>{{scope.row.payTypeName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="申请人名称">
                <template slot-scope="scope">
                    <span>{{scope.row.applyPerName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="申请时间">
                <template slot-scope="scope">
                    <span>{{scope.row.applyTime | stamp2TextDate}}</span>
                </template>
            </el-table-column>
            <el-table-column width="120px" align="center" label="付款金额">
                <template slot-scope="scope">
                    <span>{{scope.row.expenseTotal | thousands(2)}}</span>
                </template>
            </el-table-column>
            <el-table-column width="120px" align="center" label="收款方">
                <template slot-scope="scope">
                    <span>{{scope.row.bankAccountName}}</span>
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
    </div>
</template>

<script>
import common from '@/utils/common'
import { getPaytList ,fetchProDic } from '@/api/payment'
import waves from '@/directive/waves' // 水波纹指令
import { toJS, fromJS, Map, List } from 'immutable';
import { parseTime } from '@/utils';
import { mapState } from "vuex";
import listQueryMix from '../../mixins/listQuery.mix'


export default {
    directives: {
        waves
    },
    mixins: [listQueryMix],
    computed:{
        ...mapState({
            ids:state => state.permission.ids
        }),
    },
    data() {
        return {
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            },
            toolexpand:false,
            // timeRange: [],
            list: [],
            total: 0,
            pageNo: 1,
            pageSize: 20,
            listQuery: {
                timeRange: [],
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
        
        this.expStatuList = selectDic(dicList,"expense_status").filter(item=>{
            return item.value != 4
        })
    },
    methods: {
        getList() {
            var postData = this.reduceParams(this.$$queryStub);
            // var {applyTimeStart,applyTimeEnd } = common.rangeObjToTimestamp(this.listQuery.timeRange)
            getPaytList({
                ...postData,
                pageNo:this.pageNo,
                pageSize:this.pageSize
            }).then(response => {
                this.list = response.data.list
                this.total = response.data.total
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
                .set('applyTimeBegin', common.rangeObjToTimestamp($$imData.get('timeRange').toJS()).applyTimeStart)
                .set('applyTimeEnd', common.rangeObjToTimestamp($$imData.get('timeRange').toJS()).applyTimeEnd)
                .delete('timeRange')
            return $$postData.toJS();
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
        handleFilter() {
            this.pageNo = 1
            if(!this.listQuery.timeRange){
                this.listQuery.timeRange = []
            }
            this.$$queryStub = fromJS(this.listQuery);
            this.getList()
        },
        handleCurrentChange(val) {
            this.pageNo = val
            this.getList()
        },
        showDetail(row){
            this.$router.push({
                path:'/me/paymentDetail',
                query: { key: row.id ,pathType:'list'}
            })
        },
        handleCreate() {
            this.$router.push({path: '/me/paymentForm'})
        },
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