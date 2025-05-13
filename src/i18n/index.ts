import { createI18n } from 'vue-i18n'
import EN from './en'
import CN from './zh-cn'
import TW from './zh-tw'

const messages = {
  en: {
    ...EN
  },
  'zh-cn': {
    ...CN
  },
  'zh-tw': {
    ...TW
  }
}

const getCurrentLanguage = () => {
  //设置
  const UAlang = navigator.language // zh-CN
  const langCode =
    localStorage.getItem('language') === null
      ? UAlang.indexOf('CN') !== -1
        ? 'zh-cn'
        : 'en'
      : localStorage.getItem('language') ?? 'zh-cn'
  localStorage.setItem('language', langCode)
  return langCode
}

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: getCurrentLanguage(), //去getCurrentLanguage函数找有没有设置的语言,默认选择zh
  messages: messages
})

export default i18n
