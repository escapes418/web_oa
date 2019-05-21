<template>
    <el-button v-bind="$attrs" @click="debounceInput"></el-button>
</template>

<script>
import { clearTimeout, setTimeout } from 'timers';

export default {
    data() {
        return {
            timeout: null
        }
    },
    computed: {
       
    },
    mounted() {
        
    },
    methods: {
        debounceInput(value){
            if(this.timeout !== null) clearTimeout(this.timeout)
            this.timeout = setTimeout(_=>{
                this.$emit('input',value)
            },300)
        }
    }

}


</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
