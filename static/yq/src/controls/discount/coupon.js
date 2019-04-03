/**
 * 存送优惠券相关逻辑
 * 1、使用存送优惠券
 */
import { transferInforCoupon,enablePlatform } from '@/api/preferential-terms'
import check from '@/util/RegExp'

export const coupon = {
  data() {
    return {
      // 使用存送优惠券许提交的表单
      data: {
        couponType: '', // 使用的游戏平台
        couponRemit: '', // 存的金额
        couponCode: '' // 优惠券ID
      }
    }
  },
  watch: {
    'data.couponRemit'(val) {
      // 去空格
      if (/[^\d]/g.test(val)) {
        this.data.couponRemit = this.data.couponRemit.toString().replace(/[^\d]/g, '')
      }
    }
  },
  methods: {
    checkCoupon(obj) {
      if (!obj.couponType) {
        return '请选择游戏平台'
      } else if (!check.initNum.test(obj.couponRemit)) {
        return '请输入整数金额'
      } else if (!obj.couponCode) {
        return '请输入优惠代码'
      } else {
        return false
      }
    },
    couponSubmit(obj) {
      return new Promise((resolve, reject) => {
        // 验证表单
        const unChecked = this.checkCoupon(obj)
        if (unChecked) {
          return reject({
            success: false,
            message: unChecked
          })
        }
        // 提交表单
        transferInforCoupon(obj).then((res) => {
          if (res.success) {
            this.data.couponCode = ''
            return resolve(res)
          } else {
            return reject(res)
          }
        }).catch((err) => {
          console.log(err)
          return reject(err)
        })
      })
    }
  },
  created() {
    enablePlatform({youhuiType:'HONGBAO'}).then(res=>{
      console.log(res)
      if(res.success){
        res.data.forEach((item)=>{
          if(item.value == 'PT2TIGER'){
            item.name = 'PT国际版'
          }
        })
        this.platformData=res.data;
      }
    }).catch(err=>{
      console.log(err)
      window.toast(err.message)
    })
  }
}
