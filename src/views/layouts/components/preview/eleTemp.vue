i<template>
  <div @click.stop class="i-ele" v-if="showEle">
    <!-- 普通文本 -->
    <div v-if="eleJson.type===1" :style="[borderCss,baseCss,bgCss,textCss,boxShadow,animateJson]" class="animated">
      <div class v-html="eleJson.config.content"></div>
    </div>
    <!-- 图片 -->
    <div v-else-if="eleJson.type===2" :style="[borderCss,baseCss,bgCss,textCss,boxShadow,animateJson]" class="animated">
      <img :src="eleJson.config.content" alt class="img">
    </div>
    <!-- 视频 -->
    <div v-else-if="eleJson.type===8" :style="[borderCss,baseCss,bgCss,textCss,boxShadow,animateJson]" class="animated">
      <video :src="eleJson.config.content" controls="controls">您的浏览器不支持 video 标签。</video>
    </div>
    <!-- svg-->
    <div v-else-if="eleJson.type===9" :style="[borderCss,baseCss,bgCss,textCss,boxShadow,animateJson]" class="animated">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"
        x="0px" y="0px" width="100%" height="100%" :viewBox="eleJson.config.viewBox" xml:space="preserve"
        preserveAspectRatio="none">
        <path :d="eleJson.config.content" :fill="eleJson.style.text.color"></path>
      </svg>
    </div>
    <div v-else-if="eleJson.type===10" :style="[borderCss,baseCss,bgCss,textCss,boxShadow,animateJson]" class="animated">
      <!-- 异步vue组件 -->
      <sync-component :url="`${eleJson.config.content}`" :data-id="eleJson.config.dataId" :category-id="eleJson.config.categoryId"></sync-component>
    </div>
  </div>
</template>
<script>
  import SyncComponent from "vue-async-component";
  const specialName = ["typewriter"];
  export default {
    data() {
      return {
        animateJson: '',
        animateIndex: 0,
        animateAll: true,
        showEle:true, // 用来做动画预览，重新渲染
      };
    },
    props: ["eleJson","activeTempIndex","showId"],
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
    created() {
      // 动画修改播放效果
      this.$bus.$on("animate-change", _index => {
        if (this.activeTempIndex === this.showId) {
          this.playAnimate(_index);
        }
      });
      // 预览动画修播放效果
      this.$bus.$on("animate-preview", () => {
        if (this.activeTempIndex === this.showId) {
          this.showEle=false;
          this.$nextTick(() => {
            this.playAnimate(false);
            this.showEle=true;
          })
        }
      });
      // 首次加载播放全部动画
      this.playAnimate(false);
    },
    components: {
      SyncComponent
    },
    methods: {
      // 动画改变
      animateChange(index) {
        if (this.id === this.showId) {
          this.playAnimate(index);
        }
      },
      // 播放动画
      playAnimate(index) {
        if (this.eleJson.animate && this.eleJson.animate.length) {
          if (index !== false) {
            // change
            this.animateAll = false;
            if (this.isSpecialAnimate(this.eleJson.animate[index]) === false) {
              this.animateJson = this.addS(this.eleJson.animate[index]);
            }
          } else {
            // preview
            this.animateAll = true;
            this.animateJson = this.renderAnimate();
          }
        }
      },
      // 添加单位s
      addS(json) {
        const data = eleJson
        data.animationDuration = data.animationDuration + "s";
        data.animationDelay = data.animationDelay + "s";
        return data;
      },
      // 渲染全部动画
      renderAnimate() {
        const animate = this.eleJson.animate
        const result = {
          "-webkit-animation-timing-function": "ease"
        };
        const delay = [],
          duration = [],
          name = [],
          mode = [],
          infinity = [],
          iterationCount=[]
        if (animate && animate.length) {
          for (let i = 0; i < animate.length; i++) {
          let delayTime=0
            // 不是特殊动画
            if (this.isSpecialAnimate(animate[i]) === false) {
            name.push(animate[i].animationName);
            duration.push(animate[i].animationDuration + "s");
            infinity.push(animate[i].animationIterationCount);
            iterationCount.push(animate[i].animationIterationCount || 1);

              if (animate[i].isOut === true || i === animate.length-1) {
                mode.push("forwards");
              } else {
                mode.push("none");
              }

              // 判断延迟是否需要加前面的值
              if (i === 0) {
                delayTime = animate[i].animationDelay;
              } else {
                for(let j=0;j<i;j++){
                  // console.log(i,j,animate[i].animationDelay,animate[j].animationDelay,animate[j].animationDuration,animate[j].animationIterationCount)
                delayTime +=
                  animate[j].animationDelay +
                  animate[j].animationDuration*animate[j].animationIterationCount
                }
                delayTime += animate[i].animationDelay;
              }
                delayTime +='s'
                delay.push(delayTime);
            }
          }
          result.animationName = name.join(",");
          result.animationDuration = duration.join(",");
          result.animationFillMode = mode.join(",");
          result.animationDelay = delay.join(",");
          result.animationIterationCount = iterationCount.join(',');
          return result;
        }
        return "";
      },
      // 判断是否是特殊动画，是：播放
      isSpecialAnimate(animate) {
        // for (let i = 0; i < specialName.length; i++) {
        //   const type = specialName[i];
        //   const name = animate.animationName.split("j-");
        //   const data = this[type];
        //   // 判断是否是选中的特殊动画
        //   data.isActive = name.length >= 2 && name[1] === type;
        //   if (data.isActive) {
        //     clearInterval(data.timer);
        //     this.runSpecialAnimate(data, animate, name);
        //     return true;
        //   }
        // }
        return false;
      },
      // 播放动画
      runSpecialAnimate(data, animate) {
        if (animate.animationName === "j-typewriter") {
          const arr = this.content.split("<br>");
          const brIndex = [];
          const duration = animate.animationDuration || 0.1;
          data.content = "";
          // 提取换行的位置
          for (let k = 0, len = arr.length; k < len; k++) {
            const index =
              k === 0 ? arr[k].length - 1 : brIndex[k - 1] + arr[k].length;
            brIndex.push(index);
          }
          // 延时
          setTimeout(() => {
            const content = arr.join("").split("");
            const len = arr.join("").length;
            let i = 0;
            let j = 0;
            // 定时循环
            data.timer = setInterval(() => {
              data.content += content[i];
              if (i === brIndex[j]) {
                data.content += "<br>";
                j++;
              }
              i++;
              if (i >= len) {
                clearInterval(data.timer);
                data.isActive = false;
              }
            }, duration * 1000);
          }, animate.animationDelay * 1000);
        }
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
