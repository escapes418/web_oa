

<template>
<div class="textStyle-contain">
    <el-input :placeholder="placeholder"
        type="textarea"
        :style="textStyle"
        :rows="rows"
        :maxlength="max"
        :autosize="autosize"
        v-model.trim="currentValue"></el-input>
    <span class="textStyle-counter" v-show="showCounter && max">
        <span>{{count}}</span>/{{max}}
    </span>
</div>
    
</template>
<script>
export default {
    name: 'sjb-textStyle',
    props: {
        showCounter: {
            type: Boolean,
            default: true
        },
        max: Number,
        value: String,
        placeholder: String,
        readonly: Boolean,
        rows: {
            type: Number,
            default: 3
        },
        textStyle:String,
        autosize: Boolean // prop.autosize
    },
    created () {
        this.currentValue = this.value;
    },
    watch:{
        value (val) {
            this.currentValue = val
        },
        currentValue (newVal) {
            if (this.max && newVal && newVal.length > this.max) {
                this.currentValue = newVal.slice(0, this.max)
            }
            this.$emit('on-change', this.currentValue)
            this.$emit('input', this.currentValue)
        }
    },
    data () {
        return {
            currentValue: ''
        }
    },
    computed: {
        count () {
            let len = 0
            if (this.currentValue) {
                len = this.currentValue.replace(/\n/g, 'aa').length
            }
            return len > this.max ? this.max : len
        },
    }
}
</script>
<style scoped>
.textStyle-contain{
    display: flex
}
.textStyle-counter{
    align-self: flex-end;
    margin-left: 5px;
    font-size: 14px;
    color: #B2B2B2
}
</style>
