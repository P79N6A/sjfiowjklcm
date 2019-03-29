/**
 * 普通用户注册的逻辑，
 * 1、提交不同用户注册表单
 */
import {
  register
} from '@/api/authService'
import util from '@/util/util.js' // 获取推荐人
import check from '@/util/RegExp'
import { mapMutations } from 'vuex'

export const registerControl = {
  data() {
    return {
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
        friendcode: '' // 推荐码 根据url？读取
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
      } else {
        return false
      }
    }
  }
}
