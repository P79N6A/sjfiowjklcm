<template>
  <div class="agent-box">
    <div class="wp b1">
      <h3>奇幻城优势</h3>
      <div class="youshi-box">
        <div class="youshi1 w200">
          <h2>奇幻城国际2010年成立</h2>
        </div>
        <div class="youshi2 w200">
          <h2>菲律宾Firstcagayan
            <br>博彩牌照</h2>
        </div>
        <div class="w200">
          <i>
          </i>
          <div class="youshi3">
            <h2>业界十大主流平台</h2>
            <span class="odd">1 PT国际</span>
            <span>2 TGP</span>
            <span class="odd">3 DT</span>
            <span>4 QT</span>
            <span class="odd">5 NT</span>
            <span>6 AGIN</span>
            <span class="odd">7 沙巴体育</span>
            <span>8 PNG</span>
            <!--<span class="odd">9 TTG</span>-->
            <span>9 MG</span>
            <span>10 BBIN</span>
          </div>
        </div>
        <div class="cl"></div>
        <div class="w676">
          <i class="i1"></i>
          <i class="i2"></i>
          <span class="s2"></span>
          <div class="yongjin-box">
            <div class="yongjin-box1">
              <table class="table" cellpadding="0" cellspacing="0">
                <tbody>
                  <tr>
                    <td width="37" class="num">1</td>
                    <td width="153" class="t1">佣金结算：</td>
                    <td width="359" class="t2 red">奇幻城采用全球最优质的结算方式。</td>
                  </tr>
                  <tr>
                    <td class="num">2</td>
                    <td class="t1">平台自助体验：</td>
                    <td class="t3">自助优惠，自助实时返水，系统独立研发。</td>
                  </tr>
                  <tr>
                    <td class="num">3</td>
                    <td class="t1">安全：</td>
                    <td class="t2">奇幻城采用128位ssl高标准加密技术。</td>
                  </tr>
                  <tr>
                    <td class="num">4</td>
                    <td class="t1">佣金结算灵活:</td>
                    <td class="t3">业务首创结算模式“日结佣金”。</td>
                  </tr>
                  <tr>
                    <td class="num">5</td>
                    <td class="t1">服务：</td>
                    <td class="t2">7x24小时在线服务，提供最优质服务。</td>
                  </tr>
                  <tr>
                    <td class="num">6</td>
                    <td class="t1">安全：</td>
                    <td class="t3">奇幻城采用128位SSL高标准加密技术。</td>
                  </tr>
                  <tr>
                    <td class="num">7</td>
                    <td class="t1">提款：</td>
                    <td class="t2">20万以下提款10秒到账，全球首发。</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <!--联系方式-->
      <div class="agent-contact">
        <div class="agent-contact1">
          <h2><span>▶</span>奇幻城合营部联系方式</h2>

          <p>▪ 微信: {{SETTING.wechatAgent}}
          </p>
          <p>▪ QQ: {{SETTING.qqAgent}}</p>
          <p>▪ 邮箱：{{SETTING.emailAgent}}</p>
          <div class="qrcode-box"><img src="/static/images/wechatQr/agent.png" width="100%"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    WEBCONFIG,
    SETTING
  } from "@/assets/data"
  import {
    AgentRegisterControl
  } from '@/controls/auth/registerAgent'
  import {
    mapGetters,
    mapActions,
    mapMutations
  } from 'vuex'

  export default {
    mixins: [AgentRegisterControl],
    data() {
      return {
        SETTING,
        WEBCONFIG
      }
    },
    computed: {
      ...mapGetters(['validateImage'])
    },
    methods: {
      ...mapMutations(['GET_VALIDATE']),
      regSubmit() {
        this.register(this.submitData).then(res => {
          window.toast(res.message)
        }).catch(err => {
          window.toast(err.message)
        })
      }
    },
    props: {},
  }

