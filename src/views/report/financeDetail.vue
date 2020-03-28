<template>
    <div class="sjb-container calendar-list-container">
        <div class="filter-container">
            <div class="toolbar-item">
                <el-button class="filter-item" v-waves icon="el-icon-back" @click="backBtn">返回</el-button>
            </div>
            <div class="toolmore-control">
                <div class="toolbar-item">
                    <el-button class="filter-item" type="primary" v-waves icon="el-icon-download" @click="exportFile">导出Excel</el-button>
                </div>
            </div>
        </div>
        <el-table :data="list" border fit highlight-current-row style="width: 100%"  max-height="660">
            <el-table-column align="center" label="科目名称"  width="120px" fixed>
                <template slot-scope="scope">
                    <span class="ignore-detail">{{scope.row.subjectName}}</span>
                </template>
            </el-table-column>
            <el-table-column width="120px" align="center" :label="listQuery.year.getFullYear()+'年1月'">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.janCount">{{scope.row.janCount}}</span>
                </template>
            </el-table-column>
            <el-table-column :label="listQuery.year.getFullYear()+'年2月'" width="120px" align="center">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.febCount">{{scope.row.febCount}}</span>
                </template>
            </el-table-column>
            <el-table-column  align="center" :label="listQuery.year.getFullYear()+'年3月'" width="120px">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.marCount">{{scope.row.marCount}}</span>
                </template>
            </el-table-column>
            <el-table-column  :label="listQuery.year.getFullYear()+'年4月'" align="center" width="120px">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.aprCount">{{scope.row.aprCount}}</span>
                </template>
            </el-table-column>
            <el-table-column  :label="listQuery.year.getFullYear()+'年5月'" align="center" width="120px">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.mayCount">{{scope.row.mayCount}}</span>
                </template>
            </el-table-column>
            <el-table-column  :label="listQuery.year.getFullYear()+'年6月'" align="center" width="120px">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.junCount">{{scope.row.junCount}}</span>
                </template>
            </el-table-column>
            <el-table-column  :label="listQuery.year.getFullYear()+'年7月'" align="center" width="120px">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.julCount">{{scope.row.julCount}}</span>
                </template>
            </el-table-column>
            <el-table-column :label="listQuery.year.getFullYear()+'年8月'" align="center" width="120px">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.augCount">{{scope.row.augCount}}</span>
                </template>
            </el-table-column>
            <el-table-column :label="listQuery.year.getFullYear()+'年9月'" align="center" width="120px">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.sepCount">{{scope.row.sepCount}}</span>
                </template>
            </el-table-column>
            <el-table-column :label="listQuery.year.getFullYear()+'年10月'" align="center" width="120px">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.octCount">{{scope.row.octCount}}</span>
                </template>
            </el-table-column>
            <el-table-column :label="listQuery.year.getFullYear()+'年11月'" align="center" width="120px">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.novCount">{{scope.row.novCount}}</span>
                </template>
            </el-table-column>
            <el-table-column :label="listQuery.year.getFullYear()+'年12月'" align="center" width="120px">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.decCount">{{scope.row.decCount}}</span>
                </template>
            </el-table-column>
            <el-table-column label="总计（行）" align="center" width="120px">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.yearTotal">{{scope.row.yearTotal}}</span>
                </template>
            </el-table-column>
        </el-table>

        <div class="pagination-container">
            <el-pagination background  @current-change="handleCurrentChange" :current-page="pageNo" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import common from '@/utils/common'
import { getFinanceDetail ,downSubFile} from '@/api/report'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
import { toJS, fromJS, Map, List } from 'immutable';
import listQueryMix from '../../mixins/listQuery.mix'

export default {
    mixins: [listQueryMix],
    data() {
        return {
            list: [],
            total: 0,
            pageNo: 1,
            pageSize: 20,
            listQuery: {
                year: "",
                subjectId:""
            },
        }
    },
    created() {
        if(this.$route.query.subjectId) this.listQuery.subjectId = this.$route.query.subjectId;
        if(this.$route.query.year) this.listQuery.year = this.$route.query.year;
        this.$$queryStub = this.$$listQuery;
        this.getList()
    },
    mounted(){
        //部门树
    },
    methods: {
        getList() {
            this.$$queryStub = fromJS(this.listQuery);
            var postData = this.$$queryStub.toJS();
            getFinanceList({
                ...postData,
                pageNo:this.pageNo,
                pageSize:this.pageSize
            }).then(res => {
                this.list = res.data.page.list;
                this.total = res.data.page.total;
            })
        },
        handleFilter() {
            this.pageNo = 1;
            this.getList();
        },
        handleCurrentChange(val) {
            this.pageNo = val;
            this.getList();
        },
        restCallback(){

        },
        backBtn(){
            this.$router.push({
                path:'/report/financeDetail',
            })
        },
        exportFile(){
            this.$$queryStub = fromJS(this.listQuery);
            var postData = this.$$queryStub.toJS();
            downSubFile({
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