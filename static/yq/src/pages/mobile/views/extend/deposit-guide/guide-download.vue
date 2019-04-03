<template>
  <div>
    <tab></tab>
    <div class="tab-h"><h3>如何下载奇幻城国际手机APP：</h3></div>
    <div class="master-box">
        <div class="title-box">
            <router-link :to="{name:'guideDownloadios'}">
              <span class="title-pc">苹果手机下载方式</span>
            </router-link>
            <span class="title-mobile">安卓手机下载方式</span>
        </div>
        <h3>方法一：手机网页下载方式</h3>
        <p>使用手机浏览器登录奇幻城网站后，在‘首页’最底端横幅处点—点击下载APP—图标就可进入下载页，选择下载‘安卓版’即可开始下载</p>
        <div class="tech-block">
            <img src="./images/download/download1.jpg">
        </div>
        <div class="tech-block">
            <img src="./images/download/download2.jpg">
        </div>
        
        <h3>方法二：二维码扫一扫下载</h3>
        <p>①.进入官网后—鼠标移到顶端菜单栏或右方导航栏—防劫持APP处会出现奇幻城下载二维码；</p>
        <p>您可以使用‘微信’‘QQ’‘浏览器照相机’或专业的扫码软件下载</p>
        <div class="tech-block">
            <img src="./images/download/download3.jpg">
        </div>
        <div class="tech-block">
            <img src="./images/download/download4.jpg">
        </div>
       
        <p>②.微信/QQ或专业扫码软件，扫码后页面显示如下图，点击选择下载‘安卓’版</p>
        <p>若出现提示危害设备，请点击确定，系统将会进行下载；下载完成后点击安装即可。</p>
         <div class="tech-block">
            <img src="./images/download/download5.jpg">
        </div>
        <div class="tech-block">
            <img src="./images/download/download6.jpg">
        </div>
        <div class="tech-block">
            <img src="./images/download/download7.jpg">
        </div>
        
        <h3>方法三：使用网址下载</h3>
        <p>①.进入官网后—登录账号—选择“下载专区”，页面将出现官网客户端下载</p>
        <div class="tech-block">
            <img src="./images/download/download8.jpg">
        </div>
        <div class="tech-block">
            <img src="./images/download/download9.jpg">
        </div>
       
        <p>②.微信/QQ或专业扫码软件，扫码后页面显示如下图，点击选择下载‘安卓’版</p>
        <p>若出现提示危害设备，请点击确定，系统将会进行下载。</p>
         <div class="tech-block">
            <img src="./images/download/download10.jpg">
        </div>
        <div class="tech-block">
            <img src="./images/download/download11.jpg">
        </div>
        <div class="tech-block">
            <img src="./images/download/download7.jpg">
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
