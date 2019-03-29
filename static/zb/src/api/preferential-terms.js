import ajax from '@/util/request.js' // 引入axios
// 与用户优惠有关
const $youhui = '/youhui/youhui.php' // 存送优惠
const $getSelfYouHuiObject = '/youhui/getSelfYouHuiObject.php' // 自助优惠

const $getAllAutoXimaObject = '/xima/getAllAutoXimaObject.php' // 取得用户全部平台的洗码资料
const $getXimaData = '/xima/getXimaData.php' // 查询洗码记录 来确认是否能洗码
const $doXima = '/xima/doXima.php' // 确认洗码
const $transferInforHongBao = '/youhui/transferInforHongBao.php' // 红包
const $enablePlatform='/youhui/enablePlatform.php' // 使用平台类型
const $transferInforCoupon = '/youhui/transferInforCoupon.php' // 优惠券 使用优惠代码转入金额

const $queryPTLosePromo = '/youhui/queryPTLosePromo.php' // 查询pt老虎机救援金记录
const $claimLosePromo = '/youhui/claimLosePromo.php ' // 处理救援金

const $getBetUpgrateVO = '/youhui/getBetUpgrateVO.php' // 自助晋级查询
const $checkUpgrade = '/youhui/checkUpgrade.php' // 自助晋级

const $canClaimBirthdayCoupon = '/youhui/canClaimBirthdayCoupon.php' // 是否可以领取生日礼金
const $claimBirthdayCoupon = '/youhui/claimBirthdayCoupon.php' // 领取生日礼金

const $queryFriendBonue = '/youhui/queryFriendBonue.php' // 查询推荐好友奖金余额
const $transferInforFriend = '/youhui/transferInforFriend.php' // 推荐好友奖金  转入平台

const $commitPT8Self = '/youhui/commitPT8Self.php' // 体验金 领取
const $canGetPt8CouponCheck = '/youhui/canGetPt8CouponCheck.php' // 确认体验金
const $youhuiDisplay = '/youhui/youhuiDisplay.php' // 查询体验金

export function youhuiDisplay(data) {
  return ajax.get($youhuiDisplay, data)
}

export function commitPT8Self(data) {
  window.$load.open('正在发送...')
  return ajax.get($commitPT8Self, data)
}

export function canGetPt8CouponCheck(data) {
  window.$load.open('正在发送...')
  return ajax.get($canGetPt8CouponCheck, data)
}

export function getAllAutoXimaObject(data) {
  return ajax.get($getAllAutoXimaObject, data)
}

export function transferInforFriend(data) {
  window.$load.open('正在发送...')
  return ajax.post($transferInforFriend, data)
}

export function claimLosePromo(data) {
  window.$load.open('正在发送...')
  return ajax.post($claimLosePromo, data)
}

export function youhui() {
  return ajax.get($youhui)
}

export function getSelfYouHuiObject(data) {
  window.$load.open('正在发送...')
  return ajax.post($getSelfYouHuiObject, data)
}

export function getXimaData(data) {
  window.$load.open('正在查询...')
  return ajax.get($getXimaData, data)
}

export function doXima(data) {
  window.$load.open('正在发送...')
  return ajax.post($doXima, data)
}

export function transferInforCoupon(data) {
  window.$load.open('正在发送...')
  return ajax.post($transferInforCoupon, data)
}

export function queryPTLosePromo(data) {
  return ajax.get($queryPTLosePromo, data)
}

export function getBetUpgrateVO(data) {
  return ajax.get($getBetUpgrateVO, data)
}

export function checkUpgrade(data) {
  return ajax.get($checkUpgrade, data)
}

export function canClaimBirthdayCoupon(data) {
  return ajax.get($canClaimBirthdayCoupon, data)
}

export function claimBirthdayCoupon(data) {
  return ajax.get($claimBirthdayCoupon, data)
}

export function queryFriendBonue(data) {
  return ajax.get($queryFriendBonue, data)
}

export function transferInforHongBao(data) {
  window.$load.open('正在发送...')
  return ajax.post($transferInforHongBao, data)
}
export function enablePlatform(data){
  return ajax.post($enablePlatform,data)
}