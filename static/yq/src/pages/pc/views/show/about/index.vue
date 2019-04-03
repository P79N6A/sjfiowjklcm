<template>
  <div class="tutorials ng-scope">
    <div class="about_banner">
      <div class="about-title">关于奇幻城</div>
      <div class="about-info">ABOUT QHC</div>
    </div>
    <div class="contain_bg">
      <div class="about_content">
        <menus></menus>
        <div class="main">
          <div class="about_right items">
            <component :is="showTab[showKey]"></component>
          </div>
        </div>
      </div>

      <div style="clear:both;"></div>
    </div>
  </div>
</template>
<script>
const menus = () =>
  import(/* webpackChunkName: "aboutusmenus" */ "./components/menus");
const tab1 = () =>
  import(/* webpackChunkName: "aboutustab1" */ "./pages/aboutus-tab1");
const tab2 = () =>
  import(/* webpackChunkName: "aboutustab2" */ "./pages/aboutus-tab2");
const tab3 = () =>
  import(/* webpackChunkName: "aboutustab3" */ "./pages/aboutus-tab3");
const tab4 = () =>
  import(/* webpackChunkName: "aboutustab4" */ "./pages/aboutus-tab4");
const tab5 = () =>
  import(/* webpackChunkName: "aboutustab5" */ "./pages/aboutus-tab5");
const tab6 = () =>
  import(/* webpackChunkName: "aboutustab6" */ "./pages/aboutus-tab6");
const tab7 = () =>
  import(/* webpackChunkName: "aboutustab6" */ "./pages/aboutus-tab7");

export default {
  name: "",
  data() {
    return {
      showKey: "tab1",
      showTab: {
        tab1: tab1,
        tab2: tab2,
        tab3: tab3,
        tab4: tab4,
        tab5: tab5,
        tab6: tab6,
        tab7: tab7
      }
    };
  },
  props: {},
  computed: {},
  watch: {
    $route(val) {
      // 监听路由，根据params切换显示选项
      if (this.$route.params && this.$route.params.tab) {
        this.showKey = this.$route.params.tab;
      } else {
        this.showKey = "tab1";
      }
    }
  },
  created() {
    if (this.$route.params && this.$route.params.tab) {
      this.showKey = this.$route.params.tab;
    } else {
      this.showKey = "tab1";
    }
  },
  components: { menus }
};
</script>
<style lang="scss" scoped>
.tutorials {
  background: #fff;
  width: 100%;
  .about_banner {
    width: 100%;
    height: 200px;
    color: #fff;
    text-align: center;
    padding-top: 60px;
    background: url(./images/banner-bg.png) no-repeat center top;
    .about-title {
      font-size: 36px;
      font-weight: bold;
    }
    .about-info {
      margin: 15px 0;
      font-size: 24px;
    }
  }

  .contain_bg {
    width: 100%;
    overflow: hidden;
    .about_content {
      width: 1200px;
      margin: 30px auto;
      border: 1px solid #4db7f4;
      background: #f1f1f1;
    }
    .main {
      .about_right {
        width: 92.5%;
        min-height: 700px;
        margin: 20px auto;
      }
    }
  }
}
</style>
