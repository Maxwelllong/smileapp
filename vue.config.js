// // const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
// // const path = require('path')
// const CompressionPlugin = require('compression-webpack-plugin')
// // const produc = []
// if(process.env.NODE_ENV === 'production'){
//   produc.push('transform-remove-console')
// }

// module.exports = {
//     // 基本路径
//     // publicPath: './',
//     // 输出文件目录
//     outputDir: 'dist',
//     // webpack-dev-server 相关配置
//     // 
    
//     //webpack配置
//     lintOnSave:true,   //配置false关闭eslint true开启eslint
//     configureWebpack: {   
//         //警告 webpack 的性能提示
//         performance: {
//           hints:'warning',
//           //入口起点的最大体积
//           maxEntrypointSize: 5000000000,
//           //生成文件的最大体积
//           maxAssetSize: 3000000000,
//           //只给出 js 文件的性能提示
//           // assetFilter: function(assetFilename) {
//           //   return assetFilename.endsWith('.js');
//           // }
//         },
//         plugins:[new CompressionPlugin({
//           test:/\.js$|\.html$|\.css$ /, //匹配文件名
//           threshold:100,
//           deleteOriginalAssets:false //是否删除源文件
//         })]

//       }
//   }