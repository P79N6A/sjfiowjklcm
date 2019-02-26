<template>
  <div class="i-header">
    <div class="logo">
      <img src="/favicon.ico">
    </div>
    <div class="control">
      <div class="item" @click="$bus.$emit('addTemp','text')">
        <i class="el-icon-edit"></i>
        <p>文本</p>
      </div>
      <div class="item" @click="$bus.$emit('addTemp','img')">
        <i class="el-icon-picture-outline"></i>
        <p>图片</p>
      </div>
      <div class="item" @click="$bus.$emit('openPageSet')">
        <i class="el-icon-rank"></i>
        <p>背景</p>
      </div>
      <div class="item" @click="$bus.$emit('addTemp','svg')">
        <i class="el-icon-news"></i>
        <p>形状</p>
      </div>
      <div class="item" @click="$bus.$emit('addTemp','vue')">
        <i class="el-icon-menu"></i>
        <p>组件</p>
      </div>
      <!-- <div class="item">
        <i class="el-icon-star-off"></i>
        <p>特效</p>
      </div>-->
    </div>
    <div class="btns">
      <el-button type="primary" @click="$bus.$emit('openSetting')">预览和设置</el-button>
      <el-button type="primary" @click="$bus.$emit('saveJson')">保存</el-button>
      <el-button type="danger" @click=" $router.push({name:'ishows'})">退出</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Iheader",

  data() {
    return {};
  },
  props: ["appJson"],
  methods: {}
};
</script>

<style scoped lang="scss">
.i-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fafafa;

  .logo {
    border-right: solid 1px #ccc;
    width: 70px;
    text-align: center;

    img {
      max-height: 50px;
    }
  }

  .control {
    display: flex;
    height: 50px;

    .item {
      padding: 0 15px;
      height: 100%;
      cursor: pointer;
      transition: all 0.3s;
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

  .btns {
    padding-right: 20px;
  }
}
</style>
