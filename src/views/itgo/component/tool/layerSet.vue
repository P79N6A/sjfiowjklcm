<template>
  <div class="layer-set">
    <el-dialog
      v-el-drag-dialog
      :visible.sync="dialogFormVisible"
      title="页面设置"
      width="250px"
      :modal="false"
      :close-on-click-modal="false"
    >
      <el-tabs type="border-card">
        <el-tab-pane label="用户管理">用户管理</el-tab-pane>
        <el-tab-pane label="配置管理">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import elDragDialog from "@/directive/el-dragDialog"; // base on element-ui

export default {
  name: "layerSet",
  directives: {
    elDragDialog
  },
  data() {
    return {
      activeNames: ["1"],
      dialogFormVisible: false
    };
  },
  methods: {},
  created() {
    this.$bus.$on("openLayerSet", eventData => {
      this.dialogFormVisible = true;
    });
  }
};
</script>
<style lang="scss">
.layer-set {
  .el-dialog__body {
    padding: 0;
  }
}
</style>
