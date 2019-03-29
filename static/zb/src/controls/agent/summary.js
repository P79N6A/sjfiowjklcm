import {
  agentReport
} from '@/api/agent'

export const summary = {
  data() {
    return {
      summary: {
        reg: '0', // true string 本月总人数
        daily_reg: '0', // true string 本日注册量
        monthly_reg: '0', // true string 本月注册量
        slotAccount: '0', // true string 老虎机佣金
        liveallAccount: '0', // true string 真人佣金
        profitall: '0', // true string 本月总输赢
        ximafee: '0', // true string 本月总洗码
        couponfee: '0', // true string 本月总优惠
        betall: '0' // true string 本月投注额
      }
    }
  },
  methods: {
    /**
     *
     * 读取数据汇总数据
     * @returns
     */
    getSummary() {
      return new Promise((resole, reject) => {
        agentReport().then((res) => {
          if (res.success) {
            Object.assign(this.summary, res.data)
            return resole(res)
          } else {
            return reject(res)
          }
        }).catch((err) => {
          console.log(err)
          return reject(err)
        })
      })
    }
  }
}
