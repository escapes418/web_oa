<template>
    <div class="region-box">
        <el-cascader :options="regionTree" filterable :props="props" :clearable='true' @change="regionChange" v-model="pointArr"></el-cascader>
    </div>
</template>


<script>

import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            props: {
                value: 'value',
                label: 'name',
            },
            regionTree:[],
        };
    },
    props:{
        pointList:Array
    },
    computed:{
        pointArr:{
            get:function(){
                return this.pointList
            },
            set:function(val){
                return val
            }
            
        }
    },
    created: function() {
        // 组件加载时就将省数据加载 如果已加载过就不再加载
        let regionList = JSON.parse(localStorage.getItem("web_oa_region"));
        this.regionTree = this.selectRegion(regionList)
        
    },
    methods: {
        regionChange(val){
            this.$emit('back-region', val);
        },
        selectRegion(arr){
            let temp = [];
            for(var i = 0;i<arr.length;i++){
                if(arr[i].parent == ""){
                    arr[i].children = []
                    temp.push(arr[i])
                }
                for(var j = 0;j<temp.length;j++){
                    if(temp[j].value == arr[i].parent){
                        temp[j].children.push(arr[i])
                    }
                }
            }
            return temp
        }

    }
};
</script>
