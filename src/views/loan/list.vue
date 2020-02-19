<template>
    <div class="sjb-container calendar-list-container">
        <div class="filter-container">
            <div class="toolbar-item">
                <span class="item-label">流程编号/标题：</span>
                <el-input @keyup.enter.native="handleFilter" style="width: 180px;" class="filter-item" placeholder="请输入流程编号/标题" v-model.trim="listQuery.procCodeOrTitle">
                </el-input>
            </div>
            <div class="toolbar-item">
                <span class="item-label">申请状态：</span>
                <el-select clearable style="width: 120px" class="filter-item" v-model="listQuery.loanFlowStatus" placeholder="请选择">
                    <el-option v-for="item in expStatuList" :key="item.value" :label="item.name" :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="toolbar-item">
                <span class="item-label">项目名称：</span>
                <el-select 
                    filterable
                    clearable
                    remote 
                    style="width: 220px" 
                    class="filter-item" 
                    v-model="listQuery.projectId" 
                    :remote-method="searchProject"
                    placeholder="请输入项目名称">
                    <el-option v-for="item in proDic" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="toolbar-item">
                <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
                <el-button class="filter-item" type="warning" v-waves icon="el-icon-delete" @click="restListQuery(restCallback)">重置</el-button>
                <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">借款申请</el-button>
            </div>
            <div class="toolmore-control">
                <el-button icon="el-icon-arrow-up" v-if="toolexpand" class="toolmore-control-btn" @click="toolexpand = false">收起</el-button>
                <el-button icon="el-icon-arrow-down" v-else class="toolmore-control-btn" @click="toolexpand = true">展开</el-button>
            </div>
            <el-collapse-transition>
                <div v-show="toolexpand">
                    <div class="toolbar-row">
                        <div class="toolbar-item">
                            <span class="item-label">申请时间：</span>
                            <el-date-picker v-model="listQuery.timeRange" type="daterange" class="filter-item" style="width:287px" placeholder="选择日期范围"  :picker-options="pickerOptions">
                            </el-date-picker>
                        </div>
                    </div>
                </div>
            </el-collapse-transition>
        </div>
        <div class="filter-container">
            <div class="toolbar-item">
                <el-button v-if="ids.indexOf('me-loanList-modifyBtn') !== -1" class="filter-item" type="primary" @click="modifyLoan">修改借款人</el-button>
            </div>
        </div>
        <el-table :data="list" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%"  @selection-change="handleSelection">
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column align="center" label="流程编号" width="130px">
                <template slot-scope="scope">
                    <span>{{scope.row.procCode}}</span>
                </template>
            </el-table-column>
            <el-table-column width="270px" align="center" label="流程名称">
                <template slot-scope="scope">
                    <a>{{scope.row.procName}}</a>
                </template>
            </el-table-column>
            <el-table-column align="center" label="项目名称">
                <template slot-scope="scope">
                    <a>{{scope.row.projectName}}</a>
                </template>
            </el-table-column>
            <el-table-column width="80px" align="center" label="借款人">
                <template slot-scope="scope">
                    <span>{{scope.row.applyPerName}}</span>
                </template>
            </el-table-column>
            <el-table-column width="90px" align="center" label="借款时间">
                <template slot-scope="scope">
                    <span>{{scope.row.applyTime | stamp2TextDate}}</span>
                </template>
            </el-table-column>
            <el-table-column width="100px" align="center" label="预计还款时间">
                <template slot-scope="scope">
                    <span>{{scope.row.applyTime | stamp2TextDate}}</span>
                </template>
            </el-table-column>
            <el-table-column width="80px" align="center" label="借款金额">
                <template slot-scope="scope">
                    <span>{{scope.row.loanAmount | thousands(2)}}</span>
                </template>
            </el-table-column>
            <el-table-column width="90px" align="center" label="已还款金额">
                <template slot-scope="scope">
                    <span>{{scope.row.paidAmount | thousands(2)}}</span>
                </template>
            </el-table-column>
            <el-table-column width="90px" align="center" label="待还款金额">
                <template slot-scope="scope">
                    <span>{{scope.row.unpaidAmount | thousands(2)}}</span>
                </template>
            </el-table-column>
            <el-table-column width="100px" align="center" label="最新还款时间">
                <template slot-scope="scope">
                    <span>{{scope.row.lastRepayTime | stamp2TextDate}}</span>
                </template>
            </el-table-column>
            <el-table-column width="110px" align="center" label="借款审批状态">
                <template slot-scope="scope">
                    <span>{{scope.row.loanFlowStatus}}</span>
                </template>
            </el-table-column>
            <el-table-column width="100px" align="center" label="还款状态">
                <template slot-scope="scope">
                    <span>{{scope.row.repayStatus}}</span>
                </template>
            </el-table-column>
            <el-table-column width="120px" align="center" label="操作" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="showDetail(scope.row)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="批量修改借款人" :visible.sync="dialogModify" width="35%" :before-close="modifyClose">
            <div class="move-item">
                <div>
                    已选择：
                </div>
                <span v-for="item in selectLoanMember">
                    <span class="select-item">{{item.procName}}</span>
                </span>
            </div>
            <div class="move-select">
                <div class="move-item">
                    <span class="item-label">借款人：</span>
                    <el-select 
                        style="width: 300px" 
                        class="filter-item" 
                        v-model="newLoanPerson"
                        filterable
                        clearable
                        placeholder="请选择借款人">
                        <el-option v-for="item in memberList" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmModify">确认</el-button>
                <el-button @click="modifyCancel">取消</el-button>
            </span>
        </el-dialog>
        <div class="pagination-container">
            <el-pagination background @current-change="handleCurrentChange" :current-page="pageNo" :page-size="20" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import common from '@/utils/common'
