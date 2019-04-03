<template>
  <div class="accountQA">
    <!-- <div class="cont" v-show="!istab">
      <div class="get-ways">
        <div class="common-cont">
          <a href="javascript:void(0);" @click="showTab('tab1')">
            <img src="./images/password.png" alt="" class="hvr-float">
            <div class="common-text">
              <p>忘记密码找回</p>
              <p>Forgot Password</p>
            </div>
          </a>
        </div>
        <div class="common-cont">
          <a href="javascript:void(0);" @click="showTab('tab2')">
            <img src="./images/account.png" alt="" class="hvr-float">
            <div class="common-text">
              <p>忘记账号找回</p>
              <p>Forgot Username</p>
            </div>
          </a>
        </div>
      </div>
    </div>-->
    <div class="cont1">
      <ul class="js-tab-lists tab-lists clear">
        <li :class="{active:cur =='tab1'}" @click="chooseMenu('tab1')">
          <i class="iconfont icon-mima"></i>忘记密码找回
        </li>
        <!-- <li :class="{active:cur =='tab2'}" @click="chooseMenu('tab2')"><i class="iconfont icon-xingming"></i>忘记账号找回</li> -->
      </ul>
      <div class="js-ways-container">
        <div class="retrieve-password" v-show="tab=='tab1'">
          <ul class="common-center">
            <li class="common-center-cont">
              <div class="img-cont">
                <img src="./images/gamenum.png" alt class="img1">
              </div>
              <div class="item-lists">
                <i class="iconfont icon-game"></i>
                <input v-model="phone.name" placeholder="请输入您的游戏账号" maxlength="20">
              </div>
              <div class="item-lists">
                <i class="iconfont icon-shouji"></i>
                <input v-model="phone.phone" placeholder="请输入绑定手机号码" maxlength="11">
              </div>
              <div class="item-lists item-lists1">
                <button class="submit-btn" id="sendDxNew" @click="submitForm('phoneForm')">短信找回</button>
              </div>
            </li>
            <li class="common-center-cont">
              <div class="img-cont">
                <img src="./images/emai.png" alt class="img2">
              </div>
              <div class="item-lists">
                <i class="iconfont icon-game"></i>
                <input v-model="email.name" placeholder="请输入您的游戏账号" maxlength="20">
              </div>
              <div class="item-lists">
                <i class="iconfont icon-xinfeng1"></i>
                <input v-model="email.yxdz" placeholder="请输入绑定的邮箱" maxlength="50">
              </div>
              <div class="item-lists">
                <i class="iconfont icon-dentifyingcode"></i>
                <input v-model="email.code" placeholder="请输入验证码" maxlength="4">
                <img :src="validateImage" title="点击图片刷新" class="img_code" @click="GET_VALIDATE">
              </div>
              <div class="item-lists item-lists1">
                <button class="submit-btn" id="sendDxNew" @click="submitForm('emailForm')">邮箱找回</button>
              </div>
            </li>
            <li class="common-center-cont">
              <div class="img-cont">
                <img src="./images/phone.png" alt class="img3">
              </div>
              <div class="item-lists">联系在线客服找回密码
                <br>为您提供更加全面的
                <br>专业在线服务
              </div>
              <div class="item-lists item-lists1">
                <a :href="SETTING.live800" target="_blank" class="submit-btn">在线客服</a>
              </div>
            </li>
          </ul>
        </div>
        <div class="retrieve-password" v-show="tab=='tab2'">
          <ul class="common-center">
            <li class="common-center-cont">
              <div class="img-cont">
                <img src="./images/phone.png" alt class="img3">
              </div>
              <div class="item-lists">联系在线客服找回密码
                <br>为您提供更加全面的
                <br>专业在线服务
              </div>
              <div class="item-lists item-lists1">
                <a :href="SETTING.live800" target="_blank" class="submit-btn">在线客服</a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { SETTING } from "@/assets/data";
