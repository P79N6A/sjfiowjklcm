import webp from './webp'

const install = function(Vue) {
  Vue.directive('webp', webp)
}

if (window.Vue) {
  window.webp = webp
  Vue.use(install); // eslint-disable-line
}

webp.install = install
export default webp
