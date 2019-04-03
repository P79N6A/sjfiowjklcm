<template>
  <div class="vip-gold">
    <!-- <div class="vip-tips">总投注额{{tips.allbet}}元</div> -->
    <el-table :data="betArr" border style="width: 100%">
      <el-table-column type="index" label="序号" width="180px"></el-table-column>
      <el-table-column prop="platform" label="游戏平台"></el-table-column>
      <el-table-column prop="bet" label="投注额"></el-table-column>
    </el-table>
    <div style="margin:20px 0">
      <router-link :to="{name:'vipIndex'}" target="_blank" class="submitbtn">查看晋级标准</router-link>
      <el-button type="primary" @click="submit" :loading="loading" :disabled="!canUpgrade">检测升级</el-button>
    </div>
    <div class="user-tip">
      <p>温馨提示：</p>
      <p>
        1.会员自助/系统晋级成功，晋级礼金将派发到
        <span style="color:#ea5048;">【副账户】</span>。
      </p>
      <p>
        2.晋级礼金仅需完成
        <span style="color:#ea5048;">10倍流水</span>方可提款。
      </p>
      <p>
        3.每个月
        <span style="color:#ea5048;">5号</span>之前系统
        <span style="color:#ea5048;">自动审核</span>进行升级，系统以晋级条件中的A进行升级。
      </p>
    </div>
  </div>
</template>
<script>
import { checkUpgrade } from "@/api/preferential-terms";
import { vipGold } from "@/controls/discount/vipGold";
import { SETTING } from "@/assets/data";
export default {
  mixins: [vipGold],
  data() {
    return {
      // disabled:false
      SETTING,
      loading: false
    };
  },
  methods: {
    submit() {
      this.loading = true;
      this.checkUpgrade()
        .then(res => {
          window.toast(res.message);
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
<style lang="scss" scoped>
  .submitbtn{
    font-weight: 500;
    margin: 0;
    outline: 0;
    box-sizing: border-box;
    text-align: center;
    -webkit-appearance: none;
    border: 1px solid #dcdfe6;
    cursor: pointer;
    white-space: nowrap;
    line-height: 1;
    display: inline-block;
    background: #e6a23c;
    border-color: #e6a23c;
    padding: 10px 20px;
    font-size: 14px;
    border-radius: 4px;
    color: #fff;
    &:focus,&:hover{
      background: #ebb563;
      border-color: #ebb563;
      color: #fff;
    }
  }
</style>
