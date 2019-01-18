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
                        <span class="left-title font-gray">报销人员：</span><span class="right-con">{{  "123" }}</span>
                    </div>
                    <div class="clearfix  cominfo-item">
                        <span class="left-title font-gray">所属部门：</span><span class="right-con">{{  "123" }}</span>
                    </div>
                    <div class="clearfix  cominfo-item">
                        <span class="left-title font-gray">报销类型：</span>
                        <span class="right-con">
                          {{'XXX'}}
                        </span>
                    </div>
                    <div class="clearfix  cominfo-item">
                        <span class="left-title font-gray">项目名称：</span>
                        <span class="right-con">
                          {{'xxxxxx'}}
                        </span>
                    </div>
                    <div class="clearfix  cominfo-item">
                        <span class="left-title font-gray">票据数量：</span>
                        <span class="right-con">
                          {{'xxxxxxxxx'}}
                        </span>
                    </div>
                    <!-- <div class="clearfix  cominfo-item">
                        <span class="left-title font-gray">票据数量：</span>
                        <span class="right-con">
                          <el-input auto-complete="off" v-model="num" @input="changeNameList"></el-input>
                          <div v-for="(item,key) in namelist ">
                                {{item.name +"22"}}
                                <el-select clearable class="filter-item" v-model="item.name" placeholder="请选择" style="width:120px;" >
                                    <el-option v-for="item in stateArr" :label="item.label" :value="item.value" :key="item.value">
                                    </el-option>
                                </el-select>
                          </div>
                        </span>
                    </div> -->
                </el-col>
                <el-col :span="12">
                    <div class="clearfix cominfo-item">
                        <span class="left-title font-gray">报销日期：</span><span class="right-con">{{  "123" }}</span>
                    </div>
                    <div class="clearfix  cominfo-item">
                        <span class="left-title font-gray">岗位名称：</span><span class="right-con">{{  "123" }}</span>
                    </div>
                    <div class="clearfix  cominfo-item">
                        <span class="left-title font-gray">发票所属公司：</span><span class="right-con">{{ "123" }}</span>
                    </div>
                    <div class="clearfix  cominfo-item">
                        <span class="left-title font-gray">项目负责人：</span>
                        <span class="right-con">
                          {{"xxxx"}}
                        </span>
                    </div>
                    <div class="clearfix  cominfo-item">
                        <span class="left-title font-gray">费用合计：</span>
                        <span class="right-con">
                          {{'123'}}
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
            <el-table
                :data="tableData.queryTransOrderList"
                style="width: 100%" border>
                <el-table-column
                    label="发生日期"
                    prop="ordernumber" width="140">
                </el-table-column>
                <el-table-column
                    label="起点"
                    prop="createdate" width="80">
                </el-table-column>
                <el-table-column
                    label="结束日期"
                    prop="companyname" width="120">
                    <template slot-scope="scope">
                        <span class="special-ignore" :title="scope.row.companyname">{{ scope.row.companyname | stamp2TextDate }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="终点"
                    prop="ordetstate" width="80">
                </el-table-column>
                <el-table-column
                    label="一级科目"
                    prop="sourceaddressname" width="80">
                </el-table-column>
                <el-table-column
                    label="二级科目"
                    prop="targetaddressname" width="80">
                </el-table-column>
                <el-table-column
                    label="人数"
                    prop="platecode" width="85">
                </el-table-column>
                <el-table-column
                    label="天数"
                    prop="totalamount">
                    <template slot-scope="scope">
                        <span class="font-orange">{{ scope.row.totalamount/10000 | thousands(2) }}元</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="票据张数"
                    prop="schedulefee">
                    <template slot-scope="scope">
                        <span class="font-orange">{{ scope.row.schedulefee/10000 | thousands(2) }}元</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="报销金额"
                    prop="expectprofit">
                    <template slot-scope="scope">
                        <span class="font-orange">{{ scope.row.expectprofit/10000 | thousands(2) }}元</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="备注"
                    prop="expectprofit">
                </el-table-column>
            </el-table>
            <!-- <div class="remark">
              <span class="remarkTitle">
                备注
              </span>
              <span>
                <el-input
                  type="textarea"
                  :rows="3"
                  style="width:420px"
                  placeholder="请输入内容"
                  v-model="textarea">
                </el-input>
              </span>
            </div> -->
          </div>
        </div>
    </div>
    <div class="segment statistics">
      <div class="segment-header">
            流转信息
        </div>
        <div class="segment-area">
          <div class="el-table__body-wrapper">
              <!-- <el-table
                :data="tableData.queryTransOrderList"
                style="width: 100%" border>
                <el-table-column
                    label="执行环节"
                    prop="ordernumber" width="140">
                </el-table-column>
                <el-table-column
                    label="执行人"
                    prop="createdate" width="80">
                </el-table-column>
                <el-table-column
                    label="开始时间"
                    prop="companyname">
                    <template slot-scope="scope">
                        <span class="special-ignore" :title="scope.row.companyname">{{ scope.row.companyname | stamp2TextDate }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="结束时间"
                    prop="ordetstate" >
                    <template slot-scope="scope">
                        <span class="special-ignore" :title="scope.row.companyname">{{ scope.row.companyname | stamp2TextDate }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="提交意见"
                    prop="sourceaddressname">
                </el-table-column>
                <el-table-column
                    label="任务历时"
                    prop="targetaddressname">
                </el-table-column>
              </el-table> -->
              <div class=" pt-20 pb-20">
                <div class="log-w" v-for="(item,index) in dataArr" :key="index" :class="{'sub-row':index!==0}">
                    <div class="log-dot">
                        <div class="dot-core"></div>
                    </div>
                    <div class="log-text">
                        <div class="log-title">
                            <span class="color-black bold">{{item.createtime}}</span>
                        </div>
                        <div class="font-gray">{{item.firstdata}}</div>
                        <div class="color-orange">{{item.memo}}</div>
                        <!-- 签到地址 -->
                        <div v-if="item.recordtype==23||item.recordtype==24">
                            <div class="font-gray">
                                签到地址：{{item.msg.address}} &nbsp;&nbsp;&nbsp;&nbsp;
                                <a href="javascript:;" class="linkButton" @click="showLoadPos(item.msg.longitude,item.msg.latitude)">查看签到位置</a>
                            </div>
                            <img class="imgPre" v-if="item.msg.url.length!=0" :src="item.msg.url[0]" @click="showSignImg(item.msg.url[0])" />
                        </div>
                        <!-- 协商扣首款 暂时屏蔽不做-->
                        <!-- <div v-if="item.recordtype==28">
                            <div class="font-gray">
                                扣款原因：{{item.msg.address}}
                            </div>
                            <div class="font-gray">
                                其他说明：{{item.msg.address}}
                            </div>
                            <img class="imgPre" v-if="item.msg.url.length!=0" :src="item.msg.url[0]" @click="showSignImg(item.msg.url[0])" />
                        </div> -->
                    </div>
                </div>
            </div>
            <!-- <div class="remark">
              <span class="remarkTitle">
                您的意见
              </span>
              <span>
                <el-input
                  type="textarea"
                  :rows="3"
                  style="width:420px"
                  placeholder="请输入内容"
                  v-model="textarea">
                </el-input>
              </span>
            </div> -->
          </div>
        </div>
    </div>
    <div class="segment statistics">
        <div class="sjb-foot-button">
            <el-button size="medium" type="primary">同意</el-button>
            <el-button size="medium" type="info">驳回</el-button>
            <el-button size="medium">返回</el-button>
        </div>
    </div>
  </div>
</template>

<script>
import common from '@/utils/common'
import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
import { parseTime } from '@/utils'

export default {
  name: 'complexTable',
  data() {
    return {
      checkAll:false,
      namelist:[],
      dataArr:[],
      tableData:{},
      num:0,
      i:-1,
      tempName:'',
      textarea:'',
      temp:[],
      tempKey:-1,
      itemList:[],
      fileList2:[],
      value1:'',
      certifystate:2,
      timeRange: [common.time.timestart, common.time.timeend],
      filter: {//筛选条件
          ordercreatetimestart: common.time.timestart,
          ordercreatetimeend: common.time.timeend,
          orderfilterstate:0,
          orderstate:'',
          sourceaddresscode:null,
          targetaddresscode:null,
          querykey: null,
      },
      stateArr:[
          { label: '请选择', value: 0 }, 
          { label: '常规报销', value: 1 }, 
          { label: '接待报销', value: 2 }
      ]
    }
  },
  methods:{
    selectAll(){
        for(var i=0;i<this.itemList.length;i++){
            this.itemList[i].show = true;
        }
    },
    add(){
        this.i++
        this.itemList.push({id:this.i,show:false});
    },
    del(){
        // this.itemList.map((item,i) =>{
        //     if(item.show){
        //         if(i<0) i=0
        //         this.itemList.splice(i,1)
        //         i--
        //     }
        // })

        if(this.checkAll){
            this.itemList = [];
            this.checkAll = false;
            return;
        }
        // 排序缓存列表
        function compare(property) {
            (a,b) =>(a[property] - b[property])
            // return function(a,b){
            //     return a[property] - b[property]
            // }
        }
        let arr = this.temp.sort(compare('id'))
        if(arr.length>0){
            for(let k = 0;k<arr.length;k++){
                for(let j = 0; j <this.itemList.length;j++){
                    if(arr[k].id == this.itemList[j].id){
                        this.itemList.splice(j,1);
                    }
                }
            }
        }
    },
    changeInput(item){
        if(this.tempKey != item.id){
            this.tempKey = item.id
            this.temp.push(item)
        }
        console.log(this.temp)
    },
    selectStartCode(data) {
        if (data != null && data.regioncode) {
            this.filter.sourceaddresscode = data.regioncode;
        } else {
            this.filter.sourceaddresscode = '';
        }
    },
    handleRemove(file, fileList) {
        console.log(file, fileList);
    },
    handlePreview(file) {
        console.log(file);
    },
    changeNameList(val){
        this.namelist = [];
        if(this.tempName == val) return
        if(this.num){
            this.t && clearTimeout(this.t)
            this.t = setTimeout(()=>{
                this.tempName = this.num;
                for(var i = 0;i<this.num;i++){
                    this.namelist.push({id:i,name:''})
                }
            },300)
            
        }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.el-table__body-wrapper {
    overflow: auto;
    position: relative;
}
.segment {
    background: #FFFFFF;
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
    margin-bottom: 0
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
    border-bottom: 1px solid #F2F7FA;
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
    background: #FCFDFF;
    height: 50px;
    line-height: 50px;
    padding-left: 15px;
    border-top: 1px solid #F2F7FA;
}

.cominfo-item{
    margin: 10px 0;
}

 .clearfix:after{
     content:".";
     display:block;
     height:0;
     clear:both;
     visibility:hidden
 }

 .left-title{
    float: left;
    width: 150px;
    padding-right: 10px;
}

.font-gray {
    color: #99a9bf !important;
}

.right-con{
    float: left;
    // width: 850px;
}

.el-input--small .el-input__inner {
    height: 40px!important;
}

.remark{
    margin-top: 25px;
    margin-bottom: 8px;
    background-color: #fdfdfd;
    border: 1px solid#F2F7FA;
}
.remarkTitle{
  margin-right: 100px;
  float: left;
  margin-top: 28px;
  margin-left: 5px
}
.tableTitle{
    font-size: 15px;
}
.foot{
    float: right;
    margin-right: 25px;
    margin-bottom: 25px;
    margin-top: 15px;
}
</style>