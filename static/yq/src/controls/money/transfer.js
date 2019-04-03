import { mapGetters, mapActions } from "vuex";
import { updateGameMoney } from "@/api/payment";
import { getGameMoney } from "@/api/user";

export const transfer = {
  data() {
    return {
      money: { gameOut: "", gameIn: "" },
      data: { transferGameOut: "", transferGameMoney: "", transferGameIn: "" },
      loading: {}
    }; // 转出账户余额 // 转入账户余额 // 转出账号 // 转账金额 // 转入
  },
  watch: {
    "data.transferGameMoney"(val) {
      if (/[^\d]/g.test(val)) {
        this.data.transferGameMoney = this.data.transferGameMoney
          .toString()
          .replace(/[^\d]/g, "");
      }
    },
    "data.transferGameOut"(val) {
      this.isxuanzhuan = true;
      if (val) {
        this.loading[val] = true;
        this.UPDATE_MONEY(val).then(res => {
          this.isxuanzhuan = false;
          this.loading[val] = false;
        });
      }
    },
    "data.transferGameIn"(val) {
      this.isxuanzhuan = true;
      if (val) {
        this.loading[val] = true;
        this.UPDATE_MONEY(val).then(res => {
          this.isxuanzhuan = false;
          this.loading[val] = false;
        });
      }
    }
  },
  computed: {
    ...mapGetters(["userData"])
  },
  methods: {
    ...mapActions(["UPDATE_MONEY"]),
    checkTransfer(obj) {
      if (obj.transferGameMoney == "") {
        return "请输入转账金额";
      }
      if (this.data.transferGameIn == "") {
        return "请选择转入平台";
      }
      if (this.data.transferGameOut == "") {
        return "请选择转出平台";
      } else {
        return false;
      }
    },

    transferSubmit(obj) {
      return new Promise((resolve, reject) => {
        const unChecked = this.checkTransfer(obj);
        if (unChecked) {
          return reject({
            success: false,
            message: unChecked
          });
        }
        updateGameMoney(obj)
          .then(res => {
            if (res.success) {
              this.UPDATE_MONEY(this.data.transferGameOut);
              this.UPDATE_MONEY(this.data.transferGameIn);
              return resolve(res);
            } else {
              return reject(res);
            }
          })
          .catch(err => {
            return reject(err);
          });
      });
    },
    getGameMoney(val, key) {
      this.money[key] = `正在查询...`;
      getGameMoney({
        gameCode: val
      })
        .then(res => {
          if (res.success) {
            this.money[key] = `${res.data}元`;
          } else {
            this.money[key] = `查询失败...`;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
