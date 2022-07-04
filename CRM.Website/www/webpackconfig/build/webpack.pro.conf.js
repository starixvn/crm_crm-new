const merge = require('webpack-merge');
const utils = require('./utils');
const baseWebpackConfigGenerator = require('./webpack.base.conf');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const pathConfig = require('../config/path');

module.exports = (env) => {
    const baseConfigs = baseWebpackConfigGenerator(env);
    const cssRootPath = `www/dist/${pathConfig.cssPaths.build}/build`;
    const jsRootPath = `www/dist/${pathConfig.scriptPaths.build}/build`;

    return merge(baseConfigs,
        utils.setDefinePlugin('process.env.NODE_ENV', 'production'),
        {
            mode: 'production',
            watch: false,
            devtool: false,
            performance: {
                maxEntrypointSize: 512000,
                maxAssetSize: 512000
            },
            plugins: [
                new CleanWebpackPlugin([`${jsRootPath}/`], {
                    root: process.cwd()
                }),
                new CleanWebpackPlugin([`${cssRootPath}/*.css`, `${cssRootPath}/*.map`, `${cssRootPath}/*.js`], {
                    root: process.cwd()
                }),
                new CleanWebpackPlugin([`${cssRootPath}/pages/*/*.css`, `${cssRootPath}/pages/*/*.js`, `${cssRootPath}/pages/*/*.map`], {
                    root: process.cwd()
                }),
                new CleanWebpackPlugin([`${cssRootPath}/pages/*/*/*.css`, `${cssRootPath}/pages/*/*/*.js`, `${cssRootPath}/pages/*/*/*.map`], {
                    root: process.cwd()
                })
            ]
        },
        utils.extractCSS(true)
    );
};