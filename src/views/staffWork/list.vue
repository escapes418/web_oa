<template>
    <div>
        <p>new modules</p>
        <p>{{company}},{{nickName}}</p>
        <button @click="foo">click</button>
    </div>
</template>
<script lang="ts">
// 内网地址 http://localhost:9528/#/inforManage/staffWork
// vuex git地址 https://github.com/ktsn/vuex-class
/*
module path写法详见vc3-ts-demo项目
*/
import { Vue, Component } from "vue-property-decorator";
import { State, Getter, Mutation, Action } from "vuex-class";
// export default Vue.extend({});

@Component({})
export default class List extends Vue {
    /* store */
    @State("staffWork") staffWork;
    @State(state => state.staffWork) staffWork1;
    //   @Action("setName") setName;
    @Action setName;
    /* data */
    company: string = "武汉物易云通";

    /* lifecycle生命周期 */
    mounted(): void {
        console.log("this is mounted");
        console.log(this.staffWork);
        console.log(this.staffWork1);
        
    }

    /* 计算属性 */
    get nickName(): string {
        return this.company + "- 司机宝";
    }

    /* methods */
    // 箭头函数怎么写返回值？
    foo: { (): void } = () => {
        this.setName("何斌");
        console.log("this is print from foo Function!");
    };
    callFoo(): void {
        this.foo();
    }
}
</script>
<style lang="sass" scoped>

</style>


