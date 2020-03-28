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
        <el-table :data="list" border fit highlight-current-row style="width: 100%"  max-height="760">
            <el-table-column align="center" label="功能编号"  width="80px" fixed>
                <template slot-scope="scope">
                    <span class="ignore-detail">{{scope.row.subjectCode}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="编号"  width="70px" fixed>
                <template slot-scope="scope">
                    <span class="ignore-detail">{{scope.row.order}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="功能" fixed>
                <template slot-scope="scope">
                    <span class="ignore-detail">{{scope.row.function}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="上线时间"  width="100px" fixed>
                <template slot-scope="scope">
                    <span class="ignore-detail">{{scope.row.onlineTime}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="产品端"  width="100px" fixed>
                <template slot-scope="scope">
                    <span class="ignore-detail">{{scope.row.producSide}}</span>
                </template>
            </el-table-column>
            <el-table-column width="100px" align="center" :label="year+'年1月'">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.tJan">{{scope.row.tJan}}</span>
                </template>
            </el-table-column>
            <el-table-column :label="year+'年2月'" width="100px" align="center">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.tFeb">{{scope.row.tFeb}}</span>
                </template>
            </el-table-column>
            <el-table-column  align="center" :label="year+'年3月'" width="100px">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.tMar">{{scope.row.tMar}}</span>
                </template>
            </el-table-column>
            <el-table-column  :label="year+'年4月'" align="center" width="100px">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.tApr">{{scope.row.tApr}}</span>
                </template>
            </el-table-column>
            <el-table-column  :label="year+'年5月'" align="center" width="100px">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.tMay">{{scope.row.tMay }}</span>
                </template>
            </el-table-column>
            <el-table-column  :label="year+'年6月'" align="center" width="100px">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.tJun">{{scope.row.tJun}}</span>
                </template>
            </el-table-column>
            <el-table-column  :label="year+'年7月'" align="center" width="100px">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.tJul">{{scope.row.tJul}}</span>
                </template>
            </el-table-column>
            <el-table-column :label="year+'年8月'" align="center" width="100px">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.tAug">{{scope.row.tAug}}</span>
                </template>
            </el-table-column>
            <el-table-column :label="year+'年9月'" align="center" width="100px">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.tSept">{{scope.row.tSept}}</span>
                </template>
            </el-table-column>
            <el-table-column :label="year+'年10月'" align="center" width="100px">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.tOct">{{scope.row.tOct}}</span>
                </template>
            </el-table-column>
            <el-table-column :label="year+'年11月'" align="center" width="100px">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.tNov">{{scope.row.tNov}}</span>
                </template>
            </el-table-column>
            <el-table-column :label="year+'年12月'" align="center" width="100px">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.tDec">{{scope.row.tDec}}</span>
                </template>
            </el-table-column>
        </el-table>
        <!-- <div class="pagination-container">
            <el-pagination background  @current-change="handleCurrentChange" :current-page="pageNo" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div> -->
    </div>
</template>

<script>
import common from '@/utils/common'
import { getSubmit ,downSubmit} from '@/api/report'
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
    data() {
        return {
            year:"",
            list: [],
            yearList:[],
            // pageNo:1,
            // pageSize:20,
            listQuery: {
                year: ""
            },
        }
    },
    created() {
        this.$$queryStub = this.$$listQuery;
        this.year = new Date().getFullYear()
        this.getList()
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
    },
    methods: {
        getList() {
            var postData = this.$$queryStub.toJS();
            getSubmit({
                ...postData,
                // pageNo:this.pageNo,
                // pageSize:this.pageSize
            }).then(res => {
                res.data.forEach((item,index) => {
                    item.order = index+1
                });
                this.list = res.data
            })
        },
        handleFilter() {
            if(!this.listQuery.year){
                this.year = new Date().getFullYear();
            }else{
                this.year = this.listQuery.year;
            }
            // this.pageNo = 1;
            this.$$queryStub = fromJS(this.listQuery);
            this.getList();
        },
        // handleCurrentChange(val){
        //     this.pageNo = val;
        //     this.getList();
        // },
        restCallback(){

        },
        exportFile(){
            downSubmit({
                year:this.listQuery.year
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

.ignore-detail {
    // overflow : hidden;
    // text-overflow: ellipsis;
    // display: -webkit-box;
    // -webkit-line-clamp: 1;
    // -webkit-box-orient: vertical;
    // word-break: break-all;
}
</style>