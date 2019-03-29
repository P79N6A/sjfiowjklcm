<template>
  <div class="u-c-shows">
    <div class="transfer-info">
      <el-form :model="data" ref="transferForm" label-width="140px" class="draw-form">
        <div class="mainBox">
          <!-- 转出账户 -->
          <div class="transferOutBox">
            <div class="head">来源账户</div>
            <div class="body">
              <div
                class="item"
                v-for="item in Money"
                :key="item.value"
                :class="{active:data.transferGameOut == item.value}"
                @click="data.transferGameOut = item.value"
              >
                <p class="name">
                  {{item.name}}
                  <i :class="{xuanzhuan:isxuanzhuan}" class="icon xjzico-shuaxin"></i>
                </p>
                <p
                  class="money"
                  v-if="wallet[item.value] || wallet[item.value]==0"
                >{{wallet[item.value]}}元</p>
                <p class="money" v-else-if="data.transferGameOut ==item.value">正在刷新...</p>
                <p class="money" v-else>点击查询</p>
              </div>
            </div>
          </div>

          <!-- 箭头 -->
          <div class="arrowItem">
            <i class="iconOkbet iconOkbet-youjiantouxiangyouqianwangmianxing"></i>
          </div>

          <!-- 转入账户 -->
          <div class="transferInBox">
            <div class="head">目标账户</div>
            <div class="body">
              <div
                class="item"
                v-for="item in Money1"
                :class="{active:data.transferGameIn == item.value}"
                :key="item.value"
                @click="data.transferGameIn = item.value"
              >
                <p class="name">
                  {{item.name}}
                  <i :class="{xuanzhuan:isxuanzhuan}" class="icon xjzico-shuaxin"></i>
                </p>
                <p
                  class="money"
                  v-if="wallet[item.value] || wallet[item.value]==0"
                >{{wallet[item.value]}}元</p>
                <p class="money" v-else-if="data.transferGameIn ==item.value">正在刷新...</p>
                <p class="money" v-else>点击查询</p>
              </div>
            </div>
          </div>
        </div>
        <!-- <el-row>
            <el-col :span="8">
              <el-form-item label="转出账户：" prod="transferGameOut">
                <el-select v-model="data.transferGameOut" placeholder="请选择需要转出的账户">
                  <el-option :label="item.name" v-for="item  in Money" :value="item.value" :key="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8"><span class="tips" v-show="wallet[data.transferGameOut]">{{wallet[data.transferGameOut]}}元</span></el-col>
        </el-row>-->
        <!-- </div> -->
        <!-- 转入的账户 -->
        <!-- <el-row>
            <el-col :span="8">
              <el-form-item label="转入账户：" prod="transferGameIn">
                <el-select v-model="data.transferGameIn" placeholder="请选择需要转入的账户">
                  <el-option :label="item.name" v-for="item  in Money" :value="item.value" :key="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8"><span class="tips" v-show="wallet[data.transferGameIn]">{{wallet[data.transferGameIn]}}元</span></el-col>
        </el-row>-->
        <!-- 转账金额 -->
        <el-form-item label="转账金额：" prop="transferGameMoney">
          <el-input v-model.number="data.transferGameMoney" type="number" placeholder="请输入转账金额"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button class="submitbtn" @click="submitForm('transferForm')">提交</el-button>
          <!-- <el-button @click="resetForm('transferForm')">重置</el-button> -->
          <el-button @click="transferAll()">一键资金归集</el-button>
        </el-form-item>
      </el-form>
      <tips></tips>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { Money } from "@/assets/data";
