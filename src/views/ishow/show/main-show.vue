<template>
  <div class="ishow-centerContainer">
    <div class="ishow-showWrapper">
      <div class="ishow-phoneMain tc">
        <div class="ishow-screen" :style="`width:${pageJson.width}px;height:${pageJson.height}px`">
          <div class="v-show ishow-showScreen" :style="pageJson.bg">
            <normalElement
              v-for="item in showJson"
              :key="item.id"
              :child-json="item"
              :show-json="showJson"
              :show-id="showId"
              :type="item.type"
              ref="template"
            ></normalElement>
          </div>
        </div>
      </div>
      <!-- 右键菜单 -->
      <button2Editor :render-json="renderJson" :show-id="showId" :show-json="showJson"></button2Editor>
    </div>
  </div>
</template>
<script>
import bus from "@/views/ishow/js/bus";
import normalElement from "./normal-template.vue";
import button2Editor from "@/views/ishow/editor/button2-editor.vue";
export default {
  data() {
    return {
      currentView: "normalElement",
      bgStyle: {}
    };
  },
  props: ["showJson", "renderJson", "showId", "pageJson"],
  components: {
    normalElement,
    button2Editor
  },
  watch: {
    pageJson: {
      handler() {
        this.setBgImage();
      },
      deep: true
    }
  },
  created() {
    // const _self = this;
    // bus.$on('re-render', data => { })
    this.setBgImage();
    // 更新背景图片
    bus.$on("mainShow-update-img", () => {
      this.setBgImage();
    });
  },
  methods: {
    handleCommand(command) {
      this.$message("click on item " + command);
    },
    // json是否相等
    jsonEq(val1, val2) {
      return JSON.stringify(val1) === JSON.stringify(val2);
    },
    setBgImage() {
      const bgImage = this.pageJson.bgImage;
      if (!bgImage) {
        return;
      }
      if (bgImage.url) {
        return (
          "background: url(" +
          bgImage.url +
          ") center center / cover no-repeat;"
        );
      }
      return "background-color: " + bgImage.backgroundColor + " ;";
    },
    toggleBgEditor() {
      this.$parent.bgEditorToggle(true);
    }
  },
  computed: {
    getBackground() {
      return this.setBgImage();
    }
  }
};
</script>
