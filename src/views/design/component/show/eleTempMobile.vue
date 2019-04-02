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
    :style="{transform: `rotate(${this.eleJson.style.base.rotate}deg)`}"
    :z="1000-showId"
    :key="showId"
    @activated="$bus.$emit('selectTemp',showId)"
  >
    <div @click.stop class="i-ele-mobile" v-if="showEle" :class="elId" :id="eleJson.id">
      <div class="cover"></div>
      <!-- 普通文本 -->
      <div
        class="animated ele-show"
        :style="[textCss,baseCss,bgCss,borderCss,boxShadow,animateCss]"
      >
        <div v-if="eleJson.type===1||eleJson.type===3">
          <div v-html="eleJson.config.content" class="text" :id="`tinymce-${this.eleJson.id}`"></div>
        </div>
        <!-- 图片 -->
        <div v-else-if="eleJson.type===2">
          <img :src="cdnurl+eleJson.config.content" class="img">
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
            :url="`${cdnurl}/${this.eleJson.config.content}`"
            :short-id="eleJson.config.content"
            :config="eleJson.config.config"
            :dataList="eleJson.config.category"
          ></sync-component>
        </div>
      </div>
    </div>
  </VueDragResize>
</template>
<script>
import SyncComponent from "@/components/AsyncComponent";
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
      showEle: true, // 用来做动画预览，重新渲染
      tinymceId: null
    };
  },
  props: ["eleJson", "activeTempIndex", "showId"],
  computed: {
    ...mapGetters(["cdnurl", "language"]),
    baseCss() {
      return {
        width: this.eleJson.style.base.width + "px",
        height: this.eleJson.style.base.height + "px",
        transform: `rotate(${this.eleJson.style.base.rotate}deg)`,
        opacity: this.eleJson.style.base.opacity / 100,
        overflow: this.eleJson.style.base.overflow,
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
  created() {
    // 预览动画修播放效果
    this.$bus.$on("animate-preview", () => {
      if (this.activeTempIndex === this.showId) {
        this.showEle = false;
        this.$nextTick(() => {
          this.showEle = true;
        });
      }
    });
    console.log(this.eleJson.style);
  },
  components: {
    SyncComponent,
    VueDragResize
  },
  methods: {
    // 拖拽结束
    dragstop(newRect) {
      this.$bus.$emit("saveHistory", "移动元素");
    },
    // 改变大小结束
    resizestop(newRect) {
      this.$bus.$emit("saveHistory", "更改元素尺寸");
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
    }
  }
};
</script>
<style scoped lang="scss">
.i-ele-mobile {
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
