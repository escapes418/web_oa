<template>
    <div class="department" :class="type=='form'?'formHeight':''">
        <!-- 列表样式 -->
        <div class="toolbar-item list" v-if="type == 'list'">
            <span class="item-label">归属部门：</span>
            <div class="item-value" @click="showDialog = true">
                <i class="el-icon-search" style="color:#bfbfbf"></i>
                <span style="color:#606266">{{officeName}}</span>
            </div>
        </div>
        <!-- 表单样式 -->
        <RedStar label="归属部门：" v-if="type == 'form'" class="clearfix  cominfoitem form" :required="true">
            <span class="right-con">
                <div class="item-value" @click="showDialog = true">
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
        <el-dialog title="选择归属部门" :visible.sync="showDialog" width="25%" :center="true">
            <el-input placeholder="输入关键字进行过滤" v-model="filterText" style="margin-bottom:10px"></el-input>
            <el-tree node-key="id" :default-expanded-keys="officeId" :data="treeData" :props="defaultProps" @node-click="handleNodeClick" :filter-node-method="filterNode" ref="tree"></el-tree>
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
        type: String
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
        };
    },
    computed: {},
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        },
        Dvalue(val){
            this.officeName = val
            if(this.DId) this.officeId[0] = this.DId;
        }
    },
    created() {
        let departList = JSON.parse(localStorage.getItem("web_oa_depart"));
        var newArr = [];
        common.transToTree(departList, newArr);
        this.treeData = newArr;
        this.officeName = this.Dvalue;
    },
    methods: {
        handleNodeClick(data) {
            this.tempChoice = data;
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        confirmChoice() {
            this.officeName = this.tempChoice.name;
            this.showDialog = false;
            this.$emit("on-confirm", this.tempChoice);
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
