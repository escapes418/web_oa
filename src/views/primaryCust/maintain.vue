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
                            <RedStar label="主客户名称：" :required="false">
                                <span class="right-con">
                                    {{custName}}
                                </span>
                            </RedStar>
                        </div>
                        <div class="clearfix cominfo-item">
                            <RedStar label="拜访类型：" :required="true">
                                <span class="right-con">
                                    <el-select clearable class="filter-item" v-model.trim="postData.visitType" placeholder="请选择" style="width:250px;">
                                        <el-option v-for="item in custVisitList" :label="item.name" :value="item.value" :key="item.value">
                                        </el-option>
                                    </el-select>
                                </span>
                            </RedStar>
                        </div>
                        
                        <div class="clearfix cominfo-item">
                            <RedStar label="问题归类：" :required="true">
                                <span class="right-con">
                                    <el-select clearable multiple class="filter-item" v-model.trim="issuePostList" placeholder="请选择" style="width:250px;">
                                        <el-option v-for="item in issueList" :label="item.name" :value="item.value" :key="item.value">
                                        </el-option>
                                    </el-select>
                                </span>
                            </RedStar>
                        </div>
                        <div class="clearfix cominfo-item">
                            <RedStar label="维护内容：" :required="true">
                                <span class="right-con">
                                    <sjbtextarea placeholder="请输入" :rows="3" textStyle="width:250px;" v-model.trim="postData.custMaintenanceContent" :max="1000"></sjbtextarea>
                                </span>
                            </RedStar>
                            
                        </div>
                        
                    </el-col>
                    <el-col :span="12" class="segment-brline">
                        <div class="clearfix cominfo-item">
                            <RedStar label="联系人：" :required="true">
                                <span class="right-con">
                                    <el-select clearable class="filter-item" v-model.trim="postData.linkmanId" placeholder="请选择" style="width:250px;">
                                        <el-option v-for="item in linkmanList" :label="item.linkmanName" :value="item.id" :key="item.id">
                                        </el-option>
                                    </el-select>
                                </span>
                            </RedStar>
                            
                        </div>
                        
                        <div class="clearfix cominfo-item">
                            <RedStar label="归属客户：" :required="true">
                                <span class="right-con">
                                    <el-select clearable class="filter-item" v-model.trim="postData.belongCustId" placeholder="请选择" style="width:250px;">
                                        <el-option v-for="item in belongCust" :label="item.custName" :value="item.custId" :key="item.custId">
                                        </el-option>
                                    </el-select>
                                </span>
                            </RedStar>
                            
                        </div>
                        <div class="clearfix cominfo-item">
                            <RedStar label="备注：" :required="false">
                                <span class="right-con">
                                    <sjbtextarea type="textarea" :rows="3" placeholder="请输入" textStyle="width:250px;" v-model.trim="postData.remarks" :maxlength="200"></sjbtextarea>
                                </span>
                            </RedStar>
                        </div>
                    </el-col>
                </el-row>
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
import { getBelongCust ,getLinkman,saveMaintain} from "@/api/primaryCust";
import { parseTime } from "@/utils";
import RedStar from '@/components/RedStar/RedStar.vue';
import { maintainVali } from './primary.util';
import sjbtextarea from '@/components/sjbTextarea';

export default {
    name: "complexTable",
    components:{
        RedStar,
        sjbtextarea
    },
    data() {
        return {
            // dialogFormVisible: false,
            custVisitList: [],
            custStageList: [],
            linkmanList:[],
            belongCust:[],
            issueList:[],
            // confirmDialog: false,
            custName:this.$route.query.custName,
            itemList:[],
            issuePostList:[],
            postData: {
                belongCustId:"",// 归属客户id ,
                // custId:"",// 客户id ,
                custMaintenanceContent:"",// 维护内容 ,
                // custName:"",//  客户名称 ,
                issuesClassification:[],//问题归类 ,
                linkmanId:"",// 联系人id ,
                // linkmanName:"",// 联系人name ,
                // producSide:"",
                remarks:"",// 备注 ,
                visitType:"2",// 拜访类型
            },
        };
    },
    methods: {
        saveCustForm() {
            this.linkmanList.forEach(item=>{
                if(this.postData.linkmanId == item.id){
                    this.postData.linkmanName = item.linkmanName
                }
            })
            this.postData.issuesClassification = []
            this.issueList.forEach(item=>{
                if(this.issuePostList.indexOf(item.value) !== -1){
                    this.postData.issuesClassification.push(item.name)
                }
            })
            this.postData = {
                ...this.postData,
                custId : this.$route.query.key,
                custName:this.$route.query.custName
            };
            if(maintainVali(this)){
                saveMaintain({
                    ...this.postData,
                }).then(res => {
                    if(res.status == 0){
                        this.$message({
                            message: res.message,
                            type: "success"
                        });
                        this.$router.push({
                            path: "/inforManage/primaryCust"
                        });
                    }
                });
            }

        },
        backStep() {
            this.$router.go(-1)
        }
    },
    created() {
        getLinkman({custId:this.$route.query.key}).then(res=>{
            if(res.status == 0){
                this.linkmanList = res.data
            }
        })

        getBelongCust({masterCustId:this.$route.query.key}).then(res => {
            if(res.status == 0){
                this.belongCust = res.data
            }
        })
        this.postData.belongCustId = this.$route.query.key
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
        this.issueList = selectDic(dicList, "issues_type"); 
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
