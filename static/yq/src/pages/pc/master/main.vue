<template>
  <div class="master">
    <!-- 头部 -->
    <v-header></v-header>
    <!-- 清除浮动 -->
    <div style="clear: both"></div>
    <!-- 导航条 -->
    <v-nav></v-nav>
    <slot>
      <!-- 插槽，有则替换slot内部的部分 -->
      <!-- 需要缓存的页面 -->
      <keep-alive v-if="!$route.meta.noCache">
        <router-view>
          <!-- 页面内容可视部分 -->
        </router-view>
      </keep-alive>
      <!-- 不需要缓存 -->
      <router-view v-else>
        <!-- 页面内容可视部分 -->
      </router-view>
      <!-- 注册弹框 -->
    </slot>
    <!-- 底部 -->
    <v-footer></v-footer>
    <!-- 右侧工具栏 -->
    <v-tool></v-tool>
    <!-- 左侧侧工具栏 -->
    <!-- <v-toolLeft></v-toolLeft> -->
    <!-- 用户登录弹窗 -->
    <!-- <v-login></v-login> -->
    <vRigester>
      <!-- 用户注册弹窗 -->
    </vRigester>
    <forgetPwd class="z999">
      <!-- 用户忘记密码弹窗 -->
    </forgetPwd>
    <alert-tips></alert-tips>
    
    <process></process>
  </div>
</template>
<script>
// 可以随便挑选组件进行组装
import { mapGetters } from "vuex";
import vHeader from "./layout/t3/components/header";
import vNav from "./layout/t3/components/nav";
import vFooter from "./layout/t3/components/footer";
import vTool from "./layout/t3/components/tool";
import vToolLeft from "./layout/t3/components/toolLeft";
import forgetPwd from "pc/views/common/pwd/pwdForgot";
import vRigester from "./layout/t3/components/auth/register";
import vLogin from "./layout/t3/components/auth/login";
import alertTips from "./layout/t3/components/alert-tips";
import process from "pc/components/transfer-process";

export default {
  name: "indexMaster",
  data() {
    return {
      transitionName: "slide"
    };
  },
  components: {
    vHeader,
    vNav,
    vFooter,
    vTool,
    forgetPwd,
    vRigester,
    vLogin,
    vToolLeft,
    alertTips,
    process
  },
  created() {
    console.log("salkdfj");
  }
};
</script>
<style scoped lang="scss">
// 部分公共样式可以写在这里
</style>
