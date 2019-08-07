<template>
    <div :class="$style['dashboard-container']">
        <div :class="$style['dashboard-text']">{{userInfo&&userInfo.name || ""}},欢迎使用司机宝管理助手</div>
        
        <!-- <button v-longpress="incrementPlusTen" @click="incrementPlusOne">{{value}}</button> -->
    </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import mixin from '../../mixins/common.mix';
import { getToken ,removeToken} from '@/utils/auth';
// import longpress from '@/directive/longpress' // 水波纹指令
import common from '@/utils/common'

// export default common.firstHide({
//     mixins: [mixin],
//     directives: {
//       longpress
//     },
//     computed:{
//         ...mapState({
        
//         })
//     },
//     data() {
//         return {
//             value: 10
//         };
//     },
//     created() {
       
//     },
//     mounted() {
//       // return new Promise((resolve)=>{
//       //   resolve()
//       // })    
//     },
//     methods: {
//         incrementPlusOne() {
//             this.value++
//         },
//         // increment value plus 10
//         incrementPlusTen() {
//             this.value += 10
//         }
//     }
// });
export default {
    // mixins: [mixin],
    directives: {
      longpress
    },
    computed:{
        ...mapState({
          userInfo: state =>state.user.userInfo
        })
    },
    data() {
        return {
            value: 10
        };
    },
    created() {
       
    },
    mounted() {
      // return new Promise((resolve)=>{
      //   resolve()
      // })    
    },
    methods: {
        incrementPlusOne() {
            this.value++
        },
        // increment value plus 10
        incrementPlusTen() {
            this.value += 10
        }
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
