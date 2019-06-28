<template>
    <div :class="$style['dashboard-container']">
        <div :class="$style['dashboard-text']">{{userInfo.name}},欢迎使用司机宝管理助手</div>
        

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
