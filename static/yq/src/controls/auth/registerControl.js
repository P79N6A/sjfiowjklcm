/**
 * 普通用户注册的逻辑，
 * 1、提交不同用户注册表单
 */
import {
  register,
  isOpenRegistCode,
  smsCode
} from '@/api/authService'
import util from '@/util/util.js' // 获取推荐人
import check from '@/util/RegExp'
import {
  mapMutations
} from 'vuex'
import {
  $localStorage
} from '@/util/storage'
export const registerControl = {
  data() {
    return {
      codeType: 'code',
      timer: '',
      authImg: '', // 验证码地址
      registerForm: {
        // 注册的内容
        accountName: '', // 真实姓名，已取消验证
        phone: '', // 手机号码 *必填
        password: '', // 密码 *必填
        confirmPassword: '', // 重复密码
        email: '', // 邮箱
        name: '', // 名字
        account: '', // 用户名 *必填
        birthDate: '', // 生日
        imageCode: '', // 验证码 *必填
        qq: '', // qq
        intro: '', // 推荐人 根据url?读取
        friendcode: '', // 推荐码 根据url？读取
        userAgree: false, //是否同意协议
        wechat: '' // 微信
      }
    }
  },
  methods: {
    ...mapMutations(['GET_VALIDATE']),
    // 提交表单
    register(obj) {
      console.log(obj)
      return new Promise((resolve, reject) => {
        // 表单验证
        const unChecked = this.checked(obj)
        if (unChecked) {
          return reject({
            success: false,
            message: unChecked
          })
        }
        obj.intro = obj.friendcode = util.getQueryString('friendcode') // 推荐人
        // 提交表单
        register(obj).then((res) => {
          if (res.success) {
            this.$store.dispatch('UPDATE_USERDATA')
            return resolve(res)
          } else {
            this.GET_VALIDATE()
            return reject(res)
          }
        }).catch((err) => {
          return reject(err)
        })
      })
    },
    // 检查表单
    checked(obj) {
      console.log(obj)
      if (!check.account.test(obj.account)) {
        return '登入账号的长度请介于6-10字符之间！'
      } else if (!check.password.test(obj.password)) {
        return '密码需为6-16位，包含数字和字母'
      } else if (!check.phone.test(obj.phone)) {
        return '手机号格式不正确'
      } else if (obj.imageCode === '') {
        return '请输入验证码'
      } else if (!obj.userAgree) {
        return '请选择同意合作协议'
      } else {
        return false
      }
    },
    checkCodeType() {
      return new Promise((resolve, reject) => {
        isOpenRegistCode().then(res => {
          console.log(res)
          if (res.success) {
            this.codeType = 'sms'
            return resolve(res)
          } else {
            this.codeType = 'code'
            return reject(res)
          }
        }).catch(err => {
          console.log(err);
          this.codeType = 'code'
          return reject(err)

        })
      })
    },
    startTime(second) {
      this.timer = second
      const $this = this
      window.smsTimer = window.setInterval(() => {
        if ($this.timer > 0) {
          $this.timer--
        } else {
          window.clearInterval(window.smsTimer)
        }
      }, 1000)
    },
    getMessage() {
      return new Promise((resolve, reject) => {
        if (!check.phone.test(this.registerForm.phone)) {
          return reject({
            message: '手机号格式不正确'
          })
        }
        const lastSmsTime = $localStorage.get('lastSmsTime')
        if (lastSmsTime && (new Date()).getTime() - lastSmsTime < 60 * 1000) {
          this.startTime(60 - ((new Date().getTime() - lastSmsTime) / 1000).toFixed(0))
          return reject()
        } else {
          smsCode({
            phone: this.registerForm.phone
          }).then(res => {
            if (res.success) {
              $localStorage.set('lastSmsTime', new Date().getTime())
              this.startTime(60)
              return resolve(res)
            } else {
              return reject(res)
            }
          }).catch(err => {
            return reject(err)
          })
        }
      })
    }
  },
  beforeDestroy() {
    window.clearInterval(window.smsTimer)
  }
}
