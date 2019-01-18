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
                            <span class="left-title font-gray">报销人员：</span>
                            <span class="right-con">{{ detail.applyPerName }}</span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">所属部门：</span>
                            <span class="right-con">{{ detail.officeName }}</span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">报销类型：</span>
                            <span class="right-con">
                                {{ detail.applyTypeName }}
                            </span>
                        </div>
                        <div class="clearfix  cominfo-item" v-if="detail.applyType == 2">
                            <span class="left-title font-gray">接待申请：</span>
                            <span class="right-con">
                                {{ detail.recpProcName }}
                            </span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">项目名称：</span>
                            <span class="right-con">
                                {{ detail.projectLabel }}
                            </span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">票据数量：</span>
                            <span class="right-con">
                                {{ detail.billNum}}
                            </span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">
                                <span class="left-red">*</span>
                                本次打款金额：
                            </span>
                            <span class="right-con">
                                <el-input v-model.trim="payNum" type="number" style="width:280px"></el-input>
                            </span>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="clearfix cominfo-item">
                            <span class="left-title font-gray">报销日期：</span>
                            <span class="right-con">{{ detail.applyTime | stamp2TextDateFull}}</span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">所属岗位：</span>
                            <span class="right-con">{{ detail.postName }}</span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">发票所属公司：</span>
                            <span class="right-con">{{ detail.taxCityName }}</span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">项目负责人：</span>
                            <span class="right-con">
                                {{ detail.projectPersonel }}
                            </span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">费用合计：</span>
                            <span class="right-con">
                                {{ detail.expenseTotal | thousands(2) }}
                            </span>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="segment statistics">
            <div class="segment-header">
                报销明细
            </div>
            <div class="segment-area">
                <div class="el-table__body-wrapper">
                    <el-table :data="flowDetailList" border>
                        <el-table-column sortable prop="startDate" label="发生日期">
                            <template slot-scope="scope">
                                <span>{{scope.row.startDate | stamp2TextDate}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="起点" prop="startPointName">
                        </el-table-column>
                        <el-table-column label="结束日期">
                            <template slot-scope="scope">
                                <span>{{scope.row.endDate | stamp2TextDate}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="终点" prop="endPointName">
                        </el-table-column>
                        <el-table-column label="一级科目" prop="firstSubName" width="120">
                        </el-table-column>
                        <el-table-column label="二级科目" prop="secondSubName">
                        </el-table-column>
                        <el-table-column label="人数" prop="personNum">
                        </el-table-column>
                        <el-table-column label="天数" prop="dayNum">
                        </el-table-column>
                        <el-table-column label="票据张数" prop="billNum">
                        </el-table-column>
                        <el-table-column label="报销金额" prop="expenseAmt">
                            <template slot-scope="scope">
                                <span class="font-orange">{{ scope.row.expenseAmt | thousands(2) }}元</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="备注" prop="remarks">
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <div class="segment statistics">
            <div class="segment-header">
                流转信息
            </div>
            <div class="segment-area">
                <div class="el-table__body-wrapper">
                    <div class=" pt-20 pb-20">
                        <div class="log-w" v-for="(item,index) in flowLoglist" :key="index" :class="{'sub-row':(index+1) != flowLoglist.length}">
                            <div class="log-dot">
                                <div class="dot-core"></div>
                            </div>
                            <div class="log-text">
                                <div class="log-title">
                                    <span class="color-black bold">{{item.assigneeName}}</span>
                                    <!-- 审批bug的补丁 -->
                                    <span class="log-header" v-if="index==0">{{item.activityName}}</span>
                                    <span class="log-header" v-else>{{item.comment?"已审批":"待审批"}}</span>
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
        <div class="segment statistics">
            <div class="sjb-foot-button">
                <el-button size="medium" type="primary" @click="expBtn">提交</el-button>
                <el-button size="medium" @click="backBtn">返回</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import common from "@/utils/common";
import { getDetail, payApplay } from "@/api/pay";
import { parseTime } from "@/utils";
import { mapState } from "vuex";

export default {
    name: "complexTable",
    data() {
        return {
            flowDetailList: [],
            payNum: undefined,
            detail: {},
            flowLoglist: []
        };
    },
    computed: {
        ...mapState({
            userInfo: state => state.user.userInfo
        })
    },
    created() {
        getDetail({
            expenseFlowId: this.$route.query.key
        }).then(res => {
            this.detail = res.data.detail;
            this.flowDetailList = res.data.flowDetailList;
            this.flowLoglist = res.data.flowLoglist;
        });
    },
    methods: {
        backBtn() {
            this.$router.go(-1);
        },
        expBtn() {
            if (this.payNum && this.payNum > 0) {
                if (this.payNum > this.detail.expenseTotal) {
                    this.$message({
                        message: "请输入小于等于可报销的费用合计！",
                        type: "error"
                    });
                    return;
                }
                payApplay({
                    id: this.$route.query.key,
                    bringAmount: this.payNum
                }).then(res => {
                    if (res.status == 0) {
                        this.$message({
                            message: res.message,
                            type: "success"
                        });
                        this.$router.push({
                            path: "/me/payList"
                        });
                    }
                });
            } else {
                this.$message({
                    message: "请正确填写提前打款金额！",
                    type: "error"
                });
            }
        }
    },
    mounted() {}
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
</style>