<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive>
        <router-view v-if="!$route.meta.noCache"></router-view>
      </keep-alive>
    </transition>
    <transition :name="transitionName">
      <router-view v-if="$route.meta.noCache"></router-view>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  export default {
    data() {
      return {
        transitionName: "slide",
        title: ""
      }
    },
    mounted(){
      document.getElementById('first-load').remove()
    }
  }
</script>
<style lang="scss">


  #app {
    height: 100%;
    overflow: auto;
  }

  .slide-enter,
  .slide_back-enter {
    position: absolute;
    width: 100%;
  }

  .slide-leave,
  .slide_back-leave {
    position: absolute;
    width: 100%;
  }

  .slide-enter-active,
  .slide_back-enter-active {
    // transition: all 0.3s linear;
  }

  .slide-leave-active {
    position: absolute;
    // transition: all 0.3s linear;
    opacity:0;
    // transform: translate(-100%);
  }

  .slide-enter {
    opacity:1;
    // transform: translateX(100%);
  }

  .slide_back-leave-active {
    position: absolute;
    // transition: all 0.3s linear;
    opacity:1;
    // transform: translate(100%);
  }

  .slide_back-enter {
    opacity:0;
    // transform: translateX(-100%);
  }
</style>
