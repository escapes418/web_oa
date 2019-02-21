<template>
    <div class="sjb-container calendar-list-container ">
        <div class="filter-container">
            <div class="toolbar-item">
                <span class="item-label">客户查询：</span>
                <el-input @keyup.enter.native="handleFilter" style="width: 180px;" class="filter-item" placeholder="客户名/统一社会信用代码" v-model.trim="listQuery.conflictName">
                </el-input>
            </div>
            <div class="toolbar-item">
                <span class="item-label">客户归属：</span>
                <el-select clearable style="width: 120px" class="filter-item" v-model="listQuery.custListPlace" placeholder="请选择">
                    <el-option v-for="item in custPlaceList" :key="item.value" :label="item.name" :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="toolbar-item">
                <span class="item-label">市场负责人：</span>
                <div class="item-value" @click="dialogMarketVisible = !dialogMarketVisible">
                    <i class="el-icon-search" style="color:#bfbfbf"></i>
                    <span style="color:#606266">{{marketLeader}}</span>
                </div>
            </div>
            <div class="toolbar-item">
                <span class="item-label">所属区域：</span>
                <el-cascader style="width: 140px" 
                    class="filter-item" :options="marketList" :props="defaultProps" v-model="listQuery.custOfficeId" change-on-select placeholder="请选择所属区域">
                </el-cascader>
            </div>
            <div class="toolbar-item">
                <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
                <el-button class="filter-item" type="warning" v-waves icon="el-icon-refresh" @click="restListQuery(restCallback)">重置</el-button>
                <!-- <el-button class="filter-item" type="primary" v-waves @click="moveCust">批量移动客户</el-button>
                <el-button class="filter-item" type="primary" v-waves @click="dialogMergeVisible = true">合并客户</el-button>
                <el-button class="filter-item" type="primary" v-waves @click="freeSea">移至公海/区域公海</el-button> -->
            </div>
            <div class="toolmore-control">
                <el-button icon="el-icon-arrow-up" v-if="toolexpand" class="toolmore-control-btn" @click="toolexpand = false">收起</el-button>
                <el-button icon="el-icon-arrow-down" v-else class="toolmore-control-btn" @click="toolexpand = true">展开</el-button>
                
            </div>
            <el-collapse-transition>
                <div v-show="toolexpand" style="margin-top:8px">
                    <div class="toolbar-item">
                        <span class="item-label">时间：</span>
                        <el-date-picker v-model="listQuery.timeRange" type="daterange" class="filter-item" style="width:287px" placeholder="选择日期范围" :picker-options="pickerOptions">
                        </el-date-picker>
                    </div>
                    <div class="toolbar-item">
                        <span class="item-label">行业：</span>
                        <el-select clearable style="width: 120px" class="filter-item" v-model="listQuery.custTrades" placeholder="请选择">
                            <el-option v-for="item in custTradesList" :key="item.value" :label="item.name" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
            </el-collapse-transition>
        </div>
        <div class="filter-container">
            <div class="toolbar-item">
                <el-button v-if="ids.indexOf('inforManage-custPool-moveBtn')!==-1" class="filter-item" type="primary" v-waves @click="moveCust">批量移动客户</el-button>
                <el-button v-if="ids.indexOf('inforManage-custPool-mergeBtn')!==-1" class="filter-item" type="primary" v-waves @click="dialogMergeVisible = true">合并客户</el-button>
                <el-button v-if="ids.indexOf('inforManage-custPool-freeBtn')!==-1" class="filter-item" type="primary" v-waves @click="freeSea">移至公海/区域公海</el-button>
            </div>
        </div>
        <el-table ref="multipleTable" :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column align="center" label="客户编号">
                <template slot-scope="scope">
                    <span class="ignore-detail" style="color:#409EFF;cursor: Pointer;"  @click="handleDetail(scope.row)" :title="scope.row.custCode">{{scope.row.custCode}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="客户名称">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.custName">{{scope.row.custName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="主客户">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.mainCustName">{{scope.row.mainCustName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="统一社会信用代码">
                <template slot-scope="scope">
                    <span class="ignore-detail">{{scope.row.creditCode}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="客户级别" width="120px">
                <template slot-scope="scope">
                    <span>{{scope.row.custStageName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="规模（万元/月）" width="110px">
                <template slot-scope="scope">
                    <span>{{scope.row.custCompanySize}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="行业" width="50px">
                <template slot-scope="scope">
                    <span>{{scope.row.custTradesName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="市场负责人" width="100px">
                <template slot-scope="scope">
                    <span>{{scope.row.man}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="所属区域" width="100px">
                <template slot-scope="scope">
                    <span>{{scope.row.officeName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="客户归属" width="100px">
                <template slot-scope="scope">
                    <span>{{scope.row.custListPlaceName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="更新时间" width="140px">
                <template slot-scope="scope">
                    <span>{{scope.row.time | stamp2TextDateFull}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="100px">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="handleDetail(scope.row)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="pagination-container">
            <el-pagination background @current-change="handleCurrentChange" :current-page="pageNo" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
        <el-dialog title="合并客户" :close-on-click-modal="false" :visible.sync="dialogMergeVisible" width="35%" :before-close="mergeClose">
            <div class="merge-item">
                <span class="item-label">主客户：</span>
                <el-select 
                    filterable
                    remote 
                    style="width: 300px" 
                    class="filter-item" 
                    v-model="merge.mainCustId" 
                    placeholder="请输入主客户名称" 
                    :remote-method="searchMain">
                    <el-option v-for="item in mainCust" :key="item.custId" :label="item.custName" :value="item.custId">
                    </el-option>
                </el-select>
            </div>
            <div class="merge-item">
                <span class="item-label">子客户：</span>
                <el-select 
                    filterable
                    multiple
                    remote 
                    reserve-keyword
                    style="width: 300px" 
                    class="filter-item" 
                    v-model="merge.childCustIds" 
                    placeholder="请输入子客户名称"
                    :remote-method="searchChild">
                    <el-option v-for="item in childCust" :key="item.custId" :label="item.custName" :value="item.custId">
                    </el-option>
                </el-select>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmDialog">确认</el-button>
                <el-button @click="mergeCancel">取消</el-button>
            </span>
        </el-dialog>
        <el-dialog title="提示" :close-on-click-modal="false" :visible.sync="dialogVisible" width="25%" :before-close="dialogClose">
            <div class="merge-item">确定将客户{{mainName}}和客户{{childName}}合并？该操作成功后，将无法恢复。
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmMain">确认</el-button>
                <el-button @click="dialogCancel">取消</el-button>
            </span>
        </el-dialog>

        <el-dialog title="批量移动客户" :visible.sync="dialogMoveVisible" width="35%" :before-close="moveClose">
            <div class="move-item">
                <div>
                    已选择：
                </div>
                <span v-for="item in selectCust">
                    <span class="select-item">{{item.custName}}</span>
                </span>
            </div>
            <div class="merge-item">
                <el-checkbox v-model="marketChecked" label="市场负责人"></el-checkbox>
                <el-checkbox v-model="areaChecked" label="所属区域"></el-checkbox>
                <el-checkbox v-model="custChecked" label="客户级别"></el-checkbox>
            </div>
            <div class="move-select">
                <div class="move-item">
                    <span class="item-label">市场负责人：</span>
                    <el-select 
                        style="width: 300px" 
                        class="filter-item" 
                        v-model="marketLeaderId"
                        :disabled="!marketChecked"
                        filterable
                        placeholder="请选择市场负责人">
                        <el-option v-for="item in memberList" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="move-item">
                    <span class="item-label">所属区域：</span>
                    <el-cascader style="width: 300px" 
                        class="filter-item" :options="marketList" filterable :props="defaultProps" v-model="marketId" :disabled="!areaChecked" placeholder="请选择所属区域">
                    </el-cascader>
                </div>
                <div class="move-item">
                    <span class="item-label">客户级别：</span>
                    <el-select 
                        style="width: 300px" 
                        class="filter-item" 
                        v-model="custStage"
                        :disabled="!custChecked" 
                        placeholder="请选择客户级别">
                        <el-option v-for="item in custStageList" :key="item.value" :label="item.name" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmMove">确认</el-button>
                <el-button @click="moveCancel">取消</el-button>
            </span>
        </el-dialog>

        <el-dialog title="提示" :close-on-click-modal="false" :visible.sync="dialogFreeVisible" width="25%">
            <div class="merge-item">确定将所选客户移至公海/区域公海？
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmFree">确认</el-button>
                <el-button @click="dialogFreeVisible = false">取消</el-button>
            </span>
        </el-dialog>


        <el-dialog title="选择市场负责人" :visible.sync="dialogMarketVisible" width="25%" :center="true" @close="dialogMarketVisible = false">
            <el-input placeholder="输入关键字进行过滤" v-model="filterMarket" style="margin-bottom:10px"></el-input>
            <el-tree node-key="id" show-checkbox check-strictly :data="treeData" :props="defaultProps" @check-change="handleMarketClick" :filter-node-method="marketNode" ref="marketTree"></el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogMarketVisible = false">取消</el-button>
                <el-button type="primary" @click="selectMarket">确认</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import common from "@/utils/common";
import { getCustPool, fetchComInfoList,getMainCust,mergeCust,getMember,getMarket,moveBatchCust,openBatchCust} from "@/api/customer";
import waves from "@/directive/waves"; // 水波纹指令
import { parseTime } from "@/utils";
import { getRegion } from "@/api/getRegion";
import { toJS, fromJS, Map, List } from 'immutable';
import listQueryMix from '../../mixins/listQuery.mix'
import { mapState } from "vuex";

export default {
    name:'custPool',
    directives: {
        waves
    },
    mixins: [listQueryMix],
    computed:{
        ...mapState({
            ids:state => state.permission.ids
        }),
    },
    data() {
        return {
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            },
            toolexpand: false,
            tableKey: 0,
            list: [],
            total: null,
            loading: false,
            listLoading: false,
            pageNo: 1,
            pageSize: 20,

            dialogMarketVisible:false,
            defaultProps: {
                children: "children",
                label: "name"
            },
            treeData: [],
            filterMarket: "",
            marketData: [],
            marketLeader:'',


            listQuery: {
                custOfficeId:[],
                timeRange: [],
                custListPlace:"",
                custName: "",
                marketLeaderId: "",
                leaderName: "",
                beginTime: "",
                endTime: "",
            },
            custTradesList: [],
            custPlaceList:[],
            custStageList:[],
            dialogMoveVisible: false,
            dialogFreeVisible:false,
            dialogVisible:false,
            dialogMergeVisible:false,
            childFullCust:[],
            childCust:[],
            mainCust:[],
            merge:{
                mainCustId:"",
                childCustIds:[]
            },
            selectCust:[],
            mainName:"",
            childName:"",

            marketChecked:false,
            areaChecked:false,
            custChecked:false,
            marketLeaderId:"",
            custStage:"",
            memberList:[],
            marketList:[],
            marketId:[],
            defaultProps: {
                children: "children",
                label: "name",
                value:"id"
            },
        };
    },
    watch:{
        filterMarket(val) {
            this.$refs.marketTree.filter(val);
        }
    },
    created() {
        this.$$queryStub = this.$$listQuery;
    },
    activated() {
        this.getListData();
        this.listLoading = false;
    },
    mounted() {
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
        this.custTradesList = selectDic(dicList, "cust_trades");
        this.custPlaceList = selectDic(dicList, "cust_list_place");
        this.custStageList = selectDic(dicList, "cust_stage");

        // //人员树
        // let memberList = JSON.parse(localStorage.getItem("web_oa_member"));
        // var newArr = [];
        // common.transToTree(memberList, newArr);
        // common.mapAndAddChildren(newArr);
        // this.treeData = newArr;

        getMarket({queryType:"1"}).then(res=>{
            if(res.status == 0){
                var newArr = [];
                common.transToTree(res.data, newArr);
                // common.mapAndAddChildren(newArr);
                this.marketList = newArr
            }
        })

        getMarket({queryType:"2"}).then(res=>{
            if(res.status == 0){
                var newArr = [];
                common.transToTree(res.data, newArr);
                common.mapAndAddChildren(newArr);
                this.treeData = newArr
            }
        })
    },
    methods: {

        handleMarketClick(data,select,childSelect) {
            let index = this.marketData.indexOf(data)
            if(index<0&&this.marketData.length ===1&&select){
                this.$message({
                    message: "只能选择一个子节点作为市场负责人！",
                    type: 'warning'
                })
                this.$refs.marketTree.setChecked(data,false);
            }else if(this.marketData.length ===0&&select){
                // if(data.type =='2'&&data.status == '1'){
                if(data.type =='2'){
                    this.marketData = [];
                    this.marketData.push(data)
                }else{
                    this.$message({
                        message: "该节点不可选！",
                        type: 'warning'
                    })
                    this.$refs.marketTree.setChecked(data,false);
                    return
                }
            }else if(index>=0&&this.marketData.length===1&&!select){
                this.marketData = []
            }
        },
        marketNode(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        selectMarket() {
           if(this.marketData.length){
                this.marketLeader = this.marketData[0].name;
                this.listQuery.marketLeaderId = this.marketData[0].id;
                this.dialogMarketVisible = false;
            }else{
                this.$message({
                    message: "请选择市场负责人",
                    type: "warning"
                });
                return;
            }
        },

        handleSelectionChange(val){
            this.selectCust = val;
        },
        confirmDialog(){
            if(!this.merge.mainCustId){
                this.$message({
                    message:'请选择主客户！',
                    type:"warning"
                })
                return
            }else if(this.merge.childCustIds.length<1){
                this.$message({
                    message:'请选择子客户！',
                    type:"warning"
                })
                return
            }else if(this.merge.childCustIds.indexOf(this.merge.mainCustId)>-1){
                this.$message({
                    message:'子客户和主客户相同，请重新选择！',
                    type:"warning"
                })
                return
            }
            this.dialogVisible = true;
            this.mainCust.forEach(item=>{
                if(this.merge.mainCustId == item.custId){
                    this.mainName = item.custName
                }
            })
            let temp = [];
            console.log(this.childFullCust)
            this.childFullCust.forEach(item=>{
                this.merge.childCustIds.forEach(id=>{
                    if(item.custId == id){
                        temp.push(item.custName)
                    }
                })
            })
            let tempSet = new Set(temp)
            let arr =  Array.from(tempSet)
            this.childName = arr.join('，')
        },
        moveCust(){
            if(this.selectCust.length<1){
                this.$message({
                    message:'请选择要移动的客户！',
                    type:"warning"
                })
                return
            }
            this.dialogMoveVisible = true;
            //获取当前登陆人的部门和区域
            getMember({}).then(res=>{
                if(res.status ==0){
                    this.memberList = res.data.filter(item=>{
                        return item.userStatus == 1
                    })
                }
            })
            getMarket({queryType:"1"}).then(res=>{
                if(res.status == 0){
                    var newArr = [];
                    res.data = res.data.filter(item=>{
                        return item.status == 1
                    })
                    common.transToTree(res.data, newArr);
                    // common.mapAndAddChildren(newArr);
                    this.marketList = newArr
                }
            })
        },
        freeSea(){
            let flag = true;
            let self = this;
            if(this.selectCust.length<1){
                this.$message({
                    message:'请选择要移动的客户！',
                    type:"warning"
                })
                flag = false 
            }
            if(!custVali()){
                flag = false
            }
            function custVali(){
                self.selectCust.forEach(item=>{
                    if(item.custStage == 'A' || item.custStage =='B'|| item.custStage=='C'){
                        self.$message({
                            message:'所选客户中有已签约客户，该部分客户不可移动，请确认后再操作。',
                            type:"warning"
                        })
                        flag = false 
                        return
                    }else if(item.custListPlace == '1' || item.custListPlace == '2'){
                        self.$message({
                            message:'所选客户已为公海/区域公海客户不可再次移动。',
                            type:"warning"
                        })
                        flag = false 
                        return
                    }
                })
                return flag
            }

            if(flag){
                this.dialogFreeVisible = true;
            }
        },
        confirmFree(){
            let ids = [];
            this.selectCust.forEach(item=>{
                ids.push(item.id)
            })
            openBatchCust({
                ids:ids,
                isChange:'1'
            }).then(res=>{
                if(res.status == 0){
                    this.$message({
                        message: res.message,
                        type: "success"
                    });
                    this.dialogFreeVisible = false
            }
            setTimeout(_=>{
                window.location.reload();
            },500)
            })
        },
        searchMain(val){
            if(val !== ''){
                getMainCust({
                    custType:'1',
                    custName:val
                }).then(res=>{
                    if(res.status == 0){
                        this.mainCust = res.data
                    }
                })
            }
        },
        searchChild(val){
            if(val !== ''){
                getMainCust({
                    custType:'2',
                    custName:val
                }).then(res=>{
                    if(res.status == 0){
                        this.childCust = res.data;
                        if(res.data&&res.data.length>0){
                            this.childFullCust.push(...res.data)
                        }
                    }
                })
            }
        },
        confirmMain(){
            mergeCust({
                ...this.merge
            }).then(res=>{
                if(res.status == 0){
                    this.dialogMergeVisible = false;
                    this.$message({
                        message: res.message,
                        type: "success"
                    });
                }
                setTimeout(_=>{
                    // this.$router.go(-1)
                    window.location.reload();
                    // console.log('redere')
                },500)
                
            })
        },
        confirmMove(){
            if(this.marketChecked || this.areaChecked || this.custChecked){
                if(this.marketChecked){
                    if(!this.marketLeaderId){
                        this.$message({
                            message:'请选择当前市场责任人！',
                            type:'warning'
                        })
                        return;
                    }
                    
                    this.marketLeaderId = this.marketLeaderId;
                }else{
                    this.marketLeaderId = ""
                }
                if(this.areaChecked){
                    if(this.marketId.length<1){
                        this.$message({
                            message:'请选择所属区域！',
                            type:'warning'
                        })
                        return;
                    }
                    this.marketId[this.marketId.length-1] = this.marketId[this.marketId.length-1]
                }else(
                    this.marketId[this.marketId.length-1] = ""
                )
                if(this.custChecked){
                    if(!this.custStage){
                        this.$message({
                            message:'请选择客户级别！',
                            type:'warning'
                        })
                        return;
                    }
                    this.custStage = this.custStage
                }else{
                    this.custStage = ""
                }

                let custIds = [];
                this.selectCust.forEach(item=>{
                    custIds.push(item.id)
                })
                moveBatchCust({
                    custIds:custIds,
                    custStage:this.custStage,
                    custOfficeId:this.marketId[this.marketId.length-1],
                    marketLeaderId:this.marketLeaderId
                }).then(res=>{
                    if(res.status == 0){
                        this.dialogMoveVisible = false;
                        this.$message({
                            message: res.message,
                            type: "success"
                        });
                    }
                    setTimeout(_=>{
                        // this.$router.go(-1)
                        window.location.reload();
                        // console.log('redere')
                    },500)
                })
            }else{
                this.$message({
                    message:'请为移动客户勾选类目！',
                    type:'warning'
                })
            }
        },
        moveClose(){
            this.dialogMoveVisible = false;
            this.marketChecked=false;
            this.areaChecked=false;
            this.custChecked=false;
            this.marketLeaderId="";
            this.custStage="";
            this.marketId = [];
            // this.$refs.multipleTable.clearSelection();
        },
        moveCancel(){
            this.dialogMoveVisible = false;
            this.marketChecked=false;
            this.areaChecked=false;
            this.custChecked=false;
            this.marketLeaderId="";
            this.custStage="";
            this.marketId = [];
            // this.$refs.multipleTable.clearSelection();
        },
        mergeCancel(){
            this.merge.mainCustId = '';
            this.childCust = [];
            this.mainCust = [];
            this.merge.childCustIds = [];
            this.dialogMergeVisible = false
        },
        mergeClose(){
            this.merge.mainCustId = '';
            this.childCust = [];
            this.mainCust = [];
            this.merge.childCustIds = [];
            this.dialogMergeVisible = false
        },
        dialogCancel(){
            this.childName = "";
            this.mainName = "";
            this.dialogVisible = false;
        },
        dialogClose(){
            this.childName = "";
            this.mainName = "";
            this.dialogVisible = false;
        },
        restCallback() {
            // 用来补充默认rest不足的问题
            this.marketLeader = '';
        },
        getListData() {
            var _this = this;
            this.listLoading = true;
            var postData = this.reduceParams(this.$$queryStub);
            getCustPool({
                ...postData,
                pageNo:this.pageNo,
                pageSize:this.pageSize
            }).then(response => {
                this.list = response.data.list;
                this.total = response.data.total;
                this.listLoading = false;
            });
        },
        reduceParams($$imData) {
            if (!$$imData || $$imData.size == 0) return {};
            const $$postData = $$imData
                .set('beginTime', common.rangeObjToTimestamp($$imData.get('timeRange').toJS()).applyTimeStart)
                .set('endTime', common.rangeObjToTimestamp($$imData.get('timeRange').toJS()).applyTimeEnd)
                .delete('timeRange')
            return $$postData.toJS();
        },
        handleFilter() {
            this.pageNo = 1;
            if(!this.listQuery.timeRange){
                this.listQuery.timeRange = []
            }
            this.$$queryStub = fromJS(this.listQuery);
            this.getListData();
            this.listLoading = false;
        },
        handleCurrentChange(val) {
            this.pageNo = val;
            this.getListData();
            this.listLoading = false;
        },
        handleDetail(row) {
            this.$router.push({
                path: "/inforManage/customerDetail",
                query: { key: row.id ,type:"pool"}
            });
        },
    }
};
</script>
<style rel="stylesheet/scss" lang="scss" >
.toolbar-row {
    margin: 5px 0 0 0;
}
.merge-item{
    margin: 5px;
    
}
.move-item{
    padding: 10px;
    background: #f2f7fa;
    color: #343434;
    .item-label{
        float: left;
        width: 100px;
    }
    .filter-item{
        display: inline-block;
        margin-left: 30px
    }
}
.el-dialog__body {
    padding: 10px 20px; 
    color: #606266;
    line-height: 24px;
    font-size: 14px;
}
.item-value {
    display: inline-block;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background: white;
    padding-left: 7px;
    line-height: 30px;
    width: 190px;
}
.select-item{
    margin-right: 5px
}
.self-table-expand {
    font-size: 0;
}

.el-form--inline .el-form-item__content {
    font-size: 12px;
}
.el-form--inline .el-form-item__label {
    font-size: 12px;
    width: 90px;
    color: #99a9bf;
    float: none;
    display: inline-block;
}

.self-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}

.ignore-detail {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
    margin-top: -3px;
}
</style>