import { getLoan ,fetchProDic,getMember,modifyLoan} from '@/api/loan'
import waves from '@/directive/waves' // 水波纹指令
import { toJS, fromJS, Map, List } from 'immutable';
import { parseTime } from '@/utils';
import { mapState } from "vuex";
import listQueryMix from '../../mixins/listQuery.mix'


export default {
    directives: {
        waves
    },
    mixins: [listQueryMix],
    computed:{
        ...mapState({
            ids:state => state.permission.ids
        }),
    },
    data() {
        return {
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            },
            toolexpand:false,
            // timeRange: [],
            list: [],
            total: 0,
            pageNo: 1,
            pageSize: 20,
            listQuery: {
                timeRange: [],
                projectId:"",
                loanFlowStatus:"",
                procCodeOrTitle:"",
            },
            expStatuList:[],
            proDic: [],

            dialogModify:false,
            newLoanPerson:"",
            selectLoanMember:[],
            memberList:[]
        }
    },
    created() {
        this.getList()
    },
    mounted(){
        let dicList = JSON.parse(localStorage.getItem("web_oa_dicList"));
        function selectDic(arr,type){
            let temp = [];
            for(var i = 0;i<arr.length;i++){
                if(arr[i].type == type){
                    temp.push(arr[i])
                };
            }
            return temp
        }

        this.expStatuList = selectDic(dicList,"expense_status").filter(item=>{
            return item.value != 4
        })
    },
    methods: {
        handleSelection(val){
            this.selectLoanMember = val;
        },
        modifyClose(){
            this.dialogModify = false;
            this.newLoanPerson = "";
        },
        modifyCancel(){
            this.dialogModify = false;
            this.newLoanPerson = "";
        },
        confirmModify(){
            let loanFlowIds = [];
            this.selectLoanMember.forEach(item=>{
                loanFlowIds.push(item.id)
            })
            modifyLoan({
                loanFlowIds:loanFlowIds,
                newLoanPerson:this.newLoanPerson
            }).then(res=>{
                if(res.status == 0){
                    this.modifyClose();
                    this.$message({
                        message: res.message,
                        type: "success"
                    });
                    this.getList()
                }
            })
        },
        searchProject(val){
            if( val!==''){
                fetchProDic({
                    dictType:'oa_project',
                    projectName:val
                }).then(res =>{
                    this.proDic = res.data
                })
            }
        },
        getList() {
            var postData = this.reduceParams(this.$$queryStub);
            // var {applyTimeStart,applyTimeEnd } = common.rangeObjToTimestamp(this.listQuery.timeRange)
            getLoan({
                ...postData,
                pageNo:this.pageNo,
                pageSize:this.pageSize
            }).then(response => {
                this.list = response.data.list;
                this.total = response.data.total;
            })
        },
        restCallback() {
            this.proDic = []
                // 用来补充默认rest不足的问题
        },
        // 处理接口不一致情况
        reduceParams($$imData) {
            if (!$$imData || $$imData.size == 0) return {};
            const $$postData = $$imData
                .set('applyTimeBegin', common.rangeObjToTimestamp($$imData.get('timeRange').toJS()).applyTimeStart)
                .set('applyTimeEnd', common.rangeObjToTimestamp($$imData.get('timeRange').toJS()).applyTimeEnd)
                .delete('timeRange')
            return $$postData.toJS();
        },
        handleFilter() {
            this.pageNo = 1
            if(!this.listQuery.timeRange){
                this.listQuery.timeRange = []
            }
            this.$$queryStub = fromJS(this.listQuery);
            this.getList()
        },
        handleCurrentChange(val) {
            this.pageNo = val
            this.getList()
        },
        showDetail(row){
            this.$router.push({
                path:'/me/loanDetail',
                query: { key: row.id ,pathType:'list'}
            })
        },
        handleCreate() {
            this.$router.push({path: '/me/loanForm'})
        },
        modifyLoan(){
            if(this.selectLoanMember.length<1){
                this.$message({
                    message:'请选择要修改的借款申请！',
                    type:"warning"
                })
                return
            }
            this.dialogModify = true;
            //获取当前登陆人的部门和区域
            getMember({}).then(res=>{
                if(res.status ==0){
                    this.memberList = res.data.filter(item=>{
                        return item.userStatus == 1
                    })
                }
            })
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.move-item{
    padding: 10px;
    background: #f2f7fa;
    color: #343434;
    .item-label{
        float: left;
        width: 100px;
    }
    .filter-item{
        display: inline-block;
        margin-left: 30px
    }
}
.select-item{
    margin-right: 5px
}
.toolbar-row{
  margin: 5px 0 0 0 
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