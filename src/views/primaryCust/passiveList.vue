<template>
    <div class="sjb-container calendar-list-container ">
        <div class="filter-container">
            <div class="toolbar-item">
                <div class="toolbar-item">
                <span class="item-label">选择类型：</span>
                <el-select style="width:120px" class="filter-item" v-model="listQuery.searchType" placeholder="请选择类型">
                    <el-option v-for="item in searchList" :key="item.value" :label="item.name" :value="item.value">
                    </el-option>
                </el-select>
            </div>
            </div>
            <div class="toolbar-item">
                <span class="item-label">时间：</span>
                <el-date-picker v-model="listQuery.timeRange" type="daterange" class="filter-item" style="width:287px" placeholder="选择日期范围" :picker-options="pickerOptions">
                </el-date-picker>
            </div>
            <div class="toolbar-item">
                <span class="item-label">人员：</span>
                <el-input @keyup.enter.native="handleFilter" style="width: 180px;" class="filter-item" placeholder="请输入人员" v-model.trim="listQuery.operateUserName">
                </el-input>
            </div>
            <div class="toolbar-item">
                <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
                <el-button class="filter-item" type="warning" v-waves icon="el-icon-refresh" @click="restListQuery(restCallback)">重置</el-button>
            </div>
        </div>
        <el-table :data="list" border fit highlight-current-row style="width: 100%">
            <el-table-column align="center" label="企业code">
                <template slot-scope="scope">
                    <span class="ignore-detail" style="color:#409EFF;cursor: Pointer;" :title="scope.row.customerCode">{{scope.row.customerCode}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="项目名称">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.projectName">{{scope.row.projectName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="创建时间" width="120px">
                <template slot-scope="scope">
                    <span>{{scope.row.createDate | stamp2TextDateFull}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="记录人" width="50px">
                <template slot-scope="scope">
                    <span>{{scope.row.createName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="记录类型" width="100px">
                <template slot-scope="scope">
                    <span>{{scope.row.recordName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="沟通类型" width="100px">
                <template slot-scope="scope">
                    <span>{{scope.row.communicateName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="沟通渠道" width="100px">
                <template slot-scope="scope">
                    <span>{{scope.row.communicatieName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="用户反馈" width="100px">
                <template slot-scope="scope">
                    <span>{{scope.row.customerFeedBack}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="客服回复" width="120px">
                <template slot-scope="scope">
                    <span>{{scope.row.customerServicerReply}}</span>
                </template>
            </el-table-column>
            
            <el-table-column align="center" label="处理结果" width="140px">
                <template slot-scope="scope">
                    <span>{{scope.row.dealResultName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="对接部门" width="120px">
                <template slot-scope="scope">
                    <span>{{scope.row.connectDepartmentName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="其他部门回复" width="120px">
                <template slot-scope="scope">
                    <span>{{scope.row.otherDepartmentReply}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="处理人" width="120px">
                <template slot-scope="scope">
                    <span>{{scope.row.updateName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="处理时间" width="120px">
                <template slot-scope="scope">
                    <span>{{scope.row.dealDate | stamp2TextDateFull}}</span>
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
import {getPassiveList} from "@/api/primaryCust";
import waves from "@/directive/waves"; // 水波纹指令
import { toJS, fromJS, Map, List } from 'immutable';
import listQueryMix from '../../mixins/listQuery.mix'
import { mapState } from "vuex";

export default {
    name:'primaryList',
    directives: {
        waves
    },
    props: {
        custId:String
    },
    mixins: [listQueryMix],
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
            searchList:[ {
                value: "1",
                name: "记录"
            },
            {
                value: "2",
                name: "处理"
            }],
            listQuery: {
                searchType:"1",
                timeRange: [],
                custMaintenanceMan:"",
                maintainerDeptName:""
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
            getPassiveList({
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
            // if(!this.listQuery.operateUserName && this.listQuery.timeRange.length == 0){
            //     this.$message({
            //         message: "选择类型和时间或维护人配合使用!!",
            //         type: "warning"
            //     });
            //     return
            // }
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

