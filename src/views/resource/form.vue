<template>
    <div class="sjb-form-wrapper">
        <div class="segment statistics">
            <div class="segment-header">
                基本信息
            </div>
            <div class="segment-area">
                <el-row>
                    <el-col :span="12" class="segment-brline">
                        <RedStar label="申请人员：">
                            <span class="right-con">{{userInfo.name}}</span>
                        </RedStar>
                        <!-- <div class="clearfix cominfo-item">
                            <span class="left-title font-gray">申请人员：</span>
                            <span class="right-con">{{userInfo.name}}</span>
                        </div> -->
                        <RedStar label="所属部门：">
                            <span class="right-con">{{userInfo.officeName}}</span>
                        </RedStar>
                        <!-- <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">所属部门：</span>
                            <span class="right-con">{{ userInfo.officeName }}</span>
                        </div> -->
                        <Project @on-select="proSelect" :Pvalue="projectName" :required="true"></Project>
                        <RedStar label="资源类型：" :required="true">
                            <span class="right-con">
                                <el-select clearable class="filter-item" filterable v-model="filter.resourcesType" placeholder="请选择" style="width:280px;">
                                    <el-option v-for="item in resourceList" :label="item.name" :value="item.value" :key="item.value">
                                    </el-option>
                                </el-select>
                            </span>
                        </RedStar>
                        <!-- <div class="clearfix  cominfo-item">
                            <span class="left-red">*</span>
                            <span class="left-title font-gray">资源类型：</span>
                            <span class="right-con">
                                <el-select clearable class="filter-item" filterable v-model="filter.resourcesType" placeholder="请选择" style="width:280px;">
                                    <el-option v-for="item in resourceList" :label="item.name" :value="item.value" :key="item.value">
                                    </el-option>
                                </el-select>
                            </span>
                        </div> -->
                        <RedStar label="期待抵达时间：" :required="true">
                            <span class="right-con">
                                <el-date-picker
                                    v-model="filter.expectDate"
                                    type="datetime"
                                    style="width:280px"
                                    placeholder="选择日期时间">
                                </el-date-picker>
                            </span>
                        </RedStar>
                        <!-- <div class="clearfix  cominfo-item">
                            <span class="left-red">*</span>
                            <span class="left-title font-gray">期待抵达时间：</span>
                            <span class="right-con">
                                <el-date-picker
                                    v-model="filter.expectDate"
                                    type="datetime"
                                    style="width:280px"
                                    placeholder="选择日期时间">
                                </el-date-picker>
                            </span>
                        </div> -->
                        <RedStar label="备注：">
                            <span class="right-con">
                                <el-input
                                    type="textarea"
                                    :rows="3"
                                    style="width:280px;margin-top:2px;margin-bottom:20px"
                                    placeholder="请输入内容"
                                    :maxlength="300"
                                    v-model="filter.remarks">
                                </el-input>
                            </span>
                        </RedStar>
                        <!-- <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">备注：</span>
                            <span class="right-con">
                                <el-input
                                    type="textarea"
                                    :rows="3"
                                    style="width:280px;margin-top:2px;margin-bottom:20px"
                                    placeholder="请输入内容"
                                    :maxlength="300"
                                    v-model="filter.remarks">
                                </el-input>
                            </span>
                        </div> -->
                    </el-col>
                    <el-col :span="12" class="segment-brline">
                        <RedStar label="申请日期：">
                            <span class="right-con">{{ filter.applyTime }}</span>
                        </RedStar>
                        <!-- <div class="clearfix cominfo-item">
                            <span class="left-title font-gray">申请日期：</span>
                            <span class="right-con">{{ filter.applyTime }}</span>
                        </div> -->
                        <RedStar label="岗位名称：">
                            <span class="right-con">{{ userInfo.postName }}</span>
                        </RedStar>
                        <!-- <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">岗位名称：</span>
                            <span class="right-con">{{ userInfo.postName }}</span>
                        </div> -->
                        <RedStar label="项目负责人：">
                            <span class="right-con">
                                {{projectLeaderName}}
                            </span>
                        </RedStar>
                        <!-- <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">项目负责人：</span>
                            <span class="right-con">
                                {{projectLeaderName}}
                            </span>
                        </div> -->
                        <RedStar label="需求数量：" :required="true">
                            <span class="right-con">
                                <el-input v-model.number="filter.demandPersonelNum"  type="number" style="width:280px"></el-input>
                            </span>
                        </RedStar>
                        <!-- <div class="clearfix  cominfo-item">
                            <span class="right-red">*</span>
                            <span class="left-title font-gray">需求数量：</span>
                            <span class="right-con">
                                <el-input v-model.number="filter.demandPersonelNum"  type="number" style="width:280px"></el-input>
                            </span>
                        </div> -->
                        <RedStar label="预计时长：" :required="true">
                            <span class="right-con">
                                <el-input v-model.number="filter.timeLong" type="number" style="width:280px"></el-input>
                            </span>
                        </RedStar>
                        <!-- <div class="clearfix  cominfo-item">
                            <span class="right-red">*</span>
                            <span class="left-title font-gray">预计时长：</span>
                            <span class="right-con">
                                <el-input v-model.number="filter.timeLong" type="number" style="width:280px"></el-input>
                            </span>
                        </div> -->
                        <RedStar label="预算费用合计：" :required="true">
                            <span class="right-con">
                                <el-input v-model.number="filter.amountSum" type="number" style="width:280px"></el-input>
                            </span>
                        </RedStar>
                        <!-- <div class="clearfix  cominfo-item">
                            <span class="right-red">*</span>
                            <span class="left-title font-gray">预算费用合计：</span>
                            <span class="right-con">
                                <el-input v-model.number="filter.amountSum" type="number" style="width:280px"></el-input>
                            </span>
                        </div> -->
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="segment statistics">
            <div class="sjb-foot-button">
                <el-button type="primary" size="small" @click="submit('apply')">提交申请</el-button>
                <el-button type="primary" size="small" @click="submit('save')">保存草稿</el-button>
                <el-button size="small" @click="backStep">返回</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import common from "@/utils/common";
