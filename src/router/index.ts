import {
  createRouter,
  createWebHistory,
  Router,
  RouteRecordRaw
} from "vue-router";

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
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// const routerPush = router.push;
// router.push = function(to) {
//   console.log("路由拦截push");
//   return routerPush.call(this, to).catch(error => error);
// };

// router.back = function() {
//   console.log("路由拦截back");
//   return router.go(-1);
// };
import provideStore from "@/utils/provideStore";
function RouterStack(router: Router) {
  // const stack = [];
  router.afterEach((to, from) => {
    console.log(to, from);
    console.log(provideStore.planList.value);
  });
  return router;
}

RouterStack(router);

export default router;
