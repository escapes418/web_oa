"use strict";
// Template version: 1.2.6
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require("path");
// const devEnvConfig = require("./dev.env");

//说明：dev模式 命令行执行的是node build/dev-server.js dev-server.js引用了config/index.js(本文件) 故可直接获取命令行参数
// const argv = process.argv[2];
// let target = "";
// if (argv == "test") {
//     target = devEnvConfig.BASE_HOST_TEST + "/OA";
// } else if (argv == "prod") {
//     target = devEnvConfig.BASE_HOST_PROD + "/OA";
// } else {
//     target = devEnvConfig.BASE_HOST_INNER + "/OA";
// }
// if (argv == "test") {
//     target = devEnvConfig.BASE_HOST_TEST;
// } else if (argv == "prod") {
//     target = devEnvConfig.BASE_HOST_PROD;
// } else {
//     target = devEnvConfig.BASE_HOST_INNER;
// }

module.exports = {
    dev: {
        // Paths
        assetsSubDirectory: "static",
        assetsPublicPath: "/",
        // proxyTable: {
        //     "/OA": {
        //         target,
        //         changeOrigin: true,
        //         pathRewrite: {
        //             "^/OA": ""
        //         }
        //     }
        // },

        // Various Dev Server settings
        host: "192.168.0.106", // can be overwritten by process.env.HOST
        // host: "192.168.12.97", // can be overwritten by process.env.HOST
        port: 9529, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        autoOpenBrowser: true,
        errorOverlay: true,
        notifyOnErrors: false,
        poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

        // Use Eslint Loader?
        // If true, your code will be linted during bundling and
        // linting errors and warnings will be shown in the console.
        useEslint: false,
        // If true, eslint errors and warnings will also be shown in the error overlay
        // in the browser.
        showEslintErrorsInOverlay: false,

        /**
         * Source Maps
         */

        // https://webpack.js.org/configuration/devtool/#development
        devtool: "cheap-source-map",

        // If you have problems debugging vue-files in devtools,
        // set this to false - it *may* help
        // https://vue-loader.vuejs.org/en/options.html#cachebusting
        cacheBusting: true,

        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false
    },

    build: {
        // Template for index.html
        index: path.resolve(__dirname, "../dist/index.html"),

        // Paths
        assetsRoot: path.resolve(__dirname, "../dist"),
        assetsSubDirectory: "static",

        // you can set by youself according to actual condition
        assetsPublicPath: "./",

        /**
         * Source Maps
         */

        productionSourceMap: false,
        // https://webpack.js.org/configuration/devtool/#production
        devtool: "#source-map",

        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ["js", "css"],

        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    }
};
