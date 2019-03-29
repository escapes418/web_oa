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
                            <RedStar label="入库日期：" :required="true">
                                <span class="right-con">
                                    <el-date-picker style="width:260px" v-model="inTime" type="date" placeholder="选择日期" :picker-options="pickerOptions"></el-date-picker>
                                </span>
                            </RedStar>
                        </li>
                        <li class="base-li">
                            <RedStar label="放置地：" :required="true">
                                <span class="right-con">
                                    <el-select clearable class="filter-item ignore-detail" filterable v-model="postData.putinPlace" placeholder="请选择标签名称" style="width:260px;">
                                        <el-option v-for="item in placeArr" :label="item.name" :value="item.id" :key="item.id">
                                        </el-option>
                                    </el-select>
                                </span>
                            </RedStar>
                        </li>
                        <li class="base-li">
                            <RedStar label="金额：" :required="true">
                                <span class="right-con">
                                    {{putinTotal.toFixed(2)}}
                                </span>
                            </RedStar>
                        </li>
                        <li class="base-li">
                            <RedStar label="备注：">
                                <span class="right-con">
                                    <sjbtextarea :rows="3" placeholder="请输入" textStyle="width:260px;" :max="1000" v-model.trim="postData.remarks"></sjbtextarea>
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
                                <td class="tableTitle">购入日期（必填）</td>
                                <!-- <td class="tableTitle">放置地（必填）</td> -->
                                <!-- <td class="tableTitle">库存数量</td> -->
                                <td class="tableTitle">入库数量（必填）</td>
                                <td class="tableTitle">单价（必填）</td>
                                <td class="tableTitle">金额</td>
                                <td class="tableTitle">备注</td>
                            </tr>
                        </thead>
                        <tbody>
                            <stockItem v-for="(item,index) in itemList" style="height:50px" :key="index" :itemData="item"></stockItem>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="segment-foot">
                <el-button type="primary" size="small" @click="add">新增</el-button>
                <el-button type="danger" size="small" @click="del">删除</el-button>
            </div>
        </div>

        <el-dialog title="选择物品" :visible.sync="dialogStock">
            <div class="filter-container" style="margin-bottom:10px">
                <div class="toolbar-item" >
                    <span class="item-label">物品编号/名称/备注：</span>
                    <el-input @keyup.enter.native="handleFilter" style="width: 220px;" class="filter-item" placeholder="物品编号/名称/备注" v-model.trim="listQuery.goodInfo">
                    </el-input>
                </div>
                <div class="toolbar-item">
                    <span class="item-label">放置地：</span>
                    <el-select clearable filterable style="width: 220px" class="filter-item" v-model="listQuery.placeId" placeholder="请选择放置地">
                        <el-option v-for="item in placeArr" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                
                <div class="toolbar-item">
                    <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
                    <el-button class="filter-item" type="warning" icon="el-icon-delete" @click="restListQuery(restCallback)">重置</el-button>
                </div>
            </div>
            <el-table :data="list" border fit highlight-current-row style="width: 100%" @selection-change="selectStock">
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
                        <span>{{scope.row.goodTypeName}}</span>
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
                <el-table-column align="center" label="总库存数量">
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
                        <span class="ignore-detail" :title="scope.row.remarks">{{scope.row.remarks}}</span>
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
                <el-button type="primary" size="small" @click="submit">提交</el-button>
                <el-button size="small" @click="backStep">返回</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import common from '@/utils/common';
import BaseTemp from '@/components/BaseTemp';
import RedStar from '@/components/RedStar/RedStar.vue';
import stockItem from './stockItem'
import sjbtextarea from '@/components/sjbTextarea/index.vue';

import {getPlaceList,getSubjectsNew,fetchList,addStore, consumDetail} from '@/api/goods';
import { mapState, mapGetters } from "vuex";
import { toJS, fromJS, Map, List } from 'immutable';

import { parseTime } from '@/utils';
import { goodStockVali } from './good.util';
import config from '@/utils/config';
import utils from '@/utils/utils';
import listQueryMix from '../../mixins/listQuery.mix';
export default {
    mixins: [listQueryMix],
    components: {
        BaseTemp,
        RedStar,
        stockItem,
        sjbtextarea
    },
    watch:{

    },
    data() {
        return {
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            },
            listQuery:{
                goodInfo:"",// 标题 ,
                placeId:"",// 放置地
            },
            list: [],
            total: null,
            pageNo: 1,
            pageSize: 10,

            subsTree:[],
            placeArr:[],
            postData: {//提交数据
                putinTotal:"",
                remarks:"",
                inTime :"",
                // putinTotal:0,
                // detail:[]
            },
            inTime:"",

            itemList:[],
            dialogStock:false,
            stockList:[]
        }
    },
    async created() {
        getPlaceList({}).then(res=>{
            this.placeArr =  res.data;
        })
    },
    computed: {
       putinTotal:function(){
            let total = 0; 
            this.itemList.forEach(item=>{
                total += Number(item.inTotal)
            })
            return total
       }
    },
    mounted() {
        
    },
    methods: {
        selectAll(val){
            this.itemList.map(item=>{
                item.checked = val
            })
        },
        add() {
            this.dialogStock = true;
            this.$$queryStub = this.$$listQuery;
            this.getList()
        },
        del(){
            this.itemList = this.itemList.filter(item=>{
                return !item.checked
            })
        },
        confirmBtn(){
            if(this.stockList.length>0){
                this.stockList.forEach(item=>{
                    this.itemList.push({
                        consumablesId:item.id,
                        goodName:item.goodName,
                        goodCode:item.goodCode,
                        goodTypeName:item.goodTypeName,
                        goodUnit:item.goodUnit,
                        goodSpec:item.goodSpec,
                        buyTime:'',
                        inCount:0,
                        inPrice:0,
                        inTotal:0,
                        remarks:'',
                        checked:false
                    })
                })
                this.dialogStock = false;
            }else{
                this.$message({
                    message: "请选择相应的物品！",
                    type: "warning"
                })
            }
        },
        cancelBtn(){
            this.dialogStock = false
            this.stockList = []
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
        restCallback(){

        },
        getList(){
            var postData = this.$$queryStub.toJS();
            fetchList({
                ...postData,
                pageNo:this.pageNo,
                pageSize:this.pageSize,
            }).then(response => {
                this.list = response.data.list
                this.total = response.data.total
            })
        },
        selectStock(val) {
            this.stockList = val;
        },
        backStep() {
            this.$router.go(-1);
        },
        // 提交
        submit() {
            this.postData.inTime = common.timeParse(this.inTime);
            this.itemList.map(item=>{
                return{
                    ...item,
                    buyTime:common.timeParse(item.buyTime)
                }
            })
            if(goodStockVali(this)){
                addStore({
                    ...this.postData,
                    detail:this.itemList,
                    putinTotal:this.putinTotal
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
