<template>
  <div class="sjb-form-wrapper">
      <div id="pdf-wrap">
          <div class="segment statistics part-wrap" id="part-wrap">
        <div class="segment-header">
            基本信息
        </div>
        <div class="segment-area">
            <el-row>
                <el-col :span="12" class="segment-brline">
                    <div class="clearfix  cominfo-item">
                        <span class="left-title font-gray">任务编号：</span>
                        <span class="right-con">{{ detail.taskCode }}</span>
                    </div>
                    <div class="clearfix cominfo-item">
                        <span class="left-title font-gray">任务名称：</span>
                        <span class="right-con">{{ detail.taskName }}</span>
                    </div>
                    <div class="clearfix  cominfo-item">
                        <span class="left-title font-gray">状态：</span>
                        <span class="right-con">{{ detail.taskStatus==0?"进行中":"已完成" }}</span>
                    </div>
                    <div class="clearfix  cominfo-item">
                        <span class="left-title font-gray">任务责任人：</span>
                        <span class="right-con">{{ detail.principalName }}</span>
                    </div>
                    <div class="clearfix  cominfo-item">
                        <span class="left-title font-gray">开始日期：</span>
                        <span class="right-con">{{ detail.startTime | stamp2TextDate}}</span>
                    </div>
                    <div class="clearfix  cominfo-item">
                        <span class="left-title font-gray">完成日期：</span>
                        <span class="right-con">{{ detail.finishTime | stamp2TextDate }}</span>
                    </div>
                    <div class="clearfix  cominfo-item">
                        <span class="left-title font-gray">任务详细说明：</span>
                        <span class="right-con">{{ detail.taskDesc }}</span>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="clearfix cominfo-item">
                        <span class="left-title font-gray">所属阶段：</span>
                        <span class="right-con">{{ detail.stageName }}</span>
                    </div>
                    <div class="clearfix cominfo-item">
                        <span class="left-title font-gray">进度：</span>
                        <span class="right-con">{{ detail.taskProgress }}</span>
                    </div>
                    <div class="clearfix  cominfo-item">
                        <span class="left-title font-gray">参与人：</span>
                        <span class="right-con">{{  detail.participantNames }}</span>
                    </div>
                    <div class="clearfix  cominfo-item">
                        <span class="left-title font-gray">截止日期：</span>
                        <span class="right-con">{{ detail.endTime | stamp2TextDate }}</span>
                    </div>
                    <div class="clearfix  cominfo-item">
                        <span class="left-title font-gray">任务发布人：</span>
                        <span class="right-con">{{ detail.taskCreateName }}</span>
                    </div>
                    <div class="clearfix  cominfo-item">
                        <span class="left-title font-gray">备注：</span>
                        <span class="right-con">{{ detail.remark }}</span>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
    <div class="segment statistics">
      <div class="segment-header">
            附件
        </div>
        <div class="segment-area">
          <div class="el-table__body-wrapper">
            <el-table
                :data="list"
                 border>
                <el-table-column
                    label="上传时间"
                    prop="startDate">
                    <template slot-scope="scope">
                        <span>{{scope.row.createTime | stamp2TextDateFull}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="附件名称"  
                    prop="endDate">
                    <template slot-scope="scope">
                        <span>{{scope.row.fileName}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="上传人"
                    prop="expenseAmt">
                    <template slot-scope="scope">
                        <span class="font-orange">{{ scope.row.createName}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="上传操作"  
                    prop="endDate">
                    <template slot-scope="scope">
                        <span>{{scope.row.operateReason}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"  
                    prop="endDate">
                    <template slot-scope="scope">
                        <el-button type="text" v-if="type == 2" @click="downloadBtn(scope.row)">下载</el-button>
                        <el-button type="text" v-if="type == 1" @click="lookBtn(scope.row)">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-container">
            <el-pagination background @current-change="handleCurrentChange" :current-page="pageNum" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
          </div>
        </div>
    </div>
    <div class="segment statistics">
      <div class="segment-header">
            子任务
        </div>
        <div class="segment-area">
          <div class="el-table__body-wrapper">
            <el-table
                :data="sonList"
                 border>
                <el-table-column
                    label="任务编号"
                    prop="startDate">
                    <template slot-scope="scope">
                        <span>{{scope.row.taskCode}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="任务名称"  
                    prop="endDate">
                    <template slot-scope="scope">
                        <!-- <span>{{scope.row.fileName}}</span> -->
                        <el-button type="text"  @click="goSon(scope.row)">{{scope.row.taskName}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    label="所属阶段"
                    prop="expenseAmt">
                    <template slot-scope="scope">
                        <span class="font-orange">{{ scope.row.stageName}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="状态"  
                    prop="endDate">
                    <template slot-scope="scope">
                        <span>{{scope.row.taskStatus==0?"进行中":"已完成"}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="任务责任人"  
                    prop="endDate">
                    <template slot-scope="scope">
                        <span>{{scope.row.principalName}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="进度"  
                    prop="endDate">
                    <template slot-scope="scope">
                        <span>{{scope.row.taskProgress}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="截止日期"  
                    prop="endDate">
                    <template slot-scope="scope">
                        <span>{{scope.row.endTime | stamp2TextDateFull}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="完成日期"  
                    prop="endDate">
                    <template slot-scope="scope">
                        <span>{{scope.row.finishTime | stamp2TextDateFull}}</span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-container">
            <el-pagination background @current-change="handleSonCurrentChange" :current-page="sonpageNum" :page-size="sonPageSize" layout="total, prev, pager, next, jumper" :total="sonTotal">
            </el-pagination>
        </div>
          </div>
        </div>
    </div>
      </div>
    
    <div style="padding:20px">
        <sjbtextarea
            :rows="3"
            textStyle="margin-top:20px;margin-bottom:20px"
            placeholder="请输入内容"
            :max="200"
            @textBlur="postBlur"
            v-model.trim="dynamicInfo">
        </sjbtextarea>
    </div>
    <div style="padding:20px">
            <el-upload class="upload-img" :action="fileURL" :headers='{ sessionid:token}' :on-remove="handleRemove" :before-upload = "beforeUpload" :on-success="handleSuccess" :file-list="expenseAttachment">
            附件（{{expenseAttachment.length}}）个
            <i class="iconfont icon-fujian avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">{{uploadTips}}</div>
        </el-upload>
    </div>
    <postList :projectId="$route.query.key" :dynamicType="activePost" ref="postList1"></postList>
  </div>
</template>

<script>
import common from '@/utils/common'
import { taskDetailInfo , taskDetailInfoAttachmentlist , taskDetailInfoSubTask} from '@/api/pms'
import { fetchForm, custList, savePro  , getContractList ,getNodeList,getImList,downFile,getBaseInfo,getProgress,addDynamic} from "@/api/project";
import { parseTime } from '@/utils'
import "viewerjs/dist/viewer.css";
import Viewer from "viewerjs";
import config from '@/utils/config';
import sjbtextarea from '@/components/sjbTextarea/index.vue';
import postList from "./postList";
import { mapState, mapGetters } from "vuex";
export default {
    name: 'complexTable',
    components: {
        sjbtextarea,
        postList
    },
    data() {
        return {
            flowDetailList:[],
            budgetDetailList:[],
            flowLoglist:[],
            detail:{},
            expenseAttachment:[],
            comment:'',
            fileURL: process.env.BASE_API + '/webCommonInfo/fileUpload',
            taskId:0,
            pathType:"",
            uploadTips: config.tips,
            dialogDelVisible:false,
            finish:false,
            activePost:"1",
            pageNum: 1,
            pageSize: 10,
            list: [],
            total: 0,
            urlArr: {},
            sonpageNum: 1,
            dynamicInfo:"",
            sonPageSize: 10,
            sonList: [],
            sonTotal: 0,
        }
    },
    computed:{
        ...mapState({
            token: state => state.user.token,
        }),
    },
    created(){
        this.userInfo = JSON.parse(localStorage.getItem("web_oa_userInfor"));
        taskDetailInfo(this.$route.query.key
        ).then(res =>{
            this.detail = res.data.taskInfo
            this.getListData();
            this.getSonListData();
        });
  },
  methods:{
        backBtn(){
            this.$router.go(-1)
        },
        downloadBtn(e){
            var url = `./OA${e.attachmentUrl}`;
            window.location.href = url;
        },
        lookBtn(e){
            this.urlArr={
                url: e.attachmentUrl,
                name: item.fileName,
                previewUrl: e.attachmentUrl,
                viewer: null
            }
            if (this.urlArr.viewer) {
                this.urlArr.viewer.show();
                return;
            }
            this.urlArr.viewer = new Viewer(event.target, {});
            this.urlArr.viewer.show();
        },
        postBlur(){
            let pmsAttachment = []
            this.expenseAttachment.forEach(item=>{
                let obj = {}
                obj.fileName = item.name
                obj.attachmentUrl = item.originUrl
                pmsAttachment.push(obj)
            })
            if(!this.dynamicInfo){
                this.$message({
                    message:"请正确填写动态信息",
                    type:'error'
                })
                return
            }
            addDynamic({
                projectId:this.$route.query.key,
                dynamicInfo:this.dynamicInfo,
                pmsAttachment:pmsAttachment
            }).then(res=>{
                if(res.code == 200){
                    this.$message({
                        message:res.message,
                        type:'success'
                    })
                    this.$refs.postList1.getList()
                }
            })
        },
        handleCurrentChange(){
            this.pageNum = val;
            this.getListData();
        },
        getListData(){
            taskDetailInfoAttachmentlist({
                taskCode:this.detail.taskCode,
                pageNum:this.pageNum,
                pageSize:this.pageSize
            }).then(response => {
                this.list = response.data.list;
                this.total = response.data.total;
                this.list.forEach((el,index)=>{
                    var fileSuffix = ['png','gif','jpeg','jpg']
                    var typeArr = el.fileName.join(".")
                    var typeName = typeArr[typeArr.length-1]
                    if(fileSuffix.indexOf(typeName) !== -1){
                        el.type = 1
                    } else{
                        el.type = 2
                    }
                })
            });
        },
        goSon(row){
            this.$router.push({
                path: "/inforManage/pmsSonDetail",
                query: { key: row.id,taskCode:this.detail.taskCode}
            });
        },
        handleSuccess(res, file, fileList) {
            if(res.data.resCode == 1){
                let url =res.data.storfiles.serverUrl + res.data.storfiles.url
                this.expenseAttachment.push({ originUrl:res.data.storfiles.url ,name:file.name,url:url,uid:file.uid})
            }
        },
        // 附件移除
        handleRemove(file, fileList) {
            this.expenseAttachment.map((item, index) => {
                if (item.uid == file.uid) {
                    this.expenseAttachment.splice(index, 1)
                }
            })
        },
        beforeUpload(file) {
            return utils.handleImgError(file)
        },
        handleSonCurrentChange(){
            this.sonpageNum = val;
            this.getSonListData();
        },
        getSonListData(){
            taskDetailInfoSubTask({
                taskCode:this.detail.taskCode,
                pageNum:this.sonpageNum,
                pageSize:this.sonPageSize
            }).then(response => {
                this.sonList = response.data.list;
                this.sonTotal = response.data.total;
            });
        },
    },
    mounted(){
        
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.segment .el-table__body-wrapper {
  padding: 40px 20px 35px;
}

</style>