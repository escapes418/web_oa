<template>
<div class="box-container">
    <div class="blank-item"></div>
    <div class="account-container">
        <div class="account-header">
            <span class="select-header" :class="postData.accountType == 1 ? 'is-select':''" @click="selectAccount(1)">新建个人账户</span>
            <span class="select-header" :class="postData.accountType == 2 ? 'is-select':''" @click="selectAccount(2)">新建对公账户</span>
        </div>
        <div class="account-body">

            <div class="individual-container" v-if="postData.accountType==1">
                <el-alert
                    title="请绑定持卡人的银行卡"
                    class="remarkInfo"
                    :closable="false"
                    show-icon
                    type="info">
                </el-alert>
                <div class="star-box">
                    <span class="star-item">
                        <span>*</span>
                    </span>
                    <span class="label-item">账户名</span>
                    <span class="slot-item">
                        <el-input placeholder="请输入" v-model.trim="postData.accountName" :maxlength="64"></el-input>
                    </span>
                </div>
                <div class="star-box">
                    <span class="star-item">
                        <span>*</span>
                    </span>
                    <span class="label-item">账号</span>
                    <span class="slot-item">
                        <el-input placeholder="请输入" v-model.trim="postData.accountNumber" :maxlength="64" @blur="getBank"></el-input>
                    </span>
                </div>
                <div class="star-box">
                    <span class="star-item">
                        <!-- <span>*</span> -->
                    </span>
                    <span class="label-item">银行</span>
                    <span class="slot-item">
                        {{postData.belongBank}}
                    </span>
                </div>
                <div class="star-box">
                    <span class="star-item">
                        <span>*</span>
                    </span>
                    <span class="label-item">身份证</span>
                    <span class="slot-item">
                        <el-input placeholder="请输入" v-model.trim="postData.identityCard" :maxlength="64"></el-input>
                    </span>
                </div>
                <div class="star-box">
                    <span class="star-item">
                        <span>*</span>
                    </span>
                    <span class="label-item">设为默认收款账户</span>
                    <span class="slot-item">
                        <el-switch v-model="defaultAccount"></el-switch>
                    </span>
                </div>
            </div>
            <div class="public-container" v-else>
                <el-alert
                    title="请绑定对公账户的银行卡"
                    class="remarkInfo"
                    :closable="false"
                    show-icon
                    type="info">
                </el-alert>
                <div class="star-box">
                    <span class="star-item">
                        <span>*</span>
                    </span>
                    <span class="label-item">账户名</span>
                    <span class="slot-item">
                        <el-input placeholder="请输入" v-model.trim="postData.accountName" :maxlength="64"></el-input>
                    </span>
                </div>
                <div class="star-box">
                    <span class="star-item">
                        <span>*</span>
                    </span>
                    <span class="label-item">账号</span>
                    <span class="slot-item">
                        <el-input placeholder="请输入" v-model.trim="postData.accountNumber" :maxlength="64"></el-input>
                    </span>
                </div>
                <div class="star-box">
                    <span class="star-item">
                        <span>*</span>
                    </span>
                    <span class="label-item">银行</span>
                    <span class="slot-item">
                        <el-select clearable filterable v-model="postData.belongBank" placeholder="请选择" style="display:block;">
                            <el-option v-for="(item,index) in bankList" :label="item" :value="item" :key="index">
                            </el-option>
                        </el-select>
                    </span>
                </div>
                <div class="star-box">
                    <span class="star-item">
                        <span>*</span>
                    </span>
                    <span class="label-item">银行支行</span>
                    <span class="slot-item">
                        <el-input placeholder="请输入" v-model.trim="postData.belongBranchBank" :maxlength="64"></el-input>
                    </span>
                </div>
            </div>
        </div>
        <div class="account-footer">
            <el-button type="primary" @click="submit">确认提交</el-button>
            <el-button @click="goBack">返回</el-button>
        </div>
    </div>
    <div class="blank-item"></div>
</div>
    
</template>

<script>
import common from "@/utils/common";
import { saveAccount,queryBank,getBankList} from "@/api/account";
import RedStar from '@/components/RedStar/RedStar.vue'
import { accountFormVali } from './account.util'
export default {
    components: {
        RedStar,
    },
    data() {
        return {
            bankList:[],
            defaultAccount:false,
            postData:{
                accountName: "",
                accountNumber: "",
                accountType: "1",
                belongBank: "",
                belongBranchBank: "",
                defaultAccount: "",
                identityCard: ""
            }
        };
    },
    created() {
        getBankList({}).then(res=>{
            this.bankList = res.data;
        })
    },
    methods: {
        selectAccount(type){
            this.postData.accountType = type;
            this.postData.accountName = "";
            this.postData.accountNumber = "";
            this.postData.belongBank = "";
            this.postData.belongBranchBank = "";
            this.postData.defaultAccount = "";
            this.postData.identityCard = "";
            this.defaultAccount = false;
        },
        getBank(){
            queryBank({accountNumber:this.postData.accountNumber}).then(res => {
                this.postData.belongBank = res.data
            })
        },
        submit(){
            if(this.defaultAccount){
                this.postData.defaultAccount = 1;
            }else{
                if(this.postData.accountType=='1'){
                    this.postData.defaultAccount = 2;
                }
            }
            if(accountFormVali(this)){
                saveAccount({
                    ...this.postData
                }).then(res => {
                    this.$message({
                        message: res.message,
                        type: "success"
                    })
                    this.$router.push({ 
                        path:"/me/accountList"
                    })
                })
            }
            
        },
        goBack(){
            this.$router.go(-1)
        }
    }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.box-container{
    display:flex;
    width:100%;
}
.blank-item{
    flex:1;
}
.account-container{
    flex:0 0 600px;
}
.account-header{
    display:flex
}
.select-header{
    text-align:center;
    flex:1;
    line-height:40px;
    font-size:14px;
    color: white;
    background:rgb(153,153,153);
}
.is-select{
    background:#409EFF;
    cursor: Pointer;
}

.account-body{
    width:100%;
}
.star-box{
    display: flex;
    margin: 10px 0;
    line-height:32px;
    justify-content: flex-end
}

.star-item{
    color: red;
    flex:0 0 15px;
    line-height: 35px;
}
.label-item{
    font-size: 14px;
    padding-right: 10px;
    color: #99a9bf;
    flex:0 0 180px;
}
.slot-item{
    color: #343434;
    font-size: 14px;
    flex:1;
}
.account-footer{
    margin:50px 0px 0px 20px;
}
</style>