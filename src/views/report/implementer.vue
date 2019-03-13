<template>
    <div class="sjb-container calendar-list-container">
        <div class="filter-container">
            <div class="toolbar-item">
                <span class="item-label">选择月份：</span>
                <el-date-picker
                    v-model="listQuery.dateTime"
                    :picker-options="pickerOptions"
                    :clearable="false"
                    type="month"
                    placeholder="选择月份">
                </el-date-picker>
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
        
        <el-alert
            title="备注：该表单位（天）"
            class="remarkInfo"
            :closable="false"
            show-icon
            type="info">
        </el-alert>
        <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%" max-height="660">
            <el-table-column align="center" label="部门" fixed>
                <template slot-scope="scope">
                    <span class="ignore-detail">{{scope.row.officeName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="岗位名称" fixed>
                <template slot-scope="scope">
                    <span class="ignore-detail">{{scope.row.postName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="姓名" fixed>
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.userName">{{scope.row.userName}}</span>
                </template>
            </el-table-column>
            <el-table-column label="项目中" align="center">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.projectInDays">
                        {{scope.row.projectInDays}}
                    </span>
                </template>
            </el-table-column>
            <!-- <el-table-column  align="center" label="调休中">
                <template slot-scope="scope">
                <span class="ignore-detail" :title="scope.row.m3">{{scope.row.m3}}</span>
                </template>
            </el-table-column>
            <el-table-column  label="请假中" align="center">
                <template slot-scope="scope">
                <span class="ignore-detail" :title="scope.row.m4">{{scope.row.m4}}</span>
                </template>
            </el-table-column> -->
            <el-table-column  label="待命中" align="center">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.inOutDays">{{scope.row.inOutDays}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="pagination-container">
            <el-pagination background  @current-change="handleCurrentChange" :current-page="pageNo" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>

        <el-dialog :title="personName +'当月项目中统计'" :visible.sync="dialogVisible">
            <div class="dialog" style="margin-top:10px">
                <el-table :data="monthList" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%;">
                    <el-table-column align="center" label="项目名称">
                        <template slot-scope="scope">
                            <span class="ignore-detail" :title="scope.row.projectName">{{scope.row.projectName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="地点节点">
                        <template slot-scope="scope">
                            <span class="ignore-detail" :title="scope.row.projectNodeName">
                                {{scope.row.projectNodeName}}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="天数">
                        <template slot-scope="scope">
                            <span>{{scope.row.projectInDays}}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <div class="pagination-container" style="margin-top:20px">
                <el-pagination background @current-change="monthCurrentChange" :current-page="monthPageNo" :page-size="monthPageSize" layout="total, prev, pager, next, jumper" :total="monthTotal">
                </el-pagination>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">返回</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import common from '@/utils/common'
import { getImpleStatusList,getMonthList ,downImpleMonthList} from '@/api/report'
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
        pickerOptions: {
            disabledDate(time) {
                return time.getTime() > Date.now();
            }
        },
        tableKey: 0,
        personName:"",
        list: [],
        total: 0,
        listLoading: true,
        yearList:[],
        pageNo: 1,
        pageSize: 20,
        listQuery: {
            dateTime: new Date(),
            
        },

        monthList:[],
        dialogVisible:false,
        id:"",
        monthPageNo:1,
        monthPageSize:10,
        monthTotal:0,
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
        this.yearList = selectDic(dicList,"oa_report_year");

        //部门树
    },
    methods: {
        getList() {
            this.listLoading = true
            var postData = this.reduceParams(this.$$queryStub);
            getImpleStatusList({
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
            this.listQuery.firstCode = "";
            if(!this.listQuery.year){
                this.year = new Date().getFullYear();
            }else{
                this.year = this.listQuery.year;
            }
            this.$$queryStub = fromJS(this.listQuery);
            this.pageNo = 1
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
            this.personName = row.userName;
            this.id = row.userId;
            this.getDeatil();
        },
        restCallback(){
            
        },
        getDeatil(){
            getMonthList({ 
                dateTime: common.timeParse(this.$$queryStub.get('dateTime')),
                userId:this.id,
                pageNo:this.monthPageNo,
                pageSize:this.monthPageSize
            }).then(res=>{
                this.monthList = res.data.list;
                this.monthTotal = res.data.total;
            })
        },
        cleanrFilter(){
            if(!this.$$listQuery.toJS().year){
                this.year = new Date().getFullYear();
            }else{
                this.year = this.listQuery.year;
            }
            this.listQuery.year = "";
            this.$$queryStub = this.$$listQuery;
            this.showSearch = true;
            this.getList();
        },
        exportFile(){
            var postData = this.reduceParams(this.$$queryStub);
            downImpleMonthList({
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
        },
        monthCurrentChange(val){
            this.monthPageNo = val;
            this.getDeatil();

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
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
}
</style>