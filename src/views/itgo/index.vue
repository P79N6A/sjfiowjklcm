<template>
  <div class="itgo-container">
    <header>
      <Iheader></Iheader>
    </header>
    <div class="contain">
      <!-- <div class="left">
        <Isidebar></Isidebar>
      </div>-->
      <div class="center">Main</div>
      <div class="right">
        <Itool></Itool>
      </div>
    </div>
  </div>
</template>

<script>
import Iheader from "./component/header";
import Itool from "./component/tool";
import Isidebar from "./component/sidebar";

export default {
  name: "ClipboardDemo",

  data() {
    return {};
  },
  methods: {},
  components: {
    // 基本菜单
    Iheader,
    Itool,
    Isidebar
  }
};
</script>

<style scoped lang="scss">
.itgo-container {
  background: #eee;
  header {
    border-bottom: solid 1px #ccc;
  }
  .contain {
    display: flex;
    justify-content: space-between;
  }
  .left {
    width: 70px;
    border-right: solid 1px #ccc;
  }
}
</style>