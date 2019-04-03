<template>
  <!-- 只有头部 没有底部 -->
  <div id="page-in">
    <v-header>
      <div v-if="title">{{title || ''}}</div>
    </v-header>
    <div class="padding-top">
      <!-- 顶部填充部分 -->
    </div>
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
<script>
  import {mapGetters} from 'vuex'
  import vHeader from './components/header-back'
  export default {
    name:'mobileMaster',
    data() {
      return {
        transitionName: "slide",
        title: ""
      }
    },
    created() {
      // 这个作用是啥？
      this.$store.dispatch("UPDATE_USERDATA").then(res=>{

      }).catch(err=>{
        
      })
    },
    components: {
      vHeader
    }
  }
</script>
<style lang="scss" scoped>
@import "~mobile/assets/scss/mixin";
.padding-top{
  height:r($header-h);
}
</style>
