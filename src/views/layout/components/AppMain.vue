<template>
    <section class="sjb-main">
        <transition name="fade" mode="out-in">
            <!-- <router-view :key="key"></router-view> -->
            <keep-alive :include="alivePathName">
                <router-view></router-view>
            </keep-alive>
        </transition>
    </section>
</template>

<script>
export default {
    name: 'AppMain',
    computed: {
        // key() {
        //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
        // }
    },
    data(){
        return {
            // 被缓存的列表页
            alivePathName:['doneList','todoList','custPool','customerList','reimDoc']
        }
    }
}
</script>
