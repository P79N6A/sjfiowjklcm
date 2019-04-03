/**
 * 自助洗码相关逻辑
 * 1、获取洗码数据
 * 2、提交洗码
 */
import {
  getXimaData,
  doXima
} from '@/api/preferential-terms'
export const washCode = {
  data() {
    return {
      // 需要查询的洗码平台
      type: '', // 当前平台的类型
      show: false, // 是否可以洗码
      // 查询的洗码数据
      data: {
        startDate: '',
        endDate: '',
        validAmount: '',
        ximaAmount: '',
        rate: ''
      }
    }
  },

  methods: {
    checkWashcode(obj) {
      if (!obj.gameId) {
        return '请选择游戏平台'
      } else {
        return false
      }
    },
    // 查询洗码结果
    searchSubmit(obj) {
      return new Promise((resolve, reject) => {
        // 表单验证
        const unChecked = this.checkWashcode(obj)
        if (unChecked) {
          return reject({
            success: false,
            message: unChecked
          })
        }
        getXimaData(obj).then(res => {
          this.show = res.success // 是否可以洗码
          if (res.success) {
            Object.assign(this.data, res.data)
            return resolve(res)
          } else {
            this.data.startDate = ''
            this.data.endDate = ''
            this.data.validAmount = ''
            this.data.ximaAmount = ''
            this.data.rate = ''
            return reject(res)
          }
        }).catch((err) => {
          this.show = false
          return reject(err)
          // toast("请求错误请稍后重新尝试...");
        })
      })
    },
    // 确认洗码
    doXimaSubmit(obj) {
      return new Promise((resolve, reject) => {
        if (!obj.gameId) {
          return reject({
            success: false,
            message: '请传入洗码平台'
          })
        }
        doXima(obj).then(res => {
          if (res.success) {
            this.show = false
            this.type = ''
            return resolve(res)
          } else {
            return reject(res)
          }
        }).catch((err) => {
          return reject(err)
          // toast("洗码失败请重新尝试...");
        })
      })
    }
  }
}
