import { RouteLocationRaw } from "vue-router";
import i18n from "@/plugins/i18n";

const t = i18n.global.t;

export interface IMenu {
  heading: string;
  route: RouteLocationRaw;
  svgIcon?: string;
  meta?: {
    role: string[];
  };
  withCount?: boolean;
  countName?: string;
  sub?: IMenu[];
}

export const menu: IMenu[] = [
  {
    heading: t("posts"),
    route: "/posts",
    svgIcon: "icon-main",
  },
  {
    heading: t("alboms"),
    route: "/alboms",
    svgIcon: "icon-plugin",
  },
  {
    heading: t("todos"),
    route: "/todos",
    svgIcon: "icon-user",
  },
];
