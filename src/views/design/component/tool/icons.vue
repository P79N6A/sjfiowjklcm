<template>
  <div class="icons">
    <el-tooltip class="item" effect="dark" :content="iconActive?'收起菜单':'展开菜单'" placement="left">
      <span class="item" @click="setMenuActive">
        <i class="el-icon-caret-right" v-if="iconActive"></i>
        <i class="el-icon-caret-left" v-else></i>
      </span>
    </el-tooltip>
    <!-- <el-tooltip class="item" effect="dark" content="撤销上一步操作" placement="left">
      <span class="item">
        <i class="el-icon-d-arrow-left"></i>
      </span>
    </el-tooltip>-->
    <el-tooltip class="item" effect="dark" content="操作记录" placement="left">
      <span class="item" @click="showHistory=!showHistory" :class="{active:showHistory}">
        <i class="el-icon-printer"></i>
      </span>
    </el-tooltip>
    <!-- <el-tooltip class="item" effect="dark" content="复制当前页" placement="left">
      <span class="item">
        <i class="el-icon-printer"></i>
      </span>
    </el-tooltip>-->
    <el-tooltip class="item" effect="dark" content="当前页样式" placement="left">
      <span class="item" @click="$bus.$emit('openPageSet')">
        <i class="el-icon-setting"></i>
      </span>
    </el-tooltip>
    <el-tooltip class="item warning" effect="dark" placement="left">
      <div slot="content">
        除了背影，超出虚线框部分的元素将不会展示
        <br>注:手机端最大宽度375px
      </div>
      <span class="item">
        <i class="el-icon-warning"></i>
      </span>
    </el-tooltip>
    <div class="history-list" v-show="showHistory">
      <h3>操作历史纪录</h3>
      <div class="items">
        <p
          v-for="(item,i) in history"
          :key="i"
          :class="[{active:i==historyIndex,disable:i>historyIndex}]"
          @click="$bus.$emit('selectHistory',i)"
        >{{item.title}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Icon",

  data() {
    return {
      iconActive: true,
      showHistory: false
    };
  },
  props: ["historyIndex", "history"],
  methods: {
    setMenuActive() {
      this.iconActive = !this.iconActive;
      this.$bus.$emit("setMenus");
    }
  }
};
</script>

<style scoped lang="scss">
.icons {
  background: #fff;
  border-left: solid 1px #eee;
  border-right: solid 1px #eee;
  height: 100%;
  position: relative;
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

    &:hover,
    &.active {
      background: #409eff;
      color: #fff;
    }
  }
  .history-list {
    position: absolute;
    width: 250px;
    background: #fff;
    left: -251px;
    top: 40px;
    z-index: 99999;
    h3 {
      text-align: center;
      margin: 0;
      background: #eee;
      padding: 8px 0;
      font-size: 16px;
    }
    .items {
      height: 400px;
      overflow-y: scroll;
      p {
        padding: 4px;
        background: #fff;
        margin: 0;
        border-bottom: solid 1px #ccc;
        &.active {
          color: blue;
        }
        &.disable {
          background: #aaa;
        }
      }
    }
  }
}
</style>
