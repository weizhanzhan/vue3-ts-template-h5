import { createStore } from "vuex";
// import modules from "./modules";
import user, { UserState } from "./modules/user";
import demo from "./modules/demo";
export default createStore<{ user: UserState }>({
  modules: {
    demo,
    user
  }
});
