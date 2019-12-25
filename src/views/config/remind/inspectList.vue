<template>
    <div class="sjb-container calendar-list-container">
        <div class="filter-container">
            <div class="toolmore-control">
                <div class="toolbar-item">
                    <el-button class="filter-item" type="primary" @click="handleCreate" icon="el-icon-edit">新增</el-button>
                </div>
            </div>
        </div>

        <el-table :data="list" border fit highlight-current-row style="width: 100%">
            <!-- <el-table-column align="center" label="流程编号" width="160px">
                <template slot-scope="scope">
                    <span class="ignore-detail" style="color:#409EFF;cursor: Pointer;" :title="scope.row.id" @click="showDetail(scope.row)">{{scope.row.id}}</span>
                </template>
            </el-table-column> -->
            <el-table-column align="center" label="提醒类型">
                <template slot-scope="scope">
                    <span class="ignore-detail">{{scope.row.remindType=="0" ? "报销申请" : scope.row.remindType=="1" ? "接待申请":scope.row.remindType=="2" ? "出差申请":scope.row.remindType=="3"?"合同申请":scope.row.remindType=="4"?"协作申请":scope.row.remindType=="5"?"立项申请":scope.row.remindType=="6"?"借款申请":scope.row.remindType=="7"?"还款申请":scope.row.remindType=="8"?"付款申请":""}}</span>
                </template>
            </el-table-column>
            
            <el-table-column align="center" label="频率" width="200px">
                <template slot-scope="scope">
                    <span>即时发送</span>
                </template>
            </el-table-column>
            <el-table-column width="160px" align="center" label="提醒方式">
                <template slot-scope="scope">
                    <span>{{scope.row.remindWayName.join(', ')}}</span>
                </template>
            </el-table-column>
            <el-table-column width="160px" align="center" label="提醒对象">
                <template slot-scope="scope">
                    <span>当前审批人</span>
                </template>
            </el-table-column>
            <el-table-column width="160px" align="center" label="最新修改对象">
                <template slot-scope="scope">
                    <span>{{scope.row.updateBy}}</span>
                </template>
            </el-table-column>
            <el-table-column width="220px" align="center" label="修改时间">
                <template slot-scope="scope">
                    <span>{{scope.row.updateTime | stamp2TextDateFull}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="230px" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="showDetail(scope.row)">编辑</el-button>
                    <el-button type="danger" size="mini" @click="showDel(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="系统提示？" width="25%" :visible.sync="dialogDelVisible">
            <span>确认删除该提醒类型吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="delBtn">确认</el-button>
                <el-button @click="dialogDelVisible = false">取消</el-button>
            </span>
        </el-dialog>
        <div class="pagination-container">
            <el-pagination background @current-change="handleCurrentChange" :current-page="pageNo" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </div>

</template>

<script>
import common from '@/utils/common'
import { getRemindList,delRemind } from '@/api/remind'
import { toJS, fromJS, Map, List } from 'immutable';
import listQueryMix from '../../../mixins/listQuery.mix'
export default {
    name: "todoList",
    mixins: [listQueryMix],
    data() {
        return {
            pageNo: 1,
            pageSize: 20,
            list: [],
            total: 0,
            listQuery: {},
            dialogDelVisible:false
        }
    },
    created() {
        this.$$queryStub = this.$$listQuery;
        this.getList()

    },
    mounted() {
        
    },
    methods: {
        getList() {
            var postData = this.$$queryStub.toJS();
            getRemindList({
                ...postData,
                pageNo:this.pageNo,
                pageSize:this.pageSize,
                remindCategory:1
            }).then(res => {
                this.list = res.data.list.map(item=>{
                    let remindWayName = []
                    item.remindWays&&item.remindWays.forEach(i=>{
                        if(i=="0"){
                            remindWayName.push("邮件")
                        }
                        if(i=="1"){
                            remindWayName.push("短信")
                        }
                    })
                    return{
                        ...item,
                        remindWayName
                    }
                })
                this.total = res.data.total
            })
        },
        restCallback() {
            // 用来补充默认rest不足的问题
        },
        handleCurrentChange(val) {
            this.pageNo = val
            // this.$$queryStub = fromJS(this.listQuery);
            this.getList()
            this.listLoading = false
        },
        handleCreate() {
            this.$router.push({ path: '/remind/inspectForm' })
        },
        showDel(row){
            this.dialogDelVisible = true;
            this.id = row.id
        },
        showDetail(row){
            this.$router.push({
                path: "/remind/inspectForm",
                query: { key: row.id }
            });
        },
        delBtn(){
            delRemind({
                id:this.id,
                remindCategory:0
            }).then(res=>{
                if (res.status == 0) {
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
                    this.dialogDelVisible = false
                    this.getList()
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

.pro-dialog{
  margin-left: 400px;
  width: 750px
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
.imgPre{
    width:120px;
    height:100px;
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
