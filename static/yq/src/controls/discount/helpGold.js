/**
 * 救援金相关逻辑
 * 1、查询救援金列表
 * 2、领取救援金
 */
import {
  queryPTLosePromo,
  claimLosePromo
} from '@/api/preferential-terms'

export const helpGold = {
  data() {
    return {
      listData: [], // 查询优惠列表
      expriedDay: 30, // 有效期，单位：天，协商为前端显示
      searchLogData: {
        // 获取救援金列表的参数
        pageIndex: 1,
        total: 0,
        size: 100,
        totalRecords: 0
      },
      // 使用救援金时要传的表单数据
      submitData: {
        pno: '', // 救援金编号
        platform: '', // 平台
        flag: 2 // 未知
      }
    }
  },
  watch: {
    'data.couponRemit'(val) {
      // 去除空格
      if (/[^\d]/g.test(val)) {
        this.data.couponRemit = this.data.couponRemit.toString().replace(/[^\d]/g, '')
      }
    }
  },
  methods: {
    checkHelpGold(obj) {
      if (!obj.pno) {
        return '请选择救援金'
      } else if (!obj.platform) {
        return '请选择转入平台'
      } else {
        return false
      }
    },
    // 获取过期的截止日期，可要可不要
    getUom(item) {
      var d1 = item.tempCreateTime.toString().toDate()
      var uom = new Date(d1 - 0 + this.expriedDay * 86400000)
      uom = uom.getFullYear() + '-' + (uom.getMonth() + 1) + '-' + uom.getDate()
      return uom
    },
    // 使用救援金
    helpGoldSubmit(obj) {
      return new Promise((resolve, reject) => {
        // 验证表单
        const unChecked = this.checkHelpGold(obj)
        if (unChecked) {
          return reject({
            success: false,
            message: unChecked
          })
        }
        // 提交表单
        claimLosePromo(obj).then(res => {
          if (res.success) {
            // 重新从服务器拉取当前列表
            this.getHelpGold(this.searchLogData)
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
    getHelpGold(obj) {
      return new Promise((resolve, reject) => {
        queryPTLosePromo(obj).then(res => {
          if (res.success) {
            this.listData = res.data.pageContents
            this.searchLogData.pageIndex = res.data.pageNumber
            this.searchLogData.size = res.data.size
            this.searchLogData.totalRecords = res.data.totalRecords
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
