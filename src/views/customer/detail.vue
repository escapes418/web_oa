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
              <span class="left-title font-gray">客户编号：</span>
              <span class="right-con">
                {{ detailData.baseCustInfo.custCode }}
              </span>
            </div>
            <div class="clearfix cominfo-item">
              <span class="left-title font-gray">客户简称：</span>
              <span class="right-con">{{ detailData.baseCustInfo.custAbbreviation }}</span>
            </div>
            <div class="clearfix  cominfo-item">
              <span class="left-title font-gray">主客户名称：</span>
              <span class="right-con">
                {{ detailData.baseCustInfo.mainCustName }}
              </span>
            </div>
            <div class="clearfix cominfo-item">
              <span class="left-title font-gray">统一社会信用代码：</span>
              <span class="right-con">
                {{ detailData.baseCustInfo.creditCode }}
              </span>
            </div>
            <div class="clearfix  cominfo-item">
              <span class="left-title font-gray">注册地址：</span>
              <span class="right-con">
                {{ detailData.baseCustInfo.registeredAddress }}
              </span>
            </div>
            <div class="clearfix  cominfo-item">
              <span class="left-title font-gray">商务助理：</span>
              <span class="right-con">
                {{ detailData.baseCustInfo.businessAssistantName }}
              </span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="clearfix cominfo-item">
              <span class="left-title font-gray">客户名称：</span>
              <span class="right-con">{{ detailData.baseCustInfo.custName }}</span>
            </div>
            <div class="clearfix  cominfo-item">
              <span class="left-title font-gray">地址：</span>
              <span class="right-con">{{ detailData.baseCustInfo.custAddressCodeName }}</span>
            </div>
            <div class="clearfix  cominfo-item">
              <span class="left-title font-gray">详细地址：</span>
              <span class="right-con">
                {{ detailData.baseCustInfo.custAddress }}
              </span>
            </div>
            <div class="clearfix  cominfo-item">
              <span class="left-title font-gray">法定代表人：</span>
              <span class="right-con">
                {{ detailData.baseCustInfo.legalRepresentative }}
              </span>
            </div>
            <div class="clearfix  cominfo-item">
              <span class="left-title font-gray">VIP客服：</span>
              <span class="right-con">
                {{ detailData.baseCustInfo.vipCustomerName }}
              </span>
            </div>
            <div class="clearfix  cominfo-item">
              <span class="left-title font-gray">清结算：</span>
              <span class="right-con">
                {{ detailData.baseCustInfo.accountLeaderName }}
              </span>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <template>
      <div style="margin-left:20px;width: 180px;">
        <el-tabs v-model="detailData.baseCustInfo.custType">
          <el-tab-pane :disabled="noCarTabDisabled" label="无车承运" name="1"></el-tab-pane>
          <el-tab-pane :disabled="coalUnionTabDisabled" label="煤链社" name="2"></el-tab-pane>
        </el-tabs>
      </div>
    </template>
    <!-- 无车 -->
    <div class="segment statistics" v-show="detailData.baseCustInfo.custType == '1'">
      <div class="segment-header">
        业务情况
      </div>
      <div class="segment-area">
        <el-row>
          <el-col :span="12" class="segment-brline">
            <div class="clearfix cominfo-item">
              <span class="left-title font-gray">所属行业：</span>
              <span class="right-con">{{ detailData.noCar.custTradesAppName }}</span>
            </div>
            <div class="clearfix  cominfo-item">
              <span class="left-title font-gray">规模（万吨/月）：</span>
              <span class="right-con">{{ detailData.noCar.custCompanySize }}</span>
            </div>
            <div class="clearfix  cominfo-item">
              <span class="left-title font-gray">发货方式：</span>
              <span class="right-con">{{ detailData.noCar.custDeliverModeAppName }}</span>
            </div>
            <div class="clearfix  cominfo-item">
              <span class="left-title font-gray">结算对象：</span>
              <span class="right-con">{{ detailData.noCar.custBalanceObjAppName }}</span>
            </div>
            <div class="clearfix  cominfo-item">
              <span class="left-title font-gray">支付方式：</span>
              <span class="right-con">{{ detailData.noCar.payMethodName }}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="clearfix cominfo-item">
              <span class="left-title font-gray">业务类型：</span>
              <span class="right-con">{{ detailData.noCar.custBusinessTypeAppName }}</span>
            </div>
            <div class="clearfix  cominfo-item">
              <span class="left-title font-gray">运力组织方式：</span>
              <span class="right-con">{{ detailData.noCar.custPowerModeAppName }}</span>
            </div>
            <div class="clearfix  cominfo-item">
              <span class="left-title font-gray">收货方式：</span>
              <span class="right-con">{{ detailData.noCar.custReceiveModeAppName }}</span>
            </div>
            <div class="clearfix  cominfo-item">
              <span class="left-title font-gray">结算周期（天）：</span>
              <span class="right-con">
                {{ detailData.noCar.custBalanceCycle }}
              </span>
            </div>
            <div class="clearfix  cominfo-item">
              <span class="left-title font-gray">调度费比例（%）：</span>
              <span class="right-con">
                {{ detailData.noCar.dispatchProportion }}
              </span>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="segment statistics" v-show="detailData.baseCustInfo.custType == '1'">
      <div class="segment-header">
        贸易结构
      </div>
      <div class="segment-area">
        <div class="textStyle-title">上游：</div>
        <sjbtextarea
          :readonly="true"
          :rows="4"
          placeholder="请输入企业名称、线路、地址、据点说明信息"
          v-model="detailData.noCar.upstream"
        ></sjbtextarea>
      </div>
      <div class="segment-area" style="margin-bottom:15px">
        <div class="textStyle-title">下游：</div>
        <sjbtextarea
          readonly
          :rows="4"
          placeholder="请输入企业名称、线路、地址、据点说明信息"
          v-model="detailData.noCar.downstream"
        ></sjbtextarea>
      </div>
    </div>
    <div class="segment statistics" v-show="detailData.baseCustInfo.custType == '1'">
      <div class="segment-header">
        市场联系人信息
      </div>
      <div class="segment-area">
        <div class="el-table__body-wrapper">
          <table
            id="expenseDetails"
            class="table table-striped table-bordered table-condensed"
            style="width:100%;margin-bottom: 20px; margin-top:15px"
          >
            <thead>
              <tr class="tableTitle">
                <td class="tableTitle">市场负责人</td>
                <td class="tableTitle">联系方式</td>
                <td class="tableTitle">邮箱</td>
                <td class="tableTitle">所在部门</td>
                <td class="tableTitle">职位</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="left" style="width:220px;text-align: center">
                  <span class="table_text">{{ detailData.noCar.marketLeaderName }}</span>
                </td>
                <td class="left" style="width:220px;text-align: center">
                  <span class="table_text">{{ detailData.noCar.marketLeaderPhone }}</span>
                </td>
                <td class="left" style="width:220px;text-align: center">
                  <span class="table_text">{{ detailData.noCar.marketLeaderMail }}</span>
                </td>
                <td class="left" style="width:220px;text-align: center">
                  <span class="table_text">{{ detailData.noCar.marketLeaderOfficeName }}</span>
                </td>
                <td class="left" style="width:220px;text-align: center">
                  <span class="table_text">{{ detailData.noCar.marketLeaderPostName }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="segment statistics" v-show="detailData.baseCustInfo.custType == '1'">
      <div class="segment-header">
        客户联系人信息
      </div>
      <div class="segment-area">
        <div class="el-table__body-wrapper">
          <table
            id="expenseDetails"
            class="table table-striped table-bordered table-condensed"
            style="width:100%;margin-bottom: 20px; margin-top:15px"
          >
            <thead>
              <tr class="tableTitle">
                <td class="tableTitle">联系人</td>
                <td class="tableTitle">联系方式</td>
                <td class="tableTitle">邮箱</td>
                <td class="tableTitle">职位</td>
                <td class="tableTitle">备注</td>
                <td class="tableTitle">合同联系人</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(itemData, index) in detailData.noCar.custLinkman" :key="index">
                <td class="left" style="width:220px;text-align: center">
                  <span class="table_text">{{ itemData.linkmanName }}</span>
                </td>
                <td class="left" style="width:220px;text-align: center">
                  <span class="table_text">{{ itemData.linkmanPhone }}</span>
                </td>
                <td class="left" style="width:220px;text-align: center">
                  <span class="table_text">{{ itemData.linkmanMail }}</span>
                </td>
                <td class="left" style="width:220px;text-align: center">
                  <span class="table_text">{{ itemData.linkmanPost }}</span>
                </td>
                <td class="left" style="text-align: center">
                  <span class="table_text">{{ itemData.remarks }}</span>
                </td>
                <td class="left" style="text-align: center">
                  <span class="table_text">{{ itemData.isContractLinkman == 1 ? "是" : "否" }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="segment statistics" v-show="detailData.baseCustInfo.custType == '1'">
      <div class="segment-header">
        维护记录
      </div>
      <div class="segment-area">
        <div class="el-table__body-wrapper" style="padding: 15px 0;">
          <el-table ref="multipleTable" border :data="noCaritemList" tooltip-effect="dark" style="width:100%">
            <el-table-column align="center" label="编号" width="100px">
              <template slot-scope="scope">
                <span>{{ scope.row.index }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="维护时间" width="180px">
              <template slot-scope="scope">
                <span>{{ scope.row.custMaintenanceDate | stamp2TextDateFull }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="维护人" width="100px">
              <template slot-scope="scope">
                <span>{{ scope.row.custMaintenanceMan }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="维护人部门" width="100px">
              <template slot-scope="scope">
                <span>{{ scope.row.maintainerDeptName }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="客户级别" width="150px">
              <template slot-scope="scope">
                <span>{{ scope.row.custStageName }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="拜访类型" width="150px">
              <template slot-scope="scope">
                <span>{{ scope.row.visitTypeName }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="问题归类" width="150px">
              <template slot-scope="scope">
                <span>{{ scope.row.issuesClassification }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="维护内容" width="200px">
              <template slot-scope="scope">
                <span>{{ scope.row.custMaintenanceContent }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="联系人" width="100px">
              <template slot-scope="scope">
                <span>{{ scope.row.linkmanName }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="备注">
              <template slot-scope="scope">
                <span>{{ scope.row.remarks }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pagination-container">
          <el-pagination
            background
            @current-change="handlenoCarCurrentChange"
            :current-page="noCarlistQuery.pageNo"
            :page-size="20"
            layout="total, prev, pager, next, jumper"
            :total="noCartotal"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="segment statistics" v-show="detailData.baseCustInfo.custType == '1'">
      <div class="sjb-foot-button">
        <el-button v-if="noCarISPICK && !noCarISME" size="medium" type="primary" @click="getCustBack('1')"
          >捡入</el-button
        >
        <el-button @click="goBack" size="medium">返回</el-button>
      </div>
    </div>

    <!-- 煤链社 -->
    <div class="segment statistics" v-show="detailData.baseCustInfo.custType == '2'">
      <div class="segment-header">
        业务情况
      </div>
      <div class="segment-area">
        <el-row>
          <el-col :span="12" class="segment-brline">
            <div class="clearfix cominfo-item">
              <span class="left-title font-gray">客户分类：</span>
              <span class="right-con">{{ detailData.coalUnion.custSortName }}</span>
            </div>
            <div class="clearfix cominfo-item">
              <span class="left-title font-gray">所属行业：</span>
              <span class="right-con">{{ detailData.coalUnion.custTradesAppName }}</span>
            </div>
            <div class="clearfix  cominfo-item">
              <span class="left-title font-gray">规模（万吨/月）：</span>
              <span class="right-con">{{ detailData.coalUnion.custCompanySize }}</span>
            </div>
            <div class="clearfix  cominfo-item">
              <span class="left-title font-gray">发货方式：</span>
              <span class="right-con">{{ detailData.coalUnion.custDeliverModeAppName }}</span>
            </div>
            <div class="clearfix  cominfo-item">
              <span class="left-title font-gray">结算对象：</span>
              <span class="right-con">{{ detailData.coalUnion.custBalanceObjAppName }}</span>
            </div>
            <div class="clearfix  cominfo-item">
              <span class="left-title font-gray">支付方式：</span>
              <span class="right-con">{{ detailData.coalUnion.payMethodName }}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="clearfix cominfo-item">
              <span class="left-title font-gray">服务费比例（%）：</span>
              <span class="right-con">{{ detailData.coalUnion.serviceFee }}</span>
            </div>
            <div class="clearfix cominfo-item">
              <span class="left-title font-gray">业务类型：</span>
              <span class="right-con">{{ detailData.coalUnion.custBusinessTypeAppName }}</span>
            </div>
            <div class="clearfix  cominfo-item">
              <span class="left-title font-gray">运力组织方式：</span>
              <span class="right-con">{{ detailData.coalUnion.custPowerModeAppName }}</span>
            </div>
            <div class="clearfix  cominfo-item">
              <span class="left-title font-gray">收货方式：</span>
              <span class="right-con">{{ detailData.coalUnion.custReceiveModeAppName }}</span>
            </div>
            <div class="clearfix  cominfo-item">
              <span class="left-title font-gray">结算周期（天）：</span>
              <span class="right-con">
                {{ detailData.coalUnion.custBalanceCycle }}
              </span>
            </div>
            <div class="clearfix  cominfo-item">
              <span class="left-title font-gray">调度费比例（%）：</span>
              <span class="right-con">
                {{ detailData.coalUnion.dispatchProportion }}
              </span>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="segment statistics" v-show="detailData.baseCustInfo.custType == '2'">
      <div class="segment-header">
        贸易结构
      </div>
      <div class="segment-area">
        <div class="textStyle-title">上游：</div>
        <sjbtextarea
          :readonly="true"
          :rows="4"
          placeholder="请输入企业名称、线路、地址、据点说明信息"
          v-model="detailData.coalUnion.upstream"
        ></sjbtextarea>
      </div>
      <div class="segment-area" style="margin-bottom:15px">
        <div class="textStyle-title">下游：</div>
        <sjbtextarea
          readonly
          :rows="4"
          placeholder="请输入企业名称、线路、地址、据点说明信息"
          v-model="detailData.coalUnion.downstream"
        ></sjbtextarea>
      </div>
    </div>
    <div class="segment statistics" v-show="detailData.baseCustInfo.custType == '2'">
      <div class="segment-header">
        市场联系人信息
      </div>
      <div class="segment-area">
        <div class="el-table__body-wrapper">
          <table
            id="expenseDetails"
            class="table table-striped table-bordered table-condensed"
            style="width:100%;margin-bottom: 20px; margin-top:15px"
          >
            <thead>
              <tr class="tableTitle">
                <td class="tableTitle">市场负责人</td>
                <td class="tableTitle">联系方式</td>
                <td class="tableTitle">邮箱</td>
                <td class="tableTitle">所在部门</td>
                <td class="tableTitle">职位</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="left" style="width:220px;text-align: center">
                  <span class="table_text">{{ detailData.coalUnion.marketLeaderName }}</span>
                </td>
                <td class="left" style="width:220px;text-align: center">
                  <span class="table_text">{{ detailData.coalUnion.marketLeaderPhone }}</span>
                </td>
                <td class="left" style="width:220px;text-align: center">
                  <span class="table_text">{{ detailData.coalUnion.marketLeaderMail }}</span>
                </td>
                <td class="left" style="width:220px;text-align: center">
                  <span class="table_text">{{ detailData.coalUnion.marketLeaderOfficeName }}</span>
                </td>
                <td class="left" style="width:220px;text-align: center">
                  <span class="table_text">{{ detailData.coalUnion.marketLeaderPostName }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="segment statistics" v-show="detailData.baseCustInfo.custType == '2'">
      <div class="segment-header">
        客户联系人信息
      </div>
      <div class="segment-area">
        <div class="el-table__body-wrapper">
          <table
            id="expenseDetails"
            class="table table-striped table-bordered table-condensed"
            style="width:100%;margin-bottom: 20px; margin-top:15px"
          >
            <thead>
              <tr class="tableTitle">
                <td class="tableTitle">联系人</td>
                <td class="tableTitle">联系方式</td>
                <td class="tableTitle">邮箱</td>
                <td class="tableTitle">职位</td>
                <td class="tableTitle">备注</td>
                <td class="tableTitle">合同联系人</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(itemData, index) in detailData.coalUnion.custLinkman" :key="index">
                <td class="left" style="width:220px;text-align: center">
                  <span class="table_text">{{ itemData.linkmanName }}</span>
                </td>
                <td class="left" style="width:220px;text-align: center">
                  <span class="table_text">{{ itemData.linkmanPhone }}</span>
                </td>
                <td class="left" style="width:220px;text-align: center">
                  <span class="table_text">{{ itemData.linkmanMail }}</span>
                </td>
                <td class="left" style="width:220px;text-align: center">
                  <span class="table_text">{{ itemData.linkmanPost }}</span>
                </td>
                <td class="left" style="text-align: center">
                  <span class="table_text">{{ itemData.remarks }}</span>
                </td>
                <td class="left" style="text-align: center">
                  <span class="table_text">{{ itemData.isContractLinkman == 1 ? "是" : "否" }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="segment statistics" v-show="detailData.baseCustInfo.custType == '2'">
      <div class="segment-header">
        维护记录
      </div>
      <div class="segment-area">
        <div class="el-table__body-wrapper" style="padding: 15px 0;">
          <el-table ref="multipleTable" border :data="coalUnionitemList" tooltip-effect="dark" style="width:100%">
            <el-table-column align="center" label="编号" width="100px">
              <template slot-scope="scope">
                <span>{{ scope.row.index }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="维护时间" width="180px">
              <template slot-scope="scope">
                <span>{{ scope.row.custMaintenanceDate | stamp2TextDateFull }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="维护人" width="100px">
              <template slot-scope="scope">
                <span>{{ scope.row.custMaintenanceMan }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="维护人部门" width="100px">
              <template slot-scope="scope">
                <span>{{ scope.row.maintainerDeptName }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="客户级别" width="150px">
              <template slot-scope="scope">
                <span>{{ scope.row.custStageName }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="拜访类型" width="150px">
              <template slot-scope="scope">
                <span>{{ scope.row.visitTypeName }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="问题归类" width="150px">
              <template slot-scope="scope">
                <span>{{ scope.row.issuesClassification }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="维护内容" width="200px">
              <template slot-scope="scope">
                <span>{{ scope.row.custMaintenanceContent }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="联系人" width="100px">
              <template slot-scope="scope">
                <span>{{ scope.row.linkmanName }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="备注">
              <template slot-scope="scope">
                <span>{{ scope.row.remarks }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pagination-container">
          <el-pagination
            background
            @current-change="handlecoalUnionCurrentChange"
            :current-page="coalUnionlistQuery.pageNo"
            :page-size="20"
            layout="total, prev, pager, next, jumper"
            :total="coalUniontotal"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="segment statistics" v-show="detailData.baseCustInfo.custType == '2'">
      <div class="sjb-foot-button">
        <el-button v-if="coalUnionISPICK && !coalUnionISME" size="medium" type="primary" @click="getCustBack('2')"
          >捡入</el-button
        >
        <el-button @click="goBack" size="medium">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import common from "@/utils/common";
import { getRegion } from "@/api/getRegion";
import { fetchForm, custChange, getMaintain } from "@/api/customer";
import sjbtextarea from "@/components/sjbTextarea";
import { parseTime } from "@/utils";

export default {
  name: "complexTable",
  components: {
    sjbtextarea
  },
  data() {
    return {
      activeName: "1",
      upstream: "",
      downstream: "",
      filter: {
        //筛选条件
        ordercreatetimestart: common.time.timestart,
        ordercreatetimeend: common.time.timeend,
        orderfilterstate: 0,
        orderstate: "",
        sourceaddresscode: null,
        targetaddresscode: null,
        querykey: null
      },
      detailData: {
        baseCustInfo: {},
        noCar: {},
        coalUnion: {}
      },
      tradeStructure: {
        //贸易结构
        upstream: undefined,
        downstream: undefined
      },
      key: this.$route.query.key,
      noCartotal: null,
      noCaritemList: [],
      noCarlistQuery: {
        custId: this.$route.query.key,
        custType: "1",
        pageNo: 1,
        pageSize: 20
      },
      coalUniontotal: null,
      coalUnionitemList: [],
      coalUnionlistQuery: {
        custId: this.$route.query.key,
        custType: "2",
        pageNo: 1,
        pageSize: 20
      }
    };
  },
  created() {
    this.getDetail();
    // this.getListData()
    this.getnoCarListData();
    this.getcoalUnionListData();
  },
  computed: {
    noCarISPICK: function() {
      let result = this.detailData.noCar.custListPlace == 1 || this.detailData.noCar.custListPlace == 2 ? true : false;
      if (this.$route.query.type) {
        result = false;
      }
      return result;
    },
    coalUnionISPICK: function() {
      let result =
        this.detailData.coalUnion.custListPlace == 1 || this.detailData.coalUnion.custListPlace == 2 ? true : false;
      if (this.$route.query.type) {
        result = false;
      }
      return result;
    },
    noCarISME: function() {
      let result =
        this.detailData.noCar.letGoMan == JSON.parse(localStorage.getItem("web_oa_userInfor")).id ? true : false;
      return result;
    },
    coalUnionISME: function() {
      let result =
        this.detailData.coalUnion.letGoMan == JSON.parse(localStorage.getItem("web_oa_userInfor")).id ? true : false;
      return result;
    },
    noCarTabDisabled() {
      var flag = false;
      if (this.detailData.noCar.noCarId == "") {
        flag = true;
      }
      return flag;
    },
    coalUnionTabDisabled() {
      var flag = false;
      if (this.detailData.coalUnion.coalUnionId == "") {
        flag = true;
      }
      return flag;
    }
  },
  methods: {
    getDetail() {
      fetchForm(this.key).then(response => {
        this.detailData = response.data;
        if (this.$route.query.custType == "0") {
          if (this.detailData.noCar.custTrades == "" && this.detailData.coalUnion.custTrades != "") {
            this.detailData.baseCustInfo.custType = "2";
          } else {
            this.detailData.baseCustInfo.custType = "1";
          }
        } else {
          this.detailData.baseCustInfo.custType = this.$route.query.custType;
        }
      });
    },
    handlenoCarCurrentChange(val) {
      this.noCarlistQuery.pageNo = val;
      this.getnoCarListData();
      this.listLoading = false;
    },
    handlecoalUnionCurrentChange(val) {
      this.coalUnionlistQuery.pageNo = val;
      this.getcoalUnionListData();
      this.coalUnionlistLoading = false;
    },
    getnoCarListData() {
      getMaintain(this.noCarlistQuery).then(res => {
        if (res.code == 200) {
          res.data.list.forEach((item, index) => {
            item.index = index + 1;
          });
          this.noCaritemList = res.data.list;
          this.noCartotal = res.data.total;
        }
      });
    },
    getcoalUnionListData() {
      getMaintain(this.coalUnionlistQuery).then(res => {
        if (res.code == 200) {
          res.data.list.forEach((item, index) => {
            item.index = index + 1;
          });
          this.coalUnionitemList = res.data.list;
          this.coalUniontotal = res.data.total;
        }
      });
    },
    getPayMent(item) {
      let dicList = JSON.parse(localStorage.getItem("web_oa_dicList"));
      let temp = [];
      let getName = "";
      for (var i = 0; i < dicList.length; i++) {
        if (dicList[i].type == "pay_method") {
          temp.push(dicList[i]);
        }
      }
      temp.forEach((itm, index) => {
        item.forEach((it, idx) => {
          if (itm.value == it) {
            if (item.length == 2) {
              getName += itm.name + " ";
            } else {
              getName = itm.name;
            }
          }
        });
      });
      return getName;
    },
    getDictionary(type, item) {
      let dicList = JSON.parse(localStorage.getItem("web_oa_dicList"));
      let temp = [];
      let getName = "";
      for (var i = 0; i < dicList.length; i++) {
        if (dicList[i].type == type) {
          temp.push(dicList[i]);
        }
      }
      temp.forEach((itm, index) => {
        if (itm.value == item) {
          getName = itm.name;
        }
      });
      return getName;
    },
    getCustBack(type) {
      custChange({
        id: this.$route.query.key,
        isChange: 2,
        custType: type
      }).then(res => {
        if (res.code == 200) {
          this.$message({
            message: res.message,
            type: "success"
          });
          this.$router.push({
            path: "/inforManage/customerList"
          });
        }
      });
    },
    goBack() {
      // this.$router.go(-1);
      if (this.$route.query.type) {
        this.$router.push({
          path: "/inforManage/custPool"
        });
      } else {
        this.$router.go(-1);
      }
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.el-table__body-wrapper {
  overflow: auto;
  position: relative;
}
.segment {
  background: #ffffff;
  border: 1px solid #e6ebef;
  margin-bottom: 15px;
}

.segment-green {
  background: #fbfff8;
  border: 1px solid #b3d99c;
  margin-bottom: 15px;
}

.segment:last-child,
.segment-green:last-child {
  margin-bottom: 0;
}

/* 普通el-row排版 */

.segment .el-row {
  line-height: 36px;
  padding: 0 28px;
}

.segment .el-row.segment-title {
  height: 40px;
  line-height: 40px;
}

.segment .segment-label {
  display: inline;
  color: #99a9bf;
}

.segment .labelright {
  text-align: right;
  padding-right: 5px;
}

.segment .segment-content {
  display: inline-block;
  color: #333333;
}

.segment-line {
  width: 97%;
  height: 1px;
  margin: 0 auto;
  background: #e2e7ed;
}

.segment-fullline {
  width: 100%;
  height: 1px;
  margin: 0 auto;
  background: #e2e7ed;
}

.segment-header {
  height: 40px;
  line-height: 40px;
  text-indent: 15px;
  font-weight: 700;
  border-bottom: 1px solid #f2f7fa;
}

.segment-header-sub {
  font-size: 14px;
  color: #99a9bf;
  font-weight: normal;
  padding-left: 15px;
}

.segment-area {
  padding: 0 15px;
}

.segment-foot {
  background: #fcfdff;
  height: 50px;
  line-height: 50px;
  padding-left: 15px;
  border-top: 1px solid #f2f7fa;
}

.cominfo-item {
  margin: 10px 0;
}

.clearfix:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}

.left-title {
  float: left;
  width: 150px;
  padding-right: 10px;
}

.font-gray {
  color: #99a9bf !important;
}

.right-con {
  float: left;
  // width: 850px;
}

.el-input--small .el-input__inner {
  height: 40px !important;
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
.tableTitle {
  font-size: 15px;
}
.foot {
  float: right;
  margin-right: 25px;
  margin-bottom: 25px;
  margin-top: 15px;
}
.segment-area {
  .textStyle-title {
    // line-height: 20px;
    padding: 12px 0px;
    font-size: 14px;
  }
}
.table_text {
  font-size: 14px;
  color: #333333;
  line-height: 35px;
  text-align: center;
}
</style>
