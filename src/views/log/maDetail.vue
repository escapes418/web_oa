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
                            <span class="right-con">{{ detail.createByName }}</span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">提交时间：</span>
                            <span class="right-con">{{ detail.createTime | stamp2TextDateFull }}</span>
                        </div>
                        
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">当日上门拜访：</span>
                            <span class="right-con">
                                {{ detail.custVisitCount }}
                            </span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">当日签约数量：</span>
                            <span class="right-con">
                                {{ detail.custSignCount }}
                            </span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">明日工作计划：</span>
                            <span class="right-con" style="max-width:450px">
                                {{ detail.afterDailyPlan }}
                            </span>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">所属部门：</span>
                            <span class="right-con">{{ detail.officeName }}</span>
                        </div>
                        <div class="clearfix cominfo-item">
                            <span class="left-title font-gray">当日电话拜访：</span>
                            <span class="right-con">{{ detail.custPhotoCount }}</span>
                        </div>
                        
                        <div class="clearfix cominfo-item">
                            <span class="left-title font-gray">当日意向数量：</span>
                            <span class="right-con">{{ detail.custIntentionCount }}</span>
                        </div>
                        <div class="clearfix  cominfo-item">
                            <span class="left-title font-gray">明日拜访数量：</span>
                            <span class="right-con">{{ detail.afterVisitCount }}</span>
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
                客户情况
            </div>
            <div class="segment-area">
                <div class="el-table__body-wrapper">
                    <el-table ref="multipleTable" border :show-header="true" :data="itemList" tooltip-effect="dark">
                        <el-table-column align="center" label="客户名称" width="320px">
                            <template slot-scope="scope">
                                <span>{{scope.row.custName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="拜访类型" width="180px">
                            <template slot-scope="scope">
                                <span>{{scope.row.visitTypeName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="维护时间" width="400px">
                            <template slot-scope="scope">
                                <span>{{scope.row.custMaintenanceDate | stamp2TextDateFull}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="维护内容">
                            <template slot-scope="scope">
                                <span>{{scope.row.custMaintenanceContent}}</span>
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
                                {{sendName.join('，')}}
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
import { getMaDetail,getMaCust,saveCritique,getCritique } from "@/api/log";
import { Vue, Component } from "vue-property-decorator";
import { POST_item,DETAIL_info} from "./interface";
import sjbtextarea from '@/components/sjbTextarea/index.vue';
@Component({
    components: {
        sjbtextarea
    }
})
export default class maDetail extends Vue{
    //data
    detail:DETAIL_info={};
    itemList:Array<POST_item>=[];
    sendName:any[] = [];
    pageNo:number = 1;
    pageSize:number = 10;
    total:number = 0;
    dialogCritique:boolean = false;
    critique:string = "";
    critiqueList:string[] = [];
    //生命周期函数
    created(){
        getMaDetail({
            id:this.$route.query.key
        }).then((res:Ajax.AjaxResponse)=>{
            if(res.status == 0){
                this.detail = res.data;
                res.data.sendToList.forEach(item => {
                    this.sendName.push(item.sendToName)
                });
            }
        })
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
        getMaCust({
            id:this.$route.query.key,
            pageNo:this.pageNo,
            pageSize:this.pageSize
        }).then((res:Ajax.AjaxResponse)=>{
            this.itemList = res.data.list
            this.total = res.data.total
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
                this.critiqueDetail();
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


