<template>
  <div class="sjb-form-wrapper">
    <div class="segment statistics">
        <div class="segment-header">
            基本信息
        </div>
        <div class="segment-area">
            <el-row>
                <el-col :span="12" class="segment-brline">
                    <RedStar label="客户名称：" :required="true">
                        <span class="right-con">
                            <el-input placeholder="请输入" style="width:250px;" v-model.trim="filter.custName" :maxlength="100"></el-input>
                        </span>
                    </RedStar>
                    <RedStar label="客户分类：">
                        <span class="right-con">
                            <el-select clearable class="filter-item" v-model="filter.custClassify" placeholder="请选择" style="width:250px;">
                                <el-option v-for="item in custClassify" :label="item.name" :value="item.value" :key="item.value">
                                </el-option>
                            </el-select>
                        </span>
                    </RedStar>
                    <RedStar label="规模（万吨/月）">
                        <span class="right-con">
                            <el-input placeholder="请输入" style="width:250px;" v-model.trim="filter.custCompanySize" type="number"></el-input>
                        </span>
                    </RedStar>
                    <RedStar label="联系人：">
                        <span class="right-con">
                            <el-input placeholder="请输入" style="width:250px;" :maxlength="50" v-model.trim="filter.custLinkmanName"></el-input>
                        </span>
                    </RedStar>
                    <RedStar label="联系方式：">
                        <span class="right-con">
                            <el-input placeholder="请输入" style="width:250px;" v-model.trim="filter.linkmanPhone"></el-input>
                        </span>
                    </RedStar>
                </el-col>
                <el-col :span="12" class="segment-brline">
                    <RedStar label="客户简称：">
                        <span class="right-con">
                            <el-input placeholder="请输入" style="width:250px;" :maxlength="50" v-model.trim="filter.custAbbreviation"></el-input>
                        </span>
                    </RedStar>
                    <RedStar label="所属区域：">
                        <span class="right-con long_area" >
                            <region class="area" style="width:250px" v-on:back-region="selectCode" :pointList="filter.areaId"></region>
                        </span>
                    </RedStar>
                    <RedStar label="运输方式：">
                        <span class="right-con">
                            <el-select clearable multiple class="filter-item" v-model="filter.tranMethod" placeholder="请选择" style="width:250px;">
                                <el-option v-for="item in tranList" :label="item.name" :value="item.value" :key="item.value">
                                </el-option>
                            </el-select>
                        </span>
                    </RedStar>
                    <RedStar label="联系人职位：">
                        <span class="right-con">
                            <el-input placeholder="请输入" style="width:250px;" v-model.trim="filter.linkmanPost" :maxlength="50"></el-input>
                        </span>
                    </RedStar>
                    <RedStar label="市场负责人：">
                        <span class="right-con">
                            {{userInfo.name}}
                        </span>
                    </RedStar>
                </el-col>
            </el-row>
        </div>
    </div>
    <div class="segment statistics">
        <div class="segment-header">
            客户现状
        </div>
        <div class="segment-area">
            <sjbtextarea
                :rows="3"
                textStyle="margin-top:20px;margin-bottom:20px"
                placeholder="请输入内容"
                :max="200"
                v-model.trim="filter.custActuality">
            </sjbtextarea>
        </div>
    </div>
    <div class="segment statistics">
        <div class="segment-header">
            业务概况
        </div>
        <div class="segment-area">
            <sjbtextarea
                :rows="3"
                textStyle="margin-top:20px;margin-bottom:20px"
                placeholder="请输入内容"
                :max="200"
                v-model.trim="filter.custBusinessProfile">
            </sjbtextarea>
        </div>
    </div>
    <div class="segment statistics">
        <div class="segment-header">
            <span class="left-red">*</span>
            线索说明
        </div>
        <div class="segment-area">
            <sjbtextarea
                :rows="3"
                textStyle="margin-top:20px;margin-bottom:20px"
                placeholder="请输入内容"
                :max="200"
                v-model.trim="filter.custClueExplain">
            </sjbtextarea>
        </div>
    </div>
    <div class="segment statistics">
        <div class="sjb-foot-button">
            <el-button  type="primary" size="small" @click="submit">提交</el-button>
            <el-button  size="small" @click="backStep">返回</el-button>
        </div>
    </div>
  </div>
