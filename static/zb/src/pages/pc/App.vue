<template>
  <div id="app">
    <transition :name="transitionName">
        <router-view v-if="!$route.meta.noCache">
          <!-- 需要缓存的页面 -->
          <!-- 页面内容可视部分 -->
        </router-view>
    </transition>
    <transition :name="transitionName">
      <router-view v-if="$route.meta.noCache">
          <!-- 页面内容可视部分 -->
      </router-view>
    </transition>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    data(){
      return {
        // 页面切换的动画，暂时没必要写
        transitionName:"",
      }
    }
  }
</script>
