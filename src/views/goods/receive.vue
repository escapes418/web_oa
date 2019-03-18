<template>
    <div class="sjb-form-wrapper">
        <div class="segment statistics">
            <div class="segment-header">
                基本信息
            </div>
            <div class="segment-area">
                <base-temp>
                    <ul class="base-ul">
                        <li class="base-li">
                            <RedStar label="领用人：" :required="true">
                                <span class="right-con">
                                    <div class="item-value" @click="showUser = true">
                                        <i class="el-icon-search" style="color:#bfbfbf"></i>
                                        <span style="color:#606266">{{postData.outUserName}}</span>
                                    </div>
                                </span>
                            </RedStar>
                        </li>
                        <li class="base-li">
                            <RedStar label="领用部门：" :required="true">
                                <span class="right-con">
                                    <div class="item-value" @click="showDepart = true">
                                        <i class="el-icon-search" style="color:#bfbfbf"></i>
                                        <span style="color:#606266">{{postData.officeName}}</span>
                                    </div>
                                </span>
                            </RedStar>
                        </li>
                        <li class="base-li">
                            <RedStar label="领用日期：" :required="true">
                                <span class="right-con">
                                    <el-date-picker style="width:260px" v-model="outTime" type="date" placeholder="选择日期"></el-date-picker>
                                </span>
                            </RedStar>
                        </li>
                        <li class="base-li">
                            <RedStar label="备注：">
                                <span class="right-con">
                                    <el-input type="textarea" :rows="3" placeholder="请输入" style="width:260px;" :maxlength="1000" v-model.trim="postData.remarks"></el-input>
                                </span>
                            </RedStar>
                        </li>
                    </ul>
                </base-temp>
            </div>
        </div>
        <div class="segment statistics">
            <div class="segment-header">
                <span class="left-red">*</span>
                选择物品
            </div>
            <div class="segment-area">
                <div class="el-table__body-wrapper" style="padding: 15px 0;">
                    <table id="expenseDetails" class="table table-striped table-bordered table-condensed" style="width:100%;margin-bottom: 20px;">
                        <thead>
                            <tr class="tableTitle">
                                <td style="text-align: center;width: 20px;padding: 0 10px 0 10px;">
                                    <el-checkbox @change="selectAll"></el-checkbox>
                                </td>
                                <td class="tableTitle">物品名称</td>
                                <td class="tableTitle">物品编号</td>
                                <td class="tableTitle">物品类别</td>
                                <td class="tableTitle">单位</td>
                                <td class="tableTitle">规格型号</td>
                                <!-- <td class="tableTitle">购入日期</td> -->
                                <td class="tableTitle">放置地（必填）</td>
                                <td class="tableTitle">库存数量</td>
                                <td class="tableTitle">出库数量（必填）</td>
                                <td class="tableTitle">单价</td>
                                <td class="tableTitle">金额</td>
                                <td class="tableTitle">备注</td>
                            </tr>
                        </thead>
                        <tbody>
                            <goodItem v-for="(item,index) in itemList" style="height:50px" :key="index" :itemData="item"></goodItem>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="segment-foot">
                <el-button type="primary" size="small" @click="add">新增</el-button>
                <el-button type="danger" size="small" @click="del">删除</el-button>
            </div>
        </div>

        <el-dialog title="选择领用部门" :visible.sync="showDepart" width="25%" :center="true">
            <el-input placeholder="输入关键字进行过滤" v-model="filterName" style="margin-bottom:10px"></el-input>
            <!-- <el-tree node-key="id" :default-expanded-keys="officeId" :default-checked-keys="officeId" show-checkbox check-strictly @check-change=clickCharge :data="treeData" :props="defaultProps" :filter-node-method="filterNode" ref="tree"></el-tree> -->
            <el-tree node-key="id" show-checkbox check-strictly @check-change=clickDepart :data="departData" :props="defaultProps" :filter-node-method="filterDepart" ref="departTree"></el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showDepart = false">关闭</el-button>
                <el-button type="primary" @click="confirmDepart">确认</el-button>
            </div>
        </el-dialog>

        <el-dialog title="选择领用人" :visible.sync="showUser" width="25%" :center="true">
            <el-input placeholder="输入关键字进行过滤" v-model="filterUser" style="margin-bottom:10px"></el-input>
            <el-tree node-key="id" show-checkbox check-strictly @check-change=clickUser :data="userData" :props="defaultProps" :filter-node-method="filterPerson" ref="userTree"></el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showUser = false">关闭</el-button>
                <el-button type="primary" @click="confirmUser">确认</el-button>
            </div>
        </el-dialog>

        <el-dialog title="选择物品" :visible.sync="dialogReceive">
            <div class="filter-container" style="margin-bottom:10px">
                <div class="toolbar-item" >
                    <span class="item-label">物品编号/名称/备注：</span>
                    <el-input @keyup.enter.native="handleFilter" style="width: 220px;" class="filter-item" placeholder="物品编号/名称/备注" v-model.trim="listQuery.goodInfo">
                    </el-input>
                </div>
                <div class="toolbar-item">
                    <span class="item-label">放置地：</span>
                    <el-select clearable filterable style="width: 220px" class="filter-item" v-model="listQuery.placeId" placeholder="请选择人员类型">
                        <el-option v-for="item in placeArr" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                
                <div class="toolbar-item">
                    <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
                    <el-button class="filter-item" type="warning" icon="el-icon-delete" @click="restListQuery(restCallback)">重置</el-button>
                </div>
            </div>
            <el-table :data="list" border fit highlight-current-row style="width: 100%" @selection-change="selectReceive">
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column align="center" label="物品编号" width="100px">
                    <template slot-scope="scope">
                        <span style="color:#409EFF;cursor: Pointer;">{{scope.row.goodCode}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="100px" align="center" label="物品名称">
                    <template slot-scope="scope">
                        <span class="ignore-detail" :title="scope.row.goodName">{{scope.row.goodName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="物品类别" width="100px">
                    <template slot-scope="scope">
                        <span>{{scope.row.goodType}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="单位">
                    <template slot-scope="scope">
                        <span class="ignore-detail" :title="scope.row.goodUnit">{{scope.row.goodUnit}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="规格型号">
                    <template slot-scope="scope">
                        <span class="ignore-detail" :title="scope.row.goodSpec">{{scope.row.goodSpec}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="库存数量">
                    <template slot-scope="scope">
                        <span class="ignore-detail" :title="scope.row.goodCount">{{scope.row.goodCount}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="100px" align="center" label="单价">
                    <template slot-scope="scope">
                        <span>{{scope.row.goodPrice}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="120px" align="center" label="总金额">
                    <template slot-scope="scope">
                        <span>{{scope.row.goodTotal}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="80px" align="center" label="备注">
                    <template slot-scope="scope">
                        <span>{{scope.row.remarks}}</span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-container">
                <el-pagination background @current-change="handleCurrentChange" :current-page="pageNo" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmBtn">确认</el-button>
                <el-button @click="cancelBtn">取消</el-button>
            </span>
        </el-dialog>
        <div class="segment statistics">
            <div class="sjb-foot-button">
                <el-button type="primary" size="small" @click="submit">提交申请</el-button>
                <el-button size="small" @click="backStep">返回</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import common from '@/utils/common';
import BaseTemp from '@/components/BaseTemp';
import RedStar from '@/components/RedStar/RedStar.vue';
import goodItem from './goodItem'

import {getPlaceList,getSubjectsNew,fetchList,addReceive} from '@/api/goods';
import { mapState, mapGetters } from "vuex";
import { toJS, fromJS, Map, List } from 'immutable';
import listQueryMix from '../../mixins/listQuery.mix';
import { parseTime } from '@/utils';
import { goodReceiveVali } from './good.util';
import config from '@/utils/config';
import utils from '@/utils/utils';
export default {
    components: {
        BaseTemp,
        RedStar,
        goodItem
    },
    mixins: [listQueryMix],
    watch:{
        filterName(val) {
            this.$refs.departTree.filter(val);
        },
        filterUser(val){
            this.$refs.userTree.filter(val);
        }
    },
    data() {
        return {
            listQuery:{
                goodInfo:"",// 标题 ,
                placeId:"",// 放置地
            },
            list: [],
            total: null,
            pageNo: 1,
            pageSize: 10,
            placeArr:[],

            outTime:"",
            postData: {//提交数据
                officeName:"",
                officeId:"",
                outUserId:"",
                outUserName:"",
                outTime:"",
                remarks:""
            },


            itemList:[],
            dialogReceive:false,
            receiveList:[],

            showDepart: false,
            filterName: "",
            departData: [],
            defaultProps: {
                children: "children",
                label: "name"
            },
            chargeData:[],

            showUser:false,
            filterUser:"",
            userData:[],
            personData:[],

        }
    },
    created() {
        getPlaceList({}).then(res=>{
            this.placeArr =  res.data;
        })
    },
    mounted() {
        let departList = JSON.parse(localStorage.getItem("web_oa_depart"));
        var newArr = [];
        common.transToTree(departList, newArr);
        this.departData = newArr;

        let memberList = JSON.parse(localStorage.getItem("web_oa_member"));
        var userArr = [];
        common.transToTree(memberList, userArr);
        common.mapAndAddChildren(userArr);
        this.userData = userArr;
    },
    methods: {
        selectAll(val){
            this.itemList.map(item=>{
                item.checked = val
            })
        },
        add() {
            this.dialogReceive = true;
            this.getList()
        },
        del(){
            this.itemList = this.itemList.filter(item=>{
                return !item.checked
            })
        },
        confirmBtn(){
            if(this.receiveList.length>0){
                this.receiveList.forEach(item=>{
                    this.itemList.push({
                        consumablesId:item.id,
                        goodName:item.goodName,
                        goodCode:item.goodCode,
                        goodTypeName:item.goodTypeName,
                        goodUnit:item.goodUnit,
                        goodSpec:item.goodSpec,
                        outCount:0,
                        outPrice:item.goodPrice,
                        outTotal:0,
                        remarks:'',
                        outPlace:'',
                        placeCount:0,
                        places:item.places,
                        checked:false
                    })
                })
                this.dialogReceive = false;
            }else{
                this.$message({
                    message: "请选择相应的物品！",
                    type: "warning"
                })
            }
        },

        clickDepart(data,select,childSelect){
            let index = this.chargeData.indexOf(data)
            if(index<0&&this.chargeData.length ===1&&select){
                this.$message({
                    message: "只能选择一个子节点作为领用部门！",
                    type: 'warning'
                })
                this.$refs.departTree.setChecked(data,false);
            }else if(this.chargeData.length ===0&&select){
                if(this.type =='form'&&data.status == '0'){
                    this.$message({
                        message: "该部门节点不可选！",
                        type: 'warning'
                    })
                    this.$refs.departTree.setChecked(data,false);
                    return
                }else{
                    this.chargeData = [];
                    this.chargeData.push(data)
                }
            }else if(index>=0&&this.chargeData.length===1&&!select){
                this.chargeData = []
            }
        },
        clickUser(data,select,childSelect){
            let index = this.personData.indexOf(data)
            if(index<0&&this.personData.length ===1&&select){
                this.$message({
                    message: "只能选择一个子节点作为领用人！",
                    type: 'warning'
                })
                this.$refs.userTree.setChecked(data,false);
            }else if(this.personData.length ===0&&select){
                if(this.type =='form'&&data.status == '0'){
                    this.$message({
                        message: "该人员节点不可选！",
                        type: 'warning'
                    })
                    this.$refs.userTree.setChecked(data,false);
                    return
                }else{
                    this.personData = [];
                    this.personData.push(data)
                }
            }else if(index>=0&&this.personData.length===1&&!select){
                this.personData = []
            }
        },
        filterDepart(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        filterPerson(value, data){
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        confirmDepart() {
            if(this.chargeData.length){
                const [{id,name}] = this.chargeData;
                this.postData.officeName = name;
                this.postData.officeId = id;
                this.showDepart = false;
            }else{
                this.$message({
                    message: "请选择一个子节点作为领用人！",
                    type: 'warning'
                })
            }
        },
        confirmUser() {
            if(this.personData.length){
                const [{id,name}] = this.personData;
              
                this.postData.outUserName = name;
                this.postData.outUserId = id;
                this.showUser = false;
            }else{
                this.$message({
                    message: "请选择一个子节点作为归属部门！",
                    type: 'warning'
                })
            }
        },
        cancelBtn(){
            this.dialogReceive = false
            this.receiveList = []
        },
        handleFilter(){
            this.pageNo = 1;
            this.$$queryStub = fromJS(this.listQuery);
            this.getList()
        },
        handleCurrentChange(val){
            this.pageNo = val
            this.getList()
        },
        getList(){
            var postData = this.$$queryStub.toJS();
            fetchList({
                ...postData,
                withOutZero:0,
                pageNo:this.pageNo,
                pageSize:this.pageSize,
            }).then(response => {
                this.list = response.data.list
                this.total = response.data.total
            })
        },
        selectReceive(val) {
            this.receiveList = val;
        },
        restCallback(){

        },
        backStep() {
            this.$router.go(-1);
        },
        // 提交
        submit() {
            this.postData.outTime = common.timeParse(this.outTime)
            if(goodReceiveVali(this)){
                addReceive({
                    ...this.postData,
                    detail:this.itemList
                }).then(res=>{
                    if (res.status == 0) {
                        this.$message({
                            message: res.message,
                            type: 'success'
                        })
                        this.$router.push({path:'/publicGoods/consumList' });
                    }
                })
            }
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.base-ul{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.base-li{
    flex-basis: 50%;
    // height: 32plx;
    // display: inline-block;
    .font-gray.left-title {
        font-size: 13px;
        float: left;
        width: 150px;
        padding-right: 10px;
        color: #99a9bf;
    }
    .right-con {
        float: left;
        color: rgb(52, 52, 52);
        font-size: 13px ;
    }
}
.el-form-item--small .el-form-item__label {
    line-height: 32px;
    font-size: 14px;
    padding-right: 10px;
    color: #99a9bf;
}
.el-input--small .el-input__inner {
    height: 40px!important;
}
.left-red{
    color: red;
    // position: absolute;
    left: 50px;
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
.item-value{
    float: left;
    border: 1px solid #dcdfe6;
    border-radius:4px;
    background: white;
    padding-left: 7px;
    line-height: 30px;
    width: 260px
}
.segment .el-table__body-wrapper {
    padding: 40px 20px 35px;
}
.ignore-detail {
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
}
.upload-img{
    width: 550px;
}
.toolbar-item{
    margin-left: 10px;
    display: inline-block;
    padding-right: 15px;
    vertical-align: middle;
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
</style>
