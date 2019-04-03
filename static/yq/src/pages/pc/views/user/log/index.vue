<template>
  <div class="user-log">
    <div class="log-router">
      <router-link class="tag" :to="{name:'log_deposit'}">
        <i class="iconfont icon-wenjian"></i>
        <p>在线支付记录</p>
      </router-link>
      <router-link class="tag" :to="{name:'log_withdraw'}">
        <i class="iconfont icon-wenjian"></i>
        <p>提款记录</p>
      </router-link>
      <router-link class="tag" :to="{name:'log_transfer'}">
        <i class="iconfont icon-wenjian"></i>
        <p>户内转账记录</p>
      </router-link>
      <router-link class="tag" :to="{name:'log_concessionReccords'}">
        <i class="iconfont icon-wenjian"></i>
        <p>优惠活动记录</p>
      </router-link>
      <router-link class="tag" :to="{name:'log_couponRecords'}">
        <i class="iconfont icon-wenjian"></i>
        <p>自助优惠</p>
      </router-link>
      <router-link class="tag" :to="{name:'log_ximaDetail'}">
        <i class="iconfont icon-wenjian"></i>
        <p>自助返水记录</p>
      </router-link>
      <router-link class="tag" :to="{name:'log_deputyRecords'}">
        <i class="iconfont icon-wenjian"></i>
        <p>副账户优惠</p>
      </router-link>
      <!-- <router-link class="tag" :to="{name:'log_friend'}">
        <i class="iconfont icon-wenjian"></i>
        <p>好友推荐</p>
      </router-link>-->
    </div>
    <div class="log-view">
      <keep-alive v-if="!$route.meta.noCache">
        <router-view>
          <!-- 需要缓存的页面 -->
          <!-- 页面内容可视部分 -->
        </router-view>
      </keep-alive>

      <router-view v-if="$route.meta.noCache">
        <!-- 页面内容可视部分 -->
      </router-view>
    </div>
  </div>
</template>
<script>
import { userLog } from "@/controls/logs/userLog";
export default {
  mixins: [userLog],
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.user-log {
  width: 100%;
  .log-router {
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
  .log-view {
    padding: 20px;
  }
  .form-box {
    .row-group {
      padding: 14px 0 5px 0;
    }

    .inputbox {
      display: inline-block;
      margin: 5px 16px 5px 0;
    }
  }
}

.u-c-router {
  padding: 0 15px !important;
}
</style>
