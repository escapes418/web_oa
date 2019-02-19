<template>
    <el-popover placement="bottom-start" width="200" v-model="showPupup">
        <div ref="popup" class="popup">
            <el-row class="sjb-input-el-row-input-con">
                <el-input class="sjb-input-el-row-items" v-model="minValue" placeholder="min"/>
                <i class="el-icon-minus"></i>
                <el-input class="sjb-input-el-row-items" v-model="maxValue" placeholder="max"/>
            </el-row>
            <el-row class="sjb-input-el-row-button-con">
                <el-button class="sjb-input-el-row-items" v-on:click="clearPopup">Clear</el-button>
                <el-button class="sjb-input-el-row-items" type="primary" v-on:click="inputedConfirmed">OK</el-button>
            </el-row>
        </div>
        <el-input slot="reference" clearable placeholder="请选择" v-model="inputedRange">
            <i slot="suffix" class="el-input__icon el-icon-caret-bottom"></i>
        </el-input>
    </el-popover>
</template>
<script>
export default {
    props: {
        clearable: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            minValue: "",
            maxValue: "",
            inputedRange: "",
            placeholder: "请输入",
            showPupup: false,
            showClearCross: false
        };
    },
    watch: {
        inputedRange() {
            if (!this.clearable) return;
            if (this.inputedRange === "") {
                this.showClearCross = false;
            } else {
                this.showClearCross = true;
            }
        }
    },
    mounted() {},
    methods: {
        clear() {
            this.showPupup = false;
            this.clearPopup();
        },
        clearPopup() {
            this.minValue = "";
            this.maxValue = "";
            this.inputedRange = "";
        },
        inputedConfirmed() {
            this.showPupup = false;
            if (this.minValue === "") return;
            if (this.maxValue === "") return;
            this.inputedRange = this.minValue + " - " + this.maxValue;
        }
    }
};
</script>
<style scoped>
input {
  border: none;
}
.radius_border {
  border-radius: 3px;
  border: 1px solid #dcdfe6;
}
.con {
  position: relative;
  display: inline-block;
}
.sjb-input--mainInput {
  height: 40px;
  padding: 0 30px 0 20px;
  background: #fff;
  box-sizing: border-box;
}
.range_input {
  box-sizing: border-box;
  width: 40%;
  padding: 5px 10px;
}
.sjb-input--button {
  margin: 10px 10px 0 0;
  padding: 5px 10px;
  background: #fff;
}
.sjb-input--button_confirm {
  background: #646476;
  color: #fff;
}
.sjb-input-el-row-input-con {
  text-align: center;
  margin: 10px 0;
}
.sjb-input-el-row-button-con {
  display: flex;
}
.sjb-input-el-row-items {
  width: 40%;
  margin: 0 5px;
}
</style>
