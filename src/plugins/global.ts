import { App as VM } from "vue";
import AppContainer from "@/components/AppContainer/index.vue";
import Bmob from "hydrogen-js-sdk";

const plugins = [AppContainer];
Bmob.initialize("f810791189670320", "123456");
export default Bmob;
export const globalPlugins = {
  install: function(vm: VM) {
    plugins.forEach(item => {
      vm.component(item.name, item);
    });
  }
};
