<template>
    <div class="segment-brline">
        <h5 class="baseHeader">
            <span v-if="required" class="red">*</span>
            {{title}}
        </h5>
        <div class="baseSlot">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title:[String],
        required:Boolean
    },
    data() {
        return {
            userInfo: {},
            applyTime: undefined,

        }
    },
    
    methods: {
    
    }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.baseHeader{
    margin: 20px 0 20px;
}
.red{
    color: red
}
.baseSlot{
    line-height: 32px;
    font-size: 12px;
    padding: 18px 24px;
    background-color: #fafafa;
    border: 1px solid #eaeefb;
    margin-bottom: 25px;
    border-radius: 4px;
}
</style>
