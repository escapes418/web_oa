<template>
  <div class="sjb-form-wrapper">
    <div class="segment statistics">
      <div class="segment-header">
        基本信息
      </div>
      <div class="segment-area">
        <el-row>
          <el-col :span="12" class="segment-brline">
            <RedStar label="所属公司：">
              <span class="right-con">
                <el-input
                  placeholder="请输入"
                  style="width:250px;"
                  v-model.trim="postData.company"
                ></el-input>
              </span>
            </RedStar>
            <RedStar label="资产编号：" :required="true">
              <span class="right-con long_area">
                <el-input
                  placeholder="请输入"
                  style="width:250px;"
                  v-model.trim="postData.code"
                ></el-input>
              </span>
            </RedStar>
            <RedStar label="资产类别：" :required="true">
              <span class="right-con">
                <el-cascader
                  style="width: 250px"
                  class="filter-item"
                  :options="assetType"
                  :props="PropsTree"
                  v-model="postData.assetTypeIdList"
                  change-on-select
                  placeholder="请选择"
                  @change="changeAssetType"
                >
                </el-cascader>
              </span>
            </RedStar>
            <RedStar label="计量单位：">
              <span class="right-con">
                {{ postData.unit }}
              </span>
            </RedStar>
            <RedStar label="放置地：" :required="true">
              <span class="right-con">
                <el-select
                  clearable
                  class="filter-item"
                  v-model="postData.assetPlaceId"
                  placeholder="请选择"
                  style="width:250px;"
                >
                  <el-option
                    v-for="item in assetPlaceList"
                    :label="item.name"
                    :value="item.id"
                    :key="item.id"
                  >
                  </el-option>
                </el-select>
              </span>
            </RedStar>
            
            <RedStar label="供应商：">
              <span class="right-con">
                <el-select
                  clearable
                  class="filter-item"
                  v-model="postData.assetSupplierId"
                  placeholder="请选择"
                  style="width:250px;"
                  @change="assetSupplierChange"
                >
                  <el-option
                    v-for="item in assetSupplierList"
                    :label="item.name"
                    :value="item.id"
                    :key="item.id"
                  >
                  </el-option>
                </el-select>
              </span>
            </RedStar>
            <RedStar label="供应商联系方式：">
              <span class="right-con">
                {{ contactWay }}
              </span>
            </RedStar>
            <RedStar label="租用/购入时间：" :required="true">
              <span class="right-con">
                <el-date-picker
                  v-model="time.buyTime"
                  class="filter-item"
                  style="width:250px"
                  placeholder="请选择日期"
                >
                </el-date-picker>
              </span>
            </RedStar>
            <RedStar label="保修起始时间：">
              <span class="right-con">
                <el-date-picker
                  v-model="time.guaranteeBeginTime"
                  class="filter-item"
                  style="width:250px"
                  placeholder="请选择日期"
                >
                </el-date-picker>
              </span>
            </RedStar>
            <RedStar label="备注：">
              <span class="right-con">
                <el-input
                  placeholder="请输入"
                  type="textarea"
                  style="width:250px;"
                  :rows="3"
                  :maxlength="250"
                  v-model.trim="postData.remarks"
                ></el-input>
              </span>
            </RedStar>
          </el-col>
          <el-col :span="12" class="segment-brline">
            <RedStar label="资产名称：" :required="true">
              <span class="right-con">
                <el-input
                  placeholder="请输入"
                  style="width:250px;"
                  v-model.trim="postData.name"
                ></el-input>
              </span>
            </RedStar>
            <RedStar label="入库时间：" :required="true">
              <span class="right-con">
                <el-date-picker
                  v-model="time.entryTime"
                  class="filter-item"
                  style="width:250px"
                  placeholder="请选择日期"
                  :picker-options="pickerOptions"
                >
                </el-date-picker>
              </span>
            </RedStar>
            <RedStar label="品牌：">
              <span class="right-con">
                <el-input
                  placeholder="请输入"
                  style="width:250px;"
                  v-model.trim="postData.brand"
                ></el-input>
              </span>
            </RedStar>
            <RedStar label="规格型号：">
              <span class="right-con">
                <el-input
                  placeholder="请输入"
                  style="width:250px;"
                  v-model.trim="postData.specificationType"
                ></el-input>
              </span>
            </RedStar>
            <RedStar label="序列号：" :required="true">
              <span class="right-con">
                <el-input
                  placeholder="请输入"
                  style="width:250px;"
                  v-model.trim="postData.serialNo"
                ></el-input>
              </span>
            </RedStar>
            <RedStar label="来源：" :required="true">
              <span class="right-con">
                <el-select
                  clearable
                  class="filter-item"
                  v-model="postData.source"
                  placeholder="请选择"
                  style="width:250px;"
                >
                  <el-option
                    v-for="item in dic.assetSource"
                    :label="item.name"
                    :value="item.value"
                    :key="item.value"
                  >
                  </el-option>
                </el-select>
              </span>
            </RedStar>
            <RedStar label="金额：" :required="true">
              <span class="right-con">
                <el-input
                  placeholder="请输入"
                  style="width:250px;"
                  v-model.trim="postData.money"
                  type="number"
                ></el-input>
              </span>
            </RedStar>
            <RedStar label="付费截止时间 ：" :required="true" v-if="postData.source == '3'">
              <span class="right-con">
                <el-date-picker
                  v-model="time.dueTime"
                  class="filter-item"
                  style="width:250px"
                  placeholder="请选择日期"
                >
                </el-date-picker>
              </span>
            </RedStar>
            <RedStar label="过保时间：">
              <span class="right-con">
                <el-date-picker
                  v-model="time.guaranteeEndTime"
                  class="filter-item"
                  style="width:250px"
                  placeholder="请选择日期"
                >
                </el-date-picker>
              </span>
            </RedStar>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="segment statistics">
      <div class="sjb-foot-button">
        <el-button type="primary" size="small" @click="submit">提交</el-button>
        <el-button size="small" @click="backStep">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import common from "@/utils/common";
