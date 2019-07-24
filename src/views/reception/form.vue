<template>
  <div class="sjb-form-wrapper">
    <div class="segment statistics">
        <div class="segment-header">
            基本信息
        </div>
        <div class="segment-area">
            <el-row>
                <el-col :span="12" class="segment-brline">
                    <RedStar label="申请人员：">
                        <span class="right-con">{{userInfo.name}}</span>
                    </RedStar>
                    <RedStar label="所属部门：">
                        <span class="right-con">{{userInfo.officeName}}</span>
                    </RedStar>
                    <Project @on-select="proSelect" :Pvalue="projectName" :required="true"></Project>
                    <RedStar label="预计接待人数：" :required="true">
                        <span class="right-con">
                          <el-input v-model.number="filter.recpNum" type="number" style="width:280px"></el-input>
                        </span>
                    </RedStar>
                    <RedStar label="陪客人员：" :required="true">
                        <span class="right-con">
                            <el-select clearable multiple class="filter-item ignore-detail" filterable v-model="filter.employees" placeholder="请选择" style="width:280px;" >
                                <el-option v-for="item in memberList" :label="item.name" :value="item.loginName" :key="item.loginName">
                                </el-option>
                            </el-select>
                        </span>
                    </RedStar>
                    <RedStar label="费用合计：">
                        <div class="item-value" style="height:32px">
                            <span style="color:#606266;font-size:14px;">{{budgetTotal || ""}}</span>
                        </div>
                    </RedStar>
                </el-col>
                <el-col :span="12" class="segment-brline">
                    <RedStar label="申请日期：">
                        <span class="right-con">{{ filter.applyTime }}</span>
                    </RedStar>
                    <RedStar label="接待主题：" :required="true">
                        <span class="right-con">
                            <el-input v-model="filter.recpTheme" style="width:280px" :maxlength="50"></el-input>
                        </span>
                    </RedStar>
                    <RedStar label="项目负责人：">
                        <span class="right-con">
                          {{projectLeaderName}}
                        </span>
                    </RedStar>
                    <RedStar label="预计接待时间：" :required="true">
                        <span class="right-con">
                            <el-date-picker
                                v-model="filter.recpTime"
                                type="datetime"
                                style="width:280px"
                                placeholder="选择日期时间">
                            </el-date-picker>
                        </span>
                    </RedStar>
                    
                    <RedStar label="备注：">
                        <span class="right-con">
                            <sjbtextarea placeholder="请输入"
                            textStyle="width:280px;"
                            :rows="3"
                            :max="200"
                            v-model.trim="filter.remarks"></sjbtextarea>
                        </span>
                    </RedStar>
                </el-col>
            </el-row>
        </div>
        <el-dialog title="关联接待申请" :visible.sync="dialogRecepVisible">
            <div class="dialog">
                <el-table :data="recep" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
                style="width: 100%;" @row-click="selectRecep">
                <el-table-column align="center" label="接待主题">
                    <template slot-scope="scope">
                    <span>{{scope.row.recpTheme}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="归属项目">
                    <template slot-scope="scope">
                    <span>{{scope.row.projectName}}</span>
                    </template>
                </el-table-column>
                <el-table-column   align="center" label="费用总额">
                    <template slot-scope="scope">
                    <span>{{scope.row.budgetTotal}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="110px" align="center" label="提交人">
                    <template slot-scope="scope">
                    <span>{{scope.row.applyPerName}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="110px"  align="center" label="提交时间">
                    <template slot-scope="scope">
                    <span>{{scope.row.applyTime}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="110px" align="center" label="状态">
                    <template slot-scope="scope">
                    <span>{{ scope.row.recpStatusValue }}</span>
                    </template>
                </el-table-column>
                </el-table>
            </div>

            <div class="pagination-container" style="margin-top:20px">
                <el-pagination background  @current-change="recepCurrentChange" :current-page="recepQuery.pageNo" :page-size="10" layout="total, prev, pager, next, jumper" :total="recepTotal">
                </el-pagination>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogRecepVisible = false">返回</el-button>
            </div>
        </el-dialog>
    </div>
    <div class="segment statistics">
        <div class="segment-header">
            <span class="left-red">*</span>
            申请明细
        </div>
        <div class="segment-area">
          <div class="el-table__body-wrapper">
            <table id="expenseDetails" class="table table-striped table-bordered table-condensed" style="width:1700px;margin-bottom: 20px;">
              <thead>
                <tr class="tableTitle">
                  <td style="text-align: center;width: 20px;padding: 0 10px 0 10px;">
                    <el-checkbox v-model="checkAll" @change="selectAll">全选</el-checkbox>
                  </td>
                  <td class="tableTitle">发生日期</td>
                  <td class="tableTitle">起点</td>
                  <td class="tableTitle">结束日期</td>
                  <td class="tableTitle">终点</td>
                  <td class="tableTitle">科目</td>
                  <td class="tableTitle">人数</td>
                  <td class="tableTitle">天数</td>
                  <td class="tableTitle">票据张数</td>
                  <td class="tableTitle">预算金额</td>
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
            <el-button  type="primary" size="small" @click="add" :loading="false">新增</el-button>
            <el-button  type="danger"  size="small" @click="del">删除</el-button>
        </div>
    </div>
    <div class="segment statistics">
        <div class="sjb-foot-button">
            <el-button type="primary" size="small" @click="submit('apply')">提交申请</el-button>
            <el-button type="primary" size="small" @click="submit('save')">接待保存</el-button>
            <el-button  size="small" @click="backStep">返回</el-button>
        </div>
    </div>
  </div>
</template>

<script>
import common from '@/utils/common';
import Approval from '@/components/Approval';
import Project from '@/components/Project';
import { fetchProList , getSubjects , recepApply , recepSave , getDetail , fetchList , getMember} from '@/api/reception';
import { mapState, mapGetters } from "vuex";
import { parseTime } from '@/utils';
import { recepFormVali } from './recep.util';
import RedStar from '@/components/RedStar/RedStar.vue';
import sjbtextarea from '@/components/sjbTextarea/index.vue';

export default {
    components:{
        Approval,
        Project,
        RedStar,
        sjbtextarea
    },
    data() {
        return {
            // pickerOptions: {
            //     disabledDate(time) {
            //         return time.getTime() > Date.now();
            //     }
            // },
            isType:'reception',
            checkAll:false,
            applyLoading:false,
            saveLoading:false,
            i:-1,
            itemList:[],
            fileList:[],
            finish:false,
            // dialogFormVisible:false,
            dialogRecepVisible:false,
            timeRange: [common.time.currentMonFirDayObj, common.time.currentMonNowDayObj],
            filter: {//筛选条件
                applyTime:"",
                projectId:"",
                id: "",
                procInsId: "",
                projectName: "",
                projectPersonel: "",
                recpTheme:"",
                employees:[],
                recpTime: "",
                remarks:""
            },
            total: null,
            recepTotal:null,
            expTypeList:[],
            expenseAttachment:[],
            taxList:[],
            fileURL:process.env.BASE_API + '/commonInfo/fileUpload',
            listLoading:false,
            list:[],
            recep:[],
            memberList:[],
            recepName:"",
            projectName: "",
            projectLeaderName:"",
            projectType: "",
            listQuery:{
                pageNo: 1,
                pageSize: 10,
                officeId: "",
                applyTimeStart:"",
                applyTimeEnd: "",
            },
            recepQuery:{
                pageNo:1,
                pageSize:20
            }
        }
    },
    created(){
        this.filter.applyTime = common.time.monthlast
        this.$store.dispatch('clearCollection');
        //拿到基本信息
        this.userInfo = JSON.parse(localStorage.getItem("web_oa_userInfor"));
        if(this.$route.query.key){
            this.filter.id = this.$route.query.key
            getDetail({
                recpFlowId:this.$route.query.key
            }).then(res =>{
                this.filter.applyTime = res.data.recpFlowresponse.applyTime
                this.projectName = res.data.recpFlowresponse.projectName
                this.projectLeaderName = res.data.recpFlowresponse.projectPersonel
                this.filter.projectId = res.data.recpFlowresponse.projectId
                //后台返回值兼容
                res.data.recpFlowresponse.employees = res.data.recpFlowresponse.employees || []
                this.filter.employees = res.data.recpFlowresponse.employees
                //后台返回值兼容
                this.filter.remarks = res.data.recpFlowresponse.remarks
                res.data.recpFlowresponse.recpNum = res.data.recpFlowresponse.recpNum || ''
                this.filter.recpNum = res.data.recpFlowresponse.recpNum 

                this.filter.recpTheme = res.data.recpFlowresponse.recpTheme
                if(res.data.recpFlowresponse.recpTime){
                    this.filter.recpTime = common.timeParseObj(res.data.recpFlowresponse.recpTime)
                }
                
                this.filter.procInsId = res.data.recpFlowresponse.procInsId
                //明细时间格式转换
                var itemDatas = res.data.budgetDetailList || [];
                
                // var newItemDatas = common.ObjToStamp(itemDatas,['startDate','endDate'])
                itemDatas.forEach((item,index)=>{
                    if(item.startDate){
                        itemDatas[index].startDate = common.timeParseObj(item.startDate);
                    }else{
                        itemDatas[index].startDate = ""
                    }
                    if(item.endDate){
                        itemDatas[index].endDate = common.timeParseObj(item.endDate);
                    }else{
                        itemDatas[index].endDate = ""
                    }
                    if(!item.expenseAmt){
                        item.expenseAmt = ""
                    }
                })
                this.$store.dispatch('fillDetailCollection', this.transDetailData(itemDatas));
            })
        }

      // store中没值时，从接口获取存入store
        // if (this.subsTree.length == 0) {
            this.$store.dispatch('getSubs');
        // }
      
  },
  computed:{
      ...mapState({
          subsTree: state => state.reim.subsTree,
          subsList: state => state.reim.subsList,
          firstSub: state => state.reim.firstSub,
          token: state => state.user.token,
          detailCollection: state => state.reim.detailCollection,
        //   userInfo:state => state.user.userInfo
      }),
      budgetTotal(){
         let result = 0
         for(let i=0;i<this.detailCollection.length;i++){
            result += Number(this.detailCollection[i].expenseAmt);
         }
         return result
     }
  },
  mounted(){
    //获取字典
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
    this.expTypeList = selectDic(dicList,"oa_expense_type")
    this.taxList = selectDic(dicList,"tax_city")

    getMember({}).then(res => {
        this.memberList = res.data
    })
  },
  methods:{
    // handleProFilter(){
    //     this.listQuery.pageNo = 1
    //     this.getList()
    // },
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
    selectAll(val){
        this.$store.dispatch('fillDetailCollectionChecked', val);
    },
    add(){
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
    // showForm(){
    //     this.dialogFormVisible = true;
    //     this.listLoading = false;
    //     this.getList()
    // },
    showRecep(){
        this.dialogRecepVisible = true;
        this.listLoading = false;
        this.getRecep()
    },
    proSelect(data){
        this.filter.projectId = data.id;
        this.projectLeaderName = data.projectLeaderName;
    },
    // selectRow(row){
    //     this.projectName = row.projectName
    //     this.projectLeaderName = row.projectLeaderName
    //     this.filter.projectId = row.id
    //     this.filter.projectPersonel = row.projectLeaderName
    //     this.dialogFormVisible = false
    //     console.log(row)
    // },
    selectRecep(row){
        this.filter.recpProcName = row.projectName
        this.dialogRecepVisible = false
    },
    // getList() {
    //   this.listLoading = true;
    //   var {applyTimeStart,applyTimeEnd } = common.rangeObjToTimestamp(this.timeRange)
    //   fetchProList({
    //         ...this.listQuery,
    //         applyTimeStart,
    //         applyTimeEnd,
    //         }).then(res => {
    //     this.list = res.data.list
    //     this.total = res.data.total
    //     this.listLoading = false
    //   })
    // },
    getRecep(){
        this.listLoading = true
        fetchRecepList(this.recepQuery).then(res =>{
            this.recep = res.data.list
            this.recepTotal = res.data.total
            this.listLoading = false
        })
    },
    // handleCurrentChange(val) {
    //   this.listQuery.pageNo = val
    //   this.getList()
    // },
    recepCurrentChange(val){
        this.recepQuery.pageNo = val
        this.getRecep()
    },
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
    backStep(){
        this.$router.go(-1)
    },
    submit(type){
        this.filter.demandBudgetList = this.getItemsInStore();
        this.filter.budgetTotal  = this.budgetTotal
        if(type=='apply'&&recepFormVali(this)){
            recepApply({
                ...this.filter,
                recpTime:common.timeParse(this.filter.recpTime),
            }).then(res =>{
                if(res.status ==0){
                    this.applyLoading = false
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
                    this.$router.push({path:'/task/todo' })
                }
            })
        }if(type == 'save'){
            recepSave({
                ...this.filter,
                recpTime:common.timeParse(this.filter.recpTime),
            }).then(res =>{
                if(res.status == 0){
                    this.saveLoading = false
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
</style>
<style>
.el-select .el-input.el-input--small.el-input--suffix {
    overflow: scroll !important;
    padding-bottom: 1px!important;
}
</style>