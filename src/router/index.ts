import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import TabsPage from "../views/TabsPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "",
    redirect: "tab1",
  },
  {
    path: "",
    component: TabsPage,
    children: [
      {
        path: "",
        redirect: "tab1",
      },
      {
        path: "tab1",
        component: () => import("@/views/Tab1Page.vue"),
      },
      {
        path: "tab1/:id",
        component: () => import("@/views/MovieDetails.vue"),
      },
      {
        path: "tab2",
        component: () => import("@/views/Tab2Page.vue"),
      },
      {
        path: "tab2/:id",
        component: () => import("@/views/MovieDetails.vue"),
      },
      {
        path: "tab3",
        component: () => import("@/views/Tab3Page.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
