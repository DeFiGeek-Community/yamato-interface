import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

// 言語jsonファイルのimport
import translation_en from './en.json';
import translation_ja from './ja.json';

const resources = {
  ja: {
    translation: translation_ja,
  },
  en: {
    translation: translation_en,
  },
};

i18next.use(initReactI18next).init({
  resources,
  lng: 'ja',
  preload: ['ja'],
  interpolation: { escapeValue: false },
});

export default i18next;
