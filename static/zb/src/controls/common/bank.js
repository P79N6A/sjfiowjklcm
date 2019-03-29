/**
 * 银行卡相关逻辑，
 * 1、绑定银行卡
 * 2、判断银行卡的归属行
 * 3、读取银行卡列表
 */
import {
  validateBankNo, // 验证银行卡
  bindBankNo, // 绑定银行卡
  findUserBankList
} from '@/api/payment'
import {
  mapGetters
} from 'vuex'
import check from '@/util/RegExp' // 正则
export const bank = {
  data() {
    return {
      // 绑定银行卡
      bindData: {
        cardNo: '' // 需要绑定的卡号
      },
      // 验证银行卡
      timeOut: null, // 延时器，防止频繁发送请求
      banktxt: '自动识别卡号', // 匹配出来的银行卡所属
      // 银行卡列表
      list: [] // 银行卡列表
    }
  },
  computed: {
    ...mapGetters(['userData'])
  },
  methods: {
    // 提交绑定银行卡表单时的判断
    checkBankno(obj) {
      // 必须完善个人信息
      if (!this.userData.accountName) {
        return '请先绑定个人真实姓名'
      }
      if (!check.bank.test(obj.cardNo.replace(/\s+/g, ''))) {
        return '请输入正确格式的银行卡,16或19位'
      } else {
        return false
      }
    },
    // 从api接口匹配银行卡归属行
    verifyBankNumber(val) {
      // 要加个延时，以免频繁调用接口
      clearTimeout(this.timeOut)
      // 先判断银行卡是否符合规则
      if (check.bank.test(val)) {
        // 延时器
        const $this = this
        this.timeOut = setTimeout(() => {
          $this.banktxt = '正在识别...'
          // 提交表单
          validateBankNo({
            bankno: val
          }).then(res => {
            if (res.success) {
              // 通过验证
              $this.banktxt = res.data
            } else {
              $this.banktxt = '卡号无法识别'
            }
          })
        }, 1000)
      } else {
        // 正则未通过
        this.banktxt = '卡号无法识别'
      }
    },
    // 添加银行卡操作
    addBankNo(obj) {
      return new Promise((resolve, reject) => {
        // 验证表单规则
        const unChecked = this.checkBankno(obj)
        if (unChecked) {
          return reject({
            success: false,
            message: unChecked
          })
        }
        // 提交表单
        obj.cardNo = obj.cardNo.replace(/\s+/g, '') // 去除空格
        bindBankNo(obj).then(res => {
          if (res.success) {
            // 刷新银行卡列表，这个有待调整，应该要放到组件部分
            this.$bus.$emit('refreshBankList')
            this.bindData.cardNo = ''
            return resolve(res)
          } else {
            return reject(res)
          }
        }).catch(err => {
          return reject(err)
        })
      })
    },
    // 获取银行卡列表
    getBankList() {
      return new Promise((resolve, reject) => {
        findUserBankList().then(res => {
          if (res.success) {
            this.list = res.data
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
    //
    getClass(item) {
      switch (item.bankname) {
        case '中国银行':
          return 'bg1'
        case '中国农业银行':
        case '农业银行':
          return 'bg2'
        case '光大银行':
          return 'bg3'
        case '交通银行':
          return 'bg4'
        case '民生银行':
          return 'bg5'
        case '中国建设银行':
        case '建设银行':
          return 'bg6'
        case '北京银行':
          return 'bg7'
        case '华夏银行':
          return 'bg8'
        case '邮政储蓄':
          return 'bg9'
        case '兴业银行':
          return 'bg10'
        case '':
          return 'bg11'
        case '工商银行':
          return 'bg12'
        case '招商银行':
          return 'bg13'
        default:
          return 'bg11'
      }
    }
  },
  created() {
    console.log(this.userData)
  }

}
