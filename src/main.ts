import { createApp } from "vue";
import App from "./App.vue";
import "@/assets/icomoon/style.css";
import "@/assets/styles/index.css";
import router from "./router";
import i18n from "@/plugins/i18n";
import definePlugins from "@/plugins";
export const app = createApp(App);

definePlugins(app);

app.use(router);
app.use(i18n);

app.mount("#app");
