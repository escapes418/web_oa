<template>
    <div class="sjb-form-wrapper">
        <el-alert
            title="如关联项目，则费用归属于项目；如不关联项目，则费用归属于个人。"
            class="remarkInfo"
            :closable="false"
            show-icon
            type="info">
        </el-alert>
        <div class="segment statistics">
            <div class="segment-header">
                基本信息
            </div>
            <div class="segment-area">
                <el-row>
                    <el-col :span="12" class="segment-brline">
                        <RedStar label="报销人员：">
                            <span class="right-con">{{userInfo.name}}</span>
                        </RedStar>
                        <RedStar label="所属部门：">
                            <span class="right-con">{{ userInfo.officeName }}</span>
                        </RedStar>
                        <RedStar label="报销类型：" :required="true">
                            <el-select clearable class="filter-item" v-model="filter.applyType" placeholder="请选择" style="width:280px;" @change="clearLink">
                                <el-option v-for="item in expTypeList" :label="item.name" :value="item.value" :key="item.value">
                                </el-option>
                            </el-select>
                        </RedStar>
                        <RedStar label="关联申请：" v-if="filter.applyType == 2 || filter.applyType == 3" :required="true">
                            <div class="item-value" @click="showRelat" :title="fullName">
                                <i class="el-icon-search" style="color:#bfbfbf"></i>
                                <span style="color:#606266;font-size:14px;">{{filter.relationName}}</span>
                            </div>
                        </RedStar>
                        <RedStar label="项目名称：" v-if="filter.applyType == 2 || filter.applyType == 3&&filter.relType !=3">
                            <span class="right-con">{{relatThemProName}}</span>
                        </RedStar>
                        
                        <Project @on-select="proSelect" :Pvalue="projectName" v-if="filter.applyType == 1"></Project>
                        <RedStar label="项目负责人：" v-if="filter.relType !=3">
                            <span class="right-con">
                                {{filter.projectPersonel}}
                            </span>
                        </RedStar>
                        <RedStar label="报销分类：" v-if="filter.applyType == 3">
                            <span class="right-con">
                                {{filter.travelExpenseTypeListName&&filter.travelExpenseTypeListName.join(',')}}
                            </span>
                        </RedStar>
                        <RedStar label="票据数量：">
                            <div class="item-value" style="height:32px">
                                <span style="color:#606266;font-size:14px;">{{ billNum || "" }}</span>
                            </div>
                        </RedStar>
                    </el-col>
                    <el-col :span="12" class="segment-brline">
                        <RedStar label="报销日期：">
                            <span class="right-con">{{ filter.applyTime }}</span>
                        </RedStar>
                        <RedStar label="岗位名称：">
                            <span class="right-con">{{ userInfo.postName }}</span>
                        </RedStar>
                        <RedStar label="发票所属公司：" :required="true">
                            <el-select clearable class="filter-item " v-model="filter.taxCity" placeholder="请选择" style="width:280px;">
                                <el-option v-for="item in taxList" :label="item.name" :value="item.value" :key="item.value">
                                </el-option>
                            </el-select>
                        </RedStar>
                        <RedStar label="陪客人员：" v-if="filter.applyType == 2" :required="true">
                            <el-select clearable multiple class="filter-item" filterable v-model="filter.employees" placeholder="请选择" style="width:280px;">
                                <el-option v-for="item in memberList" :label="item.name" :value="item.loginName" :key="item.loginName">
                                </el-option>
                            </el-select>
                        </RedStar>
                        <RedStar label="随行人员：" v-if="filter.applyType == 3">
                            <span class="right-con">
                                {{filter.entourageListName&&filter.entourageListName.join(',')}}
                            </span>
                        </RedStar>
                        <RedStar label="备注：">
                            <span class="right-con">
                                <el-input placeholder="请输入"
                                type="textarea"
                                style="width:280px;"
                                :rows="3"
                                :maxlength="2000"
                                v-model.trim="filter.remarks"></el-input>
                            </span>
                        </RedStar>
                        <RedStar label="费用合计：">
                            <div class="item-value" style="height:32px">
                                <span style="color:#606266;font-size:14px;">{{expenseTotal.toFixed(2) || ""}}</span>
                            </div>
                        </RedStar>
                    </el-col>
                </el-row>
            </div>
            <el-dialog title="关联申请" :visible.sync="dialogRelatVisible">
                <span class="toolbar-item">
                    <span class="item-label">更新时间</span>
                    <el-date-picker v-model="listQuery.themetimeRange" type="daterange" class="filter-item" style="width:287px" placeholder="选择日期范围"  :picker-options="pickerOptions">
                    </el-date-picker>
                </span>
                <span class="toolbar-item">
                    <span class="item-label">项目名称：</span>
                    <el-input @keyup.enter.native="handleThemeFilter" style="width: 120px;" class="filter-item" placeholder="请输入项目名" v-model.trim="listQuery.projectName">
                    </el-input>
                </span>
                <span class="toolbar-item">
                    <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleThemeFilter">搜索</el-button>
                    <el-button class="filter-item" type="warning" icon="el-icon-refresh" @click="restListQuery(restCallback)">重置</el-button>
                </span>
                <div class="dialog" style="margin-top:10px">
                    <el-table :data="recep" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%;" @row-click="selectRelat">
                        <el-table-column align="center" label="关联编号">
                            <template slot-scope="scope">
                                <span class="ignore-detail" :title="scope.row.procCode">{{scope.row.procCode}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="关联申请">
                            <template slot-scope="scope">
                                <span class="ignore-detail" :title="scope.row.procName">{{scope.row.procName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="归属项目">
                            <template slot-scope="scope">
                                <span>{{scope.row.projectName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column width="70px" align="center" label="费用总额">
                            <template slot-scope="scope">
                                <span>{{scope.row.budgetTotal}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column width="70px" align="center" label="提交人">
                            <template slot-scope="scope">
                                <span>{{scope.row.applyPerName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column width="90px" align="center" label="提交时间">
                            <template slot-scope="scope">
                                <span>{{scope.row.applyTime}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column width="110px" align="center" label="状态">
                            <template slot-scope="scope">
                                <span>{{ scope.row.statusValue }}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>

                <div class="pagination-container" style="margin-top:20px">
                    <el-pagination background @current-change="recepCurrentChange" :current-page="pageNo" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="recepTotal">
                    </el-pagination>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogRelatVisible = false">返回</el-button>
                </div>
            </el-dialog>
        </div>
        <div class="segment statistics">
            <div class="segment-header">
                <span class="left-red">*</span>
                报销明细
            </div>
            <div class="segment-area">
                <div class="el-table__body-wrapper">
                    <table id="expenseDetails" class="table table-striped table-bordered table-condensed" style="width:1700px;margin-bottom: 20px;">
                        <thead>
                            <tr class="tableTitle">
                                <td style="text-align: center;width: 20px;padding: 0 10px 0 10px;">
                                    <el-checkbox @change="selectAll"></el-checkbox>
                                </td>
                                <td class="tableTitle">发生日期</td>
                                <td class="tableTitle">起点</td>
                                <td class="tableTitle">结束日期</td>
                                <td class="tableTitle">终点</td>
                                <td class="tableTitle">科目</td>
                                <td class="tableTitle">人数</td>
                                <td class="tableTitle">天数</td>
                                <td class="tableTitle">票据张数</td>
                                <td class="tableTitle">报销金额</td>
                                <td class="tableTitle">备注</td>
                                <td class="tableTitle">上传图片</td>
                            </tr>
                        </thead>
                        <tbody>
                            <approval v-for="(item,index) in detailCollection" style="height:50px" :key="index" :itemData="item" :isType="isType"></approval>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="segment-foot">
                <el-button type="primary" size="small" @click="add">新增</el-button>
                <el-button type="danger" size="small" @click="del">删除</el-button>
            </div>
        </div>
        <div class="segment statistics">
            <div class="segment-header">
                附件
            </div>
            <div class="segment-area">
                <div class="el-table__body-wrapper">
                    <el-upload class="upload-img" :action="fileURL" :headers='{ sessionid:token}' :on-remove="handleRemove" :before-upload = "beforeUpload" :on-success="handleSuccess" :file-list="expenseAttachment">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">{{uploadTips}}</div>
                    </el-upload>
                </div>
            </div>
        </div>
        <div class="segment statistics">
            <div class="sjb-foot-button">
                <el-button type="primary" size="small" @click="submit('apply')">提交申请</el-button>
                <el-button type="primary" size="small" @click="submit('save')">报销保存</el-button>
                <el-button size="small" @click="backStep">返回</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import common from '@/utils/common'
import Approval from '@/components/Approval'
import Project from '@/components/Project'
import RedStar from '@/components/RedStar/RedStar.vue'
import { fetchProList, expApply, expSave, getDetail, fetchThemeList, getMember } from '@/api/reim'
import { mapState, mapGetters } from "vuex";

import { parseTime } from '@/utils'
import { reimFormVali } from './reim.util'
import config from '@/utils/config'
import utils from '@/utils/utils'
import { toJS, fromJS, Map, List } from 'immutable';
import listQueryMix from '../../mixins/listQuery.mix'

export default {
    components: {
        Approval,
        Project,
        RedStar
    },
    mixins: [listQueryMix],
    data() {
        return {
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            },
            isType: "reim",
            urlArr: [],
            itemList: [],
            fileList: [],
            // dialogFormVisible: false,
            dialogRelatVisible: false,
            
            filter: {//筛选条件
                applyTime: "", // 报销日期
                applyType: "", // 报销类型
                taxCity: "", // 发票城市
                id: "", // 报销ID，新建时为空
                procInsId: "", // 报销ID，新建时为空
                projectId: "", // 项目id
                projectPersonel: "", // 项目负责人

                relationTheme: "", // 接待关联code / 出差关联code
                relationName: "", //  // 关联名称
                employees: [], //陪客人员
                // expenseAttachment:[],
                remarks:"",
                travelExpenseTypeListName:[],
                entourageListName:[],
                relType:''
            },
            expenseAttachment: [], // 读取和提交时均做转换
            total: null,
            recepTotal: null,
            projectName:"",
            relatThemProName:"",
            expTypeList: [],
            taxList: [],
            fileURL: process.env.BASE_API + '/commonInfo/fileUpload',
            listLoading: false,
            list: [],
            recep: [],
            memberList: [],
            recepName: "",
            fullName:"",
            projectType: "",
            multipleSelection: [],
            pageNo: 1,
            pageSize: 10,
            listQuery: {
                themetimeRange: [],
                procName: "",
                beginApplyTime: "",
                endApplyTime: "",
            },
            uploadTips: config.tips
        }
    },
    created() {
        //时间转换
        this.filter.applyTime = common.time.monthlast;
        // 清空store集合
        this.$store.dispatch('clearCollection');
        this.userInfo = JSON.parse(localStorage.getItem("web_oa_userInfor"));
        // 编辑时
        if (this.$route.query.key) {
            getDetail({
                expenseFlowId: this.$route.query.key
            }).then(res => {
                this.filter.applyType = res.data.detail.applyType;
                this.filter.taxCity = res.data.detail.taxCity;
                this.filter.applyTime = res.data.detail.applyTime; // 仅做展示，后台不需要
                this.filter.remarks = res.data.detail.remarks

                this.filter.id = res.data.detail.id;
                this.filter.projectId = res.data.detail.projectId;
                this.filter.employees = res.data.detail.employees;
                this.filter.procInsId = res.data.detail.procInsId;
                //处理报销明细的数据
                this.filter.entourageListName =  res.data.detail.entourageListName;
                this.filter.travelExpenseTypeListName = res.data.detail.travelExpenseTypeListName;
                this.filter.relType =  res.data.detail.relType;

                var itemDatas = res.data.flowDetailList || [];
                itemDatas.forEach((item,index)=>{
                    itemDatas[index].startDate = common.timeParseObj(item.startDate);
                    itemDatas[index].endDate = common.timeParseObj(item.endDate);
                })
                this.$store.dispatch('fillDetailCollection', this.transDetailData(itemDatas));

                // 接待报销/出差报销时填充关联主体
                
                if (res.data.detail.applyType == 2 || res.data.detail.applyType == 3) {
                    this.filter.relationName = res.data.detail.relationThemeName.substring(0,20)+ '...';
                    this.fullName = res.data.detail.relationThemeName;
                    this.relatThemProName = res.data.detail.projectLabel;
                    this.filter.relationTheme = res.data.detail.relationTheme;
                    this.filter.projectPersonel = res.data.detail.projectPersonel;
                }else{
                    this.projectName = res.data.detail.projectLabel;
                    this.filter.projectPersonel = res.data.detail.projectPersonel;
                }
                
                
                if (res.data.detail.expenseAttachmentWeb && res.data.detail.expenseAttachmentWeb.length > 0) {
                    res.data.detail.expenseAttachmentWeb.forEach(item => {
                        let originUrl = item.url;
                        item.url = res.data.detail.expenseAttachmentPrefix + item.url;
                        this.expenseAttachment.push({ url: item.url, name: item.fileName, originUrl: originUrl });
                    })
                }
                
            })
        }
        // store中没值时，从接口获取存入store
        if (this.subsTree.length == 0) {
            this.$store.dispatch('getSubs');
        }
    },
    computed: {
        ...mapState({
            subsTree: state => state.reim.subsTree,
            subsList: state => state.reim.subsList,
            firstSub: state => state.reim.firstSub,
            token: state => state.user.token,
            detailCollection: state => state.reim.detailCollection,
            //   userInfo: state =>state.user.userInfo
        }),
        expenseTotal() {
            let result = 0;
            for (let i = 0; i < this.detailCollection.length; i++) {
                result += Number(this.detailCollection[i].expenseAmt*100);
            }
            return result/100;
        },
        billNum() {
            let result = 0;
            for (let i = 0; i < this.detailCollection.length; i++) {
                result += Number(this.detailCollection[i].billNum);
            }
            return result;
        }
    },
    mounted() {
        //获取字典
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
        this.expTypeList = selectDic(dicList, "oa_expense_type");
        this.taxList = selectDic(dicList, "tax_city");

        getMember({}).then(res => {
            this.memberList = res.data;
        })

    },
    methods: {
        clearLink(){
            this.filter.projectPersonel ='';
            this.filter.projectId = '';
            this.relatThemProName = "";
            this.projectName = "";
            this.filter.relationName = ""
            this.filter.relationTheme = ""
            this.filter.employees = [];
            this.filter.entourageListName = [];
            this.filter.travelExpenseTypeListName =[];
            this.filter.relType ="";
        },
        handleThemeFilter(){
            this.pageNo = 1
            // if(this.listQuery.projectName){
                this.$$queryStub = fromJS(this.listQuery);
                this.getRecep()
                this.listLoading = false
            // }
        },
        // handleProFilter(){
        //     this.listQuery.pageNo = 1
        //     this.getList()
        // },
        proSelect(data){
            this.filter.projectId = data.id;
            this.filter.projectPersonel = data.projectLeaderName;
        },
        transDetailData(dataArr) {
            function createUid() {
                return parseInt(Math.random() * 100000) + "" + new Date().getTime();
            }
            // 转换接口明细的数据结构
            let detailCollection = dataArr.map(i => {
                return {
                    ...i,
                    selectedSubject: [i.firstSub, i.secondSub],
                    uid: createUid(),
                    checked: false
                }
            })
            return detailCollection;
        },
        selectAll(val) {
            this.$store.dispatch('fillDetailCollectionChecked', val);
        },
        add() {
            if (this.detailCollection.length > 30) {
                this.$message({
                    message:'明细条目超出限制',
                    type:'warning'
                })
            } else {
                this.$store.dispatch("addDetail");
            }
        },
        del() {
            this.$store.dispatch('delDetailCollectionChecked');
        },
        // showForm() {
        //     this.dialogFormVisible = true;
        //     this.listLoading = false;
        //     this.getList()
        // },
        showRelat() {
            this.dialogRelatVisible = true;
            this.restListQuery();
            this.recep = [];
            
            this.getRecep();
            this.listLoading = false;
        },
        // 选择项目
        // selectProject(row) {
        //     this.projectName = row.projectName
        //     this.filter.projectId = row.id
        //     this.filter.projectPersonel = row.projectLeaderName
        //     this.dialogFormVisible = false
        // },
        selectRelat(row) {
            this.fullName = row.procName;
            this.filter.relationName = row.procName.substring(0,20)+'...';
            this.filter.relationTheme = row.procCode;
            this.relatThemProName = row.projectName;
            this.filter.projectId = row.projectId;
            this.filter.projectPersonel = row.projectPersonel;

            this.filter.entourageListName = row.entourageListName;
            this.filter.travelExpenseTypeListName =row.travelExpenseTypeListName;
            this.filter.relType = row.relType;
            this.dialogRelatVisible = false
        },
        // getList() {
        //     this.listLoading = true
        //     var {applyTimeStart,applyTimeEnd} = common.rangeObjToTimestamp(this.timeRange)
        //     fetchProList({
        //         ...this.listQuery,
        //         applyTimeStart,
        //         applyTimeEnd,
        //     }).then(res => {
        //         this.list = res.data.list
        //         this.total = res.data.total
        //         this.listLoading = false
        //     })
        // },
        getRecep() {
            this.listLoading = true
            var postData = this.reduceParams(this.$$queryStub);
            fetchThemeList({
                ...postData,
                applyType:this.filter.applyType,
                pageNo:this.pageNo,
                pageSize:this.pageSize
            }).then(res => {
                this.recep = res.data.list
                this.recepTotal = res.data.total
                this.listLoading = false
            })
        },
        reduceParams($$imData) {
            if (!$$imData || $$imData.size == 0) return {};
            const $$postData = $$imData
                .set('beginApplyTime', common.rangeObjToTimestamp($$imData.get('themetimeRange').toJS()).applyTimeStart)
                .set('endApplyTime', common.rangeObjToTimestamp($$imData.get('themetimeRange').toJS()).applyTimeEnd)
                .delete('themetimeRange')
            return $$postData.toJS();
        },
        restCallback() {
            
            // 用来补充默认rest不足的问题
        },
        // handleCurrentChange(val) {
        //     this.listQuery.pageNo = val
        //     this.getList()
        // },
        recepCurrentChange(val) {
            this.pageNo = val
            this.getRecep()
        },
        // 附件上传成功
        handleSuccess(res, file, fileList) {
            if(res.data.resCode == 1){
                let url =res.data.storfiles.serverUrl + res.data.storfiles.url
                this.expenseAttachment.push({ originUrl:res.data.storfiles.url ,name:file.name,url:url})
            }
        },
        // 附件移除
        handleRemove(file, fileList) {
            this.expenseAttachment.map((item, index) => {
                if (item.name == file.name) {
                    this.expenseAttachment.splice(index, 1)
                }
            })
        },
        beforeUpload(file) {
            return utils.handleImgError(file)
        },
        backStep() {
            this.$router.go(-1)
        },
        // 将store数组转换成接口所需的
        getItemsInStore() {
            let expenseDetail = this.detailCollection.map(i => {
                return {
                    ...i,
                    firstSub: i.selectedSubject[0] || '',
                    secondSub: i.selectedSubject[1] || '',
                    startDate: common.timeParse(i.startDate),
                    endDate: common.timeParse(i.endDate),
                }
            })
            return expenseDetail;
        },
        // 提交
        submit(type) {
            this.filter.billNum = this.billNum;
            this.filter.expenseTotal = this.expenseTotal
            this.filter.expenseAttachmentWeb = [];
            this.expenseAttachment.forEach(item => {
                this.filter.expenseAttachmentWeb.push({ url: item.originUrl, name: item.name })
            })
            this.filter.expenseDetail = this.getItemsInStore();
            
            if (type == 'apply' && reimFormVali(this)) {
                expApply(this.filter).then(res => {
                    if (res.status == 0) {
                        this.$message({
                            message: res.message,
                            type: 'success'
                        })
                        this.$router.push({path:'/task/todo' })
                    }
                })
            }
            if(type == 'save') {
                expSave(this.filter).then(res => {
                    if (res.status == 0) {
                        this.$message({
                            message: res.message,
                            type: 'success'
                        })
                        this.$router.go(-1)
                    }
                })
            }
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.el-input--small .el-input__inner {
    height: 40px!important;
}
.left-red{
    color: red;
    position: absolute;
    left: 15px;
}
.right-red{
    color: red;
    position: absolute;
    left: 49%;
}
.remark{
    margin-top: 25px;
    margin-bottom: 8px;
    background-color: #fdfdfd;
    border: 1px solid#F2F7FA;
}
.remarkTitle{
  margin-right: 100px;
  float: left;
  margin-top: 28px;
  margin-left: 5px
}

.upload-container{
    margin: 50px
}
.editor-slide-upload{
    margin-bottom: 15px
}
.item-value{
  display:inline-block;
  border: 1px solid #dcdfe6;
  border-radius:4px;
  background: white;
  padding-left: 7px;
  line-height: 30px;
  width: 280px
}
.segment .el-table__body-wrapper {
    padding: 40px 20px 35px;
}
.ignore-detail {
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
}
.upload-img{
    width: 500px;
}
.toolbar-item{
    margin-left: 10px
}
</style>
