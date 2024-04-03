import { RouteRecordRaw } from "vue-router";

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: "/albums",
    name: "PAlbums",
    meta: {
      layout: "default",
    },
    component: () => import("@/modules/Albums/pages/PIndex.vue"),
  },

  {
    path: "/albums/:id",
    name: "PAlbumsSingle",
    meta: {
      layout: "default",
    },
    component: () => import("@/modules/Albums/pages/PSingle.vue"),
  },
];

export default routes;
