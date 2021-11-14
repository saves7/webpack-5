const path = require('path');
const isDev = process.env.NODE_ENV === 'development'; //т.е. если мы находимся в development разработке
const isProd = !isDev;
const  HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const filename = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`


module.exports = {

    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry:  './js/main.js',
    output: {
        filename: `./js/${filename('js')}`,
        path: path.resolve(__dirname, 'app'),
        publicPath: ''
    },
    devServer: {
        historyApiFallback: true,
        //contentBase: path.resolve(__dirname,'app'),
        static: {
           // directory: path.join(__dirname, 'public'),
            directory: path.resolve(__dirname, 'app'),
        },
        open: true,
        compress: true,
        //hot: true, //если использовать, тогда в rules css должен быть options с hmr:true
        port: 3000,
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./index.html"
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: `./css/${filename('css')}`,
        }),
        new CopyWebpackPlugin({
            patterns: [
                {from: path.resolve(__dirname,'src/assets'), to: path.resolve(__dirname,'app/assets')},
            ]
        })

    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", 'sass-loader'],
            },
            {
                test: /\.(?:|gif|png|jpg|jpeg|svg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        //name: `./img/${filename('[ext]')}`
                        name: `./img/${filename('[ext]')}`
                       //name: '[path][name].[ext]'
                    }
                }],
            },


        ]
    }


}