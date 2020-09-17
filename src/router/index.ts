import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import App from "../App.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: App,
    children: [
      {
        path: "",
        redirect: "/home",

        component: import(
          /* webpackChunkName: "layout" */ "../views/layout/index.vue"
        ),
        children: [
          {
            path: "home",
            component: import(
              /* webpackChunkName: "about" */ "../views/Home.vue"
            )
          },
          {
            path: "about",
            name: "About",
            component: import(
              /* webpackChunkName: "about" */ "../views/About.vue"
            )
          }
        ]
      }
    ]
  },
  {
    path: "/vuex",
    component: import(/* webpackChunkName: "vuex" */ "../views/vuex/index.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
