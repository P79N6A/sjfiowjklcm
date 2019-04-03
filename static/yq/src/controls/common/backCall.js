/**
 * 电话回拨逻辑，
 * 1、电话回拨表单提交，需要登录状态（有待商榷）
 */
import {
  makeCall
} from '@/api/show'
import check from '@/util/RegExp'
export const backCall = {
  data() {
    return {
      backCallData: { phone: '' } // 需要回拨的号码
    }
  },
  methods: {
    checkPhone(obj) {
      if (!obj.phone || !check.phone.test(obj.phone)) {
        return '请输入正确的手机号码'
      } else {
        return false
      }
    },
    backCall(obj) {
      return new Promise((resolve, reject) => {
        // 先验证表单
        const unChecked = this.checkPhone(obj)
        if (unChecked) {
          return reject({
            success: false,
            message: unChecked
          })
        }
        // 提交表单
        makeCall(obj).then(res => {
          if (res.success) {
            return resolve(res)
          } else {
            return reject(res)
          }
        }).catch(err => {
          return reject(err)
        })
      })
    }
  }
}
