<template>
    <div>
        <el-row>
            <el-col :span="12" class="segment-brline">
                <RedStar label="申请人员：">
                    <span class="right-con">{{userInfo.name}}</span>
                </RedStar>
                <!-- <div class="clearfix cominfo-item">
                    <span class="left-title font-gray">申请人员：</span>
                    <span class="right-con">{{userInfo.name}}</span>
                </div> -->
            </el-col>
            <el-col :span="12" class="segment-brline">
                <RedStar label="所属部门：">
                    <span class="right-con">{{ userInfo.officeName }}</span>
                </RedStar>
                <!-- <div class="clearfix  cominfo-item">
                    <span class="left-title font-gray">所属部门：</span>
                    <span class="right-con">{{ userInfo.officeName }}</span>
                </div> -->
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12" class="segment-brline">
                <RedStar label="所属岗位：">
                    <span class="right-con">{{userInfo.postName}}</span>
                </RedStar>
                <!-- <div class="clearfix  cominfo-item">
                    <span class="left-title font-gray">所属岗位：</span>
                    <span class="right-con">{{userInfo.postName}}</span>
                </div> -->
            </el-col>
            <el-col :span="12" class="segment-brline">
                <RedStar label="申请日期：">
                    <span class="right-con">{{applyTime}}</span>
                </RedStar>
                <!-- <div class="clearfix  cominfo-item">
                    <span class="left-title font-gray">申请日期：</span>
                    <span class="right-con">{{applyTime}}</span>
                </div> -->
            </el-col>
        </el-row>
    </div>
</template>

<script>
import RedStar from '@/components/RedStar/RedStar.vue'
// import { fetchProList, expApply, expSave, getDetail, fetchThemeList, fetchMember } from '@/api/reim'
export default {
    components:{
        RedStar
    },
    props: {
        itemData: [Array,Object],
    },
    watch: {
    },
    data() {
        return {
            userInfo: {},
            applyTime: undefined,

        }
    },
    async created() {
        this.userInfo = JSON.parse(localStorage.getItem("web_oa_userInfor")) || {};
        this.getTime()
        
    },
    methods: {
        getTime(){
            let year = new Date().getFullYear()
            let month = new Date().getMonth() + 1
            let day = new Date().getDate()
            month = month<10?'0' + month: month
            day = day <10 ? '0'+ day: day
            this.applyTime = year + '-' + month + '-' + day
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
