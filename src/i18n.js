import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import translationEN from './locales/en/translation.json';
import translationDE from './locales/de/translation.json';
import translationPL from './locales/pl/translation.json';

const resources = {
    en: {
        translation: translationEN
    },
    de: {
        translation: translationDE
    },
    pl: {
        translation: translationPL
    }
};

i18n
    .use(detector)
    .use(initReactI18next)
    .init({
        resources,
        lng: navigator.language,
        fallbackLng: "en",

        keySeparator: false,

        interpolation: {
            escapeValue: false
        }
    });

export default i18n;