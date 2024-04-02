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
    heading: t("main_page"),
    route: "/",
    svgIcon: "icon-main",
  },
  {
    heading: t("eez"),
    route: "/stations",
    svgIcon: "icon-plugin",
  },
  {
    heading: t("side_menu.users"),
    route: "/users",
    svgIcon: "icon-user",
    sub: [
      {
        heading: t("side_menu.all_users"),
        route: "/users",
      },
      {
        heading: t("side_menu.car_users"),
        route: "/users/cars",
      },
    ],
    meta: {
      role: ["super_admin"],
    },
  },
  {
    heading: t("side_menu.billing"),
    route: "/transaction",
    svgIcon: "icon-underline-cash",
    sub: [
      {
        heading: t("side_menu.all_transactions"),
        route: "/transaction",
      },
      {
        heading: t("side_menu.history_charging"),
        route: "/transaction/history",
      },
    ],
  },
  {
    heading: t("settings"),
    route: "",
    svgIcon: "icon-settings",
    sub: [
      {
        heading: t("mark"),
        route: "/settings/mark",
      },
      {
        heading: t("model"),
        route: "/settings/model",
      },
      {
        heading: t("type_chargers"),
        route: "/settings/charging-types",
      },
    ],
    meta: {
      role: ["super_admin"],
    },
  },
  {
    heading: t("notification"),
    route: "/notification",
    svgIcon: "icon-notification",
  },
];
