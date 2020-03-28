<template>
    <div class="sjb-container calendar-list-container ">
        <div class="filter-container">
            <div class="toolmore-control">
                 <div class="toolbar-item">
                    <el-button class="filter-item" type="primary" @click="handleCreate" icon="el-icon-edit">新增</el-button>
                </div>
            </div> 
        </div>
        <el-table :data="list" border fit highlight-current-row style="width: 100%">
            <el-table-column align="center" label="账户名">
                <template slot-scope="scope">
                    <span class="ignore-detail">{{scope.row.accountName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="帐号">
                <template slot-scope="scope">
                    <span>{{scope.row.accountNumber}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="银行" width="150px">
                <template slot-scope="scope">
                    <span>{{scope.row.belongBank}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="银行支行">
                <template slot-scope="scope">
                    <span>{{scope.row.belongBranchBank}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="创建人" width="100px">
                <template slot-scope="scope">
                    <span>{{scope.row.createBy}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="创建时间" width="100px">
                <template slot-scope="scope">
                    <span>{{scope.row.createTime | stamp2TextDateFull}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="是否默认银行账户" width="200px">
                <template slot-scope="scope">
                    <span>{{scope.row.defaultAccount =='1'?'是':'否'}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                    <el-radio v-if="scope.row.accountType =='1'" v-model="radioKey" :label="scope.row.id" @change="setDefault">设为默认的银行账户</el-radio>
                    <el-button type="danger" @click="handleDel(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="系统提示？" width="25%" :visible.sync="dialogDefault">
            <span>确认设置该账户为默认账户吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="setBtn">确认</el-button>
                <el-button @click="cancelDefault">取消</el-button>
            </span>
        </el-dialog>
        <el-dialog title="系统提示？" width="25%" :visible.sync="dialogDel">
            <span>确认删除该账户吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="delBtn">确认</el-button>
                <el-button @click="cancelBtn">取消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import common from "@/utils/common";
import { getAccountList,setDefaultAccount,delAccount} from "@/api/account";
export default {
    data() {
        return {
            dialogDefault:false,
            dialogDel:false,
            radioKey:"",
            id:"",
            list: [],
        };
    },
    created() {

        this.getList();
    },
    mounted() {
        
    },
    methods: {
        getList() {
            // this.list = [{
            //     accountName : "持卡人姓名",
            //     accountNumber: "银行卡号" ,
            //     accountType:"1",
            //     belongBank: "建行" ,
            //     belongBranchBank: "武汉支行",
            //     defaultAccount:"1" ,
            //     identityCard: "",
            //     id:"123456789"
            // },{
            //     accountName : "持卡人姓名",
            //     accountNumber: "银行卡号" ,
            //     accountType:"1",
            //     belongBank: "建行" ,
            //     belongBranchBank: "武汉支行",
            //     defaultAccount:"0" ,
            //     identityCard: "",
            //     id:"123456788"
            // }]
            getAccountList({}).then(res => {
                if(res.code == 200){
                    this.list = res.data;
                    res.data.map(i=>{
                        if(i.defaultAccount=="1"){
                            this.radioKey = i.id
                        }
                    })
                } 
            });
        },
        handleCreate(){
            this.$router.push({
                path:"/me/addAccount"
            })
        },
        handleDel(row){
            this.dialogDel = true;
            this.id = row.id;
        },
        delBtn(){
            delAccount({id:this.id}).then(res => {
                if(res.code == 200){
                    this.dialogDel = false;
                    this.$message({
                        message: res.message,
                        type: "success"
                    })
                    this.getList()
                }
            })
        },
        setDefault(id){
            this.dialogDefault = true;
            this.id = id;
        },
        cancelDefault(){
            this.dialogDefault = false;
            this.getList();
        },
        setBtn(){
            setDefaultAccount({id:this.id}).then(res=>{
                if(res.code == 200){
                    this.dialogDefault = false
                    this.$message({
                        message: res.message,
                        type: "success"
                    })
                    this.getList()
                }
            })
        },
        cancelBtn(){
            this.dialogDel = false;
            this.getList()
        }
    }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.toolbar-row {
    margin: 5px 0 0 0;
}
.merge-item{
    margin: 5px;
    
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
.el-dialog__body {
    padding: 10px 20px; 
    color: #606266;
    line-height: 24px;
    font-size: 14px;
}
.item-value {
    display: inline-block;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background: white;
    padding-left: 7px;
    line-height: 30px;
    width: 190px;
}
.select-item{
    margin-right: 5px
}
.self-table-expand {
    font-size: 0;
}

.el-form--inline .el-form-item__content {
    font-size: 12px;
}
.el-form--inline .el-form-item__label {
    font-size: 12px;
    width: 90px;
    color: #99a9bf;
    float: none;
    display: inline-block;
}

.self-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}

.ignore-detail {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
    margin-top: -3px;
}
</style>

