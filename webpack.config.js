const path = require('path')
// TODO: Export file css ra file riêng
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {HOST,CLIENT_PORT} = require('./src/Configs/_host_contants')
const VENDOR_LIBS = [
    "jquery",
    "react",
    "react-dom",
];
const devServer = {
    port: 8086,
    disableHostCheck: true,
    historyApiFallback: true,
    overlay: true,
    stats: 'minimal',
    inline: true,
    compress: true,
    contentBase: path.resolve(__dirname, 'dist')
};
module.exports = {
    resolve: {
        alias: {
          'react-dom': 'react-dom/profiling',
          'schedule/tracing': 'schedule/tracing-profiling',
        }
    },
    entry: {
        bundle: './src/Client/index.js',
        vendor: VENDOR_LIBS
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js',
        //Todo: Sử dụng cho nested route (môi trường dev), mất cả buổi sáng vọc, khổ vlin
        publicPath: `${HOST}:${CLIENT_PORT}/`
    },
    module: {
        rules: [

            {
                test: /\.js$|\.jsx$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader"
                }
            },
            // TODO: Load css
            {
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader", 
                    query: {
                        modules: true,
                        localIdentName: '[name]__[local]___[hash:base64:5]'
                      }
                }, {
                    loader: "sass-loader", 
                    query: {
                        modules: true,
                        localIdentName: '[name]__[local]___[hash:base64:5]'
                      }
                }],
                test: /\.(s*)css$/
            },
            //Todo: Load các loại file ( font, img...)
            {
                loader: 'file-loader',
                test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.woff2$|\.eot$|\.ttf|\.mp3$|\.wav$/
            }
        ],
    },
    plugins: [
        //Todo: Cấu hình để sử dụng đc jquery
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery',
            'windown.$': 'jquery',
            'windown.jQuery': 'jquery'
        }),
        /* Todo: Optimize bundle.js và vendor.js => giảm kích thước file
               Thêm manifest: khi build lại project sẽ chỉ load lại những gói file có sự thay đổi ( thường là bundle.js) */
        // Todo: Sinh ra file index.html trong gói bundle
        new HtmlWebpackPlugin({
            template: 'src/Client/index.html'
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/
                  },
            }
        },
        runtimeChunk: {
            name: "manifest",
          },
    },
    mode: 'development',
    //Todo: Trace log
    devtool: '#source-map',
    devServer,

}
