<template>
    <div>
        <div class="sjb-validate-title">New Password</div>
        <el-input type="password" v-on:input="validate" v-model="input" placeholder="请输入内容"></el-input>
        <div v-if="input !== ''">
            <span class="valitateBanner" v-for="item in validatedInfo" v-bind:key="item.key">
                <i :class="item.checked?'el-icon-success':'el-icon-error'">
                    <span class="valitateBanner--warn">{{item.warn}}</span>
                </i>
            </span>
        </div>
    </div>
</template>
<script>
const validation = {
    至少有一个大写字母: /[A-Z]/,
    至少有一个小写字母: /[a-z]/,
    至少有一个数字: /\d/,
    至少八个字符: /.{8,}/,
    不能包含空格: { reg: /\s/, reverse: true }
};
export default {
    data() {
        return {
            input: "",
            validatedInfo: []
        };
    },
    methods: {
        validate(value) {
            this.validatedInfo = Object.keys(validation).map((v, key) => {
                let reg = validation[v];
                let checked;
                if (!reg.reverse) {
                    checked = reg.test(value);
                } else {
                    reg = reg.reg;
                    checked = !reg.test(value);
                }
                return { checked, warn: v, key };
            });
        }
    }
};
</script>
<style scoped>
.sjb-validate-title {
  margin: 10px 0;
}
.el-icon-success {
  color: #67c23a;
}
.el-icon-error {
  color: #f56c6c;
}
.valitateBanner {
  box-sizing: border-box;
  display: inline-block;
  width: 50%;
}
.valitateBanner--warn {
  margin-left: 5px;
}
</style>


