<template>
  <el-dialog :visible.sync="dialogFormVisible" title="组件设置" :fullscreen="true">
    <div class="view">
      <div class="preview">
        <el-scrollbar>saldkfjaslkfj
          <br>asdfklsadjf
          <br>asdfklsadjf
          <br>asdfklsadjf
          <br>asdfklsadjf
          <br>asdfklsadjf
          <br>asdfklsadjf
          <br>asdfklsadjf
          <br>asdfklsadjf
          <br>asdfklsadjf
        </el-scrollbar>
      </div>
      <div class="form">
        <el-form ref="dataForm" label-position="right" label-width="120px" :model="Setting">
          <el-form-item label="*组件名称">
            <el-input v-model="Setting. name" placeholder="组件名"/>
          </el-form-item>
          <el-form-item label="*组件描述">
            <el-input v-model="Setting.description" type="textarea" placeholder="组件描述"/>
          </el-form-item>
          <el-form-item label="自动切换">
            <el-switch
              v-model="Setting.autoAnimation"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="是"
              inactive-text="否"
            ></el-switch>
          </el-form-item>
          <el-form-item label="循环播放">
            <el-switch
              v-model="Setting.infinite"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="是"
              inactive-text="否"
            ></el-switch>
          </el-form-item>
          <el-form-item label="循环间隔(秒)" v-if="Setting.infinite">
            <el-input-number
              v-model="Setting.interval"
              :precision="1"
              :step="0.1"
              :min="0"
              :max="100"
            ></el-input-number>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "Setting",

  data() {
    return {
      dialogFormVisible: false,
      value: "",
      Setting: {
        name: "",
        description: "",
        autoAnimation: "",
        infinite: false,
        interval: 0
      }
    };
  },
  created() {
    this.$bus.$on("openSetting", eventData => {
      this.dialogFormVisible = true;
    });
  },
  props: ["appJson"]
};
</script>
<style lang="scss">
.view {
  display: flex;
  justify-content: space-between;
  height: calc(100vh - 114px);
  .preview {
    background: rgba(0, 0, 0, 0.4);
    flex: 1;
    .el-scrollbar {
      height: 100%;
      width: 100%;
      justify-content: center;
      align-items: center;
    }
    .el-scrollbar__view {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
  }
  .form {
    width: 300px;
    height: 100%;
    border-left: solid 1px #ccc;
  }
}
</style>
