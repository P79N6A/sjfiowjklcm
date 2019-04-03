// 滚动，准备移除
export const scrolltool = {
  data() {
    return {
      timer: false,
      iSpeed: 100
    }
  },
  methods: {
    scrollTo(iTarget) {
      clearInterval(this.timer)
      let scrollElm = null
      // 兼容性处理
      if (document.documentElement && document.documentElement.scrollTop) {
        scrollElm = document.documentElement.scrollTop
      } else if (document.body) {
        scrollElm = document.body.scrollTop
      }
      const that = this
      // 缓冲滚动
      this.timer = setInterval(function() {
        that.iSpeed = (iTarget - scrollElm) / 4
        if (that.iSpeed > -1 && that.iSpeed < 1) {
          clearInterval(that.timer)
        } else {
          scrollElm += that.iSpeed
          window.scroll(0, scrollElm)
        }
      }, 60)
    }
  }
}
