<template>
  <div class="page">
    <div :id="pageId" class="graph-container" style="position: relative;"></div>
  </div>
</template>


<script>
import G6 from "@antv/g6/build/g6";
import { initBehavors } from "../behavior";
import { getDetail } from '@/api/g6'
export default {
  data() {
    return {
      pageId: "graph-container",
      graph: null,
      data:{}
    };
  },
  props: {
    height: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 0
    },
    // data: {
    //   type: Object,
    //   default: () => {}
    // }
  },
  created() {
    
    initBehavors();
  },
  mounted() {
    this.id = this.$route.query.key
    this.init()

  },
  methods: {
    init() {
      const height =  this.height - 42 
      const width =  this.width - 400

      this.graph = new G6.Graph({
        container: "graph-container",
        height: height,
        width: width,
        modes: {
          // 支持的 behavior
          default: [
            "drag-canvas",
            "zoom-canvas",
            "hover-node",
            "select-node",
            "hover-edge",
            "keyboard",
            "customer-events",
            "add-menu"
          ],
          mulitSelect: ["mulit-select"],
          addEdge: ["add-edge"],
          moveNode:[ "drag-item"]
        }
      });
      const { editor, command } = this.$parent;
      editor.emit("afterAddPage", { graph: this.graph, command });
      if(this.id){
        this.getInitData()
      }
      
      // this.readData();
    },
    // readData() {
    //   // let data = this.data;
    //   console.log(this.data)
    //   if (this.data&&Object.keys(this.data).length > 0) {

    //     this.graph.read(this.data);
    //   }
    // },
    getInitData(){
        getDetail(this.id).then(res=>{
            if(res.status == 0){
                if(res.data&&Object.keys(res.data).length>0){
                  this.graph.read(res.data);
                }
            }
        })
    }
  }
};
</script>

<style scoped>
.page{
  margin-left:200px;
  margin-right: 200px;
}
</style>