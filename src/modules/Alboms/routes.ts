import { RouteRecordRaw } from "vue-router";

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: "/alboms",
    name: "alboms",
    meta: {
      layout: "default",
    },
    component: () => import("@/modules/Alboms/pages/PIndex.vue"),
  },
];

export default routes;
