i<template>
  <div @click.stop class="i-ele">
    <!-- 普通文本 -->
    <div v-if="eleJson.type===1" class :style="[borderCss,baseCss,bgCss,textCss,boxShadow]">
      <div class v-html="eleJson.config.content"></div>
    </div>
    <!-- 图片 -->
    <div v-else-if="eleJson.type===2" class :style="[borderCss,baseCss,bgCss,textCss,boxShadow]">
      <img :src="eleJson.config.content" alt class="img">
    </div>
    <!-- 视频 -->
    <div v-else-if="eleJson.type===8" class :style="[borderCss,baseCss,bgCss,textCss,boxShadow]">
      <video :src="eleJson.config.content" controls="controls">您的浏览器不支持 video 标签。</video>
    </div>
    <!-- svg-->
    <div v-else-if="eleJson.type===9" class :style="[borderCss,baseCss,bgCss,textCss,boxShadow]">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="9335104385" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 612 611.986" enable-background="new 0 0 612 611.986" xml:space="preserve" preserveAspectRatio="none" class="element svg-element">
        <path :d="eleJson.config.content" :fill="eleJson.style.text.color"></path>
      </svg>
    </div>
    <div v-else-if="eleJson.type===10">
                            <!-- 异步vue组件 -->
                      <sync-component
                        :url="`${eleJson.config.content}`"
                      ></sync-component>
    </div>
  </div>
</template>
<script>
import SyncComponent from "vue-async-component";
export default {
  data() {
    return {};
  },
  props: ["eleJson"],
  computed: {
    borderCss() {
      return {
        borderWidth: this.eleJson.style.border.borderWidth + "px",
        borderRadius: this.eleJson.style.border.borderRadius + "px",
        borderColor: this.eleJson.style.border.borderColor,
        borderStyle: this.eleJson.style.border.borderStyle
      };
    },
    baseCss() {
      return {
        width: this.eleJson.style.base.width + "px",
        height: this.eleJson.style.base.height + "px",
        // transform: `rotate(${this.eleJson.style.base.rotate}deg)`,
        opacity: this.eleJson.style.base.opacity / 100
      };
    },
    bgCss() {
      return this.eleJson.style.bg;
    },
    textCss() {
      return {
        color: this.eleJson.style.text.color,

        fontSize: this.eleJson.style.text.fontSize + "px",
        fontWeight: this.eleJson.style.text.fontWeight,
        fontStyle: this.eleJson.style.text.fontStyle,
        fontFamily: this.eleJson.style.text.fontFamily,

        textAlign: this.eleJson.style.text.textAlign,
        lineHeight: this.eleJson.style.text.lineHeight,
        letterSpacing: this.eleJson.style.text.letterSpacing + "px",
        textDecoration: this.eleJson.style.text.textDecoration
      };
    },
    boxShadow() {
      return {
        boxShadow: `${this.eleJson.style.shadow.shadowColor} ${
          this.eleJson.style.shadow.shadowX
        }px ${this.eleJson.style.shadow.shadowY}px ${
          this.eleJson.style.shadow.shadowFuzzy
        }px ${this.eleJson.style.shadow.shadowDire}px ${
          this.eleJson.style.shadow.shadowinSet ? "inset" : ""
        }`
      };
    }
  },
  components: {SyncComponent}
};
</script>
<style scoped lang="scss">
.i-ele {
  .img {
    display: inline-block;
    width: 100%;
    height: 100%;
  }
}
</style>
