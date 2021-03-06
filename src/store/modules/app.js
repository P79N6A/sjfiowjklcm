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
    projectName: getToken('SiteName'),
    projectId: getToken('SiteId'),
    origin: 'http://localhost:3000',
    cdnurl: `http://localhost:3000`,
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
    SET_PROJECT_NAME: (state, name) => {
      state.projectName = name
    },
    SET_PROJECT_ID: (state, id) => {
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
      commit('SET_PROJECT_ID', id)
    },
    setProjectName({
      commit
    }, name) {
      commit('SET_PROJECT_NAME', name)
    }
  }
}

export default app
