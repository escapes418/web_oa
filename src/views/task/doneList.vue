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
            <div class="toolbar-item">
                <span class="item-label">审批人：</span>
                <div class="item-value" @click="dialogFormVisible = !dialogFormVisible">
                    <i class="el-icon-search" style="color:#bfbfbf"></i>
                    <span style="color:#606266">{{listQuery.approvalAssignName}}</span>
                </div>
            </div>
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
                        <div class="toolbar-item">
                            <span class="item-label">申请状态：</span>
                            <el-select clearable style="width: 120px" class="filter-item" v-model="listQuery.expenseStatus" placeholder="请选择">
                                <el-option v-for="item in expStatuList" :key="item.value" :label="item.name" :value="item.value">
                                </el-option>
                            </el-select>
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
            <el-table-column width="120px" align="center" label="流程状态">
                <template slot-scope="scope">
                    <span>{{scope.row.billStatusTxt}}</span>
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

        <el-dialog title="选择审批人" :visible.sync="dialogFormVisible" width="25%" :center="true">
            <el-input placeholder="输入关键字进行过滤" v-model="filterAssign" style="margin-bottom:10px"></el-input>
            <el-tree :data="treeData" :props="defaultProps" node-key="id" show-checkbox check-strictly @check-change="handleAssignClick" :filter-node-method="assignNode" ref="assignTree"></el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="selectAssign">确认</el-button>
            </div>
        </el-dialog>
        <div class="pagination-container">
            <el-pagination background @current-change="handleCurrentChange" :current-page="pageNo" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </div>

</template>

<script>
import common from '@/utils/common'
import Department from "@/components/Department";
import { getDoneList } from '@/api/task'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
import { toJS, fromJS, Map, List } from 'immutable';
import listQueryMix from '../../mixins/listQuery.mix'

export default {
    name: "doneList",
    components: {
        Department
    },
    directives: {
        waves
    },
    mixins: [listQueryMix],
    watch:{
        filterAssign(val){
            this.$refs.assignTree.filter(val);
        }
    },
    data() {
        return {
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            },
            toolexpand: false,
            treeData: [],
            defaultProps: {
                children: "children",
                label: "name"
            },
            assignData:[],
            filterAssign:'',
            list: null,
            total: null,
            pageNo: 1,
            pageSize: 20,
            listLoading: false,
            listQuery: {
                timeRange: [],
                expenseStatus:"",
                procName: "",
                applyName: "",
                officeId: "",
                officeName: '',
                approvalAssigneeId:"",
                approvalAssignName:"",
                tempChoice: {}
            },
            departList: [],
            expStatuList:[],

            dialogFormVisible:false,
        }
    },
    created() {
        // 暂存对象初始值为组件默认的初始值
        this.$$queryStub = this.$$listQuery;
    },
    mounted() {
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

        let memberList = JSON.parse(localStorage.getItem("web_oa_member"));
        var newArr = [];
        common.transToTree(memberList, newArr);
        common.mapAndAddChildren(newArr);
        this.treeData = newArr;
    },
    activated() {
        this.getList()
        this.listLoading = false
    },
    methods: {
        restCallback() {
            // 用来补充默认rest不足的问题
        },
        depConfirm(data){
            this.listQuery.officeId = data.id;
            this.listQuery.officeName = data.name;
        },
        handleAssignClick(data,select,childSelect){
            let index = this.assignData.indexOf(data)
            if(index<0&&this.assignData.length ===1&&select){
                // this.$message({
                //     message: "只能选择一个子节点作为审批人！",
                //     type: 'warning'
                // })
                this.$refs.assignTree.setChecked(this.assignData[0],false);
                this.assignData = []
                this.assignData.push(data)
            }else if(this.assignData.length ===0&&select){
                // if(data.type =='2'&&data.status == '1'){
                if(data.type =='2'){
                    this.assignData = [];
                    this.assignData.push(data)
                }else{
                    this.$message({
                        message: "该节点不可选！",
                        type: 'warning'
                    })
                    this.$refs.assignTree.setChecked(data,false);
                    return
                }
            }else if(index>=0&&this.assignData.length===1&&!select){
                this.assignData = []
            }
        },
        selectAssign(){
            if(this.assignData.length){
                this.listQuery.approvalAssignName = this.assignData[0].name;
                this.listQuery.approvalAssigneeId = this.assignData[0].id;
                this.dialogFormVisible = false;
            }else{
                this.$message({
                    message: "请选择审批人",
                    type: "warning"
                });
                return;
            }
        },
        assignNode(value, data){
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        // 搜索
        handleFilter() {
            if(!this.listQuery.timeRange){
                this.listQuery.timeRange = []
            }
            this.pageNo = 1;
            this.$$queryStub = fromJS(this.listQuery);
            this.getList();
            this.listLoading = false;
        },
        // 点击分页
        handleCurrentChange(val) {
            this.pageNo = val;
            this.getList();
            this.listLoading = false;
        },
        // 查询api
        getList() {
            this.listLoading = true;
            var postData = this.reduceParams(this.$$queryStub);
            getDoneList({
                ...postData,
                pageNo:this.pageNo,
                pageSize:this.pageSize
            }).then(res => {
                this.list = res.data.list
                this.total = res.data.total
                this.listLoading = false
            })
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
        // 跳转详情
        showDetail(row) {
            if (row.billType == 3) {
                this.$router.push({
                    path: '/me/reimDetail',
                    query: { key: row.businessId, taskId: row.taskId, pathType: 'done' }
                })
            }
            if (row.billType == 4) {
                this.$router.push({
                    path: '/me/recepDetail',
                    query: { key: row.businessId, taskId: row.taskId, pathType: 'done' }
                })
            }
            if (row.billType == 5) {
                this.$router.push({
                    path: '/me/travelingDetail',
                    query: { key: row.businessId, taskId: row.taskId, pathType: 'done' }
                })
            }
            if (row.billType == 6) {
                this.$router.push({
                    path: '/me/resourceDetail',
                    query: { key: row.businessId, taskId: row.taskId, pathType: 'done' }
                })
            }
            if (row.billType == 7) {
                this.$router.push({
                    path: '/me/resHandleDetail',
                    query: { key: row.businessId, taskId: row.taskId, pathType: 'done' }
                })
            }
            if (row.billType == 9) {
                this.$router.push({
                    path: '/me/contractCheckDetail',
                    query: { key: row.businessId, taskId: row.taskId, pathType: 'done' }
                })
            }
        },
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.toolbar-row{
  margin: 5px 0 0 0
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
