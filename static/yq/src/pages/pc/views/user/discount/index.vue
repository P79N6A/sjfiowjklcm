<template>
  <div class="discount">
    <div class="discount-router">
      <router-link class="tag" :to="{name:'discount_washcode'}">
        <i class="iconfont icon-qiandai"></i>
        <p>自助返水</p>
      </router-link>
      <router-link class="tag" :to="{name:'discount_experience'}">
        <i class="iconfont icon-zhifubaozhanneidaeshoufukuan"></i>
        <p>体验金</p>
      </router-link>
      <router-link class="tag" :to="{name:'discount_savesend'}">
        <i class="iconfont icon-cunsong"></i>
        <p>自助存送</p>
      </router-link>
      <router-link class="tag" :to="{name:'discount_coupon'}">
        <i class="iconfont icon-quan"></i>
        <p>存送优惠券</p>
      </router-link>
      <router-link class="tag" :to="{name:'discount_redenvelope'}">
        <i class="iconfont icon-quan"></i>
        <p>红包优惠券</p>
      </router-link>
      <router-link class="tag" :to="{name:'discount_help'}">
        <i class="iconfont icon-chouma"></i>
        <p>救援金</p>
      </router-link>
      <router-link class="tag" :to="{name:'discount_vip'}">
        <i class="iconfont icon-zizhujinji"></i>
        <p>自助晋级</p>
      </router-link>
      <router-link class="tag" :to="{name:'discount_birthday'}">
        <i class="iconfont icon-shengrizhuanqu"></i>
        <p>VIP生日礼金</p>
      </router-link>
      <!-- <router-link class="tag" :to="{name:'discount_recommend'}">
        <i class="icobjh bjh-tongzhi"></i>
        <p>好友推荐</p>
      </router-link>-->
    </div>
    <div class="mainContents">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // menuList: [
      //   {
      //     name: "体验金",
      //     to: "discount_experience"
      //   },
      //   {
      //     name: "存送优惠",
      //     to: "discount_savesend"
      //   },
      //   // {name: "洗码", to: "discount_washcode"},
      //   {
      //     name: "存送券",
      //     to: "discount_coupon"
      //   },
      //   {
      //     name: "红包券",
      //     to: "discount_redenvelope"
      //   },
      //   {
      //     name: "救援金",
      //     to: "discount_help"
      //   },
      //   {
      //     name: "VIP礼金",
      //     to: "discount_vip"
      //   },
      //   {
      //     name: "生日礼金",
      //     to: "discount_birthday"
      //   },
      //   {
      //     name: "推荐好友",
      //     to: "discount_recommend"
      //   }
      // ]
    };
  }
};
</script>
<style lang="scss" scoped>
.discount {
  .discount-router {
    display: flex;
    justify-content: space-between;
    .tag {
      margin: 0;
      line-height: 1;
      font-size: 12px;
      color: #333;
      background: #fff;
      height: 70px;
      flex: 1;
      text-align: center;
      &:hover,
      &.active {
        color: #fff;
        background: #4db7f4;
        i {
          color: #fff;
        }
      }
      i {
        line-height: 48px;
        margin-bottom: 5px;
        margin-right: 0;
        color: #4db7f4;
        font-size: 26px;
      }
    }
  }

  .mainContents {
    padding: 40px;
  }
}
</style>
