<template>
    <div class="sjb-form-wrapper">
        <div class="segment statistics">
            <div class="segment-header">
                基本信息
            </div>
            <BaseElement ref="baseElement"></BaseElement>
            
            <el-row>
                <el-col :span="12" class="segment-brline">
                    <RedStar label="办理类型：" :required="true">
                        <span class="right-con">
                            <el-select class="filter-item" @change="resTypeChange" v-model="filter.handleType" placeholder="请选择" style="width:280px;">
                                <el-option v-for="item in handleTypeList" :label="item.name" :value="item.value" :key="item.value">
                                </el-option>
                            </el-select>
                        </span>
                    </RedStar>
                    <!-- <div class="clearfix  cominfo-item">
                        <span class="left-red">*</span>
                        <span class="left-title font-gray">办理类型：</span>
                        <span class="right-con">
                            <el-select class="filter-item" @change="resTypeChange" v-model="filter.handleType" placeholder="请选择" style="width:280px;">
                                <el-option v-for="item in handleTypeList" :label="item.name" :value="item.value" :key="item.value">
                                </el-option>
                            </el-select>
                        </span>
                    </div> -->
                </el-col>
                <el-col :span="12" class="segment-brline">
                    <RedStar label="需求数量：">
                        <span v-if="filter.handleType == 2" class="right-con">{{personelNum}}</span>
                        <span v-if="filter.handleType == 1" class="right-con">{{personelNumber}}</span>
                    </RedStar>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12" class="segment-brline">
                    <RedStar label="项目名称：" v-if="filter.handleType == 2">
                        <span class="right-con">
                            {{filter.projectName}}
                        </span>
                    </RedStar>
                    <!-- <div class="clearfix  cominfo-item" v-if="filter.handleType == 2">
                        <span class="left-title font-gray">项目名称：</span>
                        <span class="right-con">
                            {{filter.projectName}}
                        </span>
                    </div> -->
                    <Project @on-select="proSelect" :Pvalue="filter.projectName" :required="true" v-if="filter.handleType == 1"></Project>
                </el-col>
                <el-col :span="12" class="segment-brline">
                    <RedStar label="项目负责人：">
                        <span class="right-con">{{filter.projectPersonel}}</span>
                    </RedStar>
                    <!-- <div class="clearfix  cominfo-item">
                        <span class="left-title font-gray">项目负责人：</span>
                        <span class="right-con">{{filter.projectPersonel}}</span>
                    </div> -->
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12" class="segment-brline">
                    <RedStar label="关联主题：" v-if="filter.handleType == 2" :required="true">
                        <div class="item-value" @click="showThemeForm=true" :title="fullName">
                            <i class="el-icon-search" style="color:#bfbfbf"></i>
                            <span style="color:#606266;font-size:14px;">{{relationTheme}}</span>
                        </div>
                    </RedStar>
                    <!-- <div class="clearfix  cominfo-item" v-if="filter.handleType == 2">
                        <span class="left-red">*</span>
                        <span class="left-title font-gray">关联主题：</span>
                        <div class="item-value" @click="showThemeForm=true" :title="fullName">
                            <i class="el-icon-search" style="color:#bfbfbf"></i>
                            <span style="color:#606266;font-size:14px;">{{relationTheme}}</span>
                        </div>
                    </div> -->
                    <RedStar label="抵达时间：" v-if="filter.handleType == 2">
                        <span class="right-con">
                            {{arrivalTime | stamp2TextDateFull}}
                        </span>
                    </RedStar>
                    <!-- <div class="clearfix  cominfo-item" v-if="filter.handleType == 2">
                        <span class="left-title font-gray">抵达时间：</span>
                        <span class="right-con">
                            {{arrivalTime | stamp2TextDateFull}}
                        </span>
                    </div> -->
                </el-col>
                <el-col :span="12" class="segment-brline">
                    <RedStar label="备注：">
                        <span class="right-con">
                            <sjbtextarea v-model.trim="filter.remarks" textStyle="width:280px" :rows="3" :max="300"></sjbtextarea>
                        </span>
                    </RedStar>
                </el-col>
            </el-row>
            <el-row v-if="filter.handleType == 1">
                <el-col :span="12" class="segment-brline">
                    <RedStar label="期望抵达时间：" :required="true">
                        <span class="right-con">
                            <el-date-picker v-model="filter.expectDate" type="datetime" class="filter-item" style="width:280px" placeholder="选择日期范围">
                            </el-date-picker>
                        </span>
                    </RedStar>
                </el-col>
                <el-col :span="12" class="segment-brline">
                    <RedStar label="预计时长：" :required="true">
                        <span class="right-con">
                            <el-input v-model="filter.timeLong" type="number" style="width:280px"></el-input>
                        </span>
                    </RedStar>
                </el-col>
            </el-row>
            <el-row v-if="filter.handleType == 1">
                <el-col :span="12" class="segment-brline">
                    <RedStar label="预算费用合计：" :required="true">
                        <span class="right-con">
                            <el-input v-model="filter.amountSum" type="number" style="width:280px"></el-input>
                        </span>
                    </RedStar>
                </el-col>
                <el-col :span="12" class="segment-brline">
                    <RedStar label="资源类型：" :required="true">
                        <span class="right-con">
                            <el-select class="filter-item" v-model="filter.resourcesType" placeholder="请选择" style="width:280px;">
                                <el-option v-for="item in dictionary.resourcesType" :label="item.name" :value="item.value" :key="item.value">
                                </el-option>
                            </el-select>
                        </span>
                    </RedStar>
                </el-col>
            </el-row>

            <el-dialog title="关联主题" :visible.sync="showThemeForm" width="80%" :center="true" @open="ThemeDiaOpen">
                <div class="dialog">
                    <el-table :data="ThemeData" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%;" @row-click="selectTheme">
                        <el-table-column align="center" label="流程编号" width="140px">
                            <template slot-scope="scope">
                                <span style="color:#409EFF;">{{scope.row.procCode}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="流程名称" width="300px">
                            <template slot-scope="scope">
                                <span>{{scope.row.procName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="项目名称">
                            <template slot-scope="scope">
                                <span>{{scope.row.projectName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column width="80px" align="center" label="提交人">
                            <template slot-scope="scope">
                                <span>{{scope.row.applyPerName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column width="90px" align="center" label="项目负责人">
                            <template slot-scope="scope">
                                <span>{{scope.row.projectPersonel}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column width="110px" align="center" label="需求数量">
                            <template slot-scope="scope">
                                <span>{{scope.row.demandPersonelNum}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column width="80px" align="center" label="资源类型">
                            <template slot-scope="scope">
                                <span>{{scope.row.resourcesTypeValue}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column width="140px" align="center" label="提交时间">
                            <template slot-scope="scope">
                                <span>{{scope.row.applyTime | stamp2TextDateFull}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column width="110px" align="center" label="审批状态">
                            <template slot-scope="scope">
                                <span>{{scope.row.resourcesStatusValue}}</span>
                            </template>
                        </el-table-column>

                    </el-table>
                </div>
                <div class="pagination-container" style="margin-top:20px">
                    <el-pagination background @current-change="themeCurrentChange" :current-page="themeFilter.page" :page-size="10" layout="total, prev, pager, next, jumper" :total="themeTotal">
                    </el-pagination>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="showThemeForm = false">返回</el-button>
                </div>
            </el-dialog>

        </div>
        <div class="segment statistics">
            <div class="segment-header">
                <span class="left-red">*</span>
                申请明细
            </div>
            <div class="segment-area" v-if="isReady" style="margin:20px 0 20px 15px;">
                <Appoint ref="appoint" :itemData="itemData"></Appoint>
            </div>
        </div>
        <div class="segment statistics">
            <div class="sjb-foot-button">
                <el-button type="primary" size="small" @click="applyForm('apply')">提交申请</el-button>
                <el-button type="primary" size="small" @click="applyForm('save')">保存草稿</el-button>
                <el-button size="small" @click="backStep">返回</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import common from "@/utils/common";
import Appoint from "@/components/Appoint";
import RedStar from '@/components/RedStar/RedStar.vue'
import BaseElement from "@/components/BaseElement";
import Project from '@/components/Project';
import sjbtextarea from '@/components/sjbTextarea';
import {
    fetchProList, //项目管理-查询列表
    queryRelationResourcesApplyFlowList, //Web端资源申请-查询关联列表
    resourcesHandleApply, //Web端资源办理-发起申请
    saveResourcesHandleInfo, //WEB端资源办理-保存草稿
    resourcesHandleInfoDetail //WEB端资源办理-资源申请流程详细信息
} from "@/api/resHandle";
import { mapState, mapGetters } from "vuex";
import { parseTime } from "@/utils";
import { resHandleVali } from "./resHandle.util";
export default {
    components: {
        Appoint,
        BaseElement,
        Project,
        RedStar,
        sjbtextarea
    },
    data() {
        return {
            // pickerOptions: {
            //     disabledDate(time) {
            //         return time.getTime() > Date.now();
            //     }
            // },
            pickerOptionsPro: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            },
            itemData: [],
            // timeRange: [common.time.currentMonFirDayObj, common.time.currentMonNowDayObj],
            // projectList: [],
            fullName: "",
            misc: {
                projectDialogShow: false,
                projectQueryCurrentPage: 1,
                total: 0,
                pageSize: 10,

                listLoading: false
            },
            listQuery: {
                pageNo: 1,
                pageSize: 10,
                officeId: "",
                applyTimeStart: "",
                applyTimeEnd: "",
            },
            arrivalTime:"",
            relationTheme: "",
            filter: {
                applyPerName: "",
                applyPerCode: "", //申请人编号 ,
                handleType: "2", //办理类型
                projectId: "", //项目编号
                id: "", //主键ID
                personelNum: "", //满足人数 ,
                procInsId: "", //流程实例ID
                relationTheme: "", //关联主题 ,
                projectName: "",
                projectPersonel: "", //项目负责人
                procCode: "", //流程编码
                procName: "", //流程名称
                remarks: "",
                relationThemeName: "",
                resourcesType: "", //资源类型
                expectDate: common.time.currentMonNowDayObj, //期望抵达日期
                amountSum: "", //预算费用合集
                timeLong: "", //预计时长
                assignList: []
            },
            personelNum:"",
            total: null,
            listLoading: false,
            list: [],
            userInfo:"",
            ThemeData: [],
            handleTypeList: [],
            projectName: "",
            projectLeaderName: "",
            showThemeForm: false,

            themeFilter: {
                pageNo: 1,
                pageSize: 10,
                resourcesApplyId: "", //流程申请ID ,
                billType: 6 //单据类型:1:市场,2:实施,3:报销,4:接待申请,5:资源申请,6:资源办理 ,
            },
            themeTotal: null,
            dictionary: {
                resourcesType: []
            },
            isReady: false
        };
    },
    watch: {},
    created() {
        //拿到基本信息
        this.userInfo = JSON.parse(localStorage.getItem("web_oa_userInfor"));
        if (this.$route.query.key) {
            this.filter.id = this.$route.query.key;
            resourcesHandleInfoDetail({
                resHandleFlowId: this.$route.query.key
            }).then(res => {
                this.arrivalTime = res.data.resourcesHandleFlowResponse.expectDate
                this.filter = res.data.resourcesHandleFlowResponse;
                this.filter.expectDate = common.timeParseObj(res.data.resourcesHandleFlowResponse.expectDate);
                this.itemData = this.getAssignList(res.data.resourcesHandleFlowResponse.resourcesAssignResponseList)
                this.personelNum = res.data.resourcesHandleFlowResponse.personelNum
                this.isReady = true;
                if (this.filter.handleType == 2) {
                    this.relationTheme =
                        this.filter.relationThemeName.substring(0, 20) + "...";
                    this.fullName = this.filter.relationThemeName;
                    // this.arrivalTime = res.data.resourcesHandleFlowResponse.expectDate
                    // console.log(res.data.resourcesHandleFlowResponse.expectDate)
                }
            });
        } else {
            this.isReady = true;
        }
    },
    computed: {
        ...mapState({
            personelNumber: state => state.resHandle.personelNumber,
        }),
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
        this.dictionary.resourcesType = selectDic(dicList, "resources_type");
        this.handleTypeList = selectDic(dicList, "handle_type");
    },
    methods: {
        resTypeChange() {
            this.filter.projectName = "";
            this.filter.projectId = "";
            this.filter.projectPersonel = "";
            this.filter.personelNum = "";
            this.filter.relationTheme = "";
            this.relationTheme = "";
            this.personelNum = "";
            this.arrivalTime = "";
        },
        // handleProFilter() {
        //     this.listQuery.pageNo = 1;
        //     this.getList();
        // },
        ThemeDiaOpen() {
            this.listLoading = true;
            if(this.ThemeData.length == 0){
                queryRelationResourcesApplyFlowList(this.themeFilter).then(res => {
                    this.ThemeData = res.data.list;
                    this.themeTotal = res.data.total;
                    this.listLoading = false;
                });
            } else {
               this.listLoading = false; 
            }
            
        },
        selectTheme(row) {
            this.personelNum = row.demandPersonelNum;

            this.filter.projectId = row.projectId;
            this.filter.projectName = row.projectName;
            this.filter.projectPersonel = row.projectPersonel;

            this.filter.relationTheme = row.procCode;
            this.arrivalTime = row.expectDate
            this.relationTheme = row.procName.substring(0, 20) + "...";
            this.fullName = row.procName;
            this.showThemeForm = false;
        },
        getTheme() {
            this.listLoading = true;
            queryRelationResourcesApplyFlowList(this.themeFilter).then(res => {
                this.ThemeData = res.data.list;
                this.themeTotal = res.data.total;
                this.listLoading = false;
            });
        },
        themeCurrentChange(val) {
            this.themeFilter.pageNo = val;
            this.getTheme();
        },

        backStep() {
            this.$router.go(-1);
        },
        timeParse(getTime) {
            // var date = new Date(getTime);
            var date = new Date(getTime.replace(/-/g, "/"));
            return date;
        },
        getAssignList(data){
            var newArr = []
            data.forEach((item,idx)=>{
                if(item.sourceAssign == this.userInfo.id){
                    newArr.push({
                        personelNum:item.personelNum,
                        remarks:item.remarks,
                        targetAssign:item.targetAssign,
                        targetAssignName:item.targetAssignName,
                    })
                }
            })
            return newArr
        },
        applyForm(type) {
            if (resHandleVali(this)) {
                var tableData = this.$refs["appoint"].componentValiAndReturn();
                this.filter.assignList = tableData.afterFilterEmptyArr;
                if (!tableData.flag) return;
                if (this.filter.assignList.length == 0) {
                    this.$message({
                        message: "请指派人员",
                        type: "warning"
                    });
                    return;
                }
                this.sendData(type);
            }
        },
        sendData(type) {
            var _this = this;
            if (type == "apply") {
                resourcesHandleApply({
                    ...this.filter,
                    expectDate: common.timeParse(this.filter.expectDate)
                }).then(res => {
                    if (res.status == 0) {
                        this.$message({
                            message: res.message,
                            type: "success"
                        });
                        this.$router.push({path:'/task/todo' })
                    }
                });
            } else if (type == "save") {
                saveResourcesHandleInfo({
                    ...this.filter,
                    expectDate:common.timeParse(this.filter.expectDate)
                }).then(res => {
                    if (res.status == 0) {
                        this.$message({
                            message: res.message,
                            type: "success"
                        });
                        this.$router.push({path:'/task/todo' })
                    }
                });
            }
        },
        // dialogOpened() {
        //     this.misc.listLoading = true;
        //     if (this.projectList.length == 0) {
        //         this.pageChange();
        //     } else {
        //         this.misc.listLoading = false;
        //     }
        // },
        // pageChange(val) {
        //     this.listQuery.pageNo = val;
        //     this.getList();
        // },
        // async getList() {
        //     var _this = this;
        //     var { applyTimeStart, applyTimeEnd} = common.rangeObjToTimestamp(this.timeRange)
        //     var projectResponse = await fetchProList({
        //         ...this.listQuery,
        //         applyTimeStart,
        //         applyTimeEnd,
        //     });
        //     this.projectList = projectResponse.data.list;
        //     this.misc.total = projectResponse.data.total;
        //     this.misc.listLoading = false;
        // },
        proSelect(data){
            this.filter.projectId = data.id;
            this.filter.projectPersonel = data.projectLeaderName;
        },
        // selectProjectItem(row) {
        //     this.misc.projectDialogShow = false;
        //     this.filter.projectId = row.id;
        //     this.filter.projectName = row.projectName;
        //     this.filter.projectPersonel = row.projectLeaderName;
        // }
    }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
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
.item-value {
    display: inline-block;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background: white;
    padding-left: 7px;
    line-height: 30px;
    width: 280px;
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
