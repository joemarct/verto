import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from '../assets/locales/en.json'
import fr from '../assets/locales/fr.json'

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: 'fr', // set locale
  fallbackLocale: 'en',
  messages: { fr } // set locale messages
})

Vue.prototype.$locale = {
  change (language) {
    i18n.locale = language;
  },
  current () {
    return i18n.locale;
  }
}
