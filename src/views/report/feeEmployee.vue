<template>
    <div class="sjb-container calendar-list-container">
        <div class="filter-container">
            <div class="toolbar-item">
                <span class="item-label">年份：</span>
                <el-select clearable style="width: 220px" class="filter-item" v-model="listQuery.year" placeholder="请选择">
                    <el-option v-for="item in yearList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
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
                <span class="item-label">员工姓名：</span>
                <el-input @keyup.enter.native="handleFilter" style="width: 180px;" class="filter-item" placeholder="请输入员工姓名" v-model.trim="listQuery.employeeName">
                </el-input>
            </div>
            <div class="toolbar-item">
                <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
                <el-button class="filter-item" type="warning" v-waves icon="el-icon-delete" @click="restListQuery(restCallback)">重置</el-button>
            </div>
            <div class="toolbar-item" v-if="!showSearch">
                <el-button class="filter-item" v-waves icon="el-icon-back" @click="cleanrFilter">返回</el-button>
            </div>
            <div class="toolmore-control">
                <div class="toolbar-item">
                <el-button class="filter-item" type="primary" v-waves icon="el-icon-download" @click="exportFile">导出Excel</el-button>
                </div>
            </div>
        </div>
        <!-- <div class="filter-container">
        <div class="toolbar-item">
            <el-button class="filter-item" type="primary" v-waves icon="el-icon-download" @click="exportFile">导出Excel</el-button>
        </div>
        <div class="toolbar-item">
            <el-button class="filter-item" v-if="!showSearch" v-waves icon="el-icon-back" @click="cleanrFilter">返回</el-button>
        </div>
        </div> -->
        <el-alert
            title="备注：该表单位（元），所有显示费用为已审批完结费用。"
            class="remarkInfo"
            :closable="false"
            show-icon
            type="info">
        </el-alert>
        <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
        <el-table-column align="center" label="员工名称"  width="120px">
            <template slot-scope="scope">
                <span class="ignore-detail">{{scope.row.employeeName}}</span>
            </template>
        </el-table-column>
        <!-- <el-table-column align="center" label="部门"  width="120px">
            <template slot-scope="scope">
                <span class="ignore-detail">{{scope.row.officeName}}</span>
            </template>
        </el-table-column> -->
        <el-table-column width="100px" align="center" :label="year+'年1月'">
            <template slot-scope="scope">
                <span class="ignore-detail" :title="scope.row.m1">{{scope.row.m1}}</span>
            </template>
        </el-table-column>
        <el-table-column :label="year+'年2月'" width="100px" align="center">
            <template slot-scope="scope">
                <span class="ignore-detail" :title="scope.row.m2">{{scope.row.m2}}</span>
            </template>
        </el-table-column>
        <el-table-column  align="center" :label="year+'年3月'" width="100px">
            <template slot-scope="scope">
                <span class="ignore-detail" :title="scope.row.m3">{{scope.row.m3}}</span>
            </template>
        </el-table-column>
        <el-table-column  :label="year+'年4月'" align="center" width="100px">
            <template slot-scope="scope">
                <span class="ignore-detail" :title="scope.row.m4">{{scope.row.m4}}</span>
            </template>
        </el-table-column>
        <el-table-column  :label="year+'年5月'" align="center" width="100px">
            <template slot-scope="scope">
                <span class="ignore-detail" :title="scope.row.m5">{{scope.row.m5 }}</span>
            </template>
        </el-table-column>
        <el-table-column  :label="year+'年6月'" align="center" width="100px">
            <template slot-scope="scope">
                <span class="ignore-detail" :title="scope.row.m6">{{scope.row.m6}}</span>
            </template>
        </el-table-column>
        <el-table-column  :label="year+'年7月'" align="center" width="100px">
            <template slot-scope="scope">
                <span class="ignore-detail" :title="scope.row.m7">{{scope.row.m7}}</span>
            </template>
        </el-table-column>
        <el-table-column :label="year+'年8月'" align="center" width="100px">
            <template slot-scope="scope">
                <span class="ignore-detail" :title="scope.row.m8">{{scope.row.m8}}</span>
            </template>
        </el-table-column>
        <el-table-column :label="year+'年9月'" align="center" width="100px">
            <template slot-scope="scope">
                <span class="ignore-detail" :title="scope.row.m10">{{scope.row.m9}}</span>
            </template>
        </el-table-column>
        <el-table-column :label="year+'年10月'" align="center" width="100px">
            <template slot-scope="scope">
                <span class="ignore-detail" :title="scope.row.m10">{{scope.row.m10}}</span>
            </template>
        </el-table-column>
        <el-table-column :label="year+'年11月'" align="center" width="100px">
            <template slot-scope="scope">
                <span class="ignore-detail" :title="scope.row.m11">{{scope.row.m11}}</span>
            </template>
        </el-table-column>
        <el-table-column :label="year+'年12月'" align="center" width="100px">
            <template slot-scope="scope">
                <span class="ignore-detail" :title="scope.row.m12">{{scope.row.m12}}</span>
            </template>
        </el-table-column>
        <el-table-column label="总计（行）" align="center" width="100px">
            <template slot-scope="scope">
                <span class="ignore-detail" :title="scope.row.rowTotal">{{scope.row.rowTotal}}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="操作" class-name="small-padding fixed-width">
            <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="handleUpdate(scope.row)" :disabled="scope.row.isDetail == 0">详情</el-button>
            </template>
        </el-table-column>
        </el-table>

        <!-- <el-dialog title="选择归属部门" :visible.sync="dialogFormVisible" width="25%" :center="true">
            <el-input placeholder="输入关键字进行过滤" v-model="filterText" style="margin-bottom:10px"></el-input>
            <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick" :filter-node-method="filterNode" ref="tree2"></el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="confirmChoice">确认</el-button>
            </div>
        </el-dialog> -->
        <div class="pagination-container">
            <el-pagination background  @current-change="handleCurrentChange" :current-page="pageNo" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>

    </div>
