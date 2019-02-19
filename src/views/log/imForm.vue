<template>
  <div class="sjb-form-wrapper">
        <div class="segment statistics">
            <div class="segment-header">
                基本信息
            </div>
            <div class="segment-area">
                <el-row>
                    <el-col :span="12" class="segment-brline">
                        <RedStar label="今日工作："
                            :required="true">
                            <span class="right-con long_area">
                                <el-input placeholder="请输入"
                                type="textarea"
                                style="width:250px;"
                                :rows="3"
                                :maxlength="250"
                                v-model.trim="postData.todayWork"></el-input>
                            </span>
                        </RedStar>
                        <RedStar label="回访项目情况："
                            :required="true">
                            <span class="right-con">
                                <el-input placeholder="请输入"
                                type="textarea"
                                style="width:250px;"
                                :rows="3"
                                :maxlength="250"
                                v-model.trim="postData.revisitProjectStatus"></el-input>
                            </span>
                        </RedStar>
                        <RedStar label="今日感想："
                            :required="true">
                            <span class="right-con">
                                <el-input placeholder="请输入"
                                type="textarea"
                                style="width:250px;"
                                :rows="3"
                                :maxlength="250"
                                v-model.trim="postData.todayThought"></el-input>
                            </span>
                        </RedStar>
                        
                    </el-col>
                    <el-col :span="12" class="segment-brline">
                        <RedStar label="运力池建设："
                            :required="true">
                            <span class="right-con">
                                <el-input placeholder="请输入"
                                type="textarea"
                                style="width:250px;"
                                :rows="3"
                                :maxlength="250"
                                v-model.trim="postData.transportPoolBuild"></el-input>
                            </span>
                        </RedStar>
                        <RedStar label="需要协助问题："
                            :required="true">
                            <span class="right-con">
                                <el-input placeholder="请输入"
                                type="textarea"
                                style="width:250px;"
                                :rows="3"
                                :maxlength="250"
                                v-model.trim="postData.needAssistProblem"></el-input>
                            </span>
                        </RedStar>
                        <RedStar label="备注：">
                            <span class="right-con">
                                <el-input placeholder="请输入"
                                type="textarea"
                                style="width:250px;"
                                :rows="3"
                                :maxlength="250"
                                v-model.trim="postData.remarks"></el-input>
                            </span>
                        </RedStar>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="segment statistics">
            <div class="segment-header">
                <!-- <span class="left-red">*</span> -->
                项目情况
            </div>
            <div class="segment-area">
                <div class="el-table__body-wrapper" style="padding: 15px 0;">
                    <el-table ref="multipleTable" border :data="itemList" tooltip-effect="dark" @selection-change="handleSelectionChange">
                        <el-table-column
                            type="selection"
                            width="55px">
                        </el-table-column>
                        <el-table-column align="center" label="项目名称" width="320px">
                            <template slot-scope="scope">
                                <el-select 
                                    filterable
                                    remote
                                    style="width: 300px" 
                                    class="filter-item" 
                                    v-model="scope.row.projectId" 
                                    placeholder="请输入项目名称"
                                    :remote-method="searchProject"
                                    @change="selectProject(scope.row)">
                                    <el-option v-for="item in projectList" :key="item.id" :label="item.projectName" :value="item.id">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="节点" width="180px">
                            <template slot-scope="scope">
                                <el-select 
                                    filterable
                                    style="width: 150px" 
                                    class="filter-item" 
                                    v-model="scope.row.nodeId" 
                                    placeholder="请输入节点"
                                    @change="selectNode(scope.row)">
                                    <el-option v-for="item in scope.row.mapNodeList" :key="item.nodeId" :label="item.nodeName" :value="item.nodeId">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="节点具体地址" width="300px">
                            <template slot-scope="scope">
                                <span>{{scope.row.nodeAddress}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="节点人数">
                            <template slot-scope="scope">
                                <el-input placeholder="请输入"
                                type="number"
                                style="width:150px;"
                                :maxlength="250"
                                v-model.trim="scope.row.nodeEmpNum"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="节点具体人员">
                            <template slot-scope="scope">
                                <el-input placeholder="请输入"
                                type="text"
                                style="width:180px;"
                                :maxlength="250"
                                v-model.trim="scope.row.nodeEmpNames"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="异常情况" width="90px">
                            <template slot-scope="scope">
                                <el-select 
                                    filterable
                                    style="width: 75px" 
                                    class="filter-item" 
                                    v-model="scope.row.hasAbnormalStatus" 
                                    placeholder="请选择">
                                    <el-option v-for="item in nodeList" :key="item.value" :label="item.name" :value="item.value">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="具体异常说明">
                            <template slot-scope="scope">
                                <el-input placeholder="请输入"
                                type="text"
                                style="width:180px;"
                                :maxlength="250"
                                :disabled="scope.row.hasAbnormalStatus == 0"
                                v-model.trim="scope.row.anomalyDescription"></el-input>
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
                    <RedStar label="发送给："
                        :required="true" style="line-height:30px">
                        <span class="right-con">
                            <el-select 
                                filterable
                                multiple
                                style="width: 300px" 
                                class="filter-item" 
                                v-model="postData.sendToUserList" 
                                placeholder="请选择发送对象">
                                <el-option v-for="item in memberList" :key="item.id" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </span>
                    </RedStar>
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
import { saveImLog,getMember,getProject,getNode} from "@/api/log";
import { parseTime } from "@/utils/index";
import { imFormVali } from "./log.util";
import RedStar from "@/components/RedStar/RedStar.vue";
import { POST_data,CUST_list,MEMBER_list,POST_imply,IMPLY_item,DIC_list,PROJECT_list} from "./interface";

import { Vue, Component } from "vue-property-decorator";

@Component({
    components: {
        RedStar: RedStar
    }
})
export default class imForm extends Vue {
    itemList:Array<IMPLY_item>=[];
    memberList:Array<MEMBER_list>=[];
    multipleSelection:Array<IMPLY_item>=[];
    nodeList:Array<DIC_list> = [];
    projectList:Array<PROJECT_list> = [];
    postData:POST_imply = {
        needAssistProblem :'',// 需要协助问题 ,
        projectImplementStatusList:[],// 项目(实施)情况 ,
        remarks:'',// 备注 ,
        revisitProjectStatus:'', //回访项目情况 ,
        sendToUserList:[],// 发给谁 ,
        todayThought:'',// 今日感想 ,
        todayWork:'',// 今日工作 ,
        transportPoolBuild:'',// 运力池建设
    };
    //计算属性

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
        this.nodeList = selectDic(dicList,"node_has_abnormal_status");

        getMember({}).then((res:Ajax.AjaxResponse)=> {
            this.memberList = res.data;
            if(localStorage.getItem("web_oa_sendToUserList")){
                this.postData.sendToUserList = JSON.parse(localStorage.getItem("web_oa_sendToUserList"));
            }
        })
    }

    add():void {
        this.projectList = [];
        this.itemList.push({ index: new Date().getTime(),anomalyDescription:'',hasAbnormalStatus:'',nodeAddress:'',nodeEmpNames:'',nodeEmpNum:0,nodeId:'',nodeName:'',projectId:'',projectName:'',mapNodeList:[]});
    }
    del():void{
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
    handleSelectionChange(val):void {
        this.multipleSelection = val;
    };
    searchProject(val):void{
        this.projectList = [];
        if(val !== ''){
            getProject({
                projectName:val,
            }).then((res:Ajax.AjaxResponse)=>{
                if(res.status == 0){
                    this.projectList = res.data
                }
            })
        }
    }
    selectProject(item):void{
        item.mapNodeList = [];
        item.nodeId = '';
        item.nodeName = '';
        item.nodeAddress = '';
        this.projectList.forEach(i=>{
            if(i.id == item.projectId){
                item.projectName = i.projectName;
            }
        })
        getNode({
            id:item.projectId
        }).then((res:Ajax.AjaxResponse)=>{
            item.mapNodeList = res.data;
        })
    };
    selectNode(item):void{
        item.nodeName = '';
        item.nodeAddress = '';
        item.mapNodeList.forEach(i=>{
            if(i.nodeId== item.nodeId){
                item.nodeName = i.nodeName;
                item.nodeAddress = i.nodeAddress
            }
        })
    };
    backStep(): void {
        this.$router.go(-1);
    };
    submit(): void {
        this.postData.projectImplementStatusList = this.itemList;
        if (imFormVali(this)) {
            saveImLog({
                ...this.postData
            }).then((res: Ajax.AjaxResponse) => {
                if (res.status == 0) {
                    localStorage.setItem(
                        'web_oa_sendToUserList',
                        JSON.stringify(this.postData.sendToUserList)
                    );
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
</style>
<style>
.area .el-cascader {
  width: 250px !important;
}
</style>
