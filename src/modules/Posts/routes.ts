import { RouteRecordRaw } from "vue-router";

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: "/posts",
    name: "PPosts",
    meta: {
      layout: "default",
    },
    component: () => import("@/modules/Posts/pages/PIndex.vue"),
  },
];

export default routes;
