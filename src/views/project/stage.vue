<template>
<div class="sjb-container calendar-list-container">
        <div class="filter-container">
            <div class="toolbar-item">
                <el-button class="filter-item" type="primary" @click="addStage">新增阶段</el-button>
            </div>
        </div>
        <el-table :data="list" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
            <el-table-column align="center" label="阶段名称">
                <template slot-scope="scope">
                    <template v-if="scope.row.edit">
                        <el-input v-model="scope.row.stageName" class="edit-input" size="small" />
                    </template>
                    <span  v-else class="ignore-detail" :title="scope.row.stageName">{{scope.row.stageName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="阶段描述">
                <template slot-scope="scope">
                    <template v-if="scope.row.edit">
                        <el-input v-model="scope.row.stageDesc" class="edit-input" size="small" />
                    </template>
                    <span  v-else class="ignore-detail" :title="scope.row.stageDesc">{{scope.row.stageDesc}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <template v-if="scope.row.edit">
                        <el-button type="primary" size="mini" @click="handleSave(scope.row)">保存</el-button>
                        <el-button size="mini" @click="handleCancel(scope.row)">取消</el-button>
                    </template>
                    <template v-else>
                        <el-button type="primary" size="mini" @click="handleModify(scope.row)">编辑</el-button>
                        <el-button type="warning" size="mini" @click="handleDel(scope.row)">移除</el-button>
                    </template>
                </template>
            </el-table-column>
        </el-table>

        <div class="pagination-container">
            <el-pagination background  @current-change="handleCurrentChange" :current-page="pageNum" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>

        <el-dialog title="系统提示？" width="25%" :visible.sync="dialogDel">
            <span>确认删除{{stageName}}吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="delBtn">确认</el-button>
                <el-button @click="dialogDel = false">取消</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { getStage,saveStage,pushStage,delStage,checkDel } from "@/api/project";
export default {
    data(){
        return{
            pageNum:0,
            pageSize:20,
            total:0,
            list:[
            // {
            //     id:"1",
            //     stageName:"华为",
            //     stageDesc:"中国品牌"
            // },{
            //     id:"2",
            //     stageName:"苹果",
            //     stageDesc:"美国品牌"
            // }
            ],

            stageName:"",
            dialogDel:false,
            id:""
        }
    },
    created(){
        this.getList()
    },
    methods:{
        addStage(){
            this.list.push({
                id:"",
                edit:true,
                stageName:"",
                stageDesc:"",
                originStageName:"",
                originStageDesc:""
            })
        },
        getList(){
            // this.list = this.list.map(item=>{
            //     return {
            //         ...item,
            //         edit:false,
            //         originStageName:item.stageName,
            //         originStageDesc:item.stageDesc
            //     }
            // })
            getStage({
                projectId:this.$route.query.key,
                pageNum:this.pageNum,
                pageSize:this.pageSize
            }).then(res=>{
                if(res.code == 200){
                    this.total = res.data.total
                    this.list = res.data.list.map(item =>{
                        return {
                            ...item,
                            edit:false,
                            originStageName:item.stageName,
                            originStageDesc:item.stageDesc
                        }
                    })
                }
            })
        },
        handleModify(row){
            row.edit = true
        },
        handleSave(row){
            if(row.id){
                saveStage(row.id,{
                    stageName:row.stageName,
                    stageDesc:row.stageDesc
                }).then(res=>{
                    if(res.code == 200){
                        this.getList()
                    }
                })
            }else{
                pushStage({
                    projectId:this.$route.query.key,
                    stageName:row.stageName,
                    stageDesc:row.stageDesc
                }).then(res=>{
                    if(res.code == 200){
                        this.getList()
                    }
                })
            }
            
        },
        handleCancel(row){
            if(row.id){
                row.edit = false;
                row.stageName = row.originStageName;
                row.stageDesc = row.originStageDesc;
            }else{
                this.list.splice(this.list.length-1,1)
            }
            
        },
        handleDel(row){
            checkDel(row.id).then(res=>{
                if(res.data.isRelation == 0){
                    this.dialogDel = true
                    this.id = row.id
                    this.stageName = row.stageName
                }else{
                    this.$message({
                        type:"error",
                        message:res.data.resultMsg
                    })
                }
            })
        },
        delBtn(){
            delStage(this.id).then(res=>{
                if(res.code == 200){
                    this.$message({
                        type:"success",
                        message:res.message
                    })
                    this.dialogDel = false;
                    this.getList()
                }
            })
        },
        handleCurrentChange(){
            
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>