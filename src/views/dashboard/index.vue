<template>
  <div :class="$style['dashboard-container']">
    <div :class="$style['dashboard-text']">{{userInfo.name}},欢迎使用司机宝管理助手</div>
    
    <!-- <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
        <div style="text-align: center;margin-bottom: 20px;">{{"单据提交饼图"}}</div>
        <ve-pie :data="pieData"></ve-pie>
        <div style="text-align: center;margin-top: 20px;margin-bottom: 20px;">{{"单据审批趋势折线图"}}</div>
        <ve-line :data="chartData" :data-zoom="dataZoom"></ve-line>
    </el-row> -->
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import mixin from '../../mixins/common.mix';
import { getToken ,removeToken} from '@/utils/auth';

export default {
    mixins: [mixin],
    computed:{
        ...mapState({
            
        })
    },
    data() {
        return {
            
        };
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
