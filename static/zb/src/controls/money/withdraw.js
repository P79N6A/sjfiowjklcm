import md5 from 'MD5'
import {
  findUserBankList,
  withdraw_new
} from '@/api/payment'
import {
  mapGetters
} from 'vuex'

export const withdraw = {
  data() {
    return {
      bankList: [],
      bankText: '',
      showSetPay: true,
      canAddcard: false, // 判断是否能显示银行卡
      drawType: [ // 取款类型，只有代理账户才会用到
        {
          name: '老虎机',
          value: 'slotmachine'
        },
        {
          name: '其他',
          value: 'liveall'
        }
      ],
      sumitData: {
        amount: '',
        id: '',
        password: '',
        tkType: '' // false string 若是代理提款，必填输入代理提款类型，提款类型，slotmachine-老虎机，liveall-其他部分
      }
    }
  },
  watch: {

  },
  computed: {
    ...mapGetters(['userData', 'isSetPayPwd', 'isAgent', 'isUser'])
  },
  methods: {
    checkDraw(obj) {
      if (!this.isSetPayPwd) {
        return '请先设置支付密码'
      } else if (obj.id == '') {
        return '请选择取款银行卡!'
      } else if (obj.amount == '') {
        return '请输入取款金额!'
      } else if (obj.password == '') {
        return '请输入支付密码!'
      } else if (this.isAgent) {
        // 代理提款的判断
        if (obj.tkType == '') {
          return '代理账户请选择提款类型'
        }
        if (obj.tkType == 'slotmachine' && (obj.amount > this.userData.slotAccount * 1 || this.userData.slotAccount < 0)) {
          return '老虎机佣金余额不足'
        } else if (obj.tkType == 'liveall' && (this.userData.liveAccount > 0 && obj.amount > this.userData.liveAccount * 1 || this.userData.liveAccount < 0)) {
          return '其他佣金余额不足'
        } else {
          return false
        }
      } else {
        return false
      }
    },
    // 提款提交
    drawSubmit(obj) {
      return new Promise((resolve, reject) => {
        const unChecked = this.checkDraw(obj)
        if (unChecked) {
          return reject({
            success: false,
            message: unChecked
          })
        }
        // 密码2次MD5加密
        this.sumitData.password = md5(md5(this.sumitData.password))
        withdraw_new(this.sumitData).then(res => {
          if (res.success) {
            this.$store.dispatch('UPDATE_USERDATA')
            // 清除提款密码
            this.sumitData.password = ''
            return resolve(res)
          } else {
            return reject(res)
          }
        }).catch((err) => {
          console.log(err)
          // 清除提款密码
          this.sumitData.password = ''
          return reject(err)
        })
      })
    },
    getBankList() {
      return new Promise((resolve, reject) => {
        findUserBankList().then((res) => {
          if (res.success) {
            this.bankList = res.data
          } else {
            return reject(res)
          }
        }).catch((err) => {
          console.log(err)
          return reject(err)
        })
      })
    }
  }
}
