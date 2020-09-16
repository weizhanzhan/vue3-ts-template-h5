import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import App from "../App.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    redirect: "/home",
    component: App,
    children: [
      {
        path: "/home",
        component: import(/* webpackChunkName: "about" */ "../views/Home.vue")
      }
    ]
  },
  {
    path: "/vuex",
    component: import(/* webpackChunkName: "vuex" */ "../views/vuex/index.vue")
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
