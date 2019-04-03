import ajax from '@/util/request.js' // 引入axios

const $login = '/index/login.php' // 登入
const $checkLogin = '/user/ajaxGetSessionPersonalData.php' // 该接口用于获取用户信息
const $logout = '/index/logout.php' // 登出
const $register = '/mobi/register.php' // 注册
const $addAgent = '/mobi/addAgent.php' // 代理注册
// 手机验证码注册
const $isOpenRegistCode = "/asp/isOpenRegistCode.php"; // 是否开启配置注册短信接口
const $smsCode = "/asp/smsCode.php"; // 注册发送短信验证码

// 手机验证码登录
const $loginSmsCode = "/asp/loginSmsCode.php"; // 登录发送短信验证码
const $smsLogin = "/asp/smsLogin.php"; // 手机登录
/**
 * 用户相关API
 */
export function checkLogin() {
  return ajax.get($checkLogin)
}
export function login(userData) {
  window.$load.open('登录中...')
  return ajax.post($login, userData)
}
export function logOut() {
  window.$load.open('正在退出...')
  return ajax.get($logout)
}
export function getAuthImg() {
  console.log('getAuthImg')
  return '/mobi/validateImage.php?random=' + Math.random() // 验证码
}
export function register(data) {
  window.$load.open('正在注册...')
  return ajax.post($register, data)
}
export function registerAgent(data) {
  window.$load.open('正在注册...')
  return ajax.post($addAgent, data)
}
// 短信登陆/注册
export function isOpenRegistCode(data) {
  return ajax.get($isOpenRegistCode, data);
}
export function smsCode(data) {
  $load.open("正在发送...");
  return ajax.get($smsCode, data);
}
export function loginSmsCode(data) {
  $load.open("正在发送...");
  return ajax.get($loginSmsCode, data);
}
export function smsLogin(userData) {
  $load.open("登录中...");
  return ajax.post($smsLogin, userData);
}
