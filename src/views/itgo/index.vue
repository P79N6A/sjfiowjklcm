<template>
  <div class="itgo-container">
<el-container>
  <el-header style="height:auto;">
    <Iheader></Iheader>
  </el-header>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-main>Main</el-main>
    <el-aside width="272px">
      <Itool></Itool>
    </el-aside>
  </el-container>
</el-container>
  </div>
</template>

<script>
import Iheader from "./component/header"
import Itool from "./component/tool"

export default {
  name: 'ClipboardDemo',

  data() {
    return {
    }
  },
  methods: {

  },
  components: {
    Iheader,
    Itool
  },
}
</script>

<style scoped>
  .el-header{
    background-color: #fff;
    color: #333;
    text-align: center;
    border-bottom:solid 1px #ccc;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #343434;
    text-align: center;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
  }
  
  .el-container:nth-child(7) .el-aside {
  }
</style>