<template>
  <div class="user-top content" v-if="isUser">
    <div class="infos">
      <div class="avtar w30">
        <div class="logos" :class="`logo${userData.levelNumber}`"></div>
      </div>
      <div class="w70">
        <div class="texts">
          <i class="iconyg yg-gerenxinxi"></i>
          <span class="text-info">会员账号：{{userData.loginname}}</span>
        </div>
        <div class="texts">
          <i class="iconyg yg-xueshimao"></i>
          <span class="text-info">会员等级：{{userData.level}}</span>
        </div>
        <div class="texts mt15">
          <router-link :to="{name: 'user_datum'}">
            <div class="user-btn greybtn">
              <i class="iconyg yg-credentials_icon"></i>完善资料
            </div>
          </router-link>
          <router-link :to="{name: 'user_banks'}">
            <div class="user-btn greybtn">
              <i class="iconyg yg-wangyinzhifu"></i>&nbsp;银行卡
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="infos">
      <div class="ml15">
        <div class="texts">
          <span class="text-info">账户余额：</span>
        </div>
        <div class="texts">
          <span class="money">￥{{userData.accountMoney}}</span>元
        </div>
        <div class="texts mt15">
          <router-link :to="{name: 'finance_deposit'}">
            <div class="user-btn savebtn">
              <i class="iconyg yg-cunkuanlicairenminbi"></i>存款
            </div>
          </router-link>
          <router-link :to="{name: 'finance_drawmoney'}">
            <div class="user-btn takebtn">
              <i class="iconyg yg-tikuan"></i>提款
            </div>
          </router-link>
          <router-link :to="{name: 'finance_transfer'}">
            <div class="user-btn givebtn">
              <i class="iconyg yg-zhuanzhang1"></i>转账
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="infos">
        <div class="texts w100">
          <div class="ml15">
            <span class="w70 text-info">签到</span>
            <button class="minibtn red" @click="signIt">签到</button>
          </div>
          <!-- <div class=" ml15 mt15">
            <span class="w70 text-info">积分：1003</span>
            <button class="minibtn givebtn" disabled>使用</button>
          </div> -->
          <div class=" ml15 mt15">
            <span class="w70 text-info">站内信</span>
            <router-link :to="{name: 'user_message'}">
              <div class="minibtn msg savebtn">
                消息<div class="nav-counter nav-counter-red">{{unread}}</div>
              </div>
            </router-link>
          </div>
          <div class=" ml15 mt15">
            <span class="w70 text-info">退出</span>
            <a href="javascript:void(0);" @click="$store.dispatch('LOGIN_OUT')" class="minibtn givebtn">退出</a>
          </div>
          
        </div>
      </div>
    </div>
    
</template>
<script>
  import {    mapGetters,    mapActions  } from 'vuex'
  import {    Money  } from '@/assets/data'
  import {getGameMoney,doSignRecord} from '@/api/user'

  export default {
    data() {
      return {
        Money,
        searchMoney:'',
        showMoney:''
      };
    },
    props: {},
    methods: {
      ...mapActions(["LOGIN_OUT"]),
      signIt(){
        doSignRecord().then(res=>{
          toast(res.message)
        })
      },
      getGameMoney(val) {
        this.showMoney = "正在查询.."
        getGameMoney({gameCode: val}).then(res => {
          if (res.success) {
            this.showMoney = `${res.data} 元`;
          }
          else {
            toast(res.message)
            this.showMoney = '查询失败'
          }
        })
      },
    },
    computed: {
      ...mapGetters(["userData","isUser","unread"]),
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
  .ml15{
    margin-left: 15px;
  }
  .msg{
    position: relative;
    text-decoration: none;
    width: 45px;
    display: inline-block;
    font-size: 12px;
  }
  .savebtn{
    background-color: #41afe6;
    /* Old browsers */
    background: -moz-linear-gradient(top, #41afe6 0%, #218eb7 100%);
    /* FF3.6-15 */
    background: -webkit-linear-gradient(top, #41afe6 0%, #218eb7 100%);
    /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to bottom, #41afe6 0%, #218eb7 100%);
    /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#41afe6', endColorstr='#218eb7', GradientType=0);
    /* IE6-9 */
  }
  .takebtn{
    background-color: #bece4f;
    /* Old browsers */
    background: -moz-linear-gradient(top, #bece4f 0%, #99a82d 100%);
    /* FF3.6-15 */
    background: -webkit-linear-gradient(top, #bece4f 0%, #99a82d 100%);
    /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to bottom, #bece4f 0%, #99a82d 100%);
    /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#bece4f', endColorstr='#99a82d', GradientType=0);
    /* IE6-9 */
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
    background-color: #fd9733;
    /* Old browsers */
    background: -moz-linear-gradient(top, #fd9733 0%, #ef8015 100%);
    /* FF3.6-15 */
    background: -webkit-linear-gradient(top, #fd9733 0%, #ef8015 100%);
    /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to bottom, #fd9733 0%, #ef8015 100%);
    /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fd9733', endColorstr='#ef8015', GradientType=0);
    /* IE6-9 */
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

  .user-top {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    background: rgb(9, 25, 67);
    /* Old browsers */
    background: -moz-linear-gradient(top, rgba(9, 25, 67, 1) 0%, rgba(7, 20, 55, 1) 100%);
    /* FF3.6-15 */
    background: -webkit-linear-gradient(top, rgba(9, 25, 67, 1) 0%, rgba(7, 20, 55, 1) 100%);
    /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to bottom, rgba(9, 25, 67, 1) 0%, rgba(7, 20, 55, 1) 100%);
    /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#091943', endColorstr='#071437', GradientType=0);
    /* IE6-9 */
    padding: 20px 0;
    
    .logos {
      background-image: url(./images/logo.gif);
      background-position:center center;
      background-repeat: no-repeat;
      background-size: contain!important;
      height: 80px;
      width: 120px;
      // border-right: solid 1px #ffb92d;
      &.logo0{
        // 新会员
        background-image: url(./images/0.png);
      }
      &.logo1{
        // 忠实VIP
        background-image: url(./images/1.png);
      }
      &.logo2{
        // 青铜
        background-image: url(./images/2.png);
      }
      &.logo3{
        // 白银
        background-image: url(./images/3.png);
      }
      &.logo4{
        // 黄金
        background-image: url(./images/4.png);
      }
      &.logo5{
        // 铂金
        background-image: url(./images/5.png);
      }
      &.logo6{
        // 钻石
        background-image: url(./images/6.png);
      }
      &.logo7{
        // 超级VIP
        background-image: url(./images/7.png);
      }
    }
    .infos {
      display: flex;
      width: 33.33%;
      border-right: solid 1px #142860;
      height: 150px;
      .texts {
        // margin-left: 30px;
        line-height: 1.8;
        color: #fff;
        .iconyg{
          font-size: 24px;
        }
        .money {
          font-size:2rem;
        }
        .minibtn{
          padding: 3px 8px;
          color: #fff;
          border-radius: 3px;
          cursor: pointer;
        }
        .text-info {
          color:#fff;
          font-size: 15px;
        }
        .user-btn{
          height: 2.1rem;
          padding: 5px 15px;
          border-radius: 5px;
          font-size: .9rem;
          line-height: 1.5rem;
          margin-right: 10px;
          color: #fff;
          display: inline-block;
          .iconyg{
            font-size: 28px;
          }
        }
        .icobjh {
          font-size: 18px;
          margin-right: 20px;
          vertical-align: middle;
        }
      }
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
