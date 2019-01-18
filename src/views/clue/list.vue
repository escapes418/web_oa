<template>
    <div class="sjb-container calendar-list-container">
        <div class="filter-container">
            <div class="toolbar-item">
                <span class="item-label">客户名称：</span>
                <el-input @keyup.enter.native="handleFilter" placeholder="请输入客户名称" style="width: 200px;" class="filter-item" v-model.trim="listQuery.custName">
                </el-input>
            </div>
            <div class="toolbar-item">
                <span class="item-label">市场负责人：</span>
                <el-input @keyup.enter.native="handleFilter" placeholder="请输入市场负责人" style="width: 200px;" class="filter-item" v-model.trim="listQuery.marketLeaderName">
                </el-input>
            </div>
            <div class="toolbar-item">
              <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
              <el-button class="filter-item" type="warning" v-waves icon="el-icon-refresh" @click="restListQuery(restCallback)">重置</el-button>
              <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">新建线索</el-button>
            </div>
          <div class="toolmore-control">
              <el-button icon="el-icon-arrow-up" v-if="toolexpand" class="toolmore-control-btn" @click="toolexpand = false">收起</el-button>
              <el-button icon="el-icon-arrow-down" v-else class="toolmore-control-btn" @click="toolexpand = true">展开</el-button>
          </div>
          <el-collapse-transition>
              <div v-show="toolexpand" style="margin-top:8px">
                  <div class="toolbar-item">
                      <span class="item-label">更新时间：</span>
                      <el-date-picker v-model="listQuery.timeRange" type="daterange" class="filter-item" style="width:287px" placeholder="选择日期范围" :picker-options="pickerOptions">
                      </el-date-picker>
                  </div>
              </div>
          </el-collapse-transition>
        </div>

      <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
        style="width: 100%">
        <el-table-column align="center" label="客户编号"  width="120px">
          <template slot-scope="scope">
            <span class="ignore-detail" :title="scope.row.custCode">{{scope.row.custCode}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="客户名称">
          <template slot-scope="scope">
            <span class="ignore-detail" :title="scope.row.custName">{{scope.row.custName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="客户简称" align="center">
          <template slot-scope="scope">
            <span class="ignore-detail" :title="scope.row.custAbbreviation">{{scope.row.custAbbreviation}}</span>
          </template>
        </el-table-column>
        <el-table-column width="120px" align="center" label="客户分类">
          <template slot-scope="scope">
            <span class="ignore-detail" :title="scope.row.custClassifyValue ">{{scope.row.custClassifyValue}}</span>
          </template>
        </el-table-column>
        <el-table-column width="90px" label="所属区域" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.areaName}}</span>
          </template>
        </el-table-column>
        <el-table-column width="120px" label="规模（万吨/月）" align="center">
          <template slot-scope="scope">
            <span class="ignore-detail" :title="scope.row.custCompanySize">{{scope.row.custCompanySize}}</span>
          </template>
        </el-table-column>
        <el-table-column width="140px" label="运输方式" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.tranMethodValue}}</span>
          </template>
        </el-table-column>
        <el-table-column width="100px" label="联系人" align="center">
          <template slot-scope="scope">
            <span class="ignore-detail" :title="scope.row.custLinkmanName">{{scope.row.custLinkmanName}}</span>
          </template>
        </el-table-column>
        <el-table-column width="100px" label="职位" align="center">
          <template slot-scope="scope">
            <span class="ignore-detail" :title="scope.row.linkmanPost">{{scope.row.linkmanPost}}</span>
          </template>
        </el-table-column>
        <el-table-column width="140px" label="联系方式" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.linkmanPhone}}</span>
          </template>
        </el-table-column>
        <el-table-column width="140px" label="市场负责人" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.marketLeaderName }}</span>
          </template>
        </el-table-column>
        <el-table-column width="140px" label="更新时间" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.updateTime | stamp2TextDateFull}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" class-name="small-padding fixed-width"  width="80px">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-container">
        <el-pagination background  @current-change="handleCurrentChange" :current-page="pageNo" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
</template>

<script>
import common from '@/utils/common'
import { fetchList } from '@/api/clue'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
import { toJS, fromJS, Map, List } from 'immutable';
import listQueryMix from '../../mixins/listQuery.mix'

export default {
  name: 'complexTable',
  directives: {
    waves
  },
  mixins: [listQueryMix],
  data() {
    return {
      pickerOptions: {
          disabledDate(time) {
              return time.getTime() > Date.now();
          }
      },
      toolexpand:false,
      timeRange: [],
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      pageNo: 1,
      pageSize: 20,
      listQuery: {
        timeRange:[],
        custName: undefined,
        marketLeaderName: undefined,
        clueTimeStart: undefined,
        clueTimeEnd: undefined,
      },
    }
  },
  created() {
    this.$$queryStub = this.$$listQuery;
    this.getList()
    this.listLoading = false
  },
  mounted(){
    //获取字典
  },
  methods: {
    getList() {
      this.listLoading = true
      var postData = this.reduceParams(this.$$queryStub);
      console.log(postData)
      fetchList({
          ...postData,
          pageNo:this.pageNo,
          pageSize:this.pageSize
        }).then(res => {
        this.list = res.data.list
        this.total = res.data.total
        this.listLoading = false
      })
    },
    reduceParams($$imData) {
      if (!$$imData || $$imData.size == 0) return {};
      const $$postData = $$imData
          .set('clueTimeStart', common.rangeObjToTimestamp($$imData.get('timeRange').toJS()).applyTimeStart)
          .set('clueTimeEnd', common.rangeObjToTimestamp($$imData.get('timeRange').toJS()).applyTimeEnd)
          .delete('timeRange')
      return $$postData.toJS();
    },
    restCallback(){

    },
    handleFilter() {
      this.pageNo = 1
      if(!this.listQuery.timeRange){
          this.listQuery.timeRange = []
      }
      this.$$queryStub = fromJS(this.listQuery);
      this.getList()
      this.listLoading = false;
    },
    handleCurrentChange(val) {
      this.pageNo = val
      this.getList()
      this.listLoading = false;
    },
    handleCreate() {
      this.$router.push({path: '/inforManage/clueForm'})
    },
    
    handleUpdate(row) {
      this.$router.push({
          path: '/inforManage/clueForm',
          query:{ key: row.id } 
        })
    },
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.toolbar-row{
  margin: 5px 0 0 0  
}
.item-value{
  display:inline-block;
  border: 1px solid #dcdfe6;
  border-radius:4px;
  background: white;
  padding-left: 7px;
  line-height: 30px;
  width: 250px
}

.ignore-detail {
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
}
</style>