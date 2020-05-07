<template>
    <div class="sjb-container calendar-list-container">
        <div class="filter-container">
            <div class="toolbar-item">
                <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary">添加关联合同</el-button>
            </div>
        </div>

        <el-table :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
        <el-table-column align="center" label="合同编号" width="150px">
            <template slot-scope="scope">
                <span>{{scope.row.contractCode}}</span>
            </template>
        </el-table-column>
        <el-table-column width="320px" align="center" label="合同名称">
            <template slot-scope="scope">
                <a>{{scope.row.contractName}}</a>
            </template>
        </el-table-column>
        <el-table-column width="320px" align="center" label="项目名称">
            <template slot-scope="scope">
                <a>{{scope.row.projectName}}</a>
            </template>
        </el-table-column>
        <el-table-column align="center" label="合同开始日期">
            <template slot-scope="scope">
                <span>{{scope.row.contractStartTime | stamp2TextDate}}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="合同结束日期">
            <template slot-scope="scope">
                <span>{{scope.row.contractEndTime | stamp2TextDate}}</span>
            </template>
        </el-table-column>
        <el-table-column width="120px" align="center" label="合同负责人">
            <template slot-scope="scope">
                <span>{{scope.row.contractLeaderName}}</span>
            </template>
        </el-table-column>
        <el-table-column width="120px" align="center" label="合同状态">
            <template slot-scope="scope">
                <span>{{scope.row.contractHisStatusName}}</span>
            </template>
        </el-table-column>
        <el-table-column width="220px" align="center" label="操作" class-name="small-padding fixed-width">
            <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="showDetail(scope.row)">查看</el-button>
                <el-button type="danger" size="small" @click="del(scope.row)">移除</el-button>
            </template>
        </el-table-column>
        </el-table>

        <div class="pagination-container">
            <el-pagination background @current-change="handleCurrentChange" :current-page="pageNum" :page-size="20" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>

        <el-dialog title="新建关联合同" :visible.sync="dialogFormVisible">
                <span class="toolbar-item">
                    <span class="item-label">请输入合同编号/甲方/乙方/丙方：</span>
                    <el-input style="width: 260px;" class="filter-item" placeholder="请输入合同编号/甲方/乙方/丙方" v-model.trim="listQuery.keyWord">
                    </el-input>
                </span>
                <span class="toolbar-item">
                    <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleProFilter">搜索</el-button>
                    <el-button class="filter-item" type="warning" icon="el-icon-delete" @click="restListQuery(restCallback)">重置</el-button>
                </span>
                <div class="dialog" style="margin-top:10px">
                    <el-table :data="addList" v-loading="addListLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%;" @selection-change="handleSelectionChange">
                        <el-table-column
                            type="selection"
                            width="55">
                        </el-table-column>
                        <el-table-column align="center" label="合同编号">
                            <template slot-scope="scope">
                                <span class="ignore-detail" :title="scope.row.contractCode">{{scope.row.contractCode}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="合同名称">
                            <template slot-scope="scope">
                                <span>{{scope.row.contractName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="甲方名称">
                            <template slot-scope="scope">
                                <span class="ignore-detail" :title="scope.row.firstMemberName">{{scope.row.firstMemberName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="乙方名称">
                            <template slot-scope="scope">
                                <span class="ignore-detail" :title="scope.row.secondMemberName">{{scope.row.secondMemberName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="丙方名称">
                            <template slot-scope="scope">
                                <span class="ignore-detail" :title="scope.row.thirdMemberName">{{scope.row.thirdMemberName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="合同负责人">
                            <template slot-scope="scope">
                                <span class="ignore-detail">{{scope.row.contractLeaderName}}</span>
                            </template>
                        </el-table-column>
                        
                    </el-table>
                </div>

                <div class="pagination-container" style="margin-top:20px">
                    <el-pagination background @current-change="handleAddCurrentChange" :current-page="addpageNum" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="addTotal">
                    </el-pagination>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button  type="primary" @click="addContract">确定</el-button>
                    <el-button @click="dialogFormVisible = false">返回</el-button>
                </div>
            </el-dialog>
    </div>
</template>

<script>
import common from '@/utils/common'
import { fetchList ,fetchProDic,downReim} from '@/api/reim'
import { getSignContractlist,contractRelationDel,getContractlist,saveContractRelation} from "@/api/pms";
import waves from '@/directive/waves' // 水波纹指令
import { toJS, fromJS, Map, List } from 'immutable';
import { parseTime } from '@/utils'

import listQueryMix from '../../mixins/listQuery.mix'


export default {
    directives: {
        waves
    },
    mixins: [listQueryMix],
    data() {
        return {
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            },
            toolexpand:false,
            // timeRange: [],
            list: null,
            total: null,
            dialogMarketVisible:false,
            dialogFormVisible:false,
            filterMarket:'',
            treeData:[],
            defaultProps:{
                children: 'userInfo',
                label: 'name'
            },
            pageNum: 1,
            pageSize: 20,
            listLoading: true,
            addList: null,
            addpageNum: 1,
            addPageSize: 20,
            addTotal:null,
            addListLoading: true,
            selectContract:[],
            listQuery: {
                keyWord:"",
                projectId: this.$route.query.id,
            },
            expStatuList:[],
            proDic: [],
        }
    },
    created() {
        this.getList()
        this.listLoading = false
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

        this.expStatuList = selectDic(dicList,"expense_status")

        console.log(this.expStatuList)
    },
    methods: {
        selectMarket() {
            if(this.marketLeader ==''){
                this.$message({
                    message: '请选择市场负责人',
                    type: 'warning'
                })
                return
            }
            this.dialogMarketVisible = false
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
        handleMarketClick(data) {
            this.marketLeader = data.name
            this.filter.marketLeaderId = data.id
        },
        marketNode(value, data){
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        getList() {
            this.listLoading = true;
            // var postData = this.reduceParams(this.$$queryStub);
            // var {applyTimeStart,applyTimeEnd } = common.rangeObjToTimestamp(this.listQuery.timeRange)
            getSignContractlist({
                // ...postData,
                id:this.$route.query.id,
                pageNum:this.pageNum,
                pageSize:this.pageSize
            }).then(response => {
                this.list = response.data.list
                this.total = response.data.total
                this.listLoading = false
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
                .set('applyTimeStart', common.rangeObjToTimestamp($$imData.get('timeRange').toJS()).applyTimeStart)
                .set('applyTimeEnd', common.rangeObjToTimestamp($$imData.get('timeRange').toJS()).applyTimeEnd)
                .delete('timeRange')
            return $$postData.toJS();
        },
        del(row){
            contractRelationDel({
                id:row.id,
            }).then(response => {
                this.pageNum = 1;
                this.getList()
                this.listLoading = false;
            })
        },
        handleFilter() {
            this.pageNum = 1
            if(!this.listQuery.timeRange){
                this.listQuery.timeRange = []
            }
            this.$$queryStub = fromJS(this.listQuery);
            this.getList()
            this.listLoading = false;
        },
        handleCurrentChange(val) {
            this.pageNum = val
            this.getList()
            this.listLoading = false;
        },
        showDetail(row){
            this.$router.push({
                path:'/me/reimDetail',
                query: { key: row.id ,pathType:'list'}
            })
        },
        handleCreate() {
            this.$$queryStub = this.$$listQuery;
            this.getAddList();
            this.addListLoading = false;
            this.dialogFormVisible = true;
        },
        exportFile(){
            var postData = this.reduceParams(this.$$queryStub);
            downReim({
                ...postData
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
        handleProFilter(){
            this.addpageNum = 1;
            this.$$queryStub = fromJS(this.listQuery);
            this.getAddList();
            this.addListLoading = false;
        },
        handleAddCurrentChange(val) {
            this.addpageNum = val;
            this.getAddList();
            this.addListLoading = false;
        },
        getAddList(){
            this.addListLoading = true;
            var postData = this.$$queryStub.toJS();
            console.log(postData);
            getContractlist({
                ...postData,
                pageNum:this.addpageNum,
                pageSize:this.addPageSize
            }).then(res => {
                this.addList = res.data.list;
                this.addTotal = res.data.total;
                this.addListLoading = false;
            })
        },
        selectMain(row) {
            this.postData.associationMainName = row.contractName;
            this.postData.associationMainCode = row.contractCode;
            this.postData.associationMainId = row.id;
            this.dialogFormVisible = false;
        },
        handleSelectionChange(val){
            this.selectContract = val;
        },
        addContract(){
            if(this.selectContract.length<1){
                this.$message({
                    message:'请选择要合同！',
                    type:"warning"
                })
                return
            }
            let ids = [];
            this.selectContract.forEach(item=>{
                ids.push(item.id)
            })
            saveContractRelation({
                id:this.$route.query.id,
                contractIds:ids
            }).then(res => {
                this.pageNum = 1
                this.getList()
                this.listLoading = false;
                this.addListLoading = false;
                this.dialogFormVisible = false;
            })
        },
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
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