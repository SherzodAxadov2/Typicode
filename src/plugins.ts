import "vue-toastification/dist/index.css";

import { App } from "vue";
import Toast from "vue-toastification";
import CommonToast from "@/components/CToast.vue";
import apiService from "@/services/ApiService";
import Maska from "maska";
import { createPinia } from "pinia";
export default function definePlugins(app: App): App {
  apiService.init(app);

  const pinia = createPinia();

  //Toast Notification
  const options = {
    position: "top-right",
    timeout: 3000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: false,
    icon: true,
    rtl: false,
    maxToasts: 3,
    newestOnTop: true,
    component: CommonToast,
  };
  app.use(pinia);
  app.use(Maska);
  app.use(Toast, options);
  return app;
}
