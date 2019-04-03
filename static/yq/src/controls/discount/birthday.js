/**
 * 生日理解相关逻辑
 * 1、查询是否可以领取生日理解
 * 2、领取生日礼金
 */
import {
  canClaimBirthdayCoupon,
  claimBirthdayCoupon
} from '@/api/preferential-terms'

export const birthday = {
  data() {
    return {
      message: '领取礼金',
      isBirthday: false
    }
  },
  watch: {

  },
  methods: {
    // 领取生日礼金
    birthSubmit(obj) {
      return new Promise((resolve, reject) => {
        claimBirthdayCoupon().then(res => {
          if (res.success) {
            // 重新刷新一下当前是否可领取的状态
            this.checkBirthCoupon()
            return resolve(res)
          } else {
            return reject(res)
          }
        })
      })
    },
    // 获取当前生日礼金可领取状态
    checkBirthCoupon() {
      return new Promise((resolve, reject) => {
        canClaimBirthdayCoupon().then(res => {
          // 根据接口判断，是否可以领取生日礼金
          this.isBirthday = res.success
          // 保存接口的提示
          this.message = res.message
          if (res.success) {
            return resolve(res)
          } else {
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
