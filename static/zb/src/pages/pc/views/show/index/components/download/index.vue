<template>
  <div class="ios_down">
    <!--粒子移动3-->
    <div id="particles3">
      <canvas class="pg-canvas" width="622" height="160"></canvas>
    </div>
    <div class="ios_down_auto">
      <div class="frame_wrap">
        <div class="bigbox">
          <div :class="{box1:item1 == 1,box2:item1 == 2,box3:item1 == 3}" @click="chooseIdx(1)">
            <img src="./images/frame_img7.png">
          </div>
          <div :class="{box1:item2 == 1,box2:item2 == 2,box3:item2 == 3}" @click="chooseIdx(2)">
            <img src="./images/frame_img6.png">
          </div>
          <div :class="{box1:item3 == 1,box2:item3 == 2,box3:item3 == 3}" @click="chooseIdx(3)">
            <img src="./images/frame_img5.png">
          </div>
          <!-- <div :class="{box1:item4 == 1,box2:item4 == 2,box3:item4 == 3,box4:item4 == 4}" @click="chooseIdx(4)"><img src="./images/frame_img4.png"></div> -->
        </div>
        <div class="frame"></div>
      </div>
      <div class="ios_down_title"></div>
      <p class="ios_text1">原生态应用，操作体验完胜业界其他产品。全面支持手机在线存款、</p>
      <p class="ios_text2">提款、转账等功能。 体育投注真人娱乐城、快乐彩等产品完美覆盖</p>
      <div class="two_codes">
        <div class="two_codes_pic">
          <div class="base">
            <img :src="generateQRCode(Download.app,140)">
          </div>
        </div>
        <div class="ios_down_wrap">
          <p class="two_codes_text">扫描左侧二维码，即可快速下载</p>
          <!-- <router-link class="playbtn" :to="{name:'downloadTch'}"><span class="playbtn-text">IOS安装教程</span></router-link> -->
        </div>
      </div>
      <!--粒子移动4-->
      <div id="particles4">
        <canvas class="pg-canvas" width="423" height="135"></canvas>
      </div>
    </div>
  </div>
