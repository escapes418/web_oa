<template>
    <el-popover placement="bottom-start" :width="showRightPopup?460:230" v-model="visible2">
        <div ref="popup" class="popup radius_border">
            <div class="sjb-cascader--popup--child">
                <div class="sjb-cascader--pupup--head">{{titles[0]}}</div>
                <div v-on:click="chooseFather(item.id)"
                    class="sjb-cascader--pupup--row"
                    v-bind:class="{'sjb-cascader--pupup--row_highlight':item.id === currentSelectedItem.father}"
                    v-for="item in fatherList"
                    v-bind:key="item.id">
                    <span class="sjb-cascader-pupup--row_title">{{item.name}}</span>
                    <span class="sjb-cascader--pupup--row--figure" v-if="howManyMyChildrenBeenSelected(item.id)">{{howManyMyChildrenBeenSelected(item.id)}}</span>
                    <i class="el-icon-arrow-right"></i>
                </div>
            </div>
            <div v-bind:class="{popup_show:showRightPopup}" class="sjb-cascader--popup--child sjb-cascader--popup--child_right radius_border">
                <div class="sjb-cascader--pupup--head">
                    <span>{{titles[1]}}</span>
                    <span
                        v-on:click="selectAll"
                        class="sjb-cascader--pupup--textbutton"
                    >{{allSelected?'全不选':'全选'}}</span>
                </div>
                <div
                    v-on:click="chooseChild(item.id)"
                    v-for="item in childList"
                    v-bind:key="item.id"
                    class="sjb-cascader--pupup--row"
                    v-bind:class="{'sjb-cascader--pupup--row_highlight':currentSelectedItem.child.includes(item.id)}">
                    {{item.name}}
                    <i v-if="currentSelectedItem.child.includes(item.id)" class="el-icon-check el-icon-check_blue"></i>
                </div>
            </div>
        </div>

        <div slot="reference" class="sjb-cascader-maininput">
            <el-input clearable v-on:clear="reset" placeholder="请选择" v-model="inputedValue">
                <i slot="suffix" class="el-input__icon el-icon-caret-bottom"></i>
            </el-input>
            <el-button v-on:click.stop="filter" type="primary">filter</el-button>
            <el-button v-on:click.stop="reset" type="success">reset</el-button>
        </div>
    </el-popover>
</template>
<script>
export default {
    props: {
        listData: Array,
        titles: {
            tyle: Array,
            default() {
                return ["BRANCHES", "TERMINALS"];
            }
        }
    },
    data() {
        return {
            visible2: false,
            currentSelectedItem: {
                father: "",
                child: []
            },
            fatherList: [],
            childList: [],
            inputedValue: "",
            placeholder: "请输入",
            showRightPopup: false
        };
    },
    computed: {
        allSelected() {
            return (this.childList.filter(v =>this.currentSelectedItem.child.includes(v.id)
                ).length === this.childList.length
            );
        }
    },
    mounted() {
        this.handleRawData();
    },
    methods: {
        handleRawData() {
            let data = this.listData;
            let result = (this.handledListData = {});
            data.forEach(item => {
                const { parentid } = item;
                if (result[parentid] == null) result[parentid] = [];
                result[parentid].push(item);
            });
            this.fatherList = result[0];
        },
        chooseFather: (function() {
            let last;
            return function(which) {
                this.currentSelectedItem.father = which;
                if (which === last && this.showRightPopup) {
                    this.showRightPopup = false;
                    return;
                }
                this.showRightPopup = true;

                this.childList = this.handledListData[which];
                last = which;
            };
        })(),
        chooseChild(which) {
            const arr = this.currentSelectedItem.child;
            if (arr.includes(which)) {
                arr.splice(arr.indexOf(which), 1);
            } else {
                arr.push(which);
            }
            this.getMaininputValue();
        },
        howManyMyChildrenBeenSelected(my) {
            return this.handledListData[my].filter(v =>
                this.currentSelectedItem.child.includes(v.id)
            ).length;
        },
        getSelectResult() {
            let result = {};
            this.fatherList.forEach(v => {
                const { id } = v;
                const fatherBeenselected = this.howManyMyChildrenBeenSelected(id) > 0;
                if (fatherBeenselected) {
                    result[id] = this.handledListData[id].filter(item =>
                        this.currentSelectedItem.child.includes(item.id)
                    );
                }
            });
            this.selectedResult = result;
        },
        getMaininputValue() {
            this.getSelectResult();
            const howManyFathers = Object.keys(this.selectedResult).length;
            const howManyChildren = this.currentSelectedItem.child.length;
            if (howManyFathers + howManyChildren === 0) {
                this.inputedValue = "";
            } else {
                this.inputedValue = `${howManyFathers} ${
                this.titles[0]
                }, ${howManyChildren} ${this.titles[1]}`;
            }
        },
        selectAll() {
            const arr = this.currentSelectedItem.child;
            if (this.allSelected) {
                /* 全不选 */
                this.childList.forEach(v => {
                    if (arr.includes(v.id)) {
                        arr.splice(arr.indexOf(v.id), 1);
                    }
                });
            } else {
                /* 全选 */
                this.childList.forEach(v => {
                    if (!arr.includes(v.id)) {
                        arr.push(v.id);
                    }
                });
            }
            this.getMaininputValue();
        },
        filter() {

        },
        reset() {
            this.currentSelectedItem.child = [];
            this.getMaininputValue();
        }
    }
};
</script>
<style scoped>
.sjb-cascader-maininput {
  display: flex;
  /* width: 650px; */
}
.popup {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}

.sjb-cascader--popup--child {
  box-sizing: border-box;
  padding: 10px;
  flex: 1;
}
.sjb-cascader--popup--child_right {
  display: none;
}
.sjb-cascader--pupup--head {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ececec;
  font-weight: lighter;
  font-size: 0.8em;
  padding-bottom: 5px;
}
.sjb-cascader--pupup--textbutton {
  color: #0976ed;
  cursor: pointer;
}
.sjb-cascader--pupup--row {
  display: flex;
  justify-content: space-between;
  margin: 5px -5px;
  padding: 5px;
  border-radius: 3px;
  cursor: pointer;
}
.sjb-cascader-pupup--row_title {
  flex: 1;
}
.sjb-cascader--pupup--row_highlight {
  background: #ececec;
}
.sjb-cascader--pupup--row--figure {
  text-align: center;
  padding: 1px 8px;
  margin-right: 10px;
  background: #0976ed;
  border-radius: 35%/50%;
  color: #fff;
  font-size: 0.8em;
}
.el-icon-check_blue {
  color: #0976ed;
  font-weight: bolder;
}
.popup_show {
  display: block;
}
</style>


