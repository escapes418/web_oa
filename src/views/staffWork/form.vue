<template>
  <div class="sjb-form-wrapper">
    <div class="segment statistics">
      <div class="segment-header">
        基本信息
      </div>
      <div class="segment-area">
        <el-row>
          <el-col :span="12"
            class="segment-brline">
            <RedStar label="日期："
              :required="true">
              <span class="right-con">
                <el-date-picker style="width:250px;"
                  v-model="filter.dailyDate"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions">
                </el-date-picker>
              </span>
            </RedStar>
            <!-- <div class="clearfix cominfo-item">
                        <span class="left-red">*</span>
                        <span class="left-title font-gray">日期：</span>
                        <span class="right-con">
                            <el-date-picker style="width:250px;" v-model="filter.dailyDate" type="date" placeholder="选择日期" :picker-options="pickerOptions">
                            </el-date-picker>
                        </span>
                    </div> -->
            <RedStar label="所属部门">
              <span class="right-con">
                {{userInfo.officeName}}
              </span>
            </RedStar>
            <!-- <div class="clearfix  cominfo-item">
                        <span class="left-title font-gray">所属部门</span>
                        <span class="right-con">
                            {{userInfo.officeName}}
                        </span>
                    </div> -->
            <RedStar label="当日拜访客户数："
              :required="true">
              <span class="right-con">
                <el-input placeholder="请输入数量"
                  style="width:250px;"
                  v-model.number="filter.custVisitCount"
                  type="number"></el-input>
              </span>
            </RedStar>
            <!-- <div class="clearfix cominfo-item">
                        <span class="left-red">*</span>
                        <span class="left-title font-gray">当日拜访客户数：</span>
                        <span class="right-con">
                            <el-input placeholder="请输入数量" style="width:250px;" v-model.number="filter.custVisitCount" type="number"></el-input>
                        </span>
                    </div> -->
            <RedStar label="当日签约客户数："
              :required="true">
              <span class="right-con">
                <el-input placeholder="请输入数量"
                  style="width:250px;"
                  v-model.number="filter.custSignCount"
                  type="number"></el-input>
              </span>
            </RedStar>
            <!-- <div class="clearfix cominfo-item">
                        <span class="left-red">*</span>
                        <span class="left-title font-gray">当日签约客户数：</span>
                        <span class="right-con">
                            <el-input placeholder="请输入数量" style="width:250px;" v-model.number="filter.custSignCount" type="number"></el-input>
                        </span>
                    </div> -->
          </el-col>
          <el-col :span="12"
            class="segment-brline">
            <RedStar label="市场负责人：">
              <span class="right-con">
                {{userInfo.name}}
              </span>
            </RedStar>
            <!-- <div class="clearfix  cominfo-item">
                        <span class="left-title font-gray">市场负责人：</span>
                        <span class="right-con">
                            {{userInfo.name}}
                        </span>
                    </div> -->
            <RedStar label="当日意向客户数："
              :required="true">
              <span class="right-con long_area">
                <el-input placeholder="请输入数量"
                  style="width:250px;"
                  v-model.number="filter.custIntentionCount"
                  type="number"></el-input>
              </span>
            </RedStar>
            <!-- <div class="clearfix cominfo-item">
                        <span class="right-red">*</span>
                        <span class="left-title font-gray">当日意向客户数：</span>
                        <span class="right-con long_area" >
                            <el-input placeholder="请输入数量" style="width:250px;" v-model.number="filter.custIntentionCount" type="number"></el-input>
                        </span>
                    </div> -->
            <RedStar label="明日拜访客户数："
              :required="true">
              <span class="right-con">
                <el-input placeholder="请输入数量"
                  style="width:250px;"
                  v-model.number="filter.afterVisitCount"
                  type="number"></el-input>
              </span>
            </RedStar>
            <!-- <div class="clearfix  cominfo-item">
                        <span class="right-red">*</span>
                        <span class="left-title font-gray">明日拜访客户数：</span>
                        <span class="right-con">
                            <el-input placeholder="请输入数量" style="width:250px;" v-model.number="filter.afterVisitCount" type="number"></el-input>
                        </span>
                    </div> -->
            <RedStar label="备注：">
              <span class="right-con">
                <el-input placeholder="请输入"
                  style="width:250px;"
                  :maxlength="50"
                  v-model.trim="filter.remarks"></el-input>
              </span>
            </RedStar>
            <!-- <div class="clearfix  cominfo-item">
                        <span class="left-title font-gray">备注：</span>
                        <span class="right-con">
                            <el-input placeholder="请输入" style="width:250px;" :maxlength="50" v-model.trim="filter.remarks"></el-input>
                        </span>
                    </div> -->
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="segment statistics">
      <div class="segment-header">
        <span class="left-red">*</span>
        今日工作内容
      </div>
      <div class="segment-area">
        <el-input type="textarea"
          :rows="3"
          style="margin-top:20px;margin-bottom:20px"
          placeholder="请输入内容"
          v-model.trim="filter.dailyContent">
        </el-input>
      </div>
    </div>
    <div class="segment statistics">
      <div class="segment-header">
        <span class="left-red">*</span>
        明日工作计划
      </div>
      <div class="segment-area">
        <el-input type="textarea"
          :rows="3"
          style="margin-top:20px;margin-bottom:20px"
          placeholder="请输入内容"
          v-model.trim="filter.afterDailyPlan">
        </el-input>
      </div>
    </div>
    <div class="segment statistics">
      <div class="sjb-foot-button">
        <el-button type="primary"
          size="small"
          @click="submit">提交</el-button>
        <el-button size="small"
          @click="backStep">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import common from "@/utils/common";
