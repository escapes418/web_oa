<template>
    <div class="sjb-container calendar-list-container">
        <div class="filter-container">
            <Department type="list" @on-confirm="depConfirm" :Dvalue="listQuery.officeName"></Department>
            <div class="toolbar-item">
                <span class="item-label">时间：</span>
                <el-select clearable style="width: 220px" class="filter-item" v-model="listQuery.timeType" placeholder="请选择">
                    <el-option v-for="item in timeTypeList" :key="item.value" :label="item.name" :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="toolbar-item" v-if="listQuery.timeType == 6">
                <span class="item-label">自定义时间：</span>
                <el-date-picker v-model="listQuery.timeRange" type="daterange" class="filter-item" style="width:287px" placeholder="选择日期范围" :picker-options="pickerOptions">
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
            title="备注：该表单位（元），所有显示费用为已审批完结费用。"
            class="remarkInfo"
            :closable="false"
            show-icon
            type="info">
        </el-alert>
        <el-table :data="list" border fit highlight-current-row style="width: 100%" max-height="620">
            <el-table-column align="center" label="部门"  width="200px" fixed>
                <template slot-scope="scope" >
                    <span style="color:#409EFF;cursor: Pointer;"  @click="showDetail(scope.row)">{{scope.row.officeName}}</span>
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
import common from '@/utils/common'
import { getSalesOffice ,downEmpFile} from '@/api/report'
import Department from "@/components/Department";
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
import { toJS, fromJS, Map, List } from 'immutable';
import listQueryMix from '../../mixins/listQuery.mix'

export default {
    components: {
        Department
    },
    directives: {
        waves
    },
    mixins: [listQueryMix],
    data() {
        return {
            list: [],
            total: 0,

            timeTypeList:[],
            pageNo: 1,
            pageSize: 20,
            listQuery: {
                officeName:"营销中心",
                tempChoice:{},
                officeId: "15725250",//默认市场中心
                timeType: "",
                timeRange:[]
            },

            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            },
        }
    },
  
    created() {
        this.$$queryStub = this.$$listQuery;
        this.getList();
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
        this.timeTypeList = selectDic(dicList,"salesWorkStat_timeType");
        //部门树
    },
    methods: {
        getList() {
            var postData = this.reduceParams(this.$$queryStub);
            getSalesOffice({
                ...postData,
                // pageNo:this.pageNo,
                // pageSize:this.pageSize
            }).then(res => {
                
                this.list = res.data;
                // this.total = res.data.pageResponse.total;
            })
        },
        reduceParams($$imData) {
            if (!$$imData || $$imData.size == 0) return {};
            const $$postData = $$imData
                .set('beginTime', common.rangeObjToTimestamp($$imData.get('timeRange').toJS()).applyTimeStart)
                .set('endTime', common.rangeObjToTimestamp($$imData.get('timeRange').toJS()).applyTimeEnd)
                .delete('officeName')
                .delete('tempChoice')
                .delete('timeRange')
                return $$postData.toJS();
        },
        restCallback(){

        },  
        depConfirm(data){ 
            if(data){
                this.listQuery.officeId = data.id;
                this.listQuery.officeName = data.name;
            }else{
                this.listQuery.officeId = "";
                this.listQuery.officeName = "";
            }
        }, 
        handleFilter() {
            this.$$queryStub = fromJS(this.listQuery);
            this.pageNo = 1;
            this.getList();
        },
        handleCurrentChange(val) {
            this.pageNo = val;
            this.getList();
        },
        showDetail(row) {
            var postData = this.reduceParams(this.$$queryStub);
            this.$router.push({
                path:'/report/saleManStatistic',
                query: {...postData,officeId:row.officeId}
            })
        },
        cleanrFilter(){
            this.listQuery.year = "";
            this.depart = "";
            this.listQuery.officeId ="";
            this.listQuery.employeeName ="";
            this.listQuery.pageNo = 1;
            this.year = new Date().getFullYear();
            this.getList();
        },
        exportFile(){
            downEmpFile({
                year:this.listQuery.year
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