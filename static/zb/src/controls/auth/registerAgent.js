/**
 * 代理注册的逻辑
 * 1、提交代理注册表单
 */

import {
  registerAgent
} from '@/api/authService'
import {
  getDomainName
} from '@/api/show'
import check from '@/util/RegExp'
import { mapMutations } from 'vuex'

export const AgentRegisterControl = {
  data() {
    return {
      authImg: '', // 验证码
      domainName: '代理域名', // 代理域名，从接口获取
      submitData: {
        phone: '', // 手机号码
        email: '', // 邮箱
        accountName: '', // 真实姓名
        loginname: '', // 用户名
        validateCode: '', // 验证码
        password: '', // 密码
        confirmPassword: '', // 确认密码
        qq: '', // qq
        partner: '', // 推荐人
        wechat: '', // 微信
        referWebsite: '', // 代理网址
        agentAgree: 'on' // 同意协议 ，因为接口特殊必须为on
      }
    }
  },
  methods: {
    ...mapMutations(['GET_VALIDATE']),
    checked(obj) {
      // 检查表单
      console.log(obj)
      if (!check.agent_account.test(obj.loginname)) return "代理账号(以a_(下划线)开头，3-15个数字或字母)"
      else if (!obj.password || !check.password.test(obj.password)) return "密码(6-16位数字和字母)"
      else if (obj.password != obj.confirmPassword) return "二次密码不一致"
      else if (!obj.accountName || !check.name.test(obj.accountName)) return "请输入正确的中文名字，需与银行卡账户名一致"
      else if (!obj.referWebsite || !check.referWebsite.test(obj.referWebsite)) return "请正确输入加盟地址"
      else if (!obj.email || !check.email.test(obj.email)) return "请输入正确的电子邮箱地址"
      else if (!obj.phone || !check.phone.test(obj.phone)) return "请正确输入手机号码"
      else if (!obj.qq || !check.qq.test(obj.qq)) return "请正确输入QQ号码"
      else if (!obj.validateCode) return "请输入验证码"
      else if (!obj.agentAgree) return "请选择同意合作协议"
      else {
        return false
      }
    },
    register(obj) {
      return new Promise((resolve, reject) => {
        // 表单验证
        const unChecked = this.checked(obj)
        if (unChecked) {
          return reject({
            success: false,
            message: unChecked
          })
        }
        // 特殊化处理，同意协议改为'on'
        if (obj.agentAgree && obj.agentAgree !== 'on') {
          obj.agentAgree = 'on'
        }
        registerAgent(obj).then((res) => {
          if (res.success) {
            return resolve(res)
          } else {
            this.GET_VALIDATE()
            return reject(res)
          }
        }).catch(err => {
          console.log(err)
          return reject(err)
        })
      })
    },
    getDomain() {
      getDomainName().then((res) => {
        this.domainName = res.data
      })
    }
  },
  created(){
    this.getDomain()
  }
}