import Approval from "@/components/Approval";
import Project from '@/components/Project';
import RedStar from '@/components/RedStar/RedStar.vue'
import {
    fetchProList, //项目管理-查询列表
    saveResource,
    applyResource,
    getDetail
} from "@/api/resource";
import { mapState, mapGetters } from "vuex";
import { parseTime } from "@/utils";
import { resourceFormVali } from './resource.util'

export default {
    components: {
        Approval,
        Project,
        RedStar
    },
    data() {
        return {
            // pickerOptions: {
            //     disabledDate(time) {
            //         return time.getTime() > Date.now();
            //     }
            // },
            userInfo: {},
            // dialogFormVisible: false,
            resourceList:[],
            // timeRange: [common.time.currentMonFirDayObj, common.time.currentMonNowDayObj],
            filter: {
                //筛选条件
                applyTime: "",
                amountSum:"",
                projectId: null, //项目编号
                id: "", //主键ID
                procInsId: "", //流程实例ID
                // projectName: undefined,
                resourcesType:"",
                expectDate:"",
                demandPersonelNum:"",
                timeLong:"",
                remarks:""
            },
            total: null,
            // listLoading: false,
            list: [],
            projectName: "",
            projectLeaderName: "",
            projectType: "",
            listQuery: {
                pageNo: 1,
                pageSize: 10,
                officeId: "",
                applyTimeStart: "",
                applyTimeEnd: "",
            }
        };
    },
    created() {
        //时间转换
        this.filter.applyTime = common.time.monthlast
        //拿到基本信息
        this.userInfo = JSON.parse(localStorage.getItem("web_oa_userInfor"));
        if (this.$route.query.key) {
            this.filter.id = this.$route.query.key;
            getDetail({
                resApplyFlowId: this.$route.query.key
            }).then(res => {
                this.filter.applyTime = res.data.resourcesApplyFlowResponse.applyTime;
                this.projectName = res.data.resourcesApplyFlowResponse.projectName;
                this.projectLeaderName = res.data.resourcesApplyFlowResponse.projectPersonel;
                this.filter.projectId = res.data.resourcesApplyFlowResponse.projectId;
                this.filter.amountSum = res.data.resourcesApplyFlowResponse.amountSum;
                res.data.resourcesApplyFlowResponse.demandPersonelNum = res.data.resourcesApplyFlowResponse.demandPersonelNum ? Number(res.data.resourcesApplyFlowResponse.demandPersonelNum) : undefined;
                this.filter.demandPersonelNum = res.data.resourcesApplyFlowResponse.demandPersonelNum;
                this.filter.resourcesType = res.data.resourcesApplyFlowResponse.resourcesType;
                res.data.resourcesApplyFlowResponse.expectDate = res.data.resourcesApplyFlowResponse.expectDate ? new Date(res.data.resourcesApplyFlowResponse.expectDate) : undefined;
                this.filter.expectDate = res.data.resourcesApplyFlowResponse.expectDate;
                res.data.resourcesApplyFlowResponse.timeLong = res.data.resourcesApplyFlowResponse.timeLong ? Number(res.data.resourcesApplyFlowResponse.timeLong) : undefined
                this.filter.timeLong = res.data.resourcesApplyFlowResponse.timeLong
                this.filter.remarks = res.data.resourcesApplyFlowResponse.remarks
                this.filter.procInsId = res.data.resourcesApplyFlowResponse.procInsId;
            });
        }
    },
    mounted() {
        //获取字典
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
        this.resourceList = selectDic(dicList, "resources_type");

        // fetchMember({}).then(res => {
        //     this.memberList = res.data;
        // });
    },
    methods: {
        // handleProFilter(){
        //     this.listQuery.pageNo = 1
        //     this.getList()
        // },
        // showForm() {
        //     this.dialogFormVisible = true;
        //     this.listLoading = false;
        //     this.getList();
        // },
        proSelect(data){
            this.filter.projectId = data.id;
            this.projectLeaderName = data.projectLeaderName;
        },
        // selectRow(row) {
        //     this.projectName = row.projectName;
        //     this.projectLeaderName = row.projectLeaderName;
        //     this.filter.projectId = row.id;
        //     this.dialogFormVisible = false;
        // },
        // getList() {
        //     this.listLoading = true;
        //     var {applyTimeStart,applyTimeEnd } = common.rangeObjToTimestamp(this.timeRange)
        //     fetchProList({
        //         ...this.listQuery,
        //         applyTimeStart,
        //         applyTimeEnd,
        //     }).then(res => {
        //         this.list = res.data.list;
        //         this.total = res.data.total;
        //         this.listLoading = false;
        //     });
        // },
        // handleCurrentChange(val) {
        //     this.listQuery.pageNo = val;
        //     this.getList();
        // },
        backStep() {
            this.$router.go(-1)
        },
        submit(type) {
            if(this.filter.amountSum == '') this.filter.amountSum = undefined
            if(this.filter.demandPersonelNum == '') this.filter.demandPersonelNum = undefined
            if(this.filter.timeLong == '') this.filter.timeLong = undefined
            if(type == 'apply' && resourceFormVali(this)){
                applyResource({
                    ...this.filter,
                    expectDate: common.timeParse(this.filter.expectDate)
                    }).then(res =>{
                    if (res.status == 0) {
                        this.$message({
                            message: res.message,
                            type: 'success'
                        })
                        this.$router.push({path:'/task/todo' })
                    }
                })
            }
            if(type == 'save'){
                saveResource({
                    ...this.filter,
                    expectDate: common.timeParse(this.filter.expectDate)
                    }).then(res =>{
                    if (res.status == 0) {
                        this.$message({
                            message: res.message,
                            type: 'success'
                        })
                        this.$router.go(-1)
                    }
                })
            }
        }
    }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.el-input--small .el-input__inner {
    height: 40px !important;
}
.left-red{
    color: red;
    position: absolute;
    left: 15px;
}
.right-red{
    color: red;
    position: absolute;
    left: 49%;
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
.item-value {
    display: inline-block;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background: white;
    padding-left: 7px;
    line-height: 30px;
    width: 280px;
}
.segment .el-table__body-wrapper {
    padding: 40px 20px 35px;
}
.ignore-detail {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
}
</style>