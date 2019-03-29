/**
 * VIP晋级礼金，相关逻辑
 * 1、获取当前投注额度，以及晋级条件
 * 2、计算可否晋级
 * 3、当前等级
 * 4、距离下一等级
 */
import {
  getBetUpgrateVO, // 获取晋级要求
  checkUpgrade // 晋级
} from '@/api/preferential-terms'
import {
  mapGetters
} from 'vuex'

export const vipGold = {
  data() {
    return {
      canUpgrade: true, // 是否可以领取晋级礼金
      // 当前晋级条件，以及投注情况
      data: {
        upgradeThresholdList: [], // 晋级条件
        betList: [{ // 投注信息
          bet: 0
        }]
      },
      betArr: null, //投注情况
      // 未知，好像没用到
      thisMonthMoney: 0, // 本月投注额
      level: [], // 保存对应的等级信息
      // 提示小内容
      tips: {
        allbet: 0, // 所有投注额
        target: 0, // 晋级所需条件
        nextLevel: '' // 下一等级
      },
      showTip: false // 是否显示tips，请在组件里写
    }
  },
  computed: {
    ...mapGetters(['userData'])
  },
  methods: {
    // 获取级别信息
    getVipInfo(obj) {
      getBetUpgrateVO(obj).then(res => {
        if (res.success) {
          this.level = res.data.upgradeThresholdList
          // this.level.pop();  //去掉最后一个等级
          // 因为接口没有放0级的信息，
          if (this.level[0].level != 0) {
            this.level.unshift({
              level: 0,
              levelName: '贵宾',
              retainthreshold: 0,
              upgradeprize: 0,
              upgradethreshold: 0
            })
          }
          // 计算
          this.tips.allbet = res.data.betList[res.data.betList.length - 1].bet // 总投注额度
          //   如果没有到顶级
          if (this.userData.levelNumber < res.data.upgradeThresholdList[res.data.upgradeThresholdList.length - 1].level) {
            this.tips.nextLevel = this.level[this.userData.levelNumber + 1].level // 下一级名字
            this.tips.target = (this.level[this.userData.levelNumber + 1].upgradethreshold - this.tips.allbet).toFixed(2) // 距离下一级
          }
          // } else {
          // }
          this.canUpgrade = res.data.upgradeThresholdList.filter(item => {
            return item.money && res.data.betList[res.data.betList.length - 1].bet >= item.money
          })
          this.betArr = res.data.betList
        } else {
          //   toast(res.message)
        }
      }).catch(err => {
        console.log(err)
        // toast('晋级查询失败')
      })
    },
    // 获取当前vip礼金可领取状态
    checkUpgrade() {
      return new Promise((resolve, reject) => {
        if (!this.canUpgrade) {
          return reject({
            success: 'false',
            message: '每月仅可自助申请一次'
          })
        }
        checkUpgrade().then(res => {
          this.canUpgrade = false
          if (res.success) {
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
