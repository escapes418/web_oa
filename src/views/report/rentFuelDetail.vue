<template>
    <div class="sjb-container calendar-list-container">
        <div class="filter-container">
            <div class="toolbar-item">
                <el-button class="filter-item" icon="el-icon-back" @click="backBtn">返回</el-button>
            </div>
        </div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="租车情况" name="1">
                <rent-car-list :employeeId="employeeId" :year="year"></rent-car-list>
            </el-tab-pane>
            <el-tab-pane label="加油情况" name="2">
                <fuel-list :employeeId="employeeId" :year="year"></fuel-list>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import FuelList from '@/components/fuelList';
import rentCarList from '@/components/rentCarList';
export default {
    components:{
        rentCarList,
        FuelList
    },
    data() {
        return {
            activeName:"1",
            employeeId:"",
            year:""
        }
    },
    created() {
        if(this.$route.query.employeeId) this.employeeId = this.$route.query.employeeId;
        if(this.$route.query.year) this.year = this.$route.query.year;
    },
    mounted(){

    },
    methods: {
        handleClick(val){
            this.activeName = val.name
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

</style>