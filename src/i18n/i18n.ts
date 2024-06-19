/* eslint-disable import/no-named-as-default-member */
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// components
import HOME_EN from 'src/locales/en/home.json'
import PRODUCT_EN from 'src/locales/en/product.json'
import HOME_VI from 'src/locales/vi/home.json'
import PRODUCT_VI from 'src/locales/vi/product.json'

export const locales = {
  en: 'English',
  vi: 'Tiếng Việt'
} as const

const resources = {
  en: {
    home: HOME_EN,
    product: PRODUCT_EN
  },
  vi: {
    // nameSpace default is translate
    //Tự tạo ns riêng để khi có nhiều page và component để dễ quản lý
    home: HOME_VI,
    product: PRODUCT_VI
  }
} as const

export const defaultNS = 'home'

i18n.use(initReactI18next).init({
  resources,
  lng: 'vi',
  fallbackLng: 'vi',
  // NS tự tạo thì phải khai báo và cả khai báo defaultNS
  ns: ['home', 'product'],
  defaultNS,
  interpolation: {
    escapeValue: false // react already safes from xss
  }
})

export default i18n
