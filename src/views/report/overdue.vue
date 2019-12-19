<template>
    <div class="sjb-container calendar-list-container">
        <div class="filter-container">
            <div class="toolmore-control">
                <div class="toolbar-item">
                    <el-button class="filter-item" type="primary" icon="el-icon-download" @click="exportFile">导出Excel</el-button>
                </div>
            </div>
        </div>
        
        <template>
            <el-tabs v-model="overdue" @tab-click="handleClick">
                <el-tab-pane label="逾期4-7天" name="1"></el-tab-pane>
                <el-tab-pane label="逾期8-11天" name="2"></el-tab-pane>
                <el-tab-pane label="逾期11天以上" name="3"></el-tab-pane>
            </el-tabs>
        </template>
        <el-table :data="list" border fit highlight-current-row style="width: 100%">
            <el-table-column align="center" label="部门">
                <template slot-scope="scope">
                    <span class="ignore-detail">{{scope.row.officeName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="提交人">
                <template slot-scope="scope">
                    <span class="ignore-detail">{{scope.row.applyPerName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="开户时间">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.openAccountTimes">{{scope.row.openAccountTimes}}</span>
                </template>
            </el-table-column>
            <el-table-column label="逾期天数" align="center">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.overdueDays">
                        {{scope.row.overdueDays}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column  align="center" label="流程编号">
                <template slot-scope="scope">
                <span class="ignore-detail" :title="scope.row.procCode">{{scope.row.procCode}}</span>
                </template>
            </el-table-column>
            <el-table-column  label="合同名称" align="center">
                <template slot-scope="scope">
                <span class="ignore-detail" :title="scope.row.contractName">{{scope.row.contractName}}</span>
                </template>
            </el-table-column>
            <el-table-column  label="甲方名称" align="center">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.firstMemberName">{{scope.row.firstMemberName}}</span>
                </template>
            </el-table-column>
            <el-table-column  label="乙方名称" align="center">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.secondMemberName">{{scope.row.secondMemberName}}</span>
                </template>
            </el-table-column>
            <el-table-column  label="丙方名称" align="center">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.thirdMemberName">{{scope.row.thirdMemberName}}</span>
                </template>
            </el-table-column>
            <el-table-column  label="审批状态" align="center">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.contractFlowStatus">{{scope.row.contractFlowStatus}}</span>
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

    </div>
</template>

<script lang='ts'>
import common from '@/utils/common'
import { overdueList ,exportOverdue} from '@/api/report'
import { Vue, Component ,Watch} from "vue-property-decorator";
import { State, Getter, Mutation, Action } from "vuex-class";
import { OVERDUE_list} from "./interface";

@Component({
    components: {},
})

export default class overdue extends Vue{
    /* data */
    overdue:string='';
    list: Array<OVERDUE_list> = [];
    pageNo:number = 1;
    pageSize:number = 20;
    total:number = 0;


    //store
    @State(state => state.overdue.nums) overdueType;
    @Action changeNum;


    created() {
        this.overdue = this.overdueType
        this.getList()
    }
    mounted(){

    }
    getList():void{
        overdueList({
            overdueType:this.overdueType,
            pageNo:this.pageNo,
            pageSize:this.pageSize
        }).then((res:Ajax.AjaxResponse) => {
            this.list = res.data.list;
            this.total = res.data.total;
        })
    }


    handleCurrentChange(val):void{
        this.pageNo = val;
        this.getList();
    }

    /* methods */
    handleUpdate(row):void{
        this.$router.push({
            path:'/me/contractCheckDetail',
            query: { key: row.contractFlowId ,pathType:'list'}
        })
    }
    restCallback(){

    }
    exportFile(){
        exportOverdue({
            pageNo:this.pageNo,
            pageSize:this.pageSize
        }).then((res:Ajax.AjaxResponse)=>{
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
    handleClick(val:any){
        this.changeNum(val.name)
        this.getList()
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