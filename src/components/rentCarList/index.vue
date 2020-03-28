<template>
    <el-table :data="list" border fit highlight-current-row style="width: 100%">
        <el-table-column align="center" label="月份" width="80px">
            <template slot-scope="scope" >
                <span class="ignore-detail" :title="scope.row.month">{{scope.row.month}}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="订单号">
            <template slot-scope="scope">
                <span class="ignore-detail" :title="scope.row.orderNo">{{scope.row.orderNo}}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="用车人" width="100px">
            <template slot-scope="scope">
                <span class="ignore-detail">{{scope.row.rentCarUser}}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="车型" width="200px">
            <template slot-scope="scope">
                <span class="ignore-detail">{{scope.row.vehicleModel}}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="预订时间" width="150px">
            <template slot-scope="scope">
                <span>{{scope.row.orderTime | stamp2TextDateFull}}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="租期" width="100px">
            <template slot-scope="scope">
                <span>{{scope.row.rentDay}}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="订单金额" width="120px">
            <template slot-scope="scope">
                <span>{{scope.row.orderAmount}}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="订单状态" width="120px">
            <template slot-scope="scope">
                <span>{{scope.row.orderStatusName}}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="违章押金" width="120px">
            <template slot-scope="scope">
                <span>{{scope.row.illegalAmount}}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="退还押金" width="120px">
            <template slot-scope="scope">
                <span>{{scope.row.backAmount}}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="工资扣除" width="120px">
            <template slot-scope="scope">
                <span>{{scope.row.salaryDeductAmount}}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="备注">
            <template slot-scope="scope">
                <span>{{scope.row.remarks}}</span>
            </template>
        </el-table-column>
    </el-table>
</template>
<script>
import { getCarDetail } from "@/api/report";
export default {
    data() {
        return {
            list: [],
        }
    },
    props:{
        employeeId:String,
        year:Number
    },
    created() {
        this.getList()
    },
    methods:{
        getList() {
            getCarDetail({
                employeeId:this.employeeId,
                year:this.year
            }).then(res=>{
                if(res.code == 200){
                    this.list= res.data
                }
            })
        }
    }
}
</script>