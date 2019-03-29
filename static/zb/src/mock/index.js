import Mock from 'mockjs'
import loginAPI from './login'
// 假数据接口，暂时用不到
// Mock.setup({
//   timeout: '350-600' // 设置延时，更接近真实环境
// })

// 登录相关
Mock.mock(/\/login\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)

export default Mock
