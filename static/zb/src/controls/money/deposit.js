import {
  getPaymentConfigInfo
} from '@/api/payment'

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
      payTypes: {
        'mcpay': {
          name: '秒存转账',
          tips: '',
          ico: 'yg-mcpay'
        },
        'wechat': {
          name: '微信支付',
          tips: '稳定,单笔上限300万',
          ico: 'yg-weixinzhifu'
        },
        'ebank': {
          name: '网银支付',
          tips: '',
          ico: 'yg-ebank'
        },
        'qqpay': {
          name: 'QQ支付',
          tips: '海量用户群，走哪都能用',
          ico: 'yg-qqpay'
        },
        'alipay': {
          name: '支付宝支付',
          tips: '',
          ico: 'yg-alipay'
        },
        'jdpay': {
          name: '京东支付',
          tips: '',
          ico: 'yg-jdpay'
        },
        'unionpay': {
          name: '银联扫码',
          tips: '',
          ico: 'yg-unionpay'
        },
        'psWechat': {
          name: '微信秒存',
          tips: '',
          ico: 'yg-weixin'
        },
        'directpay': {
          name: '快速支付',
          tips: '快速方便存取款',
          ico: 'yg-directpay'
        },
        'speedPay': {
          name: '快捷支付',
          tips: '',
          ico: 'yg-speedPay'
        },
        'ysfpay': {
          name: '云闪付',
          tips: '',
          ico: 'yg-ysfpay'
        },
        'offbank': {
          name: '线下银行转账',
          tips: '',
          ico: 'yg-offbank'
        }
      }, // payTypes 预设置支付类型菜单，目前title由前端处理，后期由后端带出
      mcTypech: {
        'zfb': '支付宝通道一',
        'new_zfb': '支付宝通道二',
        'bank_phone': '手机银行转账',
        'bank_web': '网上银行转账',
        'wechat': '微信转账'
      }
    }
  },
  watch: {

  },
  methods: {
    setMenus(datas) {
      const payInfos = {} // 用于将支付类型归类到指定的支付方式下
      const payTypes = [] // 暂存支付方式，用于排序
      const ignore = ['mcpay'] // 某些存款方式要，特殊处理

      for (let i = 0; i < datas.length; i++) {
        const keys = datas[i].type
        payTypes.push(datas[i].type)
        // 普通的支付方式
        if (ignore.indexOf(keys) < 0) {
          if (!payInfos[keys]) {
            // 先判断是否有这个分类
            payInfos[keys] = {}
            // 是否有预设顶name 和tips
            if (this.payTypes[keys]) {
              payInfos[keys].tips = this.payTypes[keys].tips
              payInfos[keys].name = this.payTypes[keys].name
              payInfos[keys].ico = this.payTypes[keys].ico
            } else {
              // 没有，则name==keys
              payInfos[keys].tips = ''
              payInfos[keys].name = keys
            }
            payInfos[keys].type = keys
            payInfos[keys].data = []
          }
          // 将分类存入data
          payInfos[keys].data.push(datas[i])
        } else {
          // 需要特殊处理的支付方式
          if (keys == 'mcpay') {
            // 如果是秒存，再组装
            const mcPay = datas[i]
            payInfos[keys] = payInfos[keys] || {}
            // 命名
            if (this.payTypes[keys]) {
              payInfos[keys].tips = this.payTypes[keys].tips
              payInfos[keys].name = this.payTypes[keys].name
              payInfos[keys].ico = this.payTypes[keys].ico
            } else {
              payInfos[keys].tips = ''
              payInfos[keys].name = keys
              payInfos[keys].ico = ''
            }
            payInfos[keys].type = keys
            payInfos[keys].data = payInfos[keys].data || []

            if (mcPay.payChannelList) {
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
                newPay.platformtype = mcPay.platformtype
                // 将分类入库
                payInfos[keys].data.push(newPay)
              }
            } else {
              //秒付宝直接存入data       
              payInfos[keys].data.push(datas[i])
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
