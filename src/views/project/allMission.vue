<template>
    <div class="sjb-container calendar-list-container">
        <div class="filter-container">
            <div class="toolbar-item">
                <span class="item-label">所属阶段：</span>
                <el-select clearable style="width: 120px" class="filter-item" v-model="listQuery.stageId" placeholder="请选择">
                    <el-option v-for="item in stageList" :label="item.stageName" :value="item.id" :key="item.id">
                    </el-option>
                </el-select>
            </div>

            
            <div class="toolbar-item">
                <span class="item-label">任务名称：</span>
                <el-input @keyup.enter.native="handleFilter" style="width: 180px;" class="filter-item" placeholder="请输入流程编号/标题" v-model.trim="listQuery.taskName">
                </el-input>
            </div>
            <div class="toolbar-item">
                <span class="item-label">状态：</span>
                <el-select clearable style="width: 120px" class="filter-item" v-model="listQuery.taskStatus" placeholder="请选择">
                    <el-option v-for="item in taskList" :key="item.value" :label="item.name" :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="toolbar-item">
                <span class="item-label">任务责任人：</span>
                <el-input @keyup.enter.native="handleFilter" style="width: 180px;" class="filter-item" placeholder="请输入流程名称" v-model="listQuery.principalName">
                </el-input>
            </div>
            <div class="toolbar-item">
                <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
                <el-button class="filter-item" type="warning" icon="el-icon-delete" @click="restListQuery(restCallback)">重置</el-button>
                <el-button class="filter-item" style="margin-left: 10px;" @click="addMission" type="primary" icon="el-icon-edit">新增任务</el-button>
            </div>
            <div class="toolmore-control">
                <!-- <div class="toolbar-item">
                    <el-button class="filter-item" type="primary" icon="el-icon-download" @click="exportFile">导出Excel</el-button>
                </div> -->
                <el-button icon="el-icon-arrow-up" v-if="toolexpand" class="toolmore-control-btn" @click="toolexpand = false">收起</el-button>
                <el-button icon="el-icon-arrow-down" v-else class="toolmore-control-btn" @click="toolexpand = true">展开</el-button>
            </div>
            <el-collapse-transition>
                <div v-show="toolexpand">
                    <div class="toolbar-row">
                        <div class="toolbar-item">
                            <span class="item-label">截止日期：</span>
                            <el-date-picker v-model="listQuery.endTimeRange" type="daterange" class="filter-item" style="width:287px" placeholder="选择日期范围"  :picker-options="pickerOptions">
                            </el-date-picker>
                        </div>
                        <div class="toolbar-item">
                            <span class="item-label">完成日期：</span>
                            <el-date-picker v-model="listQuery.finishTimeRange" type="daterange" class="filter-item" style="width:287px" placeholder="选择日期范围"  :picker-options="pickerOptions">
                            </el-date-picker>
                        </div>
                    </div>
                </div>
            </el-collapse-transition>
        </div>

        <el-table :data="list" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
            <el-table-column align="center" label="任务编号" width="150px">
                <template slot-scope="scope">
                    <span>{{scope.row.taskCode}}</span>
                </template>
            </el-table-column>
            <el-table-column width="200px" align="center" label="任务名称">
                <template slot-scope="scope">
                    <span style="color:#409EFF;cursor: Pointer;"  @click="showDetail(scope.row)">{{scope.row.taskName}}</span>
                </template>
            </el-table-column>
            <el-table-column width="150px" align="center" label="上级任务编号">
                <template slot-scope="scope">
                    <span>{{scope.row.parentTaskCode}}</span>
                </template>
            </el-table-column>
            <el-table-column width="150px" align="center" label="所属阶段">
                <template slot-scope="scope">
                    <span>{{scope.row.stageName}}</span>
                </template>
            </el-table-column>
            <el-table-column width="150px" align="center" label="状态">
                <template slot-scope="scope">
                    <span>{{scope.row.taskStatusName}}</span>
                </template>
            </el-table-column>
            <el-table-column width="80px" align="center" label="任务责任人">
                <template slot-scope="scope">
                    <span>{{scope.row.principalName}}</span>
                </template>
            </el-table-column>
            <el-table-column width="120px" align="center" label="任务发布人">
                <template slot-scope="scope">
                    <span>{{scope.row.taskCreateName}}</span>
                </template>
            </el-table-column>
            <el-table-column width="120px" align="center" label="开始日期">
                <template slot-scope="scope">
                    <span>{{scope.row.startTime | stamp2TextDate}}</span>
                </template>
            </el-table-column>
            <el-table-column width="120px" align="center" label="截止日期">
                <template slot-scope="scope">
                    <span :class="scope.row.endTime < Date.parse(new Date())?['ignore-detail','red']:'ignore-detail'">{{scope.row.endTime | stamp2TextDate}}</span>
                </template>
            </el-table-column>
            <el-table-column width="120px" align="center" label="完成日期">
                <template slot-scope="scope">
                    <span>{{scope.row.finishTime | stamp2TextDate}}</span>
                </template>
            </el-table-column>
            <el-table-column width="80px" align="center" label="参与人">
                <template slot-scope="scope">
                    <span>{{scope.row.participantNames}}</span>
                </template>
            </el-table-column>
            <el-table-column width="60px" align="center" label="进度">
                <template slot-scope="scope">
                    <span>{{scope.row.taskProgress}}</span>
                </template>
            </el-table-column>
            <el-table-column width="300px" align="center" label="操作" class-name="small-padding fixed-width">
                <template slot-scope="scope" v-if="scope.row.taskStatus == 0">
                    <el-button type="primary" size="mini" @click="showProgress(scope.row)">填写进度</el-button>
                    <el-button v-if="!scope.row.parentTaskCode" type="primary" size="mini" @click="addMission(scope.row)">新增子任务</el-button>
                    <el-button type="danger" size="mini" @click="showChange(scope.row)">变更</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="填写进度" width="25%" :visible.sync="dialogProgress">
            <div class="move-select">
                <div class="move-item">
                    <RedStar label="是否完成" :required="true">
                        <el-radio v-model="postData.isFinish" label="0">进行中</el-radio>
                        <el-radio v-model="postData.isFinish" label="1">已完成</el-radio>
                    </RedStar>
                </div>
                <div class="move-item" v-if="postData.isFinish == '0'">
                    <RedStar label="进度（%）：" :required="true">
                        <el-input type="number" placeholder="请输入" style="width:250px;" v-model.number="postData.taskProgress"></el-input>
                    </RedStar>
                </div> 
                <div class="move-item">
                    <RedStar label="进度说明：" :required="true">
                        <sjbtextarea type="textarea"  :rows="4" textStyle="width:250px" placeholder="请输入" v-model.trim="postData.progressDesc" :max="200"></sjbtextarea>
                    </RedStar>
                </div>
                <div class="move-item">
                    <RedStar label="上传附件">
                        <el-upload ref="upload" class="upload-img" :before-upload = "beforeUpload" :headers='{sessionid:token}' :action="fileURL" :file-list="attachment" :on-success="storeSuccess" :on-exceed="storeExceed" :limit="5">
                            <el-button size="small" type="primary">上传</el-button>
                            <div slot="tip" class="el-upload__tip">
                                最多可上传5个附件，支持jpg,jpeg,png,doc,docx,xls,xlsx,pdf格式
                            </div>
                        </el-upload>
                    </RedStar>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmAdd">确认</el-button>
                <el-button @click="dialogProgress = false">取消</el-button>
            </span>
        </el-dialog>
        <div class="pagination-container">
            <el-pagination background @current-change="handleCurrentChange" :current-page="pageNum" :page-size="20" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import common from '@/utils/common'
