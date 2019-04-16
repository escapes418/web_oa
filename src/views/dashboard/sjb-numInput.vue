

<template>
<div class="textStyle-contain">
    <el-input-number :placeholder="placeholder"
        v-model.trim="currentValue"
        :controls="controls"
        :min="min"
        :max="max"
        @change="setCurrentValue"
        ></el-input-number>
</div>
    
</template>
<script>
export default {
    name: 'sjb-numInput',
    props: {
        controls: {
            type: Boolean,
            default: false
        },
        min: Number,
        max:Number,
        value: String,
        placeholder: String,
        precision:{
            type:Number,
            default:2
        }
    },
    watch:{
        value(val){
            this.currentValue = Number(val).toFixed(this.precision);
            this.$emit('input', this.currentValue);
        },
    },
    created(){
        this.currentValue = this.value;
    },
    data () {
        return {
            currentValue: ''
        }
    },
    methods:{
        setCurrentValue(newVal){
            newVal = newVal+""
            this.$emit('input', newVal);
            this.$emit('change',  newVal);
        }
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
