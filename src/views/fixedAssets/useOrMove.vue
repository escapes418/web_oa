<template>
  <div class="sjb-form-wrapper">
        <el-alert
            title="所有填写内容为领用/转移后的内容。"
            class="remarkInfo"
            :closable="false"
            show-icon
            type="info">
        </el-alert>
        <div class="segment statistics">
            <div class="segment-header">
                基本信息
            </div>
            <div class="segment-area">
                <el-row>
                    <el-col :span="12" class="segment-brline">
                        <Department Dlabel="使用部门：" style="margin-top:1px" type="form" :DId="postData.usingOffice" :Dvalue="depart" @on-confirm="depConfirm"></Department>
                        <RedStar label="放置地："
                            :required="true">
                            <span class="right-con long_area">
                                <el-select clearable class="filter-item" v-model="postData.assetPlaceId" placeholder="请选择" style="width:250px;">
                                    <el-option v-for="item in assetPlaceList" :label="item.name" :value="item.id" :key="item.id">
                                    </el-option>
                                </el-select>
                            </span>
                        </RedStar>
                        <RedStar label="领用/转移日期："
                            :required="true">
                            <span class="right-con">
                                <el-date-picker v-model="pickOrTransferDate" class="filter-item" style="width:250px" placeholder="请选择日期" >
                                </el-date-picker>
                            </span>
                        </RedStar>
                        <RedStar label="备注：">
                            <span class="right-con">
                                <sjbtextarea placeholder="请输入"
                                textStyle="width:250px;"
                                :rows="3"
                                :max="200"
                                v-model.trim="postData.remarks"></sjbtextarea>
                            </span>
                        </RedStar>
                        
                    </el-col>
                    <el-col :span="12" class="segment-brline">
                        <RedStar label="使用人：" :required="true">
                            <span class="right-con">
                                <div class="item-value" @click="dialogProVisible = !dialogProVisible">
                                    <i class="el-icon-search" style="color:#bfbfbf"></i>
                                    <span style="color:#606266">{{proLeader}}</span>
                                </div>
                            </span>
                        </RedStar>
                        <RedStar label="工位：">
                            <span class="right-con">
                                <el-input placeholder="请输入"
                                :maxlength="100"
                                style="width:250px;"
                                v-model="postData.usingWorkplace"
                                ></el-input>
                            </span>
                        </RedStar>
                    </el-col>
                </el-row>
            </div>
        </div>
        <ChooseAssets ref="chooseAssets"></ChooseAssets>
        <div class="segment statistics">
            <div class="sjb-foot-button">
                <el-button type="primary"
                size="small"
                @click="submit">提交</el-button>
                <el-button size="small"
                @click="backStep">返回</el-button>
            </div>
        </div>
        <el-dialog title="选择使用人" :visible.sync="dialogProVisible"  width="25%" :center="true">
            <el-input placeholder="输入关键字进行过滤" v-model="filterPro" style="margin-bottom:10px"></el-input>
            <el-tree node-key="id" :data="treeData" show-checkbox check-strictly :props="defaulttreeProps" @check-change="handleProClick"  :filter-node-method="proNode" ref="proTree"></el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogProVisible = false">取消</el-button>
                <el-button type="primary" @click="selectPro">确认</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import common from "@/utils/common";
import { queryAssetTypeTree,pickOrTransferAsset,queryAssetPlaceList } from '@/api/fixedAssets'
import Department from "@/components/Department/index.vue";
import Utils from "./util";
import RedStar from "@/components/RedStar/RedStar.vue";
import ChooseAssets from "@/components/ChooseAssets/index.vue";
import sjbtextarea from '@/components/sjbTextarea/index.vue';
import { POST_data,CUST_list,MEMBER_list,POST_item,UM_postData} from "./interface";

import { Vue, Component, Watch } from "vue-property-decorator";

@Component({
    components: {
        RedStar: RedStar,
        ChooseAssets,
        Department,
        sjbtextarea
    }
})
export default class maForm extends Vue {
    assetType = [];
    defaulttreeProps= {
        children: "children",
        label: "name"
    };
    depart="";
    proLeader= "";
    filterPro= "";
    dialogProVisible = false;
    treeData = [];
    proData= [];
    assetPlaceList = [];
    pickOrTransferDate = "";
    postData:UM_postData = {
        assetId: [],//资产ID
        assetPlaceId: "",//放置地 
        pickOrTransferDate: "",//领用/转移日期 ,
        remarks: "",
        usingOffice: "",// 使用部门
        usingPerson: "",//使用人
        usingWorkplace: ""//工位
    };

    @Watch('filterPro')
    onFilterProChanged(val: any, oldVal: any) {
        let VM:any = this.$refs.proTree;
        VM.filter(val);
    }

    created() {
        let memberList = JSON.parse(localStorage.getItem("web_oa_member"));
        var newArr = [];
        common.transToTree(memberList, newArr);
        common.mapAndAddChildren(newArr);
        this.treeData = newArr;
        this.getAssetPlaceList();

    }
    mounted() {
    }
    backStep(): void {
        this.$router.go(-1);
    };
    getAssetPlaceList(){
        queryAssetPlaceList().then((res:any) => {
            this.assetPlaceList = res.data;
        })
    };
    submit(): void {
        let CA:any = this.$refs.chooseAssets;
        var list = CA.fetchData()
        this.postData.assetId = []
        list.forEach((item,index)=>{
            this.postData.assetId.push(item.id)
        })
        this.postData.pickOrTransferDate = common.timeParse(this.pickOrTransferDate)
        if (Utils.useOrMove(this)){
            pickOrTransferAsset({
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
    };
    handleProClick(data,select,childSelect) {
        let index = this.proData.indexOf(data)
        if(index<0&&this.proData.length ===1&&select){
            // this.$message({
            //     message: "只能选择一个子节点作为项目负责人！",
            //     type: 'warning'
            // })
            let VM:any = this.$refs.proTree;
            VM.setChecked(this.proData[0],false);
            this.proData = [];
            this.proData.push(data)
        }else if(this.proData.length ===0&&select){
            if(data.type =='2'&&data.status == '1'){
                this.proData = [];
                this.proData.push(data)
            }else{
                this.$message({
                    message: "该节点不可选！",
                    type: 'warning'
                })
                let VM:any = this.$refs.proTree;
                VM.setChecked(data,false);
                return
            }
        }else if(index>=0&&this.proData.length===1&&!select){
            this.proData = []
        }
    };
    proNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
    };
    depConfirm(data) {
        if(data){
            this.depart = data.name;
            this.postData.usingOffice = data.id;
        }else{
            this.depart = "";
            this.postData.usingOffice = "";
        }
        
    };
    selectPro() {
        if(this.proData.length){
            this.proLeader = this.proData[0].name;
            this.postData.usingPerson = this.proData[0].id;
            this.dialogProVisible = false;
        }else{
            this.$message({
                message: "请选择使用人",
                type: "warning"
            });
            return;
        }
    };
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
