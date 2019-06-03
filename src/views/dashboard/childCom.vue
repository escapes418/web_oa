<template>
    <div>
        <el-button :type='this.$attrs.type' :size='this.$attrs.size' @click="startRocket">导出</el-button>
    </div>
</template>

<script>

export default {
    data() {
        return {

        }
    },
    computed: {
       
    },
    mounted() {
        console.log(this.$attrs,1111111)
    },
    methods: {
        startRocket(){
            this.$emit('upRocket')
        }
    }

}


</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
