<template>
  <VueDragResize
    :isActive="activeTempIndex==showId"
    v-on:resizing="resize"
    v-on:dragging="resize"
    v-on:dragstop="dragstop"
    v-on:resizestop="resizestop"
    v-show="eleJson.config.isShow"
    :isDraggable="!eleJson.config.isLock"
    :isResizable="!eleJson.config.isLock"
    :parentW="1000"
    :parentH="1000"
    :w="eleJson.style.base.width"
    :minw="1"
    :minh="1"
    :h="eleJson.style.base.height"
    :x="eleJson.position.left"
    :y="eleJson.position.top"
    :style="{transform: `rotate(${eleJson.style.base.rotate}deg)`}"
    :z="1000-showId"
    :key="showId"
    @activated="$bus.$emit('selectTemp',showId)"
  >
    <div @click.stop class="i-ele" v-if="showEle" :class="elId" :id="eleJson.id">
      <div class="cover"></div>
      <!-- 普通文本 -->
      <div class="animated ele-show">
        <div v-if="eleJson.type===1">
          <div v-html="eleJson.config.content" class="text"></div>
        </div>
        <!-- 图片 -->
        <div v-else-if="eleJson.type===2">
          <img :src="cdnurl+eleJson.config.content" alt class="img">
        </div>
        <!-- 视频 -->
        <div v-else-if="eleJson.type===8">
          <video :src="cdnurl+eleJson.config.content" controls="controls">您的浏览器不支持 video 标签。</video>
        </div>
        <!-- svg-->
        <div v-else-if="eleJson.type===9">
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
        <div v-else-if="eleJson.type===10">
          <!-- 异步vue组件 -->
          <sync-component
            :url="cdnurl+eleJson.config.content"
            :data-id="eleJson.config.dataId"
            :category-id="eleJson.config.categoryId"
          ></sync-component>
        </div>
      </div>

      <div v-html="`<style>${styleText}</style>`"></div>
    </div>
  </VueDragResize>
