<template>
    <div class="sjb-container calendar-list-container">
        <div class="filter-container">
            <div class="toolbar-item">
                <span class="item-label">标题/描述/进度状态：</span>
                <el-input @keyup.enter.native="handleFilter" style="width: 220px;" class="filter-item" placeholder="标题/描述/进度状态" v-model.trim="listQuery.titleOrDescOrProgress">
                </el-input>
            </div>
            <div class="toolbar-item">
                <span class="item-label">人员类型：</span>
                <el-select clearable filterable style="width: 220px" class="filter-item" v-model="listQuery.personType" placeholder="请选择人员类型">
                    <el-option v-for="item in memberType" :key="item.value" :label="item.name" :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="toolbar-item">
                <span class="item-label">人员/部门：</span>
                <div class="item-value" @click="dialogDepartVisible = !dialogDepartVisible">
                    <i class="el-icon-search" style="color:#bfbfbf"></i>
                    <span style="color:#606266">{{departName}}</span>
                </div>
            </div>
            <div class="toolbar-item">
                <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
                <el-button class="filter-item" type="warning" v-waves icon="el-icon-delete" @click="restListQuery(restCallback)">重置</el-button>
                <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">新建协作</el-button>
            </div>
            <div class="toolmore-control">
                <div class="toolbar-item">
                    <el-button class="filter-item" type="primary" v-waves icon="el-icon-download" @click="dialogDown = true">导出Excel</el-button>
                </div>
                <el-button icon="el-icon-arrow-up" v-if="toolexpand" class="toolmore-control-btn" @click="toolexpand = false">收起</el-button>
                <el-button icon="el-icon-arrow-down" v-else class="toolmore-control-btn" @click="toolexpand = true">展开</el-button>
            </div>
            <el-collapse-transition>
                <div v-show="toolexpand">
                    <div class="toolbar-row">
                        <div class="toolbar-item">
                            <span class="item-label">状态变更时间：</span>
                            <el-date-picker v-model="listQuery.timeRange" type="daterange" class="filter-item" style="width:287px" placeholder="选择日期范围"  :picker-options="pickerOptions">
                            </el-date-picker>
                        </div>
                        <div class="toolbar-item">
                            <span class="item-label">类型：</span>
                            <el-select clearable class="filter-item" filterable v-model="listQuery.type" placeholder="请选择类型名称" style="width:220px;" >
                                <el-option v-for="item in typeList" :label="item.typeName" :value="item.id" :key="item.id">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="toolbar-item">
                            <span class="item-label">标签：</span>
                            <el-select clearable class="filter-item" filterable multiple v-model="listQuery.label" placeholder="请选择标签名称" style="width:220px;">
                                <el-option v-for="item in labelList" :label="item.labelName" :value="item.id" :key="item.id">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
            </el-collapse-transition>
        </div>

        <div class="filter-container">
            <div class="toolbar-item">
                <el-button v-if="ids.indexOf('oa-coopList-moveBtn') !== -1" class="filter-item" type="primary" @click="moveCoop">批量移动协作</el-button>
            </div>
        </div>
        <template>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="我参与的" name="1"></el-tab-pane>
                <el-tab-pane label="我发起的" name="2"></el-tab-pane>
                <el-tab-pane label="全部" name="3"></el-tab-pane>
            </el-tabs>
        </template>
        <el-table :data="list" border fit highlight-current-row style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column align="center" label="标题">
                <template slot-scope="scope">
                    <span style="color:#409EFF;cursor: Pointer;" :title="scope.row.title"  @click="showDetail(scope.row)">{{scope.row.title}}</span>
                </template>
            </el-table-column>
            <el-table-column width="100px" align="center" label="类型">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.type">{{scope.row.type}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="发起人" width="80px">
                <template slot-scope="scope">
                    <span>{{scope.row.initiator}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="标签">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.label">{{scope.row.label.join('，')}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="进度状态">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.progressStatus">{{scope.row.progressStatus}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="当前负责人" width="100px">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.curPrincipal">{{scope.row.curPrincipal}}</span>
                </template>
            </el-table-column>
            <el-table-column width="150px" align="center" label="状态变更时间">
                <template slot-scope="scope">
                    <span>{{scope.row.statusChangeTime | stamp2TextDateFull}}</span>
                </template>
            </el-table-column>
            <el-table-column width="460px" align="center" label="操作" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="showDetail(scope.row)">详情</el-button>
                    <el-button v-if="scope.row.operationList&&scope.row.operationList.indexOf('1') !==-1"  type="primary" size="mini" @click="showComment(scope.row)">评论</el-button>
                    <el-button v-if="scope.row.operationList&&scope.row.operationList.indexOf('2') !==-1" type="primary" size="mini" @click="showPlan(scope.row)">增加进度</el-button>
                    <el-button v-if="scope.row.operationList&&scope.row.operationList.indexOf('3') !==-1"  type="primary" size="mini" @click="showCharge(scope.row)">下级负责人</el-button>
                    <el-button v-if="scope.row.operationList&&scope.row.operationList.indexOf('4') !==-1"  type="danger" size="mini" @click="showPartIn(scope.row)">编辑参与人</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="选择人员/部门" :visible.sync="dialogDepartVisible" width="25%" :center="true" @close="dialogDepartVisible = false">
            <el-input placeholder="输入关键字进行过滤" v-model="filterDepart" style="margin-bottom:10px"></el-input>
            <el-tree show-checkbox check-strictly node-key="id" :data="treeFullData" :props="defaultProps" @check-change="handleDepartClick" :filter-node-method="departNode" ref="departTree"></el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogDepartVisible = false">取消</el-button>
                <el-button type="primary" @click="selectDepart">确认</el-button>
            </div>
        </el-dialog>

        <el-dialog title="新增评论" :visible.sync="dialogComment" width="25%">
            <sjbtextarea placeholder="请输入" :rows="5" textStyle="margin-bottom:10px" v-model.trim="comment" :max="300"></sjbtextarea>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogComment = false">取消</el-button>
                <el-button type="primary" @click="selectComment">确认</el-button>
            </div>
        </el-dialog>

        <el-dialog title="选择下级负责人" :visible.sync="dialogCharge"  width="25%" :center="true">
            <el-input placeholder="输入关键字进行过滤" v-model="filterCharge" style="margin-bottom:10px"></el-input>
            <el-tree :data="treeData" :props="defaultProps" show-checkbox check-strictly node-key="id" @check-change=clickCharge :filter-node-method="chargeNode" ref="chargeTree"></el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogCharge = false">取消</el-button>
                <el-button type="primary" @click="selectCharge">确认</el-button>
            </div>
        </el-dialog>

        <el-dialog title="编辑参与人" :visible.sync="dialogPart"  width="25%" :center="true">
            <el-input placeholder="输入关键字进行过滤" v-model="filterPart" style="margin-bottom:10px"></el-input>
            <el-tree :data="treeData" :props="defaultProps" show-checkbox check-strictly node-key="id" @check-change=clickPart :filter-node-method="partNode" ref="partTree"></el-tree>
            <div class="move-item">
                <div>
                    已选择参与人：
                </div>
                <span v-for="(item,index) in partList">
                    <span class="select-item">{{item.name}}</span>
                    <span class="blank"> </span>
                </span>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogPart = false">取消</el-button>
                <el-button type="primary" @click="selectPart">确认</el-button>
            </div>
        </el-dialog>

        <el-dialog title="导出Excel" :visible.sync="dialogDown" width="25%">
            
            <!-- <div slot="footer" class="dialog-footer"> -->
            
                <el-button type="primary" @click="exportFile(1)">导出进度情况</el-button>
                <el-button type="primary" @click="exportFile(2)">导出评论</el-button>
            <!-- </div> -->
        </el-dialog>

        <el-dialog title="批量移动协作" :visible.sync="dialogMoveVisible" width="35%" :before-close="moveClose">
            <div class="move-item">
                <div>
                    已选择：
                </div>
                <span v-for="item in selectCoop">
                    <span class="select-item">{{item.title}}</span>
                </span>
            </div>
            <div class="merge-item">
                <el-checkbox v-model="coopChecked" label="协作负责人"></el-checkbox>
            </div>
            <div class="move-select">
                <div class="move-item">
                    <span class="item-label">协作负责人：</span>
                    <el-select 
                        style="width: 300px" 
                        class="filter-item" 
                        v-model="coopLeaderId"
                        :disabled="!coopChecked"
                        filterable
                        placeholder="请选择协作负责人">
                        <el-option v-for="item in memberList" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmMove">确认</el-button>
                <el-button @click="moveCancel">取消</el-button>
            </span>
        </el-dialog>

        <div class="pagination-container">
            <el-pagination background @current-change="handleCurrentChange" :current-page="pageNo" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import common from '@/utils/common';
import BaseTemp from '@/components/BaseTemp';
import Department from "@/components/Department";
import RedStar from '@/components/RedStar/RedStar.vue';
import sjbtextarea from '@/components/sjbTextarea'
import { fetchList ,addComment,editPart,selectcharge,getPart,getLabelList,getTypeList,downFile,getMember,moveCoops} from '@/api/cooprate';
import waves from '@/directive/waves' // 水波纹指令
import { toJS, fromJS, Map, List } from 'immutable';
import { parseTime } from '@/utils';

import listQueryMix from '../../mixins/listQuery.mix';
import config from '@/utils/config';
import utils from '@/utils/utils';
import { mapState, mapGetters } from "vuex";

export default {
    name: "coopList",
    directives: {
        waves
    },
    mixins: [listQueryMix],
    components: {
        BaseTemp,
        RedStar,
        Department,
        sjbtextarea
    },
    computed: {
        ...mapState({
            token: state => state.user.token,
            coopListPlace:state => state.coop.coopListPlace,
            ids:state => state.permission.ids
        })
    },
    watch:{
        filterCharge(val){
            this.$refs.chargeTree.filter(val);
        },
        filterPart(val){
            this.$refs.partTree.filter(val)
        },
        filterDepart(val) {
            this.$refs.departTree.filter(val);
        },
    
    },

    data() {
        return {
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            },
            toolexpand:false,
            list: [],
            total: null,
            pageNo: 1,
            pageSize: 20,
            activeName:"1",
            memberType:[],
            listQuery: {
                deptOrUserId:"",// 提交人部门 ,
                label:[],// 标签 ,
                personType :"",
                // statusChangeTimeBegin:"",// 状态变更时间-起始时间 ,
                // statusChangeTimeEnd:"",// 状态变更时间-截止时间 ,
                // tab:"",// tab页，1我参与的，2我发起的，3全部 ,
                titleOrDescOrProgress:"",// 标题 ,
                type:"",// 类型
                timeRange: [],
            },
            labelList:[],
            typeList:[],
            //评论
            dialogComment:false,
            comment:'',
            
            dialogDepartVisible:false,
            departName:'',
            filterDepart: "",
            departTreeData: [],

            //负责人
            dialogCharge:false,
            filterCharge:'',
            treeData:[],
            treeFullData:[],
            defaultProps: {
                children: "children",
                label: "name"
            },
            chargeData:[],

            //参与人
            dialogPart:false,
            filterPart:'',
            partList:[],
            defaultList:[],

            dialogDown:false,

            selectCoop:[],
            coopChecked:false,
            coopLeaderId:'',
            memberList:[],
            dialogMoveVisible:false,
            scrollTop:0
        }
    },
    created() {
        this.$$queryStub = this.$$listQuery;
        this.activeName = this.coopListPlace;

        let memberList = JSON.parse(localStorage.getItem("web_oa_member"));
        var newArr = [];
        common.transToTree(memberList, newArr);
        common.mapAndAddChildren(newArr);
        this.treeFullData = newArr;
    },
    activated() {
        this.getList()
        document.documentElement.scrollTop = this.scrollTop 
    },
    async mounted(){
        await this.$store.dispatch('FetchDictsAndLocalstore');
        let dicList = JSON.parse(localStorage.getItem("web_oa_dicList"));
        function selectDic(arr,type){
            let temp = [];
            for(var i = 0;i<arr.length;i++){
                if(arr[i].type == type){
                    temp.push(arr[i])
                };
            }
            return temp
        }
        this.memberType = selectDic(dicList,"oa_needFlow_personType")

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
        
        getLabelList({}).then(res=>{
            this.labelList = res.data
        })
        
        getTypeList({}).then(res=>{
            this.typeList = res.data
        })
    },
    beforeRouteLeave (to, from, next) {
            let self = this;
            this.$nextTick(_=> {
                self.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            })
            //保存滚动条元素div的scrollTop值
			next()
	},
    methods: {
        handleSelectionChange(val){
            this.selectCoop = val;
        },
        moveCoop(){
            if(this.selectCoop.length<1){
                this.$message({
                    message:'请选择要移动的协作！',
                    type:"warning"
                })
                return
            }
            this.dialogMoveVisible = true;
            getMember({}).then(res=>{
                if(res.status == 0){
                    //列表是非离职人员
                    this.memberList = res.data.filter((item)=>{
                        return item.userStatus == '1'
                    })
                }
            })
        },
        moveClose(){
            this.dialogMoveVisible = false;
            this.conopLeaderId = "";
            this.coopChecked = false;
        },
        confirmMove(){
            if(this.coopChecked){
                if(!this.coopLeaderId){
                    this.$message({
                        message:'请选择协作负责人！',
                        type:'warning'
                    })
                    return
                }

                let coopIds = [];
                this.selectCoop.forEach(item=>{
                    coopIds.push(item.id)
                })
                moveCoops({
                    needFlowIds:coopIds,
                    principal:this.coopLeaderId,
                }).then(res=>{
                    if(res.status == 0){
                        this.moveClose();
                        this.$message({
                            message: res.message,
                            type: "success"
                        });
                        this.getList()
                    }
                })
            }else{
                this.coopLeaderId = ""
                this.$message({
                    message:'请为协作勾选相关负责人！',
                    type:'warning'
                })
            }
        },
        moveCancel(){
            this.dialogMoveVisible = false;
            this.coopLeaderId = "";
            this.coopChecked = false;
        },
        exportFile(type){
            var postData = this.reduceParams(this.$$queryStub);
            downFile({
                ...postData,
                tab:this.coopListPlace,
                exportContent:type 
            }).then(res=>{
                if(res.status == 0){
                    var url = `./OA${res.data}`;
                    window.location.href = url;
                    this.$message({
                        message:res.message,
                        type:'success'
                    })
                }
            })
        },

        handleDepartClick(data,select,childSelect) {
            let index = this.departTreeData.indexOf(data)
            if(index<0&&this.departTreeData.length ===1&&select){
                // this.$message({
                //     message: "只能选择一个子节点作为部门/人员！",
                //     type: 'warning'
                // })
                this.$refs.departTree.setChecked(this.departTreeData[0],false);
                this.departTreeData = [];
                this.departTreeData.push(data)
                
            }else if(this.departTreeData.length ===0&&select){
                // if(data.status == '1'){
                    this.departTreeData = [];
                    this.departTreeData.push(data)
                // }else{
                //     this.$message({
                //         message: "该节点不可选！",
                //         type: 'warning'
                //     })
                //     this.$refs.departTree.setChecked(data,false);
                //     return
                // }
            }else if(index>=0&&this.departTreeData.length===1&&!select){
                this.departTreeData = []
            }
        },
        departNode(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        selectDepart() {
            if(this.departTreeData.length){
                this.departName = this.departTreeData[0].name;
                this.listQuery.deptOrUserId  = this.departTreeData[0].id;
                this.dialogDepartVisible = false;
            }else{
                this.$message({
                    message: "请选择人员/部门",
                    type: "warning"
                });
                return;
            }
        },
        handleCreate(){
            this.$router.push({
                path:'/oa/coopForm'
            })
        },
        handleClick(val){
            this.$store.dispatch('changeCoop', val.name);
            this.getList();
        },
        getList() {
            var postData = this.reduceParams(this.$$queryStub);
            fetchList({
                ...postData,
                pageNo:this.pageNo,
                pageSize:this.pageSize,
                tab:this.coopListPlace
            }).then(response => {
                this.list = response.data.list
                this.total = response.data.total
            })
        },
        restCallback() {
            this.departName = '';
            // 用来补充默认rest不足的问题
        },
        // 处理接口不一致情况
        reduceParams($$imData) {
            if (!$$imData || $$imData.size == 0) return {};
            const $$postData = $$imData
                .set('statusChangeTimeBegin', common.rangeObjToTimestamp($$imData.get('timeRange').toJS()).applyTimeStart)
                .set('statusChangeTimeEnd', common.rangeObjToTimestamp($$imData.get('timeRange').toJS()).applyTimeEnd)
                .delete('timeRange')
            return $$postData.toJS();
        },
        handleFilter() {
            this.pageNo = 1;
            if(!this.listQuery.timeRange){
                this.listQuery.timeRange = [];
            }
            if(this.listQuery.personType&&!this.listQuery.deptOrUserId || !this.listQuery.personType&&this.listQuery.deptOrUserId){
                this.$message({
                    message: "人员类型和人员/部门筛选需配合使用！",
                    type: 'warning'
                })
                return
            }
            this.$$queryStub = fromJS(this.listQuery);
            this.getList()
        },
        handleCurrentChange(val) {
            this.pageNo = val
            this.getList()
        },
        showPlan(row){
            this.$router.push({
                path:'/oa/coopPlan',
                query: { key: row.id, }
            })
        },
        showDetail(row){
            this.$router.push({
                path:'/oa/coopDetail',
                query: { key: row.id }
            })
        },
        showComment(row){
            this.dialogComment = true;
            this.needFlowId = row.id;
        },
        selectComment(){
            if(!this.comment){
                this.$message({
                    message: "请填写评论！！",
                    type: 'warning'
                })
                return
            }
            addComment({
                needFlowId:this.needFlowId,
                content:this.comment
            }).then(res=>{
                if (res.status == 0) {
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
                    this.comment = '';
                    this.dialogComment = false;
                    this.getList();
                }
            })
        },
        async showPartIn(row){
            this.needFlowId = row.id;
            this.partList = [];
            this.defaultList = [];
            this.dialogPart = true;
            let res = await getPart({
                needFlowId:this.needFlowId
            })
            if(res.status == 0){
                // let arr = res.data.filter((element, index, self)=>{
                //     return self.findIndex(item=>item.userId == element.userId) == index
                // })
                res.data.forEach(item=>{
                    let tempObj = {};
                    this.defaultList.push(item.userId);
                    tempObj.id = item.userId;
                    tempObj.name = item.name;
                    this.partList.push(tempObj);
                    this.$refs.partTree.setCheckedKeys(this.defaultList)
                });
            }   
        },
        
        showCharge(row){
            this.needFlowId = row.id;
            this.dialogCharge = true;
        },
        chargeNode(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        partNode(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        async selectCharge(){
            if(this.chargeData.length){
                const [{id,name}] = this.chargeData;
                let res = await selectcharge({
                    needFlowId:this.needFlowId,
                    userId:id
                })
                if(res.status==0){
                    this.chargeData = []
                    this.$refs.chargeTree.setCheckedKeys([]);
                    this.dialogCharge = false
                    this.$message({
                        message:res.message,
                        type: 'success'
                    })
                    this.getList();
                }
            }else{
                this.$message({
                    message: "请选择一个子节点作为下一级负责人！",
                    type: 'warning'
                })
            }
        },
       
        clickCharge(data,select,childSelect){
            let tempObj = {};
            tempObj.id = data.id;
            tempObj.name = data.name;
            let index = this.chargeData.findIndex(item=>item.id == tempObj.id)
            if(index<0&&this.chargeData.length ===1&&select){
                if(data.type =='2'&&data.status == '1'){
                    this.$refs.chargeTree.setChecked(this.chargeData[0],false);
                    this.chargeData = [];
                    this.$refs.chargeTree.setChecked(data,true);
                    this.chargeData.push(tempObj)
                }else{
                    this.$message({
                        message: "该节点不可选！",
                        type: 'warning'
                    })
                    this.$refs.chargeTree.setChecked(data,false);
                    this.$refs.chargeTree.setChecked(this.chargeData[0],true);
                    return
                }
                // this.$refs.chargeTree.setChecked(this.chargeData[0],false);
                // this.chargeData = [];
                // this.chargeData.push(tempObj)
            }else if(this.chargeData.length ===0&&select){
                if(data.type =='2'&&data.status == '1'){
                    this.chargeData = [];
                    this.chargeData.push(data);
                }else{
                    this.$message({
                        message: "该子节点不能作为下一级负责人！",
                        type: 'warning'
                    })
                    this.$refs.chargeTree.setChecked(data,false);
                    return
                }
            }else if(index>=0&&this.chargeData.length===1&&!select){
                this.chargeData = []
            }
        },
        clickPart(data,select,children){
            let tempObj = {};
            tempObj.id = data.id;
            tempObj.name = data.name;
            let index = this.partList.findIndex(item=>item.id == tempObj.id);
            if(index<0&&select){
                if(data.type =='2'&&data.status == '1'){
                    this.partList.push(data);
                }else{
                    this.$message({
                        message: "该子节点不能作为参与人！",
                        type: 'warning'
                    })
                    this.$refs.partTree.setChecked(data,false);
                    return
                }
            }else if(index>=0&&!select){
                this.$refs.partTree.setChecked(data,false);
                this.partList.splice(index,1)
            }
        },
        async selectPart(){
            if(this.partList.length){
                let tempId = [] ,tempName = [];
                this.partList.forEach(item=>{
                    tempId.push(item.id)
                })
                let res = await editPart({
                    needFlowId:this.needFlowId,
                    userIdList:[...tempId]
                })
                if(res.status==0){
                    this.partList = [];
                    this.$refs.partTree.setCheckedKeys([])
                    this.dialogPart = false;
                    this.$message({
                        message:res.message,
                        type: 'success'
                    })
                    this.getList();
                }
            }else{
                this.$message({
                    message: "请选择子节点作为参与人！",
                    type: 'warning'
                })
            }
            
        },
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
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
    margin-top: -3px;
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
.item-value {
    display: inline-block;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background: white;
    padding-left: 7px;
    line-height: 30px;
    width: 200px;
}
</style>