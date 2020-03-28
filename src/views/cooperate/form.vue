<template>
    <div class="sjb-form-wrapper">
        <div class="segment statistics">
            <div class="segment-header">
                基本信息
            </div>
            <div class="segment-area">
                <base-temp>
                    <ul class="base-ul">
                        <li class="base-li">
                            <RedStar label="标题：" :required="true">
                                <span class="right-con">
                                    <el-input style="width: 260px;" class="filter-item" placeholder="请输入标题" v-model.trim="postData.title" :maxlength="50">
                                    </el-input>
                                </span>
                            </RedStar>
                        </li>
                        
                        <li class="base-li">
                            <RedStar label="类型：" :required="true">
                                <span class="right-con">
                                    <el-select clearable class="filter-item ignore-detail" filterable v-model="postData.type" placeholder="请选择类型名称" style="width:260px;" >
                                        <el-option v-for="item in typeList" :label="item.typeName" :value="item.id" :key="item.id">
                                        </el-option>
                                    </el-select>
                                </span>
                            </RedStar>
                        </li>
                        
                        <li class="base-li">
                            <RedStar label="标签：" :required="true">
                                <span class="right-con">
                                    <el-select clearable class="filter-item ignore-detail" filterable multiple v-model="postData.labelList" placeholder="请选择标签名称" style="width:260px;">
                                        <el-option v-for="item in labelList" :label="item.labelName" :value="item.id" :key="item.id">
                                        </el-option>
                                    </el-select>
                                </span>
                            </RedStar>
                        </li>
                        
                        <li class="base-li">
                            <RedStar label="描述：" :required="true">
                                <span class="right-con">
                                    <sjbtextarea :rows="3" placeholder="请输入" textStyle="width:260px;" :max="200" v-model.trim="postData.description"></sjbtextarea>
                                </span>
                            </RedStar>
                        </li>
                    </ul>
                </base-temp>
                <base-temp title="负责人信息">
                    <ul class="base-ul">
                        <li class="base-li">
                            <RedStar label="下一级负责人：" :required="true">
                                <span class="right-con">
                                    <div class="item-value" @click="dialogCharge = !dialogCharge">
                                        <i class="el-icon-search" style="color:#bfbfbf"></i>
                                        <span style="color:#606266">{{chargeName}}</span>
                                    </div>
                                </span>
                            </RedStar>
                        </li>
                    </ul>
                </base-temp>
                <base-temp title="参与人信息">
                    <ul class="base-ul">
                        <li class="base-li">
                            <RedStar label="参与人：" :required="true">
                                <span class="right-con">
                                    <div class="item-value" @click="dialogPart = !dialogPart">
                                        <i class="el-icon-search" style="color:#bfbfbf"></i>
                                        <span style="color:#606266">{{partName}}</span>
                                    </div>
                                </span>
                            </RedStar>
                        </li>
                    </ul>
                </base-temp>
            </div>
        </div>

        <el-dialog title="选择下一级负责人" :visible.sync="dialogCharge"  width="25%" :center="true">
            <el-input placeholder="输入关键字进行过滤" v-model="filterCharge" style="margin-bottom:10px"></el-input>
            <el-tree :data="treeData" :props="defaultProps" show-checkbox check-strictly node-key="id" @check-change=clickCharge :filter-node-method="chargeNode" ref="chargeTree"></el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogCharge = false">取消</el-button>
                <el-button type="primary" @click="selectCharge">确认</el-button>
            </div>
        </el-dialog>

        <el-dialog title="编辑参与人" :visible.sync="dialogPart"  width="25%" :center="true">
            <el-input placeholder="输入关键字进行过滤" v-model="filterPart" style="margin-bottom:10px"></el-input>
            <el-tree :data="treeData" :props="defaultProps" show-checkbox check-strictly node-key="id" @check-change=clickPart :filter-node-method="partNode" ref="partTree"></el-tree>
            <div class="move-item">
                <div>
                    已选择参与人：
                </div>
                <span v-for="(item,index) in partList" :key="index">
                    <span class="select-item">{{item.name}}</span>
                    <span class="blank"> </span>
                </span>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogPart = false">取消</el-button>
                <el-button type="primary" @click="selectPart">确认</el-button>
            </div>
        </el-dialog>

        <div class="segment statistics">
            <div class="sjb-foot-button">
                <el-button type="primary" size="small" @click="submit">提交申请</el-button>
                <el-button size="small" @click="backStep">返回</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import common from '@/utils/common';
