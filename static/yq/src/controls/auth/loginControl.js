/**
 * 用户登录逻辑
 * 1、提交登录表单
 * 2、是否记住账户名的功能
 */

import {
  login,
  loginSmsCode,
  smsLogin
} from '@/api/authService'
// locastorage操作
import {
  $localStorage
} from '@/util/storage'
import check from '@/util/RegExp'
import {
  WEBCONFIG
} from '@/assets/data/index'
import {
  mapMutations
} from 'vuex'

export const loginControl = {
  data() {
    return {
      timer: '',
      isRemember: false, // 是否要记住账户
      isRememberPhone: false, // 是否记者手机号
      loginData: { // 需要提交的数据
        account: '', // 用户名
        password: '', // 密码
        imageCode: '' // 验证码
      },
      placeholder: {
        account: '用户名', // 用户名
        password: '密码', // 密码
        imageCode: '验证码' // 二维码
      },
      smsData: {
        loginname: '', // 手机登录
        imageCode: '' // 验证码
      },
    }
  },

  methods: {
    ...mapMutations(['GET_VALIDATE']),
    /**
     * 表单验证规则
     * parma {object} // json对象
     * 对应的key对照data的loginData
     */
    checkLogin(obj) {
      // 代理账户是否禁止登录
      if (WEBCONFIG.onlyUser) {
        if (this.loginData.account.indexOf('a_') > -1) {
          return '账号不存在'
        }
      } else if (!obj.account) {
        // 用户名必填
        return '用户名不能为空'
      } else if (!obj.password) {
        // 密码必填
        return '密码不能为空'
      } else if (!obj.imageCode) {
        // 验证码必填
        return '验证码不能为空'
      } else {
        return false
      }
    },
    /**
     * POST
     * 提交登录表单
     * parma {object} // json对象
     * 对应的key对照data的loginData
     */
    loginSubmit(obj) {
      // 返回异步函数
      return new Promise((resolve, reject) => {
        // 先判断表单
        const unChecked = this.checkLogin(obj)
        if (unChecked) {
          // 表单判断不通过，返回错误
          return reject({
            success: false,
            message: unChecked
          })
        }
        // 提交post表单
        login(this.loginData).then(res => {
          if (res.success) {
            // 登录成功
            if (this.isRemember) {
              // 是否要记住登录密码
              $localStorage.set('isRememberAccount', this.loginData.account)
            } else {
              $localStorage.remove('isRememberAccount')
            }
            // 重新更新store里的用户信息
            this.$store.dispatch('UPDATE_USERDATA') // 更新用户信息
            return resolve(res)
          } else {
            // 自动刷新二维码
            this.GET_VALIDATE()
            // 返回错误
            return reject(res)
          }
        }).catch(err => {
          // 返回错误
          return reject(err)
        })
      })
    },
    /**
     * POST
     * 提交登录表单
     * parma {object} // json对象
     * 对应的key对照data的loginData
     */
    loginSubmitSms(obj) {
      // 返回异步函数
      return new Promise((resolve, reject) => {
        // 提交post表单
        if (!check.phone.test(obj.loginname)) {
          return reject({
            message: '手机号格式不正确'
          })
        }
        smsLogin(obj).then(res => {
          if (res.success) {
            // 登录成功，代理是不是不允许登录
            if (WEBCONFIG.onlyUser && res.data.role.toUpperCase() == 'AGENT') {
              this.$store.dispatch('LOGIN_OUT') // 更新用户信息
              return reject({
                success: false,
                message: '不存在此账户!'
              })
            }
            if (this.isRememberPhone) {
              // 是否要记住
              $localStorage.set('isRememberPhone', obj.loginname)
            } else {
              $localStorage.remove('isRememberPhone')
            }
            // 重新更新store里的用户信息
            this.$store.dispatch('UPDATE_USERDATA') // 更新用户信息
            return resolve(res)
          } else {
            // 自动刷新二维码
            // 返回错误
            return reject(res)
          }
        }).catch(err => {
          // 返回错误
          return reject(err)
        })
      })
    },
    getRememberData() {
      // 读取之前记住的用户名
      if ($localStorage.get('isRememberAccount')) {
        this.isRemember = true
        this.loginData.account = $localStorage.get('isRememberAccount')
      }
      if ($localStorage.get('isRememberPhone')) {
        this.isRememberPhone = true
        this.smsData.loginname = $localStorage.get('isRememberPhone')
      }
    },
    getMessage() {
      return new Promise((resolve, reject) => {
        if (!check.phone.test(this.smsData.loginname)) {
          return reject({
            message: '手机号格式不正确'
          })
        }
        const lastSmsTime = $localStorage.get('lastSmsTime')
        if (lastSmsTime && (new Date()).getTime() - lastSmsTime < 60 * 1000) {
          this.startTime(60 - ((new Date().getTime() - lastSmsTime) / 1000).toFixed(0))
          return reject()
        } else {
          loginSmsCode({
            phone: this.smsData.loginname
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
    }
  },
  created() {
    this.getRememberData()
  }
}
