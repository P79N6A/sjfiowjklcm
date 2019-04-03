<template>
  <!-- 只有底部  没有头部 -->
  <div>
    <v-header>
      <div v-if="title">{{title || ''}}</div>
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
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import vHeader from './components/header-back'
  import toolBar from './components/tool-bar'
  import vFooter from './components/footer'
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
      vHeader,
      toolBar,
      vFooter
    }
  }
</script>
<style lang="scss" scoped>
@import "~mobile/assets/scss/mixin";
  .padding-top{
    height: r($header-h);
  }
.padding-bottom{
  height:r($footer-h);
  background:none;
}
</style>
