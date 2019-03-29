<template>
  <!-- 基础外框 -->
  <div id="mobile">
    <v-header>
      <!-- 头部，如果有title，则用title替代logo -->
      <div v-if="$route.meta.title || $route.meta.headName">{{$route.meta.title || $route.meta.headName}}</div>
    </v-header>
    <div class="padding-top">
      <!-- 顶部填充部分 -->
    </div>
    <tool-bar></tool-bar>
    <slot>
      <!-- 插槽，有则替换slot内部的部分 -->
      <transition :name="transitionName">
        <keep-alive>
          <router-view v-if="!$route.meta.noCache"></router-view>
        </keep-alive>
      </transition>
      <transition :name="transitionName">
        <router-view v-if="$route.meta.noCache"></router-view>
      </transition>
    </slot>
    <div class="padding-bottom">
      <!-- 底部填充部分 -->
    </div>
    <v-footer></v-footer>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import vHeader from './components/header'
  import toolBar from './components/tool-bar';
  import vFooter from './components/footer'
  export default {
    name:'mobileMaster',
    data() {
      return {
        transitionName: "slide",
      }
    },
    created() {
      this.$store.dispatch("UPDATE_USERDATA").then(res=>{

      }).catch(err=>{

      })
    },
    components: {
      vHeader,
      toolBar,
      vFooter
    }
  }
</script>
<style lang="scss" scoped>
  @import "~mobile/assets/scss/mixin"; 
  #mobile {
    min-height: 100vh;
    background: $body-bg;
    color: $main-cl;
  }
  .padding-top{
    height: r(100)
  }
  .padding-bottom{
    height:r($footer-h);
    background:none;
  }
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
