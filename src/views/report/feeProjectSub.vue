<template>
  <div class="sjb-container calendar-list-container">
    <!-- <div class="filter-container">
      <div class="toolbar-item">
          <span class="item-label">年份：</span>
          <el-select clearable style="width: 220px" class="filter-item" v-model="listQuery.year" placeholder="请选择">
              <el-option v-for="item in yearList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
          </el-select>
      </div>
      <div class="toolbar-item">
        <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
        <el-button class="filter-item" type="warning" v-waves icon="el-icon-delete" @click="cleanrFilter">重置</el-button>
      </div>
      <div class="toolmore-control">
         <el-button class="filter-item" type="primary" v-waves icon="el-icon-download" @click="exportFile">导出Excel</el-button>
         <el-button class="filter-item" type="primary" v-waves icon="el-icon-download" @click="backBtn">返回</el-button>
      </div>
    </div> -->
    <div class="filter-container">
        <div class="toolbar-item">
            <el-button class="filter-item" v-waves icon="el-icon-back" @click="backBtn">返回</el-button>
        </div>
        <div class="toolmore-control">
            <div class="toolbar-item">
            <el-button class="filter-item" type="primary" v-waves icon="el-icon-download" @click="exportFile">导出Excel</el-button>
            </div>
        </div>
        <!-- <div class="toolbar-item">
            <el-button class="filter-item" type="primary" v-waves icon="el-icon-download" @click="exportFile">导出Excel</el-button>
        </div>
        <div class="toolbar-item">
            <el-button class="filter-item" v-waves icon="el-icon-back" @click="backBtn">返回</el-button>
        </div> -->
    </div>
    <el-alert
        title="备注：该表单位（元），所有显示费用为已审批完结费用。"
        class="remarkInfo"
        :closable="false"
        show-icon
        type="info">
    </el-alert>
    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%" max-height="660">
        <el-table-column align="center" label="科目名称"  width="120px" fixed>
            <template slot-scope="scope">
                <span class="ignore-detail">{{scope.row.subjectName}}</span>
            </template>
        </el-table-column>
        <el-table-column width="120px" align="center" :label="year+'年1月'">
            <template slot-scope="scope">
                <span class="ignore-detail" :title="scope.row.m1">{{scope.row.m1}}</span>
            </template>
        </el-table-column>
        <el-table-column :label="year+'年2月'" width="120px" align="center">
            <template slot-scope="scope">
                <span class="ignore-detail" :title="scope.row.m2">{{scope.row.m2}}</span>
            </template>
        </el-table-column>
        <el-table-column  align="center" :label="year+'年3月'" width="120px">
            <template slot-scope="scope">
                <span class="ignore-detail" :title="scope.row.m3">{{scope.row.m3}}</span>
            </template>
        </el-table-column>
        <el-table-column  :label="year+'年4月'" align="center" width="120px">
            <template slot-scope="scope">
                <span class="ignore-detail" :title="scope.row.m4">{{scope.row.m4}}</span>
            </template>
        </el-table-column>
        <el-table-column  :label="year+'年5月'" align="center" width="120px">
            <template slot-scope="scope">
                <span class="ignore-detail" :title="scope.row.m5">{{scope.row.m5 }}</span>
            </template>
        </el-table-column>
        <el-table-column  :label="year+'年6月'" align="center" width="120px">
            <template slot-scope="scope">
                <span class="ignore-detail" :title="scope.row.m6">{{scope.row.m6}}</span>
            </template>
        </el-table-column>
        <el-table-column  :label="year+'年7月'" align="center" width="120px">
            <template slot-scope="scope">
                <span class="ignore-detail" :title="scope.row.m7">{{scope.row.m7}}</span>
            </template>
        </el-table-column>
        <el-table-column :label="year+'年8月'" align="center" width="120px">
            <template slot-scope="scope">
                <span class="ignore-detail" :title="scope.row.m8">{{scope.row.m8}}</span>
            </template>
        </el-table-column>
        <el-table-column :label="year+'年9月'" align="center" width="120px">
            <template slot-scope="scope">
                <span class="ignore-detail" :title="scope.row.m9">{{scope.row.m9}}</span>
            </template>
        </el-table-column>
        <el-table-column :label="year+'年10月'" align="center" width="120px">
            <template slot-scope="scope">
                <span class="ignore-detail" :title="scope.row.m10">{{scope.row.m10}}</span>
            </template>
        </el-table-column>
        <el-table-column :label="year+'年11月'" align="center" width="120px">
            <template slot-scope="scope">
                <span class="ignore-detail" :title="scope.row.m11">{{scope.row.m11}}</span>
            </template>
        </el-table-column>
        <el-table-column :label="year+'年12月'" align="center" width="120px">
            <template slot-scope="scope">
                <span class="ignore-detail" :title="scope.row.m12">{{scope.row.m12}}</span>
            </template>
        </el-table-column>
        <el-table-column label="总计（行）" align="center" width="120px">
            <template slot-scope="scope">
                <span class="ignore-detail" :title="scope.row.rowTotal">{{scope.row.rowTotal}}</span>
            </template>
        </el-table-column>
        <el-table-column width="100px" align="center" label="操作" class-name="small-padding fixed-width">
            <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="handleUpdate(scope.row)" :disabled="scope.row.isDetail == 0">详情</el-button>
            </template>
        </el-table-column>
    </el-table>

    <div class="pagination-container">
        <el-pagination background  @current-change="handleCurrentChange" :current-page="listQuery.pageNo" :page-size="20" layout="total, prev, pager, next, jumper" :total="total">
        </el-pagination>
    </div>

  </div>