import { saveOrUpdateAsset,queryAssetTypeTree,queryAssetPlaceList,queryAssetSupplierList,fetchDetail} from "@/api/fixedAssets";
import { parseTime } from "@/utils/index";
import Utils from "./util";
import RedStar from "@/components/RedStar/RedStar.vue";
import { POST_data,CUST_list,MEMBER_list,POST_item,I_time} from "./interface";

import { Vue, Component } from "vue-property-decorator";
import { resolve } from "path";

@Component({
    components: {
        RedStar: RedStar
    }
})
export default class maForm extends Vue {
     pickerOptions= {
        disabledDate(time) {
            return time.getTime() > Date.now();
        }
    }
    assetType = [];
    assetPlaceList = [];
    assetSupplierList = [];
    PropsTree = {
        children: 'children',
        label: 'name',
        value:"id",
    };
    dic = {
        assetSource : []
    }
    AssetType = [];
    time:I_time = {
        buyTime: "",//购入/租入时间
        dueTime: "",//租赁到期时间 ,
        entryTime: "",//入库时间
        guaranteeBeginTime: "",//保修起始时间
        guaranteeEndTime: "",//保修截止时间
    };
    contactWay ="";
    postData = {
        assetPlaceId: "",//放置地
        assetSupplierId: "",//供应商
        assetTypeIdList: [],//类别
        brand: "",//品牌 
        buyTime: 0,//购入/租入时间
        code: "",//编号
        company: "",//所属公司
        dueTime: 0,//租赁到期时间 ,
        entryTime: 0,//入库时间
        guaranteeBeginTime: 0,//保修起始时间
        guaranteeEndTime: 0,//保修截止时间
        id: "",
        money: 0,//金额 
        name: "",//名称
        remarks: "",
        serialNo: "",//序列号
        source: "",//来源
        specificationType: "",//规格型号
        unit: ""//计量单位
    };