</script>
<style lang="scss" scoped>
  .agent-box {
    position: relative;

    .up {
      border-bottom: 7px solid #e16d00;
      border-left: 7px solid transparent;
      border-right: 7px solid transparent;
      border-top: 0 solid transparent;
      display: block;
      height: 0;
      left: 49%;
      position: absolute;
      top: -8px;
      width: 0;
    }

    .b1 {
      width: 996px;
      border: 2px solid #e16d00;
      margin: 10px auto 0;
      overflow: hidden;
      padding-bottom: 90px;
    }

    .wp {
      position: relative;
      width: 1200px !important;
      min-width: 1200px !important;
      max-width: 1200px !important;
      margin: 0 auto;

      h3 {
        height: 37px;
        line-height: 37px;
        background-color: #e16d00;
        color: #fff;
        padding-left: 50px;
      }

      .youshi-box {
        width: 750px;
        margin: 25px auto 0;
        border-bottom: 1px solid #c06056;
        padding-bottom: 10px;
        overflow: hidden;

        .youshi1 {
          height: 197px;
          margin-top: 165px;
          background-color: #ccbaa8;

          h2 {
            margin-top: 40px;
          }
        }

        .youshi2 {
          height: 245px;
          margin-top: 118px;
          background-color: #ccbaa8;

          h2 {
            margin-top: 60px;
          }
        }

        .youshi3 {
          height: 310px;
          background-color: #ccbaa8;

          h2 {
            padding-top: 20px;
            margin-top: 2px;
          }

          span {
            display: inline-block;
            width: 150px;
            height: 20px;
            line-height: 20px;
            margin: 2px auto 0;
            background-color: #ad9680;
            color: #fff;

            &.odd {
              background-color: #d5975c;
            }
          }
        }

        .w200 {
          width: 200px;
          float: left;
          margin-left: 12px;
          text-align: center;

          &:first-child {
            margin-left: 65px;
          }

          h2 {
            font-weight: 400;
            color: #7d6549;
            font-size: 16px;
            line-height: 27px;
            margin-bottom: 10px;
          }

          i {
            display: block;
            height: 52px;
            background: url(../../images/bei.jpg) no-repeat center center;
          }
        }

        .w676 {
          width: 700px;
          margin: 5px auto 0;
          position: relative;
          clear: both;

          i {
            width: 25px;
            display: block;
            height: 20px;
            background: url(../../images/sanjiao.jpg) no-repeat;
            position: absolute;
            top: 0;
          }

          .i1 {
            background-position: 0 0;
            left: 0;
          }

          .i2 {
            background-position: -25px 0;
            right: 0;
          }

          .s2 {
            width: 100%;
            height: 20px;
            display: block;
            background-color: #ad9680;
            text-align: center;
            color: #fff;
            line-height: 21px;
          }

          .yongjin-box {
            background-color: #ccbaa8;
            overflow: hidden;
            font-size: 16px;

            .yongjin-box1 {
              margin: 12px;
              background-color: #fff;
              overflow: hidden;

              .table {
                width: 97%;
                margin: 12px;
                border-collapse: collapse;
                border-spacing: 0;
                border: 1px solid #fff;
                font-size: 16px;
                color: #333;

                tr {
                  height: 30px;
                }

                td,
                th {
                  border-right: 1px solid #eee;
                  border-bottom: 1px solid #eee;
                  text-align: left;
                  padding: 5px;
                  background: #ddd;
                }

                td {
                  &.num {
                    background-color: #e16d00;
                    color: #fff;
                    text-align: center;
                  }
                }

                .t1 {
                  background-color: #ad9680;
                  color: #fff;
                }

                .t3{
                  background-color: #e5c3bf;
                  color: #7d6549;
                }

                .red {
                  color: red !important;
                }

                .t2 {
                  background-color: #d4cece;
                  color: #7d6549;
                }

                .table .t3 {
                  background-color: #e5c3bf;
                  color: #7d6549;
                }
              }
            }
          }
        }
      }

      .agent-contact {
        width: 478px;
        height: 400px;
        margin: 40px auto 0;
        overflow: hidden;
        background: #e16d00 url(../../images/bottom.jpg) no-repeat center bottom;

        .agent-contact1 {
          height: 370px;
          margin: 5px;
          background-color: #fff;
          overflow: hidden;
          position: relative;

          p {
            line-height: 33px;
            color: #7d6549;
            margin-left: 5px;
            text-align: left;
          }

          .qrcode-box {
            width: 100%;
            text-align: center;
          }

          img {
            width: 50%;
          }
        }

        h2 {
          background: #e16d00;
          text-indent: 7em;
          color: #fff;
          font-size: 20px;
          height: 37px;
          line-height: 37px;

          span {
            color: #fff;
            margin-right: 20px;
            font-size: 20px;
          }
        }
      }
    }
  }

  .cl {
    clear: both;
  }

</style>
