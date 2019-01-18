<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import mixin from '../../mixins/common.mix'

export default {
    name: 'dashboard',

    data() {
        return {

        }
    },
    props:{
    },
    mounted() {
    },
    methods: {

    }

}


</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
