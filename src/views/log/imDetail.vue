<template>
    <div class="sjb-form-wrapper">
        <div class="segment statistics">
            <div class="segment-header">
                基本信息
            </div>
            <div class="segment-area">
                <el-row>
                    <el-col :span="12" class="segment-brline">
                        <div class="clearfix cominfo-item">
                            <span class="left-title font-gray">提交人：</span>
                            <span class="right-con">{{ detail.createBy }}</span>
                        </div>
                        <div class="clearfix cominfo-item">
                            <span class="left-title font-gray">提交时间：</span>
                            <span class="right-con">{{ detail.createTime | stamp2TextDateFull}}</span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">今日工作：</span>
                            <span class="right-con" style="max-width:450px">
                                {{ detail.todayWork }}
                            </span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">回访项目情况：</span>
                            <span class="right-con" style="max-width:450px">
                                {{ detail.revisitProjectStatus }}
                            </span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">今日感想：</span>
                            <span class="right-con" style="max-width:450px">
                                {{ detail.todayThought }}
                            </span>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">部门：</span>
                            <span class="right-con">{{ detail.createByDept }}</span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">运力池建设：</span>
                            <span class="right-con" style="max-width:450px">{{ detail.transportPoolBuild }}</span>
                        </div>
                        <div class="clearfix cominfo-item">
                            <span class="left-title font-gray">需要协助问题：</span>
                            <span class="right-con" style="max-width:450px">{{ detail.needAssistProblem }}</span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">备注：</span>
                            <span class="right-con" style="max-width:450px">{{ detail.remarks }}</span>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="segment statistics">
            <div class="segment-header">
                项目情况
            </div>
            <div class="segment-area">
                <div class="el-table__body-wrapper">
                    <el-table ref="multipleTable" border :data="itemList" tooltip-effect="dark">
                        <el-table-column align="center" label="项目名称" width="320px">
                            <template slot-scope="scope">
                                <span>{{scope.row.projectName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="节点" width="180px">
                            <template slot-scope="scope">
                                <span>{{scope.row.nodeName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="节点具体地址" width="400px">
                            <template slot-scope="scope">
                                <span>{{scope.row.nodeAddress}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="节点人数">
                            <template slot-scope="scope">
                                <span>{{scope.row.nodeEmpNum}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="节点具体人员">
                            <template slot-scope="scope">
                                <span>{{scope.row.nodeEmpNames}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="异常情况">
                            <template slot-scope="scope">
                                <span>{{scope.row.hasAbnormalStatus}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="具体异常说明">
                            <template slot-scope="scope">
                                <span>{{scope.row.anomalyDescription}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="pagination-container">
                    <el-pagination background  @current-change="handleCurrentChange" :current-page="pageNo" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
                    </el-pagination>
                </div>
            </div>
        </div>
        <div class="segment statistics">
            <div class="segment-header">
                发送对象
            </div>
            <div class="segment-area">
                <el-row>
                    <el-col :span="12" class="segment-brline">
                        <div class="clearfix cominfo-item">
                            <span class="left-title font-gray">发送给：</span>
                            <span class="right-con">
                                {{detail.sendToUserList&&detail.sendToUserList.join('，')}}
                            </span>
                        </div>
                    </el-col>
                    <el-col :span="12" class="segment-brline">
                        <div class="clearfix cominfo-item">
                            <span class="left-title font-gray">抄送给：</span>
                            <span class="right-con">
                                {{detail.copyToList&&detail.copyToList.join('，')}}
                            </span>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="segment statistics">
            <div class="segment-header">
                批阅区
                <i class="el-icon-edit-outline" style="color: rgb(64, 158, 255); cursor: pointer;" @click="showCritique"></i>
            </div>
            <div class="segment-area">
                <el-table ref="multipleTable" :show-header="false" :data="critiqueList" tooltip-effect="dark">
                    <el-table-column align="center" label="批阅人" width="320px">
                        <template slot-scope="scope">
                            <span>{{scope.row.createBy}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="内容">
                        <template slot-scope="scope">
                            <span>{{scope.row.comment}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="评阅时间" width="400px">
                        <template slot-scope="scope">
                            <span>{{scope.row.createTime | stamp2TextDateFull}}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <el-dialog title="批阅" :visible.sync="dialogCritique" width="25%">
            <sjbtextarea placeholder="请输入" :rows="5" textStyle="margin-bottom:10px" v-model.trim="critique" :max="500"></sjbtextarea>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogCritique = false">取消</el-button>
                <el-button type="primary" @click="confirmCritique">确认</el-button>
            </div>
        </el-dialog>
        <div class="segment statistics">
            <div class="sjb-foot-button">
                <el-button size="medium" @click="backBtn">返回</el-button>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import common from "@/utils/common";
import { getImDetail,saveCritique,getCritique } from "@/api/log";
import { Vue, Component } from "vue-property-decorator";
import { DETAIL_list} from "./interface";
import sjbtextarea from '@/components/sjbTextarea/index.vue';

@Component({
    components: {
        sjbtextarea
    }
})
export default class imDetail extends Vue{
    //data
    detail:DETAIL_list={};

    itemList:Array<DETAIL_list> = [];
    pageNo:number = 1;
    pageSize:number = 10;
    total:number = 0;
    dialogCritique:Boolean = false;
    critique:string  = "";
    critiqueList:string[] = [];
    //生命周期函数
    created(){
    
    }
    mounted() {
        this.getList()
        this.critiqueDetail()
    }
    
    backBtn():void{
        this.$router.go(-1)
    }
    handleCurrentChange(val:number):void{
        this.pageNo = val;
        this.getList();
    }
    getList():void{
        getImDetail({
            dailyId:this.$route.query.key,
            pageNo:this.pageNo,
            pageSize:this.pageSize
        }).then((res:Ajax.AjaxResponse)=>{
            this.detail = res.data;
            this.itemList = res.data.projectImplementStatusPage.list;
            this.total = res.data.projectImplementStatusPage.count;
        })
    }
    critiqueDetail():void{
        getCritique({
            id:this.$route.query.key,
        }).then((res:Ajax.AjaxResponse)=>{
            this.critiqueList = res.data.list
        })
    }
    showCritique():void{
        this.dialogCritique = true;
        this.critique = "";
    }
    confirmCritique():void{
        saveCritique({
            dailyId:this.$route.query.key,
            comment:this.critique
        }).then((res:Ajax.AjaxResponse)=>{
            if(res.status == 0){
                this.$message({
                    message:res.message,
                    type:'success'
                })
                this.dialogCritique = false;
                this.critiqueDetail()
            }
        })
    }
}

</script>
<style scoped>
.textStyle{
    margin-top: 5px;
    margin-bottom: 5px;
    font-size: 14px;
    line-height: 32px;
    color: #343434;
}
.ignore-detail {
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
    color: #343434;
    font-size: 14px;
}
</style>


