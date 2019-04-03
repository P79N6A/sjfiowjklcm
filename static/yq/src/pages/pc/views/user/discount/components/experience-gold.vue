<template>
  <div class="experience-gold cfx">
    <div class="e-download fl">
      <p class="e-d-title">下载奇幻城APP</p>
      <p class="e-d-img">
        <img class="exper-code" src="/static/images/base/qrcode.png">
      </p>
      <p class="e-d-tip">
        不支持微信、QQ、支付宝扫码，请使用专业扫码器扫描！
        <br>建议在
        <span class="e-d-tip-span">
          UC、QQ手机浏览器、苹果手机里的照相机
          进行扫描
        </span>。操作方便快捷。
        <br>或者在手机浏览器输入以下网址进行下载（可点击旁
        <br>边的复制按钮操作更加方便哦）
      </p>
      <p class="e-d-url">
        <span class="e-d-urlInput">{{Download.app}}</span>
        <span
          class="iconfont"
          v-clipboard:copy="Download.app"
          v-clipboard:success="onCopy"
          title="复制文本内容"
        ></span>
        <span class="copyfile" v-clipboard:copy="Download.app" v-clipboard:success="onCopy">
          <img src="./images/copy.png" alt> 复制
        </span>
      </p>
    </div>
    <div class="e-tech fr">
      <p class="e-t-title">登入奇幻城APP-进入【个人中心】-【自助优惠】-【自助体验金】</p>
      <p>
        <img src="./images/exper-tech.jpg">
      </p>
      <p class="e-t-p">根据系统提示操作领取8-88元体验金！</p>
    </div>
  </div>
</template>
<script>
import { Download } from "@/assets/data";
import { platformData } from "@/assets/data";
import { mapGetters } from "vuex";
import { experience } from "@/controls/discount/experience";
export default {
  mixins: [experience],
  data() {
    return {
      Download,
      platformData,
      tips: ["部分厅NT需进入游戏激活，方可转入使用（点击游戏名称进入激活）。"]
    };
  },
  methods: {
    onCopy() {
      toast("复制成功");
    },
    submitForm(formName) {
      this.CouponSubmit(this.expData)
        .then(res => {
          window.toast(res.message);
        })
        .catch(err => {
          console.log(err);
          window.toast(err.message);
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  computed: {
    ...mapGetters(["userData"])
  },
  activated() {
    // this.checkCoupon();
  }
};
</script>
<style lang="scss" scoped>
.experience-gold {
  color: #333;
  text-align: center;
  .e-download {
    width: 458px;
    border-right: 1px solid #bfbfbf;
    margin-top: 36px;
    .e-d-title {
      font-size: 24px;
      margin-bottom: 20px;
      line-height: 26px;
    }
    .e-d-img {
      img {
        width: 172px;
        height: 172px;
        margin-bottom: 15px;
      }
      margin-bottom: 10px;
    }
    .e-d-tip {
      text-align: left;
      line-height: 24px;
      font-size: 15px;
      margin-bottom: 10px;
      width: 358px;
      margin-left: 47px;
      .e-d-tip-span {
        color: red;
        font-weight: 600;
      }
    }
    .e-d-url {
      position: relative;
      .e-d-urlInput {
        border: solid 1px #808080;
        padding: 10px 29px 10px 3px;
      }
      .iconfont {
        margin-left: 10px;
        font-size: 30px;
        color: #666;
        cursor: pointer;
        position: absolute;
        top: -4px;
        right: 0px;
        line-height: 30px;
      }
      .copyfile {
        display: inline-block;
        height: 60px;
        cursor: pointer;
        padding-top: 30px;
        font-size: 17px;
        margin-left: -30px;
      }
    }
  }
  .e-tech {
    width: 350px;
    // margin-right: 75px;
    .e-t-title {
      font-size: 20px;
      margin: 27px 0 10px 0;
      line-height: 29px;
    }
    .e-t-p {
      font-size: 20px;
      color: red;
      padding: 15px 0;
    }
  }
}
</style>
