<template>
  <div class="sidebar" v-if="isAgent">
    <div class="sidenav">
      <router-link class="sidenav-item" :to="{name: 'user_setting'}" style="background:#09affe;">
        <span class="icobjh bjh-Management"></span>
        <span class="side-text">代理中心</span>
        <span class="iconfont icon-arrow-right"></span>
      </router-link>

      <!-- <router-link class="sidenav-item" :to="{name: 'finance_deposit'}" style="background:#df5555;">
        <span class="icobjh bjh-chongzhi"></span>
        <span class="side-text">充值</span>
        <span class="iconfont icon-arrow-right"></span>
      </router-link> -->

      <router-link class="sidenav-item" :to="{name: 'finance_drawmoney'}" style="background:#df5555;">
        <span class="icobjh bjh-tikuan"></span>
        <span class="side-text">申请提款</span>
        <span class="iconfont icon-arrow-right"></span>
      </router-link>

      <router-link class="sidenav-item" :to="{name: 'agent_summary'}" style="background:#5cb4c8;">
        <span class="icobjh bjh-yewubaobiao"></span>
        <span class="side-text">数据汇总</span>
        <span class="iconfont icon-arrow-right"></span>
      </router-link>

      <div class="menu-grid">
        <router-link class="m-g-item" :to="{name: 'agent_ptcommission'}">
          <span class="icobjh bjh-yewubaobiao"></span>
          <span class="side-text">佣金报表</span>
        </router-link>
        <router-link class="m-g-item" :to="{name: 'agent_memberlist'}">
          <span class="icobjh bjh-yewubaobiao"></span>
          <span class="side-text">会员列表</span>
        </router-link>
        <router-link class="m-g-item" :to="{name: 'agent_deposit'}">
          <span class="icobjh bjh-yewubaobiao"></span>
          <span class="side-text">会员账务</span>
        </router-link>
        <router-link class="m-g-item" :to="{name: 'agent_creditlog'}">
          <span class="icobjh bjh-yewubaobiao"></span>
          <span class="side-text">额度记录</span>
        </router-link>
        <router-link class="m-g-item" :to="{name: 'user_message'}">
          <el-badge :value="unread?unread:''" :max="50">
            <span class="icobjh bjh-yewubaobiao"></span>
            <span class="side-text">站内信</span>
          </el-badge>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    mapGetters
  } from 'vuex'
  export default {
    data() {
      return {

      };
    },
    props: {
      data: {
        type: Array,
        default () {
          return [];
        }
      }
    },
    methods: {

    },
    computed: {
      ...mapGetters(["userData","unread","isAgent"]),
    },
    created() {}
  };

</script>
<style lang="scss" scoped="">
  .sidebar {
    width: 225px;
    min-height: 800px;
    position: relative;
    z-index: 10;
    text-align: center;
    .userbox {
      width: 100%;
      text-align: center;
    }
    .sidenav {
      font-weight: normal;
      position: relative;
      background: #fff;
      .sidenav-item {
        background-repeat: no-repeat;
        background-position: right 30px center;
        position: relative;
        display: block;
        text-align: left;
        padding: 0 20px;
        margin-bottom: 14px;
        border-radius: 6px;
        color: #969696;
        font-size: 16px;
        letter-spacing: 2px;
        height: 50px;
        line-height: 50px;
        color: #fff;
        transition: all 0.3s;
        &:hover,
        &.active {
          background: rgb(255, 236, 183);
          background: -moz-linear-gradient(top, rgba(255, 236, 183, 1) 0%, rgba(255, 209, 120, 1) 100%);
          background: -webkit-linear-gradient(top, rgba(255, 236, 183, 1) 0%, rgba(255, 209, 120, 1) 100%);
          background: linear-gradient(to bottom, rgba(255, 236, 183, 1) 0%, rgba(255, 209, 120, 1) 100%);
          filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffecb7', endColorstr='#ffd178', GradientType=0);
          padding: 10px 20px;
        }
        &::before {
          transition: border-color 0.5s;
          position: absolute;
          content: "";
          top: 0px;
          right: -10px;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 25px 0 25px 10px;
          border-color: transparent transparent transparent transparent;
        }
        .icobjh {
          font-size: 20px;
          vertical-align: middle;
        }
        .icon-arrow-right {
          position: absolute;
          right: 30px;
          font-size: 20px;
        }
      }
    }
    .menu-grid {
      .m-g-item {
        display: block;
        padding: 20px 10px;
        border: solid 1px #eee;
        font-size: 14px;
        border-bottom: none;
        color: #343434;
        .icobjh {
          margin-right: 10px;
          font-size: 24px;
          vertical-align: middle;
        }
        &:hover,
        &.active {
          background: #eee;
        }
        &:last-child {
          border-bottom: solid 1px #eee;
        }
      }
    }
  }

</style>
