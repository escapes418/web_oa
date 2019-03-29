<template>
    <div class="sjb-container calendar-list-container">
        <div class="filter-container">
            <div class="toolbar-item">
                <span class="item-label">提交人/部门：</span>
                <div class="item-value" @click="dialogDepartVisible = !dialogDepartVisible">
                    <i class="el-icon-search" style="color:#bfbfbf"></i>
                    <span style="color:#606266">{{departName}}</span>
                </div>
            </div>
            <div class="toolbar-item">
                <span class="item-label">日期：</span>
                <el-date-picker v-model="listQuery.timeRange" type="daterange" class="filter-item" style="width:287px" placeholder="选择日期范围"  :picker-options="pickerOptions">
                </el-date-picker>
            </div>

            <div class="toolbar-item">
                <span class="item-label">状态：</span>
                <el-select clearable style="width: 120px" class="filter-item" v-model="listQuery.readStatus" placeholder="请选择">
                    <el-option v-for="item in logStatuList" :key="item.value" :label="item.name" :value="item.value">
                    </el-option>
                </el-select>
            </div>

            <div class="toolbar-item">
                <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
                <el-button class="filter-item" type="warning" icon="el-icon-refresh" @click="restListQuery(restCallback)">重置</el-button>
                <el-dropdown @command=handleCreate>
                    <el-button type="primary" style="margin-left:10px">
                        新建日志<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command='1'>市场工作日志</el-dropdown-item>
                        <el-dropdown-item command='2'>实施工作日志</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-dropdown @command=handleExport>
                    <el-button type="primary" style="margin-left:10px">
                        导出Excel<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command='1'>导出市场日报</el-dropdown-item>
                        <el-dropdown-item command='2'>导出实施日报</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <template>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="看日志" name="2"></el-tab-pane>
                <el-tab-pane label="我的日志" name="1"></el-tab-pane>
            </el-tabs>
        </template>
        <el-table :data="list" border fit highlight-current-row style="width: 100%">
            <el-table-column width="120px" align="center" label="提交人">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.createByName">{{scope.row.createByName}}</span>
                </template>
            </el-table-column>
            <el-table-column label="部门" width="200px" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.dailyOfficeName}}</span>
                </template>
            </el-table-column>
            <el-table-column  align="center" label="日志模版">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.dailyTemplateName">{{scope.row.dailyTemplateName}}</span>
                </template>
            </el-table-column>
            <el-table-column width="200px" label="提交时间" align="center">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.createTime">{{scope.row.createTime | stamp2TextDateFull}}</span>
                </template>
            </el-table-column>
            
            <el-table-column  label="状态" align="center" v-if='showStatu'>
                <template slot-scope="scope">
                    <span class="ignore-detail" :class="scope.row.readStatus == 1?'red':''" :title="scope.row.readStatusName">{{scope.row.readStatusName}}</span>
                </template>
            </el-table-column>
            <el-table-column width="150px" align="center" label="操作" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="pagination-container">
            <el-pagination background  @current-change="handleCurrentChange" :current-page="pageNo" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>

        <el-dialog title="选择人员/部门" :visible.sync="dialogDepartVisible" width="25%" :center="true" @close="dialogDepartVisible = false">
            <el-input placeholder="输入关键字进行过滤" v-model="filterDepart" style="margin-bottom:10px"></el-input>
            <el-tree node-key="id" show-checkbox check-strictly :data="treeData" :props="defaultProps" @check-change="handleDepartClick" :filter-node-method="departNode" ref="departTree"></el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogDepartVisible = false">取消</el-button>
                <el-button type="primary" @click="selectDepart">确认</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { fetchList,exportFile,exportImFile } from '@/api/log';
import { QUERY_list,DATA_list,DEPART_tree,DIC_list} from "./interface";
import { Vue, Component ,Watch} from "vue-property-decorator";
import { State, Getter, Mutation, Action } from "vuex-class";
import { fromJS, Map, List } from 'immutable';
// import filter from '@/utils/filter';
import common from '@/utils/common';


import listQueryMix from '../../mixins/listQuery.mix'

@Component({
    components: {},
    mixins: [listQueryMix],
})

export default class LogList extends Vue {
    /* data */
    dialogDepartVisible:boolean = false;
    filterDepart:string ='';
    departName:string='';
    showStatu:boolean= true;
    treeData:any = [];

    departTreeData:DEPART_tree = {
        name:'',
        id:''
    };
    departData = [];
    defaultProps:object = {
        children:"children",
        label: "name"
    };
    
    logStatuList:Array<DIC_list>=[];

    activeName: string = "1";
    listQuery: QUERY_list = {
        timeRange:[],
        deptOrUserId:'',
        readStatus:''
    };
    $$queryStub:any;
    
    list: Array<DATA_list> = [];
    pageNo:number = 1;
    pageSize:number = 20;
    total:number = 0;
    pickerOptions: object = {
        disabledDate(time: any): boolean {
            return time.getTime() > Date.now();
        }
    };

    //watch
    @Watch('filterDepart')
    departFilter(val:string):void{
        //this.$refs.departTree无法获取对象属性和方法 需要重新绑定下 watch函数名无绑定意义
        //临时替代this.$refs.departTree对象
        // this.$refs.departTree.filter()
        let VM:any = this.$refs.departTree;
        VM.filter(val);
    }
    
