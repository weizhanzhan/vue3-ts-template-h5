import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "LAYOUT",
    component: () =>
      import(/* webpackChunkName: "layout" */ "../views/layout/index.vue"),
    children: [
      {
        path: "HOME",
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
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
