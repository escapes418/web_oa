<template>
    <div class="sjb-container calendar-list-container">
        <div class="filter-container">
            <div class="toolbar-item">
                <span class="item-label">年份：</span>
                <el-date-picker
                    :clearable="false"
                    v-model="year"
                    align="right"
                    type="year"
                    placeholder="选择年">
                </el-date-picker>
            </div>
            <Department type="list" @on-confirm="depConfirm" :Dvalue="officeName"></Department>
            <div class="toolbar-item">
                <span class="item-label">员工姓名：</span>
                <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="请输入员工姓名" v-model="listQuery.employeeName">
                </el-input>
            </div>
            <div class="toolbar-item">
                <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
                <el-button class="filter-item" type="warning" v-waves icon="el-icon-delete" @click="restListQuery(restCallback)">重置</el-button>
            </div>
            <div class="toolmore-control">
                <div class="toolbar-item">
                    <el-dropdown @command=handleExport>
                        <el-button type="primary" style="margin-left:10px">
                            批量入库/导出<i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command='1'>租车费用批量入库</el-dropdown-item>
                            <el-dropdown-item command='2'>加油费用批量入库</el-dropdown-item>
                            <!-- <el-dropdown-item command='3' v-if="list.length">导出excel</el-dropdown-item> -->
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                
            </div>
        </div>
        <el-alert
            title="备注：该表单位（元），所有显示费用为已审批完结费用。"
            class="remarkInfo"
            :closable="false"
            show-icon
            type="info">
        </el-alert>
        <el-table :data="list" border fit highlight-current-row style="width: 100%"  max-height="660">
            <el-table-column align="center" label="员工名称"  width="120px" fixed>
                <template slot-scope="scope">
                    <span>{{scope.row.employeeName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="部门名称"  width="180px" fixed>
                <template slot-scope="scope">
                    <span>{{scope.row.officeName}}</span>
                </template>
            </el-table-column>
            <el-table-column width="120px" align="center" :label="year.getFullYear()+'年1月'">
                <template slot-scope="scope">
                    <span :title="scope.row.febCount">{{scope.row.janCount}}</span>
                </template>
            </el-table-column>
            <el-table-column :label="year.getFullYear()+'年2月'" width="120px" align="center">
                <template slot-scope="scope">
                    <span :title="scope.row.febCount">{{scope.row.febCount}}</span>
                </template>
            </el-table-column>
            <el-table-column  align="center" :label="year.getFullYear()+'年3月'" width="120px">
                <template slot-scope="scope">
                    <span :title="scope.row.marCount">{{scope.row.marCount}}</span>
                </template>
            </el-table-column>
            <el-table-column  :label="year.getFullYear()+'年4月'" align="center" width="120px">
                <template slot-scope="scope">
                    <span :title="scope.row.aprCount">{{scope.row.aprCount}}</span>
                </template>
            </el-table-column>
            <el-table-column  :label="year.getFullYear()+'年5月'" align="center" width="120px">
                <template slot-scope="scope">
                    <span :title="scope.row.mayCount">{{scope.row.mayCount}}</span>
                </template>
            </el-table-column>
            <el-table-column  :label="year.getFullYear()+'年6月'" align="center" width="120px">
                <template slot-scope="scope">
                    <span :title="scope.row.junCount">{{scope.row.junCount}}</span>
                </template>
            </el-table-column>
            <el-table-column  :label="year.getFullYear()+'年7月'" align="center" width="120px">
                <template slot-scope="scope">
                    <span :title="scope.row.julCount">{{scope.row.julCount}}</span>
                </template>
            </el-table-column>
            <el-table-column :label="year.getFullYear()+'年8月'" align="center" width="120px">
                <template slot-scope="scope">
                    <span :title="scope.row.augCount">{{scope.row.augCount}}</span>
                </template>
            </el-table-column>
            <el-table-column :label="year.getFullYear()+'年9月'" align="center" width="120px">
                <template slot-scope="scope">
                    <span :title="scope.row.sepCount">{{scope.row.sepCount}}</span>
                </template>
            </el-table-column>
            <el-table-column :label="year.getFullYear()+'年10月'" align="center" width="120px">
                <template slot-scope="scope">
                    <span :title="scope.row.octCount">{{scope.row.octCount}}</span>
                </template>
            </el-table-column>
            <el-table-column :label="year.getFullYear()+'年11月'" align="center" width="120px">
                <template slot-scope="scope">
                    <span :title="scope.row.novCount">{{scope.row.novCount}}</span>
                </template>
            </el-table-column>
            <el-table-column :label="year.getFullYear()+'年12月'" align="center" width="120px">
                <template slot-scope="scope">
                    <span :title="scope.row.decCount">{{scope.row.decCount}}</span>
                </template>
            </el-table-column>
            <el-table-column label="总计（行）" align="center" width="120px">
                <template slot-scope="scope">
                    <span :title="scope.row.yearTotal">{{scope.row.yearTotal}}</span>
                </template>
            </el-table-column>
            <el-table-column width="100px" align="center" label="操作" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="handleUpdate(scope.row)" :disabled="!scope.row.officeName">详情</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="上传入库" :visible.sync="dialogUpload" width="35%">
            <el-form ref='form' label-width="220px" label-position="left">
                <RedStar :required ="true">
                    <el-form-item label="选择需要导入的月份：">
                        <el-date-picker
                            v-model="month"
                            align="right"
                            type="month"
                            placeholder="选择月">
                        </el-date-picker>
                    </el-form-item>
                </RedStar>
                <RedStar :required ="true">
                    <el-form-item label="批量导入的excel文件：">
                        <!-- <el-upload class="upload-img" :action="fileURL" :headers='{sessionid:token}' :on-remove="storeRemove" :before-upload = "beforeUpload" :http-request="upload" :on-success="storeSuccess" :file-list="attachment"> -->
                        <el-upload ref="upload" class="upload-img" :before-upload = "beforeUpload" :headers='{sessionid:token}' :data="uploadData" :action="fileURL" :auto-upload="false" :file-list="attachment" :on-success="storeSuccess" :on-exceed="storeExceed" :limit="1">
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

        <div class="pagination-container">
            <el-pagination background  @current-change="handleCurrentChange" :current-page="pageNo" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import common from '@/utils/common';
import Department from "@/components/Department";
import RedStar from '@/components/RedStar/RedStar.vue';
import { getRentFuel ,exportTemp} from '@/api/report'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils';
import { toJS, fromJS, Map, List } from 'immutable';
import listQueryMix from '../../mixins/listQuery.mix'
import config from '@/utils/config';
import utils from '@/utils/utils';
import { mapState, mapGetters } from "vuex";

export default {
    directives: {
        waves
    },
    computed: {
        ...mapState({
            token: state => state.user.token,
        })
    },
    components: {
        Department,
        RedStar
    },
    mixins: [listQueryMix],
    data() {
        return {
            year:new Date(),
            month:"",
            rentRefuelType:"",
            officeName:"",
            list: [],
            total: 0,
            pageNo: 1,
            pageSize: 20,
            uploadData:null,
            listQuery: {
                officeId: "",
                year: "",
                employeeName:""
            },
            
            attachment:[],
            dialogUpload:false,
            fileURL: process.env.BASE_API + '/webRentRefuel/rentRefuelImport',
            uploadTips: config.tips,
        }
    },
    created() {
        this.listQuery.year = common.timeParse(this.year)
        this.$$queryStub = fromJS(this.listQuery);
        this.getList()
    },
    mounted(){

        //部门树
    },
    methods: {
        handleUpdate(row){
            this.$router.push({
                path:'/report/rentFuelDetail',
                query: { employeeId: row.employeeId ,year:common.timeParse(this.year)}
            })
        },
        getList() {
            var postData = this.$$queryStub.toJS();
            getRentFuel({
                ...postData,
                pageNo:this.pageNo,
                pageSize:this.pageSize
            }).then(res => {
                if(this.pageNo == '1'&&res.data.totalSum){
                    res.data.page.list.unshift(res.data.totalSum);
                }
                this.list = res.data.page.list;
                this.total = res.data.total;
            })
        },
        handleFilter() {
            this.listQuery.year = common.timeParse(this.year)
            this.$$queryStub = fromJS(this.listQuery);
            this.pageNo = 1;
            this.getList();
        },
        handleCurrentChange(val) {
            this.pageNo = val;
            this.getList();
        },
        handleExport(type){
            if(type==1 || type==2){
                this.rentRefuelType = type
                this.dialogUpload = true
            }
            // if(type==3){
            //     var postData = this.$$queryStub.toJS();
            //     exportGood({
            //         ...postData
            //     }).then(res=>{
            //         if(res.code == 200){
            //             var url = `./OA${res.data.downloadUrl}`;
            //             window.location.href = url;
            //             this.$message({
            //                 message:res.message,
            //                 type:'success'
            //             })
            //         }
            //     })
            // }
        },
        restCallback(){
            this.officeName = "";
            this.year = new Date()
        },
        downloadTemp(){
            exportTemp({
                rentRefuelType:this.rentRefuelType
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
        },
        beforeUpload(file) {
            const isExcel = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","application/vnd.ms-excel"].indexOf(file.type) !== -1;
            if(!isExcel){
                this.$message({
                    message: "批量上传文件只能上传xls、xlsx格式文件！",
                    type: 'error'
                })
            }
           
            if(isExcel&&utils.handleImgError(file)){
                this.uploadData = {rentRefuelType:this.rentRefuelType,month: common.timeParse(this.month)};
                let promise = new Promise((resolve) => {
                    this.$nextTick(function () {
                        resolve(true);
                    });
                });
                return promise; 
            }else{
                return isExcel&&utils.handleImgError(file)
            }
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
            if(!this.month){
                this.$message({
                    message: "请选择需要上传的月份！",
                    type: 'error'
                })
                return
            }
            this.$refs.upload.submit()
        },
        cancelStore(){
            this.attachment = []
            this.dialogUpload = false;
        },
        depConfirm(data){
            if(data){
                this.listQuery.officeId = data.id;
                this.officeName = data.name;
            }else{
                this.listQuery.officeId = "";
                this.officeName = "";
            }
        },
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