import { transfer } from "@/controls/money/transfer";
import tips from "./components/tips";
import { updateGameMoney } from "@/api/payment";
export default {
  mixins: [transfer],
  data() {
    return {
      Money,
      Money1: [],
      isxuanzhuan: false,
      showDeputy: true
    };
  },

  computed: {
    ...mapGetters(["userData", "wallet"])
  },
  methods: {
    submitForm(formName) {
      this.drawSuccess = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.transferSubmit(this.data)
            .then(res => {
              window.toast(res.message,'warning');
              // this.resetForm('transferForm')
              this.data.transferGameOut = "";
              this.data.transferGameIn = "";
              this.data.transferGameMoney = "";
            })
            .catch(err => {
              window.toast(err.message);
            });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      // this.$refs[formName].resetFields();
      this.data.transferGameOut = "";
      this.data.transferGameIn = "";
      this.data.transferGameMoney = "";
    },
    transferAll() {
      window
        .$confirm(
          '<p style="text-align:left;">1.游戏平台余额只会回收整数部分。<br/>2.领取优惠但未完成流水的游戏余额不会被归集。<br/>3.资金归集可能需要较长时间，请耐心等待。</p>',
          "温馨提示",
          {
            confirmText: "确认",
            cancelText: "取消"
          }
        )
        .then(
          () => {
            // 确认，发出归集请求
            window.setTimeout(() => {
              const postData = {
                transferGameOut: "ALL_V2",
                transferGameIn: "MAIN",
                transferGameMoney: 0
              };
              // 查看进度按钮
              updateGameMoney(postData)
                .then(res => {
                  if (res.success) {
                    this.$bus.$emit("showTransferProce", true);
                    window.toast(res.message,'success');
                  } else {
                    window.toast(res.message,'warning');
                  }
                })
                .catch(err => {
                  window.toast(err.message);
                });
            }, 300);
          },
          () => {
            // 取消，查看订单
          }
        );
    }
  },
  components: {
    tips
  },
  created() {
    this.data.transferGameOut = "MAIN";
    if (this.Money.length > 0 && this.Money[1].value == "DEPUTY") {
      let arr = new Array();
      arr = this.Money.concat();
      arr.splice(1, 1);
      this.Money1 = arr;
    }
  }
};
</script>
<style lang="scss" scoped>
.transfer-info {
  background-color: rgba(0, 0, 0, 0.7);
  .el-alert--info {
    background-color: #121013;
    color: #f6d48d;
    .colMoney {
      color: #ffcf32;
    }
  }
  .el-input {
    width: 250px;
  }
  .transact_top {
    height: 70px;
    line-height: 35px;
    width: 1000px;
    text-align: center;
    font-size: 24px;
  }

  .draw-form {
    // margin-top: 30px;
    .mainBox {
      width: 900px;
      display: flex;
      text-align: center;
      margin: 0 auto 20px;
      .transferOutBox {
        flex: 3;
        border-radius: 5px;
        border: 1px solid #409eff;
        .head {
          background: #409eff;
          color: #fff;
          text-align: center;
          line-height: 1.7;
          width: 100%;
          padding: 8px 0;
        }
        .body {
          width: 100%;
          padding: 15px 10px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          .item {
            border: 1px solid #ddd;
            width: 30%;
            color: #fff;
            line-height: 1.7;
            margin-bottom: 10px;
            cursor: pointer;
            .name {
              font-size: 16px;
              text-align: center;
              margin-bottom: 3px;
            }
            .money {
              font-size: 14px;
              text-align: center;
            }
            &.active {
              background: #409eff;
              border: 1px solid #409eff;
              color: #fff;
              .xuanzhuan {
                &.icon:before {
                  // color: #bda059;
                  -webkit-animation: rotateImg 1s linear infinite;
                  animation: rotateImg 1s linear infinite;
                  display: inline-block;
                }
              }
            }
          }
        }
      }
      .arrowItem {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        .iconOkbet {
          color: #409eff;
          font-size: 36px;
        }
      }
      .transferInBox {
        flex: 3;
        border-radius: 5px;
        border: 1px solid #409eff;
        .head {
          background: #409eff;
          color: #fff;
          text-align: center;
          line-height: 1.7;
          width: 100%;
          padding: 8px 0;
        }
        .body {
          width: 100%;
          padding: 15px 10px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          .item {
            border: 1px solid #ddd;
            width: 30%;
            color: #fff;
            line-height: 1.7;
            margin-bottom: 10px;
            cursor: pointer;
            .name {
              font-size: 16px;
              text-align: center;
              margin-bottom: 3px;
            }
            .money {
              font-size: 14px;
              text-align: center;
            }
            &.active {
              background: #409eff;
              border: 1px solid #409eff;
              color: #fff;
              .xuanzhuan {
                &.icon:before {
                  // color: #bda059;
                  -webkit-animation: rotateImg 1s linear infinite;
                  animation: rotateImg 1s linear infinite;
                  display: inline-block;
                }
              }
            }
          }
        }
      }
    }

    .gameOutZone {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      padding: 0 0 20px 20px;
      .gameOut {
        cursor: pointer;
        width: 170px;
        padding: 20px 10px;
        background: rgba(64, 59, 58, 0.55);
        position: relative;
        margin: 5px 25px 5px 0;
        text-align: center;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        border: 1px solid transparent;
        .gameOutName {
          color: #fff;
          flex: 1;
          text-align: left;
          font-size: 15px;
        }
        .gameOutMoney {
          color: #e2b85a;
          font-size: 15px;
        }
        .iconOkbet {
          color: #e2b85a;
        }
        .checked {
          display: none;
          border-width: 10px;
          border-color: transparent #e2b85a #e2b85a transparent;
          border-style: solid;
          width: 0;
          height: 0;
          position: absolute;
          right: 0;
          bottom: 0;
          .gouzi {
            color: #fff;
          }
        }
        &.active {
          border: 1px solid #e2b85a;
          .checked {
            display: block;
          }
          .xuanzhuan {
            &.yg-f14:before {
              -webkit-animation: rotateImg 1s linear infinite;
              animation: rotateImg 1s linear infinite;
              display: inline-block;
            }
          }
        }
      }
    }
    .gameInZone {
      width: 100%;
      padding-left: 20px;
    }
    .tips {
      font-size: 16px;
      line-height: 33px;
      padding-left: 5px;
      color: #fff;
    }
  }

  .transfer-info {
    .tips {
      position: absolute;
      left: 105%;
      top: 0;
      word-break: keep-all;
    }
  }
  .submitbtn {
    background: #409eff;
    background: -moz-linear-gradient(to right, #409eff, #62afff);
    background: -webkit-linear-gradient(to right, #409eff, #62afff);
    background: -o-linear-gradient(to right, #409eff, #62afff);
    background: linear-gradient(to right, #409eff, #62afff);
    border: 1px solid #409eff;
    color: #fff;
  }
}
@keyframes rotateImg {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes rotateImg {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
</style>
