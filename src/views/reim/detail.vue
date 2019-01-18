<template>
<div>
    <div id="printWrapper">
        <div class="printCont">
            <!-- 基本信息 -->
            <div class="areaHead">
                基本信息
            </div>
            <div class="areaCont">
                <el-row>
                    <el-col :span="12">
                        <div class="item">
                            <div class="label">流程编号:</div>
                            <div class="text">{{ detail.procCode }}</div>
                        </div>
                        <div class="item">
                            <div class="label">报销人员:</div>
                            <div class="text">{{ detail.applyPerName }}</div>
                        </div>
                        <div class="item">
                            <div class="label">所属部门:</div>
                            <div class="text">{{ detail.officeName }}</div>
                        </div>
                        <div class="item">
                            <div class="label">报销类型:</div>
                            <div class="text">{{ detail.applyTypeName }}</div>
                        </div>
                        <div class="item">
                            <div class="label">项目名称:</div>
                            <div class="text">{{ detail.projectLabel }}</div>
                        </div>
                        <div class="item">
                            <div class="label">费用合计:</div>
                            <div class="text">{{ detail.expenseTotal | thousands(2) }}</div>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="item">
                            <div class="label">报销日期:</div>
                            <div class="text">{{ detail.applyTime }}</div>
                        </div>
                        <div class="item">
                            <div class="label">所属岗位:</div>
                            <div class="text">{{ detail.postName }}</div>
                        </div>
                        <div class="item">
                            <div class="label">发票公司:</div>
                            <div class="text">{{ detail.taxCityName }}</div>
                        </div>
                        <div class="item">
                            <div class="label">项目负责人:</div>
                            <div class="text">{{ detail.projectPersonel }}</div>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div id="partEle">
                 <!-- 报销明细 -->
                <div class="areaHead">报销明细</div>
                <div class="areaCont">
                    <div class="details" v-for="(scope,index) in flowDetailList">
                        <div class="top">
                            <div class="time">{{scope.startDate | stamp2TextDate}} 至 {{scope.endDate | stamp2TextDate}}</div>
                            <div class="type">{{scope.firstSubName + scope.secondSubName?'/'+scope.secondSubName:""}}</div>
                            <div class="budget">预算：{{ scope.expenseAmt | thousands(2) }}</div>
                        </div>
                        <div class="body">
                            <div class="address">{{scope.startPointName | specialTrim}} - {{scope.endPointName | specialTrim}}</div>
                            <div class="personDay">数量：{{scope.personNum}}人/{{scope.dayNum}}天/{{scope.billNum}}张</div>
                        </div>
                        <div class="bottom">
                            <div>
                                备注：{{scope.remarks}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
            <!-- 流程信息 -->
            <div class="areaHead">流转信息</div>
            <div class="areaCont">
                <div class="flowItem" v-for="(item,index) in flowLoglist" :key="index">
                    <div class="baseInfo">
                        <div class="assignName bold">{{item.assigneeName}}</div>
                        <!-- 审批bug的补丁 -->
                        <div class="flowName" v-if="index==0">{{item.activityName}}</div>
                        <div class="flowName" v-else>{{item.comment?"已审批":"待审批"}}</div>
                        <!-- 时间 -->
                        <div class="endTime">{{item.endTime}}</div>
                        <div class="costTime" v-if="item.durationTime">历时：{{item.durationTime}}</div>
                    </div>
                    <div class="commit">
                        <p v-if="item.comment">{{item.comment}}</p>
                        <!-- <p v-if="item.comment">{{item.comment}}</p> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="sjb-form-wrapper">

        <div id="pdf-wrap">
            <div class="segment statistics part-wrap">
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
                            <div class="clearfix  cominfo-item" v-if="detail.applyType == 2 || detail.applyType == 3">
                                <span class="left-title font-gray">关联申请：</span>
                                <span class="right-con">
                                    {{ detail.relationThemeName }}
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
                                    {{ detail.billNum }}
                                </span>
                            </div>
                            <div class="clearfix  cominfo-item" v-if="detail.bringAmount">
                                <span class="left-title font-gray">提前打款金额：</span>
                                <span class="right-con">
                                    {{ detail.bringAmount }}
                                </span>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="clearfix cominfo-item">
                                <span class="left-title font-gray">报销日期：</span>
                                <span class="right-con">{{ detail.applyTime }}</span>
                            </div>
                            <div class="clearfix  cominfo-item">
                                <span class="left-title font-gray">所属岗位：</span>
                                <span class="right-con">{{ detail.postName }}</span>
                            </div>
                            <div class="clearfix  cominfo-item">
                                <span class="left-title font-gray">发票所属公司：</span>
                                <span class="right-con">{{ detail.taxCityName }}</span>
                            </div>
                            <div class="clearfix  cominfo-item" v-if="detail.applyType == 2">
                                <span class="left-title font-gray">陪客人员：</span>
                                <span class="right-con">
                                    {{ detail.employeesName }}
                                </span>
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
                            <el-table-column label="查看附件" prop="subConfList">
                                <template slot-scope="scope">
                                    <el-button type="primary" @click="showImgDia(scope.row.subConfList)" :disabled="!scope.row.subConfList">查看图片</el-button>
                                </template>
                            </el-table-column>

                        </el-table>
                        <div class="sum-title">
                            合计：
                        </div>
                        <div v-for="(item,index) in amtList" :key="index" class="sum-item">
                            <span class="sum-name">
                                {{item.firstSubName}}
                                <span v-if="item.secondSubName">/</span>
                                {{item.secondSubName}}
                            </span>
                            <span class="sum-value">{{item.amt}}元</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="segment statistics part-wrap" v-if="!ISPUTIN">
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
            <div class="segment statistics part-wrap" v-if="expenseAttachment.length > 0">
                <div class="segment-header">
                    附件
                </div>
                <div class="segment-area">
                    <div class="el-table__body-wrapper">
                        <div v-for="(val,index) in expenseAttachment" :key="index" style="width:40%;margin-bottom:15px">
                            <div v-if="val.url != ''" class="upload-list">
                                <span class="img-font">{{val.name}}</span>
                                <el-button v-if="['png','gif','jpeg','jpg'].indexOf((val.name.split('.')[val.name.split('.').length - 1]).toLowerCase()) == -1" type="text" @click="downAttach(val)" style="float:right">下载</el-button>
                                <el-button v-else type="text" style="float:right" @click="showImg(index,1)">
                                    查看<img :src="val.url" style="display:none">
                                </el-button>
                                
                                <!-- <el-button type="text" style="float:right" @click="downAttach(val)">下载</el-button> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <template v-if="pathType === 'todo'">
            <div class="segment statistics" v-if="!ISEDIT&&ISME || !ISME">
                <div class="segment-header">
                    审批意见
                </div>
                <div class="segment-area">
                    <el-input type="textarea" :rows="3" :maxlength="300" style="width:420px;margin-top:20px;margin-bottom:20px" placeholder="请输入内容" v-model="comment">
                    </el-input>
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
                    <el-button v-if="ISPRINT" size="medium" type="primary" @click="createPdf">打印</el-button>
                    <el-button v-if="ISPRINT" size="medium" type="primary" @click="createPartPdf">部分打印</el-button>
                    <el-button size="medium" @click="backBtn">返回</el-button>
                </template>
                <template v-if="pathType === 'todo'">
                    <!-- <el-button v-if="ISME&&ISEDIT" size="medium" type="primary" @click="expBtn">提交</el-button> -->
                    <el-button v-if="ISME&&ISEDIT" size="medium" type="primary" @click="editBtn">编辑</el-button>
                    <el-button v-if="!ISEDIT&&ISME || !ISME" size="medium" type="primary" @click="agreeBtn">同意</el-button>
                    <el-button v-if="!ISEDIT&&ISME || !ISME" size="medium" type="info" @click="refuseBtn">驳回</el-button>
                    <el-button v-if="ISPRINT" size="medium" type="primary" @click="createPdf">打印</el-button>
                    <el-button v-if="ISPRINT" size="medium" type="primary" @click="createPartPdf">部分打印</el-button>
                    <el-button size="medium" @click="backBtn">返回</el-button>
                </template>
                <template v-if="pathType === 'done'">
                    <el-button v-if="ISCANCEL" size="medium" type="warning" @click="dialogCanVisible = true">撤销</el-button>
                    <el-button v-if="ISPRINT" size="medium" type="primary" @click="createPdf">打印</el-button>
                    <el-button v-if="ISPRINT" size="medium" type="primary" @click="createPartPdf">部分打印</el-button>
                    <el-button size="medium" @click="backBtn">返回</el-button>
                </template>
                <template v-if="pathType === 'report'">
                    <el-button v-if="ISPRINT" size="medium" type="primary" @click="createPdf">打印</el-button>
                    <el-button v-if="ISPRINT" size="medium" type="primary" @click="createPartPdf">部分打印</el-button>
                    <el-button size="medium" @click="backBtn">返回</el-button>
                </template>
            </div>
        </div>
    <el-dialog title="系统提示？" width="25%" :visible.sync="dialogDelVisible">
        <span>确认删除该报销单吗？</span>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="delBtn">确认</el-button>
            <el-button @click="dialogDelVisible = false">取消</el-button>
        </span>
    </el-dialog>
    <el-dialog title="系统提示？" width="25%" :visible.sync="dialogCanVisible">
        <span>确认撤销该报销单吗？</span>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="cancelBtn">确认</el-button>
            <el-button @click="dialogCanVisible = false">取消</el-button>
        </span>
    </el-dialog>
    <el-dialog title="图片详情" width="25%" :visible.sync="dialogImg">
        <div v-for="(val,index) in urlArr" :key="index" >
            <div v-if="val.url != ''" class="upload-list" @click="showImg(index,2)">
                <img :src="val.url" alt="" style="width:120px;height:120px">
                <div class="img-font">{{val.name}}</div>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogImg = false">返回</el-button>
        </span>
    </el-dialog>
  </div>
</div>
</template>

<script>
import common from "@/utils/common";
import {
  getDetail,
  startExp,
  expFlow,
  expCancel,
  expDel,
  downFile
} from "@/api/reim";
import { parseTime } from "@/utils";
import { mapState } from "vuex";
import "viewerjs/dist/viewer.css";
import Viewer from "viewerjs";

import "./print.scss";

export default {
  name: "complexTable",
  filters: {
    specialTrim(value) {
      return value.toString();
    }
  },
  data() {
    return {
        fileURL: process.env.BASE_API + "/commonInfo/fileUpload",
        flowDetailList: [],
        flowLoglist: [],
        amtList: [],
        urlArr: [],
        expenseAttachment: [],
        detail: {},
        comment: "",
        taskId: undefined,
        dialogCanVisible: false,
        dialogDelVisible: false,
        dialogImg: false,
        pathType: undefined,
        finish: false
    };
  },
  computed: {
    ...mapState({
        subsList: state => state.reim.subsList,
        firstSub: state => state.reim.firstSub,
        token: state => state.user.token
    }),
    ISME: function() {
        let result =
            this.userInfo.name == this.detail.applyPerName ? true : false;
        return result;
    },
    ISDEL: function() {
        let result =
            this.detail.expenseStatus == 2 ||
            this.detail.expenseStatus == 3 ||
            this.detail.expenseStatus == 4
            ? true
            : false;
        return result;
    },
    ISEDIT: function() {
        let result = this.detail.modify == "modify" ? true : false;
        return result;
    },
    ISPUTIN: function() {
        let result = this.detail.expenseStatus == 4 ? true : false;
        return result;
    },
    ISCANCEL: function() {
        let result = this.detail.expenseStatus == 2 ? true : false;
        return result;
    },
    ISPRINT: function() {
        let result =
            this.detail.expenseStatus == 1 || this.detail.expenseStatus == 2
            ? true
            : false;
        return result;
    }
  },
  created() {
        this.userInfo = JSON.parse(localStorage.getItem("web_oa_userInfor"));
        if (this.$route.query.taskId) this.taskId = this.$route.query.taskId;
        if (this.$route.query.pathType) this.pathType = this.$route.query.pathType;

        getDetail({
            expenseFlowId: this.$route.query.key
        }).then(res => {
            this.detail = res.data.detail;
            res.data.flowDetailList = res.data.flowDetailList || [];
            this.flowDetailList = res.data.flowDetailList;
            this.flowLoglist = res.data.flowLoglist;
            this.amtList = res.data.amtList;
            if (
                res.data.detail.expenseAttachmentWeb &&
                res.data.detail.expenseAttachmentWeb.length > 0
            ) {
                res.data.detail.expenseAttachmentWeb.forEach(item => {
                    let originUrl = item.url;
                    item.url = res.data.detail.expenseAttachmentPrefix + item.url;
                    this.expenseAttachment.push({
                        url: item.url,
                        name: item.fileName,
                        originUrl: originUrl,
                        previewUrl: item.url,
                        viewer: null
                    });
                });
            }
            if (this.detail.applyType == 2) {
                if (
                    res.data.detail.employeesName &&
                    res.data.detail.employeesName.length > 0
                ) {
                    this.detail.employeesName = res.data.detail.employeesName.join(" , ");
                }
            }
            if (this.detail.applyType == 2 || this.detail.applyType == 3) {
                this.detail.procName = res.data.detail.procName;
            }
        });
  },
  methods: {
    showImgDia(subConfList) {
        this.urlArr = [];
        if (subConfList) {
            subConfList.forEach(item => {
                let url = "";
                url = item.urlPrefix + item.url;
                this.urlArr.push({
                    url: url,
                    name: item.confDesc,
                    previewUrl: url,
                    viewer: null
                });
            });
            this.dialogImg = true;
        }
    },
    createPartPdf() {
        var partEle =  document.getElementById("partEle");
        partEle.parentNode.removeChild(partEle);
        var printHtml = document.getElementById("printWrapper").innerHTML;
        var oldHtml = document.body.innerHTML;
        document.body.innerHTML = printHtml;
        window.print();
        window.location.reload();
        document.body.innerHTML = oldHtml;
    },
    createPdf() {
        var pdfstr = document.getElementById("printWrapper");
        // 2. 复制给body，并执行window.print打印功能
        var newstr = pdfstr.innerHTML;
        // 3. 还原：将旧的页面储存起来，当打印完成后返给给页面。
        var oldstr = document.body.innerHTML;
        document.body.innerHTML = newstr;
        window.print();
        window.location.reload();
        document.body.innerHTML = oldstr;
        return false;
    },
    showImg(index, type) {
        if (type == 1) {
            // 如果已初始化过 直接show出
            if (this.expenseAttachment[index].viewer) {
                this.expenseAttachment[index].viewer.show();
                return;
                // this.clientimg[index].viewer.destroy();//也可以销毁后再重新初始化
            }
            // 初始化
            this.expenseAttachment[index].viewer = new Viewer(event.target, {});
            // 调用show
            this.expenseAttachment[index].viewer.show();
        } else {
            if (this.urlArr[index].viewer) {
                this.urlArr[index].viewer.show();
                return;
            }
            this.urlArr[index].viewer = new Viewer(event.target, {});
            this.urlArr[index].viewer.show();
        }
        // window.open(url);
    },
    backBtn() {
      this.$router.go(-1);
      //   this.$router.push({
      //       path:'/me/reim'
      //   })
    },
    downAttach(val) {
        downFile({ url: val.originUrl, fileName: val.name }).then(res => {
            if (res.status == 0) {
                var url = `./OA${res.data}`;
                console.log("url", url);
                window.location.href = url;
            }
        });
    },
    // expBtn(){
    //     if(reimDetailVali(this)){
    //         startExp({
    //             expenseFlowId:this.$route.query.key,
    //             procInsId:this.detail.procInsId
    //         }).then(res =>{
    //             if(res.status ==0){
    //                 this.$message({
    //                     message: res.message,
    //                     type: 'success'
    //                 })
    //                 this.$router.go(-1)
    //             }
    //         })
    //     }

    // },
    editBtn() {
        this.$router.push({
            path: "/me/reimForm",
            query: { key: this.$route.query.key }
        });
    },
    agreeBtn() {
        if (this.comment.length > 100) {
            this.$message({
            message: "输入字符超出限额，请重新输入！",
            type: "warning"
            });
            return;
        }
        expFlow({
            expenseFlowId: this.$route.query.key,
            comment: this.comment,
            flag: "yes",
            procInsId: this.detail.procInsId
        }).then(res => {
            if (res.status == 0) {
            this.$message({
                message: res.message,
                type: "success"
            });
            // this.$router.push({
            //     path:'/me/reim'
            // })
            this.$router.go(-1);
            }
        });
    },
    refuseBtn() {
        if (this.comment == "") {
            this.$message({
                message: "审批意见不能为空！",
                type: "warning"
            });
            return;
        }
        if (this.comment.length > 100) {
            this.$message({
                message: "输入字符超出限额，请重新输入！",
                type: "warning"
            });
            return;
        }
        expFlow({
            expenseFlowId: this.$route.query.key,
            comment: this.comment,
            flag: "no",
            procInsId: this.detail.procInsId
        }).then(res => {
            if (res.status == 0) {
                this.$message({
                    message: res.message,
                    type: "success"
                });
                this.$router.go(-1);
            }
        });
    },
    cancelBtn() {
        expCancel({
            procInsId: this.detail.procInsId,
            taskId: this.taskId || 0
        }).then(res => {
            if (res.status == 0) {
                this.$message({
                    message: res.message,
                    type: "success"
                });
                this.$router.go(-1);
            }
        });
        },
    delBtn() {
        expDel({
            expenseFlowId: this.$route.query.key
        }).then(res => {
            if (res.status == 0) {
                this.dialogDelVisible = false;
                this.$message({
                    message: res.message,
                    type: "success"
                });
                // this.$router.push({
                //     path:'/me/reim'
                // })
                this.$router.go(-1);
            }
        });
    }
  },
  mounted() {
    Viewer.setDefaults({
        navbar: false,
        toolbar: {
            zoomIn: 4,
            zoomOut: 4,
            oneToOne: {
                show: 4,
                size: "large"
            },
            reset: {
                show: 4,
                size: "large"
            },
            rotateLeft: 4,
            rotateRight: 4
        }
    });
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.segment .el-table__body-wrapper {
    padding: 40px 20px 35px;
}
.sum-title {
    font-size: 14px;
    margin: 15px 0 15px 0;
}
.sum-item {
    margin-left: 40px;
    font-size: 14px;
    width: 40%;
    .sum-name {
        line-height: 32px;
        color: #99a9bf;
    }
    .sum-value {
        float: right;
        line-height: 32px;
    }
}
.img-font {
    font-size: 14px;
    padding-right: 10px;
    color: #343434;
    margin-bottom: 10px;
    width: 400px;
    line-height: 32px;
}

@media screen {
    #printWrapper {
        display: none;
    }
}
</style>