// import { saveLog, getDetail } from "@/api/log";
import { parseTime } from "@/utils/index";
import { logFormVali } from "./log.util";
import RedStar from "@/components/RedStar/RedStar.vue";
import { IF_filter, IF_userInfor } from "./interface";

import { Vue, Component } from "vue-property-decorator";

@Component({
    components: {
        RedStar: RedStar
    }
})
export default class LogForm extends Vue {
    custClassify: any[] = [];
    tranList: any[] = [];
    userInfo: IF_userInfor = {};
    pickerOptions: object = {
        disabledDate(time: any): boolean {
            return time.getTime() > Date.now();
        }
    };
    filter: IF_filter = {
        afterDailyPlan: "",
        afterVisitCount: "",
        custIntentionCount: "",
        custSignCount: "",
        custVisitCount: "",
        dailyContent: "",
        dailyDate: "",
        id: "",
        marketLeaderId: "",
        officeId: "",
        remarks: ""
    };
    created() {
        this.userInfo = JSON.parse(localStorage.getItem("web_oa_userInfor"));
        console.log(this.userInfo);
        this.filter.officeId = this.userInfo.officeId;
    }
    mounted() {
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
        this.custClassify = selectDic(dicList, "cust_classify");
        this.tranList = selectDic(dicList, "tran_method");
    }
    backStep(): void {
        this.$router.go(-1);
    }
    selectCode(val): void {
        this.filter.areaId = val;
    }
    submit(): void {
        // logFormVali(this)
        if (logFormVali(this)) {
            saveLog({
                ...this.filter,
                dailyDate: common.timeParse(this.filter.dailyDate)
            }).then((res: Ajax.AjaxResponse) => {
                if (res.status == 0) {
                    this.$message({
                        message: res.message,
                        type: "success"
                    });
                    this.$router.go(-1);
                }
            });
        }
    }
}
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
.left-red {
    color: red;
    position: absolute;
    left: 15px;
}
.right-red {
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

.el-cascader .el-cascader--small {
    width: 250px !important;
}
</style>
<style>
.area .el-cascader {
    width: 250px !important;
}
</style>
