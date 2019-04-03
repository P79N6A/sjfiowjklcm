/**
 * 修改用户登录密码逻辑
 * 1、修改用户登录密码
 */
import {
  changepws
} from '@/api/payment'
import check from '@/util/RegExp'

export const loginUpdate = {
  data() {
    return {
      pwdForm: {
        confirm_password: '', // 新2
        new_password: '', // 新
        password: '' // 旧
      }
    }
  },
  props: {},
  methods: {
    checked(obj) {
      if (!obj.password) {
        return '请输入原密码'
      } else if (!obj.new_password || !check.password.test(obj.new_password)) {
        return '密码需为6-16位，包含数字和字母'
      } else if (obj.new_password != obj.confirm_password) {
        return '二次密码不一致'
      } else if (obj.password == obj.new_password) {
        return '新密码不能与旧密码相同'
      } else {
        return false
      }
    },
    // 提交表单
    submitPwd(obj) {
      // 提交
      return new Promise((resolve, reject) => {
        const unChecked = this.checked(obj)
        if (unChecked) {
          return reject({
            success: false,
            message: unChecked
          })
        }
        changepws(obj).then((res) => {
          if (res.code == '10000') {
            return resolve(res)
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
