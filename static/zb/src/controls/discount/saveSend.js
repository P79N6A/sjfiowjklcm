/**
 * 存送优惠
 * 1、获取存送优惠列表
 * 2、提交存送表单
 */
import {
  youhui,
  getSelfYouHuiObject
} from '@/api/preferential-terms'
import {
  mapGetters
} from 'vuex'
import {
  Money
} from '@/assets/data/index'
export const saveSend = {
  data() {
    return {
      Money,
      // 获取的优惠方案列表数据
      listData: [], // 优惠方案数据
      percentMoney: '', // 可获得红利
      limitMoney: '', // 取款流水要求
      touzhuLimit: '', // 投注限额
      betMultiples: '', // 流水倍数要求
      Type: '', // 选择平台，有待调整，应该用submitData.platform
      platformData: [], // 可用的平台列表，不能前台固定，需要根据listData计算
      // 表单提交数据
      submitData: {
        youhuiConfigId: '', // 优惠id
        youHuiType: '', // 优惠类型（未知要填什么）
        platform: '', // 平台
        remit: '' // 转入金额
      }
    }
  },
  watch: {
    'submitData.youhuiConfigId'(val) {
      // 在这里为submitData字段赋值
      if (val !== '') {
        const _chosendata = this.listData.find(item => {
          return item.id === val
        })
        this.submitData.platform = this.submitData.youHuiType = _chosendata.title
      }
      // 重新选择后，要清空
      this.submitData.remit = ''
      this.percentMoney = 0
      this.limitMoney = 0
      this.touzhuLimit = 0
      this.betMultiples = 0
      if (val) {
        this.computedMoney()
      }
    },
    'submitData.platform'(val) {
      // 重新选择后，要清空
      this.submitData.remit = ''
      this.percentMoney = 0
      this.limitMoney = 0
      this.touzhuLimit = 0
      this.betMultiples = 0
    },
    Type() {
      this.submitData.youhuiConfigId = ''
    },
    'submitData.remit'(val, old) {
      if (/[^\d]/g.test(val)) {
        this.submitData.remit = this.submitData.remit.toString().replace(/[^\d]/g, '')
      } else {
        val == '' || this.computedMoney()
      }
    }
  },
  computed: {
    ...mapGetters(['userData'])
  },
  methods: {
    checkSaveSend(obj) {
      // 必须完善个人信息
      if (this.userData.phoneValidStatus == 0 || this.userData.phoneValidStatus == '0') {
        return '请先验证手机号码'
      } else if (!obj.youhuiConfigId) {
        return '请选择优惠方案'
      } else if (!obj.remit || !/^\d+$/.test(obj.remit)) {
        return '请输入整数金额'
      } else {
        return false
      }
    },
    // 筛选可用优惠的平台
    // 筛选可用优惠的平台
    setPlatformData(data) {
      let pf = []
      const pfs = []
      data.forEach(item => {
        pf.push(item.platform.toUpperCase())
      })
      pf = Array.from(new Set(pf))

      pf.forEach(item => {
        const newObj = {}
        newObj.value = item
        this.Money.some(obj => {
          if (obj.value == item) {
            newObj.name = obj.name
          } else {
            newObj.name = item
          }
          return obj.value == item
        })
        pfs.push(newObj)
      })
      return pfs
    },
    saveSendSubmit(obj) {
      return new Promise((resolve, reject) => {
        // 验证
        const unChecked = this.checkSaveSend(obj)
        if (unChecked) {
          return reject({
            success: false,
            message: unChecked
          })
        }
        // 提交表单
        getSelfYouHuiObject(this.submitData).then((res) => {
          if (res.success) {
            return resolve(res)
          } else {
            return reject(res)
          }
        }).catch((err) => {
          console.log(err)
          return reject(err)
        })
      })
    },
    computedMoney() {
      // 计算金额
      // 找到当前的优惠数据
      let _data = this.listData.filter(item => item.id == this.submitData.youhuiConfigId)
      if (_data.length <= 0 || this.submitData.youhuiConfigId == '' || this.submitData.remit == '') return
      _data = _data[0]
      // 流水倍数
      this.betMultiples = _data.betMultiples
      // 设置支付类型
      // 会导致platform的watch函数生效，强制将红利倍数等数据置零，现挪到youhuiConfigId的watch函数中赋值
      // this.submitData.youHuiType = this.submitData.platform = _data.title
      let _remit = Math.min((this.submitData.remit * _data.percent).toFixed(2), _data.limitMoney)
      const _limitMoney = _data.betMultiples * (parseFloat(_remit) + parseFloat(this.submitData.remit))
      _remit = _remit < 0 ? 0 : _remit

      this.percentMoney = _remit.toFixed(2) // 可获红利
      this.limitMoney = _limitMoney.toFixed(2) // 取款流水要求
      this.touzhuLimit = ((this.submitData.remit + _remit) * 0.1).toFixed(2) // 投注限制
    },
    getYouHui() {
      return new Promise((resolve, reject) => {
        youhui().then(res => {
          if (res.success) {
            this.platformData = this.setPlatformData(res.data)
            this.listData = res.data
            return resolve(res)
          } else {
            this.listData = []
            return reject(res)
          }
        }).catch((err) => {
          return reject(err)
        })
      })
    }
  }
}
