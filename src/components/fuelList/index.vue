<template>
    <el-table :data="list" border fit highlight-current-row style="width: 100%">
        <el-table-column align="center" label="月份" width="80px">
            <template slot-scope="scope" >
                <span class="ignore-detail" :title="scope.row.month">{{scope.row.month}}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="卡号">
            <template slot-scope="scope">
                <span class="ignore-detail" :title="scope.row.cardNo">{{scope.row.cardNo}}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="姓名" width="100px">
            <template slot-scope="scope">
                <span class="ignore-detail">{{scope.row.employeeName}}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="卡类型" width="100px">
            <template slot-scope="scope">
                <span class="ignore-detail">{{scope.row.cardType}}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="期初余额" width="120px">
            <template slot-scope="scope">
                <span>{{scope.row.initAmount}}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="期末余额" width="120px">
            <template slot-scope="scope">
                <span>{{scope.row.endAmount}}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="消费金额" width="120px">
            <template slot-scope="scope">
                <span>{{scope.row.consumptionAmount}}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="拟充值余额" width="120px">
            <template slot-scope="scope">
                <span>{{scope.row.rechargeAmount}}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="充值后余额" width="120px">
            <template slot-scope="scope">
                <span>{{scope.row.rechargeTotalAmount}}</span>
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
import { getFuelDetail } from "@/api/report";
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
            getFuelDetail({
                employeeId:this.employeeId,
                year:this.year
            }).then(res=>{
                if(res.status == 0){
                    this.list= res.data
                }
            })
        }
    }
}
</script>