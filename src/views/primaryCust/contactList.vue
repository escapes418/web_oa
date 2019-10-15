<template>
    <div class="sjb-container calendar-list-container ">
        <div class="filter-container">
            <div class="toolbar-item">
                <span class="item-label">主客户/编号查询：</span>
                <el-input @keyup.enter.native="handleFilter" style="width: 180px;" class="filter-item" placeholder="请输入客户名/客户编号" v-model.trim="listQuery.mainCustName">
                </el-input>
            </div>
            <div class="toolbar-item">
                <span class="item-label">操作人：</span>
                <el-input @keyup.enter.native="handleFilter" style="width: 180px;" class="filter-item" placeholder="请输入姓名" v-model.trim="listQuery.operateUserName">
                </el-input>
            </div>
            <div class="toolbar-item">
                <span class="item-label">操作部门：</span>
                <el-input @keyup.enter.native="handleFilter" style="width: 180px;" class="filter-item" placeholder="请输入部门" v-model.trim="listQuery.operateOfficeName">
                </el-input>
            </div>
            <div class="toolbar-item">
                <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
                <el-button class="filter-item" type="warning" v-waves icon="el-icon-refresh" @click="restListQuery(restCallback)">重置</el-button>
            </div>
            <div class="toolmore-control">
                <el-button icon="el-icon-arrow-up" v-if="toolexpand" class="toolmore-control-btn" @click="toolexpand = false">收起</el-button>
                <el-button icon="el-icon-arrow-down" v-else class="toolmore-control-btn" @click="toolexpand = true">展开</el-button>
                
            </div>
            <el-collapse-transition>
                <div v-show="toolexpand" style="margin-top:8px">
                    <div class="toolbar-item">
                        <span class="item-label">维护时间：</span>
                        <el-date-picker v-model="listQuery.timeRange" type="daterange" class="filter-item" style="width:287px" placeholder="选择日期范围" :picker-options="pickerOptions">
                        </el-date-picker>
                    </div>
                </div>
            </el-collapse-transition>
        </div>
        <div class="filter-container">
            <div class="toolbar-item">
                <el-button class="filter-item" @click="goBack">返回</el-button>
            </div>
        </div>
        <el-table :data="list" border fit highlight-current-row style="width: 100%">
            <el-table-column align="center" label="主客户编号" width="120px">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.mainCustCode">{{scope.row.mainCustCode}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="主客户" width="180px">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.mainCustName">{{scope.row.mainCustName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="更新时间" width="150px">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.createTime ">{{scope.row.createTime | stamp2TextDateFull}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作人" width="100px">
                <template slot-scope="scope">
                    <span>{{scope.row.operateUserName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作人部门" width="120px">
                <template slot-scope="scope">
                    <span>{{scope.row.operateOfficeName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="原联系人信息">
                <template slot-scope="scope">
                    <span>{{scope.row.preLinkmanRemark}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="现联系人信息" >
                <template slot-scope="scope">
                    <span>{{scope.row.nowLinkmanRemark}}</span>
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
import { getContact,} from "@/api/primaryCust";
import waves from "@/directive/waves"; // 水波纹指令
import { toJS, fromJS, Map, List } from 'immutable';
import listQueryMix from '../../mixins/listQuery.mix'
import { mapState } from "vuex";

export default {
    name:'contactList',
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
            list: [],
            total: 0,
            pageNo: 1,
            pageSize: 20,
            toolexpand:false,
            listQuery: {
                mainCustName:"",
                timeRange: [],
                operateUserName:"",
                operateOfficeName: "",
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
        goBack(){
            this.$router.push({
                path: "/inforManage/primaryCust"
            });
        },
        restCallback() {
            // 用来补充默认rest不足的问题
        },
        getListData() {
            var postData = this.reduceParams(this.$$queryStub);
            getContact({
                ...postData,
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
                .set('beginTime', common.rangeObjToTimestamp($$imData.get('timeRange').toJS()).applyTimeStart)
                .set('endTime', common.rangeObjToTimestamp($$imData.get('timeRange').toJS()).applyTimeEnd)
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

