<template>
    <div class="sjb-container calendar-list-container">
        <div class="filter-container">
            <div class="toolbar-item">
                <span class="item-label">选择日期：</span>
                <el-date-picker
                    v-model="listQuery.date"
                    type="date"
                    :clearable="false"
                    :picker-options="pickerOptions"
                    placeholder="选择日期">
                </el-date-picker>
            </div>
            <div class="toolbar-item">
                <span class="item-label">功能名称：</span>
                <el-input @keyup.enter.native="handleFilter" style="width: 180px;" class="filter-item" placeholder="请输入功能名称" v-model.trim="listQuery.functionName">
                </el-input>
            </div>
            <div class="toolbar-item">
                <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
                <el-button class="filter-item" type="warning" icon="el-icon-delete" @click="restListQuery(restCallback)">重置</el-button>
            </div>
            <div class="toolmore-control">
                <div class="toolbar-item">
                    <el-dropdown @command=handleExport>
                        <el-button type="primary" style="margin-left:10px">
                            导出Excel<i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command='1'>导出周报表</el-dropdown-item>
                            <el-dropdown-item command='2'>导出具体报表</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </div>
        
        <el-alert
            title="备注：该报表单位（次）"
            class="remarkInfo"
            :closable="false"
            show-icon
            type="info">
        </el-alert>
        <el-table :data="list" border fit highlight-current-row style="width: 100%" @cell-click="showDetail">
            <el-table-column align="center" label="功能">
                <template slot-scope="scope">
                    <span class="ignore-detail">{{scope.row.functionName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="产品端">
                <template slot-scope="scope">
                    <span class="ignore-detail">{{scope.row.terminalName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" :label="'周一('+ entity.mondayStr+')'">
                <template slot-scope="scope">
                    <span class="ignore-detail" style="color:#409EFF;cursor: Pointer;" :title="scope.row.mondayNum">{{scope.row.mondayNum}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" :label="'周二('+entity.tuesdayStr+')'">
                <template slot-scope="scope">
                    <span class="ignore-detail" style="color:#409EFF;cursor: Pointer;" :title="scope.row.tuesdayNum">{{scope.row.tuesdayNum}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" :label="'周三('+entity.wednesdayStr+')'">
                <template slot-scope="scope">
                    <span class="ignore-detail" style="color:#409EFF;cursor: Pointer;" :title="scope.row.wednesdayNum">{{scope.row.wednesdayNum}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" :label="'周四('+entity.thursdayStr+')'">
                <template slot-scope="scope">
                    <span class="ignore-detail" style="color:#409EFF;cursor: Pointer;" :title="scope.row.thursdayNum">{{scope.row.thursdayNum}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" :label="'周五('+entity.fridayStr+')'">
                <template slot-scope="scope">
                    <span class="ignore-detail" style="color:#409EFF;cursor: Pointer;" :title="scope.row.fridayNum">{{scope.row.fridayNum}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" :label="'周六('+entity.saturdayStr+')'">
                <template slot-scope="scope">
                    <span class="ignore-detail" style="color:#409EFF;cursor: Pointer;" :title="scope.row.saturdayNum">{{scope.row.saturdayNum}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" :label="'周日('+entity.sundayStr+')'">
                <template slot-scope="scope">
                    <span class="ignore-detail" style="color:#409EFF;cursor: Pointer;" :title="scope.row.sundayNum">{{scope.row.sundayNum}}</span>
                </template>
            </el-table-column>
        </el-table>

        <div class="pagination-container">
            <el-pagination background  @current-change="handleCurrentChange" :current-page="pageNo" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>

        <el-dialog :title="personName +'当月项目中统计'" :visible.sync="dialogVisible">
            <span class="toolbar-item">
                <span class="item-label">姓名：</span>
                <el-input @keyup.enter.native="handleDeFilter" style="width: 120px;" class="filter-item" placeholder="请输入姓名" v-model.trim="userName">
                </el-input>
            </span>
            <span class="toolbar-item">
                <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleDeFilter">搜索</el-button>
            </span>
            <div class="dialog" style="margin-top:10px">
                <el-table :data="detailList" border fit highlight-current-row style="width: 100%;">
                    <el-table-column align="center" label="功能">
                        <template slot-scope="scope">
                            <span class="ignore-detail" :title="scope.row.functionName">{{scope.row.functionName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="产品端">
                        <template slot-scope="scope">
                            <span class="ignore-detail" :title="scope.row.terminalName">
                                {{scope.row.terminalName}}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="日期">
                        <template slot-scope="scope">
                            <span>{{scope.row.date}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="使用次数">
                        <template slot-scope="scope">
                            <span>{{scope.row.num}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="使用人">
                        <template slot-scope="scope">
                            <span>{{scope.row.userName}}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <div class="pagination-container" style="margin-top:20px">
                <el-pagination background @current-change="detailCurrentChange" :current-page="detailPageNo" :page-size="detailPageSize" layout="total, prev, pager, next, jumper" :total="detailTotal">
                </el-pagination>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">返回</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script lang='ts'>
import { funcUseList,funcUseDetail,downFuncUseFile } from '@/api/report';
import { QUERY_list,ENTITY_list,FUNCUSE_list,DETAIL_list} from "./interface";
import { Vue, Component ,Watch} from "vue-property-decorator";
import { State, Getter, Mutation, Action } from "vuex-class";
import { fromJS, Map, List } from 'immutable';
import common from '@/utils/common';


import listQueryMix from '../../mixins/listQuery.mix'

@Component({
    components: {},
    mixins: [listQueryMix],
})

export default class FuntionList extends Vue {
    /* data */
    listQuery:QUERY_list = {
        date:'',
        functionName:''
    }
    entity:ENTITY_list = {
        fridayStr:'',
        mondayStr:'',
        saturdayStr:'',
        sundayStr:'',
        thursdayStr:'',
        tuesdayStr:'',
        wednesdayStr:''
    };
    personName:string='';
    todayStamp:number = common.time.currentMonNowDayStamp;
    $$queryStub:any;
    command:number = 1;

    list: Array<FUNCUSE_list> = [];
    pageNo:number = 1;
    pageSize:number = 20;
    total:number = 0;

    dialogVisible:boolean = false;
    pickerOptions: object = {
        disabledDate(time: any): boolean {
            return time.getTime() > Date.now();
        }
    };

    detailList:Array<DETAIL_list> = [];
    date:string ="";
    userName:string='';
    functionCode:string ="";
    terminalCode:string = "";
    detailPageNo:number = 1;
    detailPageSize:number=10;
    detailTotal:number = 0;
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
        console.log(this.todayStamp)
        this.getList()
    };
    mounted(): void {
        
    };

    /* methods */
    showDetail(row, column, cell, event):void{
        this.userName = ''
        if(column.label.match(/\((.+)\)/)&&column.label.match(/\((.+)\)/)[1]){
            this.dialogVisible = true;
            this.functionCode = row.functionCode;
            this.terminalCode = row.terminalCode;
            this.date = column.label.match(/\((.+)\)/)[1];
            this.getDetail()
        }
        // console.log(row, column, cell, event)
    };
    handleUpdate(row):void{
        
    };
    handleExport(type:number):void{
        var postData = this.reduceParams(this.$$queryStub);
        downFuncUseFile({
            ...postData,
            exportContent:type 
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
        
    };
    handleFilter(): void {
        this.pageNo = 1;
        this.$$queryStub = fromJS(this.listQuery);
        this.getList();
    };
    handleDeFilter():void{
        this.getDetail();
    };
    handleCurrentChange(val:number): void {
        this.pageNo = val;
        this.getList();
    };
    detailCurrentChange(val:number):void{
        this.detailPageNo = val;
        this.getDetail();
    };
    getList(): void {
        var postData = this.reduceParams(this.$$queryStub);
        funcUseList({
            ...postData,
            pageNo:this.pageNo,
            pageSize:this.pageSize
        }).then((res:Ajax.AjaxResponse)=>{
            this.entity = res.data.entity
            this.list = res.data.list;
            this.total = res.data.total;
        })
    };
    getDetail():void{
        funcUseDetail({
            date: this.date,
            functionCode: this.functionCode,
            terminalCode: this.terminalCode,
            userName: this.userName,
            pageNo:this.pageNo,
            pageSize:this.pageSize
        }).then((res:Ajax.AjaxResponse)=>{
            this.detailList = res.data.list;
            this.detailTotal = res.data.total;
        })
    }
    reduceParams($$imData:any) {
        if (!$$imData || $$imData.size == 0) return {};
            const $$postData = $$imData
                .set('date', common.timeParse($$imData.get('date')))
            return $$postData.toJS();
    };
    restCallback() {
        
        // 用来补充默认rest不足的问题
    };
    exportFile(){

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