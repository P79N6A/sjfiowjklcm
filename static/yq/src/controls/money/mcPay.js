import {
  createDepositeOrder,
  getWxZzQuota
} from '@/api/payment'
import check from '@/util/RegExp'

export const mcPay = {
  data() {
    return {
      submitData: {
        // 提交的数据
        accountName: '',
        payBy: '',
        amount: '',
        discard: false
      },
      help_time: {
        // 微信秒存时间
        Interval: null,
        init: 0, // 分钟整数，接口获取
        min: 0, // 显示的分钟
        sec: '00' // 显示的秒
      },
      agree_1: false,
      orderData: {}
    }
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
      } else {
        return false
      }
    },
    depositPostSubmit(obj, payInfo) {
      return new Promise((resolve, reject) => {
        // 先检查
        const unChecked = this.checkDeposit(obj, payInfo)
        if (unChecked) {
          return reject({
            success: false,
            message: unChecked
          })
        }
        // 是否是微信秒存
        if (this.submitData.payBy == 'wechat') {
          this.getWxZzQuota()
        } else {
          this.mcSubmit(this.submitData)
        }
      })
    },
    // 提交订单
    mcSubmit(data, discard) {
      if (discard) {
        data.discard = true
      } else {
        data.discard = false
      }
      createDepositeOrder(data).then((res) => {
        if (res.success) {
          return resolve(res)
          // if ('UNPAID_ORDER' == type) {
          //   // 到第二步
          //   this.showExist()
          // } else if ('NEW_ORDER' == type) {
          //   // 到第三步
          //   this.active = 2;
          // } else if ('BANKCARD_NOTAVAILABLE' == type) {
          //   $alert('通道维护中，请选择其他存款方式');
          // }
        } else {
          return reject(res)
        }
      }).catch(err => {
        return reject(err)
      })
    }
  }
}
