<template>
  <div>
    <el-table
      :key="tableKey"
      :data="list"
      v-loading="listLoading"
      element-loading-text="给我一点时间"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column align="center" label="项目名称" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span class="ignore-detail">{{ scope.row.projectName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="任务编号" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span class="ignore-detail">{{ scope.row.taskCode }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="任务名称" width="120px" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span style="color:#409EFF;cursor: Pointer;" @click="handleDetail(scope.row)">{{ scope.row.taskName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="上级任务编号" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span class="ignore-detail">{{ scope.row.parentTaskCode }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="所属阶段" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span class="ignore-detail">{{ scope.row.stageName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span class="ignore-detail">{{ scope.row.taskStatusName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="任务责任人" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span class="ignore-detail">{{ scope.row.principalName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="任务发布人" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span class="ignore-detail">{{ scope.row.taskCreateName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="开始日期" width="140px">
        <template slot-scope="scope">
          <span class="ignore-detail">{{ scope.row.startTime | stamp2TextDateFull }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="截止日期" width="140px">
        <template slot-scope="scope">
          <span
            :class="scope.row.endTime < today && scope.row.taskStatus != 1 ? ['ignore-detail', 'red'] : 'ignore-detail'"
            >{{ scope.row.endTime | stamp2TextDateFull }}</span
          >
        </template>
      </el-table-column>
      <el-table-column align="center" label="完成日期" width="140px">
        <template slot-scope="scope">
          <span class="ignore-detail">{{ scope.row.finishTime | stamp2TextDateFull }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="参与人" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span class="ignore-detail">{{ scope.row.participantNames }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="进度" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span class="ignore-detail">{{ scope.row.taskProgress }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="320px">
        <template slot-scope="scope">
          <el-button v-if="scope.row.taskStatus != 1" type="primary" size="mini" @click="openSchedule(scope.row.id)"
            >填写进度</el-button
          >
          <el-button
            v-if="!scope.row.parentTaskCode && scope.row.taskStatus != 1"
            type="primary"
            size="mini"
            @click="handleSubtasks(scope.row)"
            >新建子任务</el-button
          >
          <el-button v-if="scope.row.taskStatus != 1" type="danger" size="mini" @click="handleChange(scope.row)"
            >变更</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="填写进度" width="35%" :visible.sync="showSchedule" @close="cancelBtn">
      <el-form ref="form" label-width="220px" label-position="left">
        <RedStar :required="true">
          <el-form-item label="是否完成：">
            <el-radio-group v-model="schedule.isFinish">
              <el-radio :label="0">进行中</el-radio>
              <el-radio :label="1">已完成</el-radio>
            </el-radio-group>
          </el-form-item>
        </RedStar>
        <RedStar :required="true" v-if="schedule.isFinish != 1">
          <el-form-item label="进度(%)：">
            <el-input
              style="width: 180px;"
              class="filter-item"
              placeholder="请填写进度"
              v-model.number="schedule.taskProgress"
              :maxlength="2"
            >
            </el-input>
          </el-form-item>
        </RedStar>
        <RedStar :required="true">
          <el-form-item label="进度说明：">
            <sjbtextarea
              placeholder="请输入进度说明"
              textStyle="width:250px;"
              :rows="3"
              :max="200"
              v-model.trim="schedule.progressDesc"
            ></sjbtextarea>
          </el-form-item>
        </RedStar>
        <RedStar :required="false">
          <el-form-item label="附件">
            <el-upload
              ref="upload"
              class="upload-img"
              :before-upload="beforeUpload"
              :headers="{ sessionid: token }"
              :on-remove="handleRemove"
              :action="fileURL"
              :file-list="pmsAttachment"
              :on-success="handleSuccess"
              :limit="5"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">
                只能上传png、gif、jpeg、jpg , pdf、ppt、xls、xlsx、pptx、doc、docx格式文件！
              </div>
            </el-upload>
          </el-form-item>
        </RedStar>
        <el-form-item>
          <el-button type="primary" @click="confirmUpload()">确定</el-button>
          <el-button @click="cancelBtn">取消</el-button>
        </el-form-item>
        <!-- <RedStar :required ="true">
                    <el-form-item label="批量入库模板：">
                        <el-button size="small" @click="DLmodel">下载模版</el-button>
                    </el-form-item>
                </RedStar>
                <el-form-item>
                    <el-button type="primary" @click="confirmUpload">立即创建</el-button>
                    <el-button @click="cancelBtn">取消</el-button>
                </el-form-item> -->
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import RedStar from "@/components/RedStar/RedStar.vue";
import { mapState } from "vuex";
import { fetchComInfoList, downLoadContract } from "@/api/customer";
import config from "@/utils/config";
import sjbtextarea from "@/components/sjbTextarea";
import utils from "@/utils/utils";
export default {
  components: {
    sjbtextarea,
    RedStar
  },
  data() {
    return {
      tableKey: 0,
      showSchedule: false,
      contractCompanyCode: "",
      dialogVisible: false,
      secondPartyName: "",
      today: Date.parse(new Date()),
      comInfor: [],
      isSchedule: "",
      uploadTips: config.tips,
      id: "",
      schedule: {
        taskProgress: "",
        isFinish: "",
        id: "",
        progressDesc: "",
        pmsAttachment: []
      },
      fileURL: process.env.BASE_API + "/webCommonInfo/fileUpload",
      pmsAttachment: []
    };
  },
  computed: {
    ...mapState({
      custListPlace: state => state.cust.custListPlace,
      ids: state => state.permission.ids,
      token: state => state.user.token
    })
  },
  props: {
    list: Array,
    listLoading: Boolean
  },
  methods: {
    handleDetail(row) {
      if (row.parentTaskCode == "") {
        this.$router.push({
          path: "/inforManage/pmsDetail",
          query: { key: row.id }
        });
      } else {
        this.$router.push({
          path: "/inforManage/pmsSonDetail",
          query: { key: row.id, taskCode: row.taskCode }
        });
      }
    },
    downLoadContractDiaLog(row) {
      this.downLoadId = row.id;
      this.dialogVisible = true;
    },
    // handleSchedule(el){
    //     this.showSchedule = true;
    //     this.isSchedule = el.taskStatus
    // },
    openSchedule(id) {
      this.showSchedule = true;
      this.schedule.id = id;
    },
    vail() {
      var flag = true;
      if (this.schedule.isFinish === "") {
        this.$message({
          message: "请选择是否完成！",
          type: "warning"
        });
        return (flag = false);
      }
      if (this.schedule.isFinish != 1) {
        if (this.schedule.taskProgress == "") {
          this.$message({
            message: "请填写进度！",
            type: "warning"
          });
          return (flag = false);
        }
        if (!/^([0-9]{1,2})$/.test(this.schedule.taskProgress)) {
          this.$message({
            message: "进度只允许输入数字！",
            type: "warning"
          });
          return (flag = false);
        }
      }
      if (this.schedule.progressDesc == "") {
        this.$message({
          message: "请填写进度说明！",
          type: "warning"
        });
        return (flag = false);
      }
      return flag;
    },
    beforeUpload(file) {
      return utils.handleImgError(file);
    },
    handleExceed() {
      this.$message({
        message: "批量上传文件一次只能上传5个文件！",
        type: "error"
      });
    },
    handleRemove(file, fileList) {
      this.pmsAttachment.map((item, index) => {
        if (item.name == file.name) {
          this.pmsAttachment.splice(index, 1);
        }
      });
    },
    handleSuccess(res, file, fileList) {
      this.pmsAttachment.push({
        name: file.name,
        fileName: res.data.storfiles.fileName,
        attachmentUrl: res.data.storfiles.url
      });
      if (res.code == 200 && res.data.resCode == 1) {
        this.$message({
          message: res.data.resDesc,
          type: "success"
        });
      } else {
        this.$message({
          showClose: true,
          message: res.data.resDesc || "网络异常",
          type: "error"
        });
        this.pmsAttachment.pop();
      }
    },
    confirmUpload() {
      // this.$refs.upload.submit()
      if (!this.vail()) return;
      this.showSchedule = false;
      this.schedule.pmsAttachment = this.pmsAttachment;
      this.$emit("on-upload", this.schedule);
    },
    cancelBtn() {
      this.showSchedule = false;
      this.pmsAttachment = [];
      this.schedule.taskProgress = "";
      this.schedule.isFinish = "";
      this.schedule.progressDesc = "";
    },
    handleSubtasks(row) {
      this.$router.push({
        path: "/inforManage/addProgress",
        query: { projectId: row.projectId, parentTaskCode: row.taskCode }
      });
    },
    handleChange(row) {
      this.$router.push({
        path: "/inforManage/changeMission",
        query: { projectId: row.projectId, taskId: row.id }
      });
    }
  },
  created() {}
};
</script>
<style>
.red {
  color: red;
}
</style>
