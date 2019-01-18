<template>
  <div class="sjb-form-wrapper">
    <div class="segment statistics">
        <div class="segment-header">
            基本信息
        </div>
        <div class="segment-area">
            <el-row>
                <el-col :span="12" class="segment-brline">
                    <div class="clearfix cominfo-item">
                        <span class="left-title font-gray">报销人员：</span><span class="right-con">{{  "123" }}</span>
                    </div>
                    <div class="clearfix  cominfo-item">
                        <span class="left-title font-gray">所属部门：</span><span class="right-con">{{  "123" }}</span>
                    </div>
                    <div class="clearfix  cominfo-item">
                        <span class="left-title font-gray">报销类型：</span>
                        <span class="right-con">
                          <el-select clearable class="filter-item" v-model="filter.orderfilterstate" placeholder="请选择" style="width:120px;" >
                            <el-option v-for="item in stateArr" :label="item.label" :value="item.value" :key="item.value">
                            </el-option>
                          </el-select>
                        </span>
                    </div>
                    <div class="clearfix  cominfo-item">
                        <span class="left-title font-gray">项目名称：</span>
                        <span class="right-con">
                          <el-input auto-complete="off" :disabled="certifystate == 4"  placeholder="请输入与营业执照信息一致的公司名称"></el-input>
                        </span>
                    </div>
                    <div class="clearfix  cominfo-item">
                        <span class="left-title font-gray">票据数量：</span>
                        <span class="right-con">
                          <el-input auto-complete="off"></el-input>
                        </span>
                    </div>
                    <div class="clearfix  cominfo-item">
                        <span class="left-title font-gray">票据数量：</span>
                        <span class="right-con">
                          <el-input auto-complete="off" v-model="num" @input="changeNameList"></el-input>
                          <div v-for="(item,key) in namelist ">
                                {{item.name +"22"}}
                                <el-select clearable class="filter-item" v-model="item.name" placeholder="请选择" style="width:120px;" >
                                    <el-option v-for="item in stateArr" :label="item.label" :value="item.value" :key="item.value">
                                    </el-option>
                                </el-select>
                          </div>
                        </span>
                    </div>
                </el-col>
                <el-col :span="12" class="segment-brline">
                    <div class="clearfix cominfo-item">
                        <span class="left-title font-gray">报销日期：</span><span class="right-con">{{  "123" }}</span>
                    </div>
                    <div class="clearfix  cominfo-item">
                        <span class="left-title font-gray">岗位名称：</span><span class="right-con">{{  "123" }}</span>
                    </div>
                    <div class="clearfix  cominfo-item">
                        <span class="left-title font-gray">发票所属公司：</span><span class="right-con">{{ "123" }}</span>
                    </div>
                    <div class="clearfix  cominfo-item">
                        <span class="left-title font-gray">项目负责人：</span>
                        <span class="right-con">
                          {{"xxxx"}}
                        </span>
                    </div>
                    <div class="clearfix  cominfo-item">
                        <span class="left-title font-gray">费用合计：</span>
                        <span class="right-con">
                          <el-input auto-complete="off"></el-input>
                        </span>
                    </div>
                </el-col>
            </el-row>
        </div>
        
    </div>
    <div class="segment statistics">
        <div class="segment-header">
            报销明细
        </div>
        <div class="segment-area">
          <div class="el-table__body-wrapper">
            <table id="expenseDetails" class="table table-striped table-bordered table-condensed" style="width:1500px;margin-bottom: 20px;">
              <thead>
                <tr class="tableTitle">
                  <td style="text-align: center;width: 20px;padding: 0 10px 0 10px;">
                    <el-checkbox v-model="checkAll" @change="selectAll">全选</el-checkbox>
                  </td>
                  <td class="tableTitle">发生日期</td>
                  <td class="tableTitle">起点</td>
                  <td class="tableTitle">结束日期</td>
                  <td class="tableTitle">终点</td>
                  <td class="tableTitle">一级科目</td>
                  <td class="tableTitle">二级科目</td>
                  <td class="tableTitle">人数</td>
                  <td class="tableTitle">天数</td>
                  <td class="tableTitle">票据张数</td>
                  <td class="tableTitle">报销金额</td>
                  <td class="tableTitle">备注</td>
                  <td class="tableTitle">更多操作</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,key) in itemList" style="height:50px" >
                  <td style="padding: 0 10px 0 10px;">
                    <el-checkbox v-model="item.show" @change="changeInput(item)"></el-checkbox>
                  </td>
                  <td style="padding: 0 10px 0 10px;">
                    <el-date-picker
                      style="width:120px"
                      v-model="value1"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>
                  </td>
                  <td style="padding: 0 10px 0 10px;">
                    <region style="width:120px" v-on:back-region="selectStartCode"></region>
                  </th>
                  <td>
                    <el-date-picker
                      style="width:140px"
                      v-model="value1"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>
                  </td>
                  <td>
                    <region style="width:120px" v-on:back-region="selectStartCode"></region>
                  </td>
                  <td>
                    <el-select class="filter-item" v-model="filter.orderfilterstate" placeholder="请选择" style="width:120px;">
                      <el-option v-for="item in stateArr" :label="item.label" :value="item.value" :key="item.value">
                      </el-option>
                    </el-select>
                  </td>
                  <td>
                    <el-select class="filter-item" v-model="filter.orderfilterstate" placeholder="请选择" style="width:120px;">
                      <el-option v-for="item in stateArr" :label="item.label" :value="item.value" :key="item.value">
                      </el-option>
                    </el-select>
                  </td>
                  <td>
                    <el-input style="width:120px"></el-input>
                  </td>
                  <td>
                    <el-input auto-complete="off"></el-input>
                  </td>
                  <td>
                    <el-input auto-complete="off"></el-input>
                  </td>
                  <td>
                    <el-input auto-complete="off"></el-input>
                  </td>
                  <td>
                    <el-input auto-complete="off"></el-input>
                  </td>
                  <td>
                    <el-button icon='el-icon-upload' size="mini" @click=" dialogVisible=true" type="primary">上传图片
                    </el-button>
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- <div class="remark">
              <span class="remarkTitle">
                备注
              </span>
              <span>
                <el-input
                  type="textarea"
                  :rows="3"
                  style="width:420px"
                  placeholder="请输入内容"
                  v-model="textarea">
                </el-input>
              </span>
            </div> -->
          </div>
          <!-- <el-card class="box-card" style="width:380px;margin:10px;background:#f8f8f8;display:inline-block" v-for="(item,key) in itemList" :key=key>
            <div class="clearfix  cominfo-item">
                <span class="left-title font-gray">发生日期：</span>
                <span class="right-con">
                    <el-date-picker
                      style="width:140px"
                      v-model="value1"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>
                </span>
            </div>
            <div class="clearfix  cominfo-item">
                <span class="left-title font-gray">起点：</span>
                <span class="right-con">
                    <region style="width:140px" v-on:back-region="selectStartCode"></region>
                </span>
            </div>
            <div class="clearfix  cominfo-item">
                <span class="left-title font-gray">结束日期：</span>
                <span class="right-con">
                    <el-date-picker
                      style="width:140px"
                      v-model="value1"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>
                </span>
            </div>
            <div class="clearfix  cominfo-item">
                <span class="left-title font-gray">终点：</span>
                <span class="right-con">
                    <region style="width:140px" v-on:back-region="selectStartCode"></region>
                </span>
            </div>
            <div class="clearfix  cominfo-item">
                <span class="left-title font-gray">一级科目：</span>
                <span class="right-con">
                    <el-select class="filter-item" v-model="filter.orderfilterstate" placeholder="请选择" style="width:140px;">
                      <el-option v-for="item in stateArr" :label="item.label" :value="item.value" :key="item.value">
                      </el-option>
                    </el-select>
                </span>
            </div>
            <div class="clearfix  cominfo-item">
                <span class="left-title font-gray">二级科目：</span>
                <span class="right-con">
                    <el-select class="filter-item" v-model="filter.orderfilterstate" placeholder="请选择" style="width:140px;">
                      <el-option v-for="item in stateArr" :label="item.label" :value="item.value" :key="item.value">
                      </el-option>
                    </el-select>
                </span>
            </div>
            <div class="clearfix  cominfo-item">
                <span class="left-title font-gray">人数：</span>
                <span class="right-con">
                    <el-input auto-complete="off" style="width:140px;"></el-input>
                </span>
            </div>
            <div class="clearfix  cominfo-item">
                <span class="left-title font-gray">天数：</span>
                <span class="right-con">
                    <el-input auto-complete="off" style="width:140px;"></el-input>
                </span>
            </div>
            <div class="clearfix  cominfo-item">
                <span class="left-title font-gray">票据张数：</span>
                <span class="right-con">
                    <el-input auto-complete="off" style="width:140px;"></el-input>
                </span>
            </div>
            <div class="clearfix  cominfo-item">
                <span class="left-title font-gray">报销金额：</span>
                <span class="right-con">
                    <el-input auto-complete="off" style="width:140px;"></el-input>
                </span>
            </div>
            <div class="clearfix  cominfo-item">
                <span class="left-title font-gray">备注：</span>
                <span class="right-con">
                    <el-input type="textarea" auto-complete="off" style="width:140px;" :row="3"></el-input>
                </span>
            </div>
            <div class="clearfix  cominfo-item">
                <span class="left-title font-gray">更多操作</span>
                <span class="right-con">
                    <el-button icon='el-icon-upload' size="mini" @click=" dialogVisible=true" type="primary">上传图片
                    </el-button>
                    <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </span>
            </div>
          </el-card> -->
        </div>
        
        <div class="segment-foot">
            <el-button  type="primary" size="small" @click="add">新增</el-button>
            <el-button  type="danger"  size="small" @click="del">删除</el-button>
        </div>
    </div>
    <div class="segment statistics">
      <div class="segment-header">
            附件
        </div>
        <div class="segment-area">
          <div class="el-table__body-wrapper">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList2"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </div>
        </div>
        <el-dialog append-to-body :visible.sync="dialogVisible">
            <el-upload class="editor-slide-upload" action="https://httpbin.org/post" :multiple="true" :file-list="fileList" :show-file-list="true"
                list-type="picture-card" :on-remove="handleRemove" :on-success="handleSuccess" :before-upload="beforeUpload">
                <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </el-dialog>
    </div>
    <div class="segment statistics">
        <div class="sjb-foot-button">
            <el-button  type="primary" size="small" @click="add">新增</el-button>
            <el-button  type="danger"  size="small" @click="del">删除</el-button>
        </div>
    </div>
  </div>
