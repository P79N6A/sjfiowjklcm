<template>
  <div style="width:100%;" :id="`${appJson.value.id}`" v-if="showPage">
    <div
      v-for="(pageJson,i) in appJson.value.pageJson"
      :key="i"
      style="display:flex;width:100%;"
      :id="pageJson.id"
    >
      <!-- <transition :enter-active-class="pageJson.animate.enterAnimation" :leave-active-class="pageJson.animate.leaveAnimation"> -->
      <div
        class="i-box animated"
        :style="[bgCss,{width:pageJson.config.fullScreen?'100%': ''}]"
        v-if="i==activePage"
      >
        <div class="animated">
          <div class="i-show" :style="[baseCss,borderCss,boxShadow]" v-if="!isMobile">
            <div
              v-for="(drag,i) in pageJson.json"
              :key="i"
              :id="drag.id"
              v-if="drag.config.isShow"
              :style="{position:'absolute',cursor:`${drag.event.onClick.type?'pointer':'default'}`,zIndex:`${1000-i}`,width:`${drag.style.base.width}px`,height:`${drag.style.base.height}`,left:`${drag.position.left}px`,top:`${drag.position.top}px`,}"
              @click="elClick(drag.event)"
            >
              <eleTemp :eleJson="drag" :showId="i">
                <!-- 组件配置 -->
              </eleTemp>
            </div>
          </div>
          <div class="i-show" :style="[baseCss,borderCss,boxShadow]" v-if="isMobile">
            <div
              v-for="(drag,i) in pageJson.json"
              :key="i"
              :id="drag.id"
              v-if="drag.config.isShow"
              :style="{position:'absolute',cursor:`${drag.event.onClick.type?'pointer':'default'}`,zIndex:`${1000-i}`,width:`${drag.style.base.width}px`,height:`${drag.style.base.height}`,left:`${drag.position.left}px`,top:`${drag.position.top}px`,}"
              @click="elClick(drag.event)"
            >
              <eleTempMobile :eleJson="drag" :showId="i">
                <!-- 组件配置 -->
              </eleTempMobile>
            </div>
          </div>
        </div>
        <div
          v-html="`<style>${pageJson.config.styleText}</style>`"
          v-if="pageJson.config.styleText"
          style="display:none!important;"
        ></div>
      </div>
      <!-- </transition> -->
    </div>
  </div>
