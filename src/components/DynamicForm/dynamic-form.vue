<template>
<el-form ref="formData">
    <!-- <el-form ref="formData" label-width="150px" label-position="left"> -->
        <ul class="form-ul cl">
            <template v-for="(item,index) in data">
                <li class="form-li" :key="index">
                    <RedStar :label="item.columnLabel+'：'" :required="item.required=='1'">
                        <form-item :item="item"></form-item>
                    </RedStar>
                </li>
            </template>
        </ul>
    </el-form>
</template>
<script>

import RedStar from '@/components/RedStar/RedStar.vue'
import formItem from "./form-item";
export default {
    name: 'dynamic-form',
    components:{
        formItem,
        RedStar
    },
    data() {
        return {
            postData:{}
        }
    },
    props: {
        data: {
            type: Array,
        },

    },
    created() {
        
    },
    mounted() {
        // console.log(config.options)
    },
    methods: {

    }

}


</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.form-ul{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.form-li{
    flex-basis: 50%;
}
</style>
