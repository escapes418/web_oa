import Vue from 'vue';

import 'normalize.css/normalize.css'; // A modern alternative to CSS resets

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import '@/styles/index.scss'; // global css
// import '@/icons/iconfont.css'  // 自定义字体图标

import App from './App.vue';
import router from './router/index';
import store from './store/index';

import '@/interceptors'; // permission control

import region from '@/components/Region/region.vue';
Vue.component('region', region);


// 2.导入main.js(在vue实例之前)
import filters from '@/utils/filter';
//3.循环注册过滤器
Object.keys(filters).forEach(key=>{
    Vue.filter(key,filters[key])
})

/*
ts报错：Expected 1 arguments, but got 2
Vue.component('region', function(resolve) {
    require(['@/components/Region/region.vue'], resolve);
});
*/

Vue.use(ElementUI, { size: 'small' });

Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
});

// 文档地址：https://panjiachen.github.io/vue-element-admin-site/#/zh-cn/README
