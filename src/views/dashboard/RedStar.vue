<template>
    <div class="redStar">
        <div>
            <span v-if="isRequired">*</span>
            <span>{{label}}</span>
        </div>
        <div>
            <slot></slot>
        </div>
    </div>
</template>

<script>

export default {
    name: 'RedStar',

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
