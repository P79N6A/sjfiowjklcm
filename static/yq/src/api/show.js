import ajax from "@/util/request.js"; // 引入axios

// 与展示有关
const $getNewAnnouncement = "/index/getNewAnnouncement.php"; // 获取公告获取公告 只获取最新15条，时间倒序排列，GET请求，无需参数
const $queryRecommandGamesList = "/index/queryRecommandGamesList.php"; // 查询推荐的热门游戏游戏 POST请求，{gameType:0},0:pc,1:mobile,2:app
const $checkConfigSystem = "/index/checkConfigSystem.php"; // 弹框内容配置 首页弹窗，GET,无需参数
const $queryBannerList = "/index/queryBannerList.php"; //  首页轮播 ，POST请求，{bannerType:0},0:PC,1:MOBILE,2:APP

const $getCarouselListAll = "/index/getCarouselListAll.php"; // 中奖信息列表,GET请求，无参数

const $makeCall = "/user/makeCall.php"; // 电话回拨接口
const $generateQRCode = "/index/generateQRCode.php"; // 返回二维码

const $queryLatestPreferential = "/youhui/queryLatestPreferential.php"; // 获取优惠列表 POST,{platformType:'PC'},pc/mobile
const $findLatestPreferentialById = "/youhui/findLatestPreferentialById.php"; // 由优惠id，查询优惠详情，返回html{platform:pc/mobile,id:0}
const $allGamesDataPc = "https://www.staticsources.com/slot/qhc/allGames.json"; // 获取游戏大厅列表pc qhc
const $allGamesDataMobile =
  "https://www.staticsources.com/slot/qhc/allPhoneGames.json"; // 获取游戏大厅列表mobile
const $mwqpGamesData = "https://www.staticsources.com/slot/bwgames/mwqp.json"; // 获取棋牌游戏大厅列表
const $getTouClickFlag = "/asp/getTouClickFlag.php"; // 获取是否开启点触(已经废弃)

const $getDomainName = "/asp/getDomainName.php"; // 获取域名

// 需要登录状态
// 后面这些，需要转移
const $saveOrUpdateGameStatus = "/user/saveOrUpdateGameStatus.php"; // 保存收藏游戏列表接口
const $getMessageByUser = "/index/getMessageByUser.php"; // 获取用户站内信列表

const $readMsg = "/index/readMsg.php"; // 获取个人信息详情单个消息的详情页
const $getGuestbookCountNew = "/index/getGuestbookCountNew.php"; // 获取未读消息（已废弃，用站内信列表）
const $getbackPwdByDx_dc = "/index/getbackPwdByDx_dc.php"; // 手机短信找回密码
const $getbackPwdByEmail = "/index/getbackPwdByEmail.php"; // 邮箱找回密码

const $getLoginNameByEmailOrPhone = "/index/getLoginNameByEmailOrPhone.php"; // 手机短信或邮件找回账户名（目前好像没有在用）
const $getIndexSport = "/static/api/sport/indexSport.json"; // 首页体育赛事
const $getHistory = "/static/api/history/history.json"; // 奇幻城风采数据

const $getIp = "http://ip-api.com/json?lang=zh-CN"; // 获取访问者ip
export function getLoginNameByEmailOrPhone(data) {
  return ajax.post($getLoginNameByEmailOrPhone, data);
}
export function getTouClickFlag(data) {
  return ajax.get($getTouClickFlag, data);
}
export function queryLatestPreferential(data) {
  return ajax.post($queryLatestPreferential, data);
}
export function findLatestPreferentialById(data) {
  return ajax.post($findLatestPreferentialById, data);
}
export function getbackPwdByEmail(data) {
  return ajax.post($getbackPwdByEmail, data);
}

export function getAllGames(type) {
  if (type == "pc") {
    return ajax.get($allGamesDataPc);
  } else {
    return ajax.get($allGamesDataMobile);
  }
}

export function getmwqpGames() {
  return ajax.get($mwqpGamesData);
}

export function generateQRCode(data, size = 140) {
  return `${$generateQRCode}?qrtext=${data}&size=${size}`;
}
export function getbackPwdByDx_dc(data) {
  window.$load.open("正在发送...");
  return ajax.post($getbackPwdByDx_dc, data);
}

export function getGuestbookCountNew(data) {
  return ajax.get($getGuestbookCountNew, data);
}
export function makeCall(data) {
  window.$load.open("正在发送...");
  return ajax.post($makeCall, data);
}
export function getCarouselListAll(data) {
  return ajax.get($getCarouselListAll, data);
}
export function checkConfigSystem(data) {
  return ajax.post($checkConfigSystem, data);
}
export function queryBannerList(data) {
  return ajax.get($queryBannerList, data);
}
export function getNewAnnouncement() {
  return ajax.get($getNewAnnouncement, {
    v: Math.random()
  });
}
export function queryRecommandGamesList(data) {
  return ajax.get($queryRecommandGamesList, data);
}
export function getDomainName(data) {
  return ajax.get($getDomainName, data);
}
export function saveOrUpdateGameStatus(data) {
  return ajax.post($saveOrUpdateGameStatus, data);
}
export function getMessageByUser(data) {
  return ajax.get($getMessageByUser, data);
}
export function readMsg(data) {
  return ajax.get($readMsg, data);
}
export function getIp(data) {
  return ajax.get($getIp, data);
}
export function getIndexSport(data) {
  return ajax.get($getIndexSport, data);
}
export function getHistory(data) {
  return ajax.get($getHistory, data);
}
