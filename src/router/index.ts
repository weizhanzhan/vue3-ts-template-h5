import { useRandomName } from "./../utils/utils";

import {
  createRouter,
  createWebHistory,
  Router,
  RouteRecordRaw
} from "vue-router";
import store from "../store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "LAYOUT",
    redirect: "/home",
    component: () =>
      import(/* webpackChunkName: "layout" */ "../views/layout/index.vue"),
    children: [
      {
        path: "home",
        name: "HOME",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Home.vue")
      },
      {
        path: "about",
        name: "ABOUT",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue")
      }
    ]
  },
  {
    path: "/shop",
    name: "SHOP",
    component: () =>
      import(/* webpackChunkName: "SHOP" */ "../views/shop/index.vue")
  },
  {
    path: "/vuex",
    name: "VUEX",
    component: () =>
      import(/* webpackChunkName: "vuex" */ "../views/vuex/index.vue")
  },
  {
    path: "/message",
    name: "MESSAGE",
    component: () =>
      import(/* webpackChunkName: "message" */ "../views/message/index.vue")
  },
  {
    path: "/form",
    name: "FORM",
    component: () =>
      import(/* webpackChunkName: "form" */ "../views/message/form.vue")
  },
  {
    path: "/video",
    name: "Video",
    component: () =>
      import(/* webpackChunkName: "video" */ "../views/video/index")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

function RouterStack(router: Router) {
  // const stack = [];
  router.afterEach((to, from) => {
    if (!store.state.user.loginUser) {
      store.commit("setUserInfo", useRandomName());
    }

    console.log(to, from);
  });
  return router;
}

RouterStack(router);

export default router;
