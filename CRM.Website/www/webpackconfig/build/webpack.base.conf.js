const alias = require('../config/alias');
const pathConfig = require('../config/path');
const pluginGenerator = require('../config/plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

function generateConfig(environment) {
    const jsPath = `${pathConfig.scriptPaths.build}/${environment}`;
    const cssPath = `${pathConfig.cssPaths.build}/${environment}`;
    return {
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
            [`${jsPath}/pages/adminTool/communicationsetting/index`]: pathConfig.scriptPaths.communication_setting,
            [`${jsPath}/pages/picandheadline/picassignment/index`]: pathConfig.scriptPaths.pic_assignment,
            [`${jsPath}/pages/picandheadline/management/index`]: pathConfig.scriptPaths.pic_management,
            [`${jsPath}/pages/report/settlement/index`]: pathConfig.scriptPaths.report_settlement,
            [`${jsPath}/pages/adminTool/feedbacksubject/index`]: pathConfig.scriptPaths.feedback_subject,
            [`${jsPath}/pages/customer/customerinfo/index`]: pathConfig.scriptPaths.customer_info,
            [`${jsPath}/pages/feedback/add-guest-feedback/index`]: pathConfig.scriptPaths.add_guest_feedback,
            [`${jsPath}/pages/feedback/latest-feedback`]: pathConfig.scriptPaths.latest_feedback,
            [`${jsPath}/pages/feedback/multiple-logs/create`]: pathConfig.scriptPaths.create_multiple_logs,
            [`${jsPath}/pages/feedback/deleted-feedback/index`]: pathConfig.scriptPaths.deleted_feedback,
            [`${jsPath}/pages/feedback/manage-feedback/index`]: pathConfig.scriptPaths.manage_feedback,
            [`${jsPath}/pages/informHeadline/index`]: pathConfig.scriptPaths.inform_headline,
            [`${jsPath}/pages/customer/customerinfodetail/index`]: pathConfig.scriptPaths.customer_info_detail,
            [`${jsPath}/pages/communicationlog/index`]: pathConfig.scriptPaths.communication_log,
            [`${jsPath}/pages/remark/index`]: pathConfig.scriptPaths.remark,
            [`${jsPath}/pages/redemption/index`]: pathConfig.scriptPaths.redemption,
            [`${jsPath}/pages/actionlog/index`]: pathConfig.scriptPaths.action_log,
            [`${jsPath}/pages/dashboard/index`]: pathConfig.scriptPaths.dashboard,
            [`${jsPath}/pages/adminTool/setting-log/index`]: pathConfig.scriptPaths.setting_log,
            [`${jsPath}/pages/report/deleted-feedback-statistic/index`]: pathConfig.scriptPaths.deleted_feedback_statistic,
            [`${jsPath}/pages/report/log-statistics/index`]: pathConfig.scriptPaths.log_statistics,
            [`${jsPath}/pages/report/issue-statistics/index`]: pathConfig.scriptPaths.issue_statistics,
            [`${jsPath}/pages/picandheadline/changesLog/index`]: pathConfig.scriptPaths.change_log,
            [`${jsPath}/pages/feedback/add-customer-feedback/index`]: pathConfig.scriptPaths.add_customer_feedback,

            /*css*/
            [`${cssPath}/main`]: pathConfig.cssPaths.main,
            [`${cssPath}/error`]: pathConfig.cssPaths.error,
            [`${cssPath}/pages/notificationlist/index`]: pathConfig.cssPaths.notification_list,
            [`${cssPath}/pages/notificationtemplate/index`]: pathConfig.cssPaths.notification_template,
            [`${cssPath}/pages/notificationtype/index`]: pathConfig.cssPaths.notification_type,
            [`${cssPath}/pages/chattypemapping/index`]: pathConfig.cssPaths.chattype_mapping,
            [`${cssPath}/pages/adminTool/communicationsetting/index`]: pathConfig.cssPaths.communication_setting,
            [`${cssPath}/pages/picandheadline/picassignment/index`]: pathConfig.cssPaths.pic_assignment,
            [`${cssPath}/pages/picandheadline/management/index`]: pathConfig.cssPaths.pic_management,
            [`${cssPath}/pages/report/settlement/index`]: pathConfig.cssPaths.report_settlement,
            [`${cssPath}/pages/adminTool/feedbacksubject/index`]: pathConfig.cssPaths.feedback_subject,
            [`${cssPath}/pages/customer/customerinfo/index`]: pathConfig.cssPaths.customer_info,
            [`${cssPath}/pages/feedback/add-feedback/index`]: pathConfig.cssPaths.add_feedback,
            [`${cssPath}/pages/feedback/latest-feedback`]: pathConfig.cssPaths.latest_feedback,
            [`${cssPath}/pages/feedback/multiple-logs/create`]: pathConfig.cssPaths.create_multiple_logs,
            [`${cssPath}/pages/feedback/deleted-feedback/index`]: pathConfig.cssPaths.deleted_feedback,
            [`${cssPath}/pages/feedback/manage-feedback/index`]: pathConfig.cssPaths.manage_feedback,
            [`${cssPath}/pages/informHeadline/index`]: pathConfig.cssPaths.inform_headline,
            [`${cssPath}/pages/customer/customerinfodetail/index`]: pathConfig.cssPaths.customer_info_detail,
            [`${cssPath}/pages/communicationlog/index`]: pathConfig.cssPaths.communication_log,
            [`${cssPath}/pages/remark/index`]: pathConfig.cssPaths.remark,
            [`${cssPath}/pages/redemption/index`]: pathConfig.cssPaths.redemption,
            [`${cssPath}/pages/actionlog/index`]: pathConfig.cssPaths.action_log,
            [`${cssPath}/pages/dashboard/index`]: pathConfig.cssPaths.dashboard,
            [`${cssPath}/pages/adminTool/setting-log/index`]: pathConfig.cssPaths.setting_log,
            [`${cssPath}/pages/report/deleted-feedback-statistic/index`]: pathConfig.cssPaths.deleted_feedback_statistic,
            [`${cssPath}/pages/report/log-statistics/index`]: pathConfig.cssPaths.log_statistics,
            [`${cssPath}/pages/report/issue-statistics/index`]: pathConfig.cssPaths.issue_statistics,
            [`${cssPath}/pages/picandheadline/changesLog/index`]: pathConfig.cssPaths.changes_log
        },
        output: {
            path: pathConfig.projectRoot,
            filename: "[name].chunk.js",
            chunkFilename: `${jsPath}/lib/[name].chunk.js`
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
}

module.exports = generateConfig;