<template>
    <div class="sjb-container calendar-list-container">
        <div class="filter-container">
            <div class="toolbar-item">
                <span class="item-label">流程编号/标题：</span>
                <el-input @keyup.enter.native="handleFilter" style="width: 180px;" class="filter-item" placeholder="请输入流程编号/标题" v-model.trim="listQuery.procCodeOrTitle">
                </el-input>
            </div>
            <div class="toolbar-item">
                <span class="item-label">收款方：</span>
                <el-input @keyup.enter.native="handleFilter" style="width: 180px;" class="filter-item" placeholder="请输入收款方" v-model.trim="listQuery.payeeName">
                </el-input>
            </div>
            <div class="toolbar-item">
                <span class="item-label">流程名称：</span>
                <el-input @keyup.enter.native="handleFilter" style="width: 180px;" class="filter-item" placeholder="请输入流程编号/标题" v-model.trim="listQuery.procName">
                </el-input>
            </div>
            <div class="toolbar-item">
                <span class="item-label">支付状态：</span>
                <el-select clearable style="width: 120px" class="filter-item" v-model="listQuery.paymentStatus" placeholder="请选择">
                    <el-option v-for="item in expensePayment" :key="item.value" :label="item.name" :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="toolbar-item">
                <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
                <el-button class="filter-item" type="warning" v-waves icon="el-icon-delete" @click="restListQuery(restCallback)">重置</el-button>
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
        <div class="filter-container">
            <div class="toolbar-item">
                <el-button class="filter-item" type="primary" @click="showImport">导入Excel</el-button>
                <el-button class="filter-item" type="primary" @click="downloadTemp">导出Excel</el-button>
            </div>
        </div>
        <el-table :data="list" border fit highlight-current-row style="width: 100%">
            <el-table-column align="center" label="流程编号" fixed width="150px">
                <template slot-scope="scope">
                    <span style="color:#409EFF;cursor: Pointer;">{{scope.row.procCode}}</span>
                </template>
            </el-table-column>
            <el-table-column width="320px" align="center" fixed label="流程名称">
                <template slot-scope="scope">
                    <span>{{scope.row.procName}}</span>
                </template>
            </el-table-column>
            <el-table-column width="100px" align="center" label="申请人名称">
                <template slot-scope="scope">
                    <span>{{scope.row.applyPerName}}</span>
                </template>
            </el-table-column>
            <el-table-column width="100px" align="center" label="申请日期">
                <template slot-scope="scope">
                    <span>{{scope.row.applyTime | stamp2TextDate}}</span>
                </template>
            </el-table-column>
            <el-table-column width="150px" align="center" label="所属公司">
                <template slot-scope="scope">
                    <span>{{ scope.row.invoiceCompany }}</span>
                </template>
            </el-table-column>
            <el-table-column width="120px" align="center" label="收款方">
                <template slot-scope="scope">
                    <span>{{ scope.row.payeeName }}</span>
                </template>
            </el-table-column>
            <el-table-column width="120px" align="center" label="开户行">
                <template slot-scope="scope">
                    <span>{{scope.row.payeeBank}}</span>
                </template>
            </el-table-column>
            <el-table-column width="120px" align="center" label="收款账号">
                <template slot-scope="scope">
                    <span>{{scope.row.payeeCardNum}}</span>
                </template>
            </el-table-column>
            <el-table-column width="120px" align="center" label="支付金额">
                <template slot-scope="scope">
                    <span>{{scope.row.paymentAmount}}</span>
                </template>
            </el-table-column>
            <el-table-column width="120px" align="center" label="付款银行">
                <template slot-scope="scope">
                    <span>{{scope.row.paymentBank}}</span>
                </template>
            </el-table-column>
            <el-table-column width="120px" align="center" label="付款账号">
                <template slot-scope="scope">
                    <span>{{scope.row.paymentAccountNum}}</span>
                </template>
            </el-table-column>
            <el-table-column width="120px" align="center" label="支付日期">
                <template slot-scope="scope">
                    <span>{{scope.row.paymentDate | stamp2TextDate}}</span>
                </template>
            </el-table-column>
            <el-table-column width="120px" align="center" label="流水号">
                <template slot-scope="scope">
                    <span>{{scope.row.paymentSerialNum}}</span>
                </template>
            </el-table-column>
            <el-table-column width="120px" align="center" label="支付状态">
                <template slot-scope="scope">
                    <span>{{scope.row.paymentStatus}}</span>
                </template>
            </el-table-column>
        </el-table>

        <div class="pagination-container">
            <el-pagination background @current-change="handleCurrentChange" :current-page="pageNo" :page-size="20" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>

        <el-dialog title="上传入库" :visible.sync="dialogUpload" width="35%">
            <el-form ref='form' label-width="220px" label-position="left">
                <RedStar :required ="true">
                    <el-form-item label="批量导入的excel文件：">
                        <!-- <el-upload class="upload-img" :action="fileURL" :headers='{sessionid:token}' :on-remove="storeRemove" :before-upload = "beforeUpload" :http-request="upload" :on-success="storeSuccess" :file-list="attachment"> -->
                            <el-upload ref="upload" class="upload-img" :before-upload = "beforeUpload" :headers='{sessionid:token}' :action="fileURL" :auto-upload="false" :file-list="attachment" :on-success="storeSuccess" :on-exceed="storeExceed" :limit="1">
                        <!-- <el-upload ref="upload" class="upload-img" :before-upload = "beforeUpload" :headers='{sessionid:token}' :data="uploadData" :action="fileURL" :auto-upload="false" :file-list="attachment" :on-success="storeSuccess" :on-exceed="storeExceed" :limit="1"> -->
                            <el-button size="small" type="primary">选取文件</el-button>
                            <div slot="tip" class="el-upload__tip">
                                只能上传xls、xlsx格式文件！
                            </div>
                        </el-upload>
                    </el-form-item>
                </RedStar>
                <el-form-item>
                    <el-button type="primary" @click="confirmUpload">立即创建</el-button>
                    <el-button @click="cancelStore">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import common from '@/utils/common'
