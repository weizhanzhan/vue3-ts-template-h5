


<div align="center">
  <img width="200px" height="200px" src="https://gitee.com/zhan961023/vue3-template-h5/raw/master/src/assets/images/vue3.png" />
  <h1>vue3-template-h5</h1>
  <p style="color:#00000073">Vue3.0 + Typescript 初体验，打造h5,webapp移动端模板，开箱即用</p>
</div>

## 🚀 Browse online

- [URL 1](https://www.weizhan.site)
- [URL 2](https://vue3-ts-template-h5.vercel.app)


📖 `Vue3.0` 相关文档：

| 相关库名称 | 在线地址 🔗 |
| --------- | ----- |
| Vue3.0 官方文档 | <a href="https://v3.vuejs.org/" target="_blank">链接</a> |
| Vue3.0 中文文档 | <a href="https://v3.cn.vuejs.org/" target="_blank">链接</a> <a href="https://vue3js.cn/docs/zh/" target="_blank">国内链接</a>|
| Composition-API手册 | <a href="https://vue3js.cn/vue-composition-api/" target="_blank">链接</a> |
| Vue3.0 源码学习 | <a href="https://vue3js.cn/start/" target="_blank">链接</a> |
| Vue-Router 官方文档 | <a href="https://next.router.vuejs.org/" target="_blank">链接</a> |
| Vuex4.0（目前在 beta 阶段） | <a href="https://github.com/vuejs/vuex/tree/4.0/" target="_blank">Github</a> |

### 🚦注意

> 遇到安装依赖启动报错的升级一下Typescript 
>npm install typescript@4.5.3 --dev
## 🎹目录
- [基础搭建](#基础搭建)
- [Vue3.0新特性与改动](#vue3的新特性和改动)
- [新颖的CompositionApi](#compositionapi)
- [Axios配置及接口数据类型定义](#axios配置及接口数据类型定义)
- [关于Vue3中使用Typescript的注意点](#关于vue3中使用typescript的注意点)
- [Vant配置](#vant配置)
- [Vant主题修改](#vant主题色)
- [关于样式穿透](#关于样式穿透)
- [浏览器样式重置](#浏览器样式重置)
- [移动端1px边框](#移动端1px边框)
- [Vue3.0中Vuex的配置与使用以及替代方案](#vuex的配置与使用)
- [Vue3.0路由配置和缓存](#vue路由配置和缓存)
- [tsconfig配置](#tsconfig配置)
- [语法检测自动格式代码](#语法检测自动格式代码)
- [发布&部署](#发布部署)
- [关于我](#关于我)
- [感谢](#感谢)
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


## vue3的新特性和改动

### v-model
#### 2.x语法
在 2.x 中，在组件上使用 v-model 相当于绑定 `value` prop 和 `input` 事件：
```html
<child-component v-model="title" />
<!-- 语法糖 默认mode prop:value  event:input-->
<child-component :value="title" @input="title = $event"/>
```
使用`v-bind:sync`
vue是单向数据流，为了对prop进行"双向绑定",可以是用sync来实现
```html
<child-component :title.sync="title" />
<!-- 语法糖 -->
<child-component :title="title" @update:title="title = $event"/>
```
子组件内通过下面方式通知父父组件
```js
this.$emit('update:title',value)
```
#### 3.x语法
在3.x中自定义组件的`v-model`，是传递了`modelValue`prop并接受抛出的`update:modelValue`事件,和sync很像
```html
<child-component v-model="title" />
<!-- 语法糖 -->
<child-component :modelValue="title" @update:modelValue="title = $event"/>
```
`v-model`参数
若需要更改 `model` 名称，而不是更改组件内的 `model` 选项,而是将一个 `argument` 传递给 `model`
```html
<child-component v-model:title="pageTitle" />
<!-- 简写: -->
<child-component :title="title" @update:title="title = $event" />
```
因此我们直接可以2.x的sync改成现在这种写法
```html
<child-component :title.sync="title" />
<!-- 替换为 -->
<child-component v-model:title="title" />
```
并且一个子组件我们可以写多个v-model
```html
<child-component v-model:title="pageTitle" v-model:content="content"/>
```

### v-for
v-for的变动最主要体现在`key`上面，我们在使用`<template v-for>`的时候，2.x语法的key值不可以加在`template`标签上面,要加到子节点上,而在3.x中则可以加到`template`上,并且不需要在子节点上添加`key`
```html
<!-- Vue 2.x -->
<template v-for="item in list">
  <div :key="item.id">...</div>
  <span :key="item.id">...</span>
</template>

<!-- Vue 3.x -->
<template v-for="item in list" :key="item.id">
  <div>...</div>
  <span>...</span>
</template>
```
### ref
在2.0中，在`v-for`中绑定ref,我们通过`$ref`，获取的是一个ref数组，在3.x中则不会自动创建数组，我们需要绑定一个函数，自己处理并接受它
```html
<div v-for="item in list" :ref="setItemRef"></div>
```

```js
export default {
  setup() {
    //itemRefs 不必是数组：它也可以是一个对象，其 ref 会通过迭代的 key 被设置。
    let itemRefs = []
    const setItemRef = el => {
      itemRefs.push(el)
    }
    return {
      itemRefs,
      setItemRef
    }
  }
}

```
也可以
```html
<template>
  <div ref="box">
    I am div
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';


export default {
  name: 'App',
  setup() {
    let box = ref(null);

    // 由于 template 中的 div 属性 ref 引用了一个对象 box，因此 box 将与这个 div 执行绑定。
    // 但由于 setup 执行时期，还未创建实际的 div，所以如果要进行与 box 的交互，必须在生命周期中间执行获取。
    // onMounted() 中的行为会在声明周期 mounted 中执行。
    onMounted(() => {
      console.log('box.value', box.value);
    })


    return {box};
  }
}
</script>
```

整理中...（敬请期待😄）

## CompositionApi

### VUE 3 COMPOSITION API CHEAT SHEET
```html
<template>
  <div>
    <p>Spaces Left: {{ spacesLeft }} out of {{ capacity }}</p>
    <h2>Attending</h2>
    <ul>
      <li v-for="(name, index) in attending" :key="index">
        {{ name }}
      </li>
    </ul>
    <button @click="increaseCapacity()">Increase Capacity</button>
  </div>
</template> <script>
// If using Vue 2 with Composition API plugin configured/ 在Vue2中使用 Composition API :  import { ref, computed } from "@vue/composition-api";
import { ref, computed } from "vue";
export default {
  setup() {
    //数据响应式 将数据包装在对象中以跟踪更改
    const capacity = ref(4);
    const attending = ref(["Tim", "Bob", "Joe"]);
    //Computed属性
    const spacesLeft = computed(() => {
      //通过调用.value访问响应式引用的值
      return capacity.value - attending.value.length;
    });
    // 定义方法
    function increaseCapacity() {
      //ref进行响应式的变量 需要修改变量的话则需要对其.value操作
      capacity.value++;
    }
    // 使我们的模板可以访问这些对象和功能
    return { capacity, attending, spacesLeft, increaseCapacity };
  }
};
</script>

```

你也可以这样写

```js
import { reactive, computed, toRefs } from "vue";
export default {
  setup() {
    //reactive接受一个对象并返回一个响应式对象
    const event = reactive({
      capacity: 4,
      attending: ["Tim", "Bob", "Joe"],
      spacesLeft: computed(() => { return event.capacity - event.attending.length; })
    });
    function increaseCapacity() {
      // reactive返回的响应式对象不需要使用.value操作
      event.capacity++;
    }
    //...toRefs 解构event中的对象，使模板中直接可以使用capacity或者attending，不需要event.attending
    return { ...toRefs(event), increaseCapacity };
  }
};

```

整理中...（敬请期待😄）


### 其他

#### getCurrentInstance
在setup中，是没有办法通过this获取到vue，我们可以通过getCurrentInstance获取vue实例

## Axios配置及接口数据类型定义
### axios封装配置
```ts
//目前不完善，后续会补充，整体结构没问题
import axios from "axios";
const baseURL = "xxxx";
const requestTimeout = 10000;
const successCode = [200, 0];
const instance = axios.create({
  baseURL,
  timeout: requestTimeout,
  headers: {
    "Content-Type": "application/json;charset=UTF-8"
  }
});

instance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  response => {
    const res = response.data;
    const { data } = response;
    const { code, msg } = data;

    // 操作成功
    if (successCode.indexOf(code) !== -1) {
      return res;
    } else {
      return Promise.reject();
    }
  },
  error => {
    const { response } = error;
    if (response && response.data) {
      return Promise.reject(error);
    } else {
      const { message } = error;
      return Promise.reject(error);
    }
  }
);

export default instance;
```
### 数据类型配置
TypeScript中Axios默认返回类型为any，那么我们如果要自己定义数据类型该怎么做呢？
1. 首先我们在声明文件中重新生命axios模块，vue-cli自带shims-vue.d文件，如果没有就新建一个，在src目录下
```ts
import axios from 'axios'

declare module 'axios' {
  export interface AxiosInstance {
    <T = any>(config: AxiosRequestConfig): Promise<T>;
    request<T = any> (config: AxiosRequestConfig): Promise<T>;
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  }
}
```
接下来就可以使用了
```ts
interface ResourceOption{
  title:string;
  logo:string;
}

export const getResouceList = () => {
  return request<ResourceOption[]>({
    url: "api/resource/list",
    method: "get"
  });
};

```
## 关于Vue3中使用Typescript的注意点

#### 1.Props定义数据类型
>为了类型推论，让我们在使用属性的时候获取更丰富的类型提示，比如在这里我们定义了一个属性 list，使用 vue 默认的 Array，只能确定它是一个数组类型，不能确定数组里面的每一项到底是什么样子的。你在 setup 中，看 props.list 就是一个any数组，但是如果使用PropType <ColumnProps[]> 这个时候，props.list 就变成一个 ColumnProps 的数组，你使用它的时候不论在 ts 中还是模版中都能获得类型的推断和自动补全等等
```js
<script lang='ts'>
import {defineComponent, PropType} from 'vue'
export interface ColumnProps{
    id: string;
    title: string;
    avatar: string;
    description: string;
}
export default defineComponent({
    name:'ColumnList',
    props:{
        list:{
            type:Array as PropType<ColumnProps[]>,
            required:true
        }
    }
})
</script>
```
```js
<script lang="ts">
import { ResourceOption } from "@/entities/resource";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    data: {
      type: Object as PropType<ResourceOption>
    }
  }
});
</script>
```
#### 2.axios数据类型配置
详细见上面[Axios配置及接口数据类型定义](#axios配置及接口数据类型定义)

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

```
```js
//main.ts 使用

import { createApp } from 'vue'
import { vantPlugins } from './plugins/vant'

createApp(App)
  ...//其他配置
  .use(vantPlugins)
  .mount('#app')

```

## vant主题色

- 样式变量
[官方配置文件](https://github.com/youzan/vant/blob/dev/src/style/var.less)
```less
//详见/src/theme/var.less
// Color Palette
@black: #000;
@white: #fff;
@gray-1: #f7f8fa;
@gray-2: #f2f3f5;
@gray-3: #ebedf0;
@gray-4: #dcdee0;
@gray-5: #c8c9cc;
@gray-6: #969799;
@gray-7: #646566;
@gray-8: #323233;
@red: #ee0a24;
@blue: #1989fa;
@orange: #ff976a;
@orange-dark: #ed6a0c;
@orange-light: #fffbe8;
@green: #07c160;
@green1:#4fc08d;
// Gradient Colors
@gradient-red: linear-gradient(to right, #ff6034, #ee0a24);
@gradient-orange: linear-gradient(to right, #ffd01e, #ff8917);

// Component C
```
- 1.引入样式文件
新增上述文件，并引入，由于上面vant配置中已经引入了，我们要调整一下指定样式的路径
```js
//vue.config.js
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
                // --> 指定样式的路径
                style: name => `${name}/style/less`
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

- 2.修改样式变量
```js
//vue.config.js
module.exports = {
  ...
  css: {
    loaderOptions: {
      //配置less主题
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
    }
  }
}


```

## 关于样式穿透

以往的样式穿透方法`>>>`和`/deep/`在vue3中会报一下警告信息
```the ＞＞＞ and /deep/ combinators have been deprecated. Use :deep() instead```
可以改为
```css
// 第一种
:v-deep .ant-table-tbody > tr > td,
:v-deep .ant-table-thead > tr > th {
	vertical-align: middle !important;
}
// 第二种
::v-deep(.ant-table-tbody > tr > td),
::v-deep(.ant-table-thead > tr > th) {
	vertical-align: middle !important;
}
// 第三种
:v-deep(.ant-table-tbody > tr > td),
:v-deep(.ant-table-thead > tr > th) {
	vertical-align: middle !important;
}
// 第四种
:deep(.ant-table-tbody > tr > td),
:deep(.ant-table-thead > tr > th) {
	vertical-align: middle !important;
}
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
- 问题分析：有些手机的屏幕分辨率较高，是2-3倍屏幕。css样式中border:1px solid red;在2倍屏下，显示的并不是1个物理像素，而是2个物理像素。解决方案如下：
- 利用 css 的 伪元素::after + transfrom 进行缩放
为什么用伪元素？ 因为伪元素::after或::before是独立于当前元素，可以单独对其缩放而不影响元素本身的缩放
>伪元素大多数浏览器默认单引号也可以使用，和伪类一样形式，而且单引号兼容性（ie）更好些
>我是用scss写的mixins，其他与编译器道理道理都差不多
```scss
/*单条border样式*/
@mixin border-1px ($color, $direction) {
  position: relative;
  border: none;
  &::after{
    content: '';
    position: absolute;
    background: $color;
    @if $direction == left {
      left: 0;
      top: 0;
      height: 100%;
      width: 2px;
      transform: scaleX(0.5);
      transform-origin: left 0;
    }
    @if $direction == right {
      right: 0;
      top: 0;
      height: 100%;
      width: 2px;
      transform: scaleX(0.5);
      transform-origin: right 0;
    }
    @if $direction == bottom {
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      transform: scaleY(0.5);
      transform-origin: 0 bottom;
    }
    @if $direction == top {
      top: 0;
      left: 0;
      width: 100%;
      height: 2px;
      transform: scaleY(0.5);
      transform-origin: 0 top;
    }
  }
}

/*四条border样式*/
@mixin all-border-1px ($color, $radius) {
  position: relative;
  border: none;
  &::after{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    border: 2px solid $color;
    border-radius: $radius * 2;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 200%;
    height: 200%;
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
    -webkit-transform-origin: left top;
    transform-origin: left top;
  }

}
```
- 使用
```scss
@import "@assets/style/mixin.scss";//引入

.box{
  @include all-border-1px(#eeeeee, 0); //使用
}
```

## vuex的配置与使用
- Vuex
>这边要注意的是 `const store = useStore()` ，它的定义要写在setup中的外层，不要定义到某个方法里面，不然执行的时候获取不到
```js
import { toRefs, reactive } from "vue";
import { useStore } from "vuex";
export default {

  setup() {
    const state = reactive({
      name: ''
    })  
    const store = useStore()

    state.name = store.state.Name

    return {
      ...toRefs(state)
    }
  }
};
```

- 替代方案 provide、inject 
> 声明一次，全局可访问,将需要共享的数据事先在 Vue 的根节点 App.vue 中通过 provide 声明。
首先建立一个store
```ts
// src/store/store.ts
const planList = Symbol()
export default {
  planList,
}
```
在外层组件注入，比如 App.vue 中 provide
```ts
// src/App.vue
<script lang="ts">
import Store from "./store/store"

import { defineComponent, provide, ref } from "@vue/composition-api"
export default defineComponent({
  setup() {
    provide(Store.planList, ref([]))
  }
})
</script>
```
在需要的组件内inject接受
```ts
// src/views/Plan.vue
<script lang="ts">
import Store from "./store/store"

import { defineComponent, provide, ref } from "@vue/composition-api"
export default defineComponent({
  setup() {
    const planList = inject(Store.planList)
    return {
      planList
    }
  }
})
</script>

```
## vue路由配置和缓存
- keep-alive写法改变
```html

 <router-view v-slot="{ Component }">
  <keep-alive>
    <component :is="Component" />
  </keep-alive>
</router-view>
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

## 发布&部署

- 网站工具：https://vercel.com/
- 用github账号登录（我项目是部署在guthub上的）
- 点击import project -> import git repository
- 输入自己的项目的git地址 https://xxx/xxx/xxx
- 点击continue就会自动部署啦！部署好后会生成地址可以直接访问🍾


## 关于我
![Image text](https://gitee.com/zhan961023/vue-admin-preview/blob/typescript_dev/public/me.png)
加我微信，邀你进入技术交流群，交流学习 😄 共同进步<br>
如果喜欢请给我一个小♥♥ ⭐ （づ￣3￣）づ

## 感谢
[vue-h5-template](https://github.com/sunniejs/vue-h5-template)
