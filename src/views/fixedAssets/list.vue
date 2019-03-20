<template>
    <div class="sjb-container calendar-list-container">
        <div class="filter-container">
            <div class="toolbar-item">
                <span class="item-label">精确搜索：</span>
                <el-input @keyup.enter.native="handleFilter" style="width: 250px;" class="filter-item" placeholder="请输入资产编号/名称/规格型号/备注" v-model.trim="listQuery.keyword">
                </el-input>
            </div>
            <div class="toolbar-item">
                <span class="item-label">状态：</span>
                <el-select clearable style="width: 120px" class="filter-item" v-model="listQuery.status" placeholder="请选择">
                    <el-option v-for="item in assetStatuList" :key="item.value" :label="item.name" :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="toolbar-item">
                <span class="item-label">资产类别：</span>
                <el-cascader style="width: 140px" 
                    class="filter-item" :options="assetType" :props="PropsTree" v-model="listQuery.assetTypeIdList" change-on-select placeholder="请选择">
                </el-cascader>
            </div>
            <div class="toolbar-item">
                <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
                <el-button class="filter-item" type="warning" v-waves icon="el-icon-delete" @click="restListQuery(restCallback)">重置</el-button>
                <el-button class="filter-item" style="margin-left: 10px;" @click="goFrom" type="primary" icon="el-icon-edit">新增资产</el-button>
            </div>
            <div class="toolmore-control">
                <div class="toolbar-item">
                    <el-dropdown @command=handleCreate>
                        <el-button type="primary" style="margin-left:10px">
                            批量入库/导出<i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command='1'>批量入库</el-dropdown-item>
                            <el-dropdown-item command='2'>导出资产</el-dropdown-item>
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
                            <span class="item-label">入库时间：</span>
                            <el-date-picker v-model="listQuery.timeRange" type="daterange" class="filter-item" style="width:287px" placeholder="选择日期范围">
                            </el-date-picker>
                        </div>
                    </div>
                </div>
            </el-collapse-transition>
        </div>
        <div class="filter-container">
            <div class="toolbar-item">
                <el-button class="filter-item" type="primary" v-waves @click="goUseOrMove">资产领用/转移</el-button>
                <el-button class="filter-item" type="primary" v-waves @click="goRelibrary">资产退库</el-button>
                <el-button class="filter-item" type="primary" v-waves @click="goVerifyAssets">核销库存</el-button>
            </div>
        </div>

        <el-table :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
            <el-table-column type="expand" label-class-name="progress__label"> 
                    <template slot-scope="scope">
                        <el-form label-position="left" inline class="progress-table-expand" style="font-size:12px;" >
                            <el-form-item label="计量单位：">
                                <span>{{scope.row.unit}}</span>
                            </el-form-item>
                            <el-form-item label="保修起始时间：">
                                <span>{{scope.row.guaranteeBeginTime | stamp2TextDate}}</span>
                            </el-form-item>
                            <el-form-item label="供应商：">
                                <span>{{scope.row.assetSupplierName}}</span>
                            </el-form-item>
                            <el-form-item label="供应商联系方式：" style="font-size:12px;">
                                <span>{{scope.row.supplierContactWay}}</span>
                            </el-form-item>
                            <el-form-item label="过保时间：">
                                <span >{{scope.row.guaranteeEndTime | stamp2TextDate}}</span>
                            </el-form-item>
                            <el-form-item label="租用/购入时间：">
                                <span>{{scope.row.buyTime | stamp2TextDate}}</span>
                            </el-form-item>
                            <el-form-item label="使用部门：">
                                <span>{{scope.row.usingOffice}}</span>
                            </el-form-item>
                            <el-form-item label="工位：">
                                <span>{{scope.row.usingWorkplace}}</span>
                            </el-form-item>
                            <el-form-item label="所属公司：">
                                <span>{{scope.row.company}}</span>
                            </el-form-item>
                            <el-form-item label="领用日期：">
                                <span>{{scope.row.pickDate | stamp2TextDate}}</span>
                            </el-form-item>
                            <el-form-item label="品牌：">
                                <span>{{scope.row.brand}}</span>
                            </el-form-item>
                            <el-form-item label="备注：">
                                <span>{{scope.row.remarks}}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
            <el-table-column width="80px" align="center" label="资产编号">
                <template slot-scope="scope">
                    <span>{{scope.row.code}}</span>
                </template>
            </el-table-column>
            <el-table-column width="120px" align="center" label="资产状态">
                <template slot-scope="scope">
                    <span>{{scope.row.status}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="资产名称">
                <template slot-scope="scope">
                    <span>{{scope.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column width="120px" align="center" label="资产类别">
                <template slot-scope="scope">
                    <span>{{scope.row.assetTypeName}}</span>
                </template>
            </el-table-column>
            <el-table-column width="140px" align="center" label="入库时间">
                <template slot-scope="scope">
                    <span>{{scope.row.entryTime | stamp2TextDate}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="序列号">
                <template slot-scope="scope">
                    <span>{{scope.row.serialNo}}</span>
                </template>
            </el-table-column>
            <el-table-column width="120px" align="center" label="规格型号">
                <template slot-scope="scope">
                    <span>{{scope.row.specificationType}}</span>
                </template>
            </el-table-column>
            <el-table-column width="120px" align="center" label="来源">
                <template slot-scope="scope">
                    <span>{{scope.row.source}}</span>
                </template>
            </el-table-column>
            <el-table-column width="120px" align="center" label="金额">
                <template slot-scope="scope">
                    <span>{{scope.row.money}}</span>
                </template>
            </el-table-column>
            <el-table-column width="150px" align="center" label="付费截止时间">
                <template slot-scope="scope">
                    <span>{{scope.row.dueTime | stamp2TextDate}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="放置地">
                <template slot-scope="scope">
                    <span>{{scope.row.assetPlaceName}}</span>
                </template>
            </el-table-column>
            <el-table-column width="120px" align="center" label="使用人">
                <template slot-scope="scope">
                    <span>{{scope.row.usingPerson}}</span>
                </template>
            </el-table-column>
            <el-table-column width="160px" align="center" label="操作" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="showDetail(scope.row)">编辑</el-button>
                    <el-button type="danger" size="mini" @click="deleteItem(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination-container">
            <el-pagination background @current-change="handleCurrentChange" :current-page="pageNo" :page-size="20" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>

        <el-dialog title="选择市场负责人" :visible.sync="dialogMarketVisible">
            <el-input placeholder="输入关键字进行过滤" v-model="filterMarket"></el-input>
            <el-tree :data="treeData" :props="defaultProps" @node-click="handleMarketClick" :filter-node-method="marketNode" ref="marketTree"></el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogMarketVisible = false">取消</el-button>
                <el-button type="primary" @click="selectMarket">确认</el-button>
            </div>
        </el-dialog>
        <el-dialog title="上传入库" width="35%" :visible.sync="showStorage" @close="closeUpload">
            <el-form ref='form' label-width="220px" label-position="left">
                <RedStar :required ="true">
                    <el-form-item label="请选择需要导入的excel文件：">
                        <!-- <el-upload class="upload-img" :action="fileURL" :headers='{sessionid:token}' :on-remove="storeRemove" :before-upload = "beforeUpload" :http-request="upload" :on-success="storeSuccess" :file-list="attachment"> -->
                        <el-upload ref="upload" class="upload-img" :before-upload = "beforeUpload" :headers='{sessionid:token}' :action="fileURL" :auto-upload="false" :file-list="expenseAttachment" :on-success="handleSuccess" :on-exceed="handleExceed" :limit="1">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">
                                只能上传xls、xlsx格式文件！
                            </div>
                        </el-upload>
                    </el-form-item>
                </RedStar>
                <RedStar :required ="true">
                    <el-form-item label="批量入库模板：">
                        <el-button size="small" @click="DLmodel">下载模版</el-button>
                    </el-form-item>
                </RedStar>
                <el-form-item>
                    <el-button type="primary" @click="confirmUpload">立即创建</el-button>
                    <el-button @click="cancelBtn">取消</el-button>
                </el-form-item>
            </el-form>
            <!-- <span>请选择需要导入的excel文件：</span>
           
            <el-upload class="upload-img" ref="upload" :action="fileURL" :headers='{ sessionid:token}' :before-upload="beforeUpload" :on-success="handleSuccess" :file-list="expenseAttachment">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">
                    只能上传xls格式文件!
                </div>
            </el-upload>
            <div style="height:10px"></div>
            <span>批量入库模板：</span>
            <el-button @click="DLmodel">下载模板</el-button>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showStorage = false">取消</el-button>
            </span> -->
        </el-dialog>
        <el-dialog title="是否删除" width="300px" :visible.sync="showDelete" el-dialog>
            <span>确认删除该条目？</span>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showDelete = false">取消</el-button>
                <el-button type="primary" @click="confirmDelete">确认</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import common from '@/utils/common'
import { queryAssetList, queryAssetTypeTree,assetExport,assetImportModel,deleteAssetById } from '@/api/fixedAssets'
import { mapState, mapGetters } from "vuex";
import waves from '@/directive/waves' // 水波纹指令
import config from '@/utils/config'
import utils from '@/utils/utils'
import { toJS, fromJS, Map, List } from 'immutable';
import listQueryMix from '../../mixins/listQuery.mix'
import RedStar from '@/components/RedStar/RedStar.vue';

export default {
    directives: {
        waves
    },
    components: {
        RedStar,
    },
    mixins: [listQueryMix],
    data() {
        return {
            toolexpand:false,
            list: null,
            total: null,
            dialogMarketVisible:false,
            filterMarket:'',
            treeData:[],
            defaultProps:{
                children: 'userInfo',
                label: 'name'
            },
            PropsTree:{
                children: 'children',
                label: 'name',
                value:"id",
            },
            uploadTips: config.tips,
            fileURL: process.env.BASE_API + '/asset/assetImport',
            showStorage:false,
            showUpload: false,
            pageNo: 1,
            pageSize: 20,
            listLoading: true,
            showDelete:false,
            deleteRow: "",
            expenseAttachment: [], 
            listQuery: {
                timeRange: [],
                assetTypeIdList:[],
                keyword:"",
                status:"",
            },
            assetStatuList:[],
            proDic: [],
            assetType: [],
        }
    },
    computed: {
        ...mapState({
            token: state => state.user.token,
        }),
    },
    created() {
        this.getList()
        this.listLoading = false;
        this.queryAssetTypeTree()
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

        this.assetStatuList = selectDic(dicList,"asset_status")
    },
    methods: {
        selectMarket() {
            if(this.marketLeader ==''){
                this.$message({
                    message: '请选择市场负责人',
                    type: 'warning'
                })
                return
            }
            this.dialogMarketVisible = false
        },
        DLmodel(){
            assetImportModel().then(res=>{
                if(res.status == 0){
                    var url = `./OA${res.data}`;
                    window.location.href = url;
                    this.$message({
                        message:res.message,
                        type:'success'
                    })
                    this.showStorage = false
                }
            })
        },
        handleRemove(file, fileList) {
            this.expenseAttachment.map((item, index) => {
                if (item.name == file.name) {
                    this.expenseAttachment.splice(index, 1)
                }
            })
        },
        handleSuccess(res, file, fileList) {
            this.expenseAttachment.push({ name:file.name})
            if(res.status == 0){
                this.$message({
                    message:res.message,
                    type:'success'
                })
                this.showStorage = false;
            } else {
                this.$message({
                    duration: 10000,
                    showClose: true,
                    message: res.message || "网络异常",
                    type: 'error'
                })
            }
            this.expenseAttachment.pop()
        },
        cancelBtn(){
            this.showStorage = false;
            this.expenseAttachment = []
        },
        beforeUpload(file) {
            const isImage = ["application/vnd.ms-excel","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"].indexOf(file.type) !== -1
            if(!isImage){
                 this.$message({
                    message: "只能上传xls、xlsx格式文件",
                    type: 'error'
                })
            }
            return isImage
        },
        handleExceed(){
            this.$message({
                message: "批量上传文件一次只能上传一个文件！",
                type: 'error'
            })
        },
        confirmUpload(){
            this.$refs.upload.submit()
        },
        queryAssetTypeTree(){
            queryAssetTypeTree().then(res => {
                var newArr = [];
                common.transToTree(res.data, newArr,"ROOT");
                this.assetType = newArr
            })
        },
        handleMarketClick(data) {
            this.marketLeader = data.name
            this.filter.marketLeaderId = data.id
        },
        marketNode(value, data){
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        getList() {
            this.listLoading = true;
            var postData = this.reduceParams(this.$$queryStub);
            queryAssetList({
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
            this.proDic = []
        },
        // 处理接口不一致情况
        reduceParams($$imData) {
            if (!$$imData || $$imData.size == 0) return {};
            const $$postData = $$imData
                .set('entryTimeBegin', common.rangeObjToTimestamp($$imData.get('timeRange').toJS()).applyTimeStart)
                .set('entryTimeEnd', common.rangeObjToTimestamp($$imData.get('timeRange').toJS()).applyTimeEnd)
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
            this.$router.push({ path: "/publicGoods/fixedAssetsFrom/" + row.id });
        },
        deleteItem(row){
            this.deleteRow = row
            this.showDelete = true
        },
        confirmDelete(){
            deleteAssetById({
               id:this.deleteRow.id
            }).then(res=>{
                if(res.status == 0){
                    this.showDelete = false
                    this.$message({
                        message:res.message,
                        type:'success'
                    })
                }
            })
        },
        goFrom() {
            this.$router.push({path: '/publicGoods/fixedAssetsFrom/0'})
        },
        exportFile(){
            var postData = this.reduceParams(this.$$queryStub);
            assetExport({
                ...postData
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
        handleCreate(type){
            if(type==1){
                this.showStorage = true
            }else if(type==2){
                this.exportFile()
            }
        },
        goUseOrMove(){
            this.$router.push({path:'/publicGoods/useOrMove'})
        },
        goRelibrary(){
            this.$router.push({path:'/publicGoods/relibrary'})
        },
        goVerifyAssets(){
            this.$router.push({path:'/publicGoods/verifyAssets'})
        },
        confirmUpload(){
            this.$refs.upload.submit()
        },
        closeUpload(){
            this.getList()
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
}
.upload-img{
    width: 200px;
    display: inline;
}

.progress-table-expand{
    font-size: 0;
}
.progress-table-expand label {
    width: 90px;
    color: #99a9bf;
    font-size: 12px;
}
.progress__label{
    font-size: 12px!important;
}
.progress-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 19%;
    font-size: 12px!important;
}


</style>