import { mapGetters, mapActions, mapMutations } from "vuex";
import { loginForgot } from "@/controls/auth/loginForgot";
export default {
  mixins: [loginForgot],
  data() {
    return {
      SETTING,
      istab: false,
      phone: {
        // 手机找回，提交内容
        sid: "9d154e5f-4f65-4b6d-9201-632adcdba1b7", // true string
        phone: "", // true string
        check_address: "sverify-5-2-0", // true string
        token: "99da842a-40d4-4f10-9a221499131241289", //true string
        name: "",
        check_key: ""
      },
      email: {
        //邮箱找回，提交内容
        yxdz: "", //true string
        name: "", //true string
        code: ""
      },
      tab: "tab1",
      cur: "tab1"
    };
  },
  computed: {
    ...mapGetters(["islogin", "validateImage"])
  },
  methods: {
    chooseMenu(val) {
      this.tab = val;
      this.cur = val;
    },
    showTab(tab) {
      this.istab = true;
      this.tab = tab;
      this.cur = tab;
    },
    // 表单提交事件
    submitForm(formName) {
      if (formName == "phoneForm") {
        this.isLoadingSms = true;
        this.getbackPwdByDx_dc(this.phone)
          .then(res => {
            this.isLoadingSms = false;
            // this.setDxTimer();
            window.toast(res.message);
          })
          .catch(err => {
            console.log(err);
            this.isLoadingSms = false;

            window.toast(err.message);
          });
      } else if (formName == "emailForm") {
        this.isLoadingEmail = true;
        this.getbackPwdByEmail(this.email)
          .then(res => {
            this.isLoadingEmail = false;
            // this.setEmailTimer();
            window.toast(res.message);
          })
          .catch(err => {
            console.log(err);
            this.isLoadingEmail = false;
            window.toast(err.message);
          });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.accountQA {
  min-height: 530px;
  background: #efefef;

  .cont {
    max-width: 900px;
    margin: 0 auto;

    .get-ways {
      padding: 85px 0 0;
      display: flex;
      justify-content: space-between;

      .common-cont {
        min-height: 400px;
        width: 45%;
        text-align: center;
        cursor: pointer;

        a {
          display: block;
          text-align: center;
          text-decoration: none;

          &:hover {
            .hvr-float {
              transform: translateY(-16px);
            }
          }

          .hvr-float {
            display: inline-block;
            vertical-align: middle;
            transform: translateY(0);
            box-shadow: 0 0 1px rgba(0, 0, 0, 0);
            backface-visibility: hidden;
            transition: all 0.3s ease-out;
          }

          .common-text {
            margin-top: 60px;

            p {
              &:nth-of-type(1) {
                font-size: 18px;
                color: #333;
                margin-bottom: 10px;
              }

              &:nth-of-type(2) {
                font-size: 16px;
                color: #b0bdc6;
              }
            }
          }
        }
      }
    }
  }

  .cont1 {
    .tab-lists {
      border-top: 4px solid #44a7e0;
      text-align: center;
      background: #fff;

      li {
        display: inline-block;
        width: 300px;
        height: 70px;
        line-height: 70px;
        text-align: center;
        font-size: 16px;
        color: #bbb;
        background: no-repeat center bottom;
        -webkit-transition: all 0.3s;
        -o-transition: all 0.3s;
        transition: all 0.3s;
        cursor: pointer;

        &.active {
          color: #4db7f4;
          // background: url("./images/lihover.png") no-repeat center bottom;
        }

        i {
          display: inline-block;
          margin-right: 8px;
          vertical-align: top;
        }
      }
    }

    .js-ways-container {
      .retrieve-password {
        .common-center {
          max-width: 960px;
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;

          .common-center-cont {
            position: relative;
            width: 280px;
            height: 380px;
            margin: 75px 50px 50px 0;
            padding: 25px;
            border-radius: 10px;
            background: #fff;

            .img-cont {
              min-height: 110px;

              .img1 {
                position: absolute;
                top: -50px;
                left: 102px;
              }

              .img2 {
                position: absolute;
                top: -50px;
                left: 84px;
              }

              .img3 {
                position: absolute;
                top: -50px;
                left: 70px;
              }
            }

            .item-lists {
              position: relative;
              margin: 0 auto 15px;
              font-size: 16px;
              text-align: center;

              i {
                position: absolute;
                left: 8px;
                top: 10px;
                color: #4db7f4;
                font-size: 22px;
              }

              input {
                width: 100%;
                height: 40px;
                line-height: 38px;
                padding: 8px 0 8px 30px;
                border: 1px solid #ddd;
                text-align: left;
                border-radius: 5px;
              }

              .submit-btn {
                display: block;
                width: 100%;
                height: 40px;
                line-height: 40px;
                background: #4db7f4;
                color: #fff;
                border-radius: 5px;
              }

              .img_code {
                position: absolute;
                right: 6px;
                top: 6px;
                width: 80px;
                height: 30px;
              }
            }

            .item-lists1 {
              position: absolute;
              bottom: 10px;
              left: 25px;
              width: 82%;
            }

            &:nth-last-child(1) {
              margin-right: 0;
            }
          }
        }
      }
    }
  }
}
</style>
