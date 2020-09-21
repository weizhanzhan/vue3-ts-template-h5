// eslint-disable-next-line @typescript-eslint/no-var-requires
const merge = require("webpack-merge");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const tsImportPluginFactory = require("ts-import-plugin");

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pxtoviewport = require("postcss-px-to-viewport");

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const autoprefixer = require("autoprefixer");
module.exports = {
  parallel: false,
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            "text-color": "#111",
            "border-color": "#eee",
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            hack: `true; @import "./src/theme/var.less";`
          }
        }
      },
      postcss: {
        plugins: [
          autoprefixer(),
          pxtoviewport({
            viewportWidth: 375
          })
        ]
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src"),
        "@assets": resolve("src/assets")
      }
    }
  },

  chainWebpack: config => {
    config.module
      .rule("ts")
      .use("ts-loader")
      .tap(options => {
        options = merge(options, {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [
              tsImportPluginFactory({
                libraryName: "vant",
                libraryDirectory: "es",
                style: name => `${name}/style/less`
                // style: true
              })
            ]
          }),
          compilerOptions: {
            module: "es2015"
          }
        });
        return options;
      });
  }
};
