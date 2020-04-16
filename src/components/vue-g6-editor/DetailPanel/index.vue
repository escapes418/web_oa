<template>
  <div class="detailpannel">
    <div>
      <div v-if="status=='node-selected'" class="pannel" id="node_detailpannel">
        <div class="pannel-title">审批节点</div>
        <div class="block-container">
          <el-row :gutter="10">
            <el-col :span="8" class="item-title">标题</el-col>
            <el-col :span="16">
              <el-input v-model="node.label" @change="handleChangeName" />
            </el-col>
            <el-col :span="8" class="item-title">审核人</el-col>
            <el-col :span="16">
              <el-select 
                filterable 
                v-model="assignee.type" 
                placeholder="请输入"  @change="selectNode">
                <el-option v-for="item in nodeOptions" :label="item.name" :value="item.type" :key="item.type">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="8" v-if="nodeLabel" class="item-title">{{nodeLabel}}</el-col>
            <el-col :span="16" v-if="nodeLabel">
              <el-select 
                filterable 
                v-model="assignee.detailId" 
                placeholder="请输入">
                <el-option v-for="item in nodeDetail" :label="item.name" :value="item.id" :key="item.id">
                </el-option>
              </el-select>
            </el-col>
            <!-- <el-col>
              <el-checkbox v-model="setNode">此节点，审批流程不自动跳过</el-checkbox>
            </el-col> -->
          </el-row>
        </div>
      </div>
      
      <div v-if="status==='edge-selected'" class="pannel" id="edge_detailpannel">
        <div class="pannel-title">条件设置</div>
        <div class="block-container">
          <el-row :gutter="10">
            <el-col :span="8" class="item-title">标题</el-col>
            <el-col :span="16">
              <el-input v-model="edge.label" @change="handleChangeName" />
            </el-col>
            <el-col :span="8" class="item-title">选择条件</el-col>
            <el-col :span="16">
              <el-select 
                filterable 
                v-model="condition.type" 
                placeholder="请输入"  @change="selectEdge">
                <el-option v-for="item in edgeOptions" :label="item.name" :value="item.type" :key="item.type">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="8" v-if="edgeLabel" class="item-title">{{edgeLabel}}</el-col>
            <el-col :span="16" v-if="edgeLabel&&condition.selectType==1">
              <el-select 
                filterable 
                v-model="condition.detailId" 
                placeholder="请输入">
                <el-option v-for="item in edgeDetail" :label="item.name" :value="item.id" :key="item.id">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="16" v-if="edgeLabel&&condition.selectType==2">
              <el-select 
                filterable
                multiple
                v-model="condition.detailIds" 
                placeholder="请输入">
                <el-option v-for="item in edgeDetail" :label="item.name" :value="item.id" :key="item.id">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="footBtn" v-if="status=='node-selected'||status =='edge-selected'">
        <el-button type="primary" @click="saveBtn">保存</el-button>
        <!-- <el-button @click="cancelBtn">取消</el-button> -->
      </div>
      <div v-if="status==='canvas-selected'" class="pannel" id="canvas_detailpannel">
        <div class="pannel-title">画布</div>
        <div class="block-container">
          <el-checkbox v-model="showGrid" @change="changeGridState">网格对齐</el-checkbox>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import { getConfig,getConfigDetails,getMember} from "@/api/g6";
