<template>
  <div class="serviceCenter">
      <div class="service-panel">
       <h3 class="h3">人工服务</h3>
        <ul>
           <li>
              <a :href="SETTING.live800" target="_blank">
              <i class="sicon i-online"></i><br>在线客服</a>
            </li>
           <li>
              <a @click="showWindow=true;">
              <i class="sicon i-phone"></i><br>电话客服
              </a>
            </li>
           <li>           
              <a @click="showWechat=true;">
              <i class="sicon i-voice"></i><br>专属客服</a>
            </li>
            <li>
              <a :href="'mailto:' + SETTING.email">
              <i class="sicon i-mail"></i><br>客服邮箱 </a>
            </li>
        </ul>
    </div>
    <div class="self-nav-box">
       <h3 class="h3">自助服务 <router-link :to="{name:'other_problems'}" class="more">更多帮助 &gt;&gt; </router-link></h3>
        <div class="s-list">
            <router-link :to="{name:'financial_problems'}" class="list-l">
                <i class="sicon i-money"></i>
                <p>资金问题</p>
                <i class="sicon i-arrow-down"></i>
            </router-link>
            <span class="list-r">
                <p><router-link :to="{name:'financial_problems',params:{'id':0}}">存款方式有哪些</router-link></p>
                <p><router-link :to="{name:'financial_problems',params:{'id':1}}">你们支持信用卡存款吗？</router-link></p>
                <p><router-link :to="{name:'financial_problems',params:{'id':2}}">如何户内转账？</router-link></p>
            </span>
        </div>
        <div class="s-list">
            <router-link class="list-l" :to="{name:'account_problems'}">
                <i class="sicon i-account"></i>
                <p>账号问题</p>
                <i class="sicon i-arrow-down"></i>
            </router-link>
            <span class="list-r">
                <p><router-link :to="{name:'account_problems',params:{'id':0}}">如何注册 </router-link></p>
                <p><router-link :to="{name:'account_problems',params:{'id':1}}">我可以注册多个账号吗？</router-link></p>
                <p><router-link :to="{name:'account_problems',params:{'id':2}}">账号忘记？</router-link></p>
            </span>
        </div>
        <div class="s-list">
            <router-link class="list-l" :to="{name:'discount_problems'}">
                <i class="sicon i-youhui"></i>
                <p>优惠问题</p>
                <i class="sicon i-arrow-down"></i>
            </router-link>
            <span class="list-r">
                <p><router-link :to="{name:'discount_problems',params:{'id':0}}">体验金在哪领取？</router-link></p>
                <p><router-link :to="{name:'discount_problems',params:{'id':1}}">体验金申请过程中，为什么无法绑定银行卡？</router-link></p>
                <p><router-link :to="{name:'discount_problems',params:{'id':2}}">体验金申请提示信息重复？</router-link></p>
            </span>
        </div>
        <div class="s-list">
            <router-link class="list-l" :to="{name:'game_problems'}">
                <i class="sicon i-game"></i>
                <p>游戏问题</p>
                <i class="sicon i-arrow-down"></i>
            </router-link>
            <span class="list-r">
                <p><router-link :to="{name:'game_problems',params:{'id':0}}">博林提供什么类型游戏？</router-link></p>
                <p><router-link :to="{name:'game_problems',params:{'id':1}}">最近有什么出分游戏？</router-link></p>
                <p><router-link :to="{name:'game_problems',params:{'id':2}}">怎么查看游戏记录？</router-link></p>
            </span>
        </div>
    </div>
    <div class="service-footer">
      <router-link :to="{name:'agentregister'}">加盟合作</router-link>   ｜  
      <router-link :to="{name:'aboutUs'}">关于我们</router-link>    
  </div>
  <call-back :showWindow=showWindow @closeBox="closeBox"></call-back>
  <wechat-service :showWechat=showWechat @closeBox="closeBox"></wechat-service>
  </div>
</template>
<script>
import { SETTING } from "@/assets/data"
import callBack from 'mobile/views/common/back-Call'
import wechatService from "./components/wechat-service"
export default {
  data() {
    return {
        SETTING,
        showWindow:false,
        showWechat:false
        };
    },
    methods:{
        closeBox(){
            this.showWindow =false;
            this.showWechat =false;
        }
    },
    components: {
        callBack,wechatService
    }
};
</script>
<style lang='scss' scoped>
.serviceCenter {
  background: #f5f5f5;
  .service-panel,
  .self-nav-box {
    background: #fff;
    .h3 {
      font-size: 15px;
      color: #000000;
      padding: 0 0 0 10px;
      height: 40px;
      line-height: 40px;
      font-weight: normal;
    }
  }
  .service-panel {
    ul {
      display: -webkit-box;
      display: -webkit-flex;
      display: -moz-box;
      display: -ms-flexbox;
      display: flex;
      li {
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        -moz-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        text-align: center;
        font-size: 15px;
        color: #666666;
        padding: 0 0 10px 0;
        a {
          color: #666666;
        }
      }
    }
    .sicon {
      width: 38px;
      height: 39px;
      background: url(./images/icons.png) no-repeat;
      display: inline-block;
      background-size: 63px;
    }
    .i-online {
      background-position: 0 -41.5px;
    }
    .i-phone {
      background-position: 0 -83px;
    }
    .i-voice {
      background-position: 0 -124px;
    }
    .i-mail {
      background-position: 0 0;
    }
  }
  .self-nav-box {
    margin-top: 10px;
    .more {
      font-size: 14px;
      color: #999;
      float: right;
      margin-right: 10px;
    }
    .s-list {
      border-top: 1px solid #eee;
      display: -webkit-box;
      display: -webkit-flex;
      display: -moz-box;
      display: -ms-flexbox;
      display: flex;
      &:last-child {
        border-bottom: 1px solid #eee;
      }
    }
    .list-l {
      border-right: 1px solid #eee;
      -webkit-box-flex: 3;
      -webkit-flex: 3;
      -moz-box-flex: 3;
      -ms-flex: 3;
      flex: 3;
      text-align: center;
      padding-top: 18px;
      line-height: 30px;
      font-size: 14px;
      color: #666666;
    }
    .sicon {
      width: 20px;
      height: 20px;
      margin: 6px 0;
      background: url(./images/icons.png) no-repeat;
      display: inline-block;
      background-size: 63px;
    }
    .i-game {
      background-position: -43px 0;
    }
    .i-money {
      background-position: -43px -48px;
    }
    .i-account {
      background-position: -43px -75px;
    }
    .i-youhui {
      background-position: -43px -25px;
    }
    .i-arrow-down {
      background-position: -43px -99px;
      height: 10px;
    }
    .list-r {
      -webkit-box-flex: 7;
      -webkit-flex: 7;
      -moz-box-flex: 7;
      -ms-flex: 7;
      flex: 7;
      p {
        border-bottom: 1px solid #eee;
        height: 44px;
        line-height: 44px;
        margin: 0;
        font-size: 15px;
        color: #333333;
        padding-left: 12px;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        a {
          display: block;
          color: #333333;
        }
        &:last-child {
          border-bottom: 0;
        }
      }
    }
  }
  .service-footer {
    padding: 18px 10px;
    font-size: 14px;
    color: #666666;
    text-align: center;
    a {
      color: #666666;
    }
  }
}
</style>

