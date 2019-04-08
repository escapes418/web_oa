<template>
    <div class="sjb-form-wrapper">
        <div class="segment statistics">
            <div class="segment-header">
                基本信息
            </div>
            <div class="segment-area">
                <el-row>
                    <el-col class="segment-brline">
                        <div class="clearfix cominfo-item">
                            <span class="left-title font-gray">项目名称：</span>
                            <span class="right-con">
                                {{filter.projectName}}
                            </span>
                        </div>
                        <div class="clearfix  cominfo-item">
                        <span class="left-title font-gray">项目状态：</span>
                            <span class="right-con">
                                <el-select clearable class="filter-item" v-model="filter.projectState" placeholder="请选择" style="width:250px;" >
                                    <el-option v-for="item in proStateList" :label="item.name" :value="item.value" :key="item.value">
                                    </el-option>
                                </el-select>
                            </span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">状态变更日期：</span>
                            <span class="right-con">
                                <el-date-picker v-model="filter.changeTime" type="date" class="filter-item" style="width:250px" placeholder="选择日期">
                                </el-date-picker>
                            </span>
                        </div>
                        <div class="clearfix cominfo-item">
                            <span class="left-title font-gray">备注：</span>
                            <span class="right-con">
                                <sjbtextarea
                                    :rows="3"
                                    textStyle="width:250px"
                                    placeholder="请输入内容"
                                    :max="200"
                                    v-model.trim="filter.remarks">
                                </sjbtextarea>
                            </span>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="segment statistics">
            <div class="segment-header">
                维护记录
            </div>
            <div class="segment-area">
                <div class="el-table__body-wrapper" style="padding: 15px 0;">
                    <el-table ref="multipleTable" border :data="itemList" tooltip-effect="dark" style="width:100%">
                        <el-table-column align="center" label="编号" width="120">
                            <template slot-scope="scope">
                                <span>{{scope.row.index}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="状态变更日期" width="220px">
                            <template slot-scope="scope">
                                <span>{{scope.row.changeTime | stamp2TextDate}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="项目状态" width="220px">
                            <template slot-scope="scope">
                                <span>{{scope.row.projectMaintenanceStateName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="备注">
                            <template slot-scope="scope">
                                <span>{{scope.row.remarks}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="维护人">
                            <template slot-scope="scope">
                                <span>{{scope.row.createBy}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="维护时间" width="220px">
                            <template slot-scope="scope">
                                <span>{{scope.row.createTime | stamp2TextDateFull}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="pagination-container">
                    <el-pagination background @current-change="handleCurrentChange" :current-page="listQuery.pageNo" :page-size="20" layout="total, prev, pager, next, jumper" :total="total">
                    </el-pagination>
                </div>
            </div>
        </div>

        <div class="segment statistics">
            <div class="sjb-foot-button">
                <el-button type="primary" size="small" @click="saveForm">提交</el-button>
                <el-button size="small" @click="backStep">返回</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import common from "@/utils/common";
import { fetchForm, getMaintain, saveMaintain } from "@/api/project";
import { parseTime } from "@/utils";
import sjbtextarea from '@/components/sjbTextarea/index.vue';

export default {
    components: {
        sjbtextarea
    },
    data() {
        return {
            proStateList:[],
            itemList:[],
            filter: {
                projectName:  "",
                remarks:  "",
                changeTime: "",
                projectState:  "",
            },
            total:null,
            listQuery: {
                projectId:this.$route.query.key,
                pageNo: 1,
                pageSize: 20
            }
        };
    },

    methods: {
        handleCurrentChange(val) {
            this.listQuery.pageNo = val;
            this.getListData();
            this.listLoading = false;
        },
        getListData(){
            getMaintain(this.listQuery).then(res=>{
                if(res.status == 0){
                    res.data.list.forEach((item,index) => {
                        item.index = index + 1;
                    });
                    this.itemList = res.data.list;
                    this.total = res.data.total;
                }
            })
        },
        saveForm() {
            this.filter = {
                ...this.filter,
                projectId : this.$route.query.key
            };
            if(this.vali()){
                saveMaintain({
                    ...this.filter,
                    changeTime:common.timeParse(this.filter.changeTime)
                }).then(res => {
                    this.confirmDialog = false;
                    if(res.status ==0){
                        this.$message({
                            message: res.message,
                            type: "success"
                        });
                        this.$router.go(-1)
                    }
                });
            }
            
        },
        backStep() {
            this.$router.go(-1)
        },
        vali(){
            var flag = true;
            if(!this.filter.projectState){
                this.$message({
                    message: '请选择项目状态！',
                    type: "warning"
                })
                flag = false;
            }else if(!this.filter.changeTime){
                this.$message({
                    message: '请选择状态变更日期！',
                    type: "warning"
                })
                flag = false;
            }
            return flag
        }
    },
    created() {
        if (this.$route.query.key) {
            this.showNum = true;
            fetchForm({
                id: this.$route.query.key
            }).then(res => {
                this.filter.projectName = res.data.projectName;
            });
        }
        this.getListData()
    },
    mounted() {
        //下拉列表数据转换
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
        this.proStateList = selectDic(dicList, "project_state");
    }
};
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
