<template>
  <div class="sjb-form-wrapper">
        <div class="segment statistics">
            <div class="segment-header">
                <span class="left-red">*</span>
                选择资产
            </div>
            <div class="segment-area">
                <div class="el-table__body-wrapper" style="padding: 15px 0;">
                    <el-table ref="multipleTable" border :data="itemList" tooltip-effect="dark" @selection-change="SelectionChange">
                        <el-table-column
                            type="selection"
                            width="35px">
                        </el-table-column>
                        <el-table-column align="center" label="资产编号">
                            <template slot-scope="scope">
                                <span class="ignore-detail">{{scope.row.code}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="资产名称">
                            <template slot-scope="scope">
                                <span class="ignore-detail">{{scope.row.name}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center"  width="130px" label="资产类别">
                            <template slot-scope="scope">
                                <span>{{scope.row.assetTypeName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" width="130px" label="规格型号">
                            <template slot-scope="scope">
                                <span>{{scope.row.specificationType}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center"  width="230px" label="放置地">
                            <template slot-scope="scope">
                                <span>{{scope.row.assetPlaceName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center"  width="130px" label="使用人">
                            <template slot-scope="scope">
                                <span>{{scope.row.usingPerson}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center"  width="230px" label="使用部门">
                            <template slot-scope="scope">
                                <span>{{scope.row.usingOffice}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center"  width="230px" label="工位">
                            <template slot-scope="scope">
                                <span>{{scope.row.usingWorkplace}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center"  width="200px" label="备注">
                            <template slot-scope="scope">
                                <span>{{scope.row.remarks}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="segment-foot">
                <el-button type="primary" size="small" @click="openDialog">添加</el-button>
                <el-button type="danger" size="small" @click="del">删除</el-button>
            </div>
        </div>
        <el-dialog title="选择资产" :visible.sync="showDialog" width="1100px" top="6vh" required="false">
            <span class="toolbar-item">
                <span class="item-label">资产名称/编号：</span>
                <el-input @keyup.enter.native="handleProFilter" style="width: 120px;" class="filter-item" placeholder="请输入" v-model.trim="listQuery.keywords">
                </el-input>
            </span>
            <span class="toolbar-item">
                <span class="item-label">资产状态：</span>
                <el-select clearable style="width: 120px" class="filter-item" v-model="listQuery.status" placeholder="请选择">
                    <el-option v-for="item in assetStatuList" :key="item.value" :label="item.name" :value="item.value">
                    </el-option>
                </el-select>
            </span>
            <span class="toolbar-item">
                <span class="item-label">使用人：</span>
                <el-input @keyup.enter.native="handleProFilter" style="width: 120px;" class="filter-item" placeholder="请输入" v-model.trim="listQuery.usingPersonName">
                </el-input>
            </span>
            <span class="toolbar-item">
                <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleProFilter">搜索</el-button>
                <el-button class="filter-item" type="warning" icon="el-icon-refresh" @click="restListQuery(restCallback)">重置</el-button>
            </span>
            <div class="dialog" style="margin-top:10px">
                <el-table :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%;" @selection-change="handleSelectionChange">
                    <el-table-column
                        type="selection"
                        width="35">
                    </el-table-column>
                    <el-table-column align="center" label="资产状态">
                        <template slot-scope="scope">
                            <span class="ignore-detail">{{scope.row.status}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="资产编号">
                        <template slot-scope="scope">
                            <span class="ignore-detail">{{scope.row.code}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="资产名称">
                        <template slot-scope="scope">
                            <span class="ignore-detail">{{scope.row.name}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center"  width="100px" label="资产类别">
                        <template slot-scope="scope">
                            <span>{{scope.row.assetTypeName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" width="100px" label="规格型号">
                        <template slot-scope="scope">
                            <span>{{scope.row.specificationType}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center"  width="100px" label="放置地">
                        <template slot-scope="scope">
                            <span>{{scope.row.assetPlaceName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center"  width="100px" label="使用人">
                        <template slot-scope="scope">
                            <span>{{scope.row.usingPerson}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center"  width="100px" label="使用部门">
                        <template slot-scope="scope">
                            <span>{{scope.row.usingOffice}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center"  width="100px" label="工位">
                        <template slot-scope="scope">
                            <span>{{scope.row.usingWorkplace}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center"  width="100px" label="备注">
                        <template slot-scope="scope">
                            <span>{{scope.row.remarks}}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <div class="pagination-container" style="margin-top:20px">
                <el-pagination background @current-change="handleCurrentChange" :current-page="pageNo" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogConfirm">确定</el-button>
                <el-button @click="showDialog = false">返回</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import common from "@/utils/common";
import { queryAssetList } from '@/api/fixedAssets'
import { fromJS, Map, List } from 'immutable';
import RedStar from "@/components/RedStar/RedStar.vue";
import listQueryMix from '@/mixins/listQuery.mix';
import { POST_data,CUST_list,MEMBER_list,POST_item} from "./interface";

import { Vue, Component } from "vue-property-decorator";

@Component({
    components: {
        RedStar: RedStar
        
    },
    mixins: [listQueryMix],
})
export default class ChooseAssets extends Vue {
    itemList:Array<POST_item>=[];
    multipleSelection:Array<POST_item>=[];
    list = [];
    showDialog= false;
    listLoading = false;

    total= null;
    name= "";
    
    ids=[];
    pageNo= 1;
    pageSize= 10;
    $$queryStub:any;
    selectItem= [];
    assetStatuList=[];
    listQuery= {
        usingPersonName:"",
        keywords:"",
        status:"",
    }

    created() {

    }
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
        this.assetStatuList = selectDic(dicList,"asset_status")
    }

    add() {
        this.showDialog= true;
    }
    del(){
        var _this = this
        var newindex = [];
        var newBox = [];
        _this.multipleSelection.forEach((value:any,idx:number)=>{
            newindex.push(value.id)
        })
        var arrBox = JSON.parse(JSON.stringify(this.itemList||[]))
        arrBox.forEach((val,num)=>{
            if(newindex.indexOf(val.id) == -1){
                newBox.push(arrBox[num])
            }
        })
        this.itemList = newBox
        this.ids = this.ids.filter(id=>{
            return newindex.indexOf(id) == -1
        })
    };
    handleSelectionChange(val) {
        this.selectItem = val;
    };
    SelectionChange(val) {
        this.multipleSelection = val
    };
    openDialog() {
        this.showDialog = true;
        this.listLoading = false;
        if(this.list.length == 0) {
            this.getList();
            this.listLoading = false;
        } else {
            this.listLoading = false;
        }
    };
    getList():void {
        this.listLoading = true;
        var postData = this.reduceParams(this.$$queryStub);
        queryAssetList({
            ...postData,
            pageNo:this.pageNo,
            pageSize:this.pageSize
        }).then((res:any) => {
            this.list = res.data.list;
            this.total = res.data.total;
            this.listLoading = false;
        });
    };
    reduceParams($$imData) {
        if (!$$imData || $$imData.size == 0) return {};
        const $$postData = $$imData
        return $$postData.toJS();
    };
    handleProFilter() {
        this.pageNo = 1;
        this.$$queryStub = fromJS(this.listQuery);
        this.getList();
        this.listLoading = false;
    };
    restCallback() {
        // 用来补充默认rest不足的问题
    };
    handleCurrentChange(val) {
        this.pageNo = val;
        this.getList();
        this.listLoading = false;
    };
    fetchData():any {
        if(this.itemList.length == 0){
            this.$message({
                message: "请选择资产",
                type: 'warning'
            })
            return
        }
        return this.itemList
    }
    dialogConfirm(){
        // for(var i=0; i<this.selectItem.length; i++){
        //     var ele = this.selectItem[i];
        //     if(this.itemList.indexOf(ele) == -1){
        //         this.itemList.push(ele);
        //     }
        // }
        this.selectItem.forEach(item=>{
            if(this.ids.indexOf(item.id) == -1){
                this.ids.push(item.id);
                this.itemList.push(item);
            }else{
                this.$message({
                    message: "选择资产有重复!",
                    type: 'warning'
                })
            }
        })

        this.showDialog = false;

    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.item-value {
    display: inline-block;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background: white;
    padding-left: 7px;
    line-height: 30px;
    width: 250px;
}
.el-input--small .el-input__inner {
    height: 40px !important;
}
.left-red {
    color: red;
    position: absolute;
    left: 15px;
}
.right-red {
    color: red;
    position: absolute;
    left: 49%;
}
.remark {
    margin-top: 25px;
    margin-bottom: 8px;
    background-color: #fdfdfd;
    border: 1px solid#F2F7FA;
}
.remarkTitle {
    margin-right: 100px;
    float: left;
    margin-top: 28px;
    margin-left: 5px;
}

.upload-container {
    margin: 50px;
}
.editor-slide-upload {
    margin-bottom: 15px;
}

.el-cascader .el-cascader--small {
    width: 250px !important;
}
</style>
<style>
.area .el-cascader {
  width: 250px !important;
}
</style>
