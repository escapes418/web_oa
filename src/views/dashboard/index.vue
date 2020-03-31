<template>
    <div :class="$style['dashboard-container']">
        <div :class="$style['dashboard-text']">{{userInfo&&userInfo.name || ""}},欢迎使用司机宝管理助手</div>

        <!-- <G6Editor mode="edit">

        </G6Editor> -->
    </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import mixin from '../../mixins/common.mix';
import { getToken ,removeToken} from '@/utils/auth';
import common from '@/utils/common'
import G6Editor from '@/components/vue-g6-editor/G6Editor'


export default {
    computed:{
        ...mapState({
          userInfo: state =>state.user.userInfo
        })
    },
    components:{G6Editor},
    data() {
        let self = this;
        return {
          data:{
            nodes:[{
              name: "测试节点",
              label: "测试节点",
              size:["170","34"],
              type: "node",
              x: 272.99998474121094,
              y: 91.999996185302734,
              shape: "customNode",
              color: "#1890ff",
              image: "https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg",
              inPoints: [[0,0.5]],
              outPoints: [[1,0.5]],
              offsetX: 581,
              offsetY: 23,
              id: "modify",
            },{
              name: "测试节点",
              label: "测试节点",
              size:["170","34"],
              type: "node",
              x: 272.99998474121094,
              y: 151.999996185302734,
              shape: "customNode",
              color: "#1890ff",
              image: "https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg",
              inPoints: [[0,0.5]],
              outPoints: [[1,0.5]],
              offsetX: 581,
              offsetY: 23,
              id: "node125",
            }],
            edges:[{
              id: "edge198",
              primaryKey: "8888",
              source: "modify",
              target: "node125",
              sourceId: "modify",
              targetId: "node125",
              start: {x: 0, y: 17},
              end: {x: 0, y: -17},
              shape: "customEdge",
              type: "edge",
              label: "条件节点",
              condition: {name: "", type: "", id: "", detailId: "", detailIds: []},
              startPoint: {x: 263.8216651750663, y: 109.49999618530273},
              endPoint: {x: 207.17831956614464, y: 217.5},
            }]
          }
        }
    },
    created() {
      
    },
    mounted() {
  
    },
    methods: {
      
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
.setBtn{
    font-size: 12px;
    color: #ba3080;
    
}
</style>
