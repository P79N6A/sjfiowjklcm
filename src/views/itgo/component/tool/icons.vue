<template>
  <div class="icons">
    <el-tooltip class="item" effect="dark" content="收起菜单" placement="left">
      <span class="item">
        <i class="el-icon-caret-right"></i>
      </span>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="撤销上一步操作" placement="left">
      <span class="item">
        <i class="el-icon-d-arrow-left"></i>
      </span>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="恢复操作" placement="left">
      <span class="item">
        <i class="el-icon-d-arrow-right"></i>
      </span>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="复制当前页" placement="left">
      <span class="item">
        <i class="el-icon-printer"></i>
      </span>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="当前页设置2" placement="left">
      <span class="item" @click="$bus.$emit('openPageSet')">
        <i class="el-icon-setting"></i>
      </span>
    </el-tooltip>
    <el-tooltip class="item warning" effect="dark" content="超出虚线框部分将不会展示" placement="left">
      <span class="item">
        <i class="el-icon-warning"></i>
      </span>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  name: "Icon",

  data() {
    return {};
  }
};
</script>

<style scoped lang="scss">
.icons {
  background: #fff;
  border-left: solid 1px #eee;
  border-right: solid 1px #eee;
  .item {
    display: block;
    width: 40px;
    height: 40px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    &.warning {
      background: #e6a23c !important;
      color: #fff;
    }

    &:hover {
      background: #409eff;
      color: #fff;
    }
  }
}
</style>
