import { createI18n } from 'vue-i18n'
import { getStorage } from '@/utils/index'
import enLocale from './en'
import cnLocale from './cn'
import zhcnLocale from './zhcn'
import korcnLocale from './korean'
import japcnLocale from './Japanese'
import Deutsch from './Deutsch'
import fr from './fa'
import vi from './vi'
import th from './th'
import gr from './Greek'
import Italy from './Italy'
import SpanishLocal from './Spanish'
import PortugueseLocal from './Portuguese'
const lang = getStorage('lang') || 'en'

const messages = {
  'en': {
    ...enLocale
  },
  'CN': {
    ...cnLocale
  },
  'zh-CN': {
    ...zhcnLocale
  },
  'Korean': {
    ...korcnLocale
  },
  'Japanese': {
    ...japcnLocale
  },
  'de': {
    ...Deutsch
  },
  'fr': {
    ...fr
  },
  'vi': {
    ...vi
  },
  'th': {
    ...th
  },
  'Italy': {
    ...Italy
  },
  'es': {
    ...SpanishLocal
  },
  'pt': {
    ...PortugueseLocal
  },
 'gr':{
    ...gr
 }
}


const i18n = createI18n({
  legacy: false,
  locale: lang, // 首先从缓存里拿，没有的话就用浏览器语言，
  fallbackLocale: 'en', // 设置备用语言
  messages,
})

export default i18n