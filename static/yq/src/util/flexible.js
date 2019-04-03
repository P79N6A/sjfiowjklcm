// flexible适配方案
(function(win, lib) {
  //  定义变量
  const doc = win.document || window.document
  const docEl = doc.documentElement
  let metaEl = doc.querySelector('meta[name="viewport"]')
  const flexibleEl = doc.querySelector('meta[name="flexible"]')
  let dpr = 1 // dpr值
  let scale = 1 // 缩放比例
  let tid
  const flexible = lib.flexible || (lib.flexible = {})
  if (metaEl) {
    //  根据已有的meta标签来设置缩放比例
    var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/)
    if (match) {
      scale = parseFloat(match[1])
      dpr = parseInt(1 / scale)
    }
  } else if (flexibleEl) {
    //  未设置viewport
    const content = flexibleEl.getAttribute('content')
    if (content) {
      const initialDpr = content.match(/initial\-dpr=([\d\.]+)/)
      const maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/)
      if (initialDpr) {
        dpr = parseFloat(initialDpr[1])
        scale = parseFloat((1 / dpr).toFixed(2))
      }
      if (maximumDpr) {
        dpr = parseFloat(maximumDpr[1])
        scale = parseFloat((1 / dpr).toFixed(2))
      }
    }
  }
  /**
   * 当原先没有设置过meta，以及缩放比例
   * iphone手机根据2，3倍屏幕处理
   * 其他设备下，仍旧使用1倍的方案，得到dpr和scale的值
   *  */

  if (!dpr && !scale) {
    const isAndroid = win.navigator.appVersion.match(/android/gi)
    const isIPhone = win.navigator.appVersion.match(/iphone/gi)
    const devicePixelRatio = win.devicePixelRatio
    if (isIPhone) {
      if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
        dpr = 3
      } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
        dpr = 2
      } else {
        dpr = 1
      }
    } else {
      // 其他设备，仍旧使用1倍的方案
      dpr = 1
    }
    scale = 1 / dpr
  }
  /** 设置html的data-dpr的值 */
  docEl.setAttribute('data-dpr', dpr)
  /** scale
   * 查询有没有meta属性，没有的情况下加上<meta content='initial-scale=scale,maximum-scale=scale,minimum-scale=scale,user-scalable=no'/>
   */
  if (!metaEl) {
    metaEl = doc.createElement('meta')
    metaEl.setAttribute('name', 'viewport')
    metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no')
    if (docEl.firstElementChild) {
      docEl.firstElementChild.appendChild(metaEl)
    } else {
      var wrap = doc.createElement('div')
      wrap.appendChild(metaEl)
      doc.write(wrap.innerHTML)
    }
  }
  /**
   * 这个width和dpr有关系
   * 例如：iphone dpr为2，得到的屏幕宽度为640px；
   *    iphone6 plus dpr 为3，得到的屏幕宽度为1242px
   */
  function refreshRem() {
    let width = docEl.getBoundingClientRect().width
    // 注意这里，这里是适配手机的一个具体的参数，相对大于540的就不适用了
    if (width / dpr > 540) {
      width = 540 * dpr
    }
    var rem = width / 10
    docEl.style.fontSize = rem + 'px'
    flexible.rem = win.rem = rem
  }
  win.addEventListener('resize', function() {
    clearTimeout(tid)
    tid = setTimeout(refreshRem, 300)
  }, false)
  win.addEventListener('pageshow', function(e) {
    if (e.persisted) {
      clearTimeout(tid)
      tid = setTimeout(refreshRem, 300)
    }
  }, false)
  if (doc.readyState === 'complete') {
    doc.body.style.fontSize = 12 * dpr + 'px'
  } else {
    doc.addEventListener('DOMContentLoaded', function(e) {
      doc.body.style.fontSize = 12 * dpr + 'px'
    }, false)
  }
  refreshRem()
  /* *
   * rem转px
   * px转rem
   * */
  flexible.dpr = win.dpr = dpr
  flexible.refreshRem = refreshRem
  flexible.rem2px = function(d) {
    var val = parseFloat(d) * this.rem
    if (typeof d === 'string' && d.match(/rem$/)) {
      val += 'px'
    }
    return val
  }
  flexible.px2rem = function(d) {
    var val = parseFloat(d) / this.rem
    if (typeof d === 'string' && d.match(/px$/)) {
      val += 'rem'
    }
    return val
  }
})(window, window['lib'] || (window['lib'] = {}))
