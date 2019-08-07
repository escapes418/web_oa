<template>
    <div class="sjb-container calendar-list-container">
        <div class="filter-container">
            <div class="toolbar-item">
                <span class="item-label">流程编号/标题：</span>
                <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="请输入流程编号/标题" v-model="listQuery.procName">
                </el-input>
            </div>
            
            <div class="toolbar-item">
                <span class="item-label">申请人：</span>
                <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="请输入申请人" v-model="listQuery.applyName">
                </el-input>
            </div>
            <!-- <div class="toolbar-item">
                <span class="item-label">归属部门：</span>
                <div class="item-value" @click="dialogFormVisible = !dialogFormVisible">
                    <i class="el-icon-search" style="color:#bfbfbf"></i>
                    <span style="color:#606266">{{listQuery.officeName}}</span>
                </div>
            </div> -->
            <Department type="list" @on-confirm="depConfirm" :Dvalue="listQuery.officeName"></Department>
            <div class="toolbar-item">
                <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
                <el-button class="filter-item" type="warning" v-waves icon="el-icon-delete" @click="restListQuery(restCallback)">重置</el-button>
            </div>
            <div class="toolmore-control">
                <el-button icon="el-icon-arrow-up" v-if="toolexpand" class="toolmore-control-btn" @click="toolexpand = false">收起</el-button>
                <el-button icon="el-icon-arrow-down" v-else class="toolmore-control-btn" @click="toolexpand = true">展开</el-button>
            </div>
            <el-collapse-transition>
                <div v-show="toolexpand">
                    <div class="toolbar-row">
                        <div class="toolbar-item">
                            <span class="item-label">到达时间：</span>
                            <el-date-picker v-model="listQuery.timeRange" type="daterange" class="filter-item" style="width:287px" placeholder="选择日期范围" :picker-options="pickerOptions">
                            </el-date-picker>
                        </div>
                    </div>
                </div>
            </el-collapse-transition>
        </div>

        <el-table :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
            <el-table-column align="center" label="流程编号" width="160px">
                <template slot-scope="scope">
                    <span class="ignore-detail" style="color:#409EFF;cursor: Pointer;" :title="scope.row.procCode" @click="showDetail(scope.row)">{{scope.row.procCode}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="流程名称">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.varsTitle">{{scope.row.varsTitle}}</span>
                </template>
            </el-table-column>
            
            <el-table-column align="center" label="当前环节" width="200px">
                <template slot-scope="scope">
                    <span>{{scope.row.taskName}}</span>
                </template>
            </el-table-column>
            <el-table-column width="120px" align="center" label="流程类型">
                <template slot-scope="scope">
                    <span>{{scope.row.procDefName}}</span>
                </template>
            </el-table-column>
            <el-table-column width="160px" align="center" label="到达时间">
                <template slot-scope="scope">
                    <span>{{scope.row.taskCreateTime}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="230px" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="showDetail(scope.row)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- <el-dialog title="选择归属部门" :visible.sync="dialogFormVisible" width="25%" :center="true">
            <el-input placeholder="输入关键字进行过滤" v-model="filterText" style="margin-bottom:10px"></el-input>
            <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick" :filter-node-method="filterNode" ref="tree2"></el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">关闭</el-button>
                <el-button type="primary" @click="confirmChoice">确认</el-button>
            </div>
        </el-dialog> -->

        <div class="pagination-container">
            <el-pagination background @current-change="handleCurrentChange" :current-page="pageNo" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </div>

</template>

<script>
import common from '@/utils/common'
import Department from "@/components/Department";
import { getTodoList } from '@/api/task'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
import { toJS, fromJS, Map, List } from 'immutable';
import listQueryMix from '../../mixins/listQuery.mix'
export default {
    name: "todoList",
    components: {
        Department
    },
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
            toolexpand: false,
            // dialogFormVisible: false,
            treeData: [],
            depart: '',
            // filterText: '',
            // defaultProps: {
            //     children: 'children',
            //     label: 'name'
            // },
            pageNo: 1,
            pageSize: 20,
            list: null,
            total: null,
            listLoading: true,
            listQuery: {
                timeRange: [],
                procName:"",
                applyName:"",
                officeId: "",
                officeName: '',
                tempChoice: {}
            },
            departList: [],
        }
    },
    watch: {
        // filterText(val) {
        //     this.$refs.tree2.filter(val);
        // }
    },
    created() {
        // this.getList()
        this.$$queryStub = this.$$listQuery;
        this.listLoading = false
    },
    mounted() {
        // let departList = JSON.parse(localStorage.getItem("web_oa_depart"));
        // var newArr = [];
        // common.transToTree(departList, newArr);
        // this.treeData = newArr
    },
    activated(){
        this.getList()
        this.listLoading = false
    },
    methods: {
        depConfirm(data){
            this.listQuery.officeId = data.id;
            this.listQuery.officeName = data.name;
        },
        // clearInput() {
        //     this.dialogFormVisible = false
        //     this.depart = ''
        //     this.listQuery.officeId = undefined
        // },
        // filterNode(value, data) {
        //     if (!value) return true;
        //     return data.name.indexOf(value) !== -1;
        // },
        // handleNodeClick(data) {
        //     this.listQuery.tempChoice = data;
        // },
        // createData() {
        //     this.dialogFormVisible = false
        // },
        // 查询api
        getList() {
            this.listLoading = true;
            var postData = this.reduceParams(this.$$queryStub);
            getTodoList({
                ...postData,
                pageNo:this.pageNo,
                pageSize:this.pageSize
            }).then(res => {
                this.list = res.data.list
                this.total = res.data.total
                this.listLoading = false
            })
        },
        // confirmChoice() {
        //     this.listQuery.officeId = this.listQuery.tempChoice.id;
        //     this.listQuery.officeName = this.listQuery.tempChoice.name;
        //     this.dialogFormVisible = false
        // },
        restCallback() {
            // 用来补充默认rest不足的问题
        },

        // 搜索
        handleFilter() {
            this.pageNo = 1;
            if(!this.listQuery.timeRange){
                this.listQuery.timeRange = []
            }
            this.$$queryStub = fromJS(this.listQuery);
            this.getList();
            this.listLoading = false;
        },
        // 处理接口不一致情况
        reduceParams($$imData) {
            if (!$$imData || $$imData.size == 0) return {};
            const $$postData = $$imData
                .set('applyTimeStart', common.rangeObjToTimestamp($$imData.get('timeRange').toJS()).applyTimeStart)
                .set('applyTimeEnd', common.rangeObjToTimestamp($$imData.get('timeRange').toJS()).applyTimeEnd)
                .delete('timeRange')
                .delete('officeName')
                .delete('tempChoice')
            return $$postData.toJS();
        },
        handleCurrentChange(val) {
            this.pageNo = val
            // this.$$queryStub = fromJS(this.listQuery);
            this.getList()
            this.listLoading = false
        },
        showDetail(row) {
            if (row.billType == 3) {
                this.$router.push({
                    path: '/me/reimDetail',
                    query: { key: row.businessId, taskId: row.taskId, pathType: 'todo' }
                })
            }
            if (row.billType == 4) {
                this.$router.push({
                    path: '/me/recepDetail',
                    query: { key: row.businessId, taskId: row.taskId, pathType: 'todo' }
                })
            }
            if (row.billType == 5) {
                this.$router.push({
                    path: '/me/travelingDetail',
                    query: { key: row.businessId, taskId: row.taskId, pathType: 'todo' }
                })
            }
            if (row.billType == 6) {
                this.$router.push({
                    path: '/me/resourceDetail',
                    query: { key: row.businessId, taskId: row.taskId, pathType: 'todo' }
                })
            }
            if (row.billType == 7) {
                this.$router.push({
                    path: '/me/resHandleDetail',
                    query: { key: row.businessId, taskId: row.taskId, pathType: 'todo' }
                })
            }
            if (row.billType == 9) {
                this.$router.push({
                    path: '/me/contractCheckDetail',
                    query: { key: row.businessId, taskId: row.taskId, pathType: 'todo' }
                })
            }
            // if(row.billType == 10){

            // }
        },
        handleCreate() {
            this.$router.push({ path: '/center/reimburseDetail' })
        },
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.toolbar-row{
  margin: 5px 0 0 0
}

.pro-dialog{
  margin-left: 400px;
  width: 750px
}
.item-value{
  display:inline-block;
  border: 1px solid #dcdfe6;
  border-radius:4px;
  background: white;
  padding-left: 7px;
  line-height: 30px;
  width: 200px
}
.imgPre{
    width:120px;
    height:100px;
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
