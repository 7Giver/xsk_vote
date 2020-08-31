const path = require('path');
const glob = require('glob');
// 用于做相应的merge处理
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
// const { DefinePlugin } = require('webpack')

const resolve = dir => {
  return path.join(__dirname, dir);
};
let pages = {};
function getPages() {
  glob.sync('./src/pages/*/*.js').forEach(filepath => {
    let fileList = filepath.split('/');
    let fileName = fileList[fileList.length - 2];
    pages[fileName] = {
      entry: `src/pages/${fileName}/main.js`,
      // 模板来源
      template: `src/pages/${fileName}/${fileName}.html`,
      title: '',
      // 在 dist/index.html 的输出
      filename:
        process.env.NODE_ENV === 'development'
          ? `${fileName}.html`
          : `${fileName}.html`,
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', fileName],
    };
  });
  return pages;
}

module.exports = {
  lintOnSave: false, //关闭eslint
  pages: getPages(),
  devServer: {
    open: true,
    hot: true,
    hotOnly: true,
    disableHostCheck: true,
    // host: 'app.happyeasygo.com',
    port: 80,
    https: false,
    // proxy: {},
    // before: app => {
    //   app.get(`/:page/*`, function(req, res, next) {
    //     if (['activity', 'home'].includes(req.params.page)) {
    //       req.url = `/${req.params.page}`;
    //       next('route');
    //     } else {
    //       next();
    //     }
    //   });
    // },
  },
  chainWebpack: config => {
    config.module
      .rule('css')
      .test(/\.css$/)
      .oneOf('vue')
      .resourceQuery(/\?vue/)
      .use('px2rem')
      .loader('px2rem-loader')
      .options({
        remUnit: 37.5,
      });
    config.module
      .rule('images')
      .use('url-loader')
      .tap(options =>
        merge(options, {
          limit: 100,
        }),
      );
    config.resolve.alias
      .set('@', resolve('src'))
      .set('components', resolve('src/components'))
      .set('pages', resolve('src/assets/pages'))
      .set('api', resolve('src/api'))
      .set('utils', resolve('src/utils'));
    //删除console插件
    let plugins = [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false,
            drop_console: true,
            drop_debugger: true,
          },
          output: {
            // 去掉注释内容
            comments: false,
          },
        },
        sourceMap: false,
        parallel: true,
      }),
    ];
    //打包文件带hash
    config.output.filename('[name].[hash].js').end();
  },
  configureWebpack: config => {
    // 开发环境不需要gzip
    if (process.env.NODE_ENV === 'development') return;
    config.plugins.push(
      new CompressionWebpackPlugin({
        // 正在匹配需要压缩的文件后缀
        test: /\.(js|css|svg|woff|ttf|json|html)$/,
        // 大于5kb的会压缩
        threshold: 5120,
        // 其余配置查看compression-webpack-plugin
      }),
    );
  },
  css: {
    loaderOptions: {
      sass: {
        // prependData: `@import "~@/assets/styles/index.scss";`,
      },
      postcss: {
        plugins: [
          // require('postcss-plugin-px2rem')({
          //   rootValue: 37.5, //换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
          //   exclude: /node_module|admin|element-ui/i, //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
          //   mediaQuery: false, //（布尔值）允许在媒体查询中转换px。
          //   minPixelValue: 3, //设置要替换的最小像素值(3px会被转rem)。 默认 0
          // }),
          require('postcss-px2rem-exclude')({
            remUnit: 37.5,
            exclude: /node_modules|admin|element-ui/i,
          }),
        ],
      },
    },
  },
};
