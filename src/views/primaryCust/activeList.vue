<template>
    <div class="sjb-container calendar-list-container ">
        <div class="filter-container">
            <div class="toolbar-item">
                <span class="item-label">维护时间：</span>
                <el-date-picker v-model="listQuery.timeRange" type="daterange" class="filter-item" style="width:287px" placeholder="选择日期范围" :picker-options="pickerOptions">
                </el-date-picker>
            </div>
            <div class="toolbar-item">
                <span class="item-label">维护人：</span>
                <el-input @keyup.enter.native="handleFilter" style="width: 180px;" class="filter-item" placeholder="请输入维护人" v-model.trim="listQuery.custMaintenanceMan">
                </el-input>
            </div>
            <div class="toolbar-item">
                <span class="item-label">维护部门：</span>
                <el-input @keyup.enter.native="handleFilter" style="width: 180px;" class="filter-item" placeholder="请输入维护人部门" v-model.trim="listQuery.maintainerDeptName">
                </el-input>
            </div>
            <div class="toolbar-item">
                <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
                <el-button class="filter-item" type="warning" v-waves icon="el-icon-refresh" @click="restListQuery(restCallback)">重置</el-button>
            </div>
        </div>
        <el-table :data="list" border fit highlight-current-row style="width: 100%">
            <el-table-column align="center" label="维护时间" width="150px">
                <template slot-scope="scope">
                    <span class="ignore-detail">{{scope.row.custMaintenanceDate | stamp2TextDateFull}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="维护人" width="120px">
                <template slot-scope="scope">
                    <span>{{scope.row.custMaintenanceMan}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="维护人部门" width="150px">
                <template slot-scope="scope">
                    <span>{{scope.row.maintainerDeptName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="归属客户" width="150px">
                <template slot-scope="scope">
                    <span>{{scope.row.custName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="客户级别" width="100px">
                <template slot-scope="scope">
                    <span>{{scope.row.custStageName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="拜访类型" width="100px">
                <template slot-scope="scope">
                    <span>{{scope.row.visitTypeName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="问题归类" width="100px">
                <template slot-scope="scope">
                    <span>{{scope.row.issuesClassification}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="维护内容">
                <template slot-scope="scope">
                    <span>{{scope.row.custMaintenanceContent}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="联系人" width="120px">
                <template slot-scope="scope">
                    <span>{{scope.row.linkmanName}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="备注" width="140px">
                <template slot-scope="scope">
                    <span>{{scope.row.remarks}}</span>
                </template>
            </el-table-column>
        </el-table>

        <div class="pagination-container">
            <el-pagination background @current-change="handleCurrentChange" :current-page="pageNo" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import common from "@/utils/common";
import { getActiveList} from "@/api/primaryCust";
import waves from "@/directive/waves"; // 水波纹指令
import { toJS, fromJS, Map, List } from 'immutable';
import listQueryMix from '../../mixins/listQuery.mix'
import { mapState } from "vuex";

export default {
    name:'primaryList',
    directives: {
        waves
    },
    mixins: [listQueryMix],
    props: {
        custId: String, // reim/reception/traveling
    },
    data() {
        return {
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            },
            list: [],
            total: 0,
            pageNo: 1,
            pageSize: 20,

            listQuery: {
                // custId:
                timeRange: [],
                custMaintenanceMan:"",
                maintainerDeptName: "",
            },

        };
    },
    created() {
        this.$$queryStub = this.$$listQuery;
         this.getListData();
    },
    mounted() {
        
    },
    methods: {
        restCallback() {
            // 用来补充默认rest不足的问题
        },
        getListData() {
            var postData = this.reduceParams(this.$$queryStub);
            getActiveList({
                ...postData,
                custId:this.custId,
                pageNo:this.pageNo,
                pageSize:this.pageSize
            }).then(response => {
                this.list = response.data.list;
                this.total = response.data.total;
                this.listLoading = false;
            });
        },
        reduceParams($$imData) {
            if (!$$imData || $$imData.size == 0) return {};
            const $$postData = $$imData
                .set('maintainStartTime', common.rangeObjToTimestamp($$imData.get('timeRange').toJS()).applyTimeStart)
                .set('maintainEndTime', common.rangeObjToTimestamp($$imData.get('timeRange').toJS()).applyTimeEnd)
                .delete('timeRange')
            return $$postData.toJS();
        },
        handleFilter() {
            this.pageNo = 1;
            if(!this.listQuery.timeRange){
                this.listQuery.timeRange = []
            }
            this.$$queryStub = fromJS(this.listQuery);
            this.getListData();
            this.listLoading = false;
        },
        handleCurrentChange(val) {
            this.pageNo = val;
            this.getListData();
        },
    }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.toolbar-row {
    margin: 5px 0 0 0;
}
.merge-item{
    margin: 5px;
    
}
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
.el-dialog__body {
    padding: 10px 20px; 
    color: #606266;
    line-height: 24px;
    font-size: 14px;
}
.item-value {
    display: inline-block;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background: white;
    padding-left: 7px;
    line-height: 30px;
    width: 190px;
}
.select-item{
    margin-right: 5px
}
.self-table-expand {
    font-size: 0;
}

.el-form--inline .el-form-item__content {
    font-size: 12px;
}
.el-form--inline .el-form-item__label {
    font-size: 12px;
    width: 90px;
    color: #99a9bf;
    float: none;
    display: inline-block;
}

.self-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}

.ignore-detail {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
    margin-top: -3px;
}
</style>

