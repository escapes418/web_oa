<template>
    <div>
        <!-- <div class="clearfix  cominfo-item">
            <span class="left-red" v-if="required">*</span>
            <span class="left-title font-gray">项目名称：</span>
            <div class="item-value" @click="openDialog">
                <i class="el-icon-search" style="color:#bfbfbf"></i>
                <span style="color:#606266;font-size:14px">{{name}}</span>
            </div>
            <el-input :value="name" @click="openDialog" readonly></el-input>
        </div> -->
        <RedStar label="关联申请：" :required="required">
            <div class="item-value" @click="openDialog">
                <i class="el-icon-search" style="color:#bfbfbf"></i>
                <span style="color:#606266;font-size:14px">{{name}}</span>
            </div>
        </RedStar>
        <el-dialog title="关联借款申请" :visible.sync="showDialog" width="1000px" top="6vh" required="false">
            <span class="toolbar-item">
                <span class="item-label">流程编号/标题：</span>
                <el-input @keyup.enter.native="handleFilter" style="width: 180px;" class="filter-item" placeholder="请输入流程编号/标题" v-model.trim="listQuery.procCodeOrTitle">
                </el-input>
            </span>
            <span class="toolbar-item">
                <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleProFilter">搜索</el-button>
                <el-button class="filter-item" type="warning" icon="el-icon-refresh" @click="restListQuery(restCallback)">重置</el-button>
            </span>
            <div class="dialog" style="margin-top:10px">
                <el-table :data="list" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%;" @row-click="selectLoan">
                    <el-table-column width="180px" align="center" label="流程编号">
                        <template slot-scope="scope">
                            <span>{{scope.row.procCode}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="流程名称">
                        <template slot-scope="scope">
                            <a>{{scope.row.procName}}</a>
                        </template>
                    </el-table-column>
                    <el-table-column width="80px" align="center" label="借款人">
                        <template slot-scope="scope">
                            <span>{{scope.row.applyPerName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column width="100px" align="center" label="借款时间">
                        <template slot-scope="scope">
                            <span>{{scope.row.applyTime | stamp2TextDate}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column width="80px" align="center" label="借款金额">
                        <template slot-scope="scope">
                            <span>{{scope.row.loanAmount}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column width="100px" align="center" label="已还款金额">
                        <template slot-scope="scope">
                            <span>{{scope.row.paidAmount}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column width="100px" align="center" label="待还款金额">
                        <template slot-scope="scope">
                            <span>{{scope.row.unpaidAmount}}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <div class="pagination-container" style="margin-top:20px">
                <el-pagination background @current-change="handleCurrentChange" :current-page="pageNo" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import common from "@/utils/common";
import { getLoanList } from "@/api/repay";
import { toJS, fromJS, Map, List } from 'immutable';
import listQueryMix from '../../mixins/listQuery.mix';
import RedStar from '@/components/RedStar/RedStar.vue'

export default {
    components: {
        RedStar
    },
    props: {
        lValue: String,
        required: Boolean
    },
    mixins: [listQueryMix],
    data() {
        return {
            showDialog: false,
            list: [],
            total: 0,
            name: "",
            
            pageNo: 1,
            pageSize: 10,
            listQuery: {
                procCodeOrTitle: "",
                loanFlowStatus:"1"
            }
        };
    },
    computed: {},
    watch: {
        lValue(val) {
            this.name = val;
        }
    },
    created() {
        this.$$queryStub = this.$$listQuery;
        this.name = this.lValue;
        // this.getList()
    },
    methods: {
        openDialog() {
            this.showDialog = true;
            this.getList();
        },
        restCallback() {
            // 用来补充默认rest不足的问题
        },
        getList() {
            var postData = this.$$queryStub.toJS();
            getLoanList({
                ...postData,
                pageNo:this.pageNo,
                pageSize:this.pageSize
            }).then(res => {
                this.list = res.data.list;
                this.total = res.data.total;
            });
        },
        handleProFilter() {
            this.pageNo = 1;
            if(this.listQuery.procCodeOrTitle){
                this.$$queryStub = fromJS(this.listQuery);
                this.getList();
            }
        },
        handleCurrentChange(val) {
            this.pageNo = val;
            this.getList();
        },
        selectLoan(row) {
            this.name = row.procName.substring(0,20)+'...';
            this.$emit("on-select",row);
            this.showDialog = false;
        },
        
    }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.item-value {
    display: inline-block;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background: white;
    padding-left: 7px;
    line-height: 30px;
    width: 250px;
}
.left-red{
    color: red;
    position: absolute;
    left: 15px;
}
</style>
