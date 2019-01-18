<template>
    <div class="sjb-container calendar-list-container">
        <div class="filter-container">
            <div class="toolbar-item">
                <span class="item-label">流程名称/编号：</span>
                <el-input @keyup.enter.native="handleFilter" style="width: 160px;" class="filter-item" placeholder="请输入流程名称/编号" v-model.trim="listQuery.procName">
                </el-input>
            </div>
            <div class="toolbar-item">
                <span class="item-label">申请状态：</span>
                <el-select clearable style="width: 120px" class="filter-item" v-model="listQuery.resourcesApplyStatus" placeholder="请选择">
                    <el-option v-for="item in applyStatuList" :key="item.value" :label="item.name" :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="toolbar-item">
                <span class="item-label">项目名称：</span>
                <el-select remote filterable clearable style="width: 180px" class="filter-item" v-model="listQuery.projectId" placeholder="请输入项目名称" :remote-method="searchProject">
                    <el-option v-for="item in proDic" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="toolbar-item">
                <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
                <el-button class="filter-item" type="warning" v-waves icon="el-icon-delete" @click="restListQuery(restCallback)">重置</el-button>
                <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">新建资源申请</el-button>
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

        <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
            <el-table-column align="center" label="流程编号" width="150px">
                <template slot-scope="scope">
                    <span style="color:#409EFF;cursor: Pointer;" @click="showDetail(scope.row)">{{scope.row.procCode}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="流程名称" width="250px">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.procName">{{scope.row.procName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="申请人名称">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.applyPerName">{{scope.row.applyPerName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="项目名称" width="160px">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.projectName">{{scope.row.projectName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="资源类型" width="100px">
                <template slot-scope="scope">
                    <span>{{scope.row.resourcesTypeValue}}</span>
                </template>
            </el-table-column>
            <el-table-column width="150px" align="center" label="申请日期">
                <template slot-scope="scope">
                    <span class="ignore-detail">{{scope.row.applyTime}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="需求数量" width="70px">
                <template slot-scope="scope">
                    <span>{{scope.row.demandPersonelNum}}</span>
                </template>
            </el-table-column>
            <el-table-column width="120px" align="center" label="审批状态">
                <template slot-scope="scope">
                    <span class="ignore-detail">{{scope.row.resourcesStatusValue}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="showDetail(scope.row)">详情</el-button>
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
import { 
    fetchList,
    fetchProDic
 } from "@/api/resource";
import waves from "@/directive/waves"; // 水波纹指令
import { parseTime } from "@/utils";
import listQueryMix from '../../mixins/listQuery.mix'
import { toJS, fromJS, Map, List } from 'immutable';

export default {
    name: "complexTable",
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
            toolexpand: false,
            applyStatuList: [],
            tableKey: 0,
            list: null,
            total: null,
            listLoading: true,
            proDic: [],
            pageNo: 1,
            pageSize: 20,
            listQuery: {
                timeRange: [],
                billType:6,//单据类型:1:市场,2:实施,3:报销,4:接待申请,5:出差申请,6:资源申请
                procCode: "", // 流程编号 
                projectId: "", //项目名称
                resourcesApplyStatus: "", //申请状态   ~~~~~
                procName: "",  //流程名称
            }
        };
    },
    created() {
        this.getList();
        this.listLoading = false;
    },
    mounted() {
        let dicList = JSON.parse(localStorage.getItem("web_oa_dicList"));
        function selectDic(arr, type) {
            let temp = [];
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].type == type) {
                    temp.push(arr[i]);
                }
            }
            return temp;
        }

        this.applyStatuList = selectDic(dicList, "expense_status"); //申请状态
    },
    methods: {
        getList() {
            this.listLoading = true;
            var postData = this.reduceParams(this.$$queryStub);
            fetchList({
                ...postData,
                pageNo:this.pageNo,
                pageSize:this.pageSize
            }).then(response => {
                this.list = response.data.list;
                this.total = response.data.total;
                this.listLoading = false;
            });
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
        handleFilter() {
            this.pageNo = 1
            if(!this.listQuery.timeRange){
                this.listQuery.timeRange = []
            }
            this.$$queryStub = fromJS(this.listQuery);
            this.getList()
            this.listLoading = false;
        },
        reduceParams($$imData) {
            if (!$$imData || $$imData.size == 0) return {};
            const $$postData = $$imData
                .set('applyTimeStart', common.rangeObjToTimestamp($$imData.get('timeRange').toJS()).applyTimeStart)
                .set('applyTimeEnd', common.rangeObjToTimestamp($$imData.get('timeRange').toJS()).applyTimeEnd)
                .delete('timeRange')
            return $$postData.toJS();
        },
        restCallback() {
            this.proDic = []
            // 用来补充默认rest不足的问题
        },
        handleCurrentChange(val) {
            this.pageNo = val;
            this.getList();
            this.listLoading = false;
        },
        showDetail(row) {
            this.$router.push({
                path: "/me/resourceDetail",
                query: { key: row.id , pathType:'list'}
            });
        },
        handleCreate() {
            this.$router.push({ path: "/me/resourceForm" });
        }
    }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.toolbar-row {
    margin: 5px 0 0 0;
}

.order-w {
    width: 1200px;
    margin: 0 auto;
}
.log-dot {
    position: absolute;
    left: -9px;
    top: 0px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: rgba(0, 179, 0, 0.5);
}

.dot-core {
    width: 12px;
    height: 12px;
    margin-left: 3px;
    margin-top: 3px;
    border-radius: 50%;
    background: #00b300;
}

.sub-row .log-dot {
    background: transparent;
}

.sub-row .dot-core {
    background: #d1dbe5;
}

.sub-row .font-green {
    color: transparent !important;
}
.log-w {
    position: relative;
    margin-left: 75px;
}
.log-text {
    border-left: 1px solid #d1dbe5;
    padding-left: 20px;
    padding-bottom: 20px;
}
.log-title {
    line-height: 18px;
    padding-bottom: 5px;
}
.border-none {
    border-left: none;
}
.color-black {
    color: #000;
}
.color-orange {
    color: #f69c07;
}
.bold {
    font-weight: bold;
}
.linkButton:link,
.linkButton:visited {
    color: #319efd;
    text-decoration: none;
}
.linkButton:hover,
.linkButton:active {
    color: #319efd;
    text-decoration: underline;
}
.imgPre {
    width: 120px;
    height: 100px;
}
.ignore-detail {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
}
</style>