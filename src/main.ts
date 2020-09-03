import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { vantPlugins } from "./plugins/vant";

createApp(App)
  .use(store)
  .use(router)
  .use(vantPlugins)
  .mount("#app");