</template>

<script>
import common from '@/utils/common'
import { saveClue , getDetail } from '@/api/clue'
import { parseTime } from '@/utils'
import { clueFormVali } from './clue.util'
import RedStar from '@/components/RedStar/RedStar.vue'
import sjbtextarea from '@/components/sjbTextarea'

export default {
    components:{
        RedStar,
        sjbtextarea
    },
    data() {
        return {
            custClassify: [], //客户分类
            tranList:[],
            userInfo:{},
            filter: {//筛选条件
                areaId :[],// 所属区域id ,
                custAbbreviation :undefined,// 客户简称 ,
                custActuality : undefined,// 客户现状 ,
                custBusinessProfile:undefined,// 业务概况 ,
                custClassify :undefined,// 客户分类：1000+万吨/月 500~1000万吨/月 0~500万吨/月 ,
                custClueExplain :undefined,// 线索说明 ,
                custCompanySize:undefined,// 规模 ,
                custLinkmanName:undefined,// 联系人 ,
                custName :undefined,// 客户名称 ,
                linkmanPhone:undefined,// 联系方式 ,
                linkmanPost:undefined,// 职位 ,
                tranMethod :[],// 运输方式:汽运，铁运，船运
                oldCustName:undefined
            }
        }
    },
    created(){
        this.userInfo = JSON.parse(localStorage.getItem("web_oa_userInfor"));
        if(this.$route.query.key){
            getDetail({
                id:this.$route.query.key
            }).then(res => {
                
                res.data.tranMethod = res.data.tranMethod || []
                this.filter.tranMethod = res.data.tranMethod
                
                res.data.custCompanySize = Number(res.data.custCompanySize) || undefined;
                this.filter.custCompanySize = res.data.custCompanySize;

                this.filter.areaId = res.data.areaId || []
                this.filter.oldCustName = res.data.custName;//老的客户名称
                this.filter.id = this.$route.query.key
                this.filter.custAbbreviation = res.data.custAbbreviation || undefined;// 客户简称 ,
                this.filter.custActuality = res.data.custActuality || undefined;// 客户现状 ,
                this.filter.custBusinessProfile = res.data.custBusinessProfile || undefined;// 业务概况 ,
                this.filter.custClassify = res.data.custClassify || undefined;// 客户分类：1000+万吨/月 500~1000万吨/月 0~500万吨/月 ,
                this.filter.custClueExplain = res.data.custClueExplain ||undefined;// 线索说明 ,
                this.filter.custLinkmanName=res.data.custLinkmanName || undefined;// 联系人 ,
                this.filter.custName = res.data.custName || undefined;// 客户名称 ,
                this.filter.linkmanPhone = res.data.linkmanPhone || undefined;// 联系方式 ,
                this.filter.linkmanPost = res.data.linkmanPost || undefined// 职位 ,
            })
        }
    },
    mounted(){
        let dicList = JSON.parse(localStorage.getItem("web_oa_dicList"));
        function selectDic(arr,type){
            let temp = [];
            for(var i = 0;i<arr.length;i++){
                if(arr[i].type == type){
                    temp.push(arr[i])
                };
            }
            return temp
        }
        this.custClassify = selectDic(dicList,"cust_classify")
        
        this.tranList = selectDic(dicList,"tran_method")
    },
    methods:{
        backStep(){
            this.$router.go(-1)
        },
        selectCode(val){
            this.filter.areaId = val;
        },
        submit(){
            if(this.filter.custCompanySize == '') this.filter.custCompanySize = undefined
            if(clueFormVali(this)){
                saveClue(this.filter).then(res=>{
                    if (res.code == 200) {
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
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.item-value{
  display:inline-block;
  border: 1px solid #dcdfe6;
  border-radius:4px;
  background: white;
  padding-left: 7px;
  line-height: 30px;
  width: 250px
}
.el-input--small .el-input__inner {
    height: 40px!important;
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

.upload-container{
    margin: 50px
}
.editor-slide-upload{
    margin-bottom: 15px
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