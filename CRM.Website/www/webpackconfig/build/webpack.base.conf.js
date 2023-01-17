const alias = require('../config/alias');
const pathConfig = require('../config/path');
const pluginGenerator = require('../config/plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

function generateConfig(env) {
    const jsPath = `${pathConfig.scriptPaths.build}/${env}`;
    const cssPath = `${pathConfig.cssPaths.build}/${env}`;

    return {
        resolve: {
            alias: alias,
            extensions: ['.js', '.jsx']
        },
        entry: {
            /*js*/
            [`${jsPath}/pages/home/index`]: pathConfig.scriptPaths.home,
            [`${jsPath}/lib/lang-en-US`]: pathConfig.scriptPaths.language,
            [`${jsPath}/pages/auth/recheckin`]: pathConfig.scriptPaths.recheckin,

            /*css*/
            [`${cssPath}/main`]: pathConfig.cssPaths.main,
            [`${cssPath}/error`]: pathConfig.cssPaths.error,
            [`${cssPath}/pages/auth/login`]: pathConfig.cssPaths.auth
        },
        output: {
            publicPath: 'www/dist/',
            path: pathConfig.distPath,
            filename: '[name].[contenthash].chunk.js',
            chunkFilename: `${jsPath}/lib/[name].[contenthash].chunk.js`
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    use: [
                        {
                          loader: 'babel-loader',
                          options: {
                            cacheDirectory: true
                          }
                        }
                    ],
                    exclude: /node_modules/
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/,
                    use: [
                      {
                        loader: 'file-loader',
                        options: {
                          name: '[name].[contenthash].[ext]'
                        }
                      }
                    ]
                }
            ]
        },
        plugins: pluginGenerator(env),
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
                cacheGroups: {
                    // disable default cache group
                    default: false,
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    }
                }
            }
        }
    };
}

module.exports = generateConfig;