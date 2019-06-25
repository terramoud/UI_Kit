const webpack = require('webpack');
const path = require('path');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        app: path.resolve(__dirname, "pages", "index.js"),
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolveLoader: {
        alias: {
            'pug-to-bemdecl-loader': path.resolve('pugToBemdeclLoader.js')
        },
    },
    devtool: 'inline-source-map',
    mode: 'development',
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.BEMDECL$/,
                use: [
                    {
                        // Передаем результат в bemdecl-to-fs-loader
                        loader: 'bemdecl-to-fs-loader',
                        // Указываем уровни переопределения и расширения технологий
                        options: { levels: ['Common.blocks','Desktop.blocks','Mobile.blocks'], extensions: ['scss', 'js'] }
                    },
                    // Для начала передаем файл в html2bemdecl-loader
                    { loader: 'html2bemdecl-loader' },
                    { loader: "pug-html-loader" },
                ]
            },
            {
                test: /\.pug$/,
                use: [
                    {
                        loader: "pug-loader",
                        options: {
                            pretty: true,
                        }
                    },
                    {
                        loader: "pug-to-bemdecl-loader",
                    },
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: true,
                            /*reloadAll: true,*/
                        },
                    },
                    /*"style-loader", // creates style nodes from JS strings*/
                    { loader: 'css-loader', options: { sourceMap: true } },
                    { loader: 'sass-loader', options: { sourceMap: true } },
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            sourceMap: true,
                            // Or array of paths
                            resources: [
                                './Common.blocks/Base/Variables.scss',
                                './Common.blocks/Base/Mixins.scss',
                            ]
                        }
                    }
                ]
            },
            {
                 test: /\.(woff|woff2|eot|ttf|otf)$/,
                 use: [
                     {
                         loader: 'file-loader',
                     },
                 ],
            },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        /*new CleanWebpackPlugin(),*/
        new HtmlWebpackPlugin({
            template: './pages/index.pug',
            inject: 'body',
            defer: ['app'],
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
    ],
    optimization: {
        minimizer: [
            new TerserJSPlugin({}),
            new OptimizeCSSAssetsPlugin({}),
        ],
    }
}