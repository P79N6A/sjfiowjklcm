<template>
  <div>
    <div class="flex menu-list-box">
      <router-link :to="{name:'preferentialList'}" class="flex menu-list-item">
        <span class="main-ico pro"></span>
        <span class="menu-text">自助优惠</span>
        <span class="iconcent ct-jiantou"></span>
      </router-link>
      <!-- <router-link :to="{name:'preferentialList'}" class="flex menu-list-item">
        <span class="main-ico pro"></span>
        <span class="menu-text">个人信息</span>
        <span class="iconcent ct-jiantou"></span>
      </router-link>
      <router-link :to="{name:'preferentialList'}" class="flex menu-list-item">
        <span class="main-ico pro"></span>
        <span class="menu-text">银行卡管理</span>
        <span class="iconcent ct-jiantou"></span>
      </router-link>
      <router-link :to="{name:'preferentialList'}" class="flex menu-list-item">
        <span class="main-ico pro"></span>
        <span class="menu-text">密码</span>
        <span class="iconcent ct-jiantou"></span>
      </router-link>-->
      <router-link :to="{name:'user_log'}" class="flex menu-list-item">
        <span class="main-ico log"></span>
        <span class="menu-text">账户清单</span>
        <span class="iconcent ct-jiantou"></span>
      </router-link>
      <!-- <router-link :to="{name:'cooperation'}" class="flex menu-list-item">
        <span class="main-ico friend"></span>
        <span class="menu-text">代理加盟</span>
        <span class="iconcent ct-jiantou"></span>
      </router-link>-->
      <router-link :to="{name:'hijacking'}" class="flex menu-list-item">
        <span class="main-ico yue"></span>
        <span class="menu-text">防域名劫持帮助</span>
        <span class="iconcent ct-jiantou"></span>
      </router-link>
    </div>

    <div class="flex menu-list-box">
      <router-link :to="{name:'personalList'}" class="flex menu-list-item">
        <span class="main-ico setting"></span>
        <span class="menu-text">账户设置</span>
        <span class="iconcent ct-jiantou"></span>
      </router-link>
      <router-link :to="{name:'guideMenu'}" class="flex menu-list-item">
        <span class="main-ico guide"></span>
        <span class="menu-text">新手指南</span>
        <span class="iconcent ct-jiantou"></span>
      </router-link>
      <!-- <router-link :to="{name:'message'}" class="flex menu-list-item">
        <span class="main-ico message"></span>
        <span class="menu-text">站内信</span>
        <span class="iconcent ct-jiantou"></span>
        <span class="unread" v-if="unread">new</span>
      </router-link>-->
      <router-link :to="{name:'serviceList'}" class="flex menu-list-item">
        <span class="main-ico service"></span>
        <span class="menu-text">服务中心</span>
        <span class="iconcent ct-jiantou"></span>
      </router-link>
      <a href="javascript:void(0);" class="flex menu-list-item" @click="logout">
        <span class="main-ico logout"></span>
        <span class="menu-text">退出账号</span>
        <span class="iconcent ct-jiantou"></span>
      </a>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  props: {
    value: {}
  },
  watch: {},
  methods: {
    gotoPreferential(url) {
      if (!this.userData.accountName) {
        $confirm("<p>请您先在账户设置里完善个人资料或完成手机号码验证。</p>", {
          cancelText: "取消",
          confirmText: "确定"
        }).then(
          () => {
            // 确认 废弃并生成新订单
            this.$router.push({ name: "personal" });
          },
          () => {
            // 取消  查看订单
            return false;
          }
        );
      } else if (this.userData.phoneValidStatus == "0") {
        // 存在数据库是‘0’，后期要调整成BOOLEAN
        $confirm("<p>请您先在账户设置里完善个人资料或完成手机号码验证。</p>", {
          cancelText: "取消",
          confirmText: "确定"
        }).then(
          () => {
            // 确认 废弃并生成新订单
            this.$router.push({ name: "personal" });
          },
          () => {
            // 取消  查看订单
            return false;
          }
        );
      } else {
        this.$router.push({ name: url });
      }
    },
    logout() {
      this.$store.dispatch("LOGIN_OUT");
    }
  },
  created() {},
  computed: {
    ...mapGetters(["userData", "unread"])
  }
};
</script>
<style lang="scss" scoped>
@import "~mobile/assets/scss/mixin.scss";
.menu-list-box {
  background: #fff;
  flex-direction: column;
  width: 100%;
  margin-bottom: r(20);
  .menu-list-item {
    border-bottom: 1px solid #ccc;
    @include f(30px);
    justify-content: space-between;
    align-items: center;
    text-align: center;
    width: 100%;
    height: r(90);
    position: relative;
    .unread {
      position: absolute;
      right: r(80);
      top: 50%;
      transform: translateY(-50%);
      background: #ff3b30;
      border-radius: r(25);
      color: #ffffff;
      padding: r(5) r(10) r(8);
      @include f(24px);
    }
    .menu-ico {
      color: $iconcl;
      @include f(46px);
      flex: 1;
    }
    .tipstxt {
      position: absolute;
      right: r(-20);
      top: 46%;
      transform: translateY(-50%);
      color: #888;
    }
    .menu-text {
      flex: 5;
      text-align: left;
      font-family: PingFangSC-Regular;
      @include f(28px);
      color: #333;
      line-height: r(75);
      position: relative;
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
    .guide {
      background: url("./images/guide.png") no-repeat;
      background-size: contain;
      background-position: center;
    }
    .yue {
      background: url("./images/ico_mine_balance.png") no-repeat;
      background-size: contain;
      background-position: center;
    }
    .log {
      background: url("./images/ico_mine_list.png") no-repeat;
      background-size: contain;
      background-position: center;
    }
    .pro {
      background: url("./images/ico_limit@3x.png") no-repeat;
      background-size: contain;
      background-position: center;
    }
    .message {
      background: url("./images/ico_group@3x.png") no-repeat;
      background-size: contain;
      background-position: center;
    }
    .friend {
      background: url("./images/ico_mine_recommend.png") no-repeat;
      background-size: contain;
      background-position: center;
    }
    .setting {
      background: url("./images/ico_mine_setting.png") no-repeat;
      background-size: contain;
      background-position: center;
    }
    .logout {
      background: url("./images/ico_mine_quit.png") no-repeat;
      background-size: contain;
      background-position: center;
    }
    .service {
      background: url("./images/ico_mine_pro.png") no-repeat;
      background-size: contain;
      background-position: center;
    }
  }
}
</style>