</template>
<script>
import SyncComponent from "vue-async-component";
import VueDragResize from "vue-drag-resize";
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
      styleText: "",
      animateJson: "",
      animateIndex: 0,
      showEle: true // 用来做动画预览，重新渲染
    };
  },
  props: ["eleJson", "activeTempIndex", "showId"],
  computed: {
    ...mapGetters(["cdnurl"])
  },
  created() {
    // 预览动画修播放效果
    this.$bus.$on("animate-preview", () => {
      if (this.activeTempIndex === this.showId) {
        this.showEle = false;
        this.$nextTick(() => {
          console.log("animate-pre");
          this.getStyle(
            this.eleJson.style,
            this.eleJson.hoverStyle,
            this.eleJson.animate,
            this.eleJson.hoverAnimate
          );
          this.showEle = true;
        });
      }
    });
    // 渲染样式
    this.$bus.$on("renderStyle", () => {
      if (this.activeTempIndex === this.showId) {
        console.log("render");
        this.getStyle(
          this.eleJson.style,
          this.eleJson.hoverStyle,
          this.eleJson.animate,
          this.eleJson.hoverAnimate
        );
      }
    });
  },
  components: {
    SyncComponent,
    VueDragResize
  },
  methods: {
    // 拖拽结束
    dragstop(newRect) {
      this.$bus.$emit("saveHistory", "移动元素");
      // 渲染样式
      console.log("drag-stop");
      this.getStyle(
        this.eleJson.style,
        this.eleJson.hoverStyle,
        this.eleJson.animate,
        this.eleJson.hoverAnimate
      );
    },
    // 改变大小结束
    resizestop(newRect) {
      this.$bus.$emit("saveHistory", "更改元素尺寸");
      // 渲染样式
      console.log("resize-stop");
      this.getStyle(
        this.eleJson.style,
        this.eleJson.hoverStyle,
        this.eleJson.animate,
        this.eleJson.hoverAnimate
      );
    },
    // 正在拖拽
    resize(newRect) {
      if (this.eleJson.style.base.width == this.eleJson.hoverStyle.base.width) {
        this.eleJson.hoverStyle.base.width = this.eleJson.style.base.width =
          newRect.width;
      } else {
        this.eleJson.style.base.width = newRect.width;
      }
      if (
        this.eleJson.style.base.height == this.eleJson.hoverStyle.base.height
      ) {
        this.eleJson.hoverStyle.base.height = this.eleJson.style.base.height =
          newRect.height;
      } else {
        this.eleJson.style.base.height = newRect.height;
      }
      this.eleJson.position.top = newRect.top;
      this.eleJson.position.left = newRect.left;
    },
    // 渲染全部动画
    renderAllAnimate(animate) {
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
        result.animationName = name.join(",");
        result.animationDuration = duration.join(",");
        result.animationFillMode = mode.join(",");
        result.animationDelay = delay.join(",");
        result.animationIterationCount = iterationCount.join(",");
        return `
          animation-timing-function: ${timingFunction.join(",")};
          animation-name: ${name.join(",")};
          animation-duration: ${duration.join(",")};
          animation-fill-mode: ${mode.join(",")};
          animation-delay: ${delay.join(",")};
          animation-iteration-count: ${iterationCount.join(",")};
        `;
      }
      return "";
    },
    // 渲染样式
    getStyle(style, hoverStyle, animate, hoverAnimate) {
      console.log("getStryle");
      const animateText = this.renderAllAnimate(animate);
      const animateTextHover = this.renderAllAnimate(hoverAnimate);
      this.styleText = `
      .${this.elId} {
        width: ${style.base.width}px;
        height: ${style.base.height}px;
        opacity: ${style.base.opacity / 100};
        transition:all ${style.transition.duration}s ${
        style.transition.timingFunction
      };

        border-width: ${style.border.borderWidth}px;
        border-radius: ${style.border.borderRadius}px;
        border-color: ${style.border.borderColor};
        border-style: ${style.border.borderStyle};

        background-image: url('${this.cdnurl}${style.bg.backgroundImage}');
        background-color: ${style.bg.backgroundColor};
        background-size: ${style.bg.backgroundSize};
        background-repeat: ${style.bg.backgroundRepeat};
        background-position: ${style.bg.backgroundPosition};
        background-attachment: ${style.bg.backgroundAttachment || "initial"};

        color: ${style.text.color};

        font-size: ${style.text.fontSize}px;
        font-weight: ${style.text.fontWeight};
        font-style: ${style.text.fontStyle || "normal"};
        font-family: ${style.text.fontFamily};

        text-align: ${style.text.textAlign};
        line-height: ${style.text.lineHeight};
        letter-spacing: ${style.text.letterSpacing}px;
        text-decoration: ${style.text.textDecoration || "none"};
        box-shadow: ${style.shadow.shadowColor} ${style.shadow.shadowX ||
        0}px ${style.shadow.shadowY || 0}px ${style.shadow.shadowFuzzy ||
        0}px ${style.shadow.shadowDire || 0}px ${
        style.shadow.shadowinSet ? "inset" : ""
      };
        transform: translateX(${style.transform.translateX ||
          0}%) translateY(${style.transform.translateY || 0}%) scaleX(${style
        .transform.scaleX || 1}) scaleY(${style.transform.scaleY ||
        1}) rotateX(${style.transform.rotateX || 0}deg) rotateY(${style
        .transform.rotateY || 0}deg) rotateZ(${style.transform.rotateZ ||
        0}deg) skewX(${style.transform.skewX || 0}deg) skewY(${style.transform
        .skewY || 0}deg);
        ${animateText}
       } 

      .${this.elId}:hover {
        border-width: ${hoverStyle.border.borderWidth || 0}px;
        border-radius: ${hoverStyle.border.borderRadius || 0}px;
        border-color: ${hoverStyle.border.borderColor ||
          style.border.borderColor};
        border-hoverStyle: ${hoverStyle.border.borderStyle ||
          style.border.borderStyle};

        width: ${hoverStyle.base.width}px;
        height: ${hoverStyle.base.height}px;
        opacity: ${(hoverStyle.base.opacity || 100) / 100};
        background-image: url('${this.cdnurl}${hoverStyle.bg.backgroundImage ||
        style.bg.backgroundImage}');
        background-color: ${hoverStyle.bg.backgroundColor ||
          style.bg.backgroundSize};
        background-size: ${hoverStyle.bg.backgroundSize ||
          style.bg.backgroundSize};
        background-repeat: ${hoverStyle.bg.backgroundRepeat ||
          style.bg.backgroundSize};
        background-position: ${hoverStyle.bg.backgroundPosition ||
          style.bg.backgroundSize};
        background-attachment: ${hoverStyle.bg.backgroundAttachment ||
          style.bg.backgroundSize ||
          "initial"};

        color: ${hoverStyle.text.color || style.text.color};

        font-size: ${hoverStyle.text.fontSize || style.text.fontSize}px;
        font-weight: ${hoverStyle.text.fontWeight || style.text.fontWeight};
        font-hoverStyle: ${hoverStyle.text.fontStyle ||
          style.text.fontStyle ||
          "normal"};
        font-family: ${hoverStyle.text.fontFamily || style.text.fontFamily};

        text-align: ${hoverStyle.text.textAlign || style.text.textAlign};
        line-height: ${hoverStyle.text.lineHeight || style.text.lineHeight};
        letter-spacing: ${hoverStyle.text.letterSpacing ||
          style.text.letterSpacing}px;
        text-decoration: ${hoverStyle.text.textDecoration ||
          style.text.textDecoration ||
          "none"};
        box-shadow: ${hoverStyle.shadow.shadowColor ||
          style.shadow.shadowColor} ${hoverStyle.shadow.shadowX ||
        0}px ${hoverStyle.shadow.shadowY || 0}px ${hoverStyle.shadow
        .shadowFuzzy || 0}px ${hoverStyle.shadow.shadowDire || 0}px ${
        hoverStyle.shadow.shadowinSet ? "inset" : ""
      };
        transform: translateX(${hoverStyle.transform.translateX ||
          0}%) translateY(${hoverStyle.transform.translateY ||
        0}%) scaleX(${hoverStyle.transform.scaleX || 1}) scaleY(${hoverStyle
        .transform.scaleY || 1}) rotateX(${hoverStyle.transform.rotateX ||
        0}deg) rotateY(${hoverStyle.transform.rotateY ||
        0}deg) rotateZ(${hoverStyle.transform.rotateZ ||
        0}deg) skewX(${hoverStyle.transform.skewX || 0}deg) skewY(${hoverStyle
        .transform.skewY || 0}deg);
       } 
             .${this.elId} .animated:hover {
              ${animateTextHover}
             }
        `;
    }
  },
  watch: {
    eleJson(val) {
      console.log("change");
      // 渲染样式
      this.getStyle(
        this.eleJson.style,
        this.eleJson.hoverStyle,
        this.eleJson.animate,
        this.eleJson.hoverAnimate
      );
    }
  },
  mounted() {
    this.$nextTick(() => {
      // 渲染样式
      console.log("mounted");
      this.getStyle(
        this.eleJson.style,
        this.eleJson.hoverStyle,
        this.eleJson.animate,
        this.eleJson.hoverAnimate
      );
    });
  }
};
</script>
<style scoped lang="scss">
.i-ele {
  position: relative;
  overflow: hidden;

  // overflow: hidden;
  .cover {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0);
    z-index: 9;
  }

  .ele-show {
    width: 100%;
    height: 100%;
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
      height: 100%;
      width: 100%;
    }
  }
}
</style>
