import * as pkg from "vue-toastification";
import CommonToast from "@/components/CToast.vue";

const { useToast } = pkg;

export const useCustomToast = () => {
  const toast = useToast();

  const showToast = (
    title: string,
    type: "success" | "error" | "warning" | "info"
  ) => {
    toast(
      {
        component: CommonToast,
        props: {
          title,
          type,
        },
      },
      {
        timeout: 3000,
        draggable: true,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      }
    );
  };

  return { showToast };
};
