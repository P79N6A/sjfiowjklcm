const util = {
  htmlEncode(html) {
    return document.createElement('a').appendChild(
      document.createTextNode(html)).parentNode.innerHTML
  },
  htmlDecode(html) {
    var a = document.createElement('a')
    a.innerHTML = html
    return a.textContent
  },
  htmlEscape(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
  },
  htmlUnescape(str) {
    return str
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
  },
  // 获取url的search参数
  getQueryString(name) {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    const r = window.location.search.substr(1).match(reg)
    if (r != null) {
      return unescape(r[2])
    }
    return null
  },
  // 获取设备类型
  getMobileKind() {
    if (navigator.userAgent.match(/Android/i)) {
      return 'Android'
    }
    if (navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i)) {
      return 'IOS'
    }
    if (navigator.userAgent.match(/Windows Phone/i)) {
      return 'Windows Phone'
    }
    return 'other'
  },
  /**
   * 动态加载 动态加载script
   * @param array  多个js
   * @param callback 回调函数
   */
  loadScripts(array, callback) {
    const loader = function(src, handler) {
      const script = document.createElement('script')
      script.src = src
      script.onload = script.onreadystatechange = function() {
        script.onreadystatechange = script.onload = null
        handler()
      }
      var head = document.getElementsByTagName('head')[0];
      (head || document.body).appendChild(script)
    };
    (function run() {
      if (array.length != 0) {
        loader(array.shift(), run)
      } else {
        callback && callback()
      }
    })()
  },
  /**
   * 
   * @param {*} url 
   * @param {*} callback 
   * @param {*} outputFormat 
   */
  ImgToBase64(url, outputFormat) {
    return new Promise((resolve,reject)=>{
      let canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()
      img.crossOrigin = 'use-credentials'
      img.onload = () => {
        canvas.height = img.height
        canvas.width = img.width
        ctx.drawImage(img, 0, 0)
        const dataURL = canvas.toDataURL(outputFormat || 'image/png')
        canvas = null
        // alert(dataURL)
        return resolve(dataURL)
      }
      img.onerror=(err)=>{
        return reject(err)
      }
      img.src = url
    })
  }
}

export default util