import BaseTemp from '@/components/BaseTemp';
import RedStar from '@/components/RedStar/RedStar.vue';
import dynamicForm from "@/components/DynamicForm/dynamic-form";
import sjbtextarea from '@/components/sjbTextarea'

import {getLabelList,getTypeList,addCoop } from '@/api/cooprate';
import { mapState, mapGetters } from "vuex";

import { parseTime } from '@/utils';
import { coopFormVali } from './coop.util';
import config from '@/utils/config';
import utils from '@/utils/utils';
export default {
    components: {
        BaseTemp,
        RedStar,
        dynamicForm,
        sjbtextarea
    },
    watch:{
        filterCharge(val){
            this.$refs.chargeTree.filter(val);
        },
        filterPart(val){
            this.$refs.partTree.filter(val)
        }
    },
    data() {
        return {
           
            labelList:[],
            typeList:[],
            projectList:[],
            conInfor: [],
            postData: {//提交数据
                description:"",
                labelList:[],
                participantList:[],
                principal:"",
                title:"",
                type:"" 
            },


            //负责人
            dialogCharge:false,
            filterCharge:'',
            treeData:[],
            defaultProps: {
                children: "children",
                label: "name"
            },
            chargeData:[],
            chargeName:"",

            dialogPart:false,
            filterPart:'',
            partName:'',
            partList:[],
            defaultList:[],
        }
    },
    created() {
        
    },
    computed: {
       
    },
    async mounted() {
        
        getLabelList({}).then(res=>{
            this.labelList = res.data
        })
        
        getTypeList({}).then(res=>{
            this.typeList = res.data
        })
        await this.$store.dispatch('FetchDictsAndLocalstore');
        let memberList = JSON.parse(localStorage.getItem("web_oa_member"));
        var newArr = [];
        let len = memberList.length;
        function filterResign (memberList) {
            let ids = [];
            memberList.forEach(item=>{
                ids.push(item.pId)
                if(item.userInfo.length){
                    let tem = item.userInfo;
                    tem = tem.filter(i=>{
                        return i.status=="1"
                    })
                    item.userInfo = tem;
                }
            })

            ids = Array.from(new Set(ids))
            for(var i = memberList.length - 1; i >= 0; i--){
                if(ids.indexOf(memberList[i].id)=="-1"&&memberList[i].type=="1"&&memberList[i].userInfo.length=="0"){
                    memberList.splice(i,1)
                }
            }
        }
        filterResign(memberList);
        while(len != memberList.length){
            len = memberList.length
            filterResign(memberList);
        }
        common.transToTree(memberList, newArr);
        common.mapAndAddChildren(newArr);
        this.treeData = newArr;
        
    },
    methods: {
        showDetail(row){
            this.$router.push({
                path: "/inforManage/customerForm",
                query: { key: row.custId }
            });
        },
        chargeNode(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        partNode(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        selectCharge(){
            if(this.chargeData.length){
                const [{id,name}] = this.chargeData;
                this.postData.principal = id;
                this.chargeName = name
                // this.chargeData = []
                // this.$refs.chargeTree.setCheckedKeys([]);
                this.dialogCharge = false
            }else{
                this.$message({
                    message: "请选择一个子节点作为下一级负责人！",
                    type: 'warning'
                })
            }
            
        },
        clickCharge(data,select,childSelect){
            let index = this.chargeData.indexOf(data)
            if(index<0&&this.chargeData.length ===1&&select){
                if(data.type =='2'&&data.status == '1'){
                    this.$refs.chargeTree.setChecked(this.chargeData[0],false);
                    this.chargeData = [];
                    this.$refs.chargeTree.setChecked(data,true);
                    this.chargeData.push(data)
                }else{
                    this.$message({
                        message: "该节点不可选！",
                        type: 'warning'
                    })
                    this.$refs.chargeTree.setChecked(data,false);
                    this.$refs.chargeTree.setChecked(this.chargeData[0],true);
                    return
                }
            }else if(this.chargeData.length ===0&&select){
                if(data.type =='2'&&data.status == '1'){
                    this.chargeData = [];
                    this.chargeData.push(data);
                }else{
                    this.$message({
                        message: "该子节点不能作为下一级负责人！",
                        type: 'warning'
                    })
                    this.$refs.chargeTree.setChecked(data,false);
                    return
                }
            }else if(index>=0&&this.chargeData.length===1&&!select){
                this.chargeData = []
            }
        },
        clickPart(data,select,children){
            let index = this.partList.indexOf(data)
            if(index<0&&select){
                if(data.type =='2'&&data.status == '1'){
                    this.partList.push(data);
                }else{
                    this.$message({
                        message: "该子节点不能作为参与人！",
                        type: 'warning'
                    })
                    this.$refs.partTree.setChecked(data,false);
                    return
                }
            }else if(index>=0&&!select){
                this.$refs.partTree.setChecked(data,false);
                this.partList.splice(index,1)
            }
            
        },
        selectPart(){
            if(this.partList.length){
                let tempId = [] ,tempName = [];
                this.partList.forEach(item=>{
                    tempName.push(item.name)
                    tempId.push(item.id)
                })
                this.postData.participantList = [...tempId]
                this.partName= tempName.join('，')
                // this.partList = [];
                // this.$refs.partTree.setCheckedKeys([])
                this.dialogPart = false
            }else{
                this.$message({
                    message: "请选择子节点作为参与人！",
                    type: 'warning'
                })
            }
            
        },
        
        backStep() {
            this.$router.go(-1);
        },
        // 提交
        submit() {
            if(coopFormVali(this)){
                addCoop({
                    ...this.postData
                }).then(res=>{
                    if (res.code == 200) {
                        this.$message({
                            message: res.message,
                            type: 'success'
                        })
                        this.$router.push({path:'/oa/coopList' });
                    }
                })
            }
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.base-ul{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.base-li{
    flex-basis: 50%;
    // height: 32plx;
    // display: inline-block;
    .font-gray.left-title {
        font-size: 13px;
        float: left;
        width: 150px;
        padding-right: 10px;
        color: #99a9bf;
    }
    .right-con {
        float: left;
        color: rgb(52, 52, 52);
        font-size: 13px ;
    }
}
.el-form-item--small .el-form-item__label {
    line-height: 32px;
    font-size: 14px;
    padding-right: 10px;
    color: #99a9bf;
}
.el-input--small .el-input__inner {
    height: 40px!important;
}
.left-red{
    color: red;
    position: absolute;
    left: 50px;
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
.item-value{
    float: left;
    border: 1px solid #dcdfe6;
    border-radius:4px;
    background: white;
    padding-left: 7px;
    line-height: 30px;
    width: 260px
}
.segment .el-table__body-wrapper {
    padding: 40px 20px 35px;
}
.ignore-detail {
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
}
.upload-img{
    width: 550px;
}
.toolbar-item{
    margin-left: 10px
}
.move-item{
    padding: 10px;
    background: #f2f7fa;
    color: #343434;
    .item-label{
        float: left;
        width: 100px;
    }
    .filter-item{
        display: inline-block;
        margin-left: 30px
    }
}
</style>
