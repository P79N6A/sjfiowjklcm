// 存送优惠券
import {
  transferInforHongBao,enablePlatform
} from '@/api/preferential-terms'

export const couponRed = {
  data() {
    return {
      data: {
        couponType: '', // true string
        couponCode: '' // true string
      }
    }
  },
  watch: {
    'data.couponRemit'(val) {
      if (/[^\d]/g.test(val)) {
        this.data.couponRemit = this.data.couponRemit.toString().replace(/[^\d]/g, '')
      }
    }
  },
  methods: {
    checkCoupon(obj) {
      console.log(obj)
      if (!obj.couponType) {
        return '请选择游戏平台'
      } else if (!obj.couponCode) {
        return '请输入优惠代码'
      } else {
        return false
      }
    },
    couponSubmit(obj) {
      return new Promise((resolve, reject) => {
        // 验证
        const unChecked = this.checkCoupon(obj)
        if (unChecked) {
          return reject({
            success: false,
            message: unChecked
          })
        }
        transferInforHongBao(obj).then((res) => {
          if (res.success) {
            return resolve(res)
          } else {
            return reject(res)
          }
        }).catch((err) => {
          console.log(err)
          return reject(err)
          // toast('请重新尝试');
        })
      })
    }
  },
  created() {
    enablePlatform({youhuiType:'HONGBAO'}).then(res=>{
      console.log(res)
      if(res.success){
        this.platformData=res.data
      }
    }).catch(err=>{
      console.log(err)
      window.toast(err.message)
    })
  }
}
