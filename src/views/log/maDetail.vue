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
                            <span class="right-con">
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
                            <span class="ignore-detail" :title="detail.remarks">{{ detail.remarks }}</span>
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
                    <el-table ref="multipleTable" border :data="itemList" tooltip-effect="dark">
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
                </el-row>
            </div>
        </div>
        <div class="segment statistics">
            <div class="sjb-foot-button">
                <el-button size="medium" @click="backBtn">返回</el-button>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import common from "@/utils/common";
import { getMaDetail,getMaCust, } from "@/api/log";
import { Vue, Component } from "vue-property-decorator";
import { POST_item,DETAIL_info} from "./interface";
@Component({
    components: {
        
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