</template>
<script>
import { generateQRCode } from "@/api/show";
import { SETTING, Download } from "@/assets/data";
export default {
  data() {
    return {
      SETTING,
      Download,
      item1: 1,
      item2: 2,
      item3: 3,
      item4: 4
    };
  },
  methods: {
    generateQRCode(url, size) {
      return generateQRCode(url, size);
    },
    changeItem() {
      let _this = this;
      setInterval(function() {
        if (_this.item1 < 3) {
          _this.item1 = _this.item1 + 1;
        } else if (_this.item1 == 3) {
          _this.item1 = 1;
        }
        if (_this.item2 < 3) {
          _this.item2 = _this.item2 + 1;
        } else if (_this.item2 == 3) {
          _this.item2 = 1;
        }
        if (_this.item3 < 3) {
          _this.item3 = _this.item3 + 1;
        } else if (_this.item3 == 3) {
          _this.item3 = 1;
        }
        // if (_this.item4<4) {
        //     _this.item4 = _this.item4 + 1
        // }else if(_this.item4 == 4){
        //     _this.item4 = 1
        // }
      }, 2000);
    },
    chooseIdx(idx) {
      let _this = this;
      switch (idx) {
        case 1:
          _this.item1 = 1;
          _this.item2 = 2;
          _this.item3 = 3;
          break;
        case 2:
          _this.item1 = 3;
          _this.item2 = 1;
          _this.item3 = 2;
          break;
        case 3:
          _this.item1 = 2;
          _this.item2 = 3;
          _this.item3 = 1;
          break;
        // default:
        //     _this.item1 = 2
        //     _this.item2 = 3
        //     _this.item3 = 4
        //     _this.item4 = 1
        //     break;
      }
    }
  },
  created() {
    this.changeItem();
    this.generateQRCode("text");
  }
};
</script>
<style lang="scss" scoped>
.ios_down {
  position: relative;
  overflow: hidden;
  min-width: 1200px;
  height: 530px;
  background: url(./images/ios_down.png) no-repeat center center /100% 100%;
  #particles3 {
    position: absolute;
    left: 153px;
    top: 2px;
    width: 622px;
    height: 160px;
  }
  .ios_down_auto {
    overflow: hidden;
    position: relative;
    width: 1200px;
    height: 100%;
    margin: 10px auto;
    .frame_wrap {
      position: absolute;
      bottom: 10px;
      left: 0;
      display: inline-block;
      width: 600px;
      height: 527px;
      .bigbox {
        width: 600px;
        height: 527px;
        position: relative;
        overflow: hidden;
        .box1,
        .box2,
        .box3,
        .box4 {
          position: absolute;
          transition: 0.5s ease;
        }
        .box1 {
          width: 288px;
          height: 527px;
          bottom: 0;
          right: 0;
          z-index: 4;
        }
        .box2 {
          width: 240px;
          height: 477px;
          bottom: 0;
          right: 172px;
          z-index: 3;
        }
        .box3 {
          width: 222px;
          height: 431px;
          bottom: 0;
          right: 295px;
          z-index: 2;
        }
        .box4 {
          width: 205px;
          height: 396px;
          bottom: 0;
          right: 408px;
          z-index: 1;
        }
      }
      .frame {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 288px;
        height: 527px;
        z-index: 4;
        background: url(./images/frame.png) no-repeat;
        overflow: hidden;
      }
    }
    .ios_down_title {
      margin-top: 170px;
      margin-left: 60%;
      width: 463px;
      height: 45px;
      background: url(./images/ios_down_title.png) no-repeat;
    }
    .ios_text1 {
      margin-top: 38px;
      margin-bottom: 18px;
      margin-left: 60%;
      color: #fff;
      font-size: 14px;
    }
    .ios_text2 {
      margin-bottom: 40px;
      margin-left: 60%;
      color: #fff;
      font-size: 14px;
    }
    .two_codes {
      overflow: hidden;
      margin-left: 60%;
      .ios_down_wrap {
        float: left;
        .two_codes_text {
          font-size: 14px;
          color: #fff;
          margin: 10px 0 10px 32px;
        }
        .ios_down_btn {
          box-sizing: content-box;
          padding-left: 10px;
          display: inline-block;
          margin: 6px 0 10px 30px;
          width: 173px;
          height: 43px;
          color: #fff;
          line-height: 40px;
          border-radius: 22px;
          border: 1px solid #fff;
          font-size: 14px;
          position: relative;
          overflow: hidden;
          transition: 0.3s;
          &:after {
            left: 50%;
            bottom: 0;
            position: absolute;
            display: block;
            transition: 0.3s;
            content: "";
            width: 0;
            height: 45px;
            background: #fff;
            height: 120%;
            left: -10%;
            -webkit-transform: skewX(15deg);
            transform: skewX(15deg);
          }
          &:hover {
            &:after {
              width: 100%;
              left: -10%;
              width: 120%;
            }
            color: #3ec1fe;
            .ios_down_btn_b {
              background: url(./images/ios_a.png) no-repeat;
              background-position: 0 50%;
            }
          }
        }
      }
      .two_codes_pic {
        position: relative;
        float: left;
        width: 100px;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fff;
        background-size: 100% 100%;
        .base {
          border-radius: 15px;
          img {
            left: 6px;
            top: 6px;
          }
        }
      }
    }
  }
  #particles4 {
    position: absolute;
    right: -95px;
    bottom: 14px;
    width: 423px;
    height: 135px;
  }
}
.playbtn {
  position: relative;
  display: block;
  //   padding-left: 14px;
  //   padding-right: 10px;
  margin: 0 auto;
  box-sizing: content-box;
  width: 171px;
  height: 43px;
  color: #fff;
  line-height: 40px;
  border-radius: 21.5px;
  text-align: center;
  // border: 1px solid #fff;
  font-size: 14px;
  transition: 0.3s;
  overflow: hidden;
  background: transparent;
  border: 1px solid #fff;
  &:after {
    left: 50%;
    bottom: 0;
    position: absolute;
    display: block;
    transition: 0.3s;
    content: "";
    width: 0;
    height: 45px;
    background: #fff;
    height: 120%;
    left: -10%;
    transform: skewX(15deg);
  }
  &:hover {
    &:after {
      width: 100%;
      left: -10%;
      width: 120%;
      color: #3ec1fe;
    }
    color: #3ec1fe;
  }
  .playbtn-text {
    position: relative;
    z-index: 1;
    display: inline-block;
    vertical-align: middle;
  }
}
</style>
