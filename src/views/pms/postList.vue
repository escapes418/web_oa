<template>
  <div class="postContain">
    <ul v-for="(item, index) in list" :key="index" style="margin-left:20px">
      <li v-html="item.operateInfo"></li>
      <i v-if="item.operateType == 3" class="el-icon-plus" @click="jumpChange(item)"></i>
    </ul>
    <el-pagination
      style="margin-left:20px"
      background
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <el-dialog title="新建关联合同" :visible.sync="dialogFormVisible">
      <el-row>
        <el-col :span="8" class="segment-brline">
          <div class="changeTitle">
            变更项
          </div>
          <div>
            任务编号
          </div>
          <div>
            上级任务编号
          </div>
          <div>
            任务名称
          </div>
          <div>
            所属阶段
          </div>
          <div>
            任务责任人
          </div>
          <div>
            参与人
          </div>
          <div>
            开始日期
          </div>
          <div>
            截止日期
          </div>
          <div>
            任务详细说明
          </div>
          <div>
            备注
          </div>
        </el-col>
        <el-col :span="8">
          <div class="changeTitle">变更前</div>
          <div style="height:32px">{{ preTaskInfo.taskCode }}</div>
          <div style="height:32px">{{ preTaskInfo.parentTaskCode }}</div>
          <div style="height:32px">{{ preTaskInfo.taskName }}</div>
          <div style="height:32px">{{ preTaskInfo.projectStageName }}</div>
          <div style="height:32px">{{ preTaskInfo.principalName }}</div>
          <div style="height:32px">{{ preTaskInfo.participantNames }}</div>
          <div style="height:32px">{{ preTaskInfo.startTime | stamp2TextDate }}</div>
          <div style="height:32px">{{ preTaskInfo.endTime | stamp2TextDate }}</div>
          <div style="height:32px">{{ preTaskInfo.taskDesc }}</div>
          <div style="height:32px">{{ preTaskInfo.remark }}</div>
        </el-col>
        <el-col :span="8">
          <div class="changeTitle red">变更后</div>
          <div style="height:32px">{{ postTaskInfo.taskCode }}</div>
          <div style="height:32px">{{ postTaskInfo.parentTaskCode }}</div>
          <div style="height:32px">{{ postTaskInfo.taskName }}</div>
          <div style="height:32px">{{ postTaskInfo.projectStageName }}</div>
          <div style="height:32px">{{ postTaskInfo.principalName }}</div>
          <div style="height:32px">{{ postTaskInfo.participantNames }}</div>
          <div style="height:32px">{{ postTaskInfo.startTime | stamp2TextDate }}</div>
          <div style="height:32px">{{ postTaskInfo.endTime | stamp2TextDate }}</div>
          <div style="height:32px">{{ postTaskInfo.taskDesc }}</div>
          <div style="height:32px">{{ postTaskInfo.remark }}</div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getDynamic } from "@/api/project";
import { taskDetailInfo, taskDetailInfoAttachmentlist, getdetailDynamic, getdetailChangeRecord } from "@/api/pms";

export default {
  data() {
    return {
      list: [],
      pageNum: 1,
      pageSize: 20,
      total: 0,
      dialogFormVisible: false,
      preTaskInfo: {},
      postTaskInfo: {}
    };
  },
  props: {
    dynamicType: {
      type: String,
      default: "1"
    },
    projectId: {
      type: [Number, String],
      default: 0
    }
  },
  created() {
    this.getList();
  },
  mounted() {},
  methods: {
    getList() {
      getdetailDynamic({
        // dynamicType:this.dynamicType,
        taskId: this.projectId,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res => {
        this.list = res.data.list;
        this.total = res.data.total;
      });
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.getList();
    },
    jumpChange(item) {
      getdetailChangeRecord({
        businessType: "2",
        businessId: item.id
      }).then(res => {
        this.preTaskInfo = res.data.preTaskInfo;
        this.postTaskInfo = res.data.postTaskInfo;
        this.dialogFormVisible = true;
      });
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.postContain {
  margin: 5px 0 5px 0;
  li {
    line-height: 28px;
    display: inline-block;
  }
}
.segment .el-table__body-wrapper {
  padding: 40px 20px 35px;
}
.segment-area {
  font-size: 13px;
}
.changeTitle {
  text-align: center;
  background: rgb(238, 241, 246);
  margin-top: 15px;
  font-size: 16px;
}
.red {
  color: red;
}
</style>
