import { App as VM } from "vue";
import {
  Button,
  List,
  Cell,
  Tabbar,
  TabbarItem,
  Icon,
  NavBar,
  Field,
  Popover,
  ActionSheet,
  Uploader,
  Swipe,
  SwipeItem,
  Tab,
  Tabs,
  SwipeCell,
  Empty
} from "vant";

const plugins = [
  Button,
  List,
  Cell,
  Tabbar,
  TabbarItem,
  Icon,
  NavBar,
  Field,
  ActionSheet,
  Uploader,
  Popover,
  Tab,
  Tabs
];

const useComponents = [Swipe, SwipeItem, SwipeCell, Empty];
export const vantPlugins = {
  install: function(vm: VM) {
    plugins.forEach(item => {
      vm.component(item.name, item);
    });
    useComponents.forEach(item => {
      vm.use(item);
    });
  }
};
