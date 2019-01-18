<template>
    <div class="el-table__body-wrapper">
        <table id="expenseDetails" class="table table-striped table-bordered table-condensed">
            <thead>
                <tr class="tableTitle">
                    <td style="text-align: center;width: 20px;padding: 0 10px 0 10px;">
                        <el-checkbox @change="selectAll"></el-checkbox>
                    </td>
                    <td class="tableTitle">指派对象</td>
                    <td class="tableTitle">满足数量</td>
                    <td class="tableTitle">意见</td>

                </tr>
            </thead>
            <tbody>
                <tr v-for="(el,idx) in assignData" :key="idx">
                    <td>
                        <el-checkbox v-model="el.checked"></el-checkbox>
                    </td>
                    <td>
                        <el-select clearable class="filter-item ignore-detail" filterable v-model="el.targetAssign" placeholder="请选择" style="width:100%;">
                            <el-option v-for="(item,index) in memberList" :label="item.name" :value="item.id" :key="index">
                            </el-option>
                        </el-select>
                    </td>
                    <td>
                        <el-input v-model="el.personelNum" @change="changePerNumber" type="number"></el-input>
                    </td>
                    <td>
                        <el-input v-model="el.remarks" type="textarea" :rows="1" autosize :maxlength="300"></el-input>
                    </td>
                </tr>
            </tbody>
        </table>
        <div style="margin-top:20px;">
            <el-button type="primary" @click="addItem">添加</el-button>
            <el-button type="danger" @click="delSelected">删除选中</el-button>
        </div>
    </div>

</template>

<script>
import { mapState, mapGetters } from "vuex";
import { upLoadIm } from '@/api/reim'
// import { fetchProList, expApply, expSave, getDetail, fetchThemeList, fetchMember } from '@/api/reim'
import { queryHandleEmployeeList} from '@/api/resHandle'//WEB端资源办理-查询指派人员信息
export default {
    props: {
        itemData: Array
    },
    data() {
        return {
            memberList: [],
            assignData: [
                {
                    checked: false,
                    targetAssign: "",
                    personelNum: "",
                    remarks: ""
                }
            ],
        }
    },
    computed: {
        ISEDIT() {
            if (this.itemData.length > 0) {
                console.log(this.itemData)
                return true;
            } else {
                return false;
            }
        }
    },
    async created() {
        this.$store.dispatch('changeperNum', 0);
        var memberResponse = await queryHandleEmployeeList({});
        this.memberList = memberResponse.data;
        if (this.itemData.length > 0) {
            // this.assignData = Object.assign({}, this.itemData);
            this.assignData = []
            this.itemData.forEach((item,index)=>{
                this.assignData.push({
                    checked: false,
                    targetAssign: item.targetAssign,
                    personelNum: item.personelNum,
                    remarks: item.remarks
                })
            })
        }
    },
    methods: {
        addItem() {
            var itemObj = {
                checked: false,
                targetAssign: "",
                personelNum: "",
                remarks: ""
            };
            this.assignData.push(itemObj);
        },
        delSelected() {
            var afterDelArr = this.assignData.filter((item, idx, array) => {
                if (item.checked == false) return true;
            })
            this.assignData = afterDelArr;
        },
        selectAll(val) {
            if (val == true) {
                this.assignData.forEach(el => {
                    if (el.checked == false) el.checked = true;
                })
            } else {
                this.assignData.forEach(el => {
                    if (el.checked == true) el.checked = false;
                })
            }
        },
        changePerNumber(){
            var num = 0;
            var afterFilterEmptyArr = this.assignData.filter((el, idx, array) => {
                if ( el.personelNum) {
                    return true;
                }
            })
            afterFilterEmptyArr.forEach((item,idx)=>{
                num += Number(item.personelNum)
            })
            this.$store.dispatch('changeperNum', num);
        },
        // 校验及组件数据返回，通过ref方式调用
        componentValiAndReturn() {
            var flag = true;
            var afterFilterEmptyArr = this.assignData.filter((el, idx, array) => {
                if (el.targetAssign || el.personelNum || el.remarks) {
                    return true;
                }
            })
            afterFilterEmptyArr.map((el, idx, array) => {
                if (!el.targetAssign || !el.personelNum ) {
                    this.$message({
                        message:"指派信息不能为空",
                        type: "warning"
                    });
                    flag = false;
                }
            })
            for (var itm = 0; itm < afterFilterEmptyArr.length; itm++){//联系人不能重复
                for (var i = 0; i < afterFilterEmptyArr.length; i++){
                    if(afterFilterEmptyArr[itm].targetAssign == afterFilterEmptyArr[i].targetAssign && i != itm){
                        this.$message({
                            message: "不得重复指派",
                            type: "warning"
                        });
                        flag = false;
                    }
                }
            }
            return {
                flag,
                afterFilterEmptyArr
            }
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss">
    #expenseDetails{
        td{
            padding: 10px 10px;
        }
    }
</style>
