<template>
    <div class="sjb-container calendar-list-container">
        <div class="filter-container">
            <div class="toolbar-item">
                <el-button class="filter-item" icon="el-icon-back" @click="goBack">返回</el-button>
            </div>
            <div class="toolmore-control">
                <div class="toolbar-item">
                <el-button class="filter-item" type="primary" icon="el-icon-download" @click="exportFile">导出Excel</el-button>
                </div>
            </div>
        </div>
        <el-alert
            title="备注：该表单位（个）"
            class="remarkInfo"
            :closable="false"
            show-icon
            type="info">
        </el-alert>
        <el-table :data="list" border fit highlight-current-row style="width: 100%" max-height="620">
            <el-table-column align="center" label="员工姓名"  width="200px" fixed>
                <template slot-scope="scope" >
                    <span>{{scope.row.employeeName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="上门拜访量">
                <template slot-scope="scope">
                    <span class="ignore-detail">{{scope.row.visitTotal}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" width="180px" label="上门拜访量（未签约客户）">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.visitNotSigned">{{scope.row.visitNotSigned}}</span>
                </template>
            </el-table-column>
            <el-table-column width="180px" label="上门拜访量（签约客户）" align="center">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.visitSigned">{{scope.row.visitSigned}}</span>
                </template>
            </el-table-column>
            <el-table-column  align="center" label="电话拜访总量">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.callTotal">{{scope.row.callTotal}}</span>
                </template>
            </el-table-column>
            <el-table-column width="180px" label="电话拜访量（未签约客户）" align="center">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.callNotSigned">{{scope.row.callNotSigned}}</span>
                </template>
            </el-table-column>
            <el-table-column width="180px" label="电话拜访量（签约客户）" align="center">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.callSigned">{{scope.row.callSigned}}</span>
                </template>
            </el-table-column>
            <el-table-column  label="新增签约数量" align="center">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.signedIncrease">{{scope.row.signedIncrease}}</span>
                </template>
            </el-table-column>
            <el-table-column  label="减少签约数量" align="center">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.signedReduce">{{scope.row.signedReduce}}</span>
                </template>
            </el-table-column>
            <el-table-column label="新增客户数" align="center">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.customerIncrease">{{scope.row.customerIncrease}}</span>
                </template>
            </el-table-column>
            <el-table-column label="捡入客户数" align="center">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.customerPicked">{{scope.row.customerPicked}}</span>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script>
// import common from '@/utils/common'
import { getSalesMan ,exportSalesMan} from '@/api/report'
// import Department from "@/components/Department";
// import waves from '@/directive/waves' // 水波纹指令
// import { parseTime } from '@/utils'
// import { toJS, fromJS, Map, List } from 'immutable';
// import listQueryMix from '../../mixins/listQuery.mix'

export default {
    data() {
        return {
            list: [],
            total: 0,
        }
    },
  
    created() {
        this.getList();
    },
    mounted(){

        //部门树
    },
    methods: {
        getList() {
            getSalesMan({
                ...this.$route.query
            }).then(res => {
                
                this.list = res.data;
            })
        },
        goBack(){
            this.$router.go(-1);
        },
        exportFile(){
            exportSalesMan({
                ...this.$route.query
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
</style>