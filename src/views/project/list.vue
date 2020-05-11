<template>
    <div class="sjb-container calendar-list-container">
        <div class="filter-container">
            <div class="toolbar-item">
                <span class="item-label">项目名称：</span>
                <el-input @keyup.enter.native="handleFilter" style="width: 150px;" placeholder="请输入项目名称" class="filter-item" v-model.trim="listQuery.projectName">
                </el-input>
            </div>
            <div class="toolbar-item">
                <span class="item-label">项目状态：</span>
                <el-select clearable style="width: 120px" class="filter-item" v-model="listQuery.projectState" placeholder="请选择">
                    <el-option v-for="item in projectState" :key="item.value" :label="item.name" :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="toolbar-item">
                <span class="item-label">企业编号：</span>
                <el-input @keyup.enter.native="handleFilter" style="width: 150px;" class="filter-item" placeholder="请输入企业编号"  v-model.trim="listQuery.holderCode">
                </el-input>
            </div>
            <div class="toolbar-item">
                <span class="item-label">成员角色：</span>
                <el-select clearable style="width: 120px" class="filter-item" v-model="listQuery.leaderType" placeholder="请选择">
                    <el-option v-for="item in leaderTypeList" :key="item.id" :label="item.roleName" :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <div class="toolbar-item">
                <span class="item-label">成员姓名：</span>
                <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="请输入负责人"  v-model.trim="listQuery.leaderName">
                </el-input>
            </div>
            <div class="toolbar-item">
                <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
                <el-button class="filter-item" type="warning" v-waves icon="el-icon-refresh" @click="restListQuery(restCallback)">重置</el-button>
                <el-button v-if="ids.indexOf('inforManage-projectList-addBtn')!==-1" class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">新建项目</el-button>
            </div>
            <div class="toolmore-control">
                <el-button icon="el-icon-arrow-up" v-if="toolexpand" class="toolmore-control-btn" @click="toolexpand = false">收起</el-button>
                <el-button icon="el-icon-arrow-down" v-else class="toolmore-control-btn" @click="toolexpand = true">展开</el-button>
            </div>
            <el-collapse-transition>
                <div v-show="toolexpand">
                    <div class="toolbar-row">
                        <div class="toolbar-item">
                            <span class="item-label">项目类别：</span>
                            <el-select clearable style="width: 120px" class="filter-item" v-model="listQuery.projectType" placeholder="请选择">
                                <el-option v-for="item in proTypeList" :key="item.value" :label="item.name" :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="toolbar-item">
                            <span class="item-label">时间类型：</span>
                            <el-select style="width: 120px" class="filter-item" v-model="listQuery.timeType" placeholder="请选择">
                                <el-option v-for="item in timeTypeOption" :key="item.value" :label="item.name" :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="toolbar-item">
                            <span class="item-label">时间：</span>
                            <el-date-picker v-model="listQuery.timeRange" type="daterange" class="filter-item" style="width:287px" placeholder="选择日期范围" :picker-options="pickerOptions">
                            </el-date-picker>
                        </div>
                        <Department type="list" @on-confirm="depConfirm" :Dvalue="listQuery.officeName" :clearCheck ="clearCheck"></Department>
                    </div>
                </div>
            </el-collapse-transition>
        </div>
        <div class="filter-container">
            <div class="toolbar-item">
                <el-button v-if="ids.indexOf('inforManage-projectList-moveBtn')!==-1" class="filter-item" type="primary" @click="moveProject">批量移动项目</el-button>
            </div>
        </div>
        <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%"  @selection-change="handleSelectionChange">
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column align="center" label="项目编号"  width="220px">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.projectCode">{{scope.row.projectCode}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="项目名称"  width="220px">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.projectName">{{scope.row.projectName}}</span>
                </template>
            </el-table-column>
            <el-table-column width="110px" align="center" label="项目类型">
                <template slot-scope="scope">
                    <span>{{scope.row.projectTypeName}}</span>
                </template>
            </el-table-column>
            <el-table-column label="归属部门" align="center"  width="220px">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.officeName">{{scope.row.officeName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="客户名称">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.custInfoName">{{scope.row.custInfoName}}</span>
                </template>
            </el-table-column>
            <el-table-column width="110px" align="center" label="项目状态">
                <template slot-scope="scope">
                    <span>{{scope.row.projectStateName}}</span>
                </template>
            </el-table-column>
            <el-table-column width="140px" label="计划上线日期" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.onlinePlanTime | stamp2TextDate}}</span>
                </template>
            </el-table-column>
            <el-table-column width="140px" label="更新时间" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.updateTime | stamp2TextDateFull}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" class-name="small-padding fixed-width"  width="250px">
                <template slot-scope="scope">
                    <el-button v-if="ids.indexOf('inforManage-projectList-detailBtn')!==-1" type="primary" size="mini" @click="handleDetail(scope.row)">详情</el-button>
                    <el-button v-if="ids.indexOf('inforManage-projectList-editBtn')!==-1" type="primary" size="mini" @click="handleUpdate(scope.row)">修改</el-button>
                    <el-button v-if="ids.indexOf('inforManage-projectList-maintainBtn')!==-1" type="primary" size="mini" @click="maintain(scope.row)">维护管理</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="pagination-container">
            <el-pagination background  @current-change="handleCurrentChange" :current-page="pageNo" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>

        <el-dialog title="批量移动项目" :visible.sync="dialogMoveVisible" width="35%" :before-close="moveClose">
            <div class="move-item">
                <div>
                    已选择：
                </div>
                <span v-for="(item,index) in selectProject" :key="index">
                    <span class="select-item">{{item.projectName}}</span>
                </span>
            </div>
            <div class="merge-item">
                <span class="select-item" v-for="(item,index) in dynaRole" :key="index">
                    <el-checkbox v-model="item.checked" :label="item.roleName"></el-checkbox>
                </span>
                
            </div>
            <div class="move-select">
                
                <div class="move-item" v-for="(item,index) in dynaRole" :key="index">
                    <span class="item-label">{{item.roleName}}</span>
                    <el-select 
                        style="width: 300px" 
                        class="filter-item" 
                        v-model="item.selectId"
                        :disabled="!item.checked"
                        filterable
                        placeholder="请选择">
                        <el-option v-for="item in memberList" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <!-- <div class="move-item">
                    <span class="item-label">项目管理负责人：</span>
                    <el-select 
                        style="width: 300px" 
                        class="filter-item" 
                        v-model="projectManagerId"
                        :disabled="!projectChecked"
                        filterable
                        placeholder="请选择项目管理负责人">
                        <el-option v-for="item in memberList" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </div> -->
                <!-- <div class="move-item">
                    <span class="item-label">商务助理：</span>
                    <el-select 
                        style="width: 300px" 
                        class="filter-item" 
                        v-model="businessAssistantId"
                        :disabled="!businessChecked"
                        filterable
                        placeholder="请选择商务助理">
                        <el-option v-for="item in memberList" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="move-item">
                    <span class="item-label">VIP客服：</span>
                    <el-select 
                        style="width: 300px" 
                        class="filter-item" 
                        v-model="vipCustomerId"
                        :disabled="!vipChecked"
                        filterable
                        placeholder="请选择VIP客服">
                        <el-option v-for="item in memberList" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="move-item">
                    <span class="item-label">清结算：</span>
                    <el-select 
                        style="width: 300px" 
                        class="filter-item" 
                        v-model="accountLeaderId"
                        :disabled="!accountChecked"
                        filterable
                        placeholder="请选择清结算">
                        <el-option v-for="item in memberList" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </div> -->
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmMove">确认</el-button>
                <el-button @click="moveCancel">取消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import common from "@/utils/common";
