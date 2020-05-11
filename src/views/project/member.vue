<template>
    <div class="segment statistics">
        <div class="segment-header">
            长期成员
        </div>
        <div class="segment-area">
            <div class="sjb-container calendar-list-container">
                <div class="filter-container">
                    <div class="toolbar-item">
                        <el-button class="filter-item" type="primary" @click="addMember">添加成员</el-button>
                        <el-button class="filter-item" type="primary" @click="modifyRole">修改角色</el-button>
                    </div>
                </div>
                <el-table :data="longList" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%"  @selection-change="handleSelectionChange">
                    <el-table-column
                        type="selection"
                        width="55px">
                    </el-table-column>
                    <el-table-column align="center" label="成员姓名"  width="220px">
                        <template slot-scope="scope">
                            <span class="ignore-detail" :title="scope.row.memberName">{{scope.row.memberName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="项目成员角色">
                        <template slot-scope="scope">
                            <span class="ignore-detail" :title="scope.row.projectRoleName">{{scope.row.projectRoleName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column width="110px" align="center" label="所属部门">
                        <template slot-scope="scope">
                            <span>{{scope.row.memberOfficeName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="岗位" align="center"  width="220px">
                        <template slot-scope="scope">
                            <span class="ignore-detail" :title="scope.row.memberPostName">{{scope.row.memberPostName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="操作" class-name="small-padding fixed-width">
                        <template slot-scope="scope">
                            <el-button v-if="scope.row.isDeletable" type="warning" size="mini" @click="handleDel(scope.row)">移除</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <el-dialog title="添加成员" :visible.sync="dialogAdd" width="35%">
                    <div class="move-select">
                        <div class="move-item">
                            <span class="item-label">成员角色：</span>
                            <el-select 
                                style="width: 300px" 
                                class="filter-item" 
                                v-model="projectRoleId"
                                filterable
                                @change="roleChange"
                                placeholder="请选择成员角色">
                                <el-option v-for="item in roleList" :key="item.id" :label="item.roleName" :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="move-item">
                            <span class="item-label">部门人员：</span>
                            <div class="filter-item">
                                <el-input placeholder="输入关键字进行过滤" v-model="filterTree" style="width:300px;margin-bottom:10px"></el-input>
                                <el-tree node-key="id" :data="treeData" show-checkbox check-strictly :props="defaultProps" @check-change="handleClick"  :filter-node-method="memberNode" ref="tree"></el-tree>
                            </div>
                        </div>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="confirmAdd">确认</el-button>
                        <el-button @click="addCancel">取消</el-button>
                    </span>
                </el-dialog>
                <el-dialog title="修改成员角色" :visible.sync="dialogModify" width="35%">
                    <div class="move-select">
                        <div class="move-item">
                            <span class="item-label">成员角色：</span>
                            <el-select 
                                style="width: 300px" 
                                class="filter-item" 
                                v-model="modifyRoleId"
                                filterable
                                placeholder="请选择成员角色">
                                <el-option v-for="item in roleList" :key="item.id" :label="item.roleName" :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="confirmModify">确认</el-button>
                        <el-button @click="modifyCancel">取消</el-button>
                    </span>
                </el-dialog>
                <el-dialog title="系统提示？" width="25%" :visible.sync="dialogDel">
                    <span>确认删除{{roleName}}吗？</span>
                    <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="delBtn">确认</el-button>
                        <el-button @click="dialogDel = false">取消</el-button>
                    </span>
                </el-dialog>
            </div>
        </div>
        <div class="segment-header">
            动态成员
        </div>
        <div class="segment-area">
            <el-table :data="dyncList" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
                <el-table-column align="center" label="成员姓名"  width="220px">
                    <template slot-scope="scope">
                        <span class="ignore-detail" :title="scope.row.memberName">{{scope.row.memberName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="项目成员角色">
                    <template slot-scope="scope">
                        <span class="ignore-detail" :title="scope.row.projectRoleName">{{scope.row.projectRoleName}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="110px" align="center" label="所属部门">
                    <template slot-scope="scope">
                        <span>{{scope.row.memberOfficeName}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="岗位" align="center"  width="220px">
                    <template slot-scope="scope">
                        <span class="ignore-detail" :title="scope.row.memberPostName">{{scope.row.memberPostName}}</span>
                    </template>
                </el-table-column>
                
                <el-table-column label="撤离时间" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.evacuationTime | stamp2TextDateFull}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import common from "@/utils/common";
import Department from "@/components/Department";
import { getRoleDrop,getMemberList,addMember,modifyMember,delMember } from "@/api/project";
import { parseTime } from "@/utils";
import { toJS, fromJS, Map, List } from 'immutable';
import listQueryMix from '../../mixins/listQuery.mix'
import { mapState } from "vuex";

export default {
    components: {
        Department
    },
    mixins: [listQueryMix],
    props:{
        projectId:{
            type:String,
            default:""
        }
    },
    watch: {
        filterTree(val) {
            this.$refs.tree.filter(val);
        },
    },
    data() {
        return {
            dialogAdd:false,

            dialogDel:false,
            roleName:"",

            longList:[],
            dyncList:[],
            roleList:[{
                id:"1",
                roleName:"项目负责人",
                isPrincipal:true,
            },{
                id:"15",
                roleName:"清结算",
                isPrincipal:false,
            }],
            projectRoleId:"",
            canMulti:false,

            dialogModify:false,
            modifyRoleId:"",
            selectMember:[],

            filterTree: "",
            treeData: [],
            defaultProps: {
                children: "children",
                label: "name"
            },
            memberData:[],
        };
    },
    created() {
        this.getList();
        getRoleDrop().then(res=>{
            this.roleList = res.data
        })
    },
    mounted() {
        //获取字典
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
        this.proTypeList = selectDic(dicList, "project_type");
        this.projectState = selectDic(dicList, "project_state");
        this.leaderTypeList = selectDic(dicList, "leader_type");

        let memberList = JSON.parse(localStorage.getItem("web_oa_member"));
        var newArr = [];
        let len = memberList.length;
        function filterResign (memberList) {
            let ids = [];
            memberList.forEach(item=>{
                ids.push(item.pId)
                if(item.userInfo.length){
                    let tem = item.userInfo;
                    tem = tem.filter(i=>{
                        return i.status=="1"
                    })
                    item.userInfo = tem;
                }
            })

            ids = Array.from(new Set(ids))
            for(var i = memberList.length - 1; i >= 0; i--){
                if(ids.indexOf(memberList[i].id)=="-1"&&memberList[i].type=="1"&&memberList[i].userInfo.length=="0"){
                    memberList.splice(i,1)
                }
            }
        }
        filterResign(memberList);
        while(len != memberList.length){
            len = memberList.length
            filterResign(memberList);
        }

        common.transToTree(memberList, newArr);
        common.mapAndAddChildren(newArr);
        this.treeData = newArr;
    },
    methods: {
        handleSelectionChange(val){
            this.selectMember = val;
        },
        addMember(){
            this.dialogAdd = true
        },
        confirmAdd(){
            var memberUserIdList = []
            if(!this.projectRoleId){
                this.$message({
                    message: "请选择需要添加成员角色",
                    type: "warning"
                });
                return
            }
            if(this.memberData.length>0){
                this.memberData.forEach(data=>{
                    memberUserIdList.push(data.id)
                })
                addMember({
                    memberUserIdList:memberUserIdList,
                    projectRoleId:this.projectRoleId,
                    projectId:this.projectId
                }).then(res=>{
                    if(res.code == 200){
                        this.$message({
                            message: res.message,
                            type: "success"
                        });
                        this.getList();
                        this.addCancel();
                    }
                })
            }else{
                this.$message({
                    message: "请添加部门人员！",
                    type: "warning"
                });
            }
        },
        addCancel(){
            this.memberData.forEach(data=>{
                this.$refs.tree.setChecked(data,false);
            })
            this.memberData = [];
            this.dialogAdd = false;
            this.projectRoleId = "";
        },
        modifyRole(){
            if(this.selectMember.length>0){
                let key = true
                this.selectMember.some(item=>{
                    if(item.projectRoleType == 1){
                        this.$message({
                            type:"warning",
                            message:"选择修改角色的成员包含系统角色，无法修改，请重新选择！"
                        })
                        key = false;
                        return true
                    }
                })
                if(key){
                    this.dialogModify = true;
                }
            }else{
                this.$message({
                    message: "请选择需要修改角色的成员",
                    type: "warning"
                });
            }
        },
        confirmModify(){
            var memberIdList = [];
            this.selectMember.forEach(data=>{
                memberIdList.push(data.id)
            })
            modifyMember({
                memberIdList:memberIdList,
                projectRoleId:this.modifyRoleId
            }).then(res=>{
                if(res.code == 200){
                    this.$message({
                        message: res.message,
                        type: "success"
                    });
                    this.getList();
                    this.modifyRoleId = "";
                    this.dialogModify = false;
                }
            })
        },
        modifyCancel(){
            this.modifyRoleId = "";
            this.dialogModify = false;
        },
        handleDel(row){
            this.id	= row.id	
            this.roleName = row.roleName;
            this.dialogDel = true;
        },
        delBtn(){
            delMember(this.id).then(res=>{
                if(res.code == 200){
                    this.$message({
                        message: res.message,
                        type: "success"
                    });
                    this.getList();
                    this.dialogDel = false;
                }
            })
        },
        memberNode(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        roleChange(val){
            this.roleList.map(item=>{
                if(item.id == val){
                    this.canMulti = item.isPrincipal
                }
            })
            this.memberData.forEach(data=>{
                this.$refs.tree.setChecked(data,false);
            })
            this.memberData = []
        },
        handleClick(data,select,childSelect) {
            let index = this.memberData.indexOf(data)
            if(this.canMulti){//多选
                if(select){
                    if(data.type =='2'&&data.status == '1'){
                        this.memberData.push(data)
                    }else{
                        this.$message({
                            message: "该节点不可选！",
                            type: 'warning'
                        })
                        this.$refs.tree.setChecked(data,false);
                    } 
                }else{
                    if(data.type =='2'&&data.status == '1'){
                        this.memberData.splice(index,1)
                    }
                }
            }else{
                //单选
                if(index<0&&this.memberData.length ===1&&select){
                    if(data.type =='2'&&data.status == '1'){
                        this.$refs.tree.setChecked(this.memberData[0],false);
                        this.memberData = [];
                        this.$refs.tree.setChecked(data,true);
                        this.memberData.push(data)
                    }else{
                        this.$message({
                            message: "该节点不可选！",
                            type: 'warning'
                        })
                        this.$refs.tree.setChecked(data,false);
                        this.$refs.tree.setChecked(this.memberData[0],true);
                        return
                    }
                }else if(this.memberData.length ===0&&select){
                    if(data.type =='2'&&data.status == '1'){
                        this.memberData = [];
                        this.memberData.push(data)
                    }else{
                        this.$message({
                            message: "该节点不可选！",
                            type: 'warning'
                        })
                        this.$refs.tree.setChecked(data,false);
                        return
                    }
                }else if(index>=0&&this.memberData.length===1&&!select){
                    this.memberData = []
                }
            }
            
        },
        getList() {
            getMemberList(this.projectId).then(res => {
                this.longList = res.data.longTermMemberList;
                this.dyncList = res.data.dynamicMemberList;
            });
        },
    }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.toolbar-row {
    margin: 5px 0 0 0;
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
.merge-item{
    margin: 5px;
}
.select-item{
    margin-right: 5px
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

.ignore-detail {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
}
</style>