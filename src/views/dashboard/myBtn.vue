<template>
    <div class="redStar">
        <childCom v-bind="$attrs" v-on="$listeners">导出</childCom>
    </div>
</template>

<script>
import childCom from "./childCom.vue";
import { connect } from 'net';
export default {
    components:{
        childCom
    },
    data() {
        return {

        }
    },

    props: {
        label: String,
        prop: String,
    },
    computed: {
        isRequired() {
            return this.$parent.$parent.rules[this.prop].required;
        }
    },
    mounted() {
        console.log(this.$attrs)
    },
    methods: {

    }

}


</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.redStar{
    width:auto;
    display: flex;
}
.redStar > div{
    flex:1;
}
</style>