import Department from "@/components/Department";
import { fetchList,getMember,moveProjects,getRoleDrop} from "@/api/project";
import waves from "@/directive/waves"; // 水波纹指令
import { parseTime } from "@/utils";
import { toJS, fromJS, Map, List } from 'immutable';
import listQueryMix from '../../mixins/listQuery.mix'
import { mapState } from "vuex";

export default {
    directives: {
        waves
    },
    components: {
        Department
    },
    mixins: [listQueryMix],
    watch: {
        filterText(val) {
            this.$refs.tree2.filter(val);
        }
    },
    computed:{
        ...mapState({
            ids:state => state.permission.ids
        }),
    },
    data() {
        return {
            filterText: "",
            depart: "",
            treeObj: null,
            defaultProps: {
                children: "children",
                label: "name"
            },
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            },
            toolexpand: false,
            timeRange: [],
            tableKey: 0,
            list: null,
            total: null,
            timeTypeOption: [
                {
                    value: "1",
                    name: "上线时间"
                },
                {
                    value: "2",
                    name: "更新时间"
                }
            ],
            listLoading: true,
            pageNo: 1,
            pageSize: 20,
            clearCheck:false,
            listQuery: {
                timeRange:[],
                officeId: "",
                officeName: '',
                projectName: "",//项目名称
                projectType: "",
                timeType: "2",//时间类型
                projectState: "",//项目状态
                holderCode: "",//市场负责人
                applyTimeStart: "",
                applyTimeEnd: "",
                leaderType:'',
                leaderName:''
            },
            proTypeList: [],
            projectState: [],
            leaderTypeList:[],
            treeData: [],
            dialogFormVisible: false,

            memberList:[],
            selectProject:[],
            dialogMoveVisible:false,
            dynaRole:[],
            // marketChecked:false,
            implyChecked:false,
            projectChecked:false,
            businessChecked:false,
            vipChecked:false,
            accountChecked:false,
            accountLeaderId:'',
            businessAssistantId:'',
            projectManagerId:'',
            impleLeaderId:'',
            vipCustomerId:''
        };
    },
    created() {
        this.$$queryStub = this.$$listQuery;
        this.getList();
        this.listLoading = false;
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
        getRoleDrop("2").then(res=>{
            if(res.code == 200){
                this.leaderTypeList = res.data
            }
        })
        
    },
    methods: {
        depConfirm(data){
            if(data){
                this.listQuery.officeId = data.id;
                this.listQuery.officeName = data.name;
            }else{
                this.listQuery.officeId = "";
                this.listQuery.officeName = "";
            }
            
        },
        handleSelectionChange(val){
            this.selectProject = val;
        },
        moveProject(){
            if(this.selectProject.length<1){
                this.$message({
                    message:'请选择要移动的项目！',
                    type:"warning"
                })
                return
            }
            getRoleDrop("1").then(res=>{
                if(res.code == 200){
                    this.dynaRole = res.data.map(item=>{
                        return{
                            ...item,
                            selectId:"",
                            checked:false
                        }
                    });

                }
            })
            this.dialogMoveVisible = true;
            getMember({}).then(res=>{
                if(res.code == 200){
                    //列表是非离职人员
                    this.memberList = res.data.filter((item)=>{
                        return item.userStatus == '1'
                    })
                }
            })
        },
        moveClose(){
            
        },
        confirmMove(){

            let projectIds = [];
            this.selectProject.forEach(item=>{
                projectIds.push(item.id)
            })
            let moveDetail = [];
            this.dynaRole.forEach(item=>{
                if(item.checked){
                    moveDetail.push({id:item.id,userId:item.selectId})
                }
            })
            moveProjects({
                projectIds:projectIds,
                moveDetail:moveDetail
            }).then(res=>{
                if(res.code == 200){
                    this.moveClose();
                    this.$message({
                        message: res.message,
                        type: "success"
                    });
                    this.getList()
                }
            })
        },
        moveCancel(){
            this.dialogMoveVisible = false;
            this.implyChecked=false;
            this.projectChecked=false;
            this.businessChecked=false;
            this.vipChecked=false;
            this.accountChecked=false;
            this.accountLeaderId='';
            this.businessAssistantId='';
            this.projectManagerId='';
            this.impleLeaderId='';
            this.vipCustomerId=''
        },
        getList() {
            this.listLoading = true;
            var postData = this.reduceParams(this.$$queryStub);
            fetchList({
                ...postData,
                pageNo:this.pageNo,
                pageSize:this.pageSize,
            }).then(res => {
                this.list = res.data.list;
                this.total = res.data.total;
                this.listLoading = false;
            });
        },
        reduceParams($$imData) {
            if (!$$imData || $$imData.size == 0) return {};
            const $$postData = $$imData
                .set('applyTimeStart', common.rangeObjToTimestamp($$imData.get('timeRange').toJS()).applyTimeStart)
                .set('applyTimeEnd', common.rangeObjToTimestamp($$imData.get('timeRange').toJS()).applyTimeEnd)
                .delete('timeRange')
            return $$postData.toJS();
        },
        restCallback(){
            
        },
        handleFilter() {
            this.pageNo = 1;
            if(!this.listQuery.timeRange){
                this.listQuery.timeRange = []
            }
            if(!this.listQuery.leaderName&&this.listQuery.leaderType || this.listQuery.leaderName&&!this.listQuery.leaderType){
                this.$message({
                    message: "负责人类型和负责人名称需配合使用!!",
                    type: "warning"
                });
                return
            }
            this.$$queryStub = fromJS(this.listQuery);
            this.getList();
            this.listLoading = false;
        },
        handleCurrentChange(val) {
            this.pageNo = val;
            this.getList();
            this.listLoading = false;
        },
        handleCreate() {
            this.$router.push({ path: "/inforManage/projectForm" });
        },
        createData() {
            if (this.treeObj.pId == "1" && this.treeObj.children.length != "0") {
                this.$message({
                    message: "请选择归属部门！",
                    type: "warning"
                });
                return;
            }
            this.dialogFormVisible = false;
        },
        handleUpdate(row) {
            this.$router.push({
                path: "/inforManage/projectForm",
                query: { key: row.id }
            });
        },
        handleDetail(row){
            this.$router.push({
                path: "/inforManage/projectDetail",
                query: { key: row.id }
            });
        },
        maintain(row){
            this.$router.push({
                path:"/inforManage/maintainProject",
                query:{key:row.id}
            })
        }
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