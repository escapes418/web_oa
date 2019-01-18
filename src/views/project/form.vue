<template>
  <div class="sjb-form-wrapper">
    <div class="segment statistics">
        <div class="segment-header">
            基本信息
        </div>
        <div class="segment-area">
            <el-row>
                <el-col :span="12" class="segment-brline">
                    <RedStar label="项目编号：" v-if="showNum">
                        <span class="right-con">
                            {{projectCode}}
                        </span>
                    </RedStar>

                    <RedStar label="项目名称：" :required="true">
                        <span class="right-con">
                            <el-input placeholder="请输入" style="width:250px;" v-model="filter.projectName"></el-input>
                        </span>
                    </RedStar>
                    
                    
                    <RedStar label="客户名称：" :required="true">
                        <span class="right-con">
                            <el-select clearable class="filter-item" v-model="filter.custInfoId" placeholder="请选择" filterable style="width:250px;" >
                                <el-option v-for="item in custArr" :label="item.custName" :value="item.id" :key="item.id">
                                </el-option>
                            </el-select>
                        </span>
                    </RedStar>
                    
                    <RedStar label="市场负责人：" :required="true">
                        <span class="right-con">
                            <div class="item-value" @click="dialogMarketVisible = !dialogMarketVisible">
                                <i class="el-icon-search" style="color:#bfbfbf"></i>
                                <span style="color:#606266">{{marketLeader}}</span>
                            </div>
                        </span>
                    </RedStar>

                    <RedStar label="企业名称：" :required="false">
                        <span class="right-con">
                            <el-select 
                                filterable
                                remote 
                                multiple
                                style="width: 250px" 
                                class="filter-item" 
                                v-model="filter.holderCode" 
                                placeholder="请输入企业名称" 
                                :remote-method="searchCom">
                                <el-option v-for="item in comList" :key="item.holderCode" :label="item.companyName" :value="item.holderCode">
                                </el-option>
                            </el-select>
                        </span>
                    </RedStar>
                </el-col>
                <el-col :span="12" class="segment-brline">
                    <RedStar label="项目类型：" :required="true">
                        <span class="right-con">
                            <el-select clearable class="filter-item" v-model="filter.projectType" placeholder="请选择" style="width:250px;" >
                                <el-option v-for="item in proTypeList" :label="item.name" :value="item.value" :key="item.value">
                                </el-option>
                            </el-select>
                        </span>
                    </RedStar>
                    <Department type="form" :DId="filter.officeId" :Dvalue="depart" @on-confirm="depConfirm"></Department>
                    <RedStar label="项目负责人：" :required="true">
                        <span class="right-con">
                            <div class="item-value" @click="dialogProVisible = !dialogProVisible">
                                <i class="el-icon-search" style="color:#bfbfbf"></i>
                                <span style="color:#606266">{{proLeader}}</span>
                            </div>
                        </span>
                    </RedStar>
                   
                    <RedStar label="实施负责人：" :required="true">
                        <span class="right-con">
                            <div class="item-value" @click="dialogImpleVisible = !dialogImpleVisible">
                                <i class="el-icon-search" style="color:#bfbfbf"></i>
                                <span style="color:#606266">{{impleLeader}}</span>
                            </div>
                        </span>
                    </RedStar>
                    
                </el-col>
            </el-row>
        </div>
    </div>
    <div class="segment statistics">
        <div class="segment-header">
            备注：
        </div>
        <div class="segment-area">
            <el-input
                type="textarea"
                :rows="3"
                style="margin-top:20px;margin-bottom:20px"
                placeholder="请输入内容"
                :maxlength="300"
                v-model.trim="filter.remarks">
            </el-input>
        </div>
    </div>
    <div class="segment statistics">
        <div class="segment-header">
            实施节点
        </div>
        <div class="segment-area">
            <!-- <div class="el-table__body-wrapper" style="padding: 15px 0;">
                <el-table ref="multipleTable" border :data="itemList" tooltip-effect="dark" style="width:800px" @selection-change="handleSelectionChange">
                    <el-table-column
                        type="selection"
                        width="55px">
                    </el-table-column>
                    <el-table-column align="center" label="地点节点" width="320px">
                        <template slot-scope="scope">
                            <el-input auto-complete="off" v-model.trim="scope.row.nodeName" :maxlength="250"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="节点地址（选填）" width="400px">
                        <template slot-scope="scope">
                            <div class="map-value" @click="showMap(scope.row)">
                                <i class="el-icon-search" style="color:#bfbfbf;float:left;line-height:30px;"></i>
                                <span style="color:#606266;line-height:30px">{{scope.row.nodeAddress}}</span>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div> -->

            <div class="el-table__body-wrapper">
                <table id="expenseDetails" class="table table-striped table-bordered table-condensed" style="margin-bottom: 20px;">
                    <thead>
                        <tr class="tableTitle">
                            <td style="text-align: center;width: 20px;padding: 0 10px 0 10px;">
                                <el-checkbox @change="selectAll"></el-checkbox>
                            </td>
                            <td class="tableTitle" style="width:320px">地点节点</td>
                            <td class="tableTitle" style="width:400px">节点地址</td>
                        </tr>
                    </thead>
                    <tbody>
                        <ImplyNode v-for="(item,index) in itemList" style="height:50px" :key="index" :itemData="item"></ImplyNode>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- <el-dialog title="选择地图" :visible.sync="dialogMap" width="30%">
            <el-amap-search-box class="search-box" :on-search-result="onSearchResult"></el-amap-search-box>
            <el-amap vid="amapDemo" ref="map" :center="mapCenter" :zoom="12" class="amap-con" :events="mapEvent">
                <el-amap-marker v-for="(marker,index) in markers" :position="marker.position" :events="marker.events" :key="index"></el-amap-marker>
                <el-amap-info-window v-if="window" :position="window.position" :visible="window.visible" :content="window.content"></el-amap-info-window>
            </el-amap>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogMap = false">取消</el-button>
                <el-button type="primary" @click="selectAddress">确认</el-button>
            </div>
        </el-dialog> -->
        <div class="segment-foot">
            <el-button type="primary" size="small" @click="add">新增</el-button>
            <el-button type="danger" size="small" @click="del">删除</el-button>
        </div>
    </div>
    <el-dialog title="选择项目负责人" :visible.sync="dialogProVisible"  width="25%" :center="true" @close="closeProClick">
        <el-input placeholder="输入关键字进行过滤" v-model="filterPro" style="margin-bottom:10px"></el-input>
        <el-tree :data="treeData" :props="defaultProps" @node-click="handleProClick"  :filter-node-method="proNode" ref="proTee"></el-tree>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogProVisible = false">取消</el-button>
            <el-button type="primary" @click="selectPro">确认</el-button>
        </div>
    </el-dialog>
    <el-dialog title="选择市场负责人" :visible.sync="dialogMarketVisible" width="25%" :center="true" @close="closeMarketClick">
        <el-input placeholder="输入关键字进行过滤" v-model="filterMarket" style="margin-bottom:10px"></el-input>
        <el-tree :data="treeData" :props="defaultProps" @node-click="handleMarketClick" :filter-node-method="marketNode" ref="marketTree"></el-tree>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogMarketVisible = false">取消</el-button>
            <el-button type="primary" @click="selectMarket">确认</el-button>
        </div>
    </el-dialog>
    <el-dialog title="选择实施负责人" :visible.sync="dialogImpleVisible" width="25%" :center="true" @close="closeImpleClick">
        <el-input placeholder="输入关键字进行过滤" v-model="filterImple" style="margin-bottom:10px"></el-input>
        <el-tree :data="treeData" :props="defaultProps" @node-click="handleImpleClick" :filter-node-method="impleNode" ref="impleTree"></el-tree>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogImpleVisible = false">取消</el-button>
            <el-button type="primary" @click="selectImple">确认</el-button>
        </div>
    </el-dialog>
    <div class="segment statistics">
        <div class="sjb-foot-button">
            <el-button  type="primary" size="small" @click="saveProForm">保存</el-button>
            <el-button  size="small" @click="backStep">返回</el-button>
        </div>
    </div>
  </div>
