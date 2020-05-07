<template>
    <div class="sjb-form-wrapper">
        <div class="segment statistics">
            <div class="segment-header">
                任务基本信息
            </div>
            <div class="segment-area">
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
                        <div style="height:32px">{{preTaskInfo.taskCode}}</div>
                        <div style="height:32px">{{preTaskInfo.parentTaskCode}}</div>
                        <div style="height:32px">{{preTaskInfo.taskName}}</div>
                        <div style="height:32px">{{preTaskInfo.projectStageName}}</div>
                        <div style="height:32px">{{preTaskInfo.principalName}}</div>
                        <div style="height:32px">{{preTaskInfo.participantNames}}</div>
                        <div style="height:32px">{{preTaskInfo.startTime | stamp2TextDate}}</div>
                        <div style="height:32px">{{preTaskInfo.endTime | stamp2TextDate}}</div>
                        <div style="height:32px">{{preTaskInfo.taskDesc}}</div>
                        <div style="height:32px">{{preTaskInfo.remark}}</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="changeTitle red">变更后</div>
                         <div style="height:32px">{{postTaskInfo.taskCode}}</div>
                        <div style="height:32px">{{postTaskInfo.parentTaskCode}}</div>
                        <div style="height:32px">{{postTaskInfo.taskName}}</div>
                        <div style="height:32px">{{postTaskInfo.projectStageName}}</div>
                        <div style="height:32px">{{postTaskInfo.principalName}}</div>
                        <div style="height:32px">{{postTaskInfo.participantNames}}</div>
                        <div style="height:32px">{{postTaskInfo.startTime | stamp2TextDate}}</div>
                        <div style="height:32px">{{postTaskInfo.endTime | stamp2TextDate}}</div>
                        <div style="height:32px">{{postTaskInfo.taskDesc}}</div>
                        <div style="height:32px">{{postTaskInfo.remark}}</div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="segment statistics">
            <div class="sjb-foot-button">
                <!-- <el-button  type="primary" size="small" @click="submit">保存</el-button> -->
                <el-button  size="small" @click="backStep">返回</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import sjbtextarea from '@/components/sjbTextarea';
import common from '@/utils/common';
import config from '@/utils/config';
import utils from '@/utils/utils';
import { getChangeDetail } from '@/api/project';

export default {
    data(){
        return{
            preTaskInfo:{

            },
            postTaskInfo:{
                
            },

            
        }
    },
    created(){
        this.getDetail()
    },
    methods: {
        getDetail(){
            getChangeDetail(this.$route.query.businessType,this.$route.query.businessId).then(res=>{
                this.preTaskInfo = res.data.preTaskInfo;
                this.postTaskInfo = res.data.postTaskInfo
            })
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.segment .el-table__body-wrapper {
    padding: 40px 20px 35px;
    
}
.segment-area{
    font-size: 13px;
}
.changeTitle{
    text-align: center;
    background: rgb(238,241,246);
    margin-top: 15px;
    font-size: 16px;
}
.red{
    color: red;
}
</style>