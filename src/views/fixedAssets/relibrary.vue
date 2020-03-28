<template>
  <div class="sjb-form-wrapper">
        <div class="segment statistics">
            <div class="segment-header">
                基本信息
            </div>
            <div class="segment-area">
                <el-row>
                    <el-col :span="12" class="segment-brline">
                        <RedStar label="放置地："
                            :required="true">
                            <span class="right-con long_area">
                                <el-select clearable class="filter-item" v-model="postData.assetPlaceId" placeholder="请选择" style="width:250px;">
                                    <el-option v-for="item in assetPlaceList" :label="item.name" :value="item.id" :key="item.id">
                                    </el-option>
                                </el-select>
                            </span>
                        </RedStar>
                        <RedStar label="备注：">
                            <span class="right-con">
                                <sjbtextarea placeholder="请输入"
                                textStyle="width:250px;"
                                :rows="3"
                                :max="200"
                                v-model.trim="postData.remarks"></sjbtextarea>
                            </span>
                        </RedStar>
                        
                    </el-col>
                    <el-col :span="12" class="segment-brline">
                        <RedStar label="退库时间："
                            :required="true">
                            <span class="right-con">
                                <el-date-picker v-model="outTime" class="filter-item" style="width:250px" placeholder="请选择日期">
                                </el-date-picker>
                            </span>
                        </RedStar>
                    </el-col>
                </el-row>
            </div>
        </div>
        <ChooseAssets ref="chooseAssets"></ChooseAssets>
        <div class="segment statistics">
            <div class="sjb-foot-button">
                <el-button type="primary"
                size="small"
                @click="submit">提交</el-button>
                <el-button size="small"
                @click="backStep">返回</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import common from "@/utils/common";
import { queryAssetTypeTree,pickOrTransferAsset,saveAssetOut,queryAssetPlaceList} from '@/api/fixedAssets'
import Utils from "./util";
import RedStar from "@/components/RedStar/RedStar.vue";
import ChooseAssets from "@/components/ChooseAssets/index.vue";
import sjbtextarea from '@/components/sjbTextarea/index.vue';
import { POST_data,CUST_list,MEMBER_list,POST_item,RB_postData} from "./interface";

import { Vue, Component, Watch } from "vue-property-decorator";

@Component({
    components: {
        RedStar: RedStar,
        ChooseAssets,
        sjbtextarea
    }
})
export default class maForm extends Vue {
    assetType = [];
    assetPlaceList = [];
    postData:RB_postData = {
        assetCode: [],
        assetPlaceId: "",
        outTime: 0,
        remarks: ""
    };
    outTime = "";

    created() {
        this.getAssetPlaceList();

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
    }
    backStep(): void {
        this.$router.go(-1);
    };
    submit(): void {
        let CA:any = this.$refs.chooseAssets;
        var list = CA.fetchData()
        this.postData.assetCode = []
        list.forEach((item,index)=>{
            this.postData.assetCode.push(item.id)
        })
        this.postData.outTime = common.timeParse(this.outTime)
        if (Utils.relibrary(this)){
            saveAssetOut({
                ...this.postData
            }).then((res: Ajax.AjaxResponse) => {
                if (res.code == 200) {
                    this.$message({
                        message: res.message,
                        type: "success"
                    });
                    this.$router.go(-1);
                } 
            });
        }
    };
    getAssetPlaceList(){
        queryAssetPlaceList().then((res:any) => {
            this.assetPlaceList = res.data;
        })
    };
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
