<template>
  <!-- 只有底部  没有头部 -->
  <div>
    <transition :name="transitionName">
      <keep-alive>
        <router-view v-if="!$route.meta.noCache"></router-view>
      </keep-alive>
    </transition>
    <transition :name="transitionName">
      <router-view v-if="$route.meta.noCache"></router-view>
    </transition>
    <div class="padding-bottom">
      <!-- 底部填充部分 -->
    </div>
    <v-footer></v-footer>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
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
      vFooter
    }
  }
</script>
<style lang="scss" scoped>
@import "~mobile/assets/scss/mixin";
.padding-bottom{
  height:r($footer-h);
  background:none;
}
</style>
