<template>
    <div class="sjb-container calendar-list-container">
        <div class="filter-container">
            <div class="toolbar-item">
                <span class="item-label">物品编号/名称/备注：</span>
                <el-input @keyup.enter.native="handleFilter" style="width: 220px;" class="filter-item" placeholder="物品编号/名称/备注" v-model.trim="listQuery.goodInfo">
                </el-input>
            </div>
            <div class="toolbar-item">
                <span class="item-label">物品类别：</span>
                <el-cascader :options="subsTree" v-model="listQuery.goodType" change-on-select label="value" :clearable="true">
                </el-cascader>
            </div>
            <div class="toolbar-item">
                <span class="item-label">放置地：</span>
                <el-select clearable filterable style="width: 220px" class="filter-item" v-model="listQuery.placeId" placeholder="请选择人员类型">
                    <el-option v-for="item in placeArr" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
            </div>
            
            <div class="toolbar-item">
                <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
                <el-button class="filter-item" type="warning" icon="el-icon-delete" @click="restListQuery(restCallback)">重置</el-button>
                <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">新增消耗品</el-button>
            </div>
            <div class="toolmore-control">
                <div class="toolbar-item">
                    <el-dropdown @command=handleExport>
                        <el-button type="primary" style="margin-left:10px">
                            批量入库/导出<i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command='1'>批量入库</el-dropdown-item>
                            <el-dropdown-item command='2'>导出excel</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <el-button icon="el-icon-arrow-up" v-if="toolexpand" class="toolmore-control-btn" @click="toolexpand = false">收起</el-button>
                <el-button icon="el-icon-arrow-down" v-else class="toolmore-control-btn" @click="toolexpand = true">展开</el-button>
            </div>
            <el-collapse-transition>
                <div v-show="toolexpand">
                    <div class="toolbar-row">
                        <div class="toolbar-item">
                            <span class="item-label">状态变更时间：</span>
                            <el-date-picker v-model="listQuery.timeRange" type="daterange" class="filter-item" style="width:287px" placeholder="选择日期范围"  :picker-options="pickerOptions">
                            </el-date-picker>
                        </div>
                    </div>
                </div>
            </el-collapse-transition>
        </div>

        <div class="filter-container">
            <div class="toolbar-item">
                <el-button class="filter-item" style="margin-left: 10px;" @click="handleStock" type="primary">物品入库</el-button>
                <el-button class="filter-item" style="margin-left: 10px;" @click="handleReceive" type="primary">出库领用</el-button>
                <el-button class="filter-item" style="margin-left: 10px;" @click="handleVerify" type="primary">核销库存</el-button>
            </div>
        </div>
        
        <el-table :data="list" border fit highlight-current-row style="width: 100%">
            <el-table-column align="center" label="物品编号">
                <template slot-scope="scope">
                    <span style="color:#409EFF;cursor: Pointer;" :title="scope.row.title"  @click="showDetail(scope.row)">{{scope.row.title}}</span>
                </template>
            </el-table-column>
            <el-table-column width="100px" align="center" label="物品名称">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.type">{{scope.row.type}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="物品类别" width="80px">
                <template slot-scope="scope">
                    <span>{{scope.row.initiator}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="单位">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.label">{{scope.row.label.join('，')}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="规格型号">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.progressStatus">{{scope.row.progressStatus}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="放置地" width="100px">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.curPrincipal">{{scope.row.curPrincipal}}</span>
                </template>
            </el-table-column>
            <el-table-column width="150px" align="center" label="库存数量">
                <template slot-scope="scope">
                    <span>{{scope.row.statusChangeTime | stamp2TextDateFull}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="金额" width="100px">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.curPrincipal">{{scope.row.curPrincipal}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="备注" width="100px">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.curPrincipal">{{scope.row.curPrincipal}}</span>
                </template>
            </el-table-column>
            <el-table-column width="460px" align="center" label="操作" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="showDetail(scope.row)">详情</el-button>
                    <el-button type="danger" @click="dialogDelVisible = true" size="mini">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="上传入库" :visible.sync="dialogUpload" width="25%">
            <el-form ref='form' label-width="200px" label-position="left">
                <RedStar :required ="true">
                    <el-form-item label="批量导入的excel文件：">
                        <el-upload class="upload-img" :action="fileURL" :headers='{sessionid:token}' :on-remove="storeRemove" :before-upload = "beforeUpload" :on-success="storeSuccess" :file-list="attachment">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">
                                只能上传xls、xlsx格式文件！
                            </div>
                        </el-upload>
                    </el-form-item>
                </RedStar>
                <RedStar :required ="true">
                    <el-form-item label="批量入库模板：">
                        <el-button size="small" @click="downloadTemp">下载模版</el-button>
                    </el-form-item>
                </RedStar>
                <el-form-item>
                    <el-button type="primary" @click="confirmUpload">立即创建</el-button>
                    <el-button @click="cancelStore">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-dialog title="系统提示？" width="25%" :visible.sync="dialogDelVisible">
            <span>确认删除物品编号为：xxx（物品编号）的xxx（物品名称）？删除后，将不可找回！</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="delBtn">确认</el-button>
                <el-button @click="dialogDelVisible = false">取消</el-button>
            </span>
        </el-dialog>
        <div class="pagination-container">
            <el-pagination background @current-change="handleCurrentChange" :current-page="pageNo" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import common from '@/utils/common';
import BaseTemp from '@/components/BaseTemp';
import Department from "@/components/Department";
import RedStar from '@/components/RedStar/RedStar.vue';
import { fetchList ,addGood,getPlaceList,downFile,getSubjectsNew} from '@/api/goods';
import { toJS, fromJS, Map, List } from 'immutable';
import { parseTime } from '@/utils';

import listQueryMix from '../../mixins/listQuery.mix';
import config from '@/utils/config';
import utils from '@/utils/utils';
import { mapState, mapGetters } from "vuex";

export default {
    mixins: [listQueryMix],
    components: {
        BaseTemp,
        RedStar,
        Department
    },
    computed: {
        ...mapState({
            token: state => state.user.token,
        })
    },

    data() {
        return {
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            },
            toolexpand:false,
            subsTree:[],
            list: [],
            total: null,
            pageNo: 1,
            pageSize: 20,
            placeArr:[],
            listQuery: {
                goodInfo:"",// 标题 ,
                goodType:[],// 类型
                placeId:"",// 放置地
                timeRange: [],
            },

            //批量上传
            dialogUpload:false,
            dialogDelVisible:false,

            fileURL: process.env.BASE_API + '/commonInfo/fileUpload',
            uploadTips: config.tips,
            attachment:[]
        }
    },
    async created() {
        this.$$queryStub = this.$$listQuery;
        this.getList()
        this.listLoading = false
        let res = await getSubjectsNew({});
        this.subsTree = res.data.list
        getPlaceList({}).then(res=>{
            this.placeArr =  res.data
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
        this.memberType = selectDic(dicList,"oa_needFlow_personType")

        let memberList = JSON.parse(localStorage.getItem("web_oa_member"));
        var newArr = [];
        common.transToTree(memberList, newArr);
        common.mapAndAddChildren(newArr);
        this.treeData = newArr;
        
    },
    methods: {
        handleExport(type){
            if(type==1){
                this.dialogUpload = true
            }
        },
        downloadTemp(){

        },
        delBtn(){

        },
        
        exportFile(type){
            var postData = this.reduceParams(this.$$queryStub);
            downFile({
                ...postData,
                tab:this.coopListPlace,
                exportContent:type 
            }).then(res=>{
                if(res.status == 0){
                    var url = `./OA${res.data}`;
                    window.location.href = url;
                    this.$message({
                        message:res.message,
                        type:'success'
                    })
                }
            })
        },

        handleCreate(){
            this.$router.push({
                path:'/goods/consumForm'
            })
        },
        handleStock(){
            this.$router.push({
                path:'/goods/consumStock'
            })
        },
        handleReceive(){
            this.$router.push({
                path:'/goods/consumReceive'
            })
        },
        handleVerify(){
            this.$router.push({
                path:'/goods/consumVerify'
            })
        },
        getList() {
            this.listLoading = true;
            var postData = this.reduceParams(this.$$queryStub);
            fetchList({
                ...postData,
                pageNo:this.pageNo,
                pageSize:this.pageSize,
                tab:this.coopListPlace
            }).then(response => {
                this.list = response.data.list
                this.total = response.data.total
                this.listLoading = false
            })
        },
        restCallback() {
            this.departName = '';
            // 用来补充默认rest不足的问题
        },
        // 处理接口不一致情况
        reduceParams($$imData) {
            if (!$$imData || $$imData.size == 0) return {};
            const $$postData = $$imData
                .set('inStartTime', common.rangeObjToTimestamp($$imData.get('timeRange').toJS()).applyTimeStart)
                .set('inEndTime', common.rangeObjToTimestamp($$imData.get('timeRange').toJS()).applyTimeEnd)
                .delete('timeRange')
            return $$postData.toJS();
        },
        handleFilter() {
            this.pageNo = 1;
            if(!this.listQuery.timeRange){
                this.listQuery.timeRange = [];
            }
            if(this.listQuery.personType&&!this.listQuery.deptOrUserId || !this.listQuery.personType&&this.listQuery.deptOrUserId){
                this.$message({
                    message: "人员类型和人员/部门筛选需配合使用！",
                    type: 'warning'
                })
                return
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
                path:'/oa/coopDetail',
                query: { key: row.id }
            })
        },
        storeSuccess(res, file, fileList) {
            if(res.data.resCode == 1){
                let url = res.data.storfiles.serverUrl + res.data.storfiles.url;
                this.attachment.push({ contractAttachmentUrl:res.data.storfiles.url ,name:file.name,url:url,fileType:5});
            }
        },
        // 附件移除
        storeRemove(file, fileList) {
            this.attachment.map((item, index) => {
                if (item.name == file.name) {
                    this.attachment.splice(index, 1);
                }
            })
        },
        beforeUpload(file) {
            const isExcel = "application/vnd.ms-excel" == file.type;
            if(!isExcel){
                this.$message({
                    message: "批量上传文件只能上传xls、xlsx格式文件！",
                    type: 'error'
                })
            }
            return isExcel&&utils.handleImgError(file)
        },
        confirmUpload(){

        },
        cancelStore(){
            this.attachment = [];
            this.dialogUpload = false;
        },
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.toolbar-row{
    margin: 5px 0 0 0 
}
.ignore-detail {
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
    margin-top: -3px;
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
.item-value {
    display: inline-block;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background: white;
    padding-left: 7px;
    line-height: 30px;
    width: 200px;
}
</style>