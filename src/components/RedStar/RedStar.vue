<template>
    <div class="star-box">
        <span class="star-item">
            <span v-if="required">*</span>
        </span>
        <span class="label-item" v-if="label">{{label}}</span>
        <span class="slot-item">
            <slot></slot>
        </span>
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
        required: Boolean
    },
    mounted() {


    },
    methods: {

    }

}


</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.star-box{
    display: flex;
    margin: 10px 0;
}

.star-item{
    color: red;
    flex:0 0 15px;
    line-height: 35px;
}
.label-item{
    font-size: 14px;
    padding-right: 10px;
    color: #99a9bf;
    flex:0 0 150px;
}
.slot-item{
    color: #343434;
    font-size: 14px;
    flex:1
}

</style>
