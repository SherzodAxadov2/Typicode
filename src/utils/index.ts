import router from "@/router";

import i18n from "@/plugins/i18n";
import { TErrors } from "@/types/common";
import { useCustomToast } from "@/composables/useCustomToast";

const { t } = i18n.global;

export function formatMoneyDecimal(number: any, fix = 0, option = "decimal") {
  let style: string;
  if (["USD", "RUB"].includes(option)) {
    style = "currency";
  } else if (["kilogram", "meter", "percent"].includes(option)) {
    style = "unit";
  } else {
    style = "";
  }

  const newStyle: string = style;
  const option2 = {
    newStyle, //  unit currency percent decimal
    [newStyle]: option,
    maximumFractionDigits: fix,
    minimumFractionDigits: fix,
  };
  return number ? new Intl.NumberFormat("ru-RU", option2).format(number) : "0";
}

export function formatPhoneNumber(number: string) {
  const format = number
    ?.replace(/\D/g, "")
    .match(/(\d{0,3})(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/);
  return `+${format && format[1] ? format[1] : ""}
          ${format && format[2] ? format[2] : ""}
          ${format && format[3] ? format[3] : ""}
          ${format && format[4] ? format[4] : ""} ${
    format && format[5] ? format[5] : ""
  }`;
}

export function convertBytes(bytes: number) {
  const units = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  let unitIndex = 0;
  while (bytes >= 1024 && unitIndex < units.length - 1) {
    bytes /= 1024;
    unitIndex++;
  }

  const unit = units[unitIndex];
  return bytes?.toFixed(2) + " " + unit;
}

export function formatTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  // Pad single-digit hours, minutes, and seconds with leading zeros if needed
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

  return `${formattedHours} часа, ${formattedMinutes} мин, ${formattedSeconds} сек`;
}

export function secondsToTime(seconds: number, isHours?: boolean) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const hoursStr = String(hours).padStart(2, "0");
  const minutesStr = String(minutes).padStart(2, "0");
  const secondsStr = String(remainingSeconds).padStart(2, "0");

  return isHours
    ? `${hoursStr}:${minutesStr}:${secondsStr}`
    : `${minutesStr}:${secondsStr}`;
}

const timeouts: { [key: string]: any } = {};

const cTimeout = (key = "key") => {
  if (timeouts[key]) {
    clearTimeout(timeouts[key]);
    timeouts[key] = undefined;
  }
};
// eslint-disable-next-line
export const debounce = (key = "key", fn = () => {}, timeout = 500) => {
  const sTimeout = (key: string, fn: any, timeout: number) => {
    cTimeout(key);

    timeouts[key] = setTimeout(() => {
      try {
        fn();
      } catch (e) {
        // console.log(e);
      }

      timeouts[key] = undefined;
    }, timeout);
  };

  return sTimeout(key, fn, timeout);
};

export function handleError(errors: TErrors) {
  const { showToast } = useCustomToast();
  try {
    const errorMessage = t(errors?.errors[0]?.message || t("error"));
    showToast(errorMessage, "error");
  } catch {
    showToast(t("error"), "error");
  }
}

export function formatDateRightOrder(date: string) {
  const dateObj = date.split(".");
  return `${dateObj[1]}.${dateObj[0]}.${dateObj[2]}`;
}

export function formatDuration(seconds: number) {
  const days = Math.floor(seconds / (3600 * 24));
  seconds %= 3600 * 24;
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const parts = [];

  if (days > 0) {
    parts.push(`${days} ${t("days")}`);
  }
  if (hours > 0) {
    parts.push(`${hours} ${t("hours")}`);
  }
  if (minutes > 0) {
    parts.push(`${minutes} ${t("minutes")}`);
  }
  if (remainingSeconds > 0) {
    parts.push(`${remainingSeconds.toFixed(1)} ${t("seconds")}`);
  }

  return parts.join(", ");
}

export function moneyMask() {
  return {
    mask: [
      "D",
      "D#",
      "D##",
      "D ###",
      "D# ###",
      "D## ###",
      "D ### ###",
      "D# ### ###",
      "D## ### ###",
      "D ### ### ###",
    ],
    tokens: {
      D: {
        pattern: /[1-9]/,
      },
    },
  };
}
