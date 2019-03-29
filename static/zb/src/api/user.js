import ajax from '@/util/request.js' // 引入axios

const $doSignRecord = '/asp/doSignRecord.php' // 签到
const $queryGameStatus = '/user/queryGameStatus.php' // 查询用户收藏的游戏

const $getGameMoney = '/cash/getGameMoney.php' // 获取金钱接口
const $change_info = '/user/change_info.php' // 修改用户信息

const $modifyCustomerSocialInfo = '/user/modifyCustomerSocialInfo.php' // 修改用户qq，微信，邮箱
const $completeUserInfo = '/user/completeUserInfo.php' // 完善用户信息
const $ajaxGetSessionPersonalData = '/user/ajaxGetSessionPersonalData.php' /** *获取用户资料*/

const $getPhoneAndCode = '/youhui/getPhoneAndCode.php' /** *获取手机验证方式*/// 获取验证码，还是发送到指定手机号
const $sendSms4TYJ = '/asp/sendSms4TYJ.php' // 体验金：发送短信到玩家的注册手机号
const $checkPhoneCode = '/youhui/checkPhoneCode.php' // 校验短信校验码

// 报表相关
const $queryCreditlogs = '/mobi/queryCreditlogs.php' // 额度记录查询
const $queryHistory = '/user/queryHistory.php' // 记录查询

const $getbackPwdByEmail = '/index/getbackPwdByEmail.php' // 邮箱找回
const $getWithdrawPW = '/onlinepayment/getWithdrawPW.php' // 手机短信或邮件找回支付密码

export function getWithdrawPW(data) {
  window.$load.open('正在验证...')
  return ajax.post($getWithdrawPW, data)
}

export function getPhoneAndCode(data) {
  window.$load.open('获取验证方式')
  return ajax.get($getPhoneAndCode, data)
}

export function doSignRecord(data) {
  window.$load.open('正在发送...')
  return ajax.get($doSignRecord, data)
}
export function queryGameStatus(data) {
  return ajax.get($queryGameStatus, data)
}
export function checkPhoneCode(data) {
  window.$load.open('正在验证...')
  return ajax.get($checkPhoneCode, data)
}

export function sendSms4TYJ(data) {
  window.$load.open('正在发送短信...')
  return ajax.get($sendSms4TYJ, data)
}

export function getbackPwdByEmail(data) {
  window.$load.open('正在发送...')
  return ajax.get($getbackPwdByEmail, data)
}

export function queryHistory(data) {
  window.$load.open('正在查询...')
  return ajax.get($queryHistory, data)
}
export function queryCreditlogs(data) {
  window.$load.open('正在查询...')
  return ajax.get($queryCreditlogs, data)
}
export function ajaxGetSessionPersonalData(data) {
  return ajax.get($ajaxGetSessionPersonalData, data)
}

export function change_info(data) {
  window.$load.open('正在处理...')
  return ajax.post($change_info, data)
}

export function modifyCustomerSocialInfo(data) {
  window.$load.open('正在处理...')
  return ajax.post($modifyCustomerSocialInfo, data)
}

export function completeUserInfo(data) {
  window.$load.open('正在处理...')
  return ajax.post($completeUserInfo, data)
}

// 获取单个直接传入 eg:"PT"
export function getGameMoney(data) {
  return ajax.get($getGameMoney, data)
}
