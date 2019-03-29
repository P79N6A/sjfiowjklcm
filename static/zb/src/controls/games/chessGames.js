/**
 * 棋牌游戏大厅相关脚本
 * 1、获取游戏数据
 * 2、获取游戏图片，配置了七牛云webp兼容
 * 3、目前仅有MW(大满贯)棋牌，后续将继续增加
 * 
 * 
 */

import {
  getmwqpGames,
} from '@/api/show'
import openWindow from "@/util/openWindow";
import {
  mapGetters
} from "vuex";

export const chessGames = {
  data() {
    return {
      allGames: [],
      loading: true,
      cur: 'KYQP',
      fliterGames: []
    }
  },
  methods: {
    play(obj, e) {
      if (!this.islogin) {
        window.toast("请先登录",'warning');
        return
      }
      let url = ''
      url = this.getGameUrl(obj, false, 'pc')
      // if (url) {
      //   e.currentTarget.target = '_blank'
      //   e.currentTarget.href = url
      // }
      openWindow(url, '大满贯棋牌', 900, 640, true, this.$store.getters.islogin);
    },
    /**
     * 获取游戏链接
     * @param {object} item ({游戏对象})
     * @param {string} device (pc/mobile)
     * @param {boolean} isFun (是否试玩)
     */
    getGameUrl(item, isFun, device) {
      const localUrl = window.location.href
      let url = ''
      const isFunString = isFun ? '1' : '0'
      switch (item.category) {
        case 'MWQP':
          if (device == 'mobile') {
            url = `/game/gameMWQP.php?gameId=${item.code}&isfun=${isFunString}&deviceType=mobile&lobbyUrl=${localUrl}`
          } else {
            url = `/game/gameMWQP.php?gameId=${item.code}&isfun=${isFunString}&deviceType=pc&lobbyUrl=${localUrl}`
          }
          break
        case 'KYQP':
          if (device == 'mobile') {
            url = `/game/gameKYQP.php?gameId=${item.code}&isfun=${isFunString}&deviceType=mobile&lobbyUrl=${localUrl}`
          } else {
            url = `/game/gameKYQP.php?gameId=${item.code}&isfun=${isFunString}&deviceType=pc&lobbyUrl=${localUrl}`
          }
          break
        case 'CITY761':
          if (device == 'mobile') {
            url = `/game/gameCity761.php?gameId=${item.code}&isfun=${isFunString}&deviceType=mobile&lobbyUrl=${localUrl}`
          } else {
            url = `/game/gameCity761.php?gameId=${item.code}&isfun=${isFunString}&deviceType=pc&lobbyUrl=${localUrl}`
          }
          break
        default:
          break;
      }
      return url
    },
    /**
     * 获取游戏数据
     * @param {platform} platform (平台)
     * @param {string} device (pc/mobile)
     */
    getGames(device, platform) {
      return new Promise((resolve, reject) => {
        getmwqpGames(device).then((res) => {
          this.allGames = res
          if (platform) {
            this.fliterGamesData(platform)
          } else {
            this.fliterGamesData(this.cur)
          }
          // 查询一次
          return resolve(res)
        }).catch(err => {
          return reject(err)
        })
      })
    },
    /**
     * 获取游戏封面
     * @param {object} item ({游戏对象})
     * @param {string} device (pc/mobile)
     */
    getImg(item, device) {
      if (device == 'mobile') {
        return `https://www.staticsources.com/images/phone/${item.category.toLowerCase()}games/${item.pic}`
      } else {
        return `https://www.staticsources.com/images/${item.category.toLowerCase()}games/${item.pic}`
      }
    },
    /**
     * 过滤游戏数据
     * @param {platform} device (平台)
     */
    fliterGamesData(platform) {
      if (platform) {
        platform = platform.toUpperCase()
        this.fliterGames = this.allGames.filter(item => {
          return item.category.includes(platform)
        })
      } else {
        this.fliterGames = this.allGames
      }

    }
  },
  computed: {
    ...mapGetters(["islogin"])
  },
  created() {
    this.$bus.$on('selectChessPlatform', eventData => {
      this.cur = eventData
    })
    this.cur = this.$route.params.type
  },
  watch: {
    '$route.params.type'(val) {
      this.cur = val
      console.log(val)
    },
    'cur'(val) {
      this.fliterGamesData(val)
    }
  }
}
