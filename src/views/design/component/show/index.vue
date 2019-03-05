<template>
  <vue-ruler-tool
    :content-layout="{left:0,top:0}"
    :is-scale-revise="true"
    :preset-line="presetLine"
    position="relative"
  >
    <div style="width:100%;">
      <div
        class="i-box"
        :style="[bgCss,borderCss,boxShadow,{width:pageJson.config.fullScreen?'100%':pageJson.style.base.width + 'px'}]"
      >
        <div
          :class="pageJson.animate.enterAnimation"
          class="animated"
          style="border:dashed 1px #ccc;"
          :style="[baseCss]"
        >
          <div class="i-show">
            <!-- 拖拽外框 -->
            <div v-for="(drag,i) in pageJson.json" :key="i">
              <!-- <VueDragResize
                :isActive="activeTempIndex==i"
                v-on:resizing="resize"
                v-on:dragging="resize"
                v-on:dragstop="$bus.$emit('saveHistory','拖拽元素位置')"
                v-on:resizestop="$bus.$emit('saveHistory','调整元素大小')"
                v-show="drag.config.isShow"
                :isDraggable="!drag.config.isLock"
                :isResizable="!drag.config.isLock"
                :parentW="1000"
                :parentH="1000"
                :w="drag.style.base.width"
                :minw="1"
                :minh="1"
                :h="drag.style.base.height"
                :x="drag.position.left"
                :y="drag.position.top"
                :style="{transform: `rotate(${drag.style.base.rotate}deg)`}"
                :z="1000-i"
                :key="i"
                @activated="$bus.$emit('selectTemp',i)"
              >-->
              <eleTemp :eleJson="drag" :activeTempIndex="activeTempIndex" :showId="i">
                <!-- 组件配置 -->
              </eleTemp>
              <!-- </VueDragResize> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </vue-ruler-tool>
</template>
<script>
import VueDragResize from "vue-drag-resize";
import VueRulerTool from "@/components/Rule";
import eleTemp from "./eleTemp.vue";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      presetLine: []
    };
  },
  components: {
    VueDragResize,
    VueRulerTool,
    eleTemp
  },
  props: ["pageJson", "activeTempIndex"],
  methods: {
    resize(newRect) {
      this.activeDrag.style.base.width = newRect.width;
      this.activeDrag.style.base.height = newRect.height;
      this.activeDrag.position.top = newRect.top;
      this.activeDrag.position.left = newRect.left;
    }
  },
  created() {
    document.addEventListener("keydown", event => {
      // 撤销 ctrl+z
      if (
        (event.keyCode === 90 && event.metaKey) ||
        (event.keyCode === 90 && event.ctrlKey)
      ) {
        // bus.$emit("get-histroy");
      }
      // 没有选中组件
      if (!this.activeDrag) {
        return false;
      }
      // 上下左右移动
      const arr = [["left", -1], ["left", 1], ["top", -1], ["top", 1]];
      const result =
        event.keyCode === 37
          ? 0
          : event.keyCode === 39
          ? 1
          : event.keyCode === 38
          ? 2
          : event.keyCode === 40
          ? 3
          : false;
      if (result !== false) {
        this.activeDrag.position[arr[result][0]] += arr[result][1];
        // const data = this.parseJson(this.renderJson);

        // data[this.showId].position[arr[result][0]] =
        // data[this.showId].position[arr[result][0]] + arr[result][1];
      }

      // 删除
      if (event.keyCode === 8 || event.keyCode === 46) {
        if (event.target.tagName === "BODY") {
          // bus.$emit("add-histroy");
          this.$bus.$emit("deleteTemp", this.activeTempIndex);
        }
      }
    });
  },

  computed: {
    ...mapGetters(["cdnurl"]),
    activeDrag() {
      return this.pageJson.json[this.activeTempIndex];
    },
    borderCss() {
      return {
        borderWidth: this.pageJson.style.border.borderWidth + "px",
        borderRadius: this.pageJson.style.border.borderRadius + "px",
        borderColor: this.pageJson.style.border.borderColor,
        borderStyle: this.pageJson.style.border.borderStyle
      };
    },
    baseCss() {
      return {
        width: this.pageJson.style.base.width + "px",
        height: this.pageJson.style.base.height + "px",
        transform: `rotate(${this.pageJson.style.base.rotate}deg)`,
        opacity: this.pageJson.style.base.opacity / 100
      };
    },
    bgCss() {
      return {
        // 背景
        backgroundImage: `url('${this.cdnurl}${
          this.pageJson.style.bg.backgroundImage
        }')`,
        backgroundColor: this.pageJson.style.bg.backgroundColor,
        backgroundSize: this.pageJson.style.bg.backgroundSize,
        backgroundRepeat: this.pageJson.style.bg.backgroundRepeat,
        backgroundPosition: this.pageJson.style.bg.backgroundPosition,
        backgroundAttachment: this.pageJson.style.bg.backgroundAttachment
      };
    },
    boxShadow() {
      return {
        boxShadow: `${this.pageJson.style.shadow.shadowColor} ${
          this.pageJson.style.shadow.shadowX
        }px ${this.pageJson.style.shadow.shadowY}px ${
          this.pageJson.style.shadow.shadowFuzzy
        }px ${this.pageJson.style.shadow.shadowDire}px ${
          this.pageJson.style.shadow.shadowinSet ? "inset" : ""
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
  overflow: hidden;
  // background: #fff;
  // background-image:
  //     linear-gradient(45deg, #eee 25%, transparent 0, transparent 75%, #eee 0),
  //     linear-gradient(45deg, #eee 25%, transparent 0, transparent 75%, #eee 0);
  // background-position: 0 0, 15px 15px;
  // background-size: 30px 30px;
  .i-show {
    overflow: hidden;
    display: block;
  }
}
</style>