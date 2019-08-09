<template>
  <div class="sjb-form-wrapper">
        <div class="segment statistics">
            <div class="segment-header">
                基本信息
            </div>
            <div class="segment-area">
                <el-row>
                    <el-col :span="12" class="segment-brline">
                        <RedStar label="当日电话拜访：">
                            <span class="right-con">
                                {{custPhotoCount}}
                            </span>
                        </RedStar>
                        <RedStar label="当日意向数量："
                            :required="true">
                            <span class="right-con long_area">
                                <el-input placeholder="请输入数量"
                                style="width:250px;"
                                v-model.number="postData.custIntentionCount"
                                type="number"></el-input>
                            </span>
                        </RedStar>
                        <RedStar label="明日拜访数量："
                            :required="true">
                            <span class="right-con">
                                <el-input placeholder="请输入数量"
                                style="width:250px;"
                                v-model.number="postData.afterVisitCount"
                                type="number"></el-input>
                            </span>
                        </RedStar>
                        <RedStar label="明日工作计划："
                            :required="true">
                            <span class="right-con">
                                <sjbtextarea
                                :rows="3"
                                textStyle="width:250px;"
                                :max="1000"
                                placeholder="请输入内容"
                                v-model.trim="postData.afterDailyPlan">
                                </sjbtextarea>
                            </span>
                        </RedStar>
                        
                    </el-col>
                    <el-col :span="12" class="segment-brline">
                        <RedStar label="当日上门拜访：">
                            <span class="right-con">
                                {{custVisitCount}}
                            </span>
                        </RedStar>
                        <RedStar label="当日签约数量："
                            :required="true">
                            <span class="right-con">
                                <el-input placeholder="请输入数量"
                                style="width:250px;"
                                v-model.number="postData.custSignCount"
                                type="number"></el-input>
                            </span>
                        </RedStar>
                        <RedStar label="备注：">
                            <span class="right-con">
                                <sjbtextarea placeholder="请输入"
                                textStyle="width:250px;"
                                :rows="3"
                                :max="1000"
                                v-model.trim="postData.remarks"></sjbtextarea>
                            </span>
                        </RedStar>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="segment statistics">
            <div class="segment-header">
                <!-- <span class="left-red">*</span> -->
                客户情况
            </div>
            <div class="segment-area">
                <div class="el-table__body-wrapper" style="padding: 15px 0;">
                    <el-table ref="multipleTable" border :data="itemList" tooltip-effect="dark" @selection-change="handleSelectionChange">
                        <el-table-column
                            type="selection"
                            width="55px">
                        </el-table-column>
                        <el-table-column align="center" label="客户名称" width="320px">
                            <template slot-scope="scope">
                                <el-select 
                                    filterable
                                    remote
                                    style="width: 300px" 
                                    class="filter-item" 
                                    v-model="scope.row.custId" 
                                    placeholder="请输入客户名称"
                                    :remote-method="searchCust"
                                    @change="selectCust">
                                    <el-option v-for="item in custList" :key="item.custId" :label="item.custName" :value="item.custId">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="拜访类型" width="180px">
                            <template slot-scope="scope">
                                <span>{{scope.row.visitTypeName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="维护时间" width="400px">
                            <template slot-scope="scope">
                                <span>{{scope.row.custMaintenanceDate | stamp2TextDateFull}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="维护内容">
                            <template slot-scope="scope">
                                <span>{{scope.row.custMaintenanceContent}}</span>
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
        <div class="segment statistics">
            <div class="segment-header">
                <span class="left-red">*</span>
                发送对象
            </div>
            <div class="segment-area">
                <div class="el-table__body-wrapper" style="padding: 15px 0;">
                    <ul class="base-ul">
                        <li class="base-li">
                            <RedStar label="发送给："
                                :required="true" style="line-height:30px">
                                <span class="right-con">
                                    <el-select 
                                        filterable
                                        multiple
                                        style="width: 300px" 
                                        class="filter-item" 
                                        v-model="postData.sendToList" 
                                        placeholder="请选择发送对象">
                                        <el-option v-for="item in memberList" :key="item.id" :label="item.name" :value="item.id">
                                        </el-option>
                                    </el-select>
                                </span>
                            </RedStar>
                        </li>
                        <li class="base-li">
                            <RedStar label="抄送对象："
                                style="line-height:30px">
                                <span class="right-con">
                                    <el-select 
                                        filterable
                                        multiple
                                        style="width: 300px" 
                                        class="filter-item" 
                                        v-model="postData.copyToList" 
                                        placeholder="请选择抄送对象">
                                        <el-option v-for="item in memberList" :key="item.id" :label="item.name" :value="item.id">
                                        </el-option>
                                    </el-select>
                                </span>
                            </RedStar>
                        </li>
                    </ul>

                    
                </div>
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
import { saveMaLog,getCustList,getMember,getSend} from "@/api/log";
import { parseTime } from "@/utils/index";
import { logFormVali } from "./log.util";
import RedStar from "@/components/RedStar/RedStar.vue";
import { POST_data,CUST_list,MEMBER_list,POST_item} from "./interface";
import sjbtextarea from '@/components/sjbTextarea/index.vue';
import { Vue, Component } from "vue-property-decorator";

@Component({
    components: {
        RedStar: RedStar,
        sjbtextarea
    }
})
export default class maForm extends Vue {
    custList:Array<CUST_list> = [];
    itemList:Array<POST_item>=[];
    memberList:Array<MEMBER_list>=[];
    multipleSelection:Array<POST_item>=[];
    pickerOptions: object = {
        disabledDate(time: any): boolean {
            return time.getTime() > Date.now();
        }
    };

    postData:POST_data = {
        afterDailyPlan:'',// 明日计划 ,
        afterVisitCount:0,//明日拜访客户数量 ,
        custIntentionCount:0,// 当日意向客户数量 ,
        custPhotoCount:0,// 当日电话拜访数量 ,
        custSignCount:0,// 当日签约数量 ,
        custVisitCount:0,// 当日上门拜访数量 ,
        dailyCustMaintenanceList:[],
        dailyTemplate:'',// 日志模板：0实施模板，1市场模板 ,
        remarks:'',// 备注 ,
        sendToList:[],
        copyToList:[]
    };

    //计算属性
    get custPhotoCount():number{
        let count = 0;
        this.itemList.forEach(item=>{
            if(item.visitType==='2'){
                count += 1;
            }
        })
        return count
    }
    get custVisitCount():number{
        let count = 0;
        this.itemList.forEach(item=>{
            if(item.visitType==='1'){
                count += 1;
            }
        })
        return count
    }

    created() {

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

        getMember({}).then((res:Ajax.AjaxResponse)=> {
            this.memberList = res.data.filter((item)=>{
                return item.userStatus == '1'
            })
            // if(localStorage.getItem("web_ma_sendToList")){
            //     this.postData.sendToList = JSON.parse(localStorage.getItem("web_ma_sendToList"));
            // }
            // if(localStorage.getItem("web_ma_copyToList")){
            //     this.postData.copyToList = JSON.parse(localStorage.getItem("web_ma_copyToList"));
            // }
        })
        getSend({
            dailyTemplate:"1"
        }).then((res:Ajax.AjaxResponse)=>{
            res.data.sendTo&&res.data.sendTo.forEach(item=>{
                this.postData.sendToList.push(item.sendToId)
            })

            res.data.copyTo&&res.data.copyTo.forEach(item=>{
                this.postData.copyToList.push(item.copyToId)
            })
        })
    }


    //method
    add() {
        this.custList = []
        this.itemList.push({ index: new Date().getTime(),custId:'',custName:'',custMaintenanceContent:'',visitType:'',visitTypeName:'',custMaintenanceDate:0});
    }
    del(){
        var _this = this
        var newindex = [];
        var newBox = [];
        var flag = true
        _this.multipleSelection.forEach((value,idx)=>{
            if(!value.index)  {
                flag = false
            }
            newindex.push(value.index)
        })
        if(flag){
            var arrBox = JSON.parse(JSON.stringify(this.itemList||[]))
            arrBox.forEach((val,num)=>{
                if(newindex.indexOf(val.index) == -1){
                    newBox.push(arrBox[num])
                }
            })
            this.itemList = newBox
        }else{
            this.$message({
                message: "不能删除已保存的地址节点！",
                type: "warning"
            })
        }
            
    };
    handleSelectionChange(val) {
        this.multipleSelection = val;
    };
    searchCust(val){
        this.custList = [];
        if(val !== ''){
            getCustList({
                custName:val,
            }).then((res:Ajax.AjaxResponse)=>{
                if(res.status == 0){
                    this.custList = res.data
                }
            })
        }
    };
    selectCust():void{
        this.itemList.forEach(item=>{
            this.custList.forEach(i=>{
                if(item.custId == i.custId){
                    item.custMaintenanceContent = i.custMaintenanceContent;
                    item.custMaintenanceDate = i.custMaintenanceDate;
                    item.custName = i.custName;
                    item.visitTypeName = i.visitTypeName;
                    item.visitType = i.visitType;
                }
            })
        })
    };
    backStep(): void {
        this.$router.go(-1);
    };
    submit(): void {
        this.postData.dailyCustMaintenanceList = this.itemList;
        this.postData.custPhotoCount = this.custPhotoCount;
        this.postData.custVisitCount = this.custVisitCount;
        if (logFormVali(this)) {
            saveMaLog({
                ...this.postData
            }).then((res: Ajax.AjaxResponse) => {
                if (res.status == 0) {
                    // localStorage.setItem(
                    //     'web_ma_sendToList',
                    //     JSON.stringify(this.postData.sendToList)
                    // );
                    // localStorage.setItem(
                    //     'web_ma_copyToList',
                    //     JSON.stringify(this.postData.copyToList)
                    // );
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

.base-ul{
    display:flex
}
.base-li{
    flex:0 0 50%;
}
</style>
<style>
.area .el-cascader {
  width: 250px !important;
}
</style>
