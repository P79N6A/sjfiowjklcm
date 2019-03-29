<template>
  <div class="personalList">
    <div class="flex menu-list-box">
      <router-link :to="{name:'personal'}" class="flex menu-list-item">
        <span class="main-ico personal"></span>
        <span class="menu-text">基本资料设置</span>
        <span class="iconcent ct-jiantou"></span>
      </router-link>
    </div>
    <div class="flex menu-list-box">
      <router-link :to="{name:'bankList'}" class="flex menu-list-item">
        <span class="main-ico bankList"></span>
        <span class="menu-text">银行卡管理</span>
        <span class="iconcent ct-jiantou"></span>
      </router-link>
    </div>
    <div class="flex menu-list-box">
      <router-link :to="{name:'loginupdate'}" class="flex menu-list-item">
        <span class="main-ico loginupdate"></span>
        <span class="menu-text">修改登录密码</span>
        <span class="iconcent ct-jiantou"></span>
      </router-link>
      <router-link :to="{name:'payset'}" class="flex menu-list-item" v-if="!isSetPayPwd">
        <span class="main-ico payupdate"></span>
        <span class="menu-text">设置取款密码</span>
        <span class="iconcent ct-jiantou"></span>
      </router-link>
      <router-link :to="{name:'payupdate'}" class="flex menu-list-item" v-else>
        <span class="main-ico payupdate"></span>
        <span class="menu-text">修改取款密码</span>
        <span class="iconcent ct-jiantou"></span>
      </router-link>
    </div>
    <div class="flex menu-list-box" v-if="isSetPayPwd">
      <router-link :to="{name:'forgotPayword'}" class="flex menu-list-item">
        <span class="main-ico forgotPayword"></span>
        <span class="menu-text">重置取款密码</span>
        <span class="iconcent ct-jiantou"></span>
      </router-link>
    </div>

    <div class="user-personal-update-btn">
      <button class="btn" @click="$store.dispatch('LOGIN_OUT')">退出登录</button>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
      
    computed: {
      ...mapGetters(["isSetPayPwd", "isAgent", "isUser"])
    },
  }

</script>
<style lang="scss" scoped>
  @import "~mobile/assets/scss/mixin.scss";
.personalList{
    background: #f7f7f7;
  .menu-list-box {
    background: #fff;
    flex-direction: column;
    width: 100%;
    border-top: 1px solid rgba($color: #ddd, $alpha: .6);
    // border-bottom: 1px solid #d6d6d6;
    margin-bottom: r(20);

    .menu-list-item {
      border-bottom: 1px solid rgba($color: #ddd, $alpha: .6);
      @include f(30px);
      justify-content: space-between;
      align-items: center;
      text-align: center;
      width: 100%;
      height: r(90);

      .menu-ico {
        color: $iconcl;
        @include f(46px);
        flex: 1;
      }

      .menu-text {
        flex: 5;
        text-align: left;
        font-family: PingFangSC-Regular;
        @include f(28px);
        color: #1e1e1e;
        line-height: r(75);
      }

      .ct-jiantou {
        color: #c7c7c7;
        @include f(40px);
        flex: 1;
      }

      .main-ico {
        width: r(50);
        height: r(50);
        flex: 1;
      }

      .personal {
        background: url('./images/ico_imfor_basic.png') no-repeat;
        background-size: contain;
        background-position: center;
      }

      .bankList {
        background: url('./images/ico_imfor_bankcard.png') no-repeat;
        background-size: contain;
        background-position: center;
      }

      .loginupdate {
        background: url('./images/ico_imfor_loginpwd.png') no-repeat;
        background-size: contain;
        background-position: center;
      }

      .payupdate {
        background: url('./images/ico_imfor_drawpwd.png') no-repeat;
        background-size: contain;
        background-position: center;
      }

      .forgotPayword {
        background: url('./images/ico_imfor_reset.png') no-repeat;
        background-size: contain;
        background-position: center;
      }
    }
  }
}
.user-personal-update-btn {
    width: 100%;
    text-align: center;
    padding-bottom: r(30);
    padding-top: r(30);
    .btn {
      width: 94%;
      display: inline-block;
      background:#FF4B41;
      color: #fff;
      height: r(94);
      line-height: r(94);
      text-align: center;
      @include f(32px);
      letter-spacing: 2px;
      font-family: PingFangSC-Regular;
      border-radius: 5px;
    }
  }
</style>
