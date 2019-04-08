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
                        <RedStar label="所属部门：">
                            <span class="right-con">{{ userInfo.officeName }}</span>
                        </RedStar>
                        <RedStar label="项目名称：" v-if="relType==1">
                            <span class="right-con">{{projectName}}</span>
                        </RedStar>
                        <Project @on-select="proSelect" :Pvalue="projectName" :required="true" v-if="relType==2"></Project>
                        <RedStar label="关联主题：" :required="true" v-if="relType==1">
                            <div class="item-value" @click="showThemeForm=true" :title="fullName">
                                <i class="el-icon-search" style="color:#bfbfbf"></i>
                                <span style="color:#606266;font-size:14px;">{{relationTheme}}</span>
                            </div>
                        </RedStar>
                        <RedStar label="报销分类：" :required="true">
                            <span class="right-con">
                                <el-select class="filter-item" multiple filterable v-model="filter.travelExpenseTypeList" placeholder="请选择" style="width:280px;">
                                    <el-option v-for="item in expTypeList" :label="item.name" :value="item.value" :key="item.value">
                                    </el-option>
                                </el-select>
                            </span>
                        </RedStar>
                        <RedStar label="随行人员：" :required="false">
                            <span class="right-con">
                                <el-select class="filter-item" multiple filterable v-model="filter.entourageList" placeholder="请选择" style="width:280px;" >
                                    <el-option v-for="item in memberList" :label="item.name" :value="item.id" :key="item.id">
                                    </el-option>
                                </el-select>
                            </span>
                        </RedStar>
                    </el-col>
                    
                    <el-col :span="12" class="segment-brline">
                        <RedStar label="申请日期：">
                            <span class="right-con">{{ filter.applyTime }}</span>
                        </RedStar>
                        <RedStar label="关联类型：" :required="true">
                            <span class="right-con">
                                <el-select class="filter-item" @change="changeRelType" v-model="relType" placeholder="请选择" style="width:280px;">
                                    <el-option v-for="item in relTypeList" :label="item.name" :value="item.value" :key="item.value">
                                    </el-option>
                                </el-select>
                            </span>
                        </RedStar>
                        <RedStar label="项目负责人：" v-if="relType!=3">
                            <span class="right-con">
                                {{projectLeaderName}}
                            </span>
                        </RedStar>
                        
                        <RedStar label="费用合计：">
                            <div class="item-value" style="height:32px">
                                <span style="color:#606266;font-size:14px;">{{budgetTotal || ""}}</span>
                            </div>
                        </RedStar>
                        <RedStar label="备注：">
                            <span class="right-con">
                                <sjbtextarea placeholder="请输入"
                                textStyle="width:280px;"
                                :rows="3"
                                :max="200"
                                v-model.trim="filter.remarks"></sjbtextarea>
                            </span>
                        </RedStar>
                    </el-col>
                </el-row>
            </div>
            <el-dialog title="关联主题" :visible.sync="showThemeForm" top="8vh"  width="60%" >
                <div class="dialog">
                    <el-table :data="ThemeData" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%;" @row-click="selectTheme">
                        <el-table-column align="center" label="流程编号" width="140px">
                            <template slot-scope="scope">
                                <span style="color:#409EFF;">{{scope.row.procCode}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="流程名称" >
                            <template slot-scope="scope">
                                <span>{{scope.row.procName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column width="80px" align="center" label="提交人">
                            <template slot-scope="scope">
                                <span>{{scope.row.applyPerName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column width="90px" align="center" label="办理类型">
                            <template slot-scope="scope">
                                <span>{{scope.row.handleTypeValue}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column width="90px" align="center" label="资源类型">
                            <template slot-scope="scope">
                                <span>{{scope.row.resourcesTypeValue}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column width="140px" align="center" label="提交时间">
                            <template slot-scope="scope">
                                <span>{{scope.row.applyTime}}</span>
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
                申请明细
            </div>
            <div class="segment-area">
                <div class="el-table__body-wrapper">
                    <table id="expenseDetails" class="table table-striped table-bordered table-condensed" style="width:1700px;margin-bottom: 20px;">
                        <thead>
                            <tr class="tableTitle">
                                <td style="text-align: center;width: 20px;padding: 0 10px 0 10px;">
                                    <el-checkbox v-model="checkAll" @change="selectAll">全选</el-checkbox>
                                </td>
                                <td class="tableTitle">发生日期</td>
                                <td class="tableTitle">起点</td>
                                <td class="tableTitle">结束日期</td>
                                <td class="tableTitle">终点</td>
                                <td class="tableTitle">科目</td>
                                <td class="tableTitle">人数</td>
                                <td class="tableTitle">天数</td>
                                <td class="tableTitle">票据张数</td>
                                <td class="tableTitle">预算金额</td>
                                <td class="tableTitle">备注</td>
                                <td class="tableTitle">上传图片</td>
                            </tr>
                        </thead>
                        <tbody>
                            <approval v-for="(item,index) in detailCollection" style="height:50px" :key="index" :itemData="item" :isType="isType"></approval>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="segment-foot">
                <el-button type="primary" size="small" @click="add">新增</el-button>
                <el-button type="danger" size="small" @click="del">删除</el-button>
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
import RedStar from '@/components/RedStar/RedStar.vue';
import Project from '@/components/Project';
import sjbtextarea from '@/components/sjbTextarea';
import {
    fetchProList, //项目管理-查询列表
    travelApply, //Web端出差申请-发起申请
    saveTravelFlowInfo, // Web端出差申请-单据保存草稿.
    retravelFlowDetail,//Web出差申请-查询审批流程详情
    resourcesRelationHandleFlowList, //Web端资源申请办理-关联列表
    getMember
} from "@/api/traveling";
import {getList} from '@/api/getRegion'
import { mapState, mapGetters } from "vuex";
import { parseTime } from "@/utils";
import { travelFormVali } from './travel.util'

export default {
    components: {
        Approval,
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
            userInfo: {},
            isType: "traveling",
            checkAll: false,
            i: -1,
            temp: [],
            itemList: [],//申请明细
            fileList: [],
            dialogFormVisible: false,
            dialogRecepVisible: false,
            // timeRange: [common.time.currentMonFirDayObj, common.time.currentMonNowDayObj],
            filter: {
                //筛选条件
                applyTime: "",
                projectId: null, //项目编号
                id: "", //主键ID
                procInsId: "", //流程实例ID
                projectName: "",
                projectPersonel: "", //项目负责人
                procCode: "", //流程编码
                procName: "", //流程名称 
                relationTheme: "",
                remarks:"",
                travelExpenseTypeList:[],
                entourageList:[]
            },
            total: null,
            recepTotal: null,
            showThemeForm:false,//关联主题
            ThemeData: [],//关联主题
            fullName:"",
            themeTotal: null,
            relationTheme:"",
            themeFilter: {
                pageNo: 1,
                pageSize: 10,
                resourcesApplyId: "", //流程申请ID ,
            },
            expTypeList: [],
            expenseAttachment: [],
            fileURL: process.env.BASE_API + "/commonInfo/fileUpload",
            listLoading: false,
            list: [],
            recep: [],
            recepName: "",
            projectName: "",
            projectLeaderName: "",
            projectType: "",
            listQuery: {
                pageNo: 1,
                pageSize: 10,
                officeId: "",
                applyTimeStart: "",
                applyTimeEnd: "",
            },
            relType: "2",
            relTypeList:[
                {
                    name:"关联主题",
                    value:"1"
                },{
                    name:"关联项目",
                    value:"2"
                },{
                    name:"不关联",
                    value:"3"
                }
            ],
            memberList:[]
        };
    },
    created() {
        this.filter.applyTime = common.time.monthlast
        this.$store.dispatch('clearCollection');
        //拿到基本信息
        this.userInfo = JSON.parse(localStorage.getItem("web_oa_userInfor"));

        if (this.$route.query.key) {
            this.filter.id = this.$route.query.key;
            retravelFlowDetail({
                travelFlowId: this.$route.query.key
            }).then(res => {
                this.filter.applyTime = res.data.travelFlowresponse.applyTime;
                this.projectName = res.data.travelFlowresponse.projectName;
                this.projectLeaderName = res.data.travelFlowresponse.projectPersonel;
                this.filter.projectId = res.data.travelFlowresponse.projectId;
                this.filter.employees = res.data.travelFlowresponse.employees;
                // this.filter.recpNum = res.data.recpFlowresponse.recpNum + "";

                this.filter.remarks = res.data.travelFlowresponse.remarks;
                res.data.travelFlowresponse.travelExpenseTypeList =  res.data.travelFlowresponse.travelExpenseTypeList ||[]
                this.filter.travelExpenseTypeList = res.data.travelFlowresponse.travelExpenseTypeList
                res.data.travelFlowresponse.entourageList = res.data.travelFlowresponse.entourageList || []
                this.filter.entourageList = res.data.travelFlowresponse.entourageList

                this.filter.recpTheme = res.data.travelFlowresponse.recpTheme;
                this.filter.procInsId = res.data.travelFlowresponse.procInsId;
                this.relType = res.data.travelFlowresponse.relType;
                if(res.data.travelFlowresponse.relType == 1) {
                    this.filter.relationTheme = res.data.travelFlowresponse.relationTheme;
                    this.relationTheme = res.data.travelFlowresponse.relationThemeName.substring(0, 20) + "...";
                    this.fullName = res.data.travelFlowresponse.relationThemeName;
                } 
                
                var itemDatas = res.data.budgetDetailList || [];
                itemDatas.forEach((item,index)=>{
                    if(item.startDate){
                        itemDatas[index].startDate = common.timeParseObj(item.startDate);
                    }else{
                        itemDatas[index].startDate = ""
                    }
                    if(item.endDate){
                        itemDatas[index].endDate = common.timeParseObj(item.endDate);
                    }else{
                        itemDatas[index].endDate = ""
                    }
                    if(!item.expenseAmt){
                        item.expenseAmt = ""
                    }
                })
                // var newItemDatas = common.ObjToStamp(itemDatas,['startDate','endDate'])
                this.$store.dispatch('fillDetailCollection', this.transDetailData(itemDatas));
            });
        }

        if (this.subsTree.length == 0) this.$store.dispatch('getSubs');
        
    },
    computed: {
        ...mapState({
            subsTree: state => state.reim.subsTree,
            subsList: state => state.reim.subsList,
            firstSub: state => state.reim.firstSub,
            token: state => state.user.token,
            detailCollection: state => state.reim.detailCollection,
        }),
        budgetTotal() {
            let result = 0;
            for (let i = 0; i < this.detailCollection.length; i++) {
                result += Number(this.detailCollection[i].expenseAmt);
            }
            return result;
        }
    },
    mounted() {
        //获取字典
        var _this = this;
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
        this.expTypeList = selectDic(dicList, "travel_expense_type");
        this.getTheme()
        getMember({}).then(res => {
            if(res.status == 0){
                this.memberList = res.data;
                // // //列表是非离职人员
                // this.memberPartList = res.data.filter((item)=>{
                //     return item.userStatus == '1'
                // })
            }
        })
    },
    methods: {
        // handleProFilter(){
        //     this.listQuery.pageNo = 1
        //     this.getList()
        // },
        // chioceProTime: function(val) {
        //     if (val && val.length > 0) {
        //         this.listQuery.applyTimeStart =val[0];
        //         this.listQuery.applyTimeEnd = val[1];
        //     } else {
        //         this.listQuery.applyTimeStart = 0;
        //         this.listQuery.applyTimeEnd = 0;
        //     }
        // },
        transDetailData(dataArr) {
            function createUid() {
                return parseInt(Math.random() * 100000) + "" + new Date().getTime();
            }
            // 转换接口明细的数据结构
            let detailCollection = dataArr.map(i => {
                return {
                    ...i,
                    selectedSubject: [i.firstSub, i.secondSub],
                    uid: createUid(),
                    checked: false
                }
            })
            return detailCollection;
        },
        selectAll(val){
            this.$store.dispatch('fillDetailCollectionChecked', val);
        },
        add(){
            if (this.detailCollection.length > 30) {
                this.$message({
                    message: "明细条目超出限制",
                    type: "warning"
                });
            } else {
                this.$store.dispatch("addDetail");
            }
        },
        del() {
            this.$store.dispatch('delDetailCollectionChecked');
        },
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
        //         }).then(res => {
        //         this.list = res.data.list;
        //         this.total = res.data.total;
        //         this.listLoading = false;
        //     });
        // },
        // handleCurrentChange(val) {
        //     this.listQuery.pageNo = val;
        //     this.getList();
        // },
        getItemsInStore() {
            let demandBudgetList = this.detailCollection.map(i => {
                return {
                    ...i,
                    firstSub: i.selectedSubject[0] || '',
                    secondSub: i.selectedSubject[1] || '',
                    startDate: common.timeParse(i.startDate),
                    endDate: common.timeParse(i.endDate),
                }
            })
            return demandBudgetList;
        },
        backStep() {
            this.$router.go(-1)
        },
        submit(type){
            this.filter.demandBudgetList = this.getItemsInStore();
            this.filter.budgetTotal = this.budgetTotal;
            if(type =='apply'&&travelFormVali(this)){
                travelApply({
                    ...this.filter
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
            if(type =='save'){
                saveTravelFlowInfo({
                    ...this.filter
                }).then(res => {
                    if (res.status == 0) {
                        this.$message({
                            message: res.message,
                            type: "success"
                        });
                        this.$router.go(-1);
                    }
                });
            }
        },

        themeCurrentChange(val) {
            this.themeFilter.pageNo = val;
            this.getTheme();
        },
        getTheme() {
            resourcesRelationHandleFlowList(this.themeFilter).then(res => {
                this.ThemeData = res.data.list || [];
                this.themeTotal = res.data.total;
            });
        },
        selectTheme(row) {
            this.filter.relationTheme = row.procCode;
            this.projectName = row.projectName;
            this.projectLeaderName = row.projectPersonel;
            this.relationTheme = row.procName.substring(0, 20) + "...";
            this.fullName = row.procName;
            this.showThemeForm = false;
        },
        changeRelType() {
            this.filter.projectId = "";
            this.filter.relationTheme = "";
            this.fullName = "";
            this.relationTheme = "";
            this.projectName = "";
            this.projectLeaderName = "";
        },
    }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.el-input--small .el-input__inner {
    height: 40px !important;
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