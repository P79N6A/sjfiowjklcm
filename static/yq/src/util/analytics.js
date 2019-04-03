/**
 * 本项目为，vue+router，直接在html插入分析代码，无法准确分析页面间的跳转
 * 必须在路由进入后执行，防止因为出错影响页面正常浏览
 * David
 * @param {string} url
 */
export const pageview = url => {
  // 谷歌分析
  try {
    if (window.ga) {
      window.ga('send', 'pageview', url)
    }
    // 百度分析
    if (window._hmt) {
      window._hmt.push(['_trackPageview', url])
    }
    // 站长分析
    if (window._czc) {
      window._czc.push(['_trackPageview', url])
    }
    // console.log('pageview ok!')
  } catch (err) {
    console.error(err)
  }
}
