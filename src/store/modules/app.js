import Cookies from 'js-cookie'
import {
  getToken
} from "@/utils/auth";

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus'),
      withoutAnimation: false
    },
    projectId: getToken('SiteId'),
    origin: 'http://172.16.22.85:3000',
    // cdnurl: `http://172.16.22.85:3000`,
    device: 'desktop',
    language: Cookies.get('language') || 'zh',
    size: Cookies.get('size') || 'medium'
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
    },
    SET_PROJECT_ID: (state, id) => {
      console.log('SET_PROJECT_ID')

      state.projectId = id
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 1)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    SET_LANGUAGE: (state, language) => {
      state.language = language
      Cookies.set('language', language)
    },
    SET_SIZE: (state, size) => {
      state.size = size
      Cookies.set('size', size)
    }
  },
  actions: {
    toggleSideBar({
      commit
    }) {
      commit('TOGGLE_SIDEBAR')
    },
    closeSideBar({
      commit
    }, {
      withoutAnimation
    }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    toggleDevice({
      commit
    }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    setLanguage({
      commit
    }, language) {
      commit('SET_LANGUAGE', language)
    },
    setSize({
      commit
    }, size) {
      commit('SET_SIZE', size)
    },
    setProject({
      commit
    }, id) {
      console.log('setProject')
      commit('SET_PROJECT_ID', id)
    }
  }
}

export default app