import eventBus from "../common/eventBus";
import Grid from "@antv/g6/build/grid";
export default {
  data() {
    return {
      status: "canvas-selected",
      showGrid: false,
      page: {},
      graph: {},
      item: {},
      node: {},
      edge:{},
      assignee:{
        name:"",
        type:"",
        id:"",
        detailId:""
      },
      nodeOptions:[
      // {
      //   id: "011cf32477df4ab7a4266dbab538d092",
      //   name: "指定人员",
      //   type: "1",
      //   processType: "1"
      // },{
      //   id: "011cf32477df4ab7a4266dbab538d092",
      //   name: "部门负责人",
      //   type: "2",
      //   processType: "1"
      // },{
      //   id: "011cf32477df4ab7a4266dbab538d092",
      //   name: "流程角色",
      //   type: "3",
      //   processType: "1"
      // }
      ],
      nodeLabel:"",
      nodeDetail:[],
      setNode:false,
      edgeLabel:"",
      selectType:"",
      edgeDetail:[],
      edgeOptions:[
      // {
      //   id: "011cf32477df4ab7a4266dbab538d092",
      //   name: "指定人员",
      //   type: "1",
      //   processType: "1",
      //   selectType:"2"
      // },{
      //   id: "011cf32477df4ab7a4266dbab538d092",
      //   name: "部门负责人",
      //   type: "2",
      //   processType: "1",
      //   selectType:"1"
      // },{
      //   id: "011cf32477df4ab7a4266dbab538d092",
      //   name: "流程角色",
      //   type: "3",
      //   processType: "1",
      //   selectType:"1"
      // }
      ],
      condition:{
        name:"",
        type:"",
        id:"",
        detailId:"",
        selectType:"",
        detailIds:[]
      },
      grid: null
    };
  },
  created() {
    this.init();
    this.bindEvent();
    this.getOptions();
  },
  methods: {
    init() {},
    bindEvent() {
      let self = this;
      eventBus.$on("afterAddPage", page => {
        self.page = page;
        self.graph = self.page.graph;
        eventBus.$on("nodeselectchange", item => {
          self.assignee = {
            name:"",
            id:"",
            type:"",
            detailId:""
          }
          self.condition = {
            name:"",
            id:"",
            type:"",
            detailId:"",
            selectType:"",
            detailIds:[]
          }
          if (item.select === true && item.target.getType() === "node"&&item.target.getModel().nodeType == 'verify') {
            self.status = "node-selected";
            self.item = item.target;
            self.node = item.target.getModel();
            //解决对象数据关联
            const {name,id,type,detailId} = self.node.assignee;
            if(type){
              self.selectNode(type)
            }
            self.assignee.name = name;
            self.assignee.id = id;
            self.assignee.type = type;
            self.assignee.detailId = detailId;
          } else{
            if(item.select === true && item.target.getType() === "edge"){
              self.status = "edge-selected";
              self.item = item.target;
              self.edge = item.target.getModel();
              const {name,id,type,detailId,selectType,detailIds} = self.edge.condition;
              if(type){
                self.selectEdge(type)
              }
              self.condition.name = name;
              self.condition.id = id;
              self.condition.type = type;
              self.condition.detailId = detailId;
              self.condition.selectType = selectType;
              self.condition.detailIds = detailIds;
            }else {
              self.status = "canvas-selected";
              self.item = null;
              self.node = null;
            }
          }
          
        });
      });
    },
    handleChangeName(e) {
      const model = {
        label: e
      };
      this.graph.update(this.item, model);
    },
    selectNode(type){
      this.assignee.detailId = "";
      this.nodeLabel = "";
      this.nodeDetail = []
      this.nodeOptions.forEach(item=>{
        if(item.type == type){
          this.nodeLabel = item.name;
          this.assignee.name = item.name;
          this.assignee.id = item.id
        }
      })
      if(type == 1){
        getMember().then(res=>{
          if(res.code == 200){
            this.nodeDetail = res.data
          }
        })
      }else{
        getConfigDetails({
          processType:"1",
          type:type
        }).then(res=>{
          if(res.code == 200){
            this.nodeDetail = res.data
          }
        })
      }
      
    },
    selectEdge(type){
      this.condition.detailId = "";
      this.condition.detailIds = [];
      this.edgeLabel = "";
      this.edgeDetail = [];
      this.edgeOptions.forEach(item=>{
        if(item.type == type){
          this.edgeLabel = item.name;
          this.condition.name = item.name;
          this.condition.id = item.id;
          this.condition.selectType = item.selectType;
        }
      })
      getConfigDetails({
        processType:"2",
        type:type
      }).then(res=>{
        if(res.code == 200){
          this.edgeDetail = res.data
        }
      })
    },
    // cancelBtn(){

    // },
    saveBtn(){
      if(this.item.getType() == "node"){
        const model = {
          assignee:this.assignee
        }
        this.graph.update(this.item, model);
      }
      if(this.item.getType() == "edge"){
        const model = {
          condition:this.condition
        }
        this.graph.update(this.item, model);
      }
    },
    changeGridState(value) {
      if (value) {
        this.grid = new Grid();
        this.graph.addPlugin(this.grid);
      } else {
        this.graph.removePlugin(this.grid);
      }
    },
    getOptions(){
        getConfig("1").then(res=>{
          if(res.code == 200){
            this.nodeOptions = res.data
          }
        })
        getConfig("2").then(res=>{
          if(res.code == 200){
            this.edgeOptions = res.data
          }
        })
      
    }
  }
};
</script>

<style scoped>
.detailpannel {
  height: 100%;
  position: absolute;
  right: 0px;
  z-index: 2;
  background: #f7f9fb;
  width: 240px;
  border-left: 1px solid #e6e9ed;
  font-size: 12px;
}
.detailpannel .block-container {
  padding: 16px 8px;
}
.block-container .el-col {
  /* height: 28px; */
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.pannel-title {
  height: 32px;
  border-top: 1px solid #dce3e8;
  border-bottom: 1px solid #dce3e8;
  background: #ebeef2;
  color: #000;
  line-height: 28px;
  padding-left: 12px;
}
.footBtn{
  display:inline-block;
  margin-left: 50%;
}
.item-title{
  margin-top: 10px;
}
</style>
