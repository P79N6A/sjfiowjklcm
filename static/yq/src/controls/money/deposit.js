import {
  getPaymentConfigInfo
} from '@/api/payment'
import {
  mcTypech,
  payTypes
} from '@/assets/data/deposit.js'

export const depositMenu = {
  data() {
    return {
      paySelect: null,
      payMenus: [
        // 最终重组为json数组
        // {
        //   name:"", // 展示的名称
        //   type:'', // type当前支付分类的key
        //   tips:'', //支付方式的文案提示
        //   data:[] // 每条存款方式的具体的配置内容
        // }
      ],
      payTypes: payTypes, // payTypes 预设置支付类型菜单，目前title由前端处理，后期由后端带出
      mcTypech: mcTypech // mfb支付菜单
    }
  },
  methods: {
    setMenus(datas) {
      const payInfos = {} // 用于将支付类型归类到指定的支付方式下
      const payTypes = [] // 暂存支付方式，用于排序
      const ignore = ['mcpay'] // 某些存款方式要，特殊处理

      for (let i = 0; i < datas.length; i++) {
        if (datas[i].type == 'ebank') {
          if (!datas[i].payBy) {
            datas[i].payMethod = 'ebank'
          }
        }
        if (datas[i].type == 'speedPay') {
          datas[i].payMethod = 'speedPay'
          datas[i].type = 'ebank'
        }
        if (datas[i].type == 'offbank') {
          datas[i].payMethod = 'offbank'
          datas[i].type = 'ebank'
          datas[i].remark = '线下银行存款'
        }
        if (datas[i].type == 'unionpay') {
          if (!datas[i].payBy) {
            datas[i].payMethod = 'unionpay'
          }
        }
        if (datas[i].type == 'ysfpay') {
          datas[i].payMethod = 'ysfpay'
          datas[i].type = 'unionpay'
        }

        const keys = datas[i].type
        if (!datas[i].payMethod) {
          // 针对tb特殊化，区分TRANFER_BANK_CARD，和转账
          datas[i].payMethod = "SM"
        }
        payTypes.push(datas[i].type)
        // 普通的支付方式
        if (ignore.indexOf(keys) < 0) {
          if (!payInfos[keys]) {
            // 先判断是否有这个分类
            payInfos[keys] = {}
            // 是否有预设顶name 和tips
            if (this.payTypes[keys]) {
              Object.assign(payInfos[keys], this.payTypes[keys] || {})
            } else {
              // 没有，则name==keys
              payInfos[keys].tips = ''
              payInfos[keys].name = keys
            }
            payInfos[keys].type = keys
            payInfos[keys].data = []
          }

          if (datas[i].rate4deputy > 0) {
            payInfos[keys].rate4deputy = true
          }
          // 将分类存入data
          payInfos[keys].data.push(datas[i])
        } else {
          // 需要特殊处理的支付方式
          if (keys == 'mcpay') {
            // 如果是秒存，再组装
            const mcPay = datas[i]
            payInfos[keys] = {}
            // 命名
            if (this.payTypes[keys]) {
              Object.assign(payInfos[keys], this.payTypes[keys] || {})

              // payInfos[keys].tips = this.payTypes[keys].tips
              // payInfos[keys].name = this.payTypes[keys].name
            } else {
              payInfos[keys].tips = ''
              payInfos[keys].name = keys
            }
            if (datas[i].rate4deputy > 0) {
              payInfos[keys].rate4deputy = true
            }
            payInfos[keys].type = keys
            payInfos[keys].data = []

            for (let i = 0; i < mcPay.payChannelList.length; i++) {
              // 将秒存改成标准格式
              const newPay = {}
              newPay.type = keys
              newPay.remark = this.mcTypech[mcPay.payChannelList[i]] ? this.mcTypech[mcPay.payChannelList[i]] : mcPay.payChannelList[i]
              newPay.upperlimit = mcPay.upperlimit
              newPay.lowerlimit = mcPay.lowerlimit
              newPay.id = mcPay.payChannelList[i]
              newPay.rate4deputy = mcPay.rate4deputy
              newPay.rate4player = mcPay.rate4player
              newPay.rate4us = mcPay.rate4us
              // 将分类入库
              payInfos[keys].data.push(newPay)
            }
          } else if (keys == 'directpay') {
            // 快捷支付，还未配置
          }
        }
      }

      // 数组去重,根据后台的支付顺序，进行支付方式菜单的排序
      const payIndexs = Array.from(new Set(payTypes))
      for (let i = 0; i < payIndexs.length; i++) {
        this.payMenus.push(payInfos[payIndexs[i]])
      }
      console.log(this.payMenus)
    },
    /**
     * terminalType  0/1，0:pc,1/mobile
     */
    getPaymentConfigInfo(obj) {
      return new Promise((resolve, reject) => {
        getPaymentConfigInfo(obj).then((res) => {
          if (res.success) {
            // this.payItem = res.data;
            this.setMenus(res.data)
            return resolve({
              success: true,
              data: this.payMenus
            })
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