    async created() {
        
        let typeRes = await this.queryAssetTypeTree();
        let placeRes = await this.getAssetPlaceList();
        let supplyRes = await this.getAssetSupplierList()
        if(this.$route.params.id == "0"){

        }else{
          let detailRes = await this.getDetail()
          this.postData = detailRes;
          this.time.entryTime = common.timeParseObj(detailRes.entryTime)
          this.time.buyTime = common.timeParseObj(detailRes.buyTime)
          if(detailRes.dueTime){
            this.time.dueTime = common.timeParseObj(detailRes.dueTime)
          }
          if(detailRes.guaranteeBeginTime){
            this.time.guaranteeBeginTime = common.timeParseObj(detailRes.guaranteeBeginTime)
          }
          if(detailRes.guaranteeEndTime){
            this.time.guaranteeEndTime = common.timeParseObj(detailRes.guaranteeEndTime)
          }
          Promise.all([typeRes,placeRes,supplyRes]).then(()=>{
              this.changeAssetType()
              this.assetSupplierChange()
          })
        }
        
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
        this.dic.assetSource = selectDic(dicList,"asset_source")
    }

    // init() {
    //     if(this.$route.params.id == "0"){

    //     } else {
    //         this.postData.id = this.$route.params.id;
    //         this.getDetail().then(rtn=>{
    //             this.postData = rtn;
    //             this.time.entryTime = common.timeParseObj(rtn.entryTime)
    //             this.time.buyTime = common.timeParseObj(rtn.buyTime)
    //             if(rtn.dueTime){
    //               this.time.dueTime = common.timeParseObj(rtn.dueTime)
    //             }
    //             if(rtn.guaranteeBeginTime){
    //               this.time.guaranteeBeginTime = common.timeParseObj(rtn.guaranteeBeginTime)
    //             }
    //             if(rtn.guaranteeEndTime){
    //               this.time.guaranteeEndTime = common.timeParseObj(rtn.guaranteeEndTime)
    //             }
    //             // this.fetchContactWay()
    //         })
    //     }
    // };
    getAssetPlaceList(){
        return new Promise((resolve,reject)=>{
            queryAssetPlaceList().then((res:any) => {
                resolve(res.data)
                this.assetPlaceList = res.data;
            })
        })
        
    }
    getAssetSupplierList(){
        return new Promise((resolve,reject)=>{
          queryAssetSupplierList().then((res:any) => {
            resolve(res.data)
            this.assetSupplierList = res.data;
          })
          
        })
    }
    getDetail():any {
        return new Promise((resolve, reject) => {
            fetchDetail({
                id:this.$route.params.id
            }).then((res:any) => {
                resolve(res.data);
            })
        })
    };
    assetSupplierChange(){
        this.assetSupplierList.forEach((item,index)=>{
            if(item.id == this.postData.assetSupplierId){
                this.contactWay = item.contactWay
            }
        })
    }
    backStep(): void {
        this.$router.go(-1);
    };
    submit(): void {
        if (Utils.assetsFrom(this)) {
            this.postData.buyTime = common.timeParse(this.time.buyTime)
            this.postData.dueTime = common.timeParse(this.time.dueTime)
            this.postData.entryTime = common.timeParse(this.time.entryTime)
            this.postData.guaranteeBeginTime = common.timeParse(this.time.guaranteeBeginTime)
            this.postData.guaranteeEndTime = common.timeParse(this.time.guaranteeEndTime)
            saveOrUpdateAsset({
                ...this.postData
            }).then((res: Ajax.AjaxResponse) => {
                if (res.status == 0) {
                    this.$message({
                        message: res.message,
                        type: "success"
                    });
                    this.$router.go(-1);

                } else{
                  this.$message({
                        message: res.message,
                        type: 'error'
                    });
                }
            });
        }
    }
    queryAssetTypeTree(){
        queryAssetTypeTree().then((res:any) => {
            res.data.forEach((item,index)=>{
                this.AssetType.push(item)
            })
            var newArr = [];
            common.transToTree(res.data, newArr,"ROOT");
            this.assetType = newArr
        })
    }
    changeAssetType(){
        var len = this.postData.assetTypeIdList.length
        this.AssetType.forEach((item,index)=>{
            if(item.id == this.postData.assetTypeIdList[len-1]){
                this.postData.unit = item.unit
            }
        })
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
