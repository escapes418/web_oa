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
                <span class="item-label">客户编号/名称查询：</span>
                <el-input @keyup.enter.native="handleFilter" style="width: 180px;" class="filter-item" placeholder="请输入客户编号/名称" v-model.trim="listQuery.faint">
                </el-input>
            </div>
            <div class="toolbar-item">
                <span class="item-label">vip客服负责人：</span>
                <el-select clearable filterable class="filter-item ignore-detail" v-model="listQuery.vipCustomerId" placeholder="请选择vip客服负责人" style="width:180px;">
                    <el-option v-for="item in memberFullList" :label="item.name" :value="item.id" :key="item.id">
                    </el-option>
                </el-select>
            </div>
            <div class="toolbar-item">
                <span class="item-label">维护次数：</span>
                <el-input @keyup.enter.native="handleFilter" style="width: 180px;" class="filter-item" placeholder="请输入维护次数" v-model.trim="listQuery.maintainCount">
                </el-input>
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
        <el-table :data="list" border fit highlight-current-row style="width: 100%">
            <el-table-column align="center" label="主客户编号">
                <template slot-scope="scope">
                    <span class="ignore-detail">{{scope.row.custCode}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="主客户名称">
                <template slot-scope="scope">
                    <span class="ignore-detail">{{scope.row.custName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="首次跑单时间">
                <template slot-scope="scope">
                    <span class="ignore-detail">{{scope.row.firstOrderTime | stamp2TextDateFull}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="vip客服负责人">
                <template slot-scope="scope">
                    <span class="ignore-detail">{{scope.row.vipCustomerName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="主动维护次数">
                <template slot-scope="scope">
                    <span class="ignore-detail">{{scope.row.maintainCount}}</span>
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
import { getMaintainStatistic ,getMember} from '@/api/report'
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
            month:new Date(),
            pageNo: 1,
            pageSize: 20,
            total: 0,
            listQuery: {
                compleMonth: "",
                faint:"",
                maintainCount:"",
                vipCustomerId:""
            },
            memberFullList:[]
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
            getMaintainStatistic({
                ...postData,
                pageNo:this.pageNo,
                pageSize:this.pageSize
            }).then(res => {
                if (res.code == 200) {
                    this.list = res.data.list;
                    this.total = res.data.total;
                }
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
        //         if(res.code == 200){
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