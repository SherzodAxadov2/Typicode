import { useCustomToast } from "@/composables/useCustomToast";
import { useI18n } from "vue-i18n";

export const useHandleError = () => {
  const { showToast } = useCustomToast();
  const { t } = useI18n();

  function handleError(error: any) {
    if (error?.data) {
      try {
        if (!error?.data?.errors?.length) {
          showToast(error?.data[0]?.error?.message, "error");
        } else {
          showToast(error?.data?.errors[0]?.message, "error");
        }
      } catch {
        showToast(t("error"), "error");
      }
    } else if (error?.response?.data) {
      try {
        if (!error?.response?.data?.errors?.length) {
          showToast(error?.response?.data[0]?.error?.message, "error");
        } else {
          showToast(error?.response?.data?.errors[0]?.message, "error");
        }
      } catch {
        showToast(t("error"), "error");
      }
    }
  }

  return { handleError };
};