import { getAllPage,addProgress,getMissionStage } from '@/api/project'
import { toJS, fromJS, Map, List } from 'immutable';
import { parseTime } from '@/utils'
import { mapState, mapGetters } from "vuex";
import listQueryMix from '../../mixins/listQuery.mix';
import RedStar from "@/components/RedStar/RedStar.vue";
import sjbtextarea from '@/components/sjbTextarea/index.vue';
import config from '@/utils/config';
import utils from '@/utils/utils';

export default {
    mixins: [listQueryMix],
    components: {
        RedStar,
        sjbtextarea,
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
            total: 0,
            pageNum: 1,
            pageSize: 20,
            listQuery: {
                endTimeRange: [],
                finishTimeRange:[],
                principalName:"",
                taskName:"",
                stageId:"",
                taskStatus:""
            },
            stageList:[],
            taskList:[{
                value:"0",
                name:"进行中"
            },{
                value:"1",
                name:"已完成"
            }],
            dialogProgress:false,
            fileURL: process.env.BASE_API + '/webCommonInfo/fileUpload',
            uploadTips: config.tips,
            attachment:[],
            postData:{
                isFinish:"",
                taskProgress:"",
                progressDesc:"",
                pmsAttachment:""
            }
        }
    },
    computed: {
        ...mapState({
            token: state => state.user.token,
        })
    },
    created() {
        this.getList()
    },
    mounted(){
        getMissionStage(this.$route.query.key).then(res=>{
            if(res.code == 200){
                this.stageList = res.data
            }
        })
    },
    methods: {
        getList() {
            var postData = this.reduceParams(this.$$queryStub);
            getAllPage({
                ...postData,
                pageNum:this.pageNum,
                pageSize:this.pageSize,
                projectId:this.$route.query.key
            }).then(response => {
                this.list = response.data.list
                this.total = response.data.total
            })
        },
        restCallback() {
                // 用来补充默认rest不足的问题
        },
        // 处理接口不一致情况
        reduceParams($$imData) {
            if (!$$imData || $$imData.size == 0) return {};
            const $$postData = $$imData
                .set('endTimeBegin', common.rangeObjToTimestamp($$imData.get('endTimeRange').toJS()).applyTimeStart)
                .set('endTimeFinish', common.rangeObjToTimestamp($$imData.get('endTimeRange').toJS()).applyTimeEnd)
                .set('finishTimeStart', common.rangeObjToTimestamp($$imData.get('finishTimeRange').toJS()).applyTimeStart)
                .set('finishTimeEnd', common.rangeObjToTimestamp($$imData.get('finishTimeRange').toJS()).applyTimeEnd)
                .delete('endTimeRange')
                .delete('finishTimeRange')
            return $$postData.toJS();
        },
        showDetail(row){
            this.$router.push({
                path: "/inforManage/pmsSonDetail",
                query: { key: row.id}
            });
        },
        handleFilter() {
            this.pageNum = 1
            if(!this.listQuery.endTimeRange){
                this.listQuery.endTimeRange = []
            }
            if(!this.listQuery.finishTimeRange){
                this.listQuery.finishTimeRange = []
            }
            this.$$queryStub = fromJS(this.listQuery);
            this.getList()
        },
        handleCurrentChange(val) {
            this.pageNum = val
            this.getList()
        },
        showChange(row){

            this.$router.push({
                path:'/inforManage/changeMission',
                query: { projectId:this.$route.query.key, taskId: row.id }
            })
        },
        addMission(row){
             this.$router.push({
                path:'/inforManage/addProgress',
                query: { projectId:this.$route.query.key ,parentTaskCode: row.taskCode }
            })
        },
        showProgress(row){
            this.taskId = row.id
            this.dialogProgress = true;
        },
        confirmAdd(){
            this.postData.pmsAttachment = [];
            this.attachment.forEach(item=>{
                this.postData.pmsAttachment.push({attachmentUrl: item.originUrl, fileName: item.name})
            })
            addProgress(this.taskId,this.postData).then(res=>{
                if(res.code ==200){
                    this.$message({
                        type:"success",
                        message: res.message
                    })
                    this.dialogProgress = false;
                    this.getList()
                }
            })
        },
        beforeUpload(file) {
            return utils.handleImgError(file)
        },
        storeExceed(){
            this.$message({
                message: "批量上传文件一次只能上传五个文件！",
                type: 'error'
            })
        },
        storeSuccess(res, file, fileList){
            if(res.data.resCode == 1){
                this.$message({
                    message: res.data.resDesc,
                    type: 'success'
                })
                let url =res.data.storfiles.serverUrl + res.data.storfiles.url
                this.attachment.push({ originUrl:res.data.storfiles.url ,name:file.name,url:url,uid:file.uid})
            }else{
                this.$message({
                    message:  res.data.resDesc,
                    type: 'error',
                    duration:10000
                })
                this.attachment = []
            }
            
        },
        exportFile(){
             this.$router.push({
                path:'/inforManage/changeMission',
                // query: { key: row.id ,pathType:'list'}
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

</style>