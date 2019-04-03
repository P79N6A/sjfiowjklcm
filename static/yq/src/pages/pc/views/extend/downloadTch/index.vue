<template>
  <div class="course ng-scope">
    <div class="courseBg">
      <div class="banner">
        <div class="banner-context">
          <div class="title">IOS客户端安装教程</div>
          <div class="txt">苹果手机安装过程中遇到<br>「未信任的企业及开发者」可根据教程迅速安装</div>
          <a href="javascript:;" class="button ios9-b ope-btn btn-primary"
            @click="IsShowTab = 1;" :class="IsShowTab == 1 ? 'button ios9-b ope-btn btn-primary on' : 'button ios9-b ope-btn btn-primary'"
            style="">iOS 9或以上</a>
        <a href="javascript:;" class="button ios8-b ope-btn btn-primary" @click="IsShowTab = 2;"
            :class="IsShowTab == 2 ? 'button ios8-b ope-btn btn-primary on' : 'button ios8-b ope-btn btn-primary'"
            style="">iOS 8</a>
        </div>
        <div class="banner-img"></div>
        <div class="tran1"></div>
        <div class="tran2"></div>
      </div>
    </div>
    <div class="content">
      <div class="details">
        <div class="ios ios9" v-show="IsShowTab == 1" aria-hidden="false" style="">
          <div class="title">手动安装和信任企业级应用</div>
          <div class="first-line">OPE应用是否无法正常使用？别担心，跟着以下的步骤，立即能享用史上最酷的OPE！</div>
          <div class="number">
            <div class="details padding-left">
              <div class="details-txt">1</div>
            </div>
            <div class="split split1"></div>
            <div class="split-y split1-y"></div>
            <div class="details">
              <div class="details-txt">2</div>
            </div>
            <div class="split split2"></div>
            <div class="split-y split2-y"></div>
            <div class="split1 details">
              <div class="details-txt">3</div>
            </div>
            <div class="split split3"></div>
            <div class="split-y split3-y"></div>
            <div class="details padding-right">
              <div class="details-txt">4</div>
            </div>
            <div class="split-y split4-y"></div>
          </div>
          <div class="step">
            <div class="item">
              <div class="item1"></div>
            </div>
            <div class="item">
              <div class="item2"></div>
            </div>
            <div class="item">
              <div class="item3"></div>
            </div>
            <div class="item">
              <div class="item4"></div>
            </div>
          </div>
          <div class="step-txt">
            <div class="txt">关闭此信息</div>
            <div class="txt">轻点“设置”&gt;“通用”</div>
            <div class="txt txt1">找到“描述文件”或“设备管理”。<br>在“企业级应用”标题下方，您将<br>看到该开发者的描述文件</div>
            <div class="txt">信任此文件后，即可手动安装来自同<br>一开发者的其他应用，并立即打开这<br><span class="padding-left">些应用。</span></div>
          </div>
        </div>
        <div class="ios ios8 ng-hide" v-show="IsShowTab != 1" aria-hidden="true" style="">
          <div class="title">手动安装和信任企业级应用</div>
          <div class="first-line">OPE应用是否无法正常使用？别担心，跟着以下的步骤，立即能享用史上最酷的OPE！</div>
          <div class="number">
            <div class="details">
              <div class="details-txt">1</div>
            </div>
            <div class="split split1"></div>
            <div class="split-y split1-y"></div>
            <div class="details">
              <div class="details-txt">2</div>
            </div>
            <div class="split-y split2-y"></div>
          </div>
          <div class="step">
            <div class="item">
              <div class="item1"></div>
            </div>
            <div class="item">
              <div class="item2"></div>
            </div>
          </div>
          <div class="step-txt">
            <div class="txt">点击下载好的APP</div>
            <div class="txt">直接点击信任即可</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
      data(){
          return{
              IsShowTab:1
          }
      }
  }

