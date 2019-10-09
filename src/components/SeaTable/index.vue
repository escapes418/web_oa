<template>
    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
                <el-table-column align="center" label="客户编号">
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
                <el-table-column align="center" label="统一社会信用代码" width="120px">
                    <template slot-scope="scope">
                        <span class="ignore-detail">{{scope.row.creditCode}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="客户级别" width="120px">
                    <template slot-scope="scope">
                        <span>{{scope.row.custStageName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="所属区域" width="120px">
                    <template slot-scope="scope">
                        <span>{{scope.row.officeName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="规模（万元/月）" width="110px">
                    <template slot-scope="scope">
                        <span>{{scope.row.custCompanySize}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="联系人职位" width="120px">
                    <template slot-scope="scope">
                        <span>{{scope.row.linkManPost}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="行业" width="50px">
                    <template slot-scope="scope">
                        <span>{{scope.row.custTradesName}}</span>
                    </template>
                </el-table-column>
                <!-- <el-table-column align="center" label="市场负责人" width="120px">
                    <template slot-scope="scope">
                        <span>{{scope.row.man}}</span>
                    </template>
                </el-table-column> -->
                <el-table-column align="center" label="开放时间" width="140px">
                    <template slot-scope="scope">
                        <span>{{scope.row.time | stamp2TextDateFull}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作" width="320px">
                    <!-- <template slot-scope="scope">
                        <el-button v-if="custListPlace == 4 || custListPlace == 5" type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
                        <el-button v-if="custListPlace != 3" type="primary" size="mini" @click="handleDetail(scope.row)">详情</el-button>
                        <el-button v-if="custListPlace == 4 || custListPlace == 5" type="primary" size="mini" @click="downLoadContract(scope.row)">下载</el-button>
                        <el-button v-if="custListPlace == 4 || custListPlace == 5" type="primary" size="mini" @click="maintain(scope.row)">维护管理</el-button>
                    </template> -->
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="handleDetail(scope.row)">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
</template>
<script>
    import { mapState } from "vuex";
    export default {
        data() {
            return {
                tableKey: 0,
            }
        },
        computed:{
            ...mapState({
                custListPlace:state => state.cust.custListPlace,
            }),
        },
        props:{
            list:Array,
            listLoading:Boolean
        },
        methods:{
            handleDetail(row){
                this.$router.push({
                    path: "/inforManage/customerDetail",
                    query: { key: row.id}
                });
            }
        }
    }
</script>