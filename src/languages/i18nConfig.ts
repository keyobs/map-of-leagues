import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import i18nEN from './en.js';
import i18nES from './es.js';
import i18nFR from './fr.js';

type TLocale = 'en' | 'fr' | 'es';

const resources = {
    en: {
        translation: i18nEN,
    },
    fr: {
        translation: i18nFR,
    },
    es: {
        translation: i18nES,
    },
};

i18n.use(initReactI18next).use(LanguageDetector).init({
    compatibilityJSON: 'v3',
    debug: false,
    resources,
    fallbackLng: 'en',
});

export default i18n;
