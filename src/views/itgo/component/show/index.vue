<template>
  <div class="ishow-centerContainer">
    <div class="ishow-showWrapper">
      <div class="ishow-phoneMain tc">
        <div class="ishow-screen">
          <div class="v-show ishow-showScreen">
            <VueDragResize
              :isActive="activeTempIndex==i"
              v-on:resizing="resize"
              v-on:dragging="resize"
              v-for="(drag,i) in pageJson.json"
              v-show="drag.isShow"
              :isDraggable="!drag.isLock"
              :isResizable="!drag.isLock"
              :parentW="1000"
              :parentH="1000"
              :w="drag.width"
              :h="drag.height"
              :x="drag.position.left"
              :y="drag.position.top"
              :z="1000-i"
              :key="i"
              @activated="onActivated(drag,i);$bus.$emit('selectTemp',i)"
            >
              <div :style="`width:${drag.width}px;height:${drag.height}px;background:#ccc`">
                {{drag.width}}-
                {{drag.height}}
                <br>
                {{drag.position.left}}-
                {{drag.position.top}}
              </div>
            </VueDragResize>
          </div>
        </div>
      </div>
      <!-- 右键菜单 -->
      <!-- <button2Editor :render-json="renderJson" :show-id="showId" :show-json="showJson"></button2Editor> -->
    </div>
  </div>
</template>
<script>
import VueDragResize from "vue-drag-resize";
// import normalElement from "./normal-template.vue";
// import button2Editor from "@/views/ishow/editor/button2-editor.vue";
export default {
  data() {
    return {
      item: [
        {
          width: 200,
          height: 100,
          top: 30,
          left: 30,
          isLock: true,
          isShow: true
        },
        {
          width: 200,
          height: 100,
          top: 50,
          left: 50,
          isLock: false,
          isShow: true
        },
        {
          width: 200,
          height: 100,
          top: 90,
          left: 90,
          isLock: true,
          isShow: false
        },
        {
          width: 200,
          height: 100,
          top: 200,
          left: 200,
          isLock: false
        }
      ],
      activeDrag: null
    };
  },
  components: {
    // normalElement,
    // button2Editor,
    VueDragResize
  },
  props: ["pageJson", "activeTempIndex"],
  methods: {
    onActivated(item, i) {
      if (item.isLock) {
        this.activeDrag = null;
        return;
      }
      // 缓存选定的元素
      this.activeDrag = item;
    },
    resize(newRect) {
      this.activeDrag.width = newRect.width;
      this.activeDrag.height = newRect.height;
      this.activeDrag.position.top = newRect.top;
      this.activeDrag.position.left = newRect.left;
    }
  },
  mounted() {
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
        this.activeDrag[arr[result][0]] += arr[result][1];
        // const data = this.parseJson(this.renderJson);

        // data[this.showId].position[arr[result][0]] =
        // data[this.showId].position[arr[result][0]] + arr[result][1];
      }

      // 删除
      // if (event.keyCode === 8 || event.keyCode === 46) {
      //   if (event.target.tagName === "BODY") {
      //     bus.$emit("add-histroy");
      //     delete this.renderJson[this.showId];
      //     const data = this.parseJson(this.renderJson);
      //     bus.$emit("update-json", data);
      //     this.showId = false;
      //   }
      // }
    });
  }
};
</script>
