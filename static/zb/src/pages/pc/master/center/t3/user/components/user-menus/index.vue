<template>
  <div class="sidebar">
    <div class="sidenav">
      <router-link class="sidenav-item" :to="{name: 'deposit'}">
        <span class="side-text">存款</span>
      </router-link>

      <router-link class="sidenav-item" :to="{name: 'drawmoney'}">
        <span class="side-text">取款</span>
      </router-link>

      <router-link class="sidenav-item" :to="{name: 'transfer'}">
        <span class="side-text">转账</span>
      </router-link>
      
      <router-link class="sidenav-item" :to="{name: 'user_setting'}">
        <span class="side-text">账户设置</span>
      </router-link>
      
      <router-link class="sidenav-item" :to="{name: 'user_discount'}">
        <span class="side-text">自助优惠</span>
      </router-link>
      
      <router-link class="sidenav-item" :to="{name: 'user_log'}">
        <span class="side-text">记录查询</span>
      </router-link>
      <router-link class="sidenav-item noborder" :to="{name: 'message'}">
        <el-badge :value="unread || ''" :max="50">
            <span class="side-text">站内消息</span>
        </el-badge>
      </router-link>
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
      ...mapGetters(["userData","unread","isUser"]),
    },
    created() {}
  };

</script>
<style lang="scss" scoped>
 .sidebar {
    width: 100%;
    position: relative;
    z-index: 10;
    text-align: center;
    border: 1px solid #303030;
    margin-bottom: 40px;
    background-color: rgba(9, 11, 20, 0.70);
    .userbox {
      width: 100%;
      text-align: center;
    }
    .sidenav {
      font-weight: normal;
      position: relative;
      display: flex;
      justify-content: flex-start;
      .noborder {
      	border:none !important;    
      }
      .sidenav-item {
        background-repeat: no-repeat;
        background-position: right 30px center;
        position: relative;
        display: block;
        text-align: center;
        color: #fff;
        font-size: 16px;
        letter-spacing: 2px;
        height: 50px;
        line-height: 50px;
        width: 14.28%;
        border-right: 1px solid #303030;
        &:hover,
        &.active {
          background: #0181fa; /* Old browsers */
					background: -moz-linear-gradient(left,  #0181fa 0%, #16d6ff 100%); /* FF3.6-15 */
					background: -webkit-linear-gradient(left,  #0181fa 0%,#16d6ff 100%); /* Chrome10-25,Safari5.1-6 */
					background: linear-gradient(to right,  #0181fa 0%,#16d6ff 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
					filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#0181fa', endColorstr='#16d6ff',GradientType=1 ); /* IE6-9 */
					color: #FFFFFF;
					&::before {
	          transition: border-color 0.5s;
	          position: absolute;
	          content: "";
	          bottom: -15px;
	          left: 50%;
	          transform: translateX(-50%);
	          width: 0px;
	          height: 0px;
	           width: 0;
				     height: 0;
				     border-left: 8px solid transparent;
				     border-right: 8px solid transparent;
				     border-top: 16px solid #0cacfd;
	        }
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
  }

</style>
