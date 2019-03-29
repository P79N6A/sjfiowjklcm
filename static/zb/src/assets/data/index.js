/**
  跟项目有关的配置信息
 */

// 配置商户有几个老虎机游戏平台，涉及转账
// 老虎机平台
import * as GAMES from 'static/ajax/info/games.json'
// 老虎机平台
const platform = GAMES.slot
// 真人类平台
const real = GAMES.live
// 体育
const sport = GAMES.sport
// 彩票
const lottery = GAMES.lottery
// 棋牌
const chess = GAMES.chess
// 电竞
const competition = GAMES.competition
// 捕鱼
const fish = GAMES.fish
export const platformData = platform
export const realData = real
export const sportData = sport
export const lotteryData = lottery
export const chessData = chess
export const competitionData = competition
export const fishData = fish
// 其他平台，金流相关，转账，存提款
export const Money = GAMES.main.concat(platform).concat(real).concat(sport).concat(lottery).concat(chess).concat(competition).concat(fish)
// 除去主账户 和副账户
export const otherMoney = GAMES.slot.concat(real).concat(sport).concat(lottery).concat(chess).concat(competition).concat(fish)
// 网站配置
import * as CONFIG from 'static/ajax/info/config.json'
export const WEBCONFIG = CONFIG

// 跟商户文案配置有关的内容,新商户，必须要修改以下配置，资料找售前拿
import * as CONTACT from 'static/ajax/info/contact.json'
export const SETTING = CONTACT

import * as domain from 'static/ajax/info/domains.json'
export const Domains = domain.domain

// 相关地址
import * as LINK from 'static/ajax/info/links.json'
export const Download = LINK.Download
export const Games = LINK.Games