</template>
<script>
import eleTemp from "./eleTemp.vue";
import eleTempMobile from "./eleTempMobile.vue";
import { getIshowShortId } from "@/api/ishow";
import request from "@/utils/request";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      // appJson:null,
      activePage: 0, // 当前活跃的
      autoAnimation: true, //是否自动播放动画
      infinite: true, // 是否循环播放
      interval: 3000, //动画时间间隔,单位ms
      timer: "",
      scrollTimer: null,
      showPage: true
    };
  },
  components: {
    eleTemp,
    eleTempMobile
  },
  props: ["shortId", "appJson", "ishowUrl", "isMobile"],
  created() {},
  beforeDestroy() {
    window.clearInterval(this.timer);
  },
  mounted() {
    // 有完整的json传入
    if (this.appJson) {
      this.setVal();
      this.startAnimate();
    }
    // shortId
    else if (this.shortId) {
      this.getIshowOne();
    }
  },
  methods: {
    startAnimate() {
      window.clearInterval(this.timer);
      if (this.autoAnimation) {
        this.timer = window.setInterval(() => {
          this.activePage =
            (this.activePage + 1) % this.appJson.value.pageJson.length;
          if (this.activePage == this.appJson.value.pageJson.length - 1) {
            if (!this.infinite) {
              window.clearInterval(this.timer);
            }
          }
        }, this.interval);
      }
    },
    setVal() {
      this.autoAnimation = this.appJson.value.pageSetting.autoAnimation
        ? true
        : false;
      this.infinite = this.appJson.value.pageSetting.infinite ? true : false;
      this.interval = this.appJson.value.pageSetting.interval
        ? this.appJson.value.pageSetting.interval * 1000
        : 3000;
    },
    // 读取数据内容
    getIshowOne() {
      if (this.shortId) {
        console.log("shortId");
        getIshowShortId({
          shortId: this.shortId
        })
          .then(res => {
            this.appJson = res.data;
            this.setVal();
            this.startAnimate();
          })
          .catch(err => {});
      } else {
      }
    },
    elClick(eventJson) {
      console.log(eventJson);
      if (eventJson.onClick.type == "next") {
        // 下一场景
        this.activePage = (this.activePage + 1) % this.pageJson.length;
      } else if (eventJson.onClick.type == "pre") {
        // 上一场景
        this.activePage =
          (this.activePage - 1 + this.pageJson.length) % this.pageJson.length;
      } else if (eventJson.onClick.type == "index") {
        this.activePage = eventJson.onClick.index;
        // 到任意场景
      } else if (eventJson.onClick.type == "link" && eventJson.onClick.link) {
        if (eventJson.onClick.target == "_blank") {
          window.open(eventJson.onClick.link);
        } else {
          window.location.href = eventJson.onClick.link;
        }
      } else if (eventJson.onClick.type == "close") {
        this.showPage = false;
      } else if (eventJson.onClick.type == "scroll") {
        this.scrollTo(eventJson.onClick.scrollY);
      }
    },
    //垂直滚动
    scrollTo(iTarget) {
      window.clearInterval(this.scrollTimer);
      let scrollElm = null;
      // 兼容性处理
      if (document.documentElement && document.documentElement.scrollTop) {
        scrollElm = document.documentElement.scrollTop;
      } else if (document.body) {
        scrollElm = document.body.scrollTop;
      }
      const that = this;
      // 缓冲滚动
      this.scrollTimer = window.setInterval(function() {
        that.iSpeed = (iTarget - scrollElm) / 4;
        if (that.iSpeed > -1 && that.iSpeed < 1) {
          window.clearInterval(that.scrollTimer);
        } else {
          scrollElm += that.iSpeed;
          window.scroll(0, scrollElm);
        }
      }, 60);
    }
  },
  watch: {
    shortId(val) {
      if (val) {
        this.getIshowOne();
      }
    }
  },
  computed: {
    ...mapGetters(["cdnurl"]),
    borderCss() {
      return {
        borderWidth:
          this.appJson.value.pageJson[this.activePage].style.border
            .borderWidth + "px",
        borderRadius:
          this.appJson.value.pageJson[this.activePage].style.border
            .borderRadius + "px",
        borderColor: this.appJson.value.pageJson[this.activePage].style.border
          .borderColor,
        borderStyle: this.appJson.value.pageJson[this.activePage].style.border
          .borderStyle
      };
    },
    baseCss() {
      return {
        width:
          this.appJson.value.pageJson[this.activePage].style.base.width + "px",
        height:
          this.appJson.value.pageJson[this.activePage].style.base.height + "px",
        transform: `rotate(${
          this.appJson.value.pageJson[this.activePage].style.base.rotate
        }deg)`,
        opacity:
          this.appJson.value.pageJson[this.activePage].style.base.opacity / 100,
        cursor: this.appJson.value.pageJson[this.activePage].style.base.cursor
      };
    },
    bgCss() {
      return {
        // 背景
        backgroundImage: `url('${this.cdnurl}${
          this.appJson.value.pageJson[this.activePage].style.bg.backgroundImage
        }')`,
        backgroundColor: this.appJson.value.pageJson[this.activePage].style.bg
          .backgroundColor,
        backgroundSize: this.appJson.value.pageJson[this.activePage].style.bg
          .backgroundSize,
        backgroundRepeat: this.appJson.value.pageJson[this.activePage].style.bg
          .backgroundRepeat,
        backgroundPosition: this.appJson.value.pageJson[this.activePage].style
          .bg.backgroundPosition,
        backgroundAttachment: this.appJson.value.pageJson[this.activePage].style
          .bg.backgroundAttachment
      };
      // return this.appJson.value.pageJson[this.activePage].bg;
    },
    boxShadow() {
      return {
        boxShadow: `${
          this.appJson.value.pageJson[this.activePage].style.shadow.shadowColor
        } ${
          this.appJson.value.pageJson[this.activePage].style.shadow.shadowX
        }px ${
          this.appJson.value.pageJson[this.activePage].style.shadow.shadowY
        }px ${
          this.appJson.value.pageJson[this.activePage].style.shadow.shadowFuzzy
        }px ${
          this.appJson.value.pageJson[this.activePage].style.shadow.shadowDire
        }px ${
          this.appJson.value.pageJson[this.activePage].style.shadow.shadowinSet
            ? "inset"
            : ""
        }`
      };
    }
  }
};
</script>
<style lang="scss" scoped>
.i-box {
  display: flex;
  justify-content: center;
  align-items: center;
  float: left;
  .i-show {
    overflow: hidden;
    display: block;
    position: relative;
  }
}
</style>
