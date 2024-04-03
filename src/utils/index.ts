import i18n from "@/plugins/i18n";
import { TErrors } from "@/types/common";
import { useCustomToast } from "@/composables/useCustomToast";

const { t } = i18n.global;

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
        console.log(e);
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
