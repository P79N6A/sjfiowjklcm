<template>
  <div class="agent-top content" v-if="isAgent">
    <div class="infos">
      <div class="avtar w30">
        <!-- <div class="logos"><span class="logos-text">代理</span></div> -->
        <img :src="userData.avator" alt="">
      </div>
      <div class="w70">
        <div class="texts">
          <i class="iconay ay-gerenxinxi"></i>
          <span class="text-info">代理账号：{{userData.loginname}}</span>
        </div>
        <div class="texts mt15">
          <router-link :to="{name: 'agentDetail'}">
            <button class="user-btn greybtn">
              <i class="iconay ay-credentials_icon"></i>完善资料
            </button>
          </router-link>
          <router-link :to="{name: 'agent_banks'}">
            <button class="user-btn greybtn">
              <i class="iconay ay-wangyinzhifu"></i>银行卡
            </button>
          </router-link>
          <router-link :to="{name: 'agent_drawmoney'}">
            <button class="user-btn takebtn">
              <i class="iconay ay-tikuan"></i>提款
            </button>
          </router-link>
        </div>
      </div>
    </div>
    <!-- <div class="infos">
      <div class="ml100">
        <div class="texts">
          <span class="text-info">老虎机佣金：</span>
        </div>
        <div class="texts">
          <span class="money">￥{{userData.slotAccount}}</span>元
          <a href="javascript:;" @click="updateMoney('actived')" class="iconay ay-f14 btn003" :class="{xuanzhuan:actived==true}"></a>
        </div>
        <div class="texts mt15">
          <router-link :to="{name: 'agent_drawmoney'}">
            <button class="user-btn takebtn">
              <i class="iconay ay-tikuan"></i>提款
            </button>
          </router-link>
        </div>
      </div>
    </div> -->
    <div class="infos displayBlock">
        <div class="ml100">
          <div class="texts">
            <span class="w50 text-info">老虎机佣金：</span>
            <span class="money">￥{{userData.slotAccount}}</span>元
            <a href="javascript:;" @click="updateMoney('actived')" class="iconay ay-f14 btn003" :class="{xuanzhuan:actived==true}"></a>
          </div>
        </div>

        <div class="ml100">
          <div class="texts">
            <span class="w50 text-info">其他佣金：</span>
            <span class="money">￥{{userData.liveAccount}}</span>元
            <a href="javascript:;" @click="updateMoney('actived1')" class="iconay ay-f14 btn003" :class="{xuanzhuan:actived1==true}"></a>
          </div>
        </div>
        
        <div class="texts w100">
          <div class=" ml100 mt15">
            <span class="w50 text-info">站内信</span>
            <router-link :to="{name: 'agent_message'}">
              <div class="minibtn msg savebtn">
                消息<div class="nav-counter nav-counter-red" v-if="unread">{{unread}}</div>
              </div>
            </router-link>
          </div>
        </div>
        
      </div>
    </div>
</template>
<script>
  import {    mapGetters,    mapActions  } from 'vuex'
  import {    Money  } from '@/assets/data'
  import {getGameMoney} from '@/api/user'

  export default {
    data() {
      return {
        Money,
        searchMoney:'',
        showMoney:'',
        actived: false,
        actived1: false
      };
    },
    props: {},
    methods: {
      ...mapActions(["LOGIN_OUT"]),
      updateMoney(str){
        let v = this
        switch (str) {
          case 'actived':
            this.actived = true
            setTimeout(function () {
              v.$store.dispatch("UPDATE_USERDATA")
              v.actived = !v.actived;
            },1500)
            break;
          case 'actived1':
            this.actived1 = true
            setTimeout(function () {
              v.$store.dispatch("UPDATE_USERDATA")
              v.actived1 = !v.actived1;
            },1500)
            break;
        }
        
      }
    },
    computed: {
      ...mapGetters(["userData","isAgent","unread"]),
    },
    created() {
    },
    components: {}
  };