</script>
<style lang="scss" scoped>
  .course {
    width: 100%;
    height: 1665px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;

    .ope-btn {
      display: inline-block;

      &.btn-primary {
        position: relative;
        overflow: hidden;
        transition: .3s;
        box-sizing: content-box;
        padding: 0 73px 0 34px;
        font-size: 14px;
        color: #fff;
        height: 43px;
        line-height: 43px;
        border-radius: 30px;
        border: 1px solid #fff;
        z-index: 1;
        text-decoration: none;

        &:after {
          position: absolute;
          transition: .3s;
          content: "";
          width: 0;
          left: 50%;
          bottom: 0;
          height: 3px;
          background: #f7f7f7;
          height: 120%;
          left: -10%;
          -webkit-transform: skewX(15deg);
          transform: skewX(15deg);
          z-index: -1;
        }

        &:hover {
          color: #3ec1fe;

          &:after {
            width: 100%;
            left: 0;
            left: -10%;
            width: 120%;
          }
        }

        &:before {
          position: absolute;
          right: 30px;
          top: -1px;
          display: block;
          content: "";
          width: 30px;
          height: 45px;
        }
      }
    }

    .courseBg {
      height: 481px;
      width: 100%;
      background: url(./images/banner-bg.png) no-repeat;
      background-size: 100% 100%;
    //   margin-top: 15px;
    background-color: #fff;
      .banner {
        width: 1200px;
        height: 480px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        margin: 0 auto;

        .banner-context {
          .title {
            font-size: 48px;
            color: #fff;
            font-weight: 700;
            margin-top: 70px;
          }

          .txt {
            color: #fefefe;
            padding-top: 57px;
            line-height: 33px;
          }

          A {
            display: inline-block;
            height: 40px;
            border-radius: 50px;
            border: 1px solid #fff;
            text-align: center;
            line-height: 40px;
            text-decoration: none;
            color: #fff;
            margin-top: 60px;
            margin-right: 30px;

            &:before {
              content: "";
              display: none;
            }

            &.btn-primary {
              padding: 0;
              width: 144px;
              height: 38px;
              border-radius: 50;
              border: 1px solid #fff;
            }

            &:hover {
              color: #5ac1f9;
            }

            &.on {
              background-color: #fff;
              color: #5ac1f9;
            }
          }
        }

        .banner-img {
          position: relative;
          width: 644px;
          height: 443px;
          background: url(./images/banner-img.png) no-repeat;
        }

        .tran1 {
          left: 954px;
          top: 213px;
          width: 83px;
          height: 96px;
          background: url(./images/tran1.png) no-repeat;
          position: absolute;
          -webkit-animation: tran 1s ease infinite;
          animation: tran 1s ease infinite;
        }

        .tran2 {
          position: absolute;
          -webkit-animation: tran 1s ease infinite;
          animation: tran 1s ease infinite;
          left: 1193px;
          width: 179px;
          height: 162px;
          background: url(./images/tran2.png) no-repeat;
          -webkit-animation-delay: .5s;
          animation-delay: 0.5s;
        }
      }
    }

    .content {
      background-color: #fff;
      height: 1056px;
        width: 100%;
      .details {
        width: 1202px;
        height: 1036px;
        margin: 0 auto;

        .ios9 {
          width: 1202px;
          display: block;

          &.hidden {
            display: none;
          }

          .title {
            width: 1202px;
            font-size: 30px;
            color: #043356;
            text-align: center;
            margin-top: 30px;
          }

          .first-line {
            width: 1202px;
            font-size: 16px;
            color: #b0b7bb;
            line-height: 80px;
            text-align: center;
          }

          .number {
            position: relative;
            width: 993px;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: justify;
            -ms-flex-pack: justify;
            justify-content: space-between;
            margin: 30px auto;

            .details {
              width: 60px;
              height: 60px;
              border-radius: 50px;
              border: 1px dashed #5ac1f9;
              text-align: center;

              &.padding-left {
                margin-left: 0;
              }

              &.padding-right {
                margin-right: 0;
              }

              .details-txt {
                margin: 7px auto;
                width: 46px;
                height: 46px;
                background-color: #5ac1f9;
                border-radius: 50px;
                font-size: 30px;
                line-height: 46px;
                color: #fff;
              }
            }

            .split {
              position: absolute;
              width: 195px;
              height: 1px;
              background-color: #eee;
              top: 50%;
              left: 89px;

              &.split1 {
                left: 89px;
              }

              &.split2 {
                left: 403px;
              }

              &.split3 {
                left: 711px;
              }
            }

            .split-y {
              position: absolute;
              height: 22px;
              width: 1px;
              background-color: #eee;
              top: 70px;

              &.split1-y {
                left: 30px;
              }

              &.split2-y {
                left: 342px;
              }

              &.split3-y {
                left: 655px;
              }

              &.split4-y {
                left: 963px;
              }
            }
          }

          .step {
            width: 1202px;
            margin: 0 auto;
            height: 543px;
            margin-top: 40px;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: justify;
            -ms-flex-pack: justify;
            justify-content: space-between;

            .item {
              height: 543px;
              width: 272px;
              border: 1px solid #e9e8e8;
              border-radius: 5px;

              .item1 {
                margin: 21.5px 20.5px;
                width: 231px;
                height: 500px;
                background: url(./images/item1.png);
              background-size: contain;
              background-repeat: no-repeat;
              }

              .item2 {
                margin: 21.5px 20.5px;
                width: 231px;
                height: 500px;
                background: url(./images/item2.png);
              background-size: contain;
              background-repeat: no-repeat;
              }

              .item3 {
                margin: 21.5px 20.5px;
                width: 231px;
                height: 500px;
                background: url(./images/item3.png);
              background-size: contain;
              background-repeat: no-repeat;
              }

              .item4 {
                margin: 21.5px 20.5px;
                width: 231px;
                height: 500px;
                background: url(./images/item4.png);
              background-size: contain;
              background-repeat: no-repeat;
              }
            }
          }

          .step-txt {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: justify;
            -ms-flex-pack: justify;
            justify-content: space-between;

            .txt {
              width: 272px;
              text-align: center;
              margin-top: 45px;
              color: #7a8c99;
              letter-spacing: 3px;
              position: relative;

              .padding-left {
                position: absolute;
                left: 0;
              }

              &.txt1 {
                text-align: justify;
              }
            }
          }
        }

        .ios8 {
          width: 1202px;
          margin: 0 auto;
          display: block;

          &.hidden {
            display: none;
          }

          .title {
            width: 1202px;
            font-size: 30px;
            color: #043356;
            text-align: center;
            margin-top: 30px;
          }

          .first-line {
            width: 1202px;
            font-size: 16px;
            color: #b0b7bb;
            line-height: 80px;
            text-align: center;
          }

          .number {
            position: relative;
            width: 739px;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: justify;
            -ms-flex-pack: justify;
            justify-content: space-between;
            margin: 30px auto;

            .details {
              width: 60px;
              height: 60px;
              border-radius: 50px;
              border: 1px dashed #5ac1f9;
              text-align: center;

              .details-txt {
                margin: 7px auto;
                width: 46px;
                height: 46px;
                background-color: #5ac1f9;
                border-radius: 50px;
                font-size: 30px;
                line-height: 46px;
                color: #fff;
              }
            }

            .split {
              position: absolute;
              width: 253px;
              height: 1px;
              background-color: #eee;
              top: 50%;
              left: 89px;

              &.split1 {
                left: 241px;
              }

              &.split2 {
                left: 403px;
              }
            }

            .split-y {
              position: absolute;
              height: 22px;
              width: 1px;
              background-color: #eee;
              top: 70px;

              &.split1-y {
                left: 183px;
              }

              &.split2-y {
                left: 558px;
              }
            }
          }

          .step {
            width: 642px;
            margin: 0 auto;
            height: 447px;
            margin-top: 40px;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: justify;
            -ms-flex-pack: justify;
            justify-content: space-between;

            .item {
              height: 456px;
              width: 272px;
              border: 1px solid #e9e8e8;
              border-radius: 5px;

              .item1 {
                margin: 21.5px 20.5px;
                width: 231px;
                height: 416px;
                background: url(./images/item1.jpg) no-repeat;
              background-size: contain;
              background-repeat: no-repeat;
              background-position: center center;
              }

              .item2 {
                margin: 21.5px 20.5px;
                width: 231px;
                height: 416px;
                background: url(./images/item7.png) no-repeat;
              background-size: contain;
              background-repeat: no-repeat;
              background-position: center center;
              }
            }
          }

          .step-txt {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            width: 642px;
            -webkit-box-pack: justify;
            -ms-flex-pack: justify;
            justify-content: space-between;
            margin: 0 auto;

            .txt {
              width: 272px;
              text-align: center;
              margin-top: 45px;
              color: #7a8c99;
            }
          }
        }
      }
    }
  }

  @media (max-width: 1600px) {
    .course {
      width: 100%;
      height: 1737px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: column;

      .courseBg {
        height: 390px;
        width: 100%;
        background: url(./images/banner-bg.png) no-repeat;
        background-size: 100% 100%;

        .banner {
          width: 1200px;
          height: 350px;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
          margin: 0 auto;

          .banner-context {
            .title {
              font-size: 48px;
              color: #fff;
              font-weight: 700;
              margin-top: 30px;
            }

            .txt {
              color: #fefefe;
              padding-top: 30px;
              line-height: 33px;
            }

            A {
              display: inline-block;
              height: 40px;
              border-radius: 50px;
              border: 1px solid #fff;
              text-align: center;
              line-height: 40px;
              text-decoration: none;
              color: #fff;
              margin-top: 60px;
              margin-right: 30px;

              &:before {
                content: "";
                display: none;
              }

              &.btn-primary {
                padding: 0;
                width: 144px;
                height: 38px;
                border-radius: 50;
                border: 1px solid #fff;
              }

              &:hover {
                color: #5ac1f9;
              }

              &.on {
                background-color: #fff;
                color: #5ac1f9;
              }
            }
          }

          .banner-img {
            position: relative;
            width: 651px;
            height: 350px;
            background: url(./images/banner-img-s.png) no-repeat;
          }

          .tran1 {
            left: 718px;
            top: 168px;
            width: 83px;
            height: 96px;
            background: url(./images/tran1.png) no-repeat;
            position: absolute;
            -webkit-animation: tran 1s ease infinite;
            animation: tran 1s ease infinite;
          }

          .tran2 {
            position: absolute;
            -webkit-animation: tran 1s ease infinite;
            animation: tran 1s ease infinite;
            left: 950px;
            top: 105px;
            width: 179px;
            height: 162px;
            background: url(./images/tran2.png) no-repeat;
            -webkit-animation-delay: .5s;
            animation-delay: 0.5s;
          }
        }
      }

      .content {
        background-color: #fff;
        height: 1056px;
        width: 100%;

        .details {
          width: 1202px;
          height: 1036px;
          margin: 0 auto;

          .ios9 {
            width: 1202px;
            display: block;

            &.hidden {
              display: none;
            }

            .title {
              width: 1202px;
              font-size: 30px;
              color: #043356;
              text-align: center;
              margin-top: 30px;
            }

            .first-line {
              width: 1202px;
              font-size: 16px;
              color: #b0b7bb;
              line-height: 80px;
              text-align: center;
            }

            .number {
              position: relative;
              width: 993px;
              display: -webkit-box;
              display: -ms-flexbox;
              display: flex;
              -webkit-box-pack: justify;
              -ms-flex-pack: justify;
              justify-content: space-between;
              margin: 30px auto;

              .details {
                width: 60px;
                height: 60px;
                border-radius: 50px;
                border: 1px dashed #5ac1f9;
                text-align: center;

                &.padding-left {
                  margin-left: 0;
                }

                &.padding-right {
                  margin-right: 0;
                }

                .details-txt {
                  margin: 7px auto;
                  width: 46px;
                  height: 46px;
                  background-color: #5ac1f9;
                  border-radius: 50px;
                  font-size: 30px;
                  line-height: 46px;
                  color: #fff;
                }
              }

              .split {
                position: absolute;
                width: 195px;
                height: 1px;
                background-color: #eee;
                top: 50%;
                left: 89px;

                &.split1 {
                  left: 89px;
                }

                &.split2 {
                  left: 403px;
                }

                &.split3 {
                  left: 711px;
                }
              }

              .split-y {
                position: absolute;
                height: 22px;
                width: 1px;
                background-color: #eee;
                top: 70px;

                &.split1-y {
                  left: 30px;
                }

                &.split2-y {
                  left: 342px;
                }

                &.split3-y {
                  left: 655px;
                }

                &.split4-y {
                  left: 963px;
                }
              }
            }

            .step {
              width: 1202px;
              margin: 0 auto;
              height: 543px;
              margin-top: 40px;
              display: -webkit-box;
              display: -ms-flexbox;
              display: flex;
              -webkit-box-pack: justify;
              -ms-flex-pack: justify;
              justify-content: space-between;

              .item {
                height: 543px;
                width: 272px;
                border: 1px solid #e9e8e8;
                border-radius: 5px;

                .item1 {
                  margin: 21.5px 20.5px;
                  width: 231px;
                  height: 500px;
                  background: url(./images/item1.png) no-repeat;
              background-size: contain;
              background-repeat: no-repeat;
                }

                .item2 {
                  margin: 21.5px 20.5px;
                  width: 231px;
                  height: 500px;
                  background: url(./images/item2.png);
              background-size: contain;
              background-repeat: no-repeat;
                }

                .item3 {
                  margin: 21.5px 20.5px;
                  width: 231px;
                  height: 500px;
                  background: url(./images/item3.png);
              background-size: contain;
              background-repeat: no-repeat;
                }

                .item4 {
                  margin: 21.5px 20.5px;
                  width: 231px;
                  height: 500px;
                  background: url(./images/item4.png);
              background-size: contain;
              background-repeat: no-repeat;
                }
              }
            }

            .step-txt {
              display: -webkit-box;
              display: -ms-flexbox;
              display: flex;
              -webkit-box-pack: justify;
              -ms-flex-pack: justify;
              justify-content: space-between;

              .txt {
                width: 272px;
                text-align: center;
                margin-top: 45px;
                color: #7a8c99;
                letter-spacing: 3px;
                position: relative;

                .padding-left {
                  position: absolute;
                  left: 18px;
                }
              }
            }
          }

          .ios8 {
            width: 1202px;
            margin: 0 auto;
            display: block;

            &.hidden {
              display: none;
            }

            .title {
              width: 1202px;
              font-size: 30px;
              color: #043356;
              text-align: center;
              margin-top: 30px;
            }

            .first-line {
              width: 1202px;
              font-size: 16px;
              color: #b0b7bb;
              line-height: 80px;
              text-align: center;
            }

            .number {
              position: relative;
              width: 739px;
              display: -webkit-box;
              display: -ms-flexbox;
              display: flex;
              -webkit-box-pack: justify;
              -ms-flex-pack: justify;
              justify-content: space-between;
              margin: 30px auto;

              .details {
                width: 60px;
                height: 60px;
                border-radius: 50px;
                border: 1px dashed #5ac1f9;
                text-align: center;

                .details-txt {
                  margin: 7px auto;
                  width: 46px;
                  height: 46px;
                  background-color: #5ac1f9;
                  border-radius: 50px;
                  font-size: 30px;
                  line-height: 46px;
                  color: #fff;
                }
              }

              .split {
                position: absolute;
                width: 253px;
                height: 1px;
                background-color: #eee;
                top: 50%;
                left: 89px;

                &.split1 {
                  left: 241px;
                }

                &.split2 {
                  left: 403px;
                }
              }

              .split-y {
                position: absolute;
                height: 22px;
                width: 1px;
                background-color: #eee;
                top: 70px;

                &.split1-y {
                  left: 183px;
                }

                &.split2-y {
                  left: 558px;
                }
              }
            }

            .step {
              width: 642px;
              margin: 0 auto;
              height: 447px;
              margin-top: 40px;
              display: -webkit-box;
              display: -ms-flexbox;
              display: flex;
              -webkit-box-pack: justify;
              -ms-flex-pack: justify;
              justify-content: space-between;

              .item {
                height: 456px;
                width: 272px;
                border: 1px solid #e9e8e8;
                border-radius: 5px;

                .item1 {
                  margin: 21.5px 20.5px;
                  width: 231px;
                  height: 416px;
                  background: url(./images/item1.jpg) no-repeat;
              background-size: contain;
              background-repeat: no-repeat;
              background-position: center center;
                }

                .item2 {
                  margin: 21.5px 20.5px;
                  width: 231px;
                  height: 416px;
                  background: url(./images/item7.png) no-repeat;
              background-size: contain;
              background-repeat: no-repeat;
              background-position: center center;
                }
              }
            }

            .step-txt {
              display: -webkit-box;
              display: -ms-flexbox;
              display: flex;
              width: 642px;
              -webkit-box-pack: justify;
              -ms-flex-pack: justify;
              justify-content: space-between;
              margin: 0 auto;

              .txt {
                width: 272px;
                text-align: center;
                margin-top: 45px;
                color: #7a8c99;
              }
            }
          }
        }
      }
    }
  }
@keyframes tran {
  0% {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
  }

  10% {
    -webkit-transform: translate3d(0, 0.2%, 0);
    transform: translate3d(0, 0.2%, 0);
  }

  25% {
    -webkit-transform: translate3d(0, 0.5%, 0);
    transform: translate3d(0, 0.5%, 0);
  }

  50% {
    -webkit-transform: translate3d(0, 2%, 0);
    transform: translate3d(0, 2%, 0);
  }

  75% {
    -webkit-transform: translate3d(0, 0.5%, 0);
    transform: translate3d(0, 0.5%, 0);
  }

  90% {
    -webkit-transform: translate3d(0, 0.2%, 0);
    transform: translate3d(0, 0.2%, 0);
  }

  to {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
  }
}

</style>
