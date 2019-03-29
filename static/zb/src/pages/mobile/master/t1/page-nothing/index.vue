<template>
  <!-- 头部无  底部无 -->
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
<script>
  import {mapGetters} from 'vuex'
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
    }
  }
</script>
<style lang="scss" scoped>
</style>
