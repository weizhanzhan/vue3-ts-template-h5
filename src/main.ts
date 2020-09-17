import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { vantPlugins } from "./plugins/vant";
import { globalPlugins } from "./plugins/global";
import "./assets/style/reset.scss";
createApp(App)
  .use(store)
  .use(router)
  .use(globalPlugins)
  .use(vantPlugins)
  .mount("#app");
