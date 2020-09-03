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