</script>
<style lang="scss" scoped>
  .w100{
    width: 100%;
  }
  .w50 {
    width: 50%;
    display: inline-block;
  }
  .w70{
    width: 70%;
    display: inline-block;
  }
  .w30{
    width: 30%;
  }
  .mt15{
    margin-top: 15px;
  }
  .ml100{
    margin-left: 100px;
  }
  .msg{
    position: relative;
    text-decoration: none;
    width: 45px;
    display: inline-block;
    font-size: 12px;
  }
 .savebtn{
    background-color: #8e3e3c;
  }
  .takebtn{
    background: #0181fa;
    background: -moz-linear-gradient(to right, #0181fa, #16d6ff);
    background: -webkit-linear-gradient(to right, #0181fa, #16d6ff);
    background: -o-linear-gradient(to right, #0181fa, #16d6ff);
    background: linear-gradient(to right, #0181fa, #16d6ff);
    border: 1px solid #0181fa;
  }
  .givebtn{
    background-color: #407ee6;
    /* Old browsers */
    background: -moz-linear-gradient(top, #407ee6 0%, #3169c5 100%);
    /* FF3.6-15 */
    background: -webkit-linear-gradient(top, #407ee6 0%, #3169c5 100%);
    /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to bottom, #407ee6 0%, #3169c5 100%);
    /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#407ee6', endColorstr='#3169c5', GradientType=0);
    /* IE6-9 */
  }
  .greybtn{
    background: #0181fa;
    background: -moz-linear-gradient(to right, #0181fa, #16d6ff);
    background: -webkit-linear-gradient(to right, #0181fa, #16d6ff);
    background: -o-linear-gradient(to right, #0181fa, #16d6ff);
    background: linear-gradient(to right, #0181fa, #16d6ff);
    border: 1px solid #0181fa;
  }
  .red {
    background-color: #ed0000;
    /* Old browsers */
    background: -moz-linear-gradient(top, #ed0000 0%, #b30101 100%);
    /* FF3.6-15 */
    background: -webkit-linear-gradient(top, #ed0000 0%, #b30101 100%);
    /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to bottom, #ed0000 0%, #b30101 100%);
    /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ed0000', endColorstr='#b30101', GradientType=0);
    /* IE6-9 */
  }

  .displayBlock{
    display: block !important;
  }
  .agent-top {
    // padding-top: 80px;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    background: rgba(9,9,9,.5);
    /* Old browsers */
    background: -moz-linear-gradient(top, (9,9,9,.7) 0%, rgba(41, 35, 30, 0.51) 100%);
    /* FF3.6-15 */
    background: -webkit-linear-gradient(top, (9,9,9,.7) 0%, rgba(41, 35, 30, 0.51) 100%);
    /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to bottom, (9,9,9,.7) 0%, rgba(41, 35, 30, 0.51) 100%);
    /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='(9,9,9,.7)', endColorstr='rgba(41, 35, 30, 0.51)', GradientType=0);
    /* IE6-9 */
    padding: 20px;
    .logos {
      background-image: url(./images/6.png);
      background-position:center center;
      background-repeat: no-repeat;
      background-size: 70px 80px;
      height: 100px;
      width: 100px;
      border-radius: 50%;
      background-color: #fff;
      .logos-text{
        position: relative;
        padding: 4px 29px;
        left: 7px;
        top: 80px;
        border-radius: 50%/ 0 0 100% 100%;
        background: rgba(153,153,153,0.5);
        color: #fff;
      }
    }
    .infos {
      display: flex;
      width: 33.33%;
      // border-right: solid 1px #9b7450;
      height: 150px;
      flex: 1;
      .avtar{
        text-align: center;
      }
      .texts {
        line-height: 1.5;
        color: #fff;
        .iconay{
          font-size: 24px;
          margin-right: 2px;
          vertical-align: middle;
        }
        .money {
          font-size:34px;
        }
        .minibtn{
          padding: 3px 8px;
          color: #fff;
          border-radius: 3px;
        }
        
        .text-info {
          color:#fff;
          font-size: 17px;
        }
        .user-btn{
          height: 42px;
          border-radius: 5px;
          font-size: 14px;
          color: #fff;
          margin-right: 10px;
          display: inline-block;
          cursor: pointer;
          width: 122px;
        }
        a{
          display: inline-block;
          margin-top: -12px;
        }
      }
      @keyframes rotateImg {
        0% {transform : rotate(0deg);}
        100% {transform : rotate(360deg);}
      }
      @-webkit-keyframes rotateImg {
          0%{-webkit-transform : rotate(0deg);}
        100%{-webkit-transform : rotate(360deg);}
      }
      .xuanzhuan{
        &.ay-f14:before{
          -webkit-animation:rotateImg 1s linear infinite;
          animation: rotateImg 1s linear infinite;
          display: inline-block;
        }
      }
    }
    .infos:nth-child(3){
            border-right: none;
        }
    .control {
      width: 480px;
      padding-left: 30px;
      .inputs {
        width: 320px;
        background: #fff;
        border-radius: 6px;
        color: red;
        height: 36px;
        line-height: 36px;
        padding-left: 10px;
        select {
          display: block;
          height: 100%;
          width: 100%;
          background: 0;
          border: 0;
          outline: 0;
          color: red;
        }
      }
      .btns {
        margin-top: 20px;
        .item {
          display: inline-block;
          height: 34px;
          line-height: 34px;
          width: 90px;
          margin-right: 3px;
          text-align: center;
          background: #7087c3;
          border-radius: 6px;
          color: #fff;
          cursor:pointer;
          .icobjh {
            font-size: 18px;
            margin-right: 5px;
            vertical-align: middle;
          }
        }
      }
    }
  }
.nav-counter {
  position: absolute;
  top: -1px;
  right: -21px;
  min-width: 15px;
  height: 20px;
  line-height: 20px;
  margin-top: -11px;
  padding: 0 6px;
  font-weight: normal;
  color: white;
  text-align: center;
  text-shadow: 0 1px rgba(0, 0, 0, 0.2);
  background: #e23442;
  border: 1px solid #911f28;
  border-radius: 11px;
  background-image: -webkit-linear-gradient(top, #e8616c, #dd202f);
  background-image: -moz-linear-gradient(top, #e8616c, #dd202f);
  background-image: -o-linear-gradient(top, #e8616c, #dd202f);
  background-image: linear-gradient(to bottom, #e8616c, #dd202f);
  -webkit-box-shadow: inset 0 0 1px 1px rgba(255, 255, 255, 0.1), 0 1px rgba(0, 0, 0, 0.12);
  box-shadow: inset 0 0 1px 1px rgba(255, 255, 255, 0.1), 0 1px rgba(0, 0, 0, 0.12);
}


.nav-counter-red {
  background: #de543e;
  border: 1px solid #de543e;
  background-image: -webkit-linear-gradient(top, #df6653, #df452d);
  background-image: -moz-linear-gradient(top, #df6653, #df452d);
  background-image: -o-linear-gradient(top, #df6653, #df452d);
  background-image: linear-gradient(to bottom, #df6653, #df452d);
}
</style>
