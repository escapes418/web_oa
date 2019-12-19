<template>
    <div class="sjb-container calendar-list-container">
        <div class="filter-container">
            <div class="toolbar-item" v-if="showSearch">
                <span class="item-label">年份：</span>
                <el-date-picker
                    :clearable="false"
                    v-model="year"
                    align="right"
                    type="year"
                    placeholder="选择年">
                </el-date-picker>
            </div>
            <div class="toolbar-item" v-if="showSearch">
                <span class="item-label">费用归属：</span>
                <el-select :clearable="false" style="width: 260px" class="filter-item" v-model="listQuery.costOwner" placeholder="请选择">
                    <el-option v-for="item in officeList" :key="item.officeId" :label="item.officeName" :value="item.officeId">
                    </el-option>
                </el-select>
            </div>
            <div class="toolbar-item" v-if="showSearch">
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
        <el-alert
            title="备注：该表单位（元），所有显示费用为已审批完结费用。"
            class="remarkInfo"
            :closable="false"
            show-icon
            type="info">
        </el-alert>
        <el-table :data="list" border fit highlight-current-row style="width: 100%"  max-height="660">
            <el-table-column align="center" label="科目名称"  width="120px" fixed>
                <template slot-scope="scope">
                    <span class="ignore-detail">{{scope.row.subjectName}}</span>
                </template>
            </el-table-column>
            <el-table-column width="120px" align="center" :label="year.getFullYear()+'年1月'">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.janCount">{{scope.row.janCount}}</span>
                </template>
            </el-table-column>
            <el-table-column :label="year.getFullYear()+'年2月'" width="120px" align="center">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.febCount">{{scope.row.febCount}}</span>
                </template>
            </el-table-column>
            <el-table-column  align="center" :label="year.getFullYear()+'年3月'" width="120px">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.marCount">{{scope.row.marCount}}</span>
                </template>
            </el-table-column>
            <el-table-column  :label="year.getFullYear()+'年4月'" align="center" width="120px">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.aprCount">{{scope.row.aprCount}}</span>
                </template>
            </el-table-column>
            <el-table-column  :label="year.getFullYear()+'年5月'" align="center" width="120px">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.mayCount">{{scope.row.mayCount}}</span>
                </template>
            </el-table-column>
            <el-table-column  :label="year.getFullYear()+'年6月'" align="center" width="120px">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.junCount">{{scope.row.junCount}}</span>
                </template>
            </el-table-column>
            <el-table-column  :label="year.getFullYear()+'年7月'" align="center" width="120px">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.julCount">{{scope.row.julCount}}</span>
                </template>
            </el-table-column>
            <el-table-column :label="year.getFullYear()+'年8月'" align="center" width="120px">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.augCount">{{scope.row.augCount}}</span>
                </template>
            </el-table-column>
            <el-table-column :label="year.getFullYear()+'年9月'" align="center" width="120px">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.sepCount">{{scope.row.sepCount}}</span>
                </template>
            </el-table-column>
            <el-table-column :label="year.getFullYear()+'年10月'" align="center" width="120px">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.octCount">{{scope.row.octCount}}</span>
                </template>
            </el-table-column>
            <el-table-column :label="year.getFullYear()+'年11月'" align="center" width="120px">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.novCount">{{scope.row.novCount}}</span>
                </template>
            </el-table-column>
            <el-table-column :label="year.getFullYear()+'年12月'" align="center" width="120px">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.decCount">{{scope.row.decCount}}</span>
                </template>
            </el-table-column>
            <el-table-column label="总计（行）" align="center" width="120px">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.yearTotal">{{scope.row.yearTotal}}</span>
                </template>
            </el-table-column>
            <el-table-column width="100px" align="center" label="操作" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="handleUpdate(scope.row)" :disabled="scope.row.hasDetail == 0">详情</el-button>
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
import { getFinanceList ,downSubFile,getOfficeList} from '@/api/report'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
import { toJS, fromJS, Map, List } from 'immutable';
import listQueryMix from '../../mixins/listQuery.mix'

export default {
    directives: {
        waves
    },
    mixins: [listQueryMix],
    data() {
        return {
            year:new Date(),
            list: [],
            total: 0,
            showSearch:true,
            officeList:[],
            pageNo: 1,
            pageSize: 20,
            listQuery: {
                costOwner: "1",
                year: "",
                subjectId:""
            },
        }
    },
    created() {
        this.$$queryStub = this.$$listQuery;
        this.getList()
    },
    mounted(){
       getOfficeList().then(res=>{
           if(res.status == 0){
               this.officeList = res.data
           }
       })

        //部门树
    },
    methods: {
        getList() {
            this.listQuery.year = common.timeParse(this.year)
            this.$$queryStub = fromJS(this.listQuery);
            var postData = this.$$queryStub.toJS();
            getFinanceList({
                ...postData,
                pageNo:this.pageNo,
                pageSize:this.pageSize
            }).then(res => {
                this.list = res.data.list;
                this.total = res.data.total;
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
        handleUpdate(row) {
            this.listQuery.subjectId = row.subjectId;
            this.getList();
            this.showSearch = false;
        },
        cleanrFilter(){
            if(!this.$$listQuery.toJS().year){
                this.year = new Date()
            }else{
                this.year = common.timeParseObj(this.listQuery.year);
            }
            this.listQuery.year = "";
            this.listQuery.subjectId = "";
            this.$$queryStub = this.$$listQuery;
            this.showSearch = true;
            this.getList();
        },
        restCallback(){
            this.year = new Date()
        },
        exportFile(){
            this.$$queryStub = fromJS(this.listQuery);
            var postData = this.$$queryStub.toJS();
            downSubFile({
                ...postData
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