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
                        <span class="left-title font-gray">流程编号：</span>
                        <span class="right-con">
                          {{ detail.procCode }}
                        </span>
                    </div>
                    <div class="clearfix cominfo-item">
                        <span class="left-title font-gray">申请人员：</span><span class="right-con">{{ detail.applyPerName }}</span>
                    </div>
                    <div class="clearfix  cominfo-item">
                        <span class="left-title font-gray">所属部门：</span><span class="right-con">{{ detail.officeName }}</span>
                    </div>
                    <div class="clearfix  cominfo-item">
                        <span class="left-title font-gray">项目名称：</span>
                        <span class="right-con">
                          {{ detail.projectName }}
                        </span>
                    </div>
                    <div class="clearfix  cominfo-item">
                        <span class="left-title font-gray">预计接待人数：</span>
                        <span class="right-con">
                          {{ detail.recpNum }}
                        </span>
                    </div>
                    <div class="clearfix  cominfo-item">
                        <span class="left-title font-gray">陪客人员：</span>
                        <span class="right-con">
                          {{ detail.employeesName }}
                        </span>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="clearfix cominfo-item">
                        <span class="left-title font-gray">申请日期：</span><span class="right-con">{{ detail.applyTime }}</span>
                    </div>
                    <div class="clearfix cominfo-item">
                        <span class="left-title font-gray">接待主题：</span><span class="right-con">{{ detail.recpTheme }}</span>
                    </div>
                    <div class="clearfix  cominfo-item">
                        <span class="left-title font-gray">项目负责人：</span><span class="right-con">{{  detail.projectPersonel }}</span>
                    </div>
                    <div class="clearfix  cominfo-item">
                        <span class="left-title font-gray">预计接待时间：</span><span class="right-con">{{ detail.recpTime | stamp2TextDate }}</span>
                    </div>
                    <div class="clearfix  cominfo-item">
                        <span class="left-title font-gray">预算合计：</span>
                        <span class="right-con">
                          {{ detail.budgetTotal | thousands(2) }}
                        </span>
                    </div>
                    <div class="clearfix  cominfo-item">
                        <span class="left-title font-gray">备注：</span>
                        <span class="right-con">
                          {{ detail.remarks }}
                        </span>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
    <div class="segment statistics">
      <div class="segment-header">
            接待明细
        </div>
        <div class="segment-area">
          <div class="el-table__body-wrapper">
            <el-table
                :data="budgetDetailList"
                 border>
                <el-table-column
                    label="发生日期"
                    prop="startDate">
                    <template slot-scope="scope">
                        <span>{{scope.row.startDate | stamp2TextDate}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="起点"
                    prop="startPointName" >
                </el-table-column>
                <el-table-column
                    label="结束日期"  
                    prop="endDate">
                    <template slot-scope="scope">
                        <span>{{scope.row.endDate | stamp2TextDate}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="终点"
                    prop="endPointName">
                </el-table-column>
                <el-table-column
                    label="一级科目"
                    prop="firstSubName" width="120">
                </el-table-column>
                <el-table-column
                    label="二级科目"
                    prop="secondSubName">
                </el-table-column>
                <el-table-column
                    label="人数"
                    prop="personNum">
                </el-table-column>
                <el-table-column
                    label="天数"
                    prop="dayNum">
                </el-table-column>
                <el-table-column
                    label="预算金额"
                    prop="expenseAmt">
                    <template slot-scope="scope">
                        <span class="font-orange">{{ scope.row.expenseAmt | thousands(2) }}元</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="备注"
                    prop="remarks">
                </el-table-column>
            </el-table>
          </div>
        </div>
    </div>
    <div class="segment statistics part-wrap" id="part-wrap" v-if="!ISPUTIN">
      <div class="segment-header">
            流转信息
        </div>
        <div class="segment-area">
          <div class="el-table__body-wrapper">
              <div class=" pt-20 pb-20">
                <div class="log-w" v-for="(item,index) in flowLoglist" :key="index" :class="{'sub-row':(index+1)!==flowLoglist.length}">
                    <div class="log-dot">
                        <div class="dot-core"></div>
                    </div>
                    <div class="log-text">
                        <div class="log-title">
                            <span class="color-black bold">{{item.assigneeName}}</span>
                            <!-- 审批bug的补丁 -->
                            <span class="log-header" v-if="index==0">{{item.activityName}}</span>
                            <span class="log-header" v-else>{{item.comment?"已审批":"待审批"}}</span>
                        </div>
                        <div class="state-item">
                            <span class="font-size14">{{item.endTime}}</span>
                            <span v-if="item.durationTime" class="state-name">历时:{{item.durationTime}}</span>
                        </div>
                        <p v-if="item.comment" class="font-gray font-size14 mt-2">{{item.comment}}</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
    </div>
      </div>
    
    <template v-if="pathType === 'todo'">
        <div class="segment statistics" v-if="!ISEDIT&&ISME || !ISME">
        <div class="segment-header">
                审批意见
            </div>
            <div class="segment-area">
                <sjbtextarea
                    :rows="3"
                    :max="600"
                    textStyle="width:420px;margin-top:20px;margin-bottom:20px"
                    placeholder="请输入内容"
                    v-model="comment">
                </sjbtextarea>
            </div>
        </div>
    </template>
    <div class="segment statistics">
        <div class="sjb-foot-button">
            <template v-if="pathType === 'list'">
                <!-- <el-button v-if="ISEDIT" size="medium" type="primary" @click="expBtn">提交</el-button> -->
                <el-button v-if="ISEDIT" size="medium" type="primary" @click="editBtn">编辑</el-button>
                <el-button v-if="ISCANCEL&&!ISEDIT" size="medium" type="warning" @click="cancelBtn">撤销</el-button>
                <el-button v-if="ISDEL" size="medium" type="danger" @click="dialogDelVisible = true">删除</el-button>
                <!-- <el-button v-if="ISPRINT" size="medium" type="primary" @click="createPdf">打印</el-button> -->
                <el-button size="medium" @click="backBtn">返回</el-button>
            </template>
            <template v-if="pathType === 'todo'">
                <!-- <el-button v-if="ISME&&ISEDIT" size="medium" type="primary" @click="expBtn">提交</el-button> -->
                <el-button v-if="ISME&&ISEDIT" size="medium" type="primary" @click="editBtn">编辑</el-button>
                <el-button v-if="!ISEDIT&&ISME || !ISME" size="medium" type="primary" @click="agreeBtn">同意</el-button>
                <el-button v-if="!ISEDIT&&ISME || !ISME" size="medium" type="info" @click="refuseBtn">驳回</el-button>
                <el-button size="medium" @click="backBtn">返回</el-button>
            </template>
            <template v-if="pathType === 'done'">
                <el-button v-if="ISCANCEL" size="medium" type="warning" @click="cancelBtn">撤销</el-button>
                <el-button size="medium" @click="backBtn">返回</el-button>
            </template>
        </div>
    </div>
    <el-dialog title="系统提示？" width="25%" :visible.sync="dialogDelVisible">
      <span>确认删除该报销单吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="delBtn">确认</el-button>
        <el-button @click="dialogDelVisible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import common from '@/utils/common'
import { getDetail , startRecep , recepFlow , recepCancel , recepDel , getSubjects} from '@/api/reception'
import { parseTime } from '@/utils'
import { mapState } from 'vuex';
import sjbtextarea from '@/components/sjbTextarea/index.vue';

export default {
    name: 'complexTable',
    components: {
        sjbtextarea
    },
    data() {
        return {
            flowDetailList:[],
            budgetDetailList:[],
            flowLoglist:[],
            detail:{},
            comment:'',
            taskId:0,
            pathType:"",
            dialogDelVisible:false,
            finish:false
        }
    },
    computed:{
        ...mapState({
            subsList: state => state.reim.subsList,
            subslistKeyVal:state => state.reim.subsListKeyVal,
            firstSub:state => state.reim.firstSub,
            token:state => state.user.token,
        }),
        ISME:function(){
            let result = this.userInfo.name == this.detail.applyPerName ? true : false
            return result
        },
        ISDEL:function(){
            let result = this.detail.recpStatus == 2 || this.detail.recpStatus == 3 || this.detail.recpStatus == 4 ? true : false
            return result
        },
        ISEDIT:function(){
            let result = this.detail.modify == 'modify' ? true :false;
            return result
        },
        ISPUTIN:function(){
            let result = this.detail.recpStatus == 4 ? true :false
            return result
        },
        ISCANCEL:function(){
            let result = this.detail.recpStatus == 2 ? true:false
            return result
        },
        ISPRINT:function(){
            let result = this.detail.expenseStatus == 1  ? true:false
            return result
        }
    },
    created(){
        console.log(this.getAllSubjects)
        this.userInfo = JSON.parse(localStorage.getItem("web_oa_userInfor"));
        if(this.$route.query.taskId) this.taskId = this.$route.query.taskId
        if(this.$route.query.pathType) this.pathType = this.$route.query.pathType
        if(this.subsList.length ==0){
            this.getAllSubjects().then(rtn => {
                this.$store.dispatch('setSubs', rtn);
                var resetArr = [];
                var map = rtn.reduce((acc, val) => { // key->value
                    acc[val.value] = val
                    return acc
                }, {});
                rtn.forEach(val => {
                    if (val.parent != '0') {
                        var parent = map[val.parent]
                        if (!parent.children) {
                            parent.children = [val]
                        } else {
                            parent.children.push(val)
                        }
                    } else {
                        resetArr.push(val)
                    }
                })
                this.$store.dispatch('subslistKeyVal', map);
            });
        }
        getDetail({
            recpFlowId:this.$route.query.key
        }).then(res =>{
            this.detail = res.data.recpFlowresponse
            if(res.data.recpFlowresponse.employeesName &&res.data.recpFlowresponse.employeesName.length>0){
                this.detail.employeesName = res.data.recpFlowresponse.employeesName.join(' , ')
            }
            res.data.budgetDetailList = res.data.budgetDetailList || []
            this.budgetDetailList = res.data.budgetDetailList
            res.data.flowLoglist = res.data.flowLoglist || []
            this.flowLoglist = res.data.flowLoglist
        })
  },
  methods:{
        getAllSubjects() { // 报销所有所有科目
            return new Promise((resolve, reject) => {
                getSubjects({
                    isFirst: '0',
                    parSubCode: ''
                }).then(res =>{
                    // console.log(res)
                    resolve(res.data.list);
                })
            })
        },
        createPdf(){
                var pdfstr = document.getElementById('pdf-wrap')
                // 2. 复制给body，并执行window.print打印功能
                var newstr = pdfstr.innerHTML
                // 3. 还原：将旧的页面储存起来，当打印完成后返给给页面。
                var oldstr = document.body.innerHTML
                document.body.innerHTML = newstr
                window.print()
                window.location.reload()
                document.body.innerHTML = oldstr
                return false
        },

        backBtn(){
            this.$router.go(-1)
        },
        // expBtn(){
        //     if(recepDetailVali(this)){
        //         startRecep({
        //             expenseFlowId:this.$route.query.key,
        //             procInsId:this.detail.procInsId 
        //         }).then(res =>{
        //             if(res.status ==0){
        //                 this.$message({
        //                     message: res.message,
        //                     type: 'success'
        //                 })
        //                 // this.$router.push({
        //                 //     path:'/me/recepList'
        //                 // })
        //                 this.$router.go(-1)
        //             }
        //         })
        //     }
            
        // },
        editBtn(){
            this.$router.push({
                path:'/me/recepForm',
                query:{ key: this.$route.query.key }
            })
        },
        agreeBtn(){
            // if(this.comment.length>100) {
            //     this.$message({
            //         message:'输入字符超出限额，请重新输入！',
            //         type:'warning'
            //     })
            //     return 
            // }
            recepFlow({
                recpFlowId:this.$route.query.key,
                comment:this.comment,
                flag:'yes',
                procInsId:this.detail.procInsId 
            }).then(res =>{
                if(res.status ==0){
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
                    // this.$router.push({
                    //     path:'/me/recepList'
                    // })
                    this.$router.go(-1)
                }
            })
        },
        refuseBtn(){
            if(this.comment == ''){
                this.$message({
                        message:'审批意见不能为空！',
                        type: 'warning'
                })
                return 
            }
            // if(this.comment.length>300) {
            //     this.$message({
            //         message:'输入字符超出限额，请重新输入！',
            //         type:'warning'
            //     })
            //     return 
            // }
            recepFlow({
                recpFlowId:this.$route.query.key,
                comment:this.comment,
                flag:'no',
                procInsId:this.detail.procInsId 
            }).then(res =>{
                if(res.status ==0){
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
                    // this.$router.push({
                    //     path:'/me/recepList'
                    // })
                    this.$router.go(-1)
                }
            })
        },
        cancelBtn(){
            console.log(this.taskId)
            recepCancel({
                procInsId:this.detail.procInsId,
                taskId:this.taskId || 0
            }).then(res =>{
                if(res.status ==0){
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
                    // this.$router.push({
                    //     path:'/me/recepList'
                    // })
                    this.$router.go(-1)
                }
            })
        },
        delBtn(){
            recepDel({
                recpFlowId:this.$route.query.key
            }).then(res =>{
                if(res.status ==0){
                    this.dialogDelVisible = false
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
                    // this.$router.push({
                    //     path:'/me/recepList'
                    // })
                    this.$router.go(-1)
                }
            })
        }
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