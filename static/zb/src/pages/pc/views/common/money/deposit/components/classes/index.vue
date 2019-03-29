<template>
  <div>
    <el-row class="dep_type">
      <el-col :span="2">
        <span class="dep_title">存款渠道：</span>
      </el-col>
      <el-col :span="22">
        <el-radio
          v-model="value"
          v-for="(item,key,i) in classes"
          :key="i"
          :label="item.id"
          @change="selectPayInfo(item)"
          border
          v-if="item.id!='zfb'&&item.id!='new_zfb'"
          class="test"
          size="medium"
        >
          {{item.remark}}
          <span class="rate4deputy" v-if="item.rate4deputy>0">加送{{item.rate4deputy}}%</span>
        </el-radio>
        <el-radio
          v-model="value"
          border
          label="zfbchecked"
          class="test"
          @change="selectZfb"
          v-if="hasZfb"
          size="medium"
        >
          <span class="rate4deputy" v-if="classes[0].rate4deputy">加送{{classes[0].rate4deputy}}%</span>
          支付宝转账
        </el-radio>
        <span class="dep_type_tips" v-show="!classes">请先选择支付方式</span>
      </el-col>
    </el-row>
    <el-row class="dep_type" v-if="showZfb">
      <el-col :span="2">
        <span class="dep_title">存款通道：</span>
      </el-col>
      <el-col :span="22">
        <el-radio
          v-model="value1"
          v-for="(item,key,i) in classes"
          :key="i"
          :label="item.id"
          @change="selectPayInfo(item)"
          border
          v-if="(item.id=='zfb')||(item.id=='new_zfb')"
          class="test"
          size="medium"
        >
          <span class="rate4deputy" v-if="item.rate4deputy>0">加送{{item.rate4deputy}}%</span>
          {{item.remark}}
        </el-radio>
        <span class="dep_type_tips" v-show="!classes">请先选择支付方式</span>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getPaymentConfigInfo } from "@/api/payment";
import { payTypes, mcTypech } from "@/assets/data/deposit";
export default {
  data() {
    return {
      infoSelect: null,
      value: "",
      value1: "",
      showZfb: false,
      hasZfb: false
    };
  },
  methods: {
    // 选择其他支付方式
    selectPayInfo(info) {
      // this.infoSelect=info;
      if (info.id == "zfb" || info.id == "new_zfb") {
        this.showZfb = true;
      } else {
        this.showZfb = false;
      }
      console.log(info);
      this.$emit("selectPayInfo", info);
    },
    // 选择支付宝
    selectZfb() {
      this.classes.some(item => {
        if (item.id == "zfb" || item.id == "new_zfb") {
          // 选中该支付方式
          this.selectPayInfo(item);
          this.value1 = item.id;
        }
        return item.id == "zfb" || item.id == "new_zfb";
      });
    }
  },
  watch: {
    classes(val) {
      this.infoSelect = {};
      // 先检查是否有支付宝
      this.hasZfb = val.some(item => {
        return item.id == "zfb" || item.id == "new_zfb";
      });
      // if(this.hasZfb){
      //   this.selectZfb()
      //   this.value = 'zfbchecked';
      // }else{
      //   this.selectPayInfo(val[0])
      //   this.value = val[0].id;
      // }
      this.selectPayInfo(val[0]);
      this.value = val[0].id;
    },
    value(val) {
      let item = {};
      for (let i = 0; i < this.classes.length; i++) {
        if (this.classes[i].id == val) {
          item = this.classes[i];
        }
        if ((item.length = 0)) {
          this.value1 = "";
        }
      }
      if (item.customParams) {
        // 风控 要加小数点
        if (item.customParams.enterMode === "USER_DECIMAL") {
          let msg = "";
          if (item.customParams.depositLimitOfDay) {
            msg = `存款金额请输入带有两位小数点的数字，如${(
              Math.random() * 100
            ).toFixed(2)}元。<br>每日存款次数限制为：${
              item.customParams.depositLimitOfDay
            }次`;
          } else {
            msg = `存款金额请输入带有两位小数点的数字，如${(
              Math.random() * 100
            ).toFixed(2)}元。`;
          }
          // 风控 要加小数点
          $alert({
            dangerouslyUseHTMLString: true,
            message: msg
          });
        }
      }
      this.infoSelect = item;
      // this.$emit('selectPayInfo',item)
    },
    value1(val) {
      let item1 = {};
      for (let i = 0; i < this.classes.length; i++) {
        if (this.classes[i].id == val) {
          item1 = this.classes[i];
        }
      }
      if (item1.customParams) {
        // 风控 要加小数点
        if (item1.customParams.enterMode === "USER_DECIMAL") {
          let msg = "";
          if (item1.customParams.depositLimitOfDay) {
            msg = `存款金额请输入带有两位小数点的数字，如${(
              Math.random() * 100
            ).toFixed(2)}元。<br>每日存款次数限制为：${
              item1.customParams.depositLimitOfDay
            }次`;
          } else {
            msg = `存款金额请输入带有两位小数点的数字，如${(
              Math.random() * 100
            ).toFixed(2)}元。`;
          }
          // 风控 要加小数点
          $alert({
            dangerouslyUseHTMLString: true,
            message: msg
          });
        }
      }
      this.infoSelect = item1;
      // this.$emit('selectPayInfo',item1)
    }
  },
  props: {
    classes: {
      type: Array
    }
  },
  created() {}
};
</script>
<style lang="scss" scoped>
.dep_type {
  margin-top: 20px;
  font-size: 14px;
  line-height: 30px;
  .test {
    margin: 5px 0 5px 27px;
    &:first-child {
      margin: 5px 0 5px 11px;
    }
  }
  .rate4deputy {
    position: absolute;
    top: -10px;
    right: -35px;
    font-size: 12px;
    border: solid 1px #0181fa;
    background: #0181fa;
    color: #fff;
    padding: 2px 3px;
    line-height: 1;
    border-radius: 5px;
    z-index: 2;
  }
  .dep_title {
    color: #fff;
  }
  .dep_type_tips {
    color: #fff;
  }
  .dep_item {
    display: inline-block;
    border: solid 2px #efefef;
    border-radius: 5px;
    background: #f8f8f8;
    min-width: 100px;
    text-align: center;
    height: 40px;
    line-height: 40px;
    margin: 0 10px 4px 0;
    padding: 0 10px;
    margin-bottom: 20px;
    cursor: pointer;
    position: relative;
    &:hover,
    &.active {
      border: solid 2px #8bd5ff;
    }
    .dep_selected {
      line-height: 1;
      position: absolute;
      color: #39b6fe;
      top: -6px;
      right: -8px;
      font-size: 16px;
    }
  }
}
</style>
