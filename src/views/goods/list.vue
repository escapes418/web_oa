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
                <el-cascader :options="treeData" :props="props" v-model="listQuery.goodType" change-on-select :clearable="true">
                </el-cascader>
            </div>
            <div class="toolbar-item">
                <span class="item-label">放置地：</span>
                <el-select clearable filterable style="width: 220px" class="filter-item" v-model="listQuery.placeId" placeholder="请选择放置地">
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
                            <el-dropdown-item command='2' v-if="list.length">导出excel</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <!-- <el-button icon="el-icon-arrow-up" v-if="toolexpand" class="toolmore-control-btn" @click="toolexpand = false">收起</el-button>
                <el-button icon="el-icon-arrow-down" v-else class="toolmore-control-btn" @click="toolexpand = true">展开</el-button> -->
            </div>
            <!-- <el-collapse-transition>
                <div v-show="toolexpand">
                    <div class="toolbar-row">
                        <div class="toolbar-item">
                            <span class="item-label">状态变更时间：</span>
                            <el-date-picker v-model="listQuery.timeRange" type="daterange" class="filter-item" style="width:287px" placeholder="选择日期范围" :picker-options="pickerOptions">
                            </el-date-picker>
                        </div>
                    </div>
                </div>
            </el-collapse-transition> -->
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
                    <span style="color:#409EFF;cursor: Pointer;" :title="scope.row.goodCode"  @click="showDetail(scope.row)">{{scope.row.goodCode}}</span>
                </template>
            </el-table-column>
            <el-table-column width="100px" align="center" label="物品名称">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.goodName">{{scope.row.goodName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="物品类别" width="80px">
                <template slot-scope="scope">
                    <span>{{scope.row.goodTypeName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="单位">
                <template slot-scope="scope">
                    <span class="ignore-detail">{{scope.row.goodUnit}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="规格型号">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.goodSpec">{{scope.row.goodSpec}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="放置地" width="100px">
                <template slot-scope="scope">
                    <span class="ignore-detail" style="color:#409EFF;cursor: Pointer;" @click="showStore(scope.row)">{{scope.row.placeName.join(',')}}</span>
                </template>
            </el-table-column>
            <el-table-column width="150px" align="center" label="总库存数量">
                <template slot-scope="scope">
                    <span>{{scope.row.goodCount}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="金额" width="100px">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.goodTotal">{{scope.row.goodTotal}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="备注" width="100px">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.remarks">{{scope.row.remarks}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" class-name="small-padding fixed-width" min-width="150px">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="showDetail(scope.row)">编辑</el-button>
                    <el-button type="danger" @click="showDel(scope.row)" size="mini">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="上传入库" :visible.sync="dialogUpload" width="35%">
            <el-form ref='form' label-width="220px" label-position="left">
                <RedStar :required ="true">
                    <el-form-item label="批量导入的excel文件：">
                        <!-- <el-upload class="upload-img" :action="fileURL" :headers='{sessionid:token}' :on-remove="storeRemove" :before-upload = "beforeUpload" :http-request="upload" :on-success="storeSuccess" :file-list="attachment"> -->
                        <el-upload ref="upload" class="upload-img" :before-upload = "beforeUpload" :headers='{sessionid:token}' :action="fileURL" :auto-upload="false" :file-list="attachment" :on-success="storeSuccess" :on-exceed="storeExceed" :limit="1">
                            <el-button size="small" type="primary">选取文件</el-button>
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

        <el-dialog title="确认删除" width="25%" :visible.sync="dialogDelVisible">
            <span>确认删除物品编号为：{{row.goodCode}}的{{row.goodName}}？删除后，将不可找回！</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="delBtn">确认</el-button>
                <el-button @click="dialogDelVisible = false">取消</el-button>
            </span>
        </el-dialog>
        <el-dialog :title="row.goodName+'存放情况'" width="25%" :visible.sync="dialogStore">
            <el-table :data="row.places" border fit highlight-current-row style="width: 100%">
                <el-table-column align="center" label="放置地位置">
                    <template slot-scope="scope">
                        <span style="color:#409EFF;cursor: Pointer;" :title="scope.row.placeName">{{scope.row.placeName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="数量">
                    <template slot-scope="scope">
                        <span :title="scope.row.placeCount ">{{scope.row.placeCount}}</span>
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogStore = false">取消</el-button>
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
import { fetchList ,addGood,getPlaceList,importTemp,getTypes,delConsum,exportGood} from '@/api/goods';
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
            props:{
                value: 'id',
                children: 'children',
                label:'name'
            },
            toolexpand:false,
            maxLimit:false,
            treeData:[],
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
            dialogStore:false,
            row:{},

            fileURL: process.env.BASE_API + '/consumables/consumablesImport',
            uploadTips: config.tips,
            attachment:[]
        }
    },
    async created() {
        this.$$queryStub = this.$$listQuery;
        this.getList();

        getPlaceList({}).then(res=>{
            this.placeArr =  res.data;
        })

        getTypes({}).then(res=>{
            var newArr = [];
            common.transToTree(res.data, newArr,"ROOT");
            common.mapAndAddChildren(newArr);
            this.treeData = newArr; 
        })


    },
    mounted(){
        // let memberList = JSON.parse(localStorage.getItem("web_oa_member"));
        // var newArr = [];
        // common.transToTree(memberList, newArr,"ROOT");
        // common.mapAndAddChildren(newArr);
        // this.treeData = newArr; 
    },
    methods: {
        handleExport(type){
            if(type==1){
                this.dialogUpload = true
            }
            if(type==2){
                var postData = this.reduceParams(this.$$queryStub);
                exportGood({
                    ...postData
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
        },
        downloadTemp(){
            importTemp({}).then(res=>{
                if(res.code == 200){
                    var url = `./OA${res.data}`;
                    window.location.href = url;
                    this.$message({
                        message:res.message,
                        type:'success'
                    })
                }
            })
        },
        delBtn(){
            delConsum({
                id:this.row.id
            }).then(res=>{
                if(res.code == 200) {
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
                    this.dialogDelVisible = false;
                    this.getList();
                }
            })
        },
        showDel(row){
            this.dialogDelVisible = true;
            this.row = row;
        },
        showStore(row){
            this.dialogStore = true;
            this.row = row;
        },

        handleCreate(){
            this.$router.push({
                path:'/publicGoods/consumForm'
            })
        },
        handleStock(){
            this.$router.push({
                path:'/publicGoods/consumStock'
            })
        },
        handleReceive(){
            this.$router.push({
                path:'/publicGoods/consumReceive'
            })
        },
        handleVerify(){
            this.$router.push({
                path:'/publicGoods/consumVerify'
            })
        },
        getList() {
            var postData = this.reduceParams(this.$$queryStub);
            fetchList({
                ...postData,
                pageNo:this.pageNo,
                pageSize:this.pageSize
            }).then(response => {
                response.data.list.map(item=>{
                    item.placeName = []
                    item.places&&item.places.forEach(i => {
                        item.placeName.push(i.placeName)
                    });
                })
                this.list = response.data.list
                this.total = response.data.total
            })
        },
        restCallback() {
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
            this.$$queryStub = fromJS(this.listQuery);
            this.getList()
        },
        handleCurrentChange(val) {
            this.pageNo = val
            this.getList()
        },
        showDetail(row){
            this.$router.push({
                path:'/publicGoods/consumForm',
                query: { key: row.id }
            })
        },
        // storeSuccess(res, file, fileList) {
        //     if(res.data.resCode == 1){
        //         let url = res.data.storfiles.serverUrl + res.data.storfiles.url;
        //         this.attachment.push({ contractAttachmentUrl:res.data.storfiles.url ,name:file.name,url:url,fileType:5});
        //     }
        // },
        // // 附件移除
        // storeRemove(file, fileList) {
        //     this.attachment = []
        // },
        beforeUpload(file) {
            const isExcel = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","application/vnd.ms-excel"].indexOf(file.type) !== -1;
            if(!isExcel){
                this.$message({
                    message: "批量上传文件只能上传xls、xlsx格式文件！",
                    type: 'error'
                })
            }
            return isExcel&&utils.handleImgError(file)
        },
        storeExceed(){
            this.$message({
                message: "批量上传文件一次只能上传一个文件！",
                type: 'error'
            })
        },
        storeSuccess(res, file, fileList){
            this.attachment = fileList;
            if(res.status == 1){
                this.$message({
                    message: res.message,
                    type: 'error',
                    duration:10000
                })
            }
            if(res.code == 200){
                this.$message({
                    message: res.message,
                    type: 'success'
                })
                this.dialogUpload = false;
                this.getList()
            }
            this.attachment = []
        },
        confirmUpload(){
            this.$refs.upload.submit()
        },
        cancelStore(){
            this.attachment = []
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