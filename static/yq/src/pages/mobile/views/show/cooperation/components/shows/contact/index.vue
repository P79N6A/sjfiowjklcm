<template>
  <div class="agent-contact-content">
    <!-- <p class="qq"><i class="iconbolin iconbolin-qq"></i><span>代理QQ:{{SETTING.qqAgent}}</span></p>
    <p class="qq"><i class="iconbolin iconbolin-weixin"></i><span>代理微信号:{{SETTING.wechatAgent}}</span></p>
    <p class="qq"><i class="iconbolin iconbolin-youxiang"></i><span>代理邮箱:{{SETTING.emailAgent}}</span></p>-->
    <div class="contact-box">
      <table>
        <tbody>
          <tr>
            <td width="45"><img src="./images/qq.png"></td>
            <td><p>QQ: {{SETTING.qqAgent}}</p></td>
            <td></td>
            <td width="60"><p><a href="javascript:;" class="copy1" v-clipboard:copy="SETTING.qqAgent" v-clipboard:success="onCopy">复制</a></p></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="contact-box">
      <table>
        <tbody>
          <tr>
            <td width="45"><img src="./images/wechat.png"></td>
            <td><p>微信: {{SETTING.wechatAgent}}</p></td>
            <td></td>
            <td width="60"><p><a href="javascript:;" class="copy1" v-clipboard:copy="SETTING.qqAgent" v-clipboard:success="onCopy">复制</a></p></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="contact-box">
      <table>
        <tbody>
          <tr>
            <td width="45"><img src="./images/mail.png"></td>
            <td><p>邮箱: {{SETTING.emailAgent}}</p></td>
            <td></td>
            <td width="60"><p><a href="javascript:;" class="copy1" v-clipboard:copy="SETTING.qqAgent" v-clipboard:success="onCopy">复制</a></p></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { SETTING } from "@/assets/data";

export default {
  data() {
    return { SETTING };
  },
  props: {},
  methods: {
    onCopy(){
      window.toast('复制成功')
    },
  },
  computed: {},
  created() {},
  components: {}
};
</script>
<style lang="scss" scoped>
@import "~mobile/assets/scss/mixin.scss";
.agent-contact-content {
  padding: r(30);
  margin: r(30) auto;
  .qq {
    color: #4db7f4;
    @include f(40px);
    line-height: r(110);
    span {
      padding-left: 5%;
    }
    .iconbolin {
      @include f(60px);
      vertical-align: middle;
    }
  }
  .contact-box {
    padding: 5px;
    margin: 10px 5px;
    border: 1px solid #d7d7d7;
    table {
      width: 100%;
      border-spacing: 2px;
      border-collapse: separate;
      tbody {
        background: #fff;
        td {
          text-align: center;
          padding: 3px;
          img {
            width: 45px;
          }
          p {
            line-height: 2;
            color: #787876;
            text-align: left;
          }
          .copy1 {
            background: #4db7f4;
            border-radius: 15px;
            color: #fff;
            padding: 5px 15px;
          }
        }
      }
    }
  }
}
</style>
