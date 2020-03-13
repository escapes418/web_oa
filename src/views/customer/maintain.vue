<template>
    <div class="sjb-form-wrapper">
        <div class="segment statistics">
            <div class="segment-header">
                基本信息
            </div>
            <div class="segment-area">
                <el-row>
                    <el-col :span="12" class="segment-brline">
                        <div class="clearfix cominfo-item">
                            <RedStar label="客户名称：" :required="false">
                                <span class="right-con">
                                    {{custName}}
                                </span>
                            </RedStar>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <RedStar label="客户级别：" :required="true">
                                <span class="right-con">
                                    <el-select clearable class="filter-item" v-model.trim="filter.custType" placeholder="请选择" style="width:250px;">
                                        <el-option v-for="item in custTypeList" :label="item.name" :value="item.value" :key="item.value">
                                        </el-option>
                                    </el-select>
                                </span>
                            </RedStar>
                        </div>
                        <div class="clearfix cominfo-item">
                            <RedStar label="拜访类型：" :required="true">
                                <span class="right-con">
                                    <el-select clearable class="filter-item" v-model.trim="filter.visitType" placeholder="请选择" style="width:250px;">
                                        <el-option v-for="item in custVisitList" :label="item.name" :value="item.value" :key="item.value">
                                        </el-option>
                                    </el-select>
                                </span>
                            </RedStar>
                        </div>
                        <div class="clearfix cominfo-item">
                            <RedStar label="备注：" :required="true">
                                <span class="right-con">
                                    <sjbtextarea type="textarea" :rows="3" placeholder="请输入" textStyle="width:250px;" v-model.trim="filter.remarks" :maxlength="200"></sjbtextarea>
                                </span>
                            </RedStar>
                        </div>
                    </el-col>
                    <el-col :span="12" class="segment-brline">
                        <div class="clearfix  cominfo-item">
                            <RedStar label="维护时间：" :required="false">
                                <span class="right-con">{{filter.custMaintenanceDate | stamp2TextDateFull}}</span>
                            </RedStar>
                        </div>
                        <div class="clearfix cominfo-item">
                            <RedStar label="联系人：" :required="true">
                                <span class="right-con">
                                    <el-select clearable class="filter-item" v-model.trim="filter.linkmanId" placeholder="请选择" style="width:250px;">
                                        <el-option v-for="item in linkmanList" :label="item.linkmanName" :value="item.id" :key="item.id">
                                        </el-option>
                                    </el-select>
                                </span>
                            </RedStar>
                        </div>
                        <div class="clearfix cominfo-item">
                            <RedStar label="维护内容：" :required="true">
                                <span class="right-con">
                                    <sjbtextarea placeholder="请输入" :rows="3" textStyle="width:250px;" v-model.trim="filter.custMaintenanceContent" :max="1000"></sjbtextarea>
                                </span>
                            </RedStar>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="segment statistics">
            <div class="segment-header">
                维护记录
            </div>
            <div class="segment-area">
                <div class="el-table__body-wrapper" style="padding: 15px 0;">
                    <el-table ref="multipleTable" border :data="itemList" tooltip-effect="dark" style="width:100%">
                        <el-table-column align="center" label="编号" width="100px">
                            <template slot-scope="scope">
                                <span>{{scope.row.index}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="维护时间" width="180px">
                            <template slot-scope="scope">
                                <span>{{scope.row.custMaintenanceDate | stamp2TextDateFull}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="维护人" width="100px">
                            <template slot-scope="scope">
                                <span>{{scope.row.custMaintenanceMan}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="维护人部门" width="100px">
                            <template slot-scope="scope">
                                <span>{{scope.row.maintainerDeptName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="客户分类" width="150px">
                            <template slot-scope="scope">
                                <span>{{scope.row.custTypeName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="客户级别" width="150px">
                            <template slot-scope="scope">
                                <span>{{scope.row.custStageName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="拜访类型" width="150px">
                            <template slot-scope="scope">
                                <span>{{scope.row.visitTypeName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="问题归类" width="150px">
                            <template slot-scope="scope">
                                <span>{{scope.row.issuesClassification}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="维护内容" width="200px">
                            <template slot-scope="scope">
                                <span>{{scope.row.custMaintenanceContent}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="联系人" width="100px">
                            <template slot-scope="scope">
                                <span>{{scope.row.linkmanName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="备注" >
                            <template slot-scope="scope">
                                <span>{{scope.row.remarks}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="pagination-container">
                    <el-pagination background @current-change="handleCurrentChange" :current-page="listQuery.pageNo" :page-size="20" layout="total, prev, pager, next, jumper" :total="total">
                    </el-pagination>
                </div>
            </div>
        </div>

        <div class="segment statistics">
            <div class="sjb-foot-button">
                <el-button type="primary" size="small" @click="saveCustForm">提交</el-button>
                <el-button size="small" @click="backStep">返回</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import common from "@/utils/common";
import { getMaintain, saveMaintain ,getLinkman} from "@/api/customer";
import { parseTime } from "@/utils";
import { custMaintainVali } from './cust.util';
import sjbtextarea from '@/components/sjbTextarea';
import RedStar from '@/components/RedStar/RedStar.vue';
export default {
    name: "complexTable",
    components:{
        sjbtextarea,
        RedStar
    },
    data() {
        return {
            dialogFormVisible: false,
            custVisitList: [],
            custStageList: [],
            linkmanList:[],
            leaderName: "",
            leaderPhone: "",
            dialogTitle: "",
            confirmDialog: false,
            custName:this.$route.query.custName,
            itemList:[],
            custTypeList:[],
            filter: {
                custMaintenanceType:"",
                custMaintenanceProblem:"",
                remarks:"",
                custMaintenanceDate:"",
                custPersonLiable:"",
                custMaintenanceContent:"",
                custType:""
            },
            total:0,
            listQuery: {
                custId:this.$route.query.key,
                pageNo: 1,
                pageSize: 20
            }
        };
    },
    methods: {
        handleCurrentChange(val) {
            this.listQuery.pageNo = val;
            this.getListData();
            this.listLoading = false;
        },
        getListData(){
            getMaintain(this.listQuery).then(res=>{
                if(res.status == 0){
                    res.data.list.forEach((item,index) =>{
                        item.index = index + 1;
                    });
                    this.itemList = res.data.list;
                    this.total = res.data.total;
                }
            })
        },
        saveCustForm() {
            this.linkmanList.forEach(item=>{
                if(this.filter.linkmanId == item.id){
                    this.filter.linkmanName = item.linkmanName
                }
            })
            this.filter = {
                ...this.filter,
                custId : this.$route.query.key,
                custName:this.$route.query.custName
            };
            if(custMaintainVali(this)){
                saveMaintain({
                    ...this.filter,
                    custMaintenanceDate:common.timeParse(this.filter.custMaintenanceDate)
                }).then(res => {
                    this.confirmDialog = false;
                    if(res.status == 0){
                        this.$message({
                            message: res.message,
                            type: "success"
                        });
                        setTimeout(_=>{
                            this.$router.go(0)
                        },500)
                    }
                });
            }

        },
        backStep() {
            this.$router.go(-1)
        }
    },
    created() {
        let hour = new Date().getHours()
        let minute = new Date().getMinutes()
        let second = new Date().getSeconds() 
        let year = new Date().getFullYear()
        let month = new Date().getMonth() + 1
        let day = new Date().getDate()
        hour = hour<10 ? '0' +  hour : hour
        minute = minute<10? '0' + minute: minute
        second = second<10 ? '0' + second: second
        month = month<10?'0' + month: month
        day = day<10?'0'+ day: day
        this.filter.custMaintenanceDate = year + '-' + month + '-' + day +' '+ hour + ':' + minute + ':' + second
        this.getListData()
        getLinkman({custId:this.$route.query.key}).then(res=>{
            if(res.status == 0){
                this.linkmanList = res.data
            }
        })
    },
    mounted() {
        //下拉列表数据转换
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
        this.custVisitList = selectDic(dicList, "visit_type"); //拜访类型
        this.custStageList = selectDic(dicList, "cust_stage"); //客户级别
        this.custTypeList = selectDic(dicList,"cust_type");//客户分类
    }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.item-value {
    display: inline-block;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background: white;
    padding-left: 7px;
    line-height: 30px;
    width: 250px;
}
.el-input--small .el-input__inner {
    height: 40px !important;
}
.red{
    color: red
}
.remark {
    margin-top: 25px;
    margin-bottom: 8px;
    background-color: #fdfdfd;
    border: 1px solid#F2F7FA;
}
.remarkTitle {
    margin-right: 100px;
    float: left;
    margin-top: 28px;
    margin-left: 5px;
}

.upload-container {
    margin: 50px;
}
.editor-slide-upload {
    margin-bottom: 15px;
}
.segment-area {
    .textStyle-title {
        // line-height: 20px;
        padding: 12px 0px;
        font-size: 14px;
    }
}
</style>
<style>
.area .el-cascader {
    width: 250px !important;
}
</style>
