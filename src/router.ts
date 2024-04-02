import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Posts from "@/modules/Posts/routes";
import Albums from "@/modules/Albums/routes";
import Todos from "@/modules/Todos/routes";

const routes: Array<RouteRecordRaw> = [
  ...Albums,
  ...Todos,
  ...Posts,
  {
    path: "/:pathMatch(.*)*",
    meta: {
      layout: "error",
    },
    component: () => import("@/layout/Error/LError.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  if (to.path === "/") {
    return { name: "PPosts" };
  } else return true;
});
export default router;
