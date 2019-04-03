<template>
  <div class="main-content">
    <div class="space-2"></div>
    <div class="center">
      <img src="./images/registerSuccessLogo.png" style="width:100%;">
    </div>
    <div class="space-2"></div>
    <div class="center">
      <h2 style="text-align: center">恭喜您注册成功！</h2>
      <div class="space-2"></div>
      <div class="cont">
        <router-link :to="{name:'usercenter'}" class="btn btn-mg">点击进入会员中心</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    };
  },
  created() {
    
  }
};
</script>
<style lang="scss" scoped>
@import "~mobile/assets/scss/mixin.scss";

.main-content {
  .space-2 {
    display: inline-block;
    width: 100%;
    height: 20px;
  }
  .cont {
    width: 95%;
    margin: 0 auto;
    .btn {
      display: block;
      height: 40px;
      line-height: 40px;
      background: #4db7f4;
      border-radius: 4px;
      color: #fff;
      font-size: 18px;
      text-align: center;
    }
  }
}
</style>