</template>

<script>
import common from '@/utils/common'
import { getProSubList ,downProSubFile} from '@/api/report'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'

export default {
    name: 'complexTable',
    directives: {
        waves
    },
    data() {
        return {
        tableKey: 0,
        year:"",
        list: [],
        total: 0,
        listLoading: true,
        yearList:[],
        listQuery: {
            pageNo: 1,
            pageSize: 20,
            firstCode: "",
            year: ""
        },
        }
    },
    created() {
        // this.year = new Date().getFullYear()
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
                    temp.push(arr[i])
                };
            }
            return temp
        }
        this.yearList = selectDic(dicList,"oa_report_year")

        //部门树
    },
    methods: {
        getList() {
            this.listLoading = true
            getProSubList({
                ...this.listQuery,
                projectId:this.$route.query.key
            }).then(res => {
                if(this.listQuery.pageNo == '1'){
                res.data.amountMonthSum.isDetail = "0";
                res.data.amountMonthSum.subjectName = "总计（列）";
                res.data.pageResponse.list.unshift(res.data.amountMonthSum);
                }
                this.year = res.data.year;
                this.list = res.data.pageResponse.list;
                this.total = res.data.pageResponse.total;
                this.listLoading = false;
            })
        },
        handleFilter() {
            if(this.listQuery.year){
                this.year = this.listQuery.year;
            }else{
                this.year = new Date().getFullYear();
            }
            this.listQuery.pageNo = 1;
            this.getList();
            this.listLoading = false;
        },
        handleCurrentChange(val) {
            this.listQuery.pageNo = val;
            this.getList();
            this.listLoading = false;
        },
        handleUpdate(row) {
            this.listQuery.firstCode = row.subjectCode;
            this.getList();
        },
        cleanrFilter(){
            this.$router.go(-1);
        },
        exportFile(){
            downProSubFile({
                projectId:this.$route.query.key,
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
        backBtn(){
            this.$router.go(-1);
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
    width: 250px
}

// .ignore-detail {
//     overflow : hidden;
//     text-overflow: ellipsis;
//     display: -webkit-box;
//     -webkit-line-clamp: 1;
//     -webkit-box-orient: vertical;
//     word-break: break-all;
// }
</style>