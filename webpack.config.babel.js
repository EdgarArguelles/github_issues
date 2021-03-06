import path from 'path';
import {CleanWebpackPlugin} from 'clean-webpack-plugin';
import Analyzer from 'webpack-bundle-analyzer';
import MiniCSSExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';

const srcPath = path.resolve('./src');
const distPath = path.resolve('./dist');

export default {
    entry: {
        polyfill: 'babel-polyfill',
        app: './src/app/App.jsx',
    },
    output: {
        path: distPath,
        filename: '[name].js',
        publicPath: '/',
    },
    devServer: {
        port: 3001,
        host: '0.0.0.0',
        historyApiFallback: true,
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {test: /\.s?css$/, name: 'styles', chunks: 'all'},
                react: {test: /[\\/]node_modules[\\/]react-dom[\\/]/, name: 'react', chunks: 'initial'},
            },
        },
    },
    plugins: [
        new CleanWebpackPlugin(),
        new Analyzer.BundleAnalyzerPlugin({
            analyzerMode: 'static', reportFilename: '../statistics/tree.html', openAnalyzer: false,
        }), // generate tree.html
        new MiniCSSExtractPlugin(), // create a separated file for css
        new OptimizeCSSAssetsPlugin(), // remove duplicated css classes generated by sass-loader
    ],
    resolve: {
        extensions: ['*', '.js', '.jsx'],
        alias: {
            app: `${srcPath}/app`, // allow to use import with absolute path (example 'app/')
        },
    },
    module: {
        rules: [
            // babel
            {test: /\.(js|jsx)?$/, exclude: [/node_modules/], use: 'babel-loader'},
            // index
            {test: /index.html$/, type: 'asset/resource', generator: {filename: '[name][ext]'}},
            // sass
            {
                test: /\.(scss|css)$/, use: [
                    MiniCSSExtractPlugin.loader,
                    'css-loader',
                    // add vendor prefix (user-select: none -> -webkit-user-select: none)
                    {loader: 'postcss-loader', options: {postcssOptions: {plugins: [require('autoprefixer')()]}}},
                    'sass-loader',
                ],
            },
        ],
    },
};