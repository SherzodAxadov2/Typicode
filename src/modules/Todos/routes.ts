import { RouteRecordRaw } from "vue-router";

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: "/todos",
    name: "todos",
    meta: {
      layout: "default",
    },
    component: () => import("@/modules/Todos/pages/PIndex.vue"),
  },
];

export default routes;
