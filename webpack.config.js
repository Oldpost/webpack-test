const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 动态生成html文件
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 清空文件夹
const ExtractTextPlugin = require('extract-text-webpack-plugin'); //css样式从js文件中分离出来,需要通过命令行安装 extract-text-webpack-plugin依赖包

module.exports = {
  entry:"./src/index.js",
  output:{
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.[hash].js'
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        use:'css-loader',
        fallback: 'style-loader'
      },
      {
        test:/\./
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename:'test.html',
      template: 'src/index.html',
      title: 'test',
    })
  ],
  devServer: {
    contentBase: './dist',
    hot:true,
    quiet:false
  }
}