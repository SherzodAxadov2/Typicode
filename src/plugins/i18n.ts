import { createI18n } from "vue-i18n";

import ru from "@/languages/ru.json";
import en from "@/languages/en.json";

const messages = {
  ru: ru,
  en: en,
};

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: localStorage.getItem("locale") || "en",
  messages,
});

export default i18n;
