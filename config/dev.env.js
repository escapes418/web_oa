'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

/*
BASE_HOST只在dev模式有效；作为反向代理的host路径;
打包时只需要相对路径即可;
*/
module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    // BASE_HOST_INNER: 'http://192.168.12.101:8089', // 万雄波 IP
    // BASE_HOST_INNER: 'http://192.168.27.127:8080',// 张江浩 IP
    // BASE_HOST_INNER: 'http://192.168.12.137:8080',//oa_黄凯
    BASE_HOST_INNER: 'http://oatest.sijibao.com', 
    BASE_HOST_TEST: 'http://oatest.sijibao.com', // 阿里云测试
    BASE_HOST_PROD: 'http://oa.sijibao.com', // 生产
    BASE_API: '"./OA/f"'
});
