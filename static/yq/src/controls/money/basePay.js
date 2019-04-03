import {
  mobilePayByEbank,
  onlinePayDispathcer
} from '@/api/payment'
import check from '@/util/RegExp'

export const basePay = {
  data() {
    return {
      bankCodeData: [], // 部分网银支付需要银行卡，考虑是否单独出网银支付方式
      submitData: {
        id: '',
        order_amount: '',
        bankCode: ''
      }
    }
  },
  watch: {

  },
  methods: {
    /**
     *
     * @param {object} obj // 提交的表单
     * @param {object} payInfo // 当前支付方式
     */
    checkDeposit(obj, payInfo) {
      console.log(payInfo);
      if (!obj.id) {
        return '请选择存款方式'
      } else if (this.bankCodeData.length > 0 && !obj.bankCode) {
        return '请选择支付银行'
      } else if (!obj.order_amount) {
        return '请输入存款金额'
      } else if (payInfo.lowerlimit && obj.order_amount < payInfo.lowerlimit) {
        return '最低存款' + payInfo.lowerlimit + '元'
      } else if (payInfo.upperlimit && obj.order_amount > payInfo.upperlimit) {
        return '最高存款' + payInfo.upperlimit + '元'
      } else if (payInfo.customParams && payInfo.customParams.enterMode === 'USER_DECIMAL') {
        if (check.initNum.test(obj.order_amount)) {
          if (payInfo.customParams.depositLimitOfDay) {
            return `存款金额请输入带有两位小数点的数字，如${(Math.random() * 100).toFixed(2)}元。<br>每日存款次数限制为：${payInfo.customParams.depositLimitOfDay}次`
          } else {
            return `存款金额请输入带有两位小数点的数字，如${(Math.random() * 100).toFixed(2)}元。`
          }
        }
      } else {
        return false
      }
    },
    getBankList(payInfo) {
      return new Promise((resolve, reject) => {
        this.submitData.bankCode = '' // 重置当前选中的银行卡
        // 变化后去请求获取银行卡
        if (payInfo.type == 'ebank') {
          mobilePayByEbank({
            paymentId: payInfo.id
          }).then((res) => {
            if (res.success) {
              if (Array.isArray(res.data) && res.data[0] != null) {
                this.bankCodeData = res.data
              } else {
                this.bankCodeData = []
              }
              return resolve(res)
            } else {
              return reject(res)
            }
          }).catch(err => {
            return reject(err)
          })
        } else {
          this.bankCodeData = []
        }
      })
    },
    depositPostSubmit(obj, payInfo) {
      return new Promise((resolve, reject) => {
        // 先检查
        console.log('before')
        const unChecked = this.checkDeposit(obj, payInfo)
        if (unChecked) {
          return reject({
            success: false,
            message: unChecked
          })
        }
        onlinePayDispathcer(obj)
        return resolve({
          success: true,
          message: '请在新打开的页面完成支付'
        })
      })
    }
  }
}
