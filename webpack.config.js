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
    devtool: 'inline-source-map',
    mode: 'development',
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.pug$/,
                use: [
                    {
                        loader: "pug-loader",
                        options: {
                            pretty: true,
                        }
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
                            ]
                        }
                    }
                ]
            },
            {
                 test: /\.css$/,
                 use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: true,
                            /*reloadAll: true,*/
                        },
                    },
                    {
                         loader: 'css-loader', 
                         options: { sourceMap: true },
                    },
                 ],
            },
            {
                 test: /\.(png|svg|jpg|gif)$/,
                 use: [
                   'file-loader'
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
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery'",
            "window.$": "jquery",
        }),
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