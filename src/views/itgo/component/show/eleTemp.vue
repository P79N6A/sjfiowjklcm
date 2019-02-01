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
    <div v-else-if="eleJson.type===2" class :style="[borderCss,baseCss,bgCss,textCss,boxShadow]">
      <video :src="eleJson.config.content" controls="controls">您的浏览器不支持 video 标签。</video>
    </div>
  </div>
</template>
<script>
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
  }
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
