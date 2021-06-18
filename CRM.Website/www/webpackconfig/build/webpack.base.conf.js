const alias = require('../config/alias');
const pathConfig = require('../config/path');
const pluginGenerator = require('../config/plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

function generateConfig(environment) {
    const jsPath = `${pathConfig.scriptPaths.build}/${environment}`;
    const cssPath = `${pathConfig.cssPaths.build}/${environment}`;
    const commonConfigs = {
        resolve: {
            alias: alias,
            extensions: ['.js', '.jsx']
        },
        entry: {
            /*js*/
            [`${jsPath}/lib/lang-en-US`]: pathConfig.scriptPaths.language,
            [`${jsPath}/main`]: pathConfig.scriptPaths.main,
            [`${jsPath}/pages/auth/recheckin`]: pathConfig.scriptPaths.recheckin,
            [`${jsPath}/pages/notificationlist/index`]: pathConfig.scriptPaths.notification_list,
            [`${jsPath}/pages/notificationtemplate/index`]: pathConfig.scriptPaths.notification_template,
            [`${jsPath}/pages/notificationtype/index`]: pathConfig.scriptPaths.notification_type,
            [`${jsPath}/pages/chattypemapping/index`]: pathConfig.scriptPaths.chattype_mapping,
            [`${jsPath}/pages/communicationsetting/index`]: pathConfig.scriptPaths.communication_setting,
            [`${jsPath}/pages/picandheadline/picassignment/index`]: pathConfig.scriptPaths.pic_assignment,
            [`${jsPath}/pages/picandheadline/management/index`]: pathConfig.scriptPaths.pic_management,
            [`${jsPath}/pages/report/settlement/index`]: pathConfig.scriptPaths.report_settlement,
            [`${jsPath}/pages/feedbacksubject/index`]: pathConfig.scriptPaths.feedback_subject,
            [`${jsPath}/pages/customer/customerinfo/index`]: pathConfig.scriptPaths.customer_info,
            [`${jsPath}/pages/feedback/addguessfeedback/index`]: pathConfig.scriptPaths.add_guess_feedback,

            /*css*/
            [`${cssPath}/main`]: pathConfig.cssPaths.main,
            [`${cssPath}/error`]: pathConfig.cssPaths.error,
            [`${cssPath}/pages/notificationlist/index`]: pathConfig.cssPaths.notification_list,
            [`${cssPath}/pages/notificationtemplate/index`]: pathConfig.cssPaths.notification_template,
            [`${cssPath}/pages/notificationtype/index`]: pathConfig.cssPaths.notification_type,
            [`${cssPath}/pages/chattypemapping/index`]: pathConfig.cssPaths.chattype_mapping,
            [`${cssPath}/pages/communicationsetting/index`]: pathConfig.cssPaths.communication_setting,
            [`${cssPath}/pages/picandheadline/picassignment/index`]: pathConfig.cssPaths.pic_assignment,
            [`${cssPath}/pages/picandheadline/management/index`]: pathConfig.cssPaths.pic_management,
            [`${cssPath}/pages/report/settlement/index`]: pathConfig.cssPaths.report_settlement,
            [`${cssPath}/pages/feedbacksubject/index`]: pathConfig.cssPaths.feedback_subject,
            [`${cssPath}/pages/latestfeedback/index`]: pathConfig.cssPaths.latest_feedback,
            [`${cssPath}/pages/customer/customerinfo/index`]: pathConfig.cssPaths.customer_info,
            [`${cssPath}/pages/feedback/addguessfeedback/index`]: pathConfig.cssPaths.add_guess_feedback,
            [`${cssPath}/pages/latestfeedback/index`]: pathConfig.cssPaths.latest_feedback
        },
        output: {
            path: pathConfig.projectRoot,
            filename: "[name].chunk.js",
            chunkFilename: `${jsPath}/lib/[name].chunk.js`,
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    loader: ["babel-loader"],
                    exclude: /node_modules/
                }
            ]
        },
        plugins: pluginGenerator(environment),
        stats: {
            assets: false,
            colors: true,
            version: false,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            children: true
        },
        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    sourceMap: true,
                    uglifyOptions: {
                        output: {
                            comments: false
                        }
                    }
                }),
                new OptimizeCssAssetsPlugin()
            ],
            splitChunks: {
                chunks: 'all',
                minSize: 30000,
                maxSize: 0,
                minChunks: 2,
                maxAsyncRequests: 5,
                maxInitialRequests: 3,
                name: false,
                cacheGroups: {
                    // disable default cache group
                    default: false,
                    vendors: false,
                    reactVendor: {
                        name: 'react-vendor',
                        test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                        minChunks: 2,
                        priority: -10
                    },
                    reactBootstrapVendor: {
                        name: 'react-bootstrap-vendor',
                        test: /[\\/]node_modules[\\/](react-bootstrap)[\\/]/,
                        minChunks: 2,
                        priority: -10
                    }
                }
            }
        }
    };

    return commonConfigs;
}

module.exports = generateConfig;