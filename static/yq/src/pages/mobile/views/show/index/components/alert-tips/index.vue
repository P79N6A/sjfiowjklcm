<template>
  <div class="alert-tips dialog_wrap" v-show="show">
    <div class="alert_content">
      <a class="close"  @click.self="close"></a>
      <img src="./images/bg.png" class="topImg">
      <div class="centerBox">
        <div class="alert_title">
          <span>{{title}}</span>
        </div>
        <div class="alert_tipcontent" v-html="conent"></div>
      </div>
      <div class="alert_tips">近期有不法分子冒用和劫持奇幻城国际网站进行诱骗，请大家不要上当受骗。奇幻城国际绝无与其他公司合作合并。请认准奇幻城国际官网：【{{WEBCONFIG.location}}】了解应对措施，点击<router-link :to="{name:'hijacking'}">【防域名劫持教程】</router-link>进行查看，如有任何疑问，请咨询客服。</div>
    </div>
  </div>
</template>
<script>
  import {checkConfigSystem} from "@/api/show"
  import {WEBCONFIG} from "@/assets/data";
  import {$localStorage,$sessionStorage} from "@/util/storage"

  export default {
    data() {
      return {
        title: "",
        conent: "",
        show: false,
        WEBCONFIG
      };
    },
    watch: {},
    props: {},
    activated() {

    },
    methods: {
      close() {
        this.show = false;
        $sessionStorage.set("mobile_index_tip", true)
      }
    },
    computed: {},
    created() {
      if(!$sessionStorage.get('mobile_index_tip')) {
        checkConfigSystem(this.$data).then(res => {
          if (res.success) {
            var arydata = res.data.split('#');
            this.title = arydata[0];
            this.conent = arydata[1];
            this.show = true;
          }
        }).catch(err => {
        })
      }
    },
    components: {}
  };
</script>
<style lang="scss" scoped>
  @import "~mobile/assets/scss/mixin.scss";
  
  .dialog_wrap {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  .alert_content{
    width: 100%;
    position: absolute;
    left: 50%;
    top: 45%;
    text-align: center;
    transform: translate(-50%, -50%);
    // background: url(./images/bg.png) no-repeat center center/cover;
    padding:0 r(50);
    color: #7D6549;
    .topImg {
      width: 90%;
    }
    .centerBox {
      background: #ffffff;
      padding:r(30) r(40) r(30) r(40);
    }
    .alert_title{
      @include f(36px);
      color: #79664d;
      line-height: 2.218;
      margin-bottom: r(10);
      font-weight: 700;
    }
    .alert_tipcontent{
      max-height:r(680);
      overflow-y:scroll;
      text-align:left;
      @include f(24px);
      color: #79664d;
      line-height: 1.833;
    }
    .alert_tips {
      background: #00cfde;
      color: #ffffff;
      padding: r(20);
      line-height:1.5;
      @include f(26px);
      text-align:left;
      a {
        display: inline-block;
        background: #ef4f4f;
        border-radius: 4px;
      }
    }
    .close {
      width: r(85);
      height: r(85);
      position: absolute;
      right: r(100);
      top: 0;
    }
  }
}
  
</style>
