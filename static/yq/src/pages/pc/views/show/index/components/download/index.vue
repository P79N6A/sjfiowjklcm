<template>
  <div class="download inblock clear">
    <div class="app_part fl">
      <div>
        <i class="iconfont icon-shoujiAppxiazai"></i>
      </div>
      <h3>下载专区</h3>
      <router-link :to="{name:'downloadIndex'}" id="j-download-action">
        <span class="link-spanner"></span>
      </router-link>
    </div>
    <div class="down_part fl">
      <div>
        <i class="iconfont icon-dailijiameng"></i>
      </div>
      <h3>代理加盟</h3>
      <router-link :to="{name:'agentarea'}" target="_blank">
        <span class="link-spanner"></span>
      </router-link>
    </div>
  </div>
</template>
<script>
</script>
<style lang="scss" scoped>
.download {
  width: 330px;
  .app_part {
    width: 165px;
    height: 150px;
    position: relative;
    background: rgb(89, 219, 208); /* Old browsers */
    background: -moz-linear-gradient(
      top,
      rgba(89, 219, 208, 1) 0%,
      rgba(77, 183, 244, 1) 100%
    ); /* FF3.6-15 */
    background: -webkit-linear-gradient(
      top,
      rgba(89, 219, 208, 1) 0%,
      rgba(77, 183, 244, 1) 100%
    ); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(
      to bottom,
      rgba(89, 219, 208, 1) 0%,
      rgba(77, 183, 244, 1) 100%
    ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#59dbd0', endColorstr='#4db7f4',GradientType=0 ); /* IE6-9 */

    text-align: center;
    font-size: 18px;
    color: #fff;
    transition: all 0.5s;
    > div {
      padding: 20px;
    }
    .iconfont {
      font-size: 62px;
    }
    h3 {
      font-size: 18px;
      font-weight: normal;
      line-height: 1.8;
    }
    &:hover {
      background: #59dbd0;
      transition: all 0.5s;
    }
  }
  .down_part {
    width: 165px;
    height: 150px;
    position: relative;
    background: #44a7e0;
    text-align: center;
    font-size: 18px;
    color: #fff;
    transition: all 0.5s;
    > div {
      padding: 20px;
    }
    .iconfont {
      font-size: 62px;
    }
    h3 {
      font-size: 18px;
      font-weight: normal;
      line-height: 1.8;
    }
    &:hover {
      background: #59dbd0;
      transition: all 0.5s;
    }
  }
}
.link-spanner {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
}
.fl {
  float: left !important;
}
.inblock {
  display: inline-block;
  vertical-align: top;
  font-size: 14px;
  letter-spacing: normal;
  zoom: 1;
}
.clear {
  clear: none !important;
  &::after {
    content: "";
    display: block;
    clear: both;
  }
}
</style>
