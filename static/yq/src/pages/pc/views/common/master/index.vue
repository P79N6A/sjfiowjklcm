<template>
  <div class="user-page" v-if="isUser">
    <div class="user-top">
      <banner></banner>
      <user-top></user-top>
    </div>
    <div class="user-content content">
      <v-menu></v-menu>
      <router-view></router-view>
    </div>
  </div>
  <div class="user-page" v-else>
    <div class="user-top">
      <banner></banner>
      <user-top></user-top>
    </div>
    <div class="agent-content content">
      <keep-alive>
        <router-view class="routers"></router-view>
      </keep-alive>
    </div>
  </div>
</template>
<script>
//  import {mapGetters, mapActions, mapMutations} from 'vuex'
  import banner from "./components/banner";
  import vMenu from "./components/menu-user/"
  import userTop from "./components/user-top/"
  import {
    mapGetters
  } from 'vuex'
  export default {
    data() {
      return {};
    },
    props: {},
    methods: {},
    computed: {
      ...mapGetters(["userData","unread","isUser"]),
    },
    created() {
    },
    components: {
      vMenu,userTop, banner,
    } 
  };
</script>
<style lang="scss" scoped>
  .user-page{
    // padding:40px 0;
    // background:#f2f2f2;
      background:#2c271f;
    background-image: url('./images/bg.png');
    background-repeat:no-repeat;
    background-position: bottom;
    .user-content{
      padding:20px 0;
      background:transparent;
      min-height:800px;
      display:flex;
      justify-content: space-between;
    }
    .agent-content{
      // padding:20px;
      // background:#f2f2f2;
      min-height:800px;
      display:flex;
      justify-content: space-between;
      .routers{
        width: 100%;
        // background: #fff;
      }
      .u-c-shows{
        width: 100%;
      }
    }
  .u-c-shows{
    width:930px;
    .u-c-menu{
      display:flex;
      justify-content:space-between;
      .u-c-router{
        border:solid 2px #c7e9fd;
        border-bottom:none!important;
        padding:0 60px;
        font-size:14px;
        color:#343434;
        position:relative;
        cursor:pointer;
          &:before{
            content:'';
            width:100%;
            background:none;
            height:5px;
            position:absolute;
            bottom:-4px;
            left:0;
          }
        &:hover,&.active{
          border:solid 2px #25b79e;
          &:before{
            background:#fff;
          }
        }
        .icobjh{
          color:#25b79e;
          margin-right:10px;
          font-size:26px;
          vertical-align:middle;
          height:40px;
          line-height:40px;
        }
      }
    }
    .u-c-box{
      min-height:700px;
      border:solid 1px #ccc;
      padding:20px;
      background: #ffffff;
    }
  }
  }

</style>

