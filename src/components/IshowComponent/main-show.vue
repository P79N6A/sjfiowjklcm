<template v-if="showPage">
  <div v-if="showPage">
    <div
      v-for="(page,i) in pageJson"
      :key="i"
      :style="`width:${page.width}px;height:${page.height}px;overflow:hidden;`"
      v-if="i==activePage"
    >
      <div class="ishow-view-page" :style="page.bg">
        <div v-for="item in page.json" :key="item.id" @click="elClick(item)">
          <normalElement :child-json="item" :show-json="page.json" :type="item.type"></normalElement>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import bus from "@/views/ishow/js/bus";
import { on } from "@/views/ishow/js/dom";
import normalElement from "./normal-template.vue";
// import imgElement from './img-template.vue';
export default {
  data() {
    return {
      activePage: 0, // 当前活跃的
      autoAnimation: true, //是否自动播放动画
      infinite: true, // 是否循环播放
      interval: 3000, //动画时间间隔,单位ms
      timer: "",
      showPage: true
    };
  },
  name: "main-show",
  props: ["showJson", "page", "pageJson", "pageSetting"],
  components: {
    normalElement
  },
  mounted() {
    console.log('ishow-click======')
    on(document, "click", this.handleDocumentClick);
    this.setVal();
    const $this = this;
    window.clearInterval(this.timer);
    if (this.autoAnimation) {
      $this.timer = window.setInterval(() => {
        $this.activePage = ($this.activePage + 1) % $this.pageJson.length;
        if ($this.activePage == $this.pageJson.length - 1) {
          if (!$this.infinite) {
            console.log("clear-timer");
            window.clearInterval($this.timer);
          }
        }
      }, this.interval);
    }
  },
  computed: {
    // getBackground() {
    //   return this.setBgImage();
    // }
  },
  beforeDestroy() {
    window.clearInterval(this.timer);
  },
  methods: {
    //
    setVal() {
      this.autoAnimation = this.pageSetting.autoAnimation ? true : false;
      this.infinite = this.pageSetting.infinite ? true : false;
      this.interval = this.pageSetting.interval
        ? this.pageSetting.interval * 1000
        : 3000;
      console.log(this.autoAnimation, this.infinite, this.interval);
    },
    elClick(eventJson) {
      if (eventJson.onClick == "next") {
        // 下一场景
        this.activePage = (this.activePage + 1) % this.pageJson.length;
      } else if (eventJson.onClick == "pre") {
        // 上一场景
        this.activePage =
          (this.activePage - 1 + this.pageJson.length) % this.pageJson.length;
      } else if (eventJson.onClick == "index") {
        this.activePage = eventJson.toIndex;
        // 到任意场景
      } else if (eventJson.onClick == "link" && eventJson.link) {
        if (eventJson.target == "_blank") {
          window.open(eventJson.link);
        } else {
          window.location.href = eventJson.link;
        }
      } else if (eventJson.onClick == "close") {
        console.log("close");
        this.showPage = false;
      }
    },
    handleDocumentClick() {
      this.visible = false;
    }
  },
  watch: {}
};
</script>
<style lang="scss">
.ishow-view-page {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
