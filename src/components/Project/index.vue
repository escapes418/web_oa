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
        <RedStar label="项目名称：" :required="required">
            <div class="item-value" @click="openDialog">
                <i class="el-icon-search" style="color:#bfbfbf"></i>
                <span style="color:#606266;font-size:14px">{{name}}</span>
            </div>
        </RedStar>
        <el-dialog title="关联项目" :visible.sync="showDialog" width="1000px" top="6vh" required="false">
            <span class="toolbar-item">
                <span class="item-label">更新时间</span>
                <el-date-picker v-model="listQuery.timeRange" type="daterange" class="filter-item" style="width:287px" placeholder="选择日期范围" :picker-options="pickerOptions">
                </el-date-picker>
            </span>
            <span class="toolbar-item">
                <span class="item-label">项目名称：</span>
                <el-input @keyup.enter.native="handleProFilter" style="width: 120px;" class="filter-item" placeholder="请输入项目名" v-model.trim="listQuery.projectName">
                </el-input>
            </span>
            <span class="toolbar-item">
                <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleProFilter">搜索</el-button>
                <el-button class="filter-item" type="warning" icon="el-icon-refresh" @click="restListQuery(restCallback)">重置</el-button>
            </span>
            <div class="dialog" style="margin-top:10px">
                <el-table :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%;" @row-click="selectProject">
                    <el-table-column align="center" label="项目名称">
                        <template slot-scope="scope">
                            <span class="ignore-detail">{{scope.row.projectName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="归属部门">
                        <template slot-scope="scope">
                            <span class="ignore-detail">{{scope.row.officeName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="客户名称">
                        <template slot-scope="scope">
                            <span class="ignore-detail">{{scope.row.custInfoName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center"  width="100px" label="项目类型">
                        <template slot-scope="scope">
                            <span>{{scope.row.projectTypeName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" width="100px" label="更新时间">
                        <template slot-scope="scope">
                            <span>{{scope.row.updateTime | stamp2TextDate}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center"  width="100px" label="项目负责人">
                        <template slot-scope="scope">
                            <span>{{scope.row.projectLeaderName}}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <div class="pagination-container" style="margin-top:20px">
                <el-pagination background @current-change="handleCurrentChange" :current-page="pageNo" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showDialog = false">返回</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import common from "@/utils/common";
import { fetchProList } from "@/api/reim";
import { toJS, fromJS, Map, List } from 'immutable';
import listQueryMix from '../../mixins/listQuery.mix';
import RedStar from '@/components/RedStar/RedStar.vue'

export default {
    components: {
        RedStar
    },
    props: {
        Pvalue: String,
        required: Boolean
    },
    mixins: [listQueryMix],
    data() {
        return {
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            },
            showDialog: false,
            listLoading: false,
            list: [],
            total: null,
            name: "",
            
            pageNo: 1,
            pageSize: 10,
            listQuery: {
                projectName: "",
                timeRange: [],
                applyTimeStart: "",
                applyTimeEnd: ""
            }
        };
    },
    computed: {},
    watch: {
        Pvalue(val) {
            this.name = val;
        }
    },
    created() {
        this.$$queryStub = this.$$listQuery;
        this.name = this.Pvalue;
    },
    methods: {
        openDialog() {
            this.showDialog = true;
            // this.listLoading = false;
            // if(this.list.length == 0) {
            //     this.getList();
            //     this.listLoading = false;
            // } else {
            //     this.listLoading = false;
            // }
        },
        restCallback() {
            // 用来补充默认rest不足的问题
        },
        getList() {
            this.listLoading = true;
            var postData = this.reduceParams(this.$$queryStub);
            fetchProList({
                ...postData,
                pageNo:this.pageNo,
                pageSize:this.pageSize
            }).then(res => {
                this.list = res.data.list;
                this.total = res.data.total;
                this.listLoading = false;
            });
        },
        reduceParams($$imData) {
            if (!$$imData || $$imData.size == 0) return {};
            const $$postData = $$imData
                .set('applyTimeStart', common.rangeObjToTimestamp($$imData.get('timeRange').toJS()).applyTimeStart)
                .set('applyTimeEnd', common.rangeObjToTimestamp($$imData.get('timeRange').toJS()).applyTimeEnd)
                .delete('timeRange')
            return $$postData.toJS();
        },
        handleProFilter() {
            this.pageNo = 1;
            if(this.listQuery.projectName){
                this.$$queryStub = fromJS(this.listQuery);
                this.getList();
                this.listLoading = false;
            }
        },
        handleCurrentChange(val) {
            this.pageNo = val;
            this.getList();
            this.listLoading = false;
        },
        selectProject(row) {
            this.name = row.projectName;
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
