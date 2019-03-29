<template>
  <div class="u-c-shows">
    <div class="u-c-box">
      <div class="wallet-menus">
        <router-link class="wallet-menus-item" v-for="item in menuList" :to="{name:item.to}" :key="item.name">
          <div class="u-c-router">{{item.name}}</div>
        </router-link>
      </div>
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
      menuList: [
        { name: "体验金", to: "discount_experience" },
        { name: "存送优惠", to: "discount_savesend" },
        { name: "洗码", to: "discount_washcode" },
        { name: "存送券", to: "discount_coupon" },
        { name: "红包券", to: "discount_redenvelope" },
        { name: "救援金", to: "discount_help" },
        { name: "VIP礼金", to: "discount_vip" },
        { name: "生日礼金", to: "discount_birthday" },
        { name: "推荐好友", to: "discount_recommend" }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.u-c-shows {
  .u-c-box {
    padding: 20px;
    background-color: rgba(0, 0, 0, 0.7);
    border: 1px solid #303030;
    min-height: 400px;
    .wallet-menus {
      width: 100%;
      // padding: 0 3%;
      margin-bottom: 20px;
      .wallet-menus-item {
        margin: 5px auto;
        display: inline-block;
      }
      .u-c-router {
        padding: 6px 20px;
        font-size: 16px;
        width: 129px;
        height: 33px;
        line-height: 30px;
        color: #ddd;
        margin-right: 15px;
        text-align: center;
        background: #0a435d;
        display: inline-block;
      }
      .active {
        .u-c-router {
          background: #0181fa; /* Old browsers */
          background: -moz-linear-gradient(
            left,
            #0181fa 0%,
            #16d6ff 100%
          ); /* FF3.6-15 */
          background: -webkit-linear-gradient(
            left,
            #0181fa 0%,
            #16d6ff 100%
          ); /* Chrome10-25,Safari5.1-6 */
          background: linear-gradient(
            to right,
            #0181fa 0%,
            #16d6ff 100%
          ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
          filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#0181fa', endColorstr='#16d6ff',GradientType=1 ); /* IE6-9 */
          color: #fff;
        }
      }
    }
  }
}
.user-discount {
  .discount-content {
    padding: 50px 30px 30px;
  }
  .title-tip {
    color: #666;
    font-size: 18px;
    text-align: center;
    margin: 0 0 20px;
    font-weight: bold;
    line-height: 1.5;
  }
  .bottom-tip {
    color: #ffecb7;
    text-align: center;
    width: 100%;
    line-height: 1.5;
  }
}
.u-c-router {
  padding: 0 20px !important;
}
</style>
