<template>
  <div class="userTop">
    <div class="user-top-box">
      <div class="avator">
        <img src="/static/images/base/avator.png" alt="">
      </div>
      <div class="userInfo">
        <h3 class="name">{{userData.loginname}},您好！</h3>
        <h3 class="levelInfo">
          VIP等级：{{userData.level}}
          <img v-lazy="userData.avator" class="miniAvator">
        </h3>
      </div>
      <div class="signItem">
        <span class="signIt" @click="doSignRecord"><i class="iconcent ct-laba-"></i>签到</span>
        <!-- <span class="signIt" @click="doSignRecord"></span> -->
      </div>
    </div>
    <div class="userMoney">
      <div>主账户余额(元)</div>
      <div class="money-main">{{wallet['MAIN']}}</div>
      <div>副账户余额(元): {{wallet['DEPUTY']}}</div>

      <router-link class="money-deposit" :to="{name:'money_deposit'}">存款</router-link>
    </div>
    <div class="hidePic" :class="{showPic:isSign}">
      <img class="animated signSuccess" :class="{bounceIn:isSign,bounceOut:!isSign}" src="./images/pic_sign_sussecc.png" alt="">
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {getGuestbookCountNew} from "@/api/show"
  import {doSignRecord} from "@/api/user"
  import  {SETTING} from "@/assets/data"
  export default {
    data() {
      return {
        SETTING,
        newMsg: false,
        showSheet: false,
        value1:false,
        sheetData: [
          {name: "在线客服"},
          {name: "电话回拨"},
          {
            name: "400-2312314", method() {
          }
          }
        ],
        isSign:false
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
        let _this = this
        doSignRecord().then(res=>{
          if (res.code == '10000') {
            this.isSign = true
            setTimeout(function(){_this.isSign = false},3000)
          }else{
            window.toast(res.message)
          }
        })
      }
    },
    created() {
//      this.loadData();
    if (this.userData.levelNumber == "6") {
        this.userData.level = "贵宾";
      }
    },
    components:{
      // sheet
    },
    computed: {
      ...mapGetters(["userData", 'islogin', 'isUser', 'unread','wallet']),
    }
  }
</script>
<style lang="scss" scoped>
  @import "~mobile/assets/scss/mixin.scss";
  .userTop{
    // background: #fff;
    // min-height: r(300);
    padding-bottom: r(10);
    // border-bottom: 1px solid rgba($color: #ddd, $alpha: .6);
    overflow: hidden;
  }
  .user-top-box{
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: r(90) r(60) r(30);
    .avator{
      flex: 2;
      text-align: center;
      margin: auto;
      img{
        width: r(150);
      }
    }
    .userInfo{
      flex: 5;
      margin: auto;
      color: #ffffff;
      margin-left: r(20);
      .name{
        font-family: PingFangSC-Regular;
        @include f(24px);
        letter-spacing: 0;
        height: r(60);
        line-height: r(60);
      }
      .levelInfo{
        font-family: PingFangSC-Regular;
        @include f(24px);
        letter-spacing: 0;
        height: r(60);
        line-height: r(60);
      }
      .miniAvator{
        height:r(30);
        vertical-align: sub;
      }
    }
    .signItem{
      flex: 1;
      position: relative;
      .signIt{
        height: r(69);
        display: block;
        position: absolute;
        width: r(145);
        top: 50%;
        transform: translateY(-50%);
        right: r(10);
        color:#cca76d;
        text-align: center;
        @include f(28px);
        .iconcent  {
           @include f(36px);
           margin-right: r(5);
        }
      }
    }
  }
  .userMoney{
    padding: r(30) r(50);
    // background: rgba($color: $cl1, $alpha: .1) ;
    color: #ffffff;
    border-radius: 6px;
    margin: 0 auto r(30);
    width: 90%;
    height: r(160);
    clear: both;
    position: relative;
    .money-main {
      color:#cca76d;
      @include f(48px);
      margin-bottom: r(20);
    }
    .money-deposit {
      position: absolute;
      top: r(50);
      right: r(20);
      color:#cca76d;
      border: 2px solid #cca76d;
      border-radius: r(10);
      width: r(150);
      height: r(50);
      line-height: r(50);
      text-align: center;
    }
    // .left{
    //   font-family: PingFangSC-Regular;
    //   @include f(24px);
    //   letter-spacing: 0;
    //   float: left;
    //   line-height: r(60);
    // }
    // .right{
    //   font-family: PingFangSC-Regular;
    //   @include f(24px);
    //   letter-spacing: 0;
    //   float: right;
    //   line-height: r(60);
    // }
  }
  .hidePic{
    position: fixed;
    background: rgba(0, 0, 0, 0.6);
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 9999;
    display: none;
    align-items: center;
    justify-content: center;
    .signSuccess{
      width: 100%;
      position: fixed;
    }
    &.showPic{
      display: flex;
    }
  }
  
</style>
