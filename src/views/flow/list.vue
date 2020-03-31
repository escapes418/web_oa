<template>
    <div class="sjb-container calendar-list-container">
        <div class="filter-container">
            <div class="toolbar-item">
                <span class="item-label">流程名称：</span>
                <el-input @keyup.enter.native="handleFilter" style="width: 220px;" class="filter-item" placeholder="流程名称" v-model.trim="listQuery.name">
                </el-input>
            </div>
            <div class="toolbar-item">
                <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
                <el-button class="filter-item" type="warning" icon="el-icon-delete" @click="restListQuery(restCallback)">重置</el-button>
                <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="dialogAdd=true">新建流程</el-button>
            </div>
        </div>
        <el-table :data="list" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
            <el-table-column align="center" label="流程名称">
                <template slot-scope="scope">
                    <span>{{scope.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="流程标识">
                <template slot-scope="scope">
                    <a>{{scope.row.key}}</a>
                </template>
            </el-table-column>
            <el-table-column width="120px" align="center" label="版本号">
                <template slot-scope="scope">
                    <a>{{scope.row.version}}</a>
                </template>
            </el-table-column>
            <el-table-column width="200px" align="center" label="创建时间">
                <template slot-scope="scope">
                    <span>{{scope.row.createTime | stamp2TextDate}}</span>
                </template>
            </el-table-column>
            <el-table-column width="200px" align="center" label="更新时间">
                <template slot-scope="scope">
                    <span>{{scope.row.lastUpdateTime | stamp2TextDate}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button type="danger" size="mini" @click="showDel(scope.row)">删除</el-button>
                    <el-button size="mini" @click="showEdit(scope.row)">编辑</el-button>
                    <el-button type="success" size="mini" @click="showDeploy(scope.row)">部署</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="新建流程" :visible.sync="dialogAdd" width="25%">
            <div class="move-select">
                <div class="move-item">
                    <RedStar label="流程名称：" :required="true">
                        <el-input type="text" placeholder="请输入" style="width:250px;" v-model.trim="postData.name"></el-input>
                    </RedStar>
                </div>
                <div class="move-item">
                    <RedStar label="流程标识：" :required="true">
                        <el-select clearable v-model="postData.key" placeholder="请选择" style="width:250px;">
                            <el-option v-for="item in processList" :label="item.name" :value="item.value" :key="item.value">
                            </el-option>
                        </el-select>
                        <div class="move-remarks">流程的英文标识，如：expense_proc</div>
                    </RedStar>
                </div>
                <div class="move-item">
                    <RedStar label="流程描述：">
                        <sjbtextarea type="textarea"  :rows="4" textStyle="width:250px" placeholder="请输入" v-model.trim="postData.description" :max="200"></sjbtextarea>
                    </RedStar>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmAdd">确认</el-button>
                <el-button @click="dialogAdd = false">取消</el-button>
            </span>
        </el-dialog>
        <el-dialog title="系统提示？" width="25%" :visible.sync="dialogDel">
            <span>确认删除该流程名称吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="delBtn">确认</el-button>
                <el-button @click="dialogDel = false">取消</el-button>
            </span>
        </el-dialog>
        <el-dialog title="系统提示？" width="25%" :visible.sync="dialogDeploy">
            <span>确认部署该流程名称吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="deployBtn">确认</el-button>
                <el-button @click="dialogDeploy = false">取消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getFlow, createFlow, delFlow, deployFlow } from '@/api/g6'
import { toJS, fromJS, Map, List } from 'immutable';
import listQueryMix from '../../mixins/listQuery.mix'
import sjbtextarea from '@/components/sjbTextarea';
import RedStar from '@/components/RedStar/RedStar.vue';

export default {
    components:{
        sjbtextarea,
        RedStar
    },
    mixins: [listQueryMix],
    data() {
        return {
            list: [],
            listQuery: {
                name:"",
            },

            dialogAdd:false,
            dialogDel:false,
            dialogDeploy:false,
            postData:{
                name:"",
                key:"",
                description:""
            },
            id:"",
            processList:[]
        }
    },
    created() {
        this.$$queryStub = this.$$listQuery;
        this.getList();
    },
    mounted(){
        let dicList = JSON.parse(localStorage.getItem("web_oa_dicList"));
        function selectDic(arr, type) {
            let temp = [];
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].type == type) {
                    temp.push(arr[i]);
                };
            }
            return temp;
        }
        this.processList = selectDic(dicList, "process_key");
    },
    methods: {
        getList() {
            var postData = this.$$queryStub.toJS();
            getFlow({
                ...postData
            }).then(res => {
                this.list = res.data;
            })
        },
        restCallback() {
                // 用来补充默认rest不足的问题
        },
        handleFilter() {
            this.$$queryStub = fromJS(this.listQuery);
            this.getList()
        },
        showEdit(row){
            this.$router.push({
                path:'/config/flowForm',
                query: { key: row.id }
            })
        },
        showDel(row){
            this.dialogDel = true;
            this.id = row.id
        },
        showDeploy(row){
            this.dialogDeploy = true;
            this.id = row.id;
        },
        deployBtn(){
            deployFlow(this.id).then(res=>{
                if(res.code == 200){
                    this.$message({
                        message: res.message,
                        type: "success"
                    })
                    this.dialogDeploy = false;

                }
            })
        },
        delBtn(){
            delFlow(this.id).then(res=>{
                if(res.code == 200){
                    this.$message({
                        message: res.message,
                        type: "success"
                    })
                    this.dialogDel = false;
                    this.getList()
                }
            })
        },
        confirmAdd(){
            if(!this.postData.name){
                this.$message({
                    message:'请填写流程名称！',
                    type:"warning"
                })
                return
            }
            if(!this.postData.key){
                this.$message({
                    message:'请填写流程标识！',
                    type:"warning"
                })
                return
            }
            createFlow(
                this.postData
            ).then(res=>{
                if(res.code == 200){
                    this.$message({
                        message: res.message,
                        type: "success"
                    })
                    this.dialogAdd = false;
                    this.getList()
                }
            })
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.move-item{
    padding: 10px;
    background: #f2f7fa;
    color: #343434;
    .item-label{
        float: left;
        width: 100px;
    }
    .move-remarks{
        font-size: 12px;
        color:rgb(204,196,214)
    }
    .filter-item{
        display: inline-block;
        margin-left: 30px
    }
}
.select-item{
    margin-right: 5px
}
.toolbar-row{
  margin: 5px 0 0 0 
}

.ignore-detail {
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
}

</style>