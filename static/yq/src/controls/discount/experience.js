/**
 *  提议金相关逻辑
 * 1、是否可以领取体验及
 * 2、领取体验及
 */
import {
  commitPT8Self,
  canGetPt8CouponCheck
} from '@/api/preferential-terms'
import {
  mapGetters
} from 'vuex'

export const experience = {
  data() {
    return {
      // 是否可领取
      canExp: false, // 是否有资格
      limitAmount: 0, // 提款要求
      amount: '0', // 体验可用金额度
      msg: '', // 提示语
      // 使用体验金时，需要提交的表单
      expData: {
        platform: '' // 体验金使用平台
      }
    }
  },
  computed: {
    ...mapGetters(['userData'])
  },
  methods: {
    checkExpGold(obj) {
      if (!this.userData.accountName) {
        return '请先完善个人资料'
      } else if (this.userData.phoneValidStatus == '0') { // 存在数据库是‘0’，后期要调整成BOOLEAN
        return '请先验证注册手机号'
      } else if (!obj.platform) {
        return '请选择转入平台'
      } else {
        return false
      }
    },
    // 使用体验金
    CouponSubmit(obj) {
      // 验证表单
      return new Promise((resolve, reject) => {
        const unChecked = this.checkExpGold(obj)
        if (unChecked) {
          return reject({
            success: false,
            message: unChecked
          })
        }
        // 提交表单
        commitPT8Self(obj).then(res => {
          if (res.success) {
            this.checkCoupon()
            return resolve(res)
          } else {
            return reject(res)
          }
        }).catch(err => {
          console.log(err)
          return reject(err)
        })
      })
    },
    // 获取体验金是否可领取状态
    checkCoupon() {
      return new Promise((resolve, reject) => {
        canGetPt8CouponCheck().then(res => {
          this.canExp = res.success
          this.msg = res.message
          if (res.success) {
            // 保存体验金额度
            this.amount = res.data.amount
            // 保存体验金领取要求
            this.limitAmount = res.data.limitAmount
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
