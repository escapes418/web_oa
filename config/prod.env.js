'use strict';
module.exports = {
    NODE_ENV: '"production"',
    //BASE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"',
    //BASE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"', // 正式接口配置
    // BASE_API: '"http://120.31.131.193:8104/OA/f"'
    // BASE_API: '"../OA/f"', // ==== 193配置/阿里云配置 ==== 通过域名访问
    BASE_API: '"./api"' // ==== 生产配置 ====  通过域名访问
};
