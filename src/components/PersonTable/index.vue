<template>
    
    <div>
        <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
            <el-table-column align="center" label="客户编号" width="120px">
                <template slot-scope="scope" >
                    <span v-if="custListPlace == 3" class="ignore-detail" :title="scope.row.custCode">{{scope.row.custCode}}</span>
                    <span v-else class="ignore-detail" style="color:#409EFF;cursor: Pointer;"  @click="handleDetail(scope.row)" :title="scope.row.custCode">{{scope.row.custCode}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="客户名称">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.custName">{{scope.row.custName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="主客户名称">
                <template slot-scope="scope">
                    <span class="ignore-detail">{{scope.row.mainCustName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="统一社会信用代码" width="220px">
                <template slot-scope="scope">
                    <span class="ignore-detail">{{scope.row.creditCode}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="客户级别" width="120px">
                <template slot-scope="scope">
                    <span>{{scope.row.custStageName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="客户类型" width="110px">
                <template slot-scope="scope">
                    <span>{{scope.row.custTypeName}}</span>
                </template>
            </el-table-column>
            <!-- <el-table-column align="center" label="规模（万元/月）" width="110px">
                <template slot-scope="scope">
                    <span>{{scope.row.custCompanySize}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="行业" width="50px">
                <template slot-scope="scope">
                    <span>{{scope.row.custTradesName}}</span>
                </template>
            </el-table-column> -->
            <el-table-column align="center" label="更新时间" width="140px">
                <template slot-scope="scope">
                    <span>{{scope.row.time | stamp2TextDateFull}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="320px">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
                    <el-button type="primary" size="mini" @click="handleDetail(scope.row)">详情</el-button>
                    <el-button v-if="ids.indexOf('inforManage-customerList-downLoadBtn')!==-1" type="primary" size="mini" @click="downLoadContractDiaLog(scope.row)">下载</el-button>
                    <el-button type="primary" size="mini" @click="maintain(scope.row)">维护管理</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="选择合同模版" :visible.sync="dialogVisible" width="25%">
            <div class="toolbar-item">
                <span class="item-label">合同名称：</span>
                <el-select filterable style="width: 220px" class="filter-item" v-model="contractCompanyCode" placeholder="请输入项目名称" @change="selectContract">
                    <el-option v-for="item in comInfor" :key="item.contractCompanyCode" :label="item.contractName" :value="item.contractCompanyCode">
                    </el-option>
                </el-select>
            </div>
            <div class="toolbar-item">
                <span class="item-label">乙方名称：</span>
                <span class="right-con">{{secondPartyName}}</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmDownLoad">确认</el-button>
                <el-button @click="cancelBtn">取消</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import { mapState } from "vuex";
    import {  fetchComInfoList,downLoadContract} from "@/api/customer";
    export default {
        data() {
            return {
                tableKey: 0,
                contractCompanyCode:"",
                dialogVisible:false,
                secondPartyName:"",
                comInfor:[],
            }
        },
        computed:{
            ...mapState({
                custListPlace:state => state.cust.custListPlace,
                ids:state => state.permission.ids
            }),
        },
        props:{
            list:Array,
            listLoading:Boolean
        },
        methods:{
            handleUpdate(row) {
                this.$router.push({
                    path: "/inforManage/customerForm",
                    query: { key: row.id, custType:row.custType}
                });
            },
            handleDetail(row) {
                this.$router.push({
                    path: "/inforManage/customerDetail",
                    query: { key: row.id, custType:row.custType}
                });
            },
            maintain(row) {
                this.id = row.id;
                this.$router.push({
                    path:'/inforManage/maintainCust',
                    query:{ key : row.id,custName:row.custName}
                })
            },
            cancelBtn(){
                this.downLoadId =""
                this.contractCompanyCode = ""
                this.secondPartyName = ""
                this.dialogVisible = false;
            },
            confirmDownLoad() {
                this.dialogVisible = false;
                if(!this.contractCompanyCode){
                    this.$message({
                        message: "请选择合同名称",
                        type: "warning"
                    });
                    return;
                }
                downLoadContract({
                    custId: this.downLoadId,
                    contractCompanyCode:this.contractCompanyCode
                }).then(res => {
                    if (res.status == 0) {
                        var url = `./OA${res.data}`;
                        window.location.href = url;
                    }
                });
                this.downLoadId ="";
                this.contractCompanyCode = "";
                this.secondPartyName = "";
            },
            selectContract(){
                this.comInfor.forEach(item=>{
                    if(item.contractCompanyCode == this.contractCompanyCode){
                        this.secondPartyName = item.secondPartyName
                    }
                })
            },
            downLoadContractDiaLog(row){
                this.downLoadId = row.id
                this.dialogVisible = true
            },
        },
        created() {
            fetchComInfoList({}).then(res =>{
                this.comInfor = res.data
            })
        },
    }
</script>