import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import en from './static/locales/en.json';
import pl from './static/locales/pl.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false;
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: 'pl',
    returnNull: false,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: en,
      },
      pl: {
        translation: pl,
      },
    },
  });

export default i18n;
