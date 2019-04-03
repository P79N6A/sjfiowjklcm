<template>
  <div class="agent-account-top">
      <div class="account-img">
        <img src="/static/images/base/avator.png" alt="">
        <div class="account-name">{{userData.loginname}},你好！</div>
        <router-link class="personal" :to="{name:'personal'}">个人资料<i class="iconbolin iconbolin-arrow-right"></i></router-link>
      </div>    
      <div class="agent-account-info-money">
        <div class="agent-account-info-money-half">
          <span class="agent-account-info-money-text">{{wallet['SLOT']}}</span><br>
          <span class="agent-account-info-money-text1">老虎机佣金</span>
        </div>
        <div class="agent-account-info-money-half">
          <span class="agent-account-info-money-text">{{wallet['LIVE']}}</span><br>
          <span class="agent-account-info-money-text1">其他佣金</span>
        </div>
      </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {getGuestbookCountNew} from "@/api/show"
  import {doSignRecord} from "@/api/user"
  export default {
    data() {
      return {
        newMsg: false,
      };
    },
    props: {
      value: {
        default: false
      }
    },
    watch: {
      value(val) {
        this.showSheet = val;
      },
      showSheet(val) {
        this.$emit("input", val)
      }
    },
    methods: {
      loadData() {
        getGuestbookCountNew().then(res => {  //未读消息
          this.newMsg = res.data > 0;
        })
      },
      doSignRecord(){
        doSignRecord().then(res=>{
          window.toast(res.message)
        })
      }
    },
    created() {
//      this.loadData();
    },
    computed: {
      ...mapGetters(["userData", "isAgent","wallet"])
    }
  }
</script>
<style lang="scss">
  @import "~mobile/assets/scss/mixin.scss";
  .agent-account-top{
    overflow: hidden;
    // background:#fff url("./images/agent-bg.png") no-repeat top center/100% 100%;
    .account-img{
      padding: r(90) r(60) r(30);
      width: 100%;
      position: relative;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      img {
        width: r(140);
        height: r(140);
        margin-bottom: r(10);
        margin-left: r(20);
      }
      .account-name{
        text-align: center;
        @include f(32px);
        color:#cca76d;
        margin-left: r(20);
      }
      .personal{
        @include f(28px);
        position: absolute;
        right: r(70);
        top: 60%;
        transform: translateY(-50%);
        width: r(150);
        height: r(50);
        line-height: r(50);
        border-radius: r(25);
        text-align: center;
        background-image:linear-gradient(-90deg, #ca934c 0%, #e9c890 100%);
        // background-image: url('./images/pic_profile.png');
        // background-size: cover;
        // background-repeat: no-repeat;
      }
    }
    .agent-account-info-money{
      text-align: center;
      color:#cca76d;
      padding: r(30);
      display: flex;
      .agent-account-info-money-half{
        flex: 1;
      }
      .agent-account-info-money-text{
        @include f(56px);
      }
      .agent-account-info-money-text1{
        @include f(28px);
        line-height: r(50);
        color: rgba($color: #ffffff, $alpha: .7)
      }
    }
    .level-sign{
      text-align: center;
      line-height: r(44);
      div{
        display: inline-block;
        background-color: #fcb712;
        padding: 0 r(16);
        border-radius:r(30);
        color: #6d091c;
        min-width:r(128);
      }
      .icon-crown{
        @include f(34px);
        margin-right:4px;
      }
    }
    .money-list{
      @include f(36px);
      color:#cca76d;
      text-align: center;
      line-height:r(88);
    }
  }

</style>
