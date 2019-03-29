<template>
  <div class="vip-gold">
    <div class="vip-tips">本月总投注额{{tips.allbet}}元</div>
    <el-table :data="level" border :row-class-name="tableRowClassName" style="width: 100%">
      <el-table-column type="index" label="序号" width="180"></el-table-column>
      <el-table-column prop="levelName" label="游戏平台" width="180"></el-table-column>
      <el-table-column prop="upgradeprize" label="晋级礼金"></el-table-column>
      <el-table-column prop="upgradethreshold" label="晋级要求"></el-table-column>
    </el-table>
    <div style="margin:20px 0">
      <el-button class="submitbtn" @click="submit" :loading="loading" :disabled="!canUpgrade">检测升级</el-button>
    </div>
  </div>
</template>
<script>
import { checkUpgrade } from "@/api/preferential-terms";
import { vipGold } from "@/controls/discount/vipGold";
export default {
  mixins: [vipGold],
  data() {
    return {
      // disabled:false
      loading: false
    };
  },
  methods: {
    submit() {
      this.loading = true;
      this.checkUpgrade()
        .then(res => {
          window.toast(res.message),'warning';
          this.loading = false;
        })
        .catch(err => {
          window.toast(err.message);
          this.loading = false;
        });
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.level == this.userData.levelNumber) {
        return "active-row";
      }
      return "";
    }
  },
  components: {
    // vipStep
  },
  activated() {
    this.getVipInfo();
  },
  watch: {
    level(arr) {
      if (arr[0].level == 0) {
        arr.shift();
      }
    }
  }
};
</script>
<style lang="scss">
.submitbtn {
  background: #0181fa;
  background: -moz-linear-gradient(to right, #0181fa, #16d6ff);
  background: -webkit-linear-gradient(to right, #0181fa, #16d6ff);
  background: -o-linear-gradient(to right, #0181fa, #16d6ff);
  background: linear-gradient(to right, #0181fa, #16d6ff);
  border: 1px solid #0181fa;
  color: #fff;
}
.vip-gold {
  .vip-tips {
    color: #09affe;
    font-size: 30px;
    margin: 20px 0;
    line-height: 1.5;
  }
  .active-row {
    background: #c7e9fd !important;
  }
  .formbtn {
    margin-top: 24px;
  }
  .disablebtn {
    background-color: #ccc !important;
    cursor: not-allowed !important;
  }
}
</style>
