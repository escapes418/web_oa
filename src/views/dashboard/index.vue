<template>
  <div :class="$style['dashboard-container']">
    <div :class="$style['dashboard-text']">{{userInfo.name}},欢迎使用司机宝管理助手</div>
    <!-- <div style="max-width:500px">
      <sjb-input clearable></sjb-input>
      <sjb-cascader :titles="['titleA','titleB']" class="cascader" :listData="cascaderData"></sjb-cascader>
      <sjb-validate-input class="validate-input"/>
    </div> -->
    <!-- <RedStar label="备注：">
        <span class="right-con">
            <sjbNumInput 
                v-model.trim="filter.customerSituation" 
                placeholder="请输入"
                :precision="2"
                :max="10000"
                :min="0"
                ></sjbNumInput>
        </span>
    </RedStar>

    
    <el-button @click="backStep">返回</el-button> -->
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import mixin from '../../mixins/common.mix';
// import ImplyNode from '@/components/ImplyNode'
import RedStar from '@/components/RedStar/RedStar.vue'
// import sjbInput from "./sjb-input.vue";
// import sjbCascader from "./sjb-Cascader.vue";
// import sjbValidateInput from "./sjb-validate-input.vue";
import sjbNumInput from "./sjb-numInput.vue";
export default {
    name: 'dashboard',
    components: {
        // ImplyNode,
        RedStar,
        // sjbInput,
        // sjbCascader,
        // sjbValidateInput,
        sjbNumInput
    },
    mixins: [mixin],
    computed:{
        ...mapState({
            itemList:state => state.map.itemList,
        })
    },
    data() {
    return {
        filter:{
            customerSituation:""
        },
        a:{width:"280px"},
        cascaderData: [
            {
                id: 101,
                name: "branch01",
                parentid: 0
            },
            {
                id: 102,
                name: "branch02",
                parentid: 0
            },
            {
                id: 103,
                name: "branch03",
                parentid: 0
            },
            {
                id: 201,
                name: "termminalA",
                parentid: 101
            },
            {
                id: 202,
                name: "termminalB",
                parentid: 101
            },
            {
                id: 203,
                name: "termminalC",
                parentid: 102
            },
            {
                id: 204,
                name: "termminalD",
                parentid: 102
            },
            {
                id: 205,
                name: "termminalE",
                parentid: 103
            }]
        };
    },
    created() {
        // let data = [{lat: 30.696403,
        //               lng: 104.073649,
        //               nodeAddress: "四川省成都市金牛区荷花池街道成都北站成都站",
        //               nodeId: "0c345cdafde84b5aa2f17c6b3a0d420d",
        //               nodeName: "成都"},{
        //               lat: 31.884864,
        //               lng: 117.317611,
        //               nodeAddress: "安徽省合肥市瑶海区长淮街道合肥站(检票口2-3)合肥站",
        //               nodeId: "ff8cb79f2b7445fdb575c8cd5631a6ff",
        //               nodeName: "合肥",
        //             }]
        // this.$store.dispatch('fillItemList', data);
    },
    mounted() {
        
        
    },
    methods: {
        // selectAll(val) {
        //     this.$store.dispatch('fillItemListChecked', val);
        // },
        // add() {
        //     this.$store.dispatch("addItem");
        // },
        // del() {
        //     this.$store.dispatch('delItemListChecked');
        // },
        backStep(){
            console.log(this.filter)
        },
    }
};
</script>

<style lang="scss" module>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.box{
  display: flex;
  width: auto;
  .title{
    flex:0 0 300px;
  }
  .content{
    flex: 1
  }
}
.cascader {
  position: relative;
  top: 100px;
}
.validate-input {
  position: relative;
  top: 200px;
}
</style>
