<template>
  <div class="u-c-shows" v-if="isUser">
    <div class="userSet">
      <div class="u-c-menu">
          <router-link class="u-c-router"  :to="{name: 'datum'}"><span class="icobjh bjh-Management"></span>个人中心</router-link>
          <router-link class="u-c-router"  :to="{name: 'banks'}"><span class="icobjh bjh-qianbao"></span>银行卡管理</router-link>
          <router-link class="u-c-router"  :to="{name: 'password'}"><span class="icobjh bjh-suo1"></span>登录密码</router-link>
          <router-link class="u-c-router"  :to="{name: 'payword'}"><span class="icobjh bjh-suo1"></span>支付密码</router-link>
      </div>
      <div class="u-c-box">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
  <div v-else>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
  import {
    mapGetters
  } from 'vuex'
  export default {
    data() {
      return {
      };
    },
    methods: {
    },
    computed: {
      ...mapGetters(["userData","isUser","unread"]),
    },
    created() {
    },
  };
</script>
<style lang="scss">

</style>
