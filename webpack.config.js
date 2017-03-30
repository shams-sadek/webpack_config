var HtmlWebpackPlugin = require('html-webpack-plugin');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const path = require('path');


/*
 | -----------------------------------------------------------------------------
 | css mode
 | -----------------------------------------------------------------------------
 **/
var isProd = process.env.NODE_ENV === 'production'; // true or false
var cssDev = ['style-loader', 'css-loader', 'sass-loader'];

var cssProd = ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader'],
                    publicPath: '/dist'
                });

var cssConfig = isProd ? cssProd : cssDev;


module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, "dist"), // string
        filename: 'app.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: cssConfig
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.(jpe?g|gif|png|svg)$/i,
                use: [
                       'file-loader?name=images/[name].[ext]',
                       'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }
        ]
    },
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      compress: true,
      port: 8080,
      stats: 'errors-only'
    },
    plugins: [
        new HtmlWebpackPlugin({
              title: 'My App',
              minify: {
                  collapseWhitespace: true
              },
              hash: true,
              filename: './../index.html',
              template: './src/index.ejs'
        }),
        new ExtractTextPlugin({
            filename: "styles.css",
            allChunks: true
        })
    ]
}
