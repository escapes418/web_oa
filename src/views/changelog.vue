<template>
    <div class="sjb-form-wrapper">
        <div class="change-title">
            更新日志
        </div>
        <div class="change-card" v-for="item in sysVersion" >
            <el-card class="boxcard" shadow='hover'>
                <div slot="header" class="clearfix">
                    <span class="versionNo">{{item.versionNo}}</span>
                    <span style="float: right; padding: 3px 0" >更新时间：{{item.createTime}}</span>
                </div>
                <div class="card-content">
                    {{item.context}}
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
import common from "@/utils/common";
import { sysVersionLists } from "@/api/changelog";

export default {
    name: "complexTable",
    data() {
        return {
            filter: {
                end: "",
                pageNo: "0",
                pageSize: "0",
                start: "",
                versionNo: ""
            },
            sysVersion: []
        };
    },
    computed: {},
    created() {
        sysVersionLists(this.filter).then(res => {
            this.sysVersion = res.data;
            console.log(this.sysVersion);
        });
    },
    methods: {},
    mounted() {}
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.change-title {
    font-size: 22px;
    padding: 26px;
}
.change-card {

    width: 100%;
    margin-bottom:30px; 
    .clearfix:after {
    clear: both
  }
    .boxcard {
        margin: 0 auto;
        width: 90%;
    }
    .card-content{
        padding: 0 20px;
    }
    .versionNo{
        font-size: 20px;
        font-weight: 600;
    }
}
</style>

