<template>
  <div class="notice-page">
    <banner></banner>
    <div class="show">
      <div class="contain cfx">
        <menus class="nitice-menu fl"></menus>
        <notices class='notice-show fr'></notices>
      </div>
    </div>
  </div>
</template>
<script>
  import banner from "./components/banner"
  import menus from "pc/components/contact"
  import notices from "./components/notices"
  export default {
    data() {
      return {};
    },
    components: {
      banner,
      menus,
      notices,
    },
  }

</script>
<style lang="scss" >
  .notice-page {
    // background: #202020;
    .n-box {
      padding: 50px 0;
      display: flex;
      justify-content: space-between;
    }
    .show {
      padding-bottom: 30px;
      padding-top: 28px;
      color: #000000;
      .contain{
        width: 1200px;
        margin: 0 auto;
      }

      .notice-menu {
        width: 170px;
        text-align: center;

        .notice-menu-box {
          >div {
            background: #fff;
            padding-top: 20px;
            padding-bottom: 80px;
          }

          margin-bottom:10px;
          border-radius: 10px;
          position: relative;
          overflow: hidden;
          &:before {
            position: absolute;
            bottom: -10px;
            display: block;
            width: 100%;
            height: 10px;
            content: '';
            background-repeat: no-repeat;
            background-position: bottom;
          }
        }
        .notice-menu-title {
          font-size: 30px;
          line-height: 80px;
          height: 80px;
          color: #fff;
          background: #0b6dc3;
          background: -webkit-linear-gradient(top, #008edf 0%, #005bad 50%, #0b6dc3 100%);
          background: -webkit-gradient(linear, left top, left bottom, from(#008edf), color-stop(50%, #005bad), to(#0b6dc3));
          background: linear-gradient(to bottom, #008edf 0%, #005bad 50%, #0b6dc3 100%);
          filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#008edf', endColorstr='#0b6dc3', GradientType=1);

        }

        .notice-menu-item {
          width: 158px;
          height: 32px;
          text-align: center;
          font-size: 14px;
          line-height: 32px;
          display: block;
          cursor: pointer;
          background: #e5e5e5;

          border-radius: 20px;
          margin: 0 auto 20px;
          &.codes {
            text-align: center;
            padding-left: 0;
            height: auto;
            img {
              margin-right: 0;
              display: inline-block;
              width: 192px;
              height: 192px;
              border: solid 16px #0e7a99;
              margin-top: 20px;
            }
          }
          img {
            margin-right: 10px;
          }
          &:hover {
            background-color: #008fe0;
            color: #fff;
          }
        }
        .notice-menu-item.active {
          background-color: #0e7a99;
        }

        .codes {
          display: block;
          font-size: 18px;
        }

        .l2 {
          line-height: 14px;
          font-size: 14px;
          padding-top: 2px;
        }

        .l1 {
          padding-left: 20px;

          background: url(./images/i2.png) no-repeat 35px center #e5e5e5;

          &:hover {
            background: url(./images/i1.png) no-repeat 35px center #008fe0;
          }
        }
      }
    }
  }

</style>
