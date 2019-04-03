// localStorage和sessionStorage、cookie工具配置
let $localStorage = false
let  $sessionStorage = false
let  _localStorage = window.localStorage
let  _sessionStorage = window.sessionStorage

const $cookie = {
  set(key, val, time = 365) {
    document.cookie = key + '=' + escape(val) + ((time == null) ? '' : ';expires=' + new Date().addDay(expiredays).toGMTString())
  },
  get(key) {
    if (document.cookie.length > 0) {
      let arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
      if (arr = document.cookie.match(reg)) {
        return window.unescape(arr[2])
      } else return null
    }
    return null
  },
  has: function(key) {
    return this.get(key) != null
  },
  remove(key) {
    var exp = new Date()
    exp.setTime(exp.getTime() - 1)
    var cval = $cookie.get(key)
    if (cval != null) {
      document.cookie = key + '=' + cval + ';expires=' + exp.toGMTString()
    }
  },
  clear() {
    /* 获取cookie参数*/
    const getCookie = document.cookie.replace(/[ ]/g, '') // 获取cookie，并且将获得的cookie格式化，去掉空格字符
    var arrCookie = getCookie.split(';') // 将获得的cookie以"分号"为标识 将cookie保存到arrCookie的数组中
    for (var i = 0; i < arrCookie.length; i++) { // 使用for循环查找cookie中的tips变量
      $cookie.remove(arrCookie[i].split('=')[0])
    }
  }
}

if (!window.localStorage) {
  // $localStorage=$cookie;
  console.log('不浏览器支持')
} else {
  $localStorage = {
    set: function(key, val) {
      try {
        return _localStorage.setItem(key, val)
      } catch (e) {}
    },
    get: function(key) {
      return _localStorage.getItem(key)
    },
    has: function(key) {
      return this.get(key) !== undefined
    },
    remove: function(key) {
      return _localStorage.removeItem(key)
    },
    clear: function() {
      return _localStorage.clear()
    }
  }
}
if (!window.sessionStorage) {
  // $localStorage=$cookie;
  console.log('不浏览器支持')
} else {
  $sessionStorage = {
    set: function(key, val) {
      try {
        return _sessionStorage.setItem(key, val)
      } catch (e) {
        console.log(e)
      }
    },
    get: function(key) {
      return _sessionStorage.getItem(key)
    },
    has: function(key) {
      return this.get(key) !== undefined
    },
    remove: function(key) {
      return _sessionStorage.removeItem(key)
    },
    clear: function() {
      return _sessionStorage.clear()
    }
  }
}
export {
  $localStorage,
  $sessionStorage,
  $cookie
}
