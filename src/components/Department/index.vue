<template>
    <div class="department" :class="type=='form'?'formHeight':''">
        <!-- 列表样式 -->
        <div class="toolbar-item list" v-if="type == 'list'">
            <span class="item-label">归属部门：</span>
            <div class="item-value" @click="showTree">
                <i class="el-icon-search" style="color:#bfbfbf"></i>
                <span style="color:#606266">{{officeName}}</span>
            </div>
        </div>
        <!-- 表单样式 -->
        <RedStar :label="Dlabel" v-if="type == 'form'" class="clearfix  cominfoitem form" :required="true">
            <span class="right-con">
                <div class="item-value" @click="showTree">
                    <i class="el-icon-search" style="color:#bfbfbf"></i>
                    <span style="color:#606266">{{officeName}}</span>
                </div>
            </span>
        </RedStar>
        <!-- <div class="clearfix  cominfoitem form" v-if="type == 'form'">
            <span class="left-red">*</span>
            <span class="left-title font-gray">归属部门：</span>
            <span class="right-con">
                <div class="item-value" @click="showDialog = true">
                    <i class="el-icon-search" style="color:#bfbfbf"></i>
                    <span style="color:#606266">{{officeName}}</span>
                </div>
            </span>
        </div> -->
        <el-dialog title="选择部门" :visible.sync="showDialog" width="25%" :center="true">
            <el-input placeholder="输入关键字进行过滤" v-model="filterText" style="margin-bottom:10px"></el-input>
            <!-- <el-tree node-key="id" :default-expanded-keys="officeId" :default-checked-keys="officeId" show-checkbox check-strictly @check-change=clickCharge :data="treeData" :props="defaultProps" :filter-node-method="filterNode" ref="tree"></el-tree> -->
            <el-tree node-key="id" show-checkbox check-strictly @check-change=clickCharge :data="treeData" :props="defaultProps" :filter-node-method="filterNode" ref="tree"></el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showDialog = false">关闭</el-button>
                <el-button type="primary" @click="confirmChoice">确认</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import common from "@/utils/common";
import RedStar from '@/components/RedStar/RedStar.vue'
export default {
    components:{
        RedStar
    },
    props: {
        Dvalue: String,
        DId: [String,Number],
        type: String,
        Dlabel: {
            type: String,
            default: "归属部门："
        },
        canshow:{
            type:Boolean,
            default:true
        },
        clearCheck:{
            type:Boolean,
            default:false
        }
    },
    data() {
        return {
            showDialog: false,
            filterText: "",
            treeData: [],
            defaultProps: {
                children: "children",
                label: "name"
            },
            tempChoice: "",
            officeName: "",
            officeId: [],

            chargeData:[],
            chargeName:"",
        };
    },
    computed: {

    },
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        },
        Dvalue(val){
            this.officeName = val
            if(this.DId) this.officeId[0] = this.DId;
        },
    },
    async created() {
        await this.$store.dispatch('FetchDictsAndLocalstore');
        let departList = JSON.parse(localStorage.getItem("web_oa_depart"));
        var newArr = [];
        if(this.type == "form"){
            departList = departList.filter(item=>{
                return item.status == 1
            })
        }
        common.transToTree(departList, newArr);
        this.treeData = newArr;
        this.officeName = this.Dvalue;
    },
    methods: {
        showTree(){
            if(this.canshow){
                this.showDialog = true;
            }
            this.$nextTick(_=>{
                this.$refs.tree.setChecked(this.chargeData[0],false);
            })  
        },
        clickCharge(data,select,childSelect){
            let index = this.chargeData.indexOf(data)
            if(index<0&&this.chargeData.length ===1&&select){
                // this.$message({
                //     message: "只能选择一个子节点作为归属部门！",
                //     type: 'warning'
                // })
                this.$refs.tree.setChecked(this.chargeData[0],false);
                this.chargeData = []
                this.chargeData.push(data)
            }else if(this.chargeData.length ===0&&select){
                if(this.type =='form'&&data.status == '0'){
                    this.$message({
                        message: "该部门节点不可选！",
                        type: 'warning'
                    })
                    this.$refs.tree.setChecked(data,false);
                    return
                }else{
                    this.chargeData = [];
                    this.chargeData.push(data)
                }
            }else if(index>=0&&this.chargeData.length===1&&!select){
                this.chargeData = []
            }
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        confirmChoice() {
            this.showDialog = false;
            if(this.chargeData.length){
                const [{id,name}] = this.chargeData;
                this.officeName = name;
                this.$emit("on-confirm", {id,name});
            }else{
                this.$emit("on-confirm");
            }
        }
    }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.department {
    display: inline-block;

    .list {
        .item-value {
            display: inline-block;
            border: 1px solid #dcdfe6;
            border-radius: 4px;
            background: white;
            padding-left: 7px;
            line-height: 30px;
            width: 200px;
        }
    }
    .form {
        .item-value {
            display: inline-block;
            border: 1px solid #dcdfe6;
            border-radius: 4px;
            background: white;
            padding-left: 7px;
            line-height: 30px;
            width: 250px;
        }
    }
}
.formHeight {
    margin-top: -10px;
    height: 26px;
    width: 100%;
    // margin: 2px 0;
}
.left-red{
    color: red;
    position: absolute;
    left: 15px;
}
.cominfoitem {
    .font-gray.left-title {
        font-size: 14px;
        float: left;
        width: 150px;
        padding-right: 10px;
        color: #99a9bf !important;
    }
    .right-con {
        float: left;
        color: rgb(52, 52, 52);
        font-size: 14px;
    }
}
</style>
