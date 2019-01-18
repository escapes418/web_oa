<template>
    <div class="sjb-form-wrapper">
        <div class="segment statistics">
            <div class="segment-header">
                修改密码
            </div>
            <div class="segment-area">
                <el-row>
                    <el-col :span="24" class="segment-brline">
                        <div class="clearfix cominfo-item">
                            <span class="left-title font-gray">手机号：</span>
                            <span class="right-con">{{userInfo.loginName}}</span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">当前密码：</span>
                            <span class="right-con">
                                <el-input v-model.trim="psd.oldPassword"  type="password" style="width:280px"></el-input>
                            </span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">新密码：</span>
                            <span class="right-con">
                                <el-input v-model.trim="psd.newPassword"  type="password" style="width:280px"></el-input>
                            </span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">确认密码：</span>
                            <span class="right-con">
                                <el-input v-model.trim="psd.confirmPassword"  type="password" style="width:280px"></el-input>
                            </span>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="segment statistics">
            <div class="sjb-foot-button">
                <el-button type="primary" size="small" @click="submit">确认修改</el-button>
                <el-button size="small" @click="backStep">返回</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import common from "@/utils/common";
import {
    modifyPwd
} from "@/api/user";
import { mapState, mapGetters } from "vuex";
export default {
    components: {
    },
    data() {
        return {
            psd:{
                phone: "",
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
            },
        };
    },
    created() {
        //拿到基本信息
        this.userInfo = JSON.parse(localStorage.getItem("web_oa_userInfor"));
    },
    mounted() {

    },
    methods: {

        backStep() {
            this.$router.go(-1)
        },
        submit(type) {
            var _this = this
            if(!this.vail()) return;
                this.$confirm('确认修改？')
            .then(_ => {
                modifyPwd(_this.psd).then(res => {
                    if(res.status == 0){
                        _this.$message({
                            message: res.message || "修改密码成功",
                            type: 'success'
                        })
                        _this.logout()
                    } else {
                        _this.$message({
                            message: res.message || "修改密码失败",
                            type: 'warning'
                        })
                    }
                });
            })
            .catch(_ => {});
        },
        logout() {
            this.$store.dispatch('LogOut').then(() => {
                this.$router.push({
                    path: '/login'
                })
            })
        },
        vail(){
            var flag = true;
            if (this.psd.oldPassword == "") {
                this.$message({
                    message: "请输入当前密码",
                    type: "warning",
                });
                return  flag = false;
            }
            if (this.psd.newPassword == "") {
                this.$message({
                    message: "请输入新密码",
                    type: "warning",
                });
                return  flag = false;
            }
            if (this.psd.confirmPassword == "") {
                this.$message({
                    message: "请输入确认密码",
                    type: "warning",
                });
                return  flag = false;
            }
            if (this.psd.confirmPassword != this.psd.newPassword) {
                this.$message({
                    message: "新密码与确认密码不一致",
                    type: "warning",
                });
                return  flag = false;
            }
            if(!/^\w{6,16}$/.test(this.psd.newPassword)){
                this.$message({
                    message: "密码只能为6-16位数字、字母、下划线组合",
                    type: "warning",
                });
                return  flag = false;
            }
            return flag
        },
    }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
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

.upload-container {
    margin: 50px;
}
.editor-slide-upload {
    margin-bottom: 15px;
}
.item-value {
    display: inline-block;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background: white;
    padding-left: 7px;
    line-height: 30px;
    width: 280px;
}
.segment .el-table__body-wrapper {
    padding: 40px 20px 35px;
}
.ignore-detail {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
}
</style>