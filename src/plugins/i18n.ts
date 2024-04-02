import { createI18n } from "vue-i18n";

import ru from "@/languages/ru.json";
import uz from "@/languages/uz.json";

const messages = {
  ru: ru,
  uz: uz,
};

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: localStorage.getItem("locale") || "ru",
  messages,
});

export default i18n;
