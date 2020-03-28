<template>
    <div class="sjb-container calendar-list-container ">
        <div class="filter-container">
            <div class="toolbar-item">
                <span class="item-label">主客户查询：</span>
                <el-input @keyup.enter.native="handleFilter" style="width: 180px;" class="filter-item" placeholder="主客户名/编号" v-model.trim="listQuery.mainCustName">
                </el-input>
            </div>
            <div class="toolbar-item">
                <span class="item-label">客户查询：</span>
                <el-input @keyup.enter.native="handleFilter" style="width: 180px;" class="filter-item" placeholder="客户名/编号" v-model.trim="listQuery.custName">
                </el-input>
            </div>
            <div class="toolbar-item">
                <span class="item-label">负责人类型：</span>
                <el-select clearable style="width: 120px" class="filter-item" v-model="listQuery.leaderType" placeholder="请选择">
                    <el-option v-for="item in custTypeList" :key="item.value" :label="item.name" :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="toolbar-item">
                <span class="item-label">负责人：</span>
                <div class="item-value" @click="dialogMarketVisible = !dialogMarketVisible">
                    <i class="el-icon-search" style="color:#bfbfbf"></i>
                    <span style="color:#606266">{{leaderName}}</span>
                </div>
            </div>
            
            
            <div class="toolbar-item">
                <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
                <el-button class="filter-item" type="warning" v-waves icon="el-icon-refresh" @click="restListQuery(restCallback)">重置</el-button>
            </div>
            <div class="toolmore-control">
                <el-button icon="el-icon-arrow-up" v-if="toolexpand" class="toolmore-control-btn" @click="toolexpand = false">收起</el-button>
                <el-button icon="el-icon-arrow-down" v-else class="toolmore-control-btn" @click="toolexpand = true">展开</el-button>
                
            </div>
            <el-collapse-transition>
                <div v-show="toolexpand" style="margin-top:8px">
                    <div class="toolbar-item">
                        <span class="item-label">客户级别：</span>
                        <el-select style="width:350px" class="filter-item" multiple v-model="listQuery.custStage" placeholder="请选择客户级别">
                            <el-option v-for="item in custStageList" :key="item.value" :label="item.name" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="toolbar-item">
                        <span class="item-label">时间类型：</span>
                        <el-select style="width:130px" class="filter-item" v-model="listQuery.timeType" placeholder="请选择时间类型">
                            <el-option v-for="item in timeTypeList" :key="item.value" :label="item.name" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="toolbar-item">
                        <span class="item-label">时间：</span>
                        <el-date-picker v-model="listQuery.timeRange" type="daterange" class="filter-item" style="width:287px" placeholder="选择日期范围" :picker-options="pickerOptions">
                        </el-date-picker>
                    </div>
                    <!-- <div class="toolbar-item">
                        <span class="item-label">所属区域：</span>
                        <el-cascader style="width: 140px" 
                            class="filter-item" :options="marketFullList" :props="defaultProps" v-model="listQuery.custOfficeId" change-on-select placeholder="请选择所属区域">
                        </el-cascader>
                    </div> -->
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
                <el-button v-if="ids.indexOf('inforManage-primaryCust-editBtn')!==-1" class="filter-item" type="primary" v-waves @click="modifyCust">批量修改</el-button>
                <el-button v-if="ids.indexOf('inforManage-primaryCust-cantactBtn')!==-1" class="filter-item" type="primary" v-waves @click="showContacts">联系人变更记录</el-button>
            </div>
        </div>
        <el-table ref="multipleTable" :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column align="center" label="主客户编号">
                <template slot-scope="scope">
                    <span class="ignore-detail" style="color:#409EFF;cursor: Pointer;"  @click="handleDetail(scope.row)" :title="scope.row.custCode">{{scope.row.custCode}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="主客户">
                <template slot-scope="scope">
                    <span class="ignore-detail" :title="scope.row.mainCustName">{{scope.row.mainCustName}}</span>
                </template>
            </el-table-column>
            <!-- <el-table-column align="center" label="客户级别" width="120px">
                <template slot-scope="scope">
                    <span>{{scope.row.custStageName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="行业" width="50px">
                <template slot-scope="scope">
                    <span>{{scope.row.custTradesName}}</span>
                </template>
            </el-table-column> -->
            <!-- <el-table-column align="center" label="市场负责人" width="100px">
                <template slot-scope="scope">
                    <span>{{scope.row.man}}</span>
                </template>
            </el-table-column> -->
            <el-table-column align="center" label="商务助理" width="100px">
                <template slot-scope="scope">
                    <span>{{scope.row.businessAssistantName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="VIP客服" width="100px">
                <template slot-scope="scope">
                    <span>{{scope.row.vipCustomerName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="清结算" width="100px">
                <template slot-scope="scope">
                    <span>{{scope.row.accountLeaderName}}</span>
                </template>
            </el-table-column>
            <!-- <el-table-column align="center" label="所属区域" width="120px">
                <template slot-scope="scope">
                    <span>{{scope.row.officeName}}</span>
                </template>
            </el-table-column> -->
            <el-table-column align="center" label="首次跑单时间" width="140px">
                <template slot-scope="scope">
                    <span>{{scope.row.firstOrderTime}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="更新时间" width="150px">
                <template slot-scope="scope">
                    <span>{{scope.row.time | stamp2TextDateFull}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="vip客服最新维护时间" width="140px">
                <template slot-scope="scope">
                    <span>{{scope.row.vipUpdateTime | stamp2TextDateFull}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作"  width="320px">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="handleDetail(scope.row)">详情</el-button>
                    <el-button v-if="userInfo.name == scope.row.vipCustomerName || userInfo.name == scope.row.businessAssistantName" class="filter-item" type="primary" size="mini" @click="modifyContact(scope.row)">编辑联系人</el-button>
                    <el-button v-if="userInfo.name == scope.row.vipCustomerName" type="primary" size="mini" @click="maintain(scope.row)">维护管理</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="pagination-container">
            <el-pagination background @current-change="handleCurrentChange" :current-page="pageNo" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
        <el-dialog title="批量移动客户" :visible.sync="dialogMoveVisible" width="35%" :before-close="moveClose">
            <div class="move-item">
                <div>
                    已选择：
                </div>
                <span v-for="(item,index) in selectCust" :key="index">
                    <span class="select-item">{{item.custName}}</span>
                </span>
            </div>
            <div class="merge-item">
                <el-checkbox v-model="businessChecked" label="商务助理"></el-checkbox>
                <el-checkbox v-model="vipChecked" label="VIP客服"></el-checkbox>
                <el-checkbox v-model="accountChecked" label="清结算"></el-checkbox>
            </div>
            <div class="move-select">
                <div class="move-item">
                    <span class="item-label">商务助理：</span>
                    <el-select 
                        style="width: 300px" 
                        class="filter-item" 
                        v-model="businessAssistantId"
                        :disabled="!businessChecked"
                        filterable
                        clearable
                        placeholder="请选择商务助理">
                        <el-option v-for="item in memberList" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="move-item">
                    <span class="item-label">VIP客服：</span>
                    <el-select 
                        style="width: 300px" 
                        class="filter-item" 
                        v-model="vipCustomerId"
                        :disabled="!vipChecked"
                        filterable
                        clearable
                        placeholder="请选择VIP客服">
                        <el-option v-for="item in memberList" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="move-item">
                    <span class="item-label">清结算：</span>
                    <el-select 
                        style="width: 300px" 
                        class="filter-item" 
                        v-model="accountLeaderId"
                        :disabled="!accountChecked"
                        filterable
                        clearable
                        placeholder="请选择清结算">
                        <el-option v-for="item in memberList" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmMove">确认</el-button>
                <el-button @click="moveCancel">取消</el-button>
            </span>
        </el-dialog>


        <el-dialog title="选择负责人" :visible.sync="dialogMarketVisible" width="25%" :center="true" @close="dialogMarketVisible = false">
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
import { getMainCust,getMember,getMarket,updateCust} from "@/api/primaryCust";
import waves from "@/directive/waves"; // 水波纹指令
import { parseTime } from "@/utils";
import { getRegion } from "@/api/getRegion";
import { toJS, fromJS, Map, List } from 'immutable';
import listQueryMix from '../../mixins/listQuery.mix'
import { mapState } from "vuex";

export default {
    name:'primaryList',
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
            total: 0,
            loading: false,
            listLoading: false,
            pageNo: 1,
            pageSize: 20,

            dialogMarketVisible:false,
            treeData: [],
            filterMarket: "",
            marketData: [],
            leaderName:'',
            custTypeList:[],
            timeTypeList:[],

            listQuery: {
                isMain:"1",
                custStage:["A","B","C"],
                custTrades:"",
                custOfficeId:[],
                timeRange: [],
                mainCustName: "",
                leaderType:"",
                leader: "",
                timeType:"",
                custName:""
            },
            custTradesList: [],
            dialogMoveVisible: false,
            selectCust:[],
            custStageList:[],
            businessChecked:false,
            vipChecked:false,
            accountChecked:false,
            vipCustomerId:'',
            accountLeaderId:'',
            businessAssistantId:'',
            memberList:[],

            marketFullList:[],
            defaultProps: {
                children: "children",
                label: "name",
                value:"id"
            },
            userInfo:{},
            scrollTop:"",
        };
    },
    watch:{
        filterMarket(val) {
            this.$refs.marketTree.filter(val);
        }
    },
    created() {
        this.$$queryStub = this.$$listQuery;
        this.userInfo = JSON.parse(localStorage.getItem("web_oa_userInfor"));
    },
    activated() {
        this.getListData();
        document.documentElement.scrollTop = this.scrollTop;
        this.listLoading = false;
    },
    beforeRouteLeave (to, from, next) {
        let self = this;
        this.$nextTick(_=> {
            self.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        })
        //保存滚动条元素div的scrollTop值
        next()
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
        this.custTypeList = selectDic(dicList, "cust_leader_type");
        this.custStageList = selectDic(dicList, "cust_stage");
        this.timeTypeList = selectDic(dicList, "cust_time_type")
        //人员树
        let memberList = JSON.parse(localStorage.getItem("web_oa_member"));
        var newArr = [];
        let len = memberList.length;
        function filterResign (memberList) {
            let ids = [];
            memberList.forEach(item=>{
                ids.push(item.pId)
                if(item.userInfo.length){
                    let tem = item.userInfo;
                    // tem = tem.filter(i=>{
                    //     return i.status=="1"
                    // })
                    item.userInfo = tem;
                }
            })

            ids = Array.from(new Set(ids))
            for(var i = memberList.length - 1; i >= 0; i--){
                if(ids.indexOf(memberList[i].id)=="-1"&&memberList[i].type=="1"&&memberList[i].userInfo.length=="0"){
                    memberList.splice(i,1)
                }
            }
        }
        filterResign(memberList);
        while(len != memberList.length){
            len = memberList.length
            filterResign(memberList);
        }
        common.transToTree(memberList, newArr);
        common.mapAndAddChildren(newArr);
        this.treeData = newArr;

        getMarket({queryType:"1"}).then(res=>{
            if(res.code == 200){
                var newArr = [];
                common.transToTree(res.data, newArr);
                // common.mapAndAddChildren(newArr);
                this.marketFullList = newArr
            }
        })
    },
    methods: {

        handleMarketClick(data,select,childSelect) {
            let index = this.marketData.indexOf(data)
            if(index<0&&this.marketData.length ===1&&select){
                // this.$message({
                //     message: "只能选择一个子节点作为市场负责人！",
                //     type: 'warning'
                // })
                this.$refs.marketTree.setChecked(this.marketData[0],false);
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
            this.dialogMarketVisible = false;
            if(this.marketData.length){
                this.leaderName = this.marketData[0].name;
                this.listQuery.leader = this.marketData[0].id;
            }else{
                this.leaderName = "";
                this.listQuery.leader = "";
            }
        },

        handleSelectionChange(val){
            this.selectCust = val;
        },
        showContacts(){
            this.$router.push({
                path:'/inforManage/contactRecord',
            })
        },
        modifyContact(row){
            this.$router.push({
                path:'/inforManage/modifyPrimary',
                query:{ key : row.mainCustId }
            })
        },
        maintain(row){
            this.$router.push({
                path:'/inforManage/maintainPrimary',
                query:{ key : row.id,custName:row.custName}
            })
        },
        modifyCust(){
            if(this.selectCust.length<1){
                this.$message({
                    message:'请选择要修改的主客户！',
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
        },
        confirmMove(){
            if(this.businessChecked || this.vipChecked || this.accountChecked){
                if(this.businessChecked){
                    if(!this.businessAssistantId){
                        this.$message({
                            message:'请选择商务助理！',
                            type:'warning'
                        })
                        return
                    }
                }else{
                    this.businessAssistantId = ""
                }
                if(this.vipChecked){
                    if(!this.vipCustomerId){
                        this.$message({
                            message:'请选择VIP客服！',
                            type:'warning'
                        })
                        return
                    }
                }else{
                    this.vipCustomerId = ""
                }

                if(this.accountChecked){
                    if(!this.accountLeaderId){
                        this.$message({
                            message:'请选择清结算！',
                            type:'warning'
                        })
                        return
                    }
                }else{
                    this.accountLeaderId = ""
                }
            }
            let custIds = [];
            this.selectCust.forEach(item=>{
                custIds.push(item.id)
            })
            updateCust({
                    custIds:custIds,
                    businessAssistantId:this.businessAssistantId,
                    vipCustomerId:this.vipCustomerId,
                    accountLeaderId:this.accountLeaderId
            }).then(res=>{
                if(res.code == 200){
                    this.moveClose();
                    this.$message({
                        message: res.message,
                        type: "success"
                    });
                    this.getListData()
                }
            })
        },
        moveClose(){
            this.dialogMoveVisible = false;
            this.businessChecked=false;
            this.vipChecked=false;
            this.accountChecked=false;
            this.accountLeaderId='';
            this.businessAssistantId='';
            this.vipCustomerId='';
        },
        moveCancel(){
            this.dialogMoveVisible = false;
            this.businessChecked=false;
            this.vipChecked=false;
            this.accountChecked=false;
            this.accountLeaderId='';
            this.businessAssistantId='';
            this.vipCustomerId='';
        },
        restCallback() {
            // 用来补充默认rest不足的问题
            this.leaderName = '';
            if(this.marketData[0]){
                this.$nextTick(_=>{
                    this.$refs.marketTree.setChecked(this.marketData[0],false);
                })
            }
        },
        getListData() {
            var _this = this;
            this.listLoading = true;
            var postData = this.reduceParams(this.$$queryStub);
            getMainCust({
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
            if(!this.listQuery.leader&&this.listQuery.leaderType || this.listQuery.leader&&!this.listQuery.leaderType){
                this.$message({
                    message: "负责人类型和负责人名称需配合使用!!",
                    type: "warning"
                });
                return
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
                path: "/inforManage/primaryDetail",
                query: { key: row.id }
            });
        },
    }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
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

