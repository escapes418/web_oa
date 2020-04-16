'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

/*
BASE_HOST只在dev模式有效；作为反向代理的host路径;
打包时只需要相对路径即可;
*/
module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    // BASE_API: '"http://192.168.12.4:8089/api"', // 万雄波 IP
    // BASE_API: '"http://192.168.12.37:8080/api"',// 张江浩 IP
    // BASE_APIR: '"http://192.168.12.79:8080"',//oa_黄凯
    // BASE_API:'"http://192.168.12.134:8081/api"',
    BASE_API:'"http://192.168.6.17:8087/api"',
    // BASE_API: '"http://oa.sijibao.co/api"', 
    // BASE_API:'"http://192.168.6.16:8080/api"',
    // BASE_API:'"http://192.168.12.112:8087/api"',
    // BASE_HOST_TEST: 'http://oatest.sijibao.com', // 阿里云测试
    // BASE_HOST_PROD: 'http://oa.sijibao.com', // 生产
    // BASE_API: '"./api"'
});
