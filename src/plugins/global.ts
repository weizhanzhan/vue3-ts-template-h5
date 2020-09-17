import { App as VM } from "vue";
import AppContainer from "@/components/AppContainer/index.vue";
const plugins = [AppContainer];

export const globalPlugins = {
  install: function(vm: VM) {
    plugins.forEach(item => {
      vm.component(item.name, item);
    });
  }
};
