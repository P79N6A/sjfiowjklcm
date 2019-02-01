<template>
  <div>
    <div class="i-sidebar">
      <div class="item" :class="{active:sideActive==1}" @click="sideActive=1">
        <i class="el-icon-share"></i>
        <p>元素模板</p>
      </div>
      <div class="item" :class="{active:sideActive==2}" @click="sideActive=2">
        <i class="el-icon-document"></i>
        <p>单页模板</p>
      </div>
      <div class="item" :class="{active:sideActive==3}" @click="sideActive=3">
        <i class="el-icon-menu"></i>
        <p>功能模板</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Iheader",

  data() {
    return {
      sideActive: 1
    };
  },
  methods: {}
};
</script>

<style scoped lang="scss">
.i-sidebar {
  .item {
    padding: 15px 0;
    cursor: pointer;
    transition: all 0.6s;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &:hover,
    &.active {
      color: #fff;
      background: #409eff;
    }
    i {
      font-size: 20px;
    }
    p {
      margin: 0;
      font-size: 14px;
      line-height: 1.5;
    }
  }
}
</style>