const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 动态生成html文件
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 清空文件夹 
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // webpack分离css单独打包

module.exports = {
  entry:"./src/index.js",
  output:{
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle[hash].js',
  },
  module:{
    rules:[
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
            }
          },
          // 在这里带调用 style-loader 会报错
          "css-loader"
        ]
        // use: ['style-loader', 'css-loader'] // 先调用css-loader，解决不了在调用style-loader
      },
      {
        test: /\.(png|jpg)$/,
        use: [
          {
            loader: 'url-loader',
            // 将小于8K的图片以base64的形式打包到js文件中
            options: {
              limit: 8192, // 文件大小
              name: '[name][hash:8].[ext]', // 指定文件吗
              // name(file) {
              //   if (process.env.NODE_ENV === 'development') {
              //     return '[path][name].[ext]';
              //   }
              //   return '[hash].[ext]';
              // },
              outputPath: 'images', // 新增一层文件路径
            }
          }],
      },
      {
        test: /\.html$/,
        loader: 'html-withimg-loader'
      }
    ]
  },
  plugins: [
    
    new HtmlWebpackPlugin({
      filename:'index.html',
      template: path.resolve(__dirname, 'src/index.html'),
      title: 'test',
      inject: true, //是否自动在模板文件添加 自动生成的js文件链接
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    hot: true,
    port: 9000
  }
}