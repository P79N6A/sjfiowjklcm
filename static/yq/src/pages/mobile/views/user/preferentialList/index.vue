<template>
  <div class="preferentialList">
    <div class="flex menu-list-box">
      <router-link :to="{name:'user_savesend'}" class="flex menu-list-item">
        <span class="main-ico deposit"></span>
        <span class="menu-text">自助存送</span>
        <span class="iconcent ct-jiantou"></span>
      </router-link>
      <router-link :to="{name:'user_helpgold'}" class="flex menu-list-item">
        <span class="main-ico save"></span>
        <span class="menu-text">救援金</span>
        <span class="iconcent ct-jiantou"></span>
      </router-link>
      <router-link :to="{name:'user_washcode'}" class="flex menu-list-item">
        <span class="main-ico back"></span>
        <span class="menu-text">自助返水</span>
        <span class="iconcent ct-jiantou"></span>
      </router-link>
      <router-link :to="{name:'user_vipgold'}" class="flex menu-list-item">
        <span class="main-ico rank"></span>
        <span class="menu-text">自助晋级</span>
        <span class="iconcent ct-jiantou"></span>
      </router-link>
    </div>
    <div class="flex menu-list-box">
      <!-- <router-link :to="{name:'user_experiencegold'}" class="flex menu-list-item"> -->
      <a class="flex menu-list-item" @click="downAPP">
        <span class="main-ico experice"></span>
        <span class="menu-text">体验金</span>
        <span class="iconcent ct-jiantou"></span>
      </a>
      <!-- </router-link> -->
    </div>
    <div class="flex menu-list-box">
      <router-link :to="{name:'couponList',params:{type:'coupon'}}" class="flex menu-list-item">
        <span class="main-ico deposit_coupon"></span>
        <span class="menu-text">存送优惠券</span>
        <span class="iconcent ct-jiantou"></span>
      </router-link>

      <router-link :to="{name:'couponList',params:{type:'hongbao'}}" class="flex menu-list-item">
        <span class="main-ico red_coupon"></span>
        <span class="menu-text">红包优惠券</span>
        <span class="iconcent ct-jiantou"></span>
      </router-link>
    </div>
    <div class="flex menu-list-box">
      <router-link :to="{name:'user_birthdaygold'}" class="flex menu-list-item">
        <span class="main-ico birthday"></span>
        <span class="menu-text">生日礼金</span>
        <span class="iconcent ct-jiantou"></span>
      </router-link>
    </div>
  </div>
</template>
<script>
import { Download } from "@/assets/data";
export default {
  data() {
    return {
      Download
    };
  },
  methods: {
    downAPP() {
      $alert(
        "请登入奇幻城APP-进入【个人中心】-【自助优惠】-【自助体验金】进行申请！",
        "提示",
        {
          confirmText: "下载APP"
        }
      ).then(() => {
        window.open(Download.app);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~mobile/assets/scss/mixin.scss";

.preferentialList {
  background: #f7f7f7;

  .menu-list-box {
    background: #fff;
    flex-direction: column;
    width: 100%;
    border-top: 1px solid rgba($color: #ddd, $alpha: 0.6);
    // border-bottom: 1px solid #d6d6d6;
    margin-bottom: r(20);

    .menu-list-item {
      border-bottom: 1px solid rgba($color: #ddd, $alpha: 0.6);
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

      .deposit {
        background: url("./images/ico_pro_deposit.png") no-repeat;
        background-size: contain;
        background-position: center;
      }

      .back {
        background: url("./images/ico_pro_back.png") no-repeat;
        background-size: contain;
        background-position: center;
      }

      .birthday {
        background: url("./images/ico_pro_birthday.png") no-repeat;
        background-size: contain;
        background-position: center;
      }

      .deposit_coupon {
        background: url("./images/ico_pro_deposit_coupon.png") no-repeat;
        background-size: contain;
        background-position: center;
      }

      .experice {
        background: url("./images/ico_pro_experice.png") no-repeat;
        background-size: contain;
        background-position: center;
      }

      .rank {
        background: url("./images/ico_pro_rank.png") no-repeat;
        background-size: contain;
        background-position: center;
      }

      .red_coupon {
        background: url("./images/ico_pro_red_coupon.png") no-repeat;
        background-size: contain;
        background-position: center;
      }

      .save {
        background: url("./images/ico_pro_save.png") no-repeat;
        background-size: contain;
        background-position: center;
      }
    }
  }
}
</style>
