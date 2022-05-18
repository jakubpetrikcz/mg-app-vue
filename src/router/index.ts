import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import TabsPage from "../views/TabsPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: TabsPage,
    children: [
      {
        path: "",
        redirect: "home",
      },
      {
        path: "home",
        component: () => import("@/views/Home.vue"),
      },
      {
        path: "home/:id",
        component: () => import("@/views/MovieDetails.vue"),
      },
      {
        path: "search",
        component: () => import("@/views/Search.vue"),
      },
      {
        path: "search/:id",
        component: () => import("@/views/MovieDetails.vue"),
      },
      {
        path: "watchlist",
        component: () => import("@/views/Watchlist.vue"),
      },
      {
        path: "watchlist/:id",
        component: () => import("@/views/MovieDetails.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
