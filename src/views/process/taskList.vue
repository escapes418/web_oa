<template>
    <div class="sjb-container calendar-list-container">
        <div class="filter-container">
        <div class="toolbar-item">
            <span class="item-label">流程编号/标题：</span>
            <el-input @keyup.enter.native="handleFilter" style="width: 180px;" class="filter-item" placeholder="请输入流程编号/标题" v-model.trim="listQuery.procName">
            </el-input>
        </div>
        <!-- <div class="toolbar-item">
            <span class="item-label">流程名称：</span>
            <el-input @keyup.enter.native="handleFilter" style="width: 180px;" class="filter-item" placeholder="请输入流程名称" v-model.trim="listQuery.procName">
            </el-input>
        </div> -->
        <div class="toolbar-item">
            <span class="item-label">申请人：</span>
            <el-input @keyup.enter.native="handleFilter" style="width: 180px;" class="filter-item" placeholder="请输入申请人名称" v-model.trim="listQuery.applyPerName">
            </el-input>
        </div>
        
        <div class="toolbar-item">
            <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
            <el-button class="filter-item" type="warning" v-waves icon="el-icon-delete" @click="restListQuery(restCallback)">重置</el-button>
            <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">新建</el-button>
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
                    <!-- <div class="toolbar-item">
                        <span class="item-label">项目名称：</span>
                        <el-select clearable style="width: 220px" class="filter-item" v-model="listQuery.projectId" placeholder="请选择">
                        <el-option v-for="item in proDic" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                        </el-select>
                    </div> -->
                    <!-- <div class="toolbar-item">
                        <span class="item-label">报销状态：</span>
                        <el-select clearable style="width: 120px" class="filter-item" v-model="listQuery.expenseStatus" placeholder="请选择">
                        <el-option v-for="item in expStatuList" :key="item.value" :label="item.name" :value="item.value">
                        </el-option>
                        </el-select>
                    </div> -->
                </div>
            </div>
        </el-collapse-transition>
        </div>

        <el-table :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
            style="width: 100%">
            <el-table-column align="center" label="产品名称" width="150px">
                <template slot-scope="scope">
                    <span style="color:#409EFF;cursor: Pointer;"  @click="showDetail(scope.row)">{{scope.row.procCode}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="模块名称" width="300px">
                <template slot-scope="scope">
                    <a>{{scope.row.procName}}</a>
                </template>
            </el-table-column>
            <el-table-column align="center" label="页面地址" width="90px">
                <template slot-scope="scope">
                    <span>{{scope.row.applyPerName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="责任人">
                <template slot-scope="scope">
                    <span>{{scope.row.applyTime}}</span>
                </template>
            </el-table-column>
            <el-table-column width="120px" align="center" label="优先级">
                <template slot-scope="scope">
                    <span>{{scope.row.expenseTotal}}</span>
                </template>
            </el-table-column>
            <el-table-column width="120px" align="center" label="描述">
                <template slot-scope="scope">
                    <span>{{scope.row.expenseTotal}}</span>
                </template>
            </el-table-column>
            <el-table-column width="120px" align="center" label="状态">
                <template slot-scope="scope">
                    <span>{{scope.row.expenseTotal}}</span>
                </template>
            </el-table-column>
            <el-table-column width="120px" align="center" label="计划开始时间">
                <template slot-scope="scope">
                    <span>{{scope.row.expenseTotal}}</span>
                </template>
            </el-table-column>
            <el-table-column width="120px" align="center" label="计划完成时间">
                <template slot-scope="scope">
                    <span>{{scope.row.expenseTotal}}</span>
                </template>
            </el-table-column>
            <el-table-column width="120px" align="center" label="实际完成时间">
                <template slot-scope="scope">
                    <span>{{scope.row.expenseTotal}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="230" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="showDetail(scope.row)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="新建任务" :visible.sync="dialogCreate" width="25%">
            <!-- <el-form ref='form' :model="form"> -->
            <el-form ref='form' label-width="150px" label-position="left">
                <el-form-item label="产品/模块名称：">
                    <el-cascader :options="options" v-model="post.selectedSubject" @change="subjectOnChange" style="width:280px;">
                    </el-cascader>
                </el-form-item>
                <el-form-item label="页面地址：">
                    <el-input v-model="post.name" style="width:280px;"></el-input>
                </el-form-item>
                <el-form-item label="责任人：">
                    <el-select class="filter-item" v-model="post.resourcesType" placeholder="请选择" style="width:280px;">
                        <el-option v-for="item in dictionary.chargeManList" :label="item.name" :value="item.value" :key="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="优先级：">
                    <el-select class="filter-item" v-model="post.resourcesType" placeholder="请选择" style="width:280px;">
                        <el-option v-for="item in dictionary.chargeManList" :label="item.name" :value="item.value" :key="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态：">
                    <el-select class="filter-item" v-model="post.resourcesType" placeholder="请选择" style="width:280px;">
                        <el-option v-for="item in dictionary.chargeManList" :label="item.name" :value="item.value" :key="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="计划开始时间：">
                    <el-date-picker type="datetime" placeholder="选择日期" v-model="post.date1" style="width: 280px;"></el-date-picker>
                </el-form-item>
                <el-form-item label="计划结束时间：">
                    <el-date-picker type="datetime" placeholder="选择日期" v-model="post.date1" style="width: 280px;"></el-date-picker>
                </el-form-item>
                <el-form-item label="实际完成时间：">
                    <el-date-picker type="datetime" placeholder="选择日期" v-model="post.date1" style="width: 280px;"></el-date-picker>
                </el-form-item>
                <el-form-item label="描述：">
                    <el-input v-model.trim="post.remarks" style="width:280px" type="textarea" :rows="3" :maxlength="300"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="dialogCreate = fasle">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <div class="pagination-container">
            <el-pagination background @current-change="handleCurrentChange" :current-page="pageNo" :page-size="20" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import common from '@/utils/common'
import { fetchList ,fetchProDic} from '@/api/pay'
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
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            },
            toolexpand:false,
            list: null,
            total: null,
            filterMarket:'',
            treeData:[],
            defaultProps:{
                children: 'userInfo',
                label: 'name'
            },
            pageNo: 1,
            pageSize: 20,
            listLoading: true,
            listQuery: {
                timeRange: [],
                expenseStatus:"",
                procName:"",
                applyPerName:"",
                beginApplyTime: "",
                endApplyTime: "",
            },
            expStatuList:[],
            proDic: [],

            //弹窗字段
            dialogCreate:false,
            //弹窗提交数据
            post:{

            },
            //字典个列表
            dictionary:{
                chargeManList:[]
            },
            //级联数据模拟结构
            options: [{
                value: 'zhinan',
                label: '指南',
                children: [{
                    value: 'shejiyuanze',
                    label: '设计原则',
                }, {
                    value: 'daohang',
                    label: '导航'
                }]
            }, {
                value: 'zujian',
                label: '组件',
                children: [{
                    value: 'basic',
                    label: 'Basic',
                }, {
                    value: 'form',
                    label: 'Form',
                }, {
                    value: 'data',
                    label: 'Data',
                }, {
                    value: 'notice',
                    label: 'Notice',
                    
                }, {
                    value: 'navigation',
                    label: 'Navigation',
                    
                }, {
                    value: 'others',
                    label: 'Others',
                }]
            }, {
                value: 'ziyuan',
                label: '资源',
                children: [{
                    value: 'axure',
                    label: 'Axure Components'
                }, {
                    value: 'sketch',
                    label: 'Sketch Templates'
                }, {
                    value: 'jiaohu',
                    label: '组件交互文档'
                }]
            }],
        }
    },
    created() {
        this.$$queryStub = this.$$listQuery;
        this.getList()
        this.listLoading = false
        fetchProDic({
            dictType:'oa_project'
        }).then(res =>{
            this.proDic = res.data
        })
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
    },
    methods: {
        handleCreate(){
            this.dialogCreate = true
        },
        subjectOnChange(){

        },
        getList() {
            var postData = this.reduceParams(this.$$queryStub);
            this.listLoading = true
            fetchList({
                ...postData,
                pageNo:this.pageNo,
                pageSize:this.pageSize
            }).then(response => {
                this.list = response.data.list
                this.total = response.data.total
                this.listLoading = false
            })
        },
        restCallback() {
                // 用来补充默认rest不足的问题
        },
        // 处理接口不一致情况
        reduceParams($$imData) {
            if (!$$imData || $$imData.size == 0) return {};
            console.log($$imData.get('timeRange'))
            const $$postData = $$imData
                .set('beginApplyTime', common.rangeObjToTimestamp($$imData.get('timeRange').toJS()).applyTimeStart)
                .set('endApplyTime', common.rangeObjToTimestamp($$imData.get('timeRange').toJS()).applyTimeEnd)
                .delete('timeRange')
            return $$postData.toJS();
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
        handleCurrentChange(val) {
            this.pageNo = val
            this.getList()
            this.listLoading = false;
        },
        showDetail(row){
            this.$router.push({
                path:'/me/payDetail',
                query: { key: row.id }
            })
        },
        submitForm(){
            this.dialogCreate = false
            console.log(this.post)
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.toolbar-row{
    margin: 5px 0 0 0 
}

</style>