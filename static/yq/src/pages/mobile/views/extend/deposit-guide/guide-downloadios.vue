<template>
  <div>
    <tab></tab>
    <div class="tab-h"><h3>如何下载奇幻城国际手机APP：</h3></div>
    <div class="master-box">
        <div class="title-box">
            <span class="title-mobile">苹果手机下载方式</span>
            <router-link :to="{name:'guideDownload'}">
              <span class="title-pc">安卓手机下载方式</span>
            </router-link>
        </div>
        <h3>方法一：手机网页下载方式</h3>
        <p>使用手机浏览器登录奇幻城网站后，在‘首页’最底端横幅处点—点击下载APP—图标就可进行下载</p>
        <p>选择下载‘IOS版’，之后在手机桌面查看，点击图标开始下载</p>
        <div class="tech-block">
            <img src="./images/download/download1.jpg">
        </div>
        <div class="tech-block">
            <img src="./images/download/downloadios1.jpg">
        </div>
        <div class="tech-block">
            <img src="./images/download/downloadios2.jpg">
        </div>
        <div class="tech-block">
            <img src="./images/download/downloadios3.jpg">
        </div>
        <h3>方法二：二维码扫一扫下载</h3>
        <p>①.进入官网后—鼠标移到顶端菜单栏或右方导航栏—防劫持APP处会出现奇幻城下载二维码；</p>
        <p>您可以使用‘微信’‘QQ’扫码下载，或‘苹果相机’进行扫码后下载</p>
        <div class="tech-block">
            <img src="./images/download/downloadios4.jpg">
        </div>
        <div class="tech-block">
            <img src="./images/download/downloadios5.jpg">
        </div>
        <p>②.微信/QQ或‘苹果手机相机’进行扫码后页面显示如下图，点击选择下载‘IOS版’，之后在手机桌面查看，点击图标即可打开奇幻城国际APP</p>
        <div class="tech-block">
            <img src="./images/download/downloadios6.jpg">
        </div>
        <div class="tech-block">
            <img src="./images/download/downloadios7.jpg">
        </div>
        <div class="tech-block">
            <img src="./images/download/downloadios8.jpg">
        </div>
        <h3>方法三：使用网址下载</h3>
        <p>①.进入官网后—登录账号—选择“下载专区”，页面将出现官网客户端下载</p>
        <div class="tech-block">
            <img src="./images/download/downloadios9.jpg">
        </div>
        <div class="tech-block">
            <img src="./images/download/downloadios10.jpg">
        </div>
        <p>②.复制APP下载网址，打开手机任意浏览器输入网址点击前往，页面将跳转至下载页面</p>
        <p>点击选择下载‘IOS版’之后在手机桌面查看，点击图标开始下载</p>
        <div class="tech-block">
            <img src="./images/download/downloadios11.jpg">
        </div>
        <div class="tech-block">
            <img src="./images/download/downloadios12.jpg">
        </div>
        <div class="tech-block">
            <img src="./images/download/downloadios13.jpg">
        </div>
    </div>
  </div>
</template>
<script>
import tab from "./components/tab"
export default {
    data(){
        return{

        }
    },

    components: {
      tab
    }
}
</script>
<style lang="scss" scoped>
  @import "./style.scss";
</style>
