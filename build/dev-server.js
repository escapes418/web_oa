"use strict";
require("./check-versions")();

const config = require("../config");
/* if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
} */

const opn = require("opn");
const path = require("path");
const express = require("express");
const webpack = require("webpack");
const proxyMiddleware = require("http-proxy-middleware");
const webpackConfig = require("./webpack.dev.conf");

webpackConfig
    .then(webpackConfig => {
        // default port where dev server listens for incoming traffic
        const port = process.env.PORT || config.dev.port;
        // automatically open browser, if not set will be false
        const autoOpenBrowser = !!config.dev.autoOpenBrowser;
        // Define HTTP proxies to your custom API backend
        // https://github.com/chimurai/http-proxy-middleware
        // const proxyTable = config.dev.proxyTable;
        const proxyTable = webpackConfig.devServer.proxy;

        const app = express();
        const compiler = webpack(webpackConfig);

        const devMiddleware = require("webpack-dev-middleware")(compiler, {
            publicPath: webpackConfig.output.publicPath,
            quiet: true
        });

        const hotMiddleware = require("webpack-hot-middleware")(compiler, {
            log: false,
            heartbeat: 2000
        });
        
        app.use(hotMiddleware);

        Object.keys(proxyTable).forEach(function(context) {
            let options = proxyTable[context];
            if (typeof options === "string") {
                options = {
                    target: options
                };
            }
            app.use(proxyMiddleware(options.filter || context, options));
        });

        app.use(require("connect-history-api-fallback")());

        app.use(devMiddleware);

        const staticPath = path.posix.join(
            config.dev.assetsPublicPath,
            config.dev.assetsSubDirectory
        );
        app.use(staticPath, express.static("./static"));

        const uri = "http://localhost:" + port;

        var _resolve;
        var _reject;
        var readyPromise = new Promise((resolve, reject) => {
            _resolve = resolve;
            _reject = reject;
        });

        var server;
        var portfinder = require("portfinder");
        portfinder.basePort = port;

        console.log("> Starting dev server...");
        devMiddleware.waitUntilValid(() => {
            portfinder.getPort((err, port) => {
                if (err) {
                    _reject(err);
                }
                process.env.PORT = port;
                var uri = "http://localhost:" + port;
                console.log("> Listening at " + uri + "\n");
                // when env is testing, don't need open it
                if (autoOpenBrowser) {
                    opn(uri);
                }
                server = app.listen(port);
                _resolve();
            });
        });
    })
    .catch(err => {
        console.log(err);
    });
