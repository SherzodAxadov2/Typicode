import { IActionType } from "@/modules/Albums/types";

export const modelHead = [
  {
    title: "№",
    key: "id",
  },
  {
    title: "title",
    key: "title",
  },
  {
    title: "user",
    key: "user",
  },
  {
    title: "actions",
    key: "actions",
  },
];

export const exchangeActions: IActionType[] = [
  {
    label: "edit",
    value: "edit",
    icon: "icon-edit text-gray-200",
    class: "!text-dark hover:bg-gray/90",
  },
  {
    label: "delete",
    value: "deleteExchange",
    icon: "icon-trash !text-red",
    class: "hover:!bg-red/20 !text-red",
  },
];
