<template>
    <div class="sjb-container calendar-list-container">
        <div class="filter-container">
            <div class="toolbar-item">
                <span class="item-label">合同编号/甲方/乙方/丙方：</span>
                <el-input @keyup.enter.native="handleFilter" style="width: 220px;" class="filter-item" placeholder="请输入合同编号/甲方/乙方/丙方" v-model.trim="listQuery.faint">
                </el-input>
            </div>
            <div class="toolbar-item">
                <span class="item-label">合同关键字：</span>
                <el-input @keyup.enter.native="handleFilter" style="width: 120px;" class="filter-item" placeholder="请输入关键字" v-model.trim="listQuery.keyWords">
                </el-input>
            </div>
            <div class="toolbar-item">
                <span class="item-label">合同名称：</span>
                <el-select clearable filterable style="width: 220px" class="filter-item" v-model="listQuery.contractId" placeholder="请选择合同名称">
                    <el-option v-for="item in comInfor" :key="item.id" :label="item.contractName" :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <div class="toolbar-item">
                <span class="item-label">合同负责人：</span>
                <el-select clearable filterable class="filter-item" v-model="listQuery.contractLeaderId" placeholder="请选择合同负责人" style="width:220px;">
                    <el-option v-for="item in memberList" :label="item.name" :value="item.id" :key="item.id">
                    </el-option>
                </el-select>
            </div>
            <div class="toolbar-item">
                <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
                <el-button class="filter-item" type="warning" v-waves icon="el-icon-delete" @click="restListQuery(restCallback)">重置</el-button>
                <el-button  v-if="ids.indexOf('inforManage-contractFillList-addBtn')!==-1" class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">新建合同归档</el-button>
            </div>
            <div class="toolmore-control">
                <el-button icon="el-icon-arrow-up" v-if="toolexpand" class="toolmore-control-btn" @click="toolexpand = false">收起</el-button>
                <el-button icon="el-icon-arrow-down" v-else class="toolmore-control-btn" @click="toolexpand = true">展开</el-button>
            </div>
            <el-collapse-transition>
                <div v-show="toolexpand">
                    <div class="toolbar-row">
                        <div class="toolbar-item">
                            <span class="item-label">日期类型：</span>
                            <el-select clearable style="width: 120px" class="filter-item" v-model="listQuery.dateType" placeholder="请选择日期类型">
                                <el-option v-for="item in dateTypeList" :key="item.value" :label="item.name" :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="toolbar-item">
                            <span class="item-label">日期：</span>
                            <el-date-picker v-model="listQuery.timeRange" type="daterange" class="filter-item" style="width:287px" placeholder="选择日期范围">
                            </el-date-picker>
                        </div>
                        <!-- <div class="toolbar-item">
                            <span class="item-label">合同名称：</span>
                            <el-select clearable filterable style="width: 220px" class="filter-item" v-model="listQuery.contractNameCode" placeholder="请输入项目名称">
                                <el-option v-for="item in comInfor" :key="item.contractCompanyCode" :label="item.contractName" :value="item.contractCompanyCode">
                                </el-option>
                            </el-select>
                        </div> -->
                        <div class="toolbar-item">
                            <span class="item-label">合同状态：</span>
                            <el-select clearable style="width: 120px" class="filter-item" v-model="listQuery.contractHisStatus" placeholder="请选择合同状态">
                                <el-option v-for="item in conStatuList" :key="item.value" :label="item.name" :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="toolbar-item">
                            <span class="item-label">合同类型：</span>
                            <el-select clearable style="width: 120px" class="filter-item" v-model="listQuery.contractType" placeholder="请选择">
                                <el-option v-for="item in conTypeList" :key="item.value" :label="item.name" :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
            </el-collapse-transition>
        </div>
        <div class="filter-container">
            <div class="toolbar-item">
                <el-button v-if="ids.indexOf('inforManage-contractFillList-moveBtn')!==-1" class="filter-item" type="primary" @click="moveContract">批量移动合同</el-button>
            </div>
        </div>
        <el-table :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column align="center" label="合同编号" width="100px">
                <template slot-scope="scope">
                    <span style="color:#409EFF;cursor: Pointer;"  @click="showDetail(scope.row)">{{scope.row.contractCode}}</span>
                </template>
            </el-table-column>
            
            <el-table-column width="100px" align="center" label="合同名称">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.contractName">{{scope.row.contractName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="合同归档方式" width="100px">
                <template slot-scope="scope">
                    <span>{{scope.row.contractHisMethodName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="甲方名称">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.firstMemberName">{{scope.row.firstMemberName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="乙方名称">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.secondMemberName">{{scope.row.secondMemberName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="丙方名称">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.thirdMemberName">{{scope.row.thirdMemberName}}</span>
                </template>
            </el-table-column>
            <el-table-column width="100px" align="center" label="合同关键字">
                <template slot-scope="scope">
                    <span>{{scope.row.keyWordName&&scope.row.keyWordName.join('，')}}</span>
                </template>
            </el-table-column>
            <el-table-column width="100px" align="center" label="合同开始日期">
                <template slot-scope="scope">
                    <span>{{scope.row.contractStartTime | stamp2TextDate}}</span>
                </template>
            </el-table-column>
            <el-table-column width="120px" align="center" label="合同结束日期" prop="contractEndTime" sortable>
                <template slot-scope="scope">
                    <span>{{scope.row.contractEndTime | stamp2TextDate}}</span>
                </template>
            </el-table-column>
            <el-table-column width="80px" align="center" label="合同负责人">
                <template slot-scope="scope">
                    <span>{{scope.row.contractLeaderName}}</span>
                </template>
            </el-table-column>
            <el-table-column width="80px" align="center" label="补充协议数量">
                <template slot-scope="scope">
                    <span>{{scope.row.supplementaryCount}}</span>
                </template>
            </el-table-column>
            <el-table-column width="80px" align="center" label="合同状态">
                <template slot-scope="scope">
                    <span>{{scope.row.contractHisStatusName}}</span>
                </template>
            </el-table-column>
            <el-table-column width="80px" align="center" label="回执状态">
                <template slot-scope="scope">
                    <span>{{scope.row.receiptStatusName}}</span>
                </template>
            </el-table-column>
            <el-table-column width="140px" align="center" label="合同归档时间" prop="createTime" sortable>
                <template slot-scope="scope">
                    <span>{{scope.row.createTime | stamp2TextDateFull}}</span>
                    <!-- <span class="ignore-detail" :title="scope.row.createTime | stamp2TextDateFull">{{scope.row.createTime | stamp2TextDateFull}}</span> -->
                </template>
            </el-table-column>
            <el-table-column width="290px" align="center" label="操作" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button v-if="ids.indexOf('inforManage-contractFillList-editBtn')!==-1" type="primary" size="mini" @click="showEdit(scope.row)">编辑</el-button>
                    <el-button type="primary" size="mini" @click="showDetail(scope.row)">详情</el-button>
                    <!-- <el-button type="primary" size="mini" @click="showRenew(scope.row)" :disabled="scope.row.contractHisStatus&&scope.row.contractHisStatus !== 0">续签</el-button> -->
                    <el-button v-if="ids.indexOf('inforManage-contractFillList-renewBtn')!==-1" type="primary" size="mini" @click="showRenew(scope.row)" :disabled="scope.row.delFlag&&scope.row.delFlag == 1 || scope.row.contractHisRenewal&&scope.row.contractHisRenewal == 1 || scope.row.contractHisStatus&&scope.row.contractHisStatus == 1 || scope.row.contractHisStatus&&scope.row.contractHisStatus == 2">续签</el-button>
                    <el-button v-if="ids.indexOf('inforManage-contractFillList-abandonBtn')!==-1" type="danger" size="mini" @click="showAbandon(scope.row)" :disabled="scope.row.delFlag&&scope.row.delFlag == 1 || scope.row.contractHisStatus&&scope.row.contractHisStatus == 1">废弃</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="编辑归档" :visible.sync="dialogEdit" width="25%">
            <el-form ref='form' label-width="130px" label-position="left">
                <RedStar :required ="false">
                    <el-form-item label="当前合同负责人：">
                        {{contractLeaderName}}
                    </el-form-item>
                </RedStar>
                <RedStar :required ="true">
                    <el-form-item label="变更合同负责人：">
                        <el-select clearable filterable class="filter-item ignore-detail" v-model="contractLeaderId" placeholder="请选择合同负责人" style="width:220px;">
                            <el-option v-for="item in memberPartList" :label="item.name" :value="item.id" :key="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </RedStar>
                <RedStar :required ="true">
                    <el-form-item label="关联项目：" v-if="businessType == '1'">
                        <el-select 
                            class="filter-item" 
                            filterable
                            multiple
                            remote 
                            reserve-keyword 
                            v-model="projectIds" 
                            placeholder="请输入项目名称" 
                            style="width:220px;" 
                            :remote-method="searchProject">
                            <el-option v-for="item in projectList" :label="item.projectName" :value="item.id" :key="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="关联客户：" v-if="businessType =='2'">
                        <el-select 
                            class="filter-item" 
                            filterable
                            remote 
                            reserve-keyword 
                            multiple
                            v-model="custIds" 
                            placeholder="请输入客户名称" 
                            style="width:220px;" 
                            :remote-method="searchCustmer">
                            <el-option v-for="item in custList" :label="item.custName" :value="item.custId" :key="item.custId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </RedStar>
                <el-form-item>
                    <el-button type="primary" @click="editFill">立即创建</el-button>
                    <el-button @click="dialogEdit = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-dialog title="续签合同" :visible.sync="dialogRenew" width="25%">
            <el-form ref='form' label-width="120px" label-position="left">
                <RedStar :required ="true">
                    <el-form-item label="合同结束日期：">
                        <el-date-picker
                            v-model="contractEndTime"
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </RedStar>
                <RedStar :required ="true">
                    <el-form-item label="续签合同凭证：">
                        <el-upload class="upload-img" :action="fileURL" :headers='{sessionid:token}' :on-remove="renewRemove" :before-upload = "beforeUpload" :on-success="renewSuccess" :file-list="renewAttachment">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">
                                {{uploadTips}}
                            </div>
                        </el-upload>
                    </el-form-item>
                </RedStar>
                <el-form-item>
                    <el-button type="primary" @click="renewFill">立即创建</el-button>
                    <el-button @click="cancelRenew">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-dialog title="废弃合同" :visible.sync="dialogAbandon" width="25%">
            <el-form ref='form' label-width="120px" label-position="left">
                <RedStar :required ="true">
                    <el-form-item label="废弃合同凭证：">
                        <el-upload class="upload-img" :action="fileURL" :headers='{sessionid:token}' :on-remove="abandonRemove" :before-upload = "beforeUpload" :on-success="abandonSuccess" :file-list="abandonAttachment">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">
                                {{uploadTips}}
                            </div>
                        </el-upload>
                    </el-form-item>
                </RedStar>
                <el-form-item>
                    <el-button type="primary" @click="abandonFill">立即创建</el-button>
                    <el-button @click="cancelAbandon">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <div class="pagination-container">
            <el-pagination background @current-change="handleCurrentChange" :current-page="pageNo" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>

        <el-dialog title="批量移动合同" :visible.sync="dialogMoveVisible" width="35%" :before-close="moveClose">
            <div class="move-item">
                <div>
                    已选择：
                </div>
                <span v-for="(item,index) in selectContract" :key="index">
                    <span class="select-item">{{item.contractName}}</span>
                </span>
            </div>
            <div class="merge-item">
                <el-checkbox v-model="contractChecked" label="合同负责人"></el-checkbox>
            </div>
            <div class="move-select">
                <div class="move-item">
                    <span class="item-label">合同负责人：</span>
                    <el-select 
                        style="width: 300px" 
                        class="filter-item" 
                        v-model="contractLeaderId"
                        :disabled="!contractChecked"
                        filterable
                        placeholder="请选择合同负责人">
                        <el-option v-for="item in memberPartList" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmMove">确认</el-button>
                <el-button @click="moveCancel">取消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import common from '@/utils/common';
import BaseTemp from '@/components/BaseTemp';

import RedStar from '@/components/RedStar/RedStar.vue';
import { fetchList ,getContractTemlist,getProject,eidtList,renewList,abandonList,getDetail,moveContracts,getMember,getCust} from '@/api/contractFill';
import waves from '@/directive/waves' // 水波纹指令
import { toJS, fromJS, Map, List } from 'immutable';
import { parseTime } from '@/utils';

import listQueryMix from '../../mixins/listQuery.mix';
import config from '@/utils/config';
import utils from '@/utils/utils';
import { mapState, mapGetters } from "vuex";

export default {
    directives: {
        waves
    },
    mixins: [listQueryMix],
    components: {
        BaseTemp,
        RedStar,
    },
    computed: {
        ...mapState({
            token: state => state.user.token,
            ids:state => state.permission.ids
        })
    },
    data() {
        return {
            // pickerOptions: {
            //     disabledDate(time) {
            //         return time.getTime() > Date.now();
            //     }
            // },
            toolexpand:false,
            list: [],
            total: 0,
            pageNo: 1,
            pageSize: 20,
            listLoading: true,
            listQuery: {
                timeRange: [],
                contractHisStatus:"",// 合同状态 ,
                contractId:"",//  合同id,
                contractLeaderId:"",//合同负责人id,
                contractType:"",//  合同类型,
                faint:"", //模糊搜索字段,
                dateType:"",
                sqlFlag:"1",
                keyWords:""
            },
            dateTypeList:[],
            conStatuList:[],
            conTypeList:[],
            comInfor: [],

            //编辑
            dialogEdit:false,
            projectIds:[],
            contractLeaderName:'',
            editId:'',
            memberList:[],
            projectList:[],

            //续签
            dialogRenew:false,
            fileURL: process.env.BASE_API + '/commonInfo/fileUpload',
            uploadTips: config.tips,
            contractEndTime:'',
            rowContractEndTime:'',
            renewId:'',
            renewAttachment:[],

            //废弃
            dialogAbandon:false,
            abandonId:'',
            abandonAttachment:[],

            allProject:[],

            selectContract:[],
            contractChecked:false,
            contractLeaderId:'',
            memberList:[],
            memberPartList:[],
            dialogMoveVisible:false,

            custIds:[],
            custList:[],
            businessType:""
        }
    },
    created() {
        this.$$queryStub = this.$$listQuery;
        if(this.$route.query.companyName){
            this.listQuery.faint = this.$route.query.companyName;
            this.$$queryStub = fromJS(this.listQuery);
        }
        this.getList()
        this.listLoading = false
        getContractTemlist({}).then(res => {
            this.comInfor = res.data;
        })
    },
    async mounted(){
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

        this.conStatuList = selectDic(dicList,"contract_his_status")
        this.conTypeList = selectDic(dicList,"contract_type_s")
        this.dateTypeList = selectDic(dicList,"date_type")

        getMember({}).then(res => {
            if(res.status == 0){
                this.memberList = res.data;
                //列表是非离职人员
                this.memberPartList = res.data.filter((item)=>{
                    return item.userStatus == '1'
                })
            }
        })

        // this.allProject = await this.getAllProject();
        // findAllProject({}).then(res=>{
        //     this.allProject = res.data.list
        // })
    },
    methods: {
        // getAllProject(){
        //     return new Promise((resolve)=>{
        //         findAllProject({}).then(res=>{
        //             resolve(res.data.list)
        //         })
        //     })
        // },
        handleSelectionChange(val){
            this.selectContract = val;
        },
        moveContract(){
            if(this.selectContract.length<1){
                this.$message({
                    message:'请选择要移动的合同！',
                    type:"warning"
                })
                return
            }
            this.dialogMoveVisible = true;
        },
        moveClose(){
            this.dialogMoveVisible = false;
            this.contractLeaderId = "";
            this.contractChecked = false;
        },
        confirmMove(){
            if(this.contractChecked){
                if(!this.contractLeaderId){
                    this.$message({
                        message:'请选择合同负责人！',
                        type:'warning'
                    })
                    return
                }

                let contractIds = [];
                this.selectContract.forEach(item=>{
                    contractIds.push(item.id)
                })
                moveContracts({
                    contractHisIds:contractIds,
                    contractLeaderId:this.contractLeaderId,
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
                this.impleLeaderId = ""
                this.$message({
                    message:'请为移动合同勾选相关负责人！',
                    type:'warning'
                })
            }
        },
        moveCancel(){
            this.dialogMoveVisible = false;
            this.contractLeaderId = "";
            this.contractChecked = false;
        },
        searchProject(val){
            // this.projectList = [];
            if(val !==''){
                getProject({
                    //还有项目名称
                    projectName:val,
                    timeType:2,
                    pageNo:1,
                    pageSize:20
                }).then(res=>{
                    this.projectList = res.data.list;
                })
            }
        },
        searchCustmer(val){
            if(val !==''){
                getCust(
                    //还有项目名称
                    val,
                ).then(res=>{
                    this.customerList = res.data;
                })
            }
        },
        editFill(){
            if (!this.contractLeaderId) {
                this.$message({
                    message: "请选择项目负责人！",
                    type: "warning"
                });
                return;
            }
            if (this.businessType ==1 &&this.projectIds.length<1) {
                this.$message({
                    message: "请关联项目！",
                    type: "warning"
                });
                return;
            }
            if (this.businessType ==2 &&this.custIds.length<1) {
                this.$message({
                    message: "请关联客户！",
                    type: "warning"
                });
                return;
            }
            eidtList({
                contractHisId:this.editId,
                contractLeaderId:this.contractLeaderId,
                projectIds:this.projectIds,
                custIds:this.custIds
            }).then(res=>{
                if(res.status == 0){
                    this.$message({
                        message: res.message,
                        type: "success"
                    })
                    window.location.reload();
                    // this.dialogEdit = false
                }
            })
        },
        renewFill(){
            if (!this.contractEndTime) {
                this.$message({
                    message: "请选择续签合同结束时间！",
                    type: "warning"
                });
                return;
            }
            if (this.rowContractEndTime>this.contractEndTime) {
                this.$message({
                    message: "续签合同结束时间不能小于合同结束时间！",
                    type: "warning"
                });
                return;
            }
            if (this.renewAttachment.length<1) {
                this.$message({
                    message: "请上传续签合同凭证！",
                    type: "warning"
                });
                return;
            }
            let timestamp = common.timeParse(this.contractEndTime)
            renewList({
                contractHisId:this.renewId,
                contractEndTime:timestamp,
                contractAttachmentRequest:this.renewAttachment,
            }).then(res=>{
                if(res.status == 0){
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
                    window.location.reload();
                }
            })
        },
        abandonFill(){
            if (this.abandonAttachment.length<1) {
                this.$message({
                    message: "请上传废弃合同凭证！",
                    type: "warning"
                });
                return;
            }
            abandonList({
                contractHisId:this.abandonId,
                contractAttachmentRequest:this.abandonAttachment,
            }).then(res=>{
                if(res.status == 0){
                    // this.abandonAttachment = []
                    // this.dialogAbandon = false
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
                    window.location.reload();
                }
            })
        },
        getList() {
            this.listLoading = true;
            var postData = this.reduceParams(this.$$queryStub);
            fetchList({
                ...postData,
                pageNo:this.pageNo,
                pageSize:this.pageSize
            }).then(response => {
                this.list = response.data.list
                this.total = response.data.total
                this.listLoading = false
            })
        },
        restCallback() {
                // 用来补充默认rest不足的问题
        },
        // 处理接口不一致情况
        reduceParams($$imData) {
            if (!$$imData || $$imData.size == 0) return {};
            const $$postData = $$imData
                .set('startTime', common.rangeObjToTimestamp($$imData.get('timeRange').toJS()).applyTimeStart)
                .set('endTime', common.rangeObjToTimestamp($$imData.get('timeRange').toJS()).applyTimeEnd)
                .delete('timeRange')
            return $$postData.toJS();
        },
        handleFilter() {
            this.pageNo = 1
            if(!this.listQuery.timeRange){
                this.listQuery.timeRange = []
            }
            if(!this.listQuery.dateType&&this.listQuery.timeRange.length>0 || this.listQuery.dateType&&this.listQuery.timeRange.length == 0){
                this.$message({
                    message: "时间类型和日期需配合使用!!",
                    type: "warning"
                });
                return
            }
            this.$$queryStub = fromJS(this.listQuery);
            this.getList()
            this.listLoading = false;
        },
        handleSizeChange(val) {
            this.pageSize = val
            this.getList()
        },
        handleCurrentChange(val) {
            this.pageNo = val
            this.getList()
            this.listLoading = false;
        },
        showEdit(row){
            this.dialogEdit = true;
            this.editId = row.id;
            this.projectList = [];
            getDetail({
                id:this.editId
            }).then(res=>{
                this.contractLeaderName = res.data.contractHisDetailResponse.contractLeaderName;
                this.projectIds = res.data.contractHisDetailResponse.projectIds || [];
                res.data.contractHisDetailResponse.projectList =  res.data.contractHisDetailResponse.projectList || [];
                this.projectList = res.data.contractHisDetailResponse.projectList.map(item=>{
                    return {
                        id:item.projectId,
                        ...item
                    }
                })
                this.custIds = res.data.contractHisDetailResponse.custIds || [];
                this.custList = res.data.contractHisDetailResponse.custList || [];
                this.businessType = res.data.contractHisDetailResponse.businessType;
            })
            
        },
        showDetail(row){
            this.$router.push({
                path:'/inforManage/contractFillDetail',
                query: { key: row.id }
            })
        },
        showRenew(row){
            this.dialogRenew = true;
            this.rowContractEndTime = row.contractEndTime
            this.renewId = row.id;
        },
        cancelRenew(){
            this.dialogRenew = false;
            this.renewAttachment = [];
            this.contractEndTime = '';
        },
        showAbandon(row){
            this.dialogAbandon = true;
            this.abandonId = row.id;
        },
        cancelAbandon(){
            this.abandonAttachment = [];
            this.dialogAbandon = false;
        },
        handleCreate() {
            this.$router.push({path: '/inforManage/contractFillForm'})
        },
        // 附件上传成功
        renewSuccess(res, file, fileList) {
            if(res.data.resCode == 1){
                let url = res.data.storfiles.serverUrl + res.data.storfiles.url;
                this.renewAttachment.push({ contractAttachmentUrl:res.data.storfiles.url ,name:file.name,url:url,fileType:4});
            }
        },
        // 附件移除
        renewRemove(file, fileList) {
            this.renewAttachment.map((item, index) => {
                if (item.name == file.name) {
                    this.renewAttachment.splice(index, 1);
                }
            })
        },
        abandonSuccess(res, file, fileList) {
            if(res.data.resCode == 1){
                let url = res.data.storfiles.serverUrl + res.data.storfiles.url;
                this.abandonAttachment.push({ contractAttachmentUrl:res.data.storfiles.url ,name:file.name,url:url,fileType:5});
            }
        },
        // 附件移除
        abandonRemove(file, fileList) {
            this.abandonAttachment.map((item, index) => {
                if (item.name == file.name) {
                    this.abandonAttachment.splice(index, 1);
                }
            })
        },
        beforeUpload(file) {
            return utils.handleImgError(file)
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
</style>