</template>

<script>
import common from '@/utils/common'
import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
import { parseTime } from '@/utils'

export default {
  name: 'complexTable',
  data() {
    return {
      checkAll:false,
      namelist:[],
      num:0,
      i:-1,
      tempName:'',
      textarea:'',
      temp:[],
      tempKey:-1,
      itemList:[],
      fileList:[],
      value1:'',
      dialogVisible:false,
      certifystate:2,
      timeRange: [common.time.timestart, common.time.timeend],
      filter: {//筛选条件
          ordercreatetimestart: common.time.timestart,
          ordercreatetimeend: common.time.timeend,
          orderfilterstate:0,
          orderstate:'',
          sourceaddresscode:null,
          targetaddresscode:null,
          querykey: null,
      },
      stateArr:[
          { label: '请选择', value: 0 }, 
          { label: '常规报销', value: 1 }, 
          { label: '接待报销', value: 2 }
      ]
    }
  },
  methods:{
    selectAll(){
        if(this.checkAll){
            for(var i=0;i<this.itemList.length;i++){
                this.itemList[i].show = true;
            }
        }else{
           for(var i=0;i<this.itemList.length;i++){
                this.itemList[i].show = false;
            } 
        }
    },
    add(){
        this.i++
        this.itemList.push({id:this.i,show:false});
    },
    del(){
        // this.itemList.map((item,i) =>{
        //     if(item.show){
        //         if(i<0) i=0
        //         this.itemList.splice(i,1)
        //         i--
        //     }
        // })

        if(this.checkAll){
            this.itemList = [];
            this.checkAll = false;
            return;
        }
        // 排序缓存列表
        function compare(property) {
            (a,b) =>(a[property] - b[property])
            // return function(a,b){
            //     return a[property] - b[property]
            // }
        }
        let arr = this.temp.sort(compare('id'))
        if(arr.length>0){
            for(let k = 0;k<arr.length;k++){
                for(let j = 0; j <this.itemList.length;j++){
                    if(arr[k].id == this.itemList[j].id){
                        this.itemList.splice(j,1);
                    }
                }
            }
        }
    },
    changeInput(item){
        if(this.tempKey != item.id){
            this.tempKey = item.id
            this.temp.push(item)
        }
        console.log(this.temp)
    },
    selectStartCode(data) {
        if (data != null && data.regioncode) {
            this.filter.sourceaddresscode = data.regioncode;
        } else {
            this.filter.sourceaddresscode = '';
        }
    },
    handleRemove(file, fileList) {
        const uid = file.uid
        const objKeyArr = Object.keys(this.listObj)
        for (let i = 0, len = objKeyArr.length; i < len; i++) {
            if (this.listObj[objKeyArr[i]].uid === uid) {
            delete this.listObj[objKeyArr[i]]
            return
            }
        }
    },
    handlePreview(file) {
        console.log(file);
    },
    handleSuccess(){
        const uid = file.uid
        const objKeyArr = Object.keys(this.listObj)
        for (let i = 0, len = objKeyArr.length; i < len; i++) {
            if (this.listObj[objKeyArr[i]].uid === uid) {
            this.listObj[objKeyArr[i]].url = response.files.file
            this.listObj[objKeyArr[i]].hasSuccess = true
            return
            }
        }
    },
    handleSubmit(){
        const arr = Object.keys(this.listObj).map(v => this.listObj[v])
        if (!this.checkAllSuccess()) {
            this.$message('请等待所有图片上传成功 或 出现了网络问题，请刷新页面重新上传！')
            return
        }
        console.log(arr)
        this.listObj = {}
        this.fileList = []
        this.dialogVisible = false
    },
    beforeUpload(file) {
      const _self = this
      const _URL = window.URL || window.webkitURL
      const fileName = file.uid
      this.listObj[fileName] = {}
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = _URL.createObjectURL(file)
        img.onload = function() {
          _self.listObj[fileName] = { hasSuccess: false, uid: file.uid, width: this.width, height: this.height }
        }
        resolve(true)
      })
    },
    changeNameList(val){
        this.namelist = [];
        if(this.tempName == val) return
        if(this.num){
            this.t && clearTimeout(this.t)
            this.t = setTimeout(()=>{
                this.tempName = this.num;
                for(var i = 0;i<this.num;i++){
                    this.namelist.push({id:i,name:''})
                }
            },300)
        }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.el-input--small .el-input__inner {
    height: 40px!important;
}

.remark{
    margin-top: 25px;
    margin-bottom: 8px;
    background-color: #fdfdfd;
    border: 1px solid#F2F7FA;
}
.remarkTitle{
  margin-right: 100px;
  float: left;
  margin-top: 28px;
  margin-left: 5px
}

.upload-container{
    margin: 50px
}
.editor-slide-upload{
    margin-bottom: 15px
}
</style>