    //store
    @State(state => state.log.queryType) queryType;
    @Action changeLog;

    /* lifecycle生命周期 */
    created():void {
        this.activeName = this.queryType;
        if(this.queryType == 1){
            this.showStatu = false;
        }
        if(this.queryType == 2){
            this.showStatu = true;
        }
        this.getList()
    };
    mounted(): void {
        let dicList = JSON.parse(localStorage.getItem("web_oa_dicList"));
        function selectDic(arr, type) {
            let temp = [];
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].type == type) {
                    temp.push(arr[i]);
                }
            }
            return temp;
        }
        this.logStatuList = selectDic(dicList,"read_status");

        let memberList = JSON.parse(localStorage.getItem("web_oa_member"));
        var newArr = [];
        common.transToTree(memberList, newArr);
        common.mapAndAddChildren(newArr);
        this.treeData = newArr;
    };

    /* methods */
    handleDepartClick(data,select,childSelect) {
        let VM:any = this.$refs.departTree;
        let index = this.departData.indexOf(data)
        if(index<0&&this.departData.length ===1&&select){
            // this.$message({
            //     message: "只能选择一个子节点作为部门/人员！",
            //     type: 'warning'
            // })

            VM.setChecked(this.departData[0],false);
            this.departData = [];
            this.departData.push(data)
        }else if(this.departData.length ===0&&select){
            if(data.status == '1'){
                this.departData = [];
                this.departData.push(data)
            }else{
                this.$message({
                    message: "该节点不可选！",
                    type: 'warning'
                })
                VM.setChecked(data,false);
                return
            }
        }else if(index>=0&&this.departData.length===1&&!select){
            this.departData = []
        };
    };
    selectDepart() {
        if(this.departData.length){
            this.departName = this.departData[0].name;
            this.listQuery.deptOrUserId = this.departData[0].id;
            this.dialogDepartVisible = false;
            // this.$refs.assignTree.setCheckedKeys([])
        }else{
            this.$message({
                message: "请选择人员/部门",
                type: "warning"
            });
            return;
        }
    }
    departNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
    }
    handleClick(val:any):void{
        if(val.name == 1){
            this.showStatu = false;
        }
        if(val.name == 2){
            this.showStatu = true;
        }
        this.changeLog(val.name)
        this.getList();
    };
    handleCreate(type:number):void{
        if(type==1){
            this.$router.push({path:'/inforManage/marketLogForm'})
        }
        if(type==2){
            this.$router.push({path:'/inforManage/impleLogForm'})
        }
    };
    handleUpdate(row):void{
        if(row.dailyTemplate == 0){
            this.$router.push({
                path:'/inforManage/imDetail',
                query: { key: row.dailyId }
            })
        }
        if(row.dailyTemplate==1){
            this.$router.push({
                path:'/inforManage/maDetail',
                query: { key: row.dailyId }
            })
        }
        
    };
    handleExport(type:number):void{
        var postData = this.reduceParams(this.$$queryStub);
        if(type == 1){
            exportFile({
                ...postData,
                queryType:this.queryType,
                dailyTemplate:type 
            }).then((res:Ajax.AjaxResponse)=>{
                if(res.status == 0){
                    var url = `./OA${res.data}`;
                    window.location.href = url;
                    this.$message({
                        message:res.message,
                        type:'success'
                    })
                }
            })
        }
        if(type == 2){
            exportImFile({
                ...postData,
                queryType:this.queryType,
                dailyTemplate:type 
            }).then((res:Ajax.AjaxResponse)=>{
                if(res.status == 0){
                    var url = `./OA${res.data}`;
                    window.location.href = url;
                    this.$message({
                        message:res.message,
                        type:'success'
                    })
                }
            })
        }
        
        
    };
    handleFilter(): void {
        this.pageNo = 1;
        if(!this.listQuery.timeRange){
            this.listQuery.timeRange = ['',''];
        }
        this.$$queryStub = fromJS(this.listQuery);
        this.getList();
    };
    handleCurrentChange(val:number): void {
        this.pageNo = val;
        this.getList();
    };
    getList(): void {
        var postData = this.reduceParams(this.$$queryStub);
        fetchList({
            ...postData,
            queryType:this.queryType,
            pageNo:this.pageNo,
            pageSize:this.pageSize
        }).then((res:Ajax.AjaxResponse)=>{
            this.list = res.data.list;
            this.total = res.data.total;
        })
    };
    reduceParams($$imData:any) {
        if (!$$imData || $$imData.size == 0) return {};
        const $$postData = $$imData
            .set('startTime', common.rangeObjToTimestamp($$imData.get('timeRange').toJS()).applyTimeStart)
            .set('endTime', common.rangeObjToTimestamp($$imData.get('timeRange').toJS()).applyTimeEnd)
            .delete('timeRange')
        return $$postData.toJS();
    };
    restCallback() {
        this.departName = '';
        // 用来补充默认rest不足的问题
    };
    
}

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.toolbar-row{
  margin: 5px 0 0 0  
}
.red{
    color: red
}
.item-value{
  display:inline-block;
  border: 1px solid #dcdfe6;
  border-radius:4px;
  background: white;
  padding-left: 7px;
  line-height: 30px;
  width: 250px
}

.ignore-detail {
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
}
</style>