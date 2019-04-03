<template>
  <div class="download-menu">
        <ul>
            <li :class="{on:cur == 'app'}" @click="chooseMenu('app')">
                <div class="nav-list-container">
                    <div class="nav-list-logo nav-list-logo-bg1">
                        <!--<img src="/images/downcenter/nav1.png" alt="">-->
                    </div>
                    <div class="nav-list-context">
                        <p>游戏专区下载</p>
                        <p>PC／APP／客户端下载</p>
                    </div>
                </div>
            </li>
            <li :class="{on:cur == 'tool'}" @click="chooseMenu('tool')">
                <div class="nav-list-container">
                    <div class="nav-list-logo nav-list-logo-bg2">
                        <!--<img src="/images/downcenter/nav2.png" alt="">-->
                    </div>
                    <div class="nav-list-context">
                        <p>热门工具下载</p>
                        <p>游戏加速器／谷歌浏览器／火狐浏览器</p>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
  import {
    generateQRCode
  } from "@/api/show"
  import {
    SETTING,
    WEBCONFIG,
    Download
  } from "@/assets/data"
  export default {
    name: "",
    data() {
      return {
        cur: "app",
      }
    },
    watch: {},
    methods: {
      chooseMenu(type) {
        this.cur = type;
        this.$bus.$emit('getDownloadPage', type)
      }
    },
    created() {
    },
    activated() {},
    components: {}
  }

</script>
<style lang="scss" scoped>
  .download-menu{
    position: relative;
    box-shadow: 0 4px 8px rgba(0, 0, 0, .3);
    background: #fff;
    width: 100%;
    height: 120px;
    ul{
      width: 1200px;
      height: 120px;
      margin: 0 auto;
      li{
        float: left;
        width: 50%;
        height: 120px;
        font-size: 22px;
        color: #fff;
        background-color: #e2e2e2;
        cursor: pointer;
        .nav-list-container {
            width: 70%;
            height: 120px;
            /* margin: 0 auto; */
            margin-left: 21%;
            .nav-list-logo {
                float: left;
                margin: 20px;
                width: 80px;
                height: 80px;
            }
            .nav-list-context {
              float: left;
              p{
                &:nth-child(1){
                  color: #000;
                  font-size: 18px;
                  font-weight: bold;
                  margin: 25px 0 15px;
                }
                &:nth-child(2){
                  font-size: 14px;
                  color: #787876;
                }
              }
            }
        }
        &:nth-child(1){
          .nav-list-logo-bg1{
            background: url(./images/1-1.png) no-repeat center;
          }
          &.on{
            .nav-list-logo-bg1{
              background: url(./images/1.png) no-repeat center;
            }
          }
        }
        &:nth-child(2){
          .nav-list-logo-bg2{
            background: url(./images/2-2.png) no-repeat center;
          }
          &.on{
            .nav-list-logo-bg2{
              background: url(./images/2.png) no-repeat center;
            }
          }
        }
        &:hover,&.on{
          background: #fd4747;
          .nav-list-container{
            .nav-list-context{
              p{
                &:nth-child(1),&:nth-child(2){
                  color: #fff;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
