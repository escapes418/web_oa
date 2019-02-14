<template>
    <el-form-item>
    <!-- <el-form-item :label="item.name+'：'" label-position="right"> -->
        <!-- inputType:为1 表示文本输入框  为2表示下拉框 目前只有这2种 -->
        <slot v-if="item.columnType == 'text'">
            <el-input v-model.trim="item.value" size="medium" type="text" auto-complete="off" :placeholder="'请输入'+item.columnLabel" class="pr-5" style="width:260px;" :readonly="item.readonly=='1'"></el-input>
        </slot>
        <slot v-if="item.columnType == 'select-cust'">
            <el-select v-model="item.value" size="medium" filterable clearable remote :placeholder="'请选择'+ item.columnLabel" style="width:260px;" @change="selectCustItem" @clear="cleaCustItem" :remote-method="seachItem">
                <el-option v-for="(i, index) in selectCust" :key="i.key" :label="i.value" :value="i.key"></el-option>
            </el-select>
        </slot>
        <slot v-if="item.columnType == 'select'">
            <el-select v-model="item.value" size="medium" filterable clearable :placeholder="'请选择'+ item.columnLabel" style="width:260px;" @change="selectItem" @clear="cleaItem">
                <el-option v-for="(i, index) in selectList" :key="i.key" :label="i.value" :value="i.key"></el-option>
            </el-select>
        </slot>
    </el-form-item>
</template>

<script>
import request from '@/utils/request'
import { mapGetters } from 'vuex'
import mixin from '../../mixins/common.mix'

export default {
    name: 'form-item',

    data() {
        return {
            selectList:[],
            selectCust:[]
        }
    },
    props: {
        item: {
            type: Object,
        },
    },
    watch:{
        'item.value':function(val){
            this.$store.dispatch('changeItem',this.item);
        },
        'item.url':function(url){
            if (this.item.columnType == 'select'&&url) {
                // 根据项目自行修改
                request({
                    url:url,
                    method:'post',
                    data:{
                        memberName:'',
                        memberType:this.item.memberType
                    }
                },false).then(res => {
                    this.selectList = res.data 
                })
            }
        }
    },
    created() {
        const {url,memberType} = this.item
        if (this.item.columnType == 'select') {
            // 根据项目自行修改
            request({
                url:url,
                method:'post',
                data:{
                    memberName:'',
                    memberType:memberType
                }
            },false).then(res => {
                this.selectList = res.data 
            })
        }
        if(this.item.columnType == 'select-cust'&&this.item.value){
            this.selectCust.push({key:this.item.value,value:this.item.label})
        }
    },
    mounted() {
        // console.log(config.options)
    },
    methods: {
        selectItem(){
            this.selectList.forEach(i => {
                if(i.key == this.item.value){
                    this.$store.dispatch('dispatchItem',i);
                }
            });
        },
        selectCustItem(){
            this.selectCust.forEach(i => {
                if(i.key == this.item.value){
                    this.$store.dispatch('dispatchItem',i);
                }
            });
        },
        cleaItem(){
            this.$store.dispatch('cleanItem',this.item)
        },
        cleaCustItem(){
            this.$store.dispatch('cleanItem',this.item)
            this.selectCust = []
        },
        seachItem(val){
            if(val!==''){
                if(this.item.url){
                    request({
                        url:this.item.url,
                        method:'post',
                        data:{
                            memberName:val,
                            memberType:this.item.memberType
                        }
                    },false).then(res => {
                        this.selectCust = res.data 
                    })
                }
                
            }
        }
    }

}


</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-form-item--small .el-form-item__label{
    line-height: 32px;
    font-size: 14px;
    padding-right: 10px;
    color: #99a9bf !important;
}
</style>
