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
          <div style="height:32px">
            任务编号
          </div>
          <div style="height:32px">
            上级任务编号
          </div>
          <div style="height:32px">
            任务名称
          </div>
          <div style="height:32px">
            所属阶段
          </div>
          <div style="height:32px">
            任务责任人
          </div>
          <div style="height:32px">
            参与人
          </div>
          <div style="height:32px">
            开始日期
          </div>
          <div style="height:32px">
            截止日期
          </div>
          <div style="height:32px">
            任务详细说明
          </div>
          <div style="height:32px">
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
          <div style="height:32px" :class="preTaskInfo.taskCode != postTaskInfo.taskCode ? 'red' : ''">
            {{ postTaskInfo.taskCode }}
          </div>
          <div style="height:32px" :class="preTaskInfo.parentTaskCode != postTaskInfo.parentTaskCode ? 'red' : ''">
            {{ postTaskInfo.parentTaskCode }}
          </div>
          <div style="height:32px" :class="preTaskInfo.taskName != postTaskInfo.taskName ? 'red' : ''">
            {{ postTaskInfo.taskName }}
          </div>
          <div style="height:32px" :class="preTaskInfo.projectStageName != postTaskInfo.projectStageName ? 'red' : ''">
            {{ postTaskInfo.projectStageName }}
          </div>
          <div style="height:32px" :class="preTaskInfo.principalName != postTaskInfo.principalName ? 'red' : ''">
            {{ postTaskInfo.principalName }}
          </div>
          <div style="height:32px" :class="preTaskInfo.participantNames != postTaskInfo.participantNames ? 'red' : ''">
            {{ postTaskInfo.participantNames }}
          </div>
          <div style="height:32px" :class="preTaskInfo.startTime != postTaskInfo.startTime ? 'red' : ''">
            {{ postTaskInfo.startTime | stamp2TextDate }}
          </div>
          <div style="height:32px" :class="preTaskInfo.endTime != postTaskInfo.endTime ? 'red' : ''">
            {{ postTaskInfo.endTime | stamp2TextDate }}
          </div>
          <div style="height:32px" :class="preTaskInfo.taskDesc != postTaskInfo.taskDesc ? 'red' : ''">
            {{ postTaskInfo.taskDesc }}
          </div>
          <div style="height:32px" :class="preTaskInfo.remark != postTaskInfo.remark ? 'red' : ''">
            {{ postTaskInfo.remark }}
          </div>
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