</template>

<script>
import common from "@/utils/common";
import Department from "@/components/Department";
import ImplyNode from '@/components/ImplyNode'
import RedStar from "@/components/RedStar/RedStar.vue";
import { fetchForm, custList, savePro , getCompanyList , getContractList } from "@/api/project";
import { parseTime } from "@/utils";
import { mapState, mapGetters } from "vuex";

// import Vue from 'vue';
// import VueAMap from 'vue-amap';


// Vue.use(VueAMap);
// VueAMap.initAMapApiLoader({
//     key: 'dc6f7d81b97b1e3f13fe76a55949a503',
//     plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch','AMap.Geocoder']
// });



export default {
    components: {
        Department,
        RedStar,
        ImplyNode
    },
     computed:{
        ...mapState({
            itemList:state => state.map.itemList,
        })
    },
    data() {
        let self = this;
        return {
            showNum: false,
            dialogDepartVisible: false,
            dialogProVisible: false,
            dialogMarketVisible: false,
            dialogImpleVisible: false,
            filterDepart: "",
            filterPro: "",
            filterMarket: "",
            filterImple: "",
            proLeader: "",
            depart: "",
            marketLeader: "",
            impleLeader: "",
            departProps: {
                children: "children",
                label: "name"
            },
            defaultProps: {
                children: "children",
                label: "name"
            },
            treeData: [],
            proTypeList: [],
            proStateList: [],
            departTreeList: [],
            // itemList: [],
            projectCode: "",
            multipleSelection:[],
            filter: {
                //筛选条件
                id: null,
                custInfoId: "",
                officeId: "",
                impleLeaderId: "",
                marketLeaderId: "",
                projectLeaderId: "",
                projectType: "",
                projectName: "",
                remarks: "",
                holderCode:[]
            },
            custArr: [],
            proTreeData: {},
            marketTreeData: {},
            impTreeData: {},
            comList:[],

            // dialogMap:false,
            // mapCenter:[114.42158, 30.4549],
            // mapEvent:{
            //     init:(o)=>{}
            // },
            // markers: [],
            // windows: [],
            // window: '',
            // position:{},
            // tempId:''
            tempList:[]
        };
    },
    watch: {
        filterDepart(val) {
            this.$refs.departTree.filter(val);
        },
        filterPro(val) {
            this.$refs.proTee.filter(val);
        },
        filterMarket(val) {
            this.$refs.marketTree.filter(val);
        },
        filterImple(val) {
            this.$refs.impleTree.filter(val);
        }
    },
    created() {
        this.$store.dispatch('clearList');
        if (this.$route.query.key) {
            this.showNum = true;
            fetchForm({
                id: this.$route.query.key
            }).then(res => {
                this.filter.id = res.data.id;
                this.filter.custInfoId= res.data.custInfoId;
                this.filter.officeId= res.data.officeId;
                this.filter.impleLeaderId= res.data.impleLeaderId;
                this.filter.marketLeaderId= res.data.marketLeaderId;
                this.filter.projectLeaderId = res.data.projectLeaderId;
                this.filter.projectType= res.data.projectType;
                this.filter.projectName= res.data.projectName;
                this.filter.remarks= res.data.remarks;
                res.data.mainCompany = res.data.mainCompany || [];
                this.comList = res.data.mainCompany;
                res.data.mainCompany.forEach(item=>{
                    this.filter.holderCode.push(item.holderCode)
                })
                this.projectCode = res.data.projectCode;
                this.depart = res.data.officeName;
                this.marketLeader = res.data.marketLeaderName;
                this.impleLeader = res.data.impleLeaderName;
                this.proLeader = res.data.projectLeaderName;

                res.data.projectNodeDetailResponse = res.data.projectNodeDetailResponse || [];
                this.$store.dispatch('fillItemList', res.data.projectNodeDetailResponse);
                // this.itemList = res.data.projectNodeDetailResponse;
                
            });
        }
        //获取客户列表
        custList({}).then(res => {
            this.custArr = res.data;
        });
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
        this.proTypeList = selectDic(dicList, "project_type");
        this.proStateList = selectDic(dicList, "project_state");

        //部门树

        let departList = JSON.parse(localStorage.getItem("web_oa_depart"));
        var newDepart = [];
        common.transToTree(departList, newDepart);
        this.departTreeList = newDepart;

        //人员树
        let memberList = JSON.parse(localStorage.getItem("web_oa_member"));
        var newArr = [];
        common.transToTree(memberList, newArr);
        common.mapAndAddChildren(newArr);
        this.treeData = newArr;
    },
    methods: {
        selectAll(val) {
            this.$store.dispatch('fillItemListChecked', val);
        },
        add() {
            this.$store.dispatch("addItem");
        },
        del() {
            let flag = true;
            let temp = JSON.parse(JSON.stringify(this.itemList))
            temp.some(item=>{
                if(item.nodeId&&item.checked == true){
                    this.$message({
                        message: "不能删除已保存的地址节点！",
                        type: "warning"
                    })
                    flag = false;
                    return true;
                }
            })
            if(flag){
                this.$store.dispatch('delItemListChecked');
            }
            
        },
        // showMap(row){
        //     this.dialogMap = true;
        //     this.tempId = row.index;
        //     this.mapEvent.init()
        // },
        // onSearchResult(pois){
        //     let latSum = 0;
        //     let lngSum = 0;
        //     let self = this;
        //     let windows = [];
        //     if (pois.length > 0) {
        //         pois.forEach((poi,index) => {
        //             let {lng, lat} = poi;
        //             lngSum += lng;
        //             latSum += lat;
        //             this.markers.push({
        //                 position:[poi.lng, poi.lat],
        //                 events:{
        //                     async click(){
        //                         self.windows.forEach(window => {
        //                             window.visible = false;
        //                         });
        //                         self.window = self.windows[index];
        //                         self.$nextTick(() => {
        //                             self.window.visible = true;
        //                         });
        //                         let res = await self.getAddress([poi.lng, poi.lat]);
        //                         poi.formattedAddress = res.regeocode.formattedAddress;
        //                         self.position = poi;
        //                     }
        //                 }
        //             });
        //             windows.push({
        //                 position: [poi.lng, poi.lat],
        //                 content: `<div class="prompt">${ poi.name }</div>`,
        //                 visible: false
        //             });
        //             this.windows = windows;
        //             let center = {
        //                 lng: lngSum / pois.length,
        //                 lat: latSum / pois.length
        //             };
        //             this.mapCenter = [center.lng, center.lat];
        //         })
        //     }
        // },
        // selectAddress(){
        //     this.itemList.forEach(item=>{
        //         if(item.index == this.tempId){
        //             item.nodeAddress = this.position.formattedAddress;
        //             item.lat = this.position.lat;
        //             item.lng = this.position.lng;
        //         }
        //     })
            
        //     // console.log(map)
        //     // this.$refs.map.$$getInstance().destroy();
        //     this.dialogMap = false;
        // },
        // getAddress(lnglat){
        //     return new Promise((resolve,reject)=>{
        //         var geocoder = new AMap.Geocoder()  
        //         geocoder.getAddress(lnglat, function(status, result) {
        //             if (status === 'complete' && result.info === 'OK') {
        //                 // result为对应的地理位置详细信
        //                 resolve(result)
        //             }
        //         })
        //     })
        // },
        searchCom(val){
            if(val !== ''){
                getCompanyList({
                    pageNo: 1,
                    pageSize: 20,
                    companyName:val
                }).then(res=>{
                    if(res.status == 0){
                        this.comList = res.data.list
                    }
                })
            }
        },
       
        proNode(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        marketNode(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        impleNode(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        depConfirm(data) {
            // console.log(data)
            this.depart = data.name;
            this.filter.officeId = data.id;
        },
        handleProClick(data) {
            this.proTreeData = data;
        },
        closeProClick() {
            if (this.proTreeData.userInfo) {
                //有userInfo说明选中的是公司
                this.proLeader = "";
                this.filter.projectLeaderId = "";
                this.$message({
                    message: "请选择负责人而不是部门",
                    type: "warning"
                });
            }
        },
        handleMarketClick(data) {
            this.marketTreeData = data;
        },
        closeMarketClick() {
            if (this.marketTreeData.userInfo) {
                //有userInfo说明选中的是公司
                this.marketLeader = "";
                this.filter.marketLeaderId = "";
                this.$message({
                    message: "请选择负责人而不是部门",
                    type: "warning"
                });
            }
        },
        handleImpleClick(data) {
            this.impTreeData = data;
        },
        closeImpleClick() {
            if (this.impTreeData.userInfo) {
                //有userInfo说明选中的是公司
                this.impleLeader = "";
                this.filter.impleLeaderId = "";
                this.$message({
                    message: "请选择负责人而不是部门",
                    type: "warning"
                });
            }
        },
        backStep() {
            this.$router.push({
                path: "/inforManage/projectList"
            });
        },
        selectPro() {
            this.proLeader = this.proTreeData.name;
            this.filter.projectLeaderId = this.proTreeData.id;
            if (this.proLeader == "") {
                this.$message({
                    message: "请选择项目负责人",
                    type: "warning"
                });
                return;
            }
            this.dialogProVisible = false;
        },
        selectMarket() {
            this.marketLeader = this.marketTreeData.name;
            this.filter.marketLeaderId = this.marketTreeData.id;
            if (this.marketLeader == "") {
                this.$message({
                    message: "请选择市场负责人",
                    type: "warning"
                });
                return;
            }

            this.dialogMarketVisible = false;
        },
        selectImple() {
            this.impleLeader = this.impTreeData.name;
            this.filter.impleLeaderId = this.impTreeData.id;
            if (this.impleLeader == "") {
                this.$message({
                    message: "请选择实施负责人",
                    type: "warning"
                });
                return;
            }
            this.dialogImpleVisible = false;
        },
        saveProForm() {
            if (!this.filter.projectName) {
                this.$message({
                    message: "请填写项目名称",
                    type: "warning"
                });
                return;
            }
            if (!this.filter.projectType) {
                this.$message({
                    message: "请选择项目类别",
                    type: "warning"
                });
                return;
            }
            if (!this.filter.officeId) {
                this.$message({
                    message: "请选择归属部门",
                    type: "warning"
                });
                return;
            }
            if (!this.filter.custInfoId) {
                this.$message({
                    message: "请选择客户名称",
                    type: "warning"
                });
                return;
            }
            if (!this.filter.impleLeaderId) {
                this.$message({
                    message: "请选择实施负责人",
                    type: "warning"
                });
                return;
            }
            if (!this.filter.projectLeaderId) {
                this.$message({
                    message: "请选择项目负责人",
                    type: "warning"
                });
                return;
            }
            if (!this.filter.marketLeaderId) {
                this.$message({
                    message: "请选择市场负责人",
                    type: "warning"
                });
                return;
            }
            var flag = true

            if(this.itemList.length>0){
                this.itemList.forEach(item=>{
                    if(!item.nodeName&&!item.nodeAddress){
                        flag  = false
                        this.$message({
                            message: "请填写地点节点或选择节点地址！",
                            type: "warning"
                        });
                        return;
                    }
                }) 
            }
            
            if(flag){
                savePro({
                    ...this.filter,
                    projectNodeReqs:this.itemList
                }).then(res => {
                    this.$message({
                        message: res.message,
                        type: "success"
                    });
                    this.$router.push({
                        path: "/inforManage/projectList"
                    });
                });
            }
        
        },
        // handleSelectionChange(val) {
        //     this.multipleSelection = val;
        // },
        // add() {
        //     this.itemList.push({ index: new Date().getTime(),nodeName:'',nodeAddress:'',lat:'',lng:''});
        // },
        // del(){
        //     var _this = this
        //     var newindex = [];
        //     var newBox = [];
        //     var flag = true
        //     _this.multipleSelection.forEach((value,idx)=>{
        //         if(!value.index)  {
        //             flag = false
        //         }
        //         newindex.push(value.index)
        //     })
        //     if(flag){
        //         var arrBox = JSON.parse(JSON.stringify(this.itemList||[]))
        //         arrBox.forEach((val,num)=>{
        //             if(newindex.indexOf(val.index) == -1){
        //                 newBox.push(arrBox[num])
        //             }
        //         })
        //         this.itemList = newBox
        //     }else{
        //         this.$message({
        //             message: "不能删除已保存的地址节点！",
        //             type: "warning"
        //         })
        //     }
            
        // },
    }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.amap-con{
    margin-top: 10px;
    height:450px
}
.item-value {
    display: inline-block;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background: white;
    padding-left: 7px;
    line-height: 30px;
    width: 250px;
    overflow:hidden;
}
.map-value {
    margin-top: 6px;
    display: inline-block;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background: white;
    padding-left: 7px;
    width: 350px;
    overflow:hidden;
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
.toolbar-item{
    margin-left: 10px
}
.item-label{
    color: #616367;
    font-size: 12px;
}
</style>