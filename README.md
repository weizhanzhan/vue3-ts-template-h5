# vue3-ts-template-h5

## Vue3.0 + Typescript 初体验，打造h5,webapp移动端模板，开箱即用

## 目录
- [基础搭建](#基础搭建)
- [Vant配置](#vant配置)
- [浏览器样式重置](#浏览器样式重置)
- [移动端1px边框](#移动端1px边框)
- [tsconfig配置](#tsconfig配置)
- [语法检测自动格式代码](#语法检测自动格式代码)

## 基础搭建
- vue3配置
```sh
# 1.安装vue-cli next
npm install --global @vue/cli@next

# 2.创建项目，创建选择模板的时候，选择“Manually select features",下面有我的options，仅供参考
vue create my-project-name

# 如果已经有了一个cli项目不是TypeScript，可以增加一个cli的插件
vue add typescript
```

<font face="华文彩云" color="LightBlue">My Vue CLI Option</font>

>Vue CLI v4.5.4
>1. Please pick a preset: **Manually select features**
>2. Check the features needed for your project: Choose **Vue version, Babel, TS, Router, Vuex, CSS Pre-processors, Linter**
>3. Choose a version of Vue.js that you want to start the project **with 3.x (Preview)**
>4. Use class-style component syntax? **Yes**
>5. Use Babel alongside TypeScript (required for modern mode, auto-detected polyfills, transpiling JSX)? **Yes**
>6. Use history mode for router? (Requires proper server setup for index fallback in production) **Yes**
>7. Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): **Sass/SCSS (with node-sass)**
>8. Pick a linter / formatter config: **Prettier**
>9. Pick additional lint features: **Lint on save**
>10. Where do you prefer placing config for Babel, ESLint, etc.? (Use arrow keys) **In dedicated config files**
  



## Vant配置
- 安装
```sh
# 通过 npm 安装
npm i vant@next -S

# 通过 yarn 安装
yarn add vant@next
```
- 使用 ts-import-plugin 实现vant按需引入
如果本地找不到这个这两个包就分别安装
```js
//vue.config.js

// eslint-disable-next-line @typescript-eslint/no-var-requires
const merge = require("webpack-merge");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const tsImportPluginFactory = require("ts-import-plugin");


module.exports = {
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
                style: true
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

```
- 移动端适配(vw/vh方案)
```sh
# 安装依赖
npm install postcss-px-to-viewport -D
```

```js
// vue.config.js
const pxtoviewport = require("postcss-px-to-viewport");

const autoprefixer = require("autoprefixer");

module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtoviewport({
            viewportWidth: 375, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
            minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
            unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
          })
        ]
      }
    }
  }
}
```
重新运行，px变vw，ok✌~~

- 注册使用的vant全局组件，统一管理，避免重复引用
```ts
// plugins/vant.ts

import { App as VM } from "vue";
import { Button, List, Cell, Tabbar, TabbarItem } from "vant";

const plugins = [Button, List, Cell, Tabbar, TabbarItem];

export const vantPlugins = {
  install: function(vm: VM) {
    plugins.forEach(item => {
      vm.component(item.name, item);
    });
  }
};

//main.ts 使用

import { createApp } from 'vue'
import { vantPlugins } from './plugins/vant'

createApp(App)
  ...//其他配置
  .use(vantPlugins)
  .mount('#app')

```

## 浏览器样式重置

重置浏览器标签的样式表,因为浏览器的品种很多，每个浏览器的默认样式也是不同的，比如button标签，在IE浏览器、Firefox浏览器以及Safari浏览器中的样式都是不同的，所以，通过重置button标签的CSS属性，然后再将它统一定义，就可以产生相同的显示效果。开始一个项目前，先创建一个reset.css，可以规避很多浏览器差异问题
```scss
/* http://meyerweb.com/eric/tools/css/reset/
   v5.0.1 | 20191019
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
	display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
	line-height: 1;
}
menu, ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
```

## 移动端1px边框
问题分析：有些手机的屏幕分辨率较高，是2-3倍屏幕。css样式中border:1px solid red;在2倍屏下，显示的并不是1个物理像素，而是2个物理像素。解决方案如下：
- 1. border.css
```css

```

## tsconfig配置
把compileOnSave和sourceMap 设置成false，如果为true的话，在保存ts文件的时候会自动生成js和map文件
```json
{
  "compileOnSave": false,
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "strict": true,
    "jsx": "preserve",
    "importHelpers": true,
    "moduleResolution": "node",
    "experimentalDecorators": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "sourceMap": false,
    "baseUrl": ".",
    "types": [
      "webpack-env"
    ],
    "paths": {
      "@/*": [
        "src/*"
      ]
    },
    "lib": [
      "esnext",
      "dom",
      "dom.iterable",
      "scripthost"
    ]
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "tests/**/*.ts",
    "tests/**/*.tsx"
  ],
  "exclude": [
    "node_modules"
  ]
}

```

## 语法检测自动格式代码

- eslintrc.js
```js
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint"
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off"
  }
};

```
- vscode settings.json
```json
{
    // vscode默认启用了根据文件类型自动设置tabsize的选项
    "editor.detectIndentation": false,
    // 重新设定tabsize
    "editor.tabSize": 2,
    // #每次保存的时候自动格式化 
    "editor.formatOnSave": true,
    // #每次保存的时候将代码按eslint格式进行修复
    "eslint.autoFixOnSave": true,
    // 添加 vue 支持
    "eslint.validate": [
      "javascript",
      "javascriptreact",
      {
        "language": "vue",
        "autoFix": true
      }
    ],
    // #让prettier使用eslint的代码格式进行校验 
    "prettier.eslintIntegration": true,
    // #去掉代码结尾的分号 
    "prettier.semi": false,
    // #使用带引号替代双引号 
    "prettier.singleQuote": true,
    // #让函数(名)和后面的括号之间加个空格
    "javascript.format.insertSpaceBeforeFunctionParenthesis": true,
    // #这个按用户自身习惯选择 
    "vetur.format.defaultFormatter.html": "js-beautify-html",
    // #让vue中的js按编辑器自带的ts格式进行格式化 
    "vetur.format.defaultFormatter.js": "vscode-typescript",
    "vetur.format.defaultFormatterOptions": {
      "js-beautify-html": {
        "wrap_line_length": 120,
        "wrap_attributes": "auto"
        // #vue组件中html代码格式化样式
      }
    },
    // 格式化stylus, 需安装Manta's Stylus Supremacy插件
    "stylusSupremacy.insertColons": false, // 是否插入冒号
    "stylusSupremacy.insertSemicolons": false, // 是否插入分号
    "stylusSupremacy.insertBraces": false, // 是否插入大括号
    "stylusSupremacy.insertNewLineAroundImports": false, // import之后是否换行
    "stylusSupremacy.insertNewLineAroundBlocks": false,
    "explorer.confirmDelete": false // 两个选择器中是否换行
  }
```