<template>
    <div class="sjb-container calendar-list-container">
        <div class="filter-container">
            <div class="toolbar-item">
                <span class="item-label">选择日期：</span>
                <el-date-picker
                    v-model="listQuery.dateTime"
                    type="date"
                    :clearable="false"
                    :picker-options="pickerOptions"
                    placeholder="选择日期">
                </el-date-picker>
            </div>
            
            <div class="toolbar-item">
                <span class="item-label">人员状态：</span>
                <el-select clearable style="width: 120px" class="filter-item" v-model="listQuery.empStatus" placeholder="请选择">
                    <el-option v-for="item in empStatuList" :key="item.value" :label="item.name" :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="toolbar-item">
                <span class="item-label">项目/节点：</span>
                <el-input @keyup.enter.native="handleFilter" style="width: 180px;" class="filter-item" placeholder="请输入项目/节点" v-model.trim="listQuery.textQuery">
                </el-input>
            </div>
            <div class="toolbar-item">
                <span class="item-label">部门/人员：</span>
                <div class="item-value" @click="dialogFormVisible = !dialogFormVisible">
                    <i class="el-icon-search" style="color:#bfbfbf"></i>
                    <span style="color:#606266">{{listQuery.departName}}</span>
                </div>
            </div>
            <div class="toolbar-item">
                <span class="item-label">基地搜索：</span>
                <el-select clearable style="width: 120px" class="filter-item" v-model="listQuery.baseId" placeholder="请选择">
                    <el-option v-for="item in baseList" :key="item.value" :label="item.name" :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="toolbar-item">
                <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
                <el-button class="filter-item" type="warning" v-waves icon="el-icon-delete" @click="restListQuery(restCallback)">重置</el-button>
            </div>
            <div class="toolmore-control">
                <div class="toolbar-item">
                <el-button class="filter-item" type="primary" v-waves icon="el-icon-download" @click="exportFile">导出Excel</el-button>
                </div>
            </div>
        </div>
        <!-- <el-alert
            title="备注：该表单位（元），所有显示费用为已审批完结费用。"
            class="remarkInfo"
            :closable="false"
            show-icon
            type="info">
        </el-alert> -->
        <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
        <el-table-column align="center" label="部门"  width="120px">
            <template slot-scope="scope">
                <span class="ignore-detail">{{scope.row.officeName}}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="岗位名称"  width="120px">
            <template slot-scope="scope">
                <span class="ignore-detail">{{scope.row.postName}}</span>
            </template>
        </el-table-column>
        <el-table-column width="120px" align="center" label="姓名">
            <template slot-scope="scope">
                <span class="ignore-detail" :title="scope.row.userName">{{scope.row.userName}}</span>
            </template>
        </el-table-column>
        <el-table-column label="人员状态" width="120px" align="center">
            <template slot-scope="scope">
                <span class="ignore-detail" :title="scope.row.m2">
                    <el-tag :type="scope.row.empStatus == 1 ? 'success':'info'">{{scope.row.empStatusTxt}}</el-tag>
                </span>
            </template>
        </el-table-column>
        <el-table-column  align="center" label="人员动作" width="120px">
            <template slot-scope="scope">
                <span class="ignore-detail" :title="scope.row.userActionTxt">{{scope.row.userActionTxt}}</span>
            </template>
        </el-table-column>
        <el-table-column  label="项目名称" align="center">
            <template slot-scope="scope">
                <span class="ignore-detail" :title="scope.row.projectName">{{scope.row.projectName}}</span>
            </template>
        </el-table-column>
        <el-table-column  label="地点节点" align="center" width="120px">
            <template slot-scope="scope">
                <span class="ignore-detail" :title="scope.row.nodeName">{{scope.row.nodeName}}</span>
            </template>
        </el-table-column>
        <el-table-column  label="待命基地" align="center" width="120px">
            <template slot-scope="scope">
                <span class="ignore-detail" :title="scope.row.baseValueTxt">{{scope.row.baseValueTxt}}</span>
            </template>
        </el-table-column>
        <el-table-column  label="备注" align="center">
            <template slot-scope="scope">
                <span class="ignore-detail" :title="scope.row.remarks">{{scope.row.remarks}}</span>
            </template>
        </el-table-column>
        <el-table-column label="提交时间" align="center" width="220px">
            <template slot-scope="scope">
                <span class="ignore-detail" :title="scope.row.datetime">{{scope.row.datetime | stamp2TextDateFull}}</span>
            </template>
        </el-table-column>
        <el-table-column width="100px" align="center" label="操作" class-name="small-padding fixed-width">
            <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">详情</el-button>
            </template>
        </el-table-column>
        </el-table>

        <div class="pagination-container">
            <el-pagination background  @current-change="handleCurrentChange" :current-page="pageNo" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>

        <el-dialog title="历史状态" :visible.sync="dialogVisible">
            <div class="dialog" style="margin-top:10px">
                <el-table :data="pastList" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%;">
                    <el-table-column align="center" label="提交时间">
                        <template slot-scope="scope">
                            <span class="ignore-detail" :title="scope.row.createTime | stamp2TextDateFull">{{scope.row.createTime | stamp2TextDateFull}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="人员状态" width="80px">
                        <template slot-scope="scope">
                            <span class="ignore-detail" :title="scope.row.statusTxt">
                                <el-tag :type="scope.row.status == 1 ? 'success':'info'">{{scope.row.statusTxt}}</el-tag>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="人员动作">
                        <template slot-scope="scope">
                            <span  class="ignore-detail" :title="scope.row.userActionTxt">{{scope.row.userActionTxt}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="项目名称">
                        <template slot-scope="scope">
                            <span class="ignore-detail" :title="scope.row.projectName">{{scope.row.projectName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="地点节点">
                        <template slot-scope="scope">
                            <span class="ignore-detail" :title="scope.row.projectNodeName">{{scope.row.projectNodeName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column width="90px" align="center" label="待命基地">
                        <template slot-scope="scope">
                            <span class="ignore-detail" :title="scope.row.baseName">{{scope.row.baseName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column width="110px" align="center" label="备注">
                        <template slot-scope="scope">
                            <span class="ignore-detail" :title="scope.row.remarks">{{ scope.row.remarks}}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <div class="pagination-container" style="margin-top:20px">
                <el-pagination background @current-change="pastCurrentChange" :current-page="pastPageNo" :page-size="pastPageSize" layout="total, prev, pager, next, jumper" :total="pastTotal">
                </el-pagination>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">返回</el-button>
            </div>
        </el-dialog>
        <el-dialog title="选择人员/部门" :visible.sync="dialogFormVisible" width="25%" :center="true">
            <el-input placeholder="输入关键字进行过滤" v-model="filterAssign" style="margin-bottom:10px"></el-input>
            <el-tree :data="treeData" :props="defaultProps" @node-click="handleAssignClick" :filter-node-method="assignNode" ref="assignTree"></el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="selectAssign">确认</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import common from '@/utils/common'
import { getImpleList ,getPastList ,downImpleFile} from '@/api/report'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
import { toJS, fromJS, Map, List } from 'immutable';
import listQueryMix from '../../mixins/listQuery.mix'

export default {
    name: 'complexTable',
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
            tableKey: 0,
            list: [],
            total: 0,
            listLoading: true,
            empStatuList:[],
            pageNo: 1,
            pageSize: 20,
            listQuery: {
                empStatus: "",
                textQuery: "",
                dateTime: new Date(),
                userIdOrDeptId:'',
                baseId:'',
                departName:''
            },

            pastList:[],
            dialogVisible:false,
            id:"",
            pastPageNo:1,
            pastPageSize:10,
            pastTotal:0,

            dialogFormVisible:false,
            treeData: [],
            defaultProps: {
                children: "children",
                label: "name"
            },
            assignData:{},
            filterAssign:'',
            baseList:[]
        }
    },
    created() {
        this.$$queryStub = this.$$listQuery;
        this.getList()
        this.listLoading = false
    },
    mounted(){
        //获取字典
        let dicList = JSON.parse(localStorage.getItem("web_oa_dicList"));
        function selectDic(arr,type){
            let temp = [];
            for(var i = 0;i<arr.length;i++){
                if(arr[i].type == type){
                    temp.push(arr[i]);
                };
            }
            return temp;
        }
        this.empStatuList = selectDic(dicList,"oa_employee_status");
        this.baseList = selectDic(dicList,"oa_employee_base");
        //部门树
        let memberList = JSON.parse(localStorage.getItem("web_oa_member"));
        var newArr = [];
        common.transToTree(memberList, newArr);
        common.mapAndAddChildren(newArr);
        this.treeData = newArr;
    },
    methods: {
        handleAssignClick(data){
            this.assignData = data
        },
        selectAssign(){
            this.listQuery.userIdOrDeptId = this.assignData.id;
            this.listQuery.departName = this.assignData.name;
            if (this.listQuery.departName  == "") {
                this.$message({
                    message: "请选择审批人",
                    type: "warning"
                });
                return;
            }
            this.dialogFormVisible = false
        },
        assignNode(value, data){
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        getList() {
            this.listLoading = true
            var postData = this.reduceParams(this.$$queryStub);
            getImpleList({
                ...postData,
                pageNo:this.pageNo,
                pageSize:this.pageSize
            }).then(res => {
                this.list = res.data.list;
                this.total = res.data.total;
                this.listLoading = false;
            })
        },
        reduceParams($$imData) {
            if (!$$imData || $$imData.size == 0) return {};
            const $$postData = $$imData
                .set('dateTime', common.timeParse($$imData.get('dateTime')))
            return $$postData.toJS();
        },
        handleFilter() {
            this.$$queryStub = fromJS(this.listQuery);
            this.pageNo = 1;
            this.getList();
            this.listLoading = false;
        },
        handleCurrentChange(val) {
            this.pageNo = val;
            this.getList();
            this.listLoading = false;
        },
        handleUpdate(row) {
            this.dialogVisible = true;
            this.id = row.userId;
            this.getPastDetail();
        },
        restCallback(){
            
        },
        getPastDetail(){
            getPastList({
                dateTime: common.timeParse(this.$$queryStub.get('dateTime')),
                userId:this.id,
                pageNo:this.pastPageNo,
                pageSize:this.pastPageSize
            }).then(res=>{
                this.pastList = res.data.list;
                this.pastTotal = res.data.total;
            })
        },
        exportFile(){
            var postData = this.reduceParams(this.$$queryStub);
            downImpleFile({
                ...postData,
            }).then(res=>{
                if(res.status == 0){
                var url = `./OA${res.data}`;
                window.location.href = url;
                this.$message({
                    message:res.message,
                    type:'success'
                })
                }
            })
        },
        pastCurrentChange(val){
            this.pastPageNo = val;
            this.getPastDetail();
        }
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
  width: 230px
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