</template>

<script>
import common from '@/utils/common'
import { getEmployeeList ,downEmpFile} from '@/api/report'
import Department from "@/components/Department";
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
import { toJS, fromJS, Map, List } from 'immutable';
import listQueryMix from '../../mixins/listQuery.mix'

export default {
    components: {
        Department
    },
    directives: {
        waves
    },
    mixins: [listQueryMix],
    data() {
        return {
            tableKey: 0,
            year:"",
            list: [],
            total: 0,
            dialogFormVisible: false,
            treeData: [],
            depart: '',
            filterText: '',
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            showSearch:true,
            listLoading: true,
            yearList:[],
            pageNo: 1,
            pageSize: 20,
            listQuery: {
                officeName:"市场中心",
                tempChoice:{},
                officeId: "15725250",//默认市场中心
                employeeName:"",
                year: ""
            },
        }
    },
  // watch: {
  //     filterText(val) {
  //         this.$refs.tree2.filter(val);
  //     }
  // },
  
    created() {
        this.year = new Date().getFullYear()
        this.$$queryStub = this.$$listQuery;
        this.getList();
        this.listLoading = false;
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
        this.yearList = selectDic(dicList,"oa_report_year");

        //部门树
        let departList = JSON.parse(localStorage.getItem("web_oa_depart"));
        let newArr = [];
        common.transToTree(departList, newArr);
        this.treeData = newArr;
    },
    methods: {
        getList() {
            this.listLoading = true
            var postData = this.reduceParams(this.$$queryStub);
            getEmployeeList({
                ...postData,
                pageNo:this.pageNo,
                pageSize:this.pageSize
            }).then(res => {
                if(this.pageNo == '1'){
                res.data.amountMonthSum.isDetail = "0";
                res.data.amountMonthSum.employeeName = "总计（列）";
                res.data.pageResponse.list.unshift(res.data.amountMonthSum);
                }
                this.list = res.data.pageResponse.list;
                this.total = res.data.pageResponse.total;
                this.listLoading = false;
            })
        },
        reduceParams($$imData) {
            if (!$$imData || $$imData.size == 0) return {};
            const $$postData = $$imData
                .delete('officeName')
                .delete('tempChoice')
                return $$postData.toJS();
        },
        restCallback(){

        },  
        depConfirm(data){ 
            this.listQuery.officeId = data.id;
            this.listQuery.officeName = data.name;
        }, 
        handleFilter() {
            if(!this.listQuery.year){
                this.year = new Date().getFullYear();
            }else{
                this.year = this.listQuery.year;
            }
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
            this.listQuery.firstCode = row.subjectCode;
            this.$$queryStub = fromJS(this.listQuery);
            this.getList();
        },
        cleanrFilter(){
            this.listQuery.year = "";
            this.depart = "";
            this.listQuery.officeId ="";
            this.listQuery.employeeName ="";
            this.listQuery.pageNo = 1;
            this.year = new Date().getFullYear();
            this.getList();
        },
        exportFile(){
            downEmpFile({
                year:this.listQuery.year
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
        // filterNode(value, data) {
        //   if (!value) return true;
        //   return data.name.indexOf(value) !== -1;
        // },
        handleNodeClick(data) {
            this.listQuery.tempChoice = data;
            this.treeObj = data;
        },
        confirmChoice() {
            this.listQuery.officeName = this.listQuery.tempChoice.name;
            this.listQuery.officeId = this.listQuery.tempChoice.id;
            this.dialogFormVisible = false;
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
    width: 200px
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