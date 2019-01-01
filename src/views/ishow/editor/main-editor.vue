<template>
  <div class="ishow-rightContainer mt5">
    <div class="ishow-editorWrapper" @click.stop>
      <el-tabs v-model="activeName2" type="border-card" v-if="!showBg&&showId" v-el-drag-dialog>
        <el-tab-pane label="图层" name="third">
          <div
            v-for="(item,i) in pageJson.json"
            :key="i"
            class="edit-layer"
            @click="layerSelect(item.id)"
          >
            <div v-if="item.type==1">
              <i class="el-icon-tickets"></i>
              [{{item.zIndex}}]{{item.content}}
            </div>
            <div v-if="item.type==2">
              <i class="el-icon-picture-outline"></i>
              [{{item.zIndex}}]图片
            </div>
            <div v-if="item.type==3">
              <i class="el-icon-edit-outline"></i>
              [{{item.zIndex}}]输入框
            </div>
            <div v-if="item.type==4">
              <i class="el-icon-more-outline"></i>
              [{{item.zIndex}}]单选
            </div>
            <div v-if="item.type==5">
              <i class="el-icon-more"></i>
              [{{item.zIndex}}]多选
            </div>
            <div v-if="item.type==6">
              <i class="el-icon-d-caret"></i>
              [{{item.zIndex}}]下拉菜单
            </div>
            <div v-if="item.type==7">
              <i class="el-icon-success"></i>
              [{{item.zIndex}}]按钮
            </div>
            <!-- {{item}} -->
          </div>
        </el-tab-pane>
        <el-tab-pane label="样式" name="first">
          <textEditor :render-json="renderJson" :show-id="showId"></textEditor>
          <!-- <component v-bind:is="currentView" :render-json="renderJson" :show-id="showId"> -->
          <!-- 组件在 vm.currentview 变化时改变！ -->
          <!-- </component> -->
        </el-tab-pane>
        <el-tab-pane label="动画" name="second">
          <animate-editor :render-json="renderJson" :show-id="showId"></animate-editor>
        </el-tab-pane>
        <el-tab-pane label="事件" name="fourth">
          <br>
          <br>
          <el-radio-group v-model="onClick" size="small">
            <el-radio-button label="next">下一页</el-radio-button>
            <el-radio-button label="pre">上一页</el-radio-button>
            <el-radio-button label="close">关闭组件</el-radio-button>
            <el-radio-button label="link">超链接</el-radio-button>
          </el-radio-group>
          <br>
          <br>
          <br>
          <el-input v-model="link" placeholder="请输入内容" size="medium" v-if="onClick=='link'"></el-input>
        </el-tab-pane>
      </el-tabs>
      <el-tabs v-model="activeName" type="border-card" v-if="showBg">
        <el-tab-pane label="背景" name="first">
          <bgEditor :render-json="renderJson" :show-id="showId" :pageJson="pageJson"></bgEditor>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import textEditor from "./text-editor.vue";
import imageEditor from "./image-editor.vue";
import animateEditor from "./animate-editor.vue";
import bgEditor from "./bg-editor.vue";
import bus from "@/views/ishow/js/bus";
import elDragDialog from "@/directive/el-dragDialog"; // base on element-ui
// const arr = ['textEditor', 'imageEditor', 'animateEditor'];
export default {
  directives: {
    elDragDialog
  },
  data() {
    return {
      activeName2: "first",
      id: this.showId,
      activeName: "first",
      showBg: false,
      onClick: "",
      link: ""
    };
  },
  props: ["renderJson", "showId", "pageJson"],
  components: {
    textEditor,
    animateEditor,
    imageEditor,
    bgEditor
  },
  created() {
    this.handleView();
    bus.$on("bg-editor-hide", () => {
      this.showBg = false;
    });
  },
  methods: {
    handleView() {
      this.id = this.showId;
    },
    toggleBgEditor(isActive) {
      if (isActive !== null) {
        this.showBg = isActive;
        return false;
      }
      this.showBg = !this.showBg;
    },
    layerSelect(id) {
      bus.$emit("layer-selected", id);
    }
  },
  watch: {
    renderJson: {
      handler() {
        this.handleView();
      },
      deep: true
    },
    showId() {
      this.handleView();
    }
  }
};
</script>
<style lang="scss" scoped>
.edit-layer {
  padding: 15px;
  border-bottom: solid 1px #eee;
  cursor: pointer;
  i {
    margin-right: 5px;
  }
}
</style>
