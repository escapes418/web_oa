<template>
    <div class="sjb-form-wrapper">
        <div class="segment statistics">
            <div class="segment-header">
                基本信息
            </div>
            <div class="segment-area">
                <el-row>
                    <el-col :span="12" class="segment-brline">
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">流程编号：</span>
                            <span class="right-con">
                                {{ detail.procCode }}
                            </span>
                        </div>
                        <div class="clearfix cominfo-item">
                            <span class="left-title font-gray">申请人员：</span>
                            <span class="right-con">{{ detail.applyPerName }}</span>
                        </div>
                        
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">所属部门：</span>
                            <span class="right-con">{{ detail.officeName }}</span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">项目名称：</span>
                            <span class="right-con">
                                {{ detail.projectName }}
                            </span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">资源类型：</span>
                            <span class="right-con">
                                {{ detail.resourcesTypeValue }}
                            </span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">期望抵达时间：</span>
                            <span class="right-con">
                                {{ detail.expectDate | stamp2TextHours}}
                            </span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">预计费用合计：</span>
                            <span class="right-con">
                                {{ detail.amountSum | thousands(2) }}
                            </span>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        
                        <div class="clearfix cominfo-item">
                            <span class="left-title font-gray">申请日期：</span>
                            <span class="right-con">{{ detail.applyTime }}</span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">项目负责人：</span>
                            <span class="right-con">{{ detail.projectPersonel }}</span>
                        </div>
                        <div class="clearfix cominfo-item">
                            <span class="left-title font-gray">需求数量：</span>
                            <span class="right-con">{{ detail.demandPersonelNum }}</span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">预计时长：</span>
                            <span class="right-con">{{ detail.timeLong }}</span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">备注：</span>
                            <span class="ignore-detail" :title="detail.remarks">
                                {{ detail.remarks }}
                            </span>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="segment statistics" v-if="flowDetailList.length != 0">
        <div class="segment-header">
                指派明细
            </div>
            <div class="segment-area">
                <div class="el-table__body-wrapper">
                    <el-table
                        :data="flowDetailList"
                        border>
                        <el-table-column
                            label="发起人"
                            align="center"
                            prop="sourceAssignName">
                        </el-table-column>
                        <el-table-column
                            label="指派对象"
                            align="center"
                            prop="targetAssignName" >
                        </el-table-column>
                        <el-table-column
                            label="满足数量"
                            align="center"
                            prop="personelNum">
                        </el-table-column>
                        <el-table-column
                            label="更新时间"
                            align="center"
                            prop="updateTime">
                        </el-table-column>
                        <el-table-column
                            label="备注"
                            align="center"
                            prop="remarks">
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <div class="segment statistics" v-if="!ISPUTIN">
            <div class="segment-header">
                流转信息
            </div>
            <div class="segment-area">
                <div class="el-table__body-wrapper">
                    <div class=" pt-20 pb-20">
                        <div class="log-w" v-for="(item,index) in flowLoglist" :key="index" :class="{'sub-row':(index+1)!==flowLoglist.length}">
                            <div class="log-dot">
                                <div class="dot-core"></div>
                            </div>
                            <div class="log-text">
                                <div class="log-title">
                                    <span class="color-black bold">{{item.assigneeName}}</span>
                                    <!-- 审批bug的补丁 -->
                                    <span class="log-header" v-if="index==0">{{item.activityName}}</span>
                                    <span class="log-header" v-else>{{item.startTime&&item.endTime?"已审批":item.startTime&&!item.endTime?"待审批":!item.startTime&&!item.endTime?"已删除":""}}</span>
                                </div>
                                <div class="state-item">
                                    <span class="font-size14">{{item.endTime}}</span>
                                    <span v-if="item.durationTime" class="state-name">历时:{{item.durationTime}}</span>
                                </div>
                                <p v-if="item.comment" class="font-gray font-size14 mt-2">{{item.comment}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <template v-if="pathType === 'todo'">
            <div class="segment statistics">
                <div class="segment-header">
                    <span class="left-red">*</span>
                    审批意见
                </div>
                <div class="segment-area">
                    <div class="el-table__body-wrapper">
                        <el-table ref="multipleTable" border :data="itemList" tooltip-effect="dark" style="width:100%" @selection-change="handleSelectionChange">
                            <el-table-column
                                type="selection"
                                width="55">
                            </el-table-column>
                            <el-table-column align="center" label="对象" width="220px">
                                <template slot-scope="scope">
                                    <el-select clearable class="filter-item" filterable v-model="scope.row.targetAssign" placeholder="请选择">
                                        <el-option v-for="item in memberList" :label="item.name" :value="item.id" :key="item.id">
                                        </el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="满足数量" width="220px">
                                <template slot-scope="scope">
                                    <el-input auto-complete="off" v-model.number="scope.row.personelNum" type="number" :maxlength="250"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="意见" >
                                <template slot-scope="scope">
                                    <el-input auto-complete="off" v-model="scope.row.remarks" :maxlength="250"></el-input>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <div class="segment-foot">
                    <el-button type="primary" size="small" @click="add">新增</el-button>
                    <el-button type="danger" size="small" @click="del">删除</el-button>
                </div>
            </div>
        </template>
        <div class="segment statistics">
            <div class="sjb-foot-button">
                <template v-if="pathType === 'list'">
                    <!-- <el-button v-if="ISEDIT" size="medium" type="primary" @click="expBtn">提交</el-button> -->
                    <el-button v-if="ISEDIT" size="medium" type="primary" @click="editBtn">编辑</el-button>
                    <el-button v-if="ISCANCEL&&!ISEDIT" size="medium" type="warning" @click="dialogCanVisible = true">撤销</el-button>
                    <el-button v-if="ISDEL" size="medium" type="danger" @click="dialogDelVisible = true">删除</el-button>
                    <el-button size="medium" @click="backBtn">返回</el-button>
                </template>
                <template v-if="pathType === 'todo'">
                    <!-- <el-button v-if="ISME&&ISEDIT" size="medium" type="primary" @click="expBtn">提交</el-button> -->
                    <el-button v-if="ISME&&ISEDIT" size="medium" type="primary" @click="editBtn">编辑</el-button>
                    <el-button v-if="!ISEDIT&&ISME || !ISME" size="medium" type="primary" @click="agreeBtn">同意</el-button>
                    <!-- <el-button v-if="!ISEDIT&&ISME || !ISME" size="medium" type="info" @click="refuseBtn">驳回</el-button> -->
                    <el-button size="medium" @click="backBtn">返回</el-button>
                </template>
                <template v-if="pathType === 'done'">
                    <el-button v-if="ISCANCEL" size="medium" type="warning" @click="dialogCanVisible = true">撤销</el-button>
                    <el-button size="medium" @click="backBtn">返回</el-button>
                </template>
            </div>
        </div>
        <el-dialog title="系统提示？" width="25%" :visible.sync="dialogDelVisible">
            <span>确认删除该资源申请单吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="delBtn">确认</el-button>
                <el-button @click="dialogDelVisible = false">取消</el-button>
            </span>
        </el-dialog>
        <el-dialog title="系统提示？" width="25%" :visible.sync="dialogCanVisible">
            <span>确认撤销该资源申请单吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="cancelBtn">确认</el-button>
                <el-button @click="dialogCanVisible = false">取消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import common from "@/utils/common";
import {
    getDetail,
    delResource,
    fetchMember,
    resourcesApplyComplete,
    resourseFlowRepealTask
} from "@/api/resource";
import { parseTime } from "@/utils";
import { reimDetailVali } from './resource.util'

export default {
    name: "complexTable",
    data() {
        return {
            flowDetailList: [],
            budgetDetailList: [],
            flowLoglist: [],
            detail: {},
            itemList: [],
            memberList:[],
            taskId: 0,
            pathType:"",
            dialogCanVisible:false,
            dialogDelVisible:false,
            userInfo: "",
        };
    },
    computed: {
        ISME:function(){
            let result = this.userInfo.name == this.detail.applyPerName ? true : false
            return result
        },
        ISDEL:function(){
            let result = this.detail.resourcesStatus == 2 || this.detail.resourcesStatus == 3 || this.detail.resourcesStatus == 4 ? true : false
            return result
        },
        ISEDIT:function(){
            let result = this.detail.modify == 'modify' ? true :false;
            return result
        },
        ISPUTIN:function(){
            let result = this.detail.resourcesStatus == 4 ? true :false
            return result
        },
        ISCANCEL:function(){
            let result = this.detail.resourcesStatus == 2 ? true:false
            return result
        }
    },
    created() {
        this.userInfo = JSON.parse(localStorage.getItem("web_oa_userInfor"));
        if(this.$route.query.taskId) this.taskId = this.$route.query.taskId
        if(this.$route.query.pathType) this.pathType = this.$route.query.pathType
        getDetail({
            resApplyFlowId: this.$route.query.key
        }).then(res => {
            this.detail = res.data.resourcesApplyFlowResponse;
            this.flowLoglist = res.data.flowLoglist || [];
            this.flowDetailList = res.data.resourcesApplyFlowResponse.assignList || [];
        });
    },
    methods: {
        backBtn() {
            this.$router.go(-1);
        },
        editBtn() {
            this.$router.push({
                path: "/me/resourceForm",
                query: { key: this.$route.query.key }
            });
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        add() {
            this.itemList.push({ index: new Date().getTime()});
        },
        del(){
            var _this = this
            var newindex = [];
            var newBox = [];
            _this.multipleSelection.forEach((value,idx)=>{
                newindex.push(value.index)
            })
            var arrBox = JSON.parse(JSON.stringify(this.itemList||[]))
            arrBox.forEach((val,num)=>{
                if(newindex.indexOf(val.index) == -1){
                    newBox.push(arrBox[num])
                }
            })
            this.itemList = newBox
        },
        agreeBtn() {
            let assignList = []
            this.itemList.forEach((val,index)=>{
                let obj = {};
                for(let key in val){
                    if(key != 'index'){
                        obj[key] = val[key]
                    }
                }
                assignList.push(obj)
            })
            if(reimDetailVali(this)){
                resourcesApplyComplete({
                    resApplyFlowId : this.$route.query.key,
                    assignList:assignList,
                    flag: "yes",
                    procInsId: this.detail.procInsId,
                    taskId:this.$route.query.taskId
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
        // refuseBtn() {
        //     if (this.comment == "") {
        //         this.$message({
        //             message: "审批意见不能为空！！",
        //             type: "warning"
        //         });
        //     }
        //     travelFlowCompleteTask({
        //         expenseFlowId: this.$route.query.key,
        //         comment: this.comment,
        //         flag: "no",
        //         procInsId: this.detail.procInsId
        //     }).then(res => {
        //         if (res.status == 0) {
        //             this.$message({
        //                 message: res.message,
        //                 type: "success"
        //             });
        //             this.$router.push({ path: "/me/travelingList" });
        //         }
        //     });
        // },
        cancelBtn() {
            resourseFlowRepealTask({
                procInsId: this.detail.procInsId,
                taskId: this.taskId || 0
            }).then(res => {
                if (res.status == 0) {
                    this.$message({
                        message: res.message,
                        type: "success"
                    });
                    this.dialogCanVisible = false
                    this.$router.go(-1);
                }
            });
        },
        delBtn() {
            delResource({
                resApplyFlowId: this.$route.query.key
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
    mounted() {
        fetchMember({}).then(res => {
            this.memberList = res.data;
        })
    }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.segment .el-table__body-wrapper {
    padding: 40px 20px 35px;
}
.left-red{
    color: red;
    position: absolute;
    left: 15px;
}
.ignore-detail {
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
    color: #343434;
    font-size: 14px;
}
</style>