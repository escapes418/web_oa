<template>
    <div>
        <G6Editor mode="edit">

        </G6Editor>
    </div>
</template>

<script>
import G6Editor from '@/components/vue-g6-editor/G6Editor';
import { getDetail } from '@/api/g6'

export default {
    components:{G6Editor},
    data() {
        return {
            id:"",
            initData:{}
        }
    },
    created() {
        // this.id = this.$route.query.key
        // this.$nextTick(()=>{
        //     this.getInitData()
        // })
    },
    mounted() {
  
    },
    methods: {
        getInitData(){
            getDetail(this.id).then(res=>{
                if(res.status == 0){
                    this.initData = res.data
                    console.log(this.initData)
                }
            })
        }
    }
};
</script>

<style lang="scss" module>

</style>
