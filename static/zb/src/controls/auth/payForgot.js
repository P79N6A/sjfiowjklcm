/**
 * 找回支付密码逻辑
 * 1、找回支付密码，PHONE/EMAIL
 */
import {
  getWithdrawPW
} from '@/api/user'
import check from '@/util/RegExp'
import { mapMutations } from 'vuex'

export const payForgot = {
  data() {
    return {
      authImg: '', // 验证码地址
      phone: {
        phone: '', // 手机
        email: '', // email
        code: '', // 验证码
        pipe: '' // 找回方式：PHONE/EMAIL
      }
    }
  },
  methods: {
    ...mapMutations(['GET_VALIDATE']),
    /**
     * 通过手机找回，表单验证规则
    */
    checkSms(obj) {
      if (!check.phone.test(obj.phone)) {
        return '请输入正确的手机号码'
      } else if (!obj.code) {
        return '请输入验证码'
      } else {
        return false
      }
    },
    /**
     * 通过邮件找回，表单验证规则
    */
    checkEmail(obj) {
      if (!check.email.test(obj.email)) {
        return '请输入正确的邮箱地址'
      } else if (!obj.code) {
        return '请输入验证码'
      } else {
        return false
      }
    },
    /**
     * 通过邮件找回
     * obj{
     * pipe:"PHONE"
     * phone:""
     * code:""
     * }
    */
    findBySms(obj) {
      return new Promise((resolve, reject) => {
        // 对传入的表单数据验证一次
        const unChecked = this.checkSms(obj)
        if (unChecked) {
          return reject({
            success: false,
            message: unChecked
          })
        }
        // 提交表单
        getWithdrawPW(obj).then(res => {
          if (res.success) {
            return resolve(res)
          } else {
            // 找回失败，刷新一次验证码
            this.GET_VALIDATE()
            return reject(res)
          }
        }).catch(err => {
          console.log(err)
          return reject(err)
        })
      })
    },
    /**
     * 通过邮件找回
     * obj{
     * pipe:"EMAIL"
     * email:""
     * code:""
     * }
    */
    findByEmail(obj) {
      return new Promise((resolve, reject) => {
        // 对传入的表单数据验证一次
        const unChecked = this.checkEmail(obj)
        if (unChecked) {
          return reject({
            success: false,
            message: unChecked
          })
        }
        // 提交表单
        getWithdrawPW(obj).then(res => {
          if (res.success) {
            return resolve(res)
          } else {
            // 找回失败，刷新一次验证码
            this.GET_VALIDATE()
            return reject(res)
          }
        }).catch(err => {
          console.log(err)
          return reject(err)
        })
      })
    }
  }
}
