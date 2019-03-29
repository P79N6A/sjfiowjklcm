/**
 * 多语言配置
 * 暂时未用到，无需引入
*/
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { $localStorage } from '@/util/storage'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang
import enLocale from './en'
import zhLocale from './zh'

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  }
}

const i18n = new VueI18n({
  locale: $localStorage.get('language') || 'zh', // set locale
  messages // set locale messages
})

export default i18n
