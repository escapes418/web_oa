<template>
    <div class="sjb-form-wrapper">
        <div class="segment statistics">
            <div class="segment-header">
                <span class="left-red">*</span>
                联系人信息
            </div>
            <div class="segment-area">
                <div class="el-table__body-wrapper" style="padding: 15px 0;">
                    <el-table ref="multipleTable" border :data="itemList" tooltip-effect="dark" style="width:100%" @selection-change="handleSelectionChange">
                        <el-table-column
                            type="selection"
                            width="55">
                        </el-table-column>
                        <el-table-column align="center" label="联系人" width="150px">
                            <template slot-scope="scope">
                                <el-input auto-complete="off" v-model.trim="scope.row.linkmanName" :maxlength="50"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="联系方式" width="180px">
                            <template slot-scope="scope">
                                <el-input auto-complete="off" v-model.trim="scope.row.linkmanPhone" :maxlength="50"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="邮箱（选填）" width="180px">
                            <template slot-scope="scope">
                                <el-input auto-complete="off" v-model.trim="scope.row.linkmanMail" :maxlength="50"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="职位" width="150px">
                            <template slot-scope="scope">
                                <el-input auto-complete="off" v-model.trim="scope.row.linkmanPost" :maxlength="50"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="备注（选填）" >
                            <template slot-scope="scope">
                                <el-input auto-complete="off" v-model.trim="scope.row.remarks" :maxlength="200"></el-input>
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
            <div class="sjb-foot-button">
                <el-button type="primary" size="small" @click="openConfirm('apply')">提交</el-button>
                <el-button size="small" @click="backStep">返回</el-button>
            </div>
        </div>
        <el-dialog title="确认" width="25%" :visible.sync="confirmDialog">
            <span>确定提交？</span>
            <div slot="footer" class="dialog-footer">
                <el-button @click="confirmDialog = false">取消</el-button>
                <el-button type="primary" @click="saveCustForm">确认</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import common from "@/utils/common";
import { getPassContact, saveContact } from "@/api/primaryCust";
import { mapState } from "vuex";
import RedStar from '@/components/RedStar/RedStar.vue';
import sjbtextarea from '@/components/sjbTextarea';
import { parseTime } from "@/utils";

export default {
    components:{
        RedStar,
        sjbtextarea
    },
    data() {
        return {
            radioKey:"",
            confirmDialog: false,
            itemList: [],
            multipleSelection:[],
            officeName:""
        };
    },
    methods: {
        openConfirm(type) {
            var _this = this;

            let flag = true;
            this.itemList.forEach(item=>{
                if(!item.linkmanName){
                    this.$message({
                        message: "联系人名称不能为空",
                        type: "warning"
                    });
                    flag = false;
                }
                else if(!item.linkmanPhone || !/^1[3456789][0-9]{9}$/.test(item.linkmanPhone)){
                    this.$message({
                        message: "请正确填写联系人联系方式",
                        type: "warning"
                    });
                    flag = false
                }
                else if(!item.linkmanPost){
                    this.$message({
                        message: "联系人职位不能为空",
                        type: "warning"
                    });
                    flag = false
                }
                
            })
            if(flag&&type =="apply"){
                this.confirmDialog = true;
            }
        },
        saveCustForm() {
            if (this.$route.query.key) {
                this.filter = {
                    ...this.filter,
                    mainCustId: this.$route.query.key
                };
            }
            this.itemList.forEach(item=>{
                if(this.radioKey === item.index){
                    item.isContractLinkman = 1
                }else{
                    item.isContractLinkman = 0
                }
            })
            saveContact({
                ...this.filter,
                custLinkmanHisList: this.itemList,
            }).then(res => {
                this.confirmDialog = false;
                if(res.status ==0){
                    this.$message({
                        message: res.message,
                        type: "success"
                    });
                    this.$router.push({
                        path: "/inforManage/primaryCust"
                    });
                } else {
                    this.$message({
                        message: res.message,
                        type: "error"
                    });
                }
            });
        },
        backStep() {
            this.$router.push({
                path: "/inforManage/primaryCust"
            });
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        add() {
            this.itemList.push({ index: new Date().getTime()});
        },
        del(){
            var _this = this
            var newindex = [];
            var newBox = [];
            _this.multipleSelection.forEach((value,idx)=>{
                newindex.push(value.index)
            })
            var arrBox = JSON.parse(JSON.stringify(this.itemList||[]))
            arrBox.forEach((val,num)=>{
                if(newindex.indexOf(val.index) == -1){
                    newBox.push(arrBox[num])
                }
            })
            this.itemList = newBox
        },
    },
    created() {
        var _this = this;
        this.add();
        if (this.$route.query.key) {
            getPassContact({
                mainCustId: this.$route.query.key
            }).then(response => {
                var data = response.data;

                this.itemList = data || [];
                this.itemList.forEach((item, idx) => {
                    _this.itemList[idx] = {
                        ..._this.itemList[idx],
                        index: idx
                    };
                    if(item.isContractLinkman == 1){
                        this.radioKey = idx
                    }
                });

            });
        } 
    },
    mounted() {
        
    }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
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
.segment-area {
    .textStyle-title {
        // line-height: 20px;
        padding: 12px 0px;
        font-size: 14px;
    }
}
</style>
<style>
.area .el-cascader {
    width: 250px !important;
}
</style>