import { getReimPay,exportReimPay } from '@/api/reimPay'
import waves from '@/directive/waves' // 水波纹指令
import { toJS, fromJS, Map, List } from 'immutable';
import { mapState } from "vuex";
import config from '@/utils/config';
import utils from '@/utils/utils';
import listQueryMix from '../../mixins/listQuery.mix'
import RedStar from '@/components/RedStar/RedStar.vue';

export default {
    directives: {
        waves
    },
    mixins: [listQueryMix],
    computed:{
        ...mapState({
            ids:state => state.permission.ids,
            token: state => state.user.token,
        }),
    },
    components: {
        RedStar
    },
    data() {
        return {
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            },
            toolexpand:false,
            dialogUpload:false,
            // timeRange: [],
            list: [],
            total: 0,
            pageNo: 1,
            pageSize: 20,
            listQuery: {
                timeRange: [],
                paymentStatus:"",
                procName:"",
                payeeName:"",
                procCodeOrTitle:""
            },
            expStatuList:[],
            expensePayment:[],
            fileURL: process.env.BASE_API + '/webExpenseFlow/backImportExpensePaymentList',
            attachment:[]
        }
    },
    created() {
        this.getList()
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
        
        this.expStatuList = selectDic(dicList,"expense_status").filter(item=>{
            return item.value != 4
        })
        this.expensePayment = selectDic(dicList,"expense_payment_status")
    },
    methods: {
        getList() {
            var postData = this.reduceParams(this.$$queryStub);
            // var {applyTimeStart,applyTimeEnd } = common.rangeObjToTimestamp(this.listQuery.timeRange)
            getReimPay({
                ...postData,
                pageNo:this.pageNo,
                pageSize:this.pageSize
            }).then(response => {
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
                .set('applyTimeBegin', common.rangeObjToTimestamp($$imData.get('timeRange').toJS()).applyTimeStart)
                .set('applyTimeEnd', common.rangeObjToTimestamp($$imData.get('timeRange').toJS()).applyTimeEnd)
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
        },
        handleCurrentChange(val) {
            this.pageNo = val
            this.getList()
        },
        handleCreate() {
            this.$router.push({path: '/me/paymentForm'})
        },
        downloadTemp(){
            var postData = this.reduceParams(this.$$queryStub);
            exportReimPay({
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
        },
        beforeUpload(file) {
            const isExcel = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","application/vnd.ms-excel"].indexOf(file.type) !== -1;
            if(!isExcel){
                this.$message({
                    message: "批量上传文件只能上传xls、xlsx格式文件！",
                    type: 'error'
                })
            }
           
            // if(isExcel&&utils.handleImgError(file)){
                // this.uploadData = {rentRefuelType:this.rentRefuelType,month: common.timeParse(this.month)};
                // let promise = new Promise((resolve) => {
                //     this.$nextTick(function () {
                //         resolve(true);
                //     });
                // });
                // return promise; 
            // }else{
                return isExcel&&utils.handleImgError(file)
            // }
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
            // if(!this.month){
            //     this.$message({
            //         message: "请选择需要上传的月份！",
            //         type: 'error'
            //     })
            //     return
            // }
            this.$refs.upload.submit()
        },
        showImport(){
            this.dialogUpload = true
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
</style>