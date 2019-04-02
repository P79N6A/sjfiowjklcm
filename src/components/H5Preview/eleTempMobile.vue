<template>
  <div class="i-ele-mobile" v-if="showEle" :class="elId" :id="eleJson.id">
    <!-- 普通文本 -->
    <div
      v-if="eleJson.type===1||eleJson.type===3"
      class="animated"
      :style="[textCss,baseCss,bgCss,borderCss,boxShadow,animateCss]"
    >
      <div class="text" v-html="eleJson.config.content"></div>
    </div>
    <!-- 图片 -->
    <div
      v-else-if="eleJson.type===2"
      class="animated"
      :style="[textCss,baseCss,bgCss,borderCss,boxShadow,animateCss]"
    >
      <img :src="`${cdnurl}${eleJson.config.content}`" alt class="img">
    </div>
    <!-- 视频 -->
    <div
      v-else-if="eleJson.type===8"
      class="animated"
      :style="[textCss,baseCss,bgCss,borderCss,boxShadow,animateCss]"
    >
      <video :src="`${cdnurl}${eleJson.config.content}`" controls="controls">您的浏览器不支持 video 标签。</video>
    </div>
    <!-- svg-->
    <div
      v-else-if="eleJson.type===9"
      class="animated"
      :style="[textCss,baseCss,bgCss,borderCss,boxShadow,animateCss]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        version="1.1"
        x="0px"
        y="0px"
        width="100%"
        height="100%"
        :viewBox="eleJson.config.viewBox"
        xml:space="preserve"
        preserveAspectRatio="none"
      >
        <path :d="eleJson.config.content" :fill="eleJson.style.text.color"></path>
      </svg>
    </div>
    <div
      v-else-if="eleJson.type===10"
      class="animated"
      :style="[textCss,baseCss,bgCss,borderCss,boxShadow,animateCss]"
    >
      <!-- 异步vue组件 -->
      <sync-component
        :url="`${cdnurl}/${eleJson.config.content}`"
        :short-id="eleJson.config.content"
        :config="eleJson.config.config"
        :dataList="eleJson.config.category"
      ></sync-component>
    </div>
  </div>
</template>
<script>
import SyncComponent from "@/components/AsyncComponent";
import { mapGetters } from "vuex";
// 生成随机ID
function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  for (var i = 0; i < 5; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  text = "class-" + text;
  return text;
}
export default {
  data() {
    return {
      elId: makeid(),
      animateJson: "",
      animateIndex: 0,
      animateAll: true,
      showEle: true // 用来做动画预览，重新渲染
    };
  },
  props: ["eleJson", "activeTempIndex", "showId"],
  computed: {
    ...mapGetters(["cdnurl"]),
    baseCss() {
      return {
        width: this.eleJson.style.base.width + "px",
        height: this.eleJson.style.base.height + "px",
        transform: `rotate(${this.eleJson.style.base.rotate}deg)`,
        opacity: this.eleJson.style.base.opacity / 100,
        overflow:this.eleJson.style.base.overflow,
        transform: `translateX(${this.eleJson.style.transform.translateX ||
          0}%) translateY(${this.eleJson.style.transform.translateY ||
          0}%) scaleX(${this.eleJson.style.transform.scaleX || 1}) scaleY(${this
          .eleJson.style.transform.scaleY || 1}) rotateX(${this.eleJson.style
          .transform.rotateX || 0}deg) rotateY(${this.eleJson.style.transform
          .rotateY || 0}deg) rotateZ(${this.eleJson.style.transform.rotateZ ||
          0}deg)`
      };
    },
    textCss() {
      return {
        lineHeight: this.eleJson.style.text.lineHeight,
        letterSpacing: this.eleJson.style.text.letterSpacing + "px"
      };
    },
    borderCss() {
      return {
        borderWidth: this.eleJson.style.border.borderWidth + "px",
        borderRadius: this.eleJson.style.border.borderRadius + "px",
        borderColor: this.eleJson.style.border.borderColor,
        borderStyle: this.eleJson.style.border.borderStyle
      };
    },
    bgCss() {
      return {
        // 背景
        backgroundImage: `url('${this.cdnurl}${
          this.eleJson.style.bg.backgroundImage
        }')`,
        backgroundColor: this.eleJson.style.bg.backgroundColor,
        backgroundSize: this.eleJson.style.bg.backgroundSize,
        backgroundRepeat: this.eleJson.style.bg.backgroundRepeat,
        backgroundPosition: this.eleJson.style.bg.backgroundPosition,
        backgroundAttachment: this.eleJson.style.bg.backgroundAttachment
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
    },
    animateCss() {
      let animate = this.eleJson.animate;
      const result = {
        "-webkit-animation-timing-function": "ease"
      };
      const delay = [],
        duration = [],
        name = [],
        mode = [],
        infinity = [],
        iterationCount = [],
        timingFunction = [];

      if (animate && animate.length) {
        for (let i = 0; i < animate.length; i++) {
          let delayTime = 0;
          timingFunction.push(animate[i].animationTimingFunction);
          name.push(animate[i].animationName);
          duration.push(animate[i].animationDuration + "s");
          infinity.push(animate[i].animationIterationCount);
          iterationCount.push(animate[i].animationIterationCount || 1);
          mode.push("none");

          // 判断延迟是否需要加前面的值
          if (i === 0) {
            delayTime = animate[i].animationDelay;
          } else {
            for (let j = 0; j < i; j++) {
              delayTime +=
                animate[j].animationDelay +
                animate[j].animationDuration *
                  animate[j].animationIterationCount;
            }
            delayTime += animate[i].animationDelay;
          }
          delayTime += "s";
          delay.push(delayTime);
        }
        result.animationTimingFunction = timingFunction.join(",");
        result.animationName = name.join(",");
        result.animationDuration = duration.join(",");
        result.animationFillMode = mode.join(",");
        result.animationDelay = delay.join(",");
        result.animationIterationCount = iterationCount.join(",");
        return result;
      }
      return {};
    }
  },
  components: {
    SyncComponent
  }
};
</script>
<style scoped lang="scss">
.i-ele-mobile {
  > div {
    width: 100%;
    height: 100%;
  }
  .img {
    display: inline-block;
    width: 100%;
    height: 100%;
  }
  .text {
    width: 100%;
    height: 100%;
    display: inline-block;
  }
}
</style>
