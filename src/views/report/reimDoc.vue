<template>
    <div class="sjb-container calendar-list-container">
        <div class="filter-container">
            <div class="toolbar-item">
                <span class="item-label">流程编号：</span>
                <el-input @keyup.enter.native="handleFilter" style="width: 180px;" class="filter-item" placeholder="请输入流程编号" v-model.trim="listQuery.procCode">
                </el-input>
            </div>
            <div class="toolbar-item">
                <span class="item-label">时间类型：</span>
                <el-select clearable style="width: 120px" class="filter-item" v-model="listQuery.timeType" placeholder="请选择">
                    <el-option v-for="item in timeTypeList" :key="item.value" :label="item.name" :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="toolbar-item">
                <span class="item-label">申请时间：</span>
                <el-date-picker v-model="listQuery.timeRange" type="daterange" class="filter-item" style="width:287px" placeholder="选择日期范围"  :picker-options="pickerOptions">
                </el-date-picker>
            </div>
            <div class="toolbar-item">
                <span class="item-label">人员/部门：</span>
                <div class="item-value" @click="dialogDepartVisible = !dialogDepartVisible">
                    <i class="el-icon-search" style="color:#bfbfbf"></i>
                    <span style="color:#606266">{{listQuery.officeName}}</span>
                </div>
            </div>
            <div class="toolbar-item">
                <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
                <el-button class="filter-item" type="warning" icon="el-icon-delete" @click="restListQuery(restCallback)">重置</el-button>
            </div>
            <div class="toolmore-control">
                <el-button icon="el-icon-arrow-up" v-if="toolexpand" class="toolmore-control-btn" @click="toolexpand = false">收起</el-button>
                <el-button icon="el-icon-arrow-down" v-else class="toolmore-control-btn" @click="toolexpand = true">展开</el-button>
            </div>
            <el-collapse-transition>
                <div v-show="toolexpand">
                    <div class="toolbar-row">
                        
                        <div class="toolbar-item">
                            <span class="item-label">科目：</span>
                            <el-cascader :options="subsTree" v-model="listQuery.subNum" change-on-select label="value" :clearable="true">
                            </el-cascader>
                        </div>
                        <div class="toolbar-item">
                            <span class="item-label">申请状态：</span>
                            <el-select clearable style="width: 120px" class="filter-item" v-model="listQuery.expenseStatus" placeholder="请选择">
                                <el-option v-for="item in expStatuList" :key="item.value" :label="item.name" :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="toolbar-item">
                            <span class="item-label">项目名称：</span>
                            <el-select 
                                filterable
                                clearable
                                remote 
                                style="width: 220px" 
                                class="filter-item" 
                                v-model="listQuery.projectId" 
                                :remote-method="searchProject"
                                placeholder="请输入项目名称">
                                <el-option v-for="item in proDic" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="toolbar-item">
                            <span class="item-label">单据总金额：</span>
                            <el-input @keyup.enter.native="handleFilter" type="number" style="width: 180px;" class="filter-item" placeholder="请输入单据起始金额" v-model.trim="listQuery.expenseAmtStart">
                            </el-input>
                            ——
                            <el-input @keyup.enter.native="handleFilter" type="number" style="width: 180px;" class="filter-item" placeholder="请输入单据结束金额" v-model.trim="listQuery.expenseAmtEnd">
                            </el-input>
                        </div>
                    </div>
                </div>
            </el-collapse-transition>
        </div>
        
        <!-- <el-alert
            title="备注：该表单位（天）"
            class="remarkInfo"
            :closable="false"
            show-icon
            type="info">
        </el-alert> -->
        <el-table :data="list" border fit highlight-current-row style="width: 100%">
            <el-table-column align="center" label="流程编号">
                <template slot-scope="scope">
                    <span class="ignore-detail">{{scope.row.procCode}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="流程名称">
                <template slot-scope="scope">
                    <span class="ignore-detail">{{scope.row.procName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="发票所属公司">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.taxCityName">{{scope.row.taxCityName}}</span>
                </template>
            </el-table-column>
            <el-table-column label="项目名称" align="center">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.projectName">
                        {{scope.row.projectName}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column  align="center" label="提交人">
                <template slot-scope="scope">
                <span class="ignore-detail" :title="scope.row.applyPerName">{{scope.row.applyPerName}}</span>
                </template>
            </el-table-column>
            <el-table-column  label="部门" align="center">
                <template slot-scope="scope">
                <span class="ignore-detail" :title="scope.row.m4">{{scope.row.office.name}}</span>
                </template>
            </el-table-column>
            <el-table-column  label="报销时间" align="center">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.applyTime">{{scope.row.applyTime}}</span>
                </template>
            </el-table-column>
            <el-table-column  label="费用合计" align="center">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.expenseTotal">{{scope.row.expenseTotal}}</span>
                </template>
            </el-table-column>
            <el-table-column  label="审批状态" align="center">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.expenseStatusValue">{{scope.row.expenseStatusValue}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" class-name="small-padding fixed-width">
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

<script lang='ts'>
import common from '@/utils/common'
import { reimDocList ,fetchProDic,getSubjectsNew} from '@/api/report'
import { Vue, Component ,Watch} from "vue-property-decorator";
import { State, Getter, Mutation, Action } from "vuex-class";
import { fromJS, Map, List } from 'immutable';
import listQueryMix from '../../mixins/listQuery.mix'
import { QUERY_list,DEPART_tree,DIC_list,REIM_list,REIMDOC_list} from "./interface";

@Component({
    components: {},
    mixins: [listQueryMix],
})

export default class reimDoc extends Vue{
    /* data */
    dialogDepartVisible:boolean = false;
    toolexpand:boolean = false;
    filterDepart:string ='';
    departName:string='';
    treeData:any = [];
    subsTree:any = [];
    expStatuList:Array<DIC_list> = [];
    timeTypeList:Array<DIC_list> = [];
    proDic:any=[];
    departTreeData:DEPART_tree = {
        name:'',
        id:''
    };

    defaultProps:object = {
        children:"children",
        label: "name"
    };
    
    listQuery: REIM_list = {
        procCode:"",
        timeRange:[],
        officeId:'',
        officeName:'',
        projectId:'',
        expenseStatus:'',
        expenseAmtStart:'',
        expenseAmtEnd:'',
        timeType:'',
        subNum:[]
    };
    $$queryStub:any;
    
    list: Array<REIMDOC_list> = [];
    pageNo:number = 1;
    pageSize:number = 20;
    total:number = 0;
    pickerOptions: object = {
        disabledDate(time: any): boolean {
            return time.getTime() > Date.now();
        }
    };
    assignData = [];

    @Watch('filterDepart')
    departFilter(val:string):void{
        //this.$refs.departTree无法获取对象属性和方法 需要重新绑定下 watch函数名无绑定意义
        //临时替代this.$refs.departTree对象
        // this.$refs.departTree.filter()
        let VM:any = this.$refs.departTree;
        VM.filter(val);
    }

    async created() {
        let res:any = await getSubjectsNew({});
        this.subsTree = res.data.list
    }
    mounted(){
        //获取字典
        let dicList = JSON.parse(localStorage.getItem("web_oa_dicList"));
        function selectDic(arr,type){
            let temp = [];
            for(var i = 0;i<arr.length;i++){
                if(arr[i].type == type){
                    temp.push(arr[i]);
                };
            }
            return temp;
        }
        this.expStatuList = selectDic(dicList,"expense_status")
        this.timeTypeList = selectDic(dicList,"time_type")
        //部门树
        let memberList = JSON.parse(localStorage.getItem("web_oa_member"));
        var newArr = [];
        common.transToTree(memberList, newArr);
        common.mapAndAddChildren(newArr);
        this.treeData = newArr;
    }
    getList():void{
        var postData = this.reduceParams(this.$$queryStub);
        reimDocList({
            ...postData,
            pageNo:this.pageNo,
            pageSize:this.pageSize
        }).then((res:Ajax.AjaxResponse) => {
            this.list = res.data.list;
            this.total = res.data.total;
        })
    }
    reduceParams($$imData) {
        if (!$$imData || $$imData.size == 0) return {};
        const $$postData = $$imData
            .set('timeStart', common.rangeObjToTimestamp($$imData.get('timeRange').toJS()).applyTimeStart)
            .set('timeEnd', common.rangeObjToTimestamp($$imData.get('timeRange').toJS()).applyTimeEnd)
            .delete('timeRange')
        return $$postData.toJS();
    }
    handleFilter():void{
        if(!this.listQuery.timeRange){
            this.listQuery.timeRange = []
        }
        if(this.listQuery.timeRange.length==0
            &&this.listQuery.timeType == ''
            &&this.listQuery.officeId == ''
            &&this.listQuery.projectId ==''
            &&this.listQuery.expenseStatus ==''
            &&this.listQuery.expenseAmtStart == ''
            &&this.listQuery.expenseAmtEnd == ''
            &&this.listQuery.subNum.length ==0){
                this.$message({
                    message: "没有输入搜索条件无法查询!!",
                    type: "warning"
                });
                return;
        }
        if(this.listQuery.expenseAmtStart&&this.listQuery.expenseAmtEnd&&(Number(this.listQuery.expenseAmtStart)>Number(this.listQuery.expenseAmtEnd))){
            this.$message({
                message: "单据起始金额不能大于单据结束金额!!",
                type: "warning"
            });
            return
        }
        if(!this.listQuery.timeType&&this.listQuery.timeRange.length>0 || this.listQuery.timeType&&this.listQuery.timeRange.length == 0){
            this.$message({
                message: "时间类型和申请时间需配合使用!!",
                type: "warning"
            });
            return
        }
        this.$$queryStub = fromJS(this.listQuery);
        this.pageNo = 1;
        this.getList();
    }
    handleCurrentChange(val):void{
        this.pageNo = val;
        this.getList();
    }
    /* methods */
    handleDepartClick(data,select,childSelect):void{
        let VM:any = this.$refs.departTree;
        let index = this.assignData.indexOf(data)
        if(index<0&&this.assignData.length ===1&&select){
            // this.$message({
            //     message: "只能选择一个子节点作为部门/人员！",
            //     type: 'warning'
            // })

            VM.setChecked(this.assignData[0],false);
            this.assignData = [];
            this.assignData.push(data)
        }else if(this.assignData.length ===0&&select){
            // if(data.status == '1'){
                this.assignData = [];
                this.assignData.push(data)
            // }else{
            //     this.$message({
            //         message: "该节点不可选！",
            //         type: 'warning'
            //     })
            //     VM.setChecked(data,false);
            //     return
            // }
        }else if(index>=0&&this.assignData.length===1&&!select){
            this.assignData = []
        }
    };
    selectDepart():void{
        if(this.assignData.length){
            this.listQuery.officeName = this.assignData[0].name;
            this.listQuery.officeId = this.assignData[0].id;
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
    searchProject(val):void{
        if( val!==''){
            fetchProDic({
                dictType:'oa_project',
                projectName:val
            }).then((res:Ajax.AjaxResponse)=>{
                this.proDic = res.data
            })
        }
    }
    handleUpdate(row):void{
        this.$router.push({
            path:'/me/reimDetail',
            query: { key: row.id ,pathType:'report'}
        })
    }
    restCallback(){

    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.toolbar-row{
     margin: 5px 0 0 0  
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