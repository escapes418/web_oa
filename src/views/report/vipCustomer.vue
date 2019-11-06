<template>
    <div class="sjb-container calendar-list-container">
        <div class="filter-container">
            <div class="toolbar-item" >
                <span class="item-label">月份：</span>
                <el-date-picker
                    v-model="month"
                    type="month"
                    :clearable="false"
                    placeholder="选择月">
                </el-date-picker>
            </div>
            <div class="toolbar-item">
                <span class="item-label">人员姓名：</span>
                <el-select clearable filterable class="filter-item ignore-detail" v-model="listQuery.complerId" placeholder="请选择人员名称" style="width:180px;">
                    <el-option v-for="item in memberFullList" :label="item.name" :value="item.id" :key="item.id">
                    </el-option>
                </el-select>
            </div>
           
            <div class="toolbar-item">
                <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
                <el-button class="filter-item" type="warning" v-waves icon="el-icon-delete" @click="restListQuery(restCallback)">重置</el-button>
            </div>
            <!-- <div class="toolmore-control">
                <div class="toolbar-item">
                <el-button class="filter-item" type="primary" v-waves icon="el-icon-download" @click="exportFile">导出Excel</el-button>
                </div>
            </div> -->
        </div>
        <el-alert
            title="月初维护企业数为每月1号需维护的企业数，本月完成率=维护了两次及以上的企业数/需维护企业数，需维护企业数=月初维护企业数+本月新增数-本月减少数"
            class="remarkInfo"
            :closable="false"
            show-icon
            type="info">
        </el-alert>
        <el-table :data="list" border fit highlight-current-row style="width: 100%"  max-height="660">
            <el-table-column align="center" label="人员姓名">
                <template slot-scope="scope">
                    <span class="ignore-detail">{{scope.row.complerName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="月初维护企业数">
                <template slot-scope="scope">
                    <span class="ignore-detail">{{scope.row.beginCount}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="本月新增数">
                <template slot-scope="scope">
                    <span class="ignore-detail">{{scope.row.compleAddCount}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="本月减少数">
                <template slot-scope="scope">
                    <span class="ignore-detail">{{scope.row.compleReduceCount}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="需维护企业数">
                <template slot-scope="scope">
                    <span class="ignore-detail">{{scope.row.sumCount}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="本月完成率">
                <template slot-scope="scope">
                    <span class="ignore-detail">{{scope.row.percentage}}%</span>
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
import { getVipCustomer ,getMember} from '@/api/report'
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
            list: [],
            pageNo: 1,
            pageSize: 20,
            total: 0,
            memberFullList: [],
            month:new Date(),
            listQuery: {
                compleMonth: "",
                complerId:""
            },
        }
    },
    created() {
        this.listQuery.compleMonth = common.timeParse(this.month);
        this.$$queryStub = fromJS(this.listQuery);
        this.getList()
    },
    mounted(){
        getMember({}).then(res => {
            this.memberFullList = res.data;
            // this.memberList = res.data.filter((item)=>{
            //     return item.userStatus == '1'
            // });
        })
    },
    methods: {
        getList() {
            var postData = this.$$queryStub.toJS();
            getVipCustomer({
                ...postData
            }).then(res => {
                if(this.pageNo == '1'){
                    res.data.completionRateSum.complerName = "总计（列）";
                    res.data.page.list.unshift(res.data.completionRateSum);
                }
                this.list = res.data.page.list;
                this.total = res.data.page.total;
            })
        },
        handleFilter() {
            this.listQuery.compleMonth = common.timeParse(this.month);
            this.$$queryStub = fromJS(this.listQuery);
            this.getList();
        },
        restCallback(){
            this.month = new Date()
        },
        handleCurrentChange(val){
            this.pageNo = val
            this.getList()
        },
        // exportFile(){
        //     var postData = this.$$queryStub.toJS();
        //     downApprove({
        //         ...postData,
        //     }).then(res=>{
        //         if(res.status == 0){
        //             var url = `./OA${res.data}`;
        //             window.location.href = url;
        //             this.$message({
        //                 message:res.message,
        //                 type:'success'
        //             })
        //         }
        //     })
        // }
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

</style>