<template>
  <div :class="$style['dashboard-container']">
    <div :class="$style['dashboard-text']">{{userInfo.name}},欢迎使用司机宝管理助手</div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import mixin from '../../mixins/common.mix';
import ImplyNode from '@/components/ImplyNode'
import RedStar from "./RedStar.vue";

export default {
  name: 'dashboard',
  components: {
    ImplyNode,
    RedStar
  },
  mixins: [mixin],
  computed:{
    ...mapState({
      itemList:state => state.map.itemList,
    })
  },
  data() {
    return {
     
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

</style>
