<template>
  <div class="sjb-container calendar-list-container">
    <!-- v-waves -->
    <el-button class="topBtn" type="primary" icon="el-icon-search" @click="add">新增成员角色</el-button>
    <el-table
      ref="dragTable"
      v-loading="listLoading"
      :data="list"
      row-key="id"
      border
      fit
      :row-class-name="getRowClass"
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column align="center" label="" width="65" type="index">
        <!--<template slot-scope="{ row }">
          <span>{{ row.sequenceNumber }}</span>
        </template> -->
      </el-table-column>

      <el-table-column width="180px" align="center" label="角色编号">
        <template slot-scope="{ row }">
          <span>{{ row.roleCode }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="成员角色名称">
        <template slot-scope="{ row }">
          <template v-if="row.edit && row.roleType == '2'">
            <el-input v-model="row.roleName" class="edit-input" size="small" />
          </template>
          <span v-else>{{ row.roleName }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="角色类型">
        <template slot-scope="{ row }">
          <span>{{ row.roleTypeName }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="负责人">
        <template slot-scope="{ row }">
          <template v-if="row.edit && row.roleType == '2'">
            <el-select
              filterable
              style="width: 150px"
              size="small"
              class="filter-item"
              v-model="row.isPrincipal"
              placeholder="请选择"
            >
              <el-option v-for="item in options" :key="item.value" :label="item.name" :value="item.value"> </el-option>
            </el-select>
          </template>
          <span v-else>{{ row.isPrincipalName }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="备注">
        <template slot-scope="{ row }">
          <template v-if="row.edit">
            <el-input v-model="row.remark" class="edit-input" size="small" />
          </template>
          <span v-else>{{ row.remark }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="更新时间">
        <template slot-scope="{ row }">
          <span>{{ row.updateTime | stamp2TextDateFull }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="{ row }">
          <el-button v-if="!row.edit" type="primary" size="small" icon="el-icon-edit" @click="row.edit = !row.edit">
            编辑
          </el-button>
          <el-button
            v-if="!row.edit && row.roleType == '2'"
            type="danger"
            size="small"
            icon="el-icon-delete"
            @click="del(row)"
          >
            删除
          </el-button>
          <el-button
            v-if="row.edit"
            type="success"
            size="small"
            icon="el-icon-circle-check-outline"
            @click="confirmEdit(row)"
          >
            保存
          </el-button>
          <el-button
            v-if="row.edit"
            class="cancel-btn"
            size="small"
            icon="el-icon-refresh"
            type="warning"
            @click="cancelEdit(row)"
          >
            取消
          </el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="移动" width="80">
        <template slot-scope="{}">
          <i class="el-icon-rank"></i>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Sortable from "sortablejs";
import { getPmsDeployList, projectTasklistUpdate, projectTasklistCreate, updateRoleIndex } from "@/api/pms";

export default {
  name: "DragTable",
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      },
      options: [
        {
          value: "0",
          name: "否"
        },
        {
          value: "1",
          name: "是"
        }
      ],
      sortable: null,
      oldList: [],
      newList: []
      // jsonData: json
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getRowClass({ row }) {
      return row.edit ? "edit" : "saved";
    },
    async getList() {
      this.listLoading = true;
      getPmsDeployList().then(res => {
        this.list = res.data;
        this.list.forEach((el, index) => {
          this.$set(el, "edit", false);
          el.originalroleName = el.roleName;
          el.originalisPrincipal = el.isPrincipal;
          el.originalisPrincipalName = el.isPrincipalName;
          el.originalremark = el.remark;
        });
        this.listLoading = false;
        this.oldList = this.list.map(v => v.sequenceNumber);
        this.newList = this.oldList.slice();
        this.$nextTick(() => {
          this.setSort();
        });
      });
    },
    setSort() {
      const el = this.$refs.dragTable.$el.querySelectorAll(".el-table__body-wrapper > table > tbody")[0];
      this.sortable = Sortable.create(el, {
        ghostClass: "sortable-ghost",
        draggable: ".saved",
        setData: function(dataTransfer) {
          dataTransfer.setData("Text", "");
        },
        onEnd: evt => {
          const targetRow = this.list.splice(evt.oldIndex, 1)[0];
          this.list.splice(evt.newIndex, 0, targetRow);
          const tempIndex = this.newList.splice(evt.oldIndex, 1)[0];
          this.newList.splice(evt.newIndex, 0, tempIndex);
          //   this.updateList();
          console.log(evt);
          console.log(targetRow);
          this.updateRoleIndex(targetRow.id, evt.newIndex);
        }
      });
    },
    updateList() {
      return new Promise((resolve, reject) => {
        projectTasklistUpdate({
          list: this.list
        }).then(rtn => {
          resolve(rtn.data);
        });
      });
    },
    createItem(row) {
      return projectTasklistCreate(row)
        .then(rtn => {
          const code = rtn.data.roleCode;
          this.list.splice(row.index, 1, {
            ...row,
            roleCode: code
          });
          return code;
        })
        .then(id => this.updateRoleIndex(id, row.index));
    },
    updateRoleIndex(id, index) {
      return updateRoleIndex(id, index + 1);
    },
    cancelEdit(row) {
      row.roleName = row.originalroleName;
      row.isPrincipal = row.originalisPrincipal;
      row.remark = row.originalremark;
      row.isPrincipalName = row.originalisPrincipalName;
      row.edit = false;
    },
    del(row) {
      console.log(row);
      if (!row.associatedWithMember) {
        this.$confirm(`确认删除${row.roleName}？删除后，将不可找回！`, "确认删除", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            for (var i = 0; i < this.list.length; i++) {
              if (this.list[i].sequenceNumber === row.sequenceNumber) {
                this.list.splice(i, 1);
              }
            }
            this.updateList();
          })
          .catch(() => {});
      } else {
        this.$confirm(`${row.roleName}已被项目成员关联，不可删除！`, "确认删除", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {})
          .catch(() => {});
      }
    },
    confirmEdit(row) {
      if (!row.roleName) {
        return this.$message.error("请输入成员角色名称");
      }
      row.edit = false;
      var isPrincipalName = "";
      this.options.forEach((el, idx) => {
        if (el.value == row.isPrincipal) {
          isPrincipalName = el.name;
        }
      });
      row.originalroleName = row.roleName;
      row.originalisPrincipal = row.isPrincipal;
      row.originalremark = row.remark;
      row.isPrincipalName = isPrincipalName;
      row.originalisPrincipalName = isPrincipalName;
      row.updateTime = this.fitchTime();
      // this.updateList();
      this.createItem(row);
      this.$message({
        message: "The title has been edited",
        type: "success"
      });
    },
    add() {
      var list = this.list.map(v => v.sequenceNumber);
      var max = Math.max.apply(null, list);
      this.list.push({
        index: list.length,
        roleType: "2",
        new: true,
        edit: true,
        roleCode: "",
        roleName: "",
        roleTypeName: "人工",
        isPrincipal: "0",
        isPrincipalName: "否",
        remark: "",
        updateTime: this.fitchTime(),
        sequenceNumber: max + 1,
        originalroleName: "",
        originalisPrincipal: "0",
        originalisPrincipalName: "否",
        originalremark: ""
      });
      // this.updateList();
    },
    fitchTime() {
      return Date.parse(new Date());
    }
  }
};
</script>

<style>
.sortable-ghost {
  opacity: 0.8;
  color: #fff !important;
  background: #cdecfe !important;
}
.el-table__row.edit td {
  background-color: #ddd;
}
</style>

<style scoped>
.icon-star {
  margin-right: 2px;
}
.drag-handler {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.show-d {
  margin-top: 15px;
}
.topBtn {
  margin-bottom: 20px;
}
</style>
