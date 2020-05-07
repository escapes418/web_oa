<template>
    <div class="postContain">
       <ul v-for="(item,index) in list" :key="index">
            <li v-html="item.operateInfo"></li>
            <i v-if="item.operateType ==3" class="el-icon-plus" @click="jumpChange(item)"></i>
        </ul>
        <el-pagination background  @current-change="handleCurrentChange" :current-page="pageNum" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
        </el-pagination>
    </div>
</template>

<script>
import { getDynamic } from "@/api/project";


export default {
    data() {
        return {
            list:[],
            pageNum: 1,
            pageSize: 20,
            total: 0,
        };
    },
    props:{
        dynamicType:{
            type: String,
            default: "1"
        },
        projectId:{
            type: String,
            default: ""
        }
    },
    created() {
        // this.getList();
    },
    mounted() {
    
    },
    methods: {
        getList() {
            getDynamic({
                dynamicType:this.dynamicType,
                projectId:this.projectId,
                pageNum:this.pageNum,
                pageSize:this.pageSize,
            }).then(res => {
                this.list = res.data.list;
                this.total = res.data.total;
            });
        },
        handleCurrentChange(val) {
            this.pageNo = val;
            this.getList();
        },
        jumpChange(item){
            this.$router.push({
                path: "/inforManage/changeDetail",
                query: { businessType:"1", businessId: item.id }
            });
        }
    }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.postContain{
    margin: 5px 0 5px 0;
    li{
        line-height: 28px;
        display:inline-block;
    }
}
</style>