const webpack = require("webpack");
const webpackDevServer = require("webpack-dev-server");
const devConfig = require("./webpack.dev.conf"); // promise对象

devConfig
    .then(configRtn => {
        configRtn.entry.app.unshift(
            "webpack-dev-server/client?http://localhost:/9528",
            "webpack/hot/dev-server"
        );
        var compiler = webpack(configRtn);
        var server = new webpackDevServer(compiler, {
            proxy: configRtn.devServer.proxy,
            quiet: true,
            // open: true,
            // compress: true
        });
        server.listen(9528);
    })
    .catch(err => {
        console.log(err);
    });
