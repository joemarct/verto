import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from '../assets/locales/en.json'
import fr from '../assets/locales/fr.json'

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: 'en', // set locale
  fallbackLocale: 'en',
  messages: { en, fr } // set locale messages
})
