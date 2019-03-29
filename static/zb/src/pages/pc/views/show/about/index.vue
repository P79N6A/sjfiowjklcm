<template>
  <div class="tutorials ng-scope">
    <menus></menus>
    <component :is="showTab[showKey]"></component>
    <div style="clear:both;"></div>
  </div>
</template>
<script>
  const menus = () =>
  import(/* webpackChunkName: "aboutusmenus" */ './components/menus')
  const tab1 = () =>
  import(/* webpackChunkName: "aboutustab1" */ './pages/aboutus-tab1')
  const tab2 = () =>
  import(/* webpackChunkName: "aboutustab2" */ './pages/aboutus-tab2')
  const tab3 = () =>
  import(/* webpackChunkName: "aboutustab3" */ './pages/aboutus-tab3')
  const tab4 = () =>
  import(/* webpackChunkName: "aboutustab4" */ './pages/aboutus-tab4')
  const tab5 = () =>
  import(/* webpackChunkName: "aboutustab5" */ './pages/aboutus-tab5')
  const tab6 = () =>
  import(/* webpackChunkName: "aboutustab6" */ './pages/aboutus-tab6')
  const tab7 = () =>
  import(/* webpackChunkName: "aboutustab7" */ './pages/aboutus-tab7')
  const tab21 = () =>
  import(/* webpackChunkName: "aboutustab21" */ './pages/aboutus-tab21')
  const tab22 = () =>
  import(/* webpackChunkName: "aboutustab22" */ './pages/aboutus-tab22')
  const tab23 = () =>
  import(/* webpackChunkName: "aboutustab23" */ './pages/aboutus-tab23')
  const tab24 = () =>
  import(/* webpackChunkName: "aboutustab24" */ './pages/aboutus-tab24')
  const tab25 = () =>
  import(/* webpackChunkName: "aboutustab25" */ './pages/aboutus-tab25')
  const tab26 = () =>
  import(/* webpackChunkName: "aboutustab26" */ './pages/aboutus-tab26')

  export default {
    name: "",
    data() {
      return {
        showKey:'tab1',
        showTab:{
          'tab1':tab1,
          'tab2':tab2,
          'tab3':tab3,
          'tab4':tab4,
          'tab5':tab5,
          'tab6':tab6,
          'tab7':tab7,
          'tab21':tab21,
          'tab22':tab22,
          'tab23':tab23,
          'tab24':tab24,
          'tab25':tab25,
          'tab26':tab26
        }
      }
    },
    props: {},
    computed: {},
    watch: {
      '$route'(val){
        // 监听路由，根据params切换显示选项
        if(this.$route.params&&this.$route.params.tab){
          this.showKey=this.$route.params.tab
        }else{
          this.showKey='tab1'
        }
      }
    },
    created() {
      if(this.$route.params&&this.$route.params.tab){
        this.showKey=this.$route.params.tab
      }else{
        this.showKey='tab1'
      }
    },
    components: {menus}
  }
</script>
<style lang="scss" scoped>
.tutorials {
  margin: 0;
  padding: 0;
  background: linear-gradient(339deg, #313de1, #2b9cd8, #354ee8, #2b9dd9, #313de1, #2b9cd8, #354ee8, #2b9dd9, #313de1, #2b9cd8, #354ee8, #2b9dd9);
  background-size: 800% 800%;
  -webkit-animation: ocean-wave 15s ease infinite;
  animation: ocean-wave 15s ease infinite;
  color: #ffffff;
}

@-webkit-keyframes ocean-wave {
  0% {
    background-position: 0 55%;
  }

  50% {
    background-position: 100% 46%;
  }

  to {
    background-position: 0 55%;
  }
}


@keyframes ocean-wave {
  0% {
    background-position: 0 55%;
  }

  50% {
    background-position: 100% 46%;
  }

  to {
    background-position: 0 55%;
  }
}
</style>
