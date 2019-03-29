/**
 * 推荐好友相关逻辑
 * 1、查询推荐好友所得的礼金
 * 2、将礼金转入某个平台
 */
import {
  queryFriendBonue,
  transferInforFriend
} from '@/api/preferential-terms'

export const recommendFriend = {
  data() {
    return {
      money: 0, // 可用的礼金
      url: '', // 当前用户的推荐链接
      // 使用礼金时，提交的表单
      myData: {
        platform: '', // 平台
        money: '' // 使用金额
      }
    }
  },
  watch: {
    'myData.money'(val) {
      // 去空格
      if (/[^\d]/g.test(val)) {
        this.myData.money = this.myData.money.toString().replace(/[^\d]/g, '')
      }
    }
  },
  computed: {
    friendLink() {
      // 当前用户的分享链接
      return window.location.origin + '?friendcode=' + this.url
    }
  },
  methods: {
    checkFriend(obj) {
      if (!obj.platform) {
        return '请选择转入平台'
      } else if (!/^\d+$/.test(obj.money) || !obj.money) {
        return '请输入整数金额'
      } else if (obj.money - this.money > 0) {
        return '可转入余额不足'
      } else {
        return false
      }
    },
    // 提交
    friendSubmit(obj) {
      return new Promise((resolve, reject) => {
        // 验证表单
        const unChecked = this.checkFriend(obj)
        if (unChecked) {
          return reject({
            success: false,
            message: unChecked
          })
        }
        // 提交表单
        transferInforFriend(obj).then(res => {
          if (res.success) {
            // 刷新当前好友礼金的状态
            this.getFriendBonue()
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
    getFriendBonue() {
      return new Promise((resolve, reject) => {
        // 查询可领取的好友礼金
        queryFriendBonue().then(res => {
          if (res.success) {
            // 礼金金额
            this.money = res.data.money * 1
            // 推荐链接
            this.url = res.data.url
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
