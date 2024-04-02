import { RouteRecordRaw } from "vue-router";

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: "/albums",
    name: "albums",
    meta: {
      layout: "default",
    },
    component: () => import("@/modules/Albums/pages/PIndex.vue"),
  },
];

export default routes;
