<template>
    <div class="sjb-container calendar-list-container">
        <div class="filter-container">
            <div class="toolbar-item" >
                <span class="item-label">月份：</span>
                <el-date-picker
                    v-model="month"
                    type="month"
                    :clearable="false"
                    placeholder="选择月">
                </el-date-picker>
            </div>
            <div class="toolbar-item">
                <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
                <el-button class="filter-item" type="warning" v-waves icon="el-icon-delete" @click="restListQuery(restCallback)">重置</el-button>
            </div>
            <div class="toolmore-control">
                <div class="toolbar-item">
                <el-button class="filter-item" type="primary" v-waves icon="el-icon-download" @click="exportFile">导出Excel</el-button>
                </div>
            </div>
        </div>
        <el-table :data="list" border fit highlight-current-row style="width: 100%"  max-height="660">
            <el-table-column align="center" label="功能编号"  width="100px" fixed>
                <template slot-scope="scope">
                    <span class="ignore-detail">{{scope.row.subjectCode}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="编号"  width="80px" fixed>
                <template slot-scope="scope">
                    <span class="ignore-detail">{{scope.row.order}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="功能" fixed>
                <template slot-scope="scope">
                    <span class="ignore-detail">{{scope.row.function}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="产品端"  width="120px" fixed>
                <template slot-scope="scope">
                    <span class="ignore-detail">{{scope.row.producSide}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="上线时间"  width="100px" fixed>
                <template slot-scope="scope">
                    <span class="ignore-detail">{{scope.row.onlineTime}}</span>
                </template>
            </el-table-column>
            <el-table-column width="120px" align="center" label="使用次数">
                <template slot-scope="scope">
                    <span class="ignore-detail">{{scope.row.useCount}}</span>
                </template>
            </el-table-column>
            <el-table-column label="未完结" width="100px" align="center">
                <template slot-scope="scope">
                    <span class="ignore-detail">{{scope.row.unfinishedThis}}</span>
                </template>
            </el-table-column>
            <el-table-column  align="center" label="已完成" width="100px">
                <template slot-scope="scope">
                    <span class="ignore-detail">{{scope.row.finishedThis}}</span>
                </template>
            </el-table-column>
            <el-table-column  label="已完结" align="center" width="100px">
                <template slot-scope="scope">
                    <span class="ignore-detail">{{scope.row.finished}}</span>
                </template>
            </el-table-column>
            <el-table-column  label="本月完结单总审批时间（天）" align="center" width="120px">
                <template slot-scope="scope">
                    <span class="ignore-detail">{{scope.row.situationSumDate}}</span>
                </template>
            </el-table-column>
            <el-table-column  label="本月完结单总审批时间（秒）" align="center" width="120px">
                <template slot-scope="scope">
                    <span class="ignore-detail">{{scope.row.situationSumTime}}</span>
                </template>
            </el-table-column>
            <el-table-column  label="上月使用次数'" align="center" width="120px">
                <template slot-scope="scope">
                    <span class="ignore-detail">{{scope.row.useCountLast}}</span>
                </template>
            </el-table-column>
            <el-table-column label="上月完结单总审批时间（天）" align="center" width="120px">
                <template slot-scope="scope">
                    <span class="ignore-detail">{{scope.row.situationSumDateLast}}</span>
                </template>
            </el-table-column>
            <el-table-column label="上月完结单总审批时间（秒）" align="center" width="120px">
                <template slot-scope="scope">
                    <span class="ignore-detail">{{scope.row.situationSumTimeLast}}</span>
                </template>
            </el-table-column>
            <el-table-column label="年平均每月使用次数" align="center" width="120px">
                <template slot-scope="scope">
                    <span class="ignore-detail">{{scope.row.yearAverageCount}}</span>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script>
import common from '@/utils/common'
import { getApproval ,downApprove} from '@/api/report'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
import { toJS, fromJS, Map, List } from 'immutable';
import listQueryMix from '../../mixins/listQuery.mix'

export default {
    name: 'complexTable',
    directives: {
        waves
    },
    mixins: [listQueryMix],
    data() {
        return {
            list: [],
            month:new Date(),
            listQuery: {
                month: ""
            },
        }
    },
    created() {
        this.listQuery.month = common.timeParse(this.month);
        this.$$queryStub = fromJS(this.listQuery);
        this.getList()
    },
    mounted(){

    },
    methods: {
        getList() {
            var postData = this.$$queryStub.toJS();
            getApproval({
                ...postData
            }).then(res => {
                res.data.forEach((item,index) => {
                    item.order = index+1
                });
                this.list = res.data;
            })
        },
        handleFilter() {
            this.listQuery.month = common.timeParse(this.month);
            this.$$queryStub = fromJS(this.listQuery);
            this.getList();
        },
        restCallback(){
            this.month = new Date()
        },
        exportFile(){
            var postData = this.$$queryStub.toJS();
            downApprove({
                ...postData,
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
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.toolbar-row{
     margin: 5px 0 0 0  
}

.item-value{
    display:inline-block;
    border: 1px solid #dcdfe6;
    border-radius:4px;
    background: white;
    padding-left: 7px;
    line-height: 30px;
    width: 250px
}

</style>