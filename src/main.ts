import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { vantPlugins } from "./plugins/vant";
import Bmob, { globalPlugins } from "./plugins/global";
import "./assets/style/reset.less";
import "./assets/style/global.less";
import { Toast } from "vant";
const app = createApp(App);
app.config.globalProperties.$bmob = Bmob;
app.config.globalProperties.$toast = Toast;

app
  .use(Toast)
  .use(store)
  .use(router)
  .use(globalPlugins)
  .use(vantPlugins)
  .mount("#app");
