<template>
  <div class="sjb-container calendar-list-container">
    <div class="filter-container">
      <div class="toolbar-item">
          <span class="item-label">报销状态</span>
          <el-select clearable style="width: 90px" class="filter-item" v-model="listQuery.importance" placeholder="请选择">
            <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
      </div>
      
      <div class="toolbar-item">
          <span class="item-label">筛选条件</span>
          <el-input @keyup.enter.native="handleFilter" style="width: 260px;" class="filter-item" placeholder="可按流程编号、名称、申请人名称" v-model="listQuery.title">
          </el-input>
      </div>
      <div class="toolbar-item">
          <span class="item-label">下单日期</span>
          <el-date-picker v-model="timeRange" type="daterange" class="filter-item" style="width:287px" placeholder="选择日期范围" @change='chioceTime' :picker-options="pickerOptions">
          </el-date-picker>
      </div>
      <div class="toolbar-item">
        <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
        <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">费用报销申请</el-button>
      </div>
      <div class="toolmore-control">
          <el-button icon="el-icon-arrow-up" v-if="toolexpand" class="toolmore-control-btn" @click="toolexpand = false">收起</el-button>
          <el-button icon="el-icon-arrow-down" v-else class="toolmore-control-btn" @click="toolexpand = true">展开</el-button>
      </div>
      <el-collapse-transition>
        <div v-show="toolexpand">
            <div class="toolbar-row">
                <div class="toolbar-item">
                    <span class="item-label">装货地</span>
                    <el-date-picker v-model="timeRange" type="daterange" class="filter-item" style="width:287px" placeholder="选择日期范围" @change='chioceTime' :picker-options="pickerOptions">
          </el-date-picker>
                </div>
                <div class="toolbar-item">
                    <span class="item-label">卸货地</span>
                    <el-date-picker v-model="timeRange" type="daterange" class="filter-item" style="width:287px" placeholder="选择日期范围" @change='chioceTime' :picker-options="pickerOptions">
          </el-date-picker>
                </div>
            </div>
        </div>
    </el-collapse-transition>
      <!-- <el-checkbox class="filter-item" style='margin-left:15px;' @change='tableKey=tableKey+1' v-model="showReviewer">{{'table.reviewer'}}</el-checkbox> -->
    </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
      style="width: 100%">
      <el-table-column align="center" label="流程编号">
        <template slot-scope="scope">
          <a href="#" @click="showDetail(scope.row)">{{scope.row.id || '123'}}</a>
        </template>
      </el-table-column>
      <el-table-column align="center" label="流程名称">
        <template slot-scope="scope">
          <span>{{scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请人名称">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.title}}</span>
          <el-tag>{{scope.row.type | typeFilter}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column width="110px" align="center" label="申请日期">
        <template slot-scope="scope">
          <span>{{scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
      <el-table-column width="110px" v-if='showReviewer' align="center" label="费用合计">
        <template slot-scope="scope">
          <span style='color:red;'>{{scope.row.reviewer}}</span>
        </template>
      </el-table-column>
      <el-table-column width="80px" label="审批状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{'table.edit'}}</el-button>
          <el-button v-if="scope.row.status!='published'" size="mini" type="success" @click="handleModifyStatus(scope.row,'published')">{{'table.publish'}}
          </el-button>
          <el-button v-if="scope.row.status!='draft'" size="mini" @click="handleModifyStatus(scope.row,'draft')">{{'table.draft'}}
          </el-button>
          <el-button v-if="scope.row.status!='deleted'" size="mini" type="danger" @click="handleModifyStatus(scope.row,'deleted')">{{'table.delete'}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @current-change="handleCurrentChange" :current-page="listQuery.page" :page-size="20" layout="total, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
        <el-form-item label="table.type" prop="type">
        </el-form-item>
        <el-form-item label="table.date" prop="timestamp">
          <el-date-picker v-model="temp.timestamp" type="datetime" placeholder="Please pick a date">
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="'table.title'" prop="title">
          <el-input v-model="temp.title"></el-input>
        </el-form-item>
        <el-form-item :label="'table.status'">
          <el-select class="filter-item" v-model="temp.status" placeholder="Please select">
            <el-option v-for="item in  statusOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="'table.importance'">
          <el-rate style="margin-top:8px;" v-model="temp.importance" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max='3'></el-rate>
        </el-form-item>
        <el-form-item :label="'table.remark'">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.remark">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{'table.cancel'}}</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{'table.confirm'}}</el-button>
        <el-button v-else type="primary" @click="updateData">{{'table.confirm'}}</el-button>
      </div>
    </el-dialog>

    <el-dialog title="Reading statistics" :visible.sync="dialogPvVisible">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel"> </el-table-column>
        <el-table-column prop="pv" label="Pv"> </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">{{'table.confirm'}}</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import common from '@/utils/common'
import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'

export default {
  name: 'complexTable',
  directives: {
    waves
  },
  data() {
    return {
      pickerOptions: {
          disabledDate(time) {
              return time.getTime() > Date.now();
          }
      },
      toolexpand:false,
      timeRange: [common.time.timestart, common.time.timeend],
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  created() {
    // this.getList()
    this.listLoading = false
  },
  methods: {
    chioceTime: function(val) {
        if (val && val.length > 0) {
            this.filter.ordercreatetimestart = Date.parse(new Date(val[0]));
            this.filter.ordercreatetimeend = Date.parse(new Date(val[1]));
        } else {
            this.filter.ordercreatetimestart = 0;
            this.filter.ordercreatetimeend = 0;
        }
    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    showDetail(row){
      this.$router.push({
          path:'/center/reimburseDetail',
          params: { key: row.id }
      })
    },
    handleCreate() {
      this.$router.push({path: '/center/reimForm'})
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    // handleDownload() {
    //   this.downloadLoading = true
    //   import('@/vendor/Export2Excel').then(excel => {
    //     const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
    //     const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
    //     const data = this.formatJson(filterVal, this.list)
    //     excel.export_json_to_excel(tHeader, data, 'table-list')
    //     this.downloadLoading = false
    //   })
    // },
    
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.toolbar-row{
  margin: 10px 0 10px 0 
}
</style>