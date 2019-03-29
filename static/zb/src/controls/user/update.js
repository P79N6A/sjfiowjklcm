import {
  completeUserInfo,
  getPhoneAndCode,
  modifyCustomerSocialInfo
} from '@/api/user'
import {
  validateBankNo
} from '@/api/payment'
import {
  mapGetters
} from 'vuex'
import check from '@/util/RegExp'

export const update = {
  data() {
    return {
      reverseData: null,
      showTips: false,
      Data: {
        accountName: '', // 真实姓名（只能改一次）
        phone: '', // 手机号码(只能改一次)
        email: '', // 邮箱(只能改一次)
        birthday: '', // 生日(只能改一次)
        bankno: '', // 银行卡(非必填)
        qq: '', // 可多次修改
        wechat: '' // 可多次修改
      }
    }
  },
  watch: {

  },
  methods: {
    checkComplete(obj) {
      // 判断逻辑部分包括了新注册和导入的注册，有点小复杂
      if (!this.userData.accountName && !check.name.test(obj.accountName)) {
        // 完善信息，姓名必填
        return '请输入正确格式中文姓名'
      } else if (!this.userData.phone && !check.phone.test(obj.phone)) {
        // 针对导入的账户，没手机号时，则手机号为必填
        return '请输入正确的手机号码'
      } else if (obj.email != '' && !check.email.test(obj.email)) {
        // 邮箱非必填
        return '请输入正确的电子邮箱'
      } else if (!this.userData.birthday && obj.birthday == '') {
        // 完善信息，生日必填
        return '请输入生日'
      } else if (obj.qq && !check.qq.test(obj.qq)) {
        // qq非必填
        return '请输入正确QQ号码'
      } else if (!check.bank.test(obj.bankno)) {
        // 完善信息时银行卡必填
        return '请输入正确银行卡号,16-19位'
      } else {
        return false
      }
    },
    checkModify(obj) {
      // console.log(obj)
      // console.log(check.wechat);
      // console.log(obj.wechat)
      for (const key in obj) {
        if (!check[key].test(obj[key])) {
          return '请填写正确的数据'
        }
      }
      return false
    },
    modifySubmit(obj) {
      // console.log(obj)
      return new Promise((resolve, reject) => {
        // 对传入的表单数据验证一次
        const unChecked = this.checkModify(obj)
        if (unChecked) {
          return reject({
            success: false,
            message: unChecked
          })
        }
        modifyCustomerSocialInfo(obj).then(res => {
          if (res.success) {
            this.$store.dispatch('UPDATE_USERDATA').then(res => {
              Object.assign(this.Data, this.userData || {})
              return resolve(res)
            })
          } else {
            return reject(res)
          }
        }).catch(err => {
          console.log(err)
          return reject(err)
        })
      })
    },
    completeSubmit(obj) {
      return new Promise((resolve, reject) => {
        // 对传入的表单数据验证一次
        const unChecked = this.checkComplete(obj)
        if (unChecked) {
          return reject({
            success: false,
            message: unChecked
          })
        }
        // bugfixed
        if (this.userData.phone) {
          // 不要传phone值到后台，后台会根据phone判断规则
          obj.phone = ''
          // delete obj.phone
        }
        completeUserInfo(obj).then(res => {
          // 初始化，防止重复判断showTips
          this.Data.phone = this.userData.phone || ''// 上面phone被删除了
          if (res.success) {
            this.$store.dispatch('UPDATE_USERDATA').then(res => {
              Object.assign(this.Data, this.userData || {})
              return resolve(res)
            })
          } else {
            return reject(res)
          }
        }).catch(err => {
          console.log(err)
          return reject(err)
        })
      })
    }
  },
  computed: {
    ...mapGetters(['userData','isAgent']),
    // 判断是否正在完善信息
    isCompleting() {
      if ((this.userData.accountName && this.userData.phone && this.userData.birthday) || this.isAgent) {
        return false
      } else {
        return true
      }
    }
  },
  activated() {
    // 要用了keep-alive才会有作用
    Object.assign(this.Data, this.userData || {})
  },
  created() {
    Object.assign(this.Data, this.userData || {})
  }
}
