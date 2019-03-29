/**
 * 游戏大厅相关脚本
 * 1、获取游戏数据，目前是一次性，获取所有平台的所有游戏列表，GZIP后50-70KB，不影响用户体验
 * 2、获取游戏图片，配置了七牛云webp兼容
 * 3、本地历史纪录
 * 4、服务器收藏记录
 * 5、未解决，退出后要清空当前历时状态和收藏状态,不能用watch(不仅仅是游戏大厅会用到)
 */
import {
  mapGetters
} from 'vuex'
import {
  getAllGames,
  saveOrUpdateGameStatus
} from '@/api/show'
import {
  queryGameStatus
} from '@/api/user'
import {
  $localStorage
} from '@/util/storage'

// 判断线注的方法

/**
 * rang,string，当前线注条件
 * val，num/string 当前游戏的线注
 */
const lineIncludes = (rang, val) => {
  // 无线注，直接退出
  if (val == undefined) return false
  // 转换成数字
  val = parseInt(val)
  // 如果是1-50这样的，切给开始和结束
  const r = rang.split('-'),
    // 开始
    start = parseInt(r[0]),
    // 结束
    end = r[1] || ''
  // 开始判断区间
  if (end) {
    if (start <= val && val <= end) {
      return true
    }
  } else {
    if (start <= val) {
      return true
    }
  }
  return false
}

export const games = {
  data() {
    return {
      State: ['DEM'], // 这个状态 只能试玩（好像没用的）
      allGames: [], // 加载回来的游戏列表
      fillterData: [], // 筛选后的游戏列表
      hisList: [], // 历史纪录
      favList: [], // 收藏列表
      // 过滤条件
      filter: {
        category: 'PT2TIGER', // 老虎机平台类型
        type: '', // 老虎机类型 :经典,电动吃角子
        line: '', // 老虎机线性类型
        subType: '', // 第二种类型类型(暂时没用)
        tag: '', // 热门 最新等
        his: '', // 是否是历史纪录中玩过
        fav: '' // 是否处于收藏列表中
      }
    }
  },
  methods: {
    // 查询历史记录(未做)
    getHistory() {
      // 读取本地历史纪录
      const HistoryGames = $localStorage && $localStorage.get(`GAME_HISTORY${this.userData.loginname}`)
      //
      this.hisList = HistoryGames ? JSON.parse(HistoryGames) : []
      // if (this.hisList.length > 0) {
      // 遍历游戏列表，设置其历史状态
      this.allGames.every(item => {
        if (this.hisList.indexOf(item.id) > -1) {
          item.his = 'yes'
        } else {
          item.his = 'no'
        }
        return item
      })
      // }
    },
    /**
     * 保存历史纪录
     * gameId,需要保存的游戏的id
     */
    setHistory(gameId) {
      // 当前记录入库
      this.hisList.unshift(gameId)
      // 数组去重
      const historyIndexs = Array.from(new Set(this.hisList))
      // 保存
      $localStorage && $localStorage.set(`GAME_HISTORY${this.userData.loginname}`, JSON.stringify(historyIndexs))
    },
    /**
     * 筛选
     * @param {string} key ('tag')
     * @param {string} val ('HOT')
     */
    search(key, val) {
      // 如果有传入筛选条件，设置一下
      // console.log('----serach----')
      if (key) {
        this.filter[key] = val
      }
      const {
        tag,
        category,
        line,
        his,
        fav
      } = this.filter // 提前拿出筛选条件
      this.fillterData = this.allGames.filter(item => {
        // 过滤数据
        return (category === '' || item.category.includes(category)) // 平台
          &&
          (tag === '' || item.tag.includes(tag)) // 热门
          &&
          (line === '' || lineIncludes(line, item.line)) // 线
          &&
          (his === '' || item.his === his) // 历史
          &&
          (fav === '' || item.fav === fav) // 收藏过
      })
      // console.log(this.fillterData)
      // !this.fillterData.length && this.notFound(); //如果没有数据...
    },
    /**
     * 根据中/英文筛选
     * @param {string} val
     */
    searchByInput(val) {
      console.log(this.filter)
      this.fillterData = this.allGames.filter((item, i) => {
        return (item.name.includes(val) || item.eName.toLowerCase().includes(val)) && (item.tag.includes(this.filter.tag) || this.filter.tag == '')
      })
    },
    /**
     * 获取收藏到游戏
     */
    getFaved() {
      // 查询用户收藏状态
      return new Promise((resolve, reject) => {
        // console.log('get fav')
        queryGameStatus().then(res => {
          if (res.success) {
            this.favList = res.data.gameList ? JSON.parse(res.data.gameList) : []
            // if (favList.length > 0) {
            // console.log('begin')
            // 遍历游戏列表，设置其收藏状态
            this.allGames.every(item => {
              if (this.favList.indexOf(item.id) > -1) {
                item.fav = 'yes'
              } else {
                item.fav = 'no'
              }
              return item
            })
            // }
            // console.log(this.allGames)
            return resolve(res)
          } else {
            // console.log(res)
            return reject(res)
          }
        }).catch(err => {
          console.log(err)
          return reject(err)
        })
      })
    },
    /**
     *
     * @param {Object} item
     */
    setFaved(item) {
      // 已有收藏，再点击则取消
      if (item.fav == 'yes') {
        item.fav = 'no'
        const favIndex = this.favList.indexOf(item.id)
        // console.log(favIndex)
        if (favIndex > -1) {
          // 删除当前记录
          // console.log('delete')
          this.favList.splice(favIndex, 1)
        } else {
          console.log('slkd')
        }
      } else {
        // console.log('入库')

        // 无收藏状态，入库
        item.fav = 'yes'
        // 当前收藏记录入库
        this.favList.unshift(item.id)
      }
      // console.log(item)
      // console.log(this.favList)
      // 提交收藏记录到服务器
      const postData = {
        gameList: JSON.stringify(Array.from(new Set(this.favList)))
      }
      // console.log(postData)
      return new Promise((resolve, reject) => {
        saveOrUpdateGameStatus(postData).then(res => {
          // console.log(res)
          if (res.success) {
            return resolve(res)
          } else {
            return reject(res)
          }
        }).catch(err => {
          console.log(err)
          return reject(err)
        })
      })
    },
    /**
     * 获取游戏列表
     * @param {string} device (pc/mobile)
     */
    getGames(obj) {
      return new Promise((resolve, reject) => {
        getAllGames(obj).then((res) => {
          this.fillterData = this.allGames = res
          // 查询一次
          this.search()
          // 查询本地历史纪录
          // if (this.islogin) {
          //   // 获取收藏列表
          //   this.getFaved().then(res => {
          //     // 用户记录
          //     this.getHistory()
          //     // 更新一次
          //     this.search()
          //   })
          // } else {
          //   this.search()
          // }
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
     * 共4个状态，0：下架，1：真钱/试玩，DEM：只能试玩，PLA：只能真钱
     * 是否可以进入试玩
     * @param {object} item ({游戏对象})
     */
    showTry(item) {
      // 'PLA',只能真钱
      if (item.category === 'TGP') {
        return false
      } else if (item.category === 'CQ9') {
        return false
      } else {
        return item.state !== 'PLA'
      }
    },
    /**
     * 是否可以进入真钱
     * @param {object} item ({游戏对象})
     */
    showPlay(item) {
      // 'DEM',只能试玩
      return item.state != 'DEM'
    },
    /**
     * 获取游戏地址(试玩/真钱)
     * @param {object} item ({游戏对象})
     * @param {boolean} isFun (是否是试玩)
     * @param {string} device (pc/mobile)
     * @param 是否为试玩 ,true 为试玩，false 为真钱
     * @returns {string}
     */
    getGameUrl(item, isFun, device) {
      const localUrl = window.location.href
      let url = '' // 进入游戏的链接
      const isFunString = isFun ? '1' : '0'
      item.his = true
      this.setHistory(item.id)
      switch (item.category) {
        case 'PT':
          if (device == 'mobile') {
            if (isFun) {
              url = ''
            } else {
              url = `/game/gamePT2TIGER.php?gameId=${item.id}&isfun=${isFunString}&deviceType=mobile&lobbyUrl=${localUrl}`
            }
          } else {
            url = `/game/gamePT2TIGER.php?gameId=${item.id}&isfun=${isFunString}&deviceType=pc&lobbyUrl=${localUrl}`
          }
          break
        case 'PT2TIGER':
          if (device == 'mobile') {
            if (isFun) {
              url = ''
            } else {
              url = `/game/gamePT2TIGER.php?gameId=${item.id}&isfun=${isFunString}&deviceType=mobile&lobbyUrl=${localUrl}`
            }
          } else {
            url = `/game/gamePT2TIGER.php?gameId=${item.id}&isfun=${isFunString}&deviceType=pc&lobbyUrl=${localUrl}`
          }
          break
        case 'QT':
          if (device == 'mobile') {
            url = `/game/v2/gameQT.php?gameId=${item.id}&isfun=${isFunString}&deviceType=mobile&lobbyUrl=${localUrl}`
          } else {
            url = `/game/v2/gameQT.php?gameId=${item.id}&isfun=${isFunString}&deviceType=${item.subType == 'H5' ? 'h5' : 'pc'}&lobbyUrl=${localUrl}`
          }
          break
        case 'NT':
          if (device == 'mobile') {
            url = `/game/v2/gameNT.php?gameId=${item.code}&isfun=${isFunString}&deviceType=mobile&lobbyUrl=${localUrl}&gameCode=${item.id}`
          } else {
            url = `/game/v2/gameNT.php?gameId=${item.code}&isfun=${isFunString}&deviceType=pc&lobbyUrl=${localUrl}&gameCode=${item.id}`
          }
          break
        case 'TTG':
          if (device == 'mobile') {
            url = `/game/v2/gameTTG.php?gameId=${item.id}&gameName=${item.code}&isfun=${isFunString}&deviceType=mobile&lobbyUrl=${localUrl}`
          } else {
            url = `/game/v2/gameTTG.php?gameId=${item.id}&gameName=${item.code}&deviceType=pc&isfun=${isFunString}&lobbyUrl=${localUrl}`
          }
          break
        case 'DT':
          if (device == 'mobile') {
            url = `/game/v2/gameDT.php?gameId=${item.id}&isfun=${isFunString}&lobbyUrl=${localUrl}`
          } else {
            url = `/game/v2/gameDT.php?gameId=${item.id}&isfun=${isFunString}&deviceType=pc&lobbyUrl=${localUrl}`
          }
          break
        case 'MGS':
          if (device == 'mobile') {
            url = `/game/v2/gameMGS.php?gameId=${item.id}&isfun=${isFunString}&deviceType=mobile&lobbyUrl=${localUrl}&moduleid=${item.moduleid}`
          } else {
            url = `/game/v2/gameMGS.php?gameId=${item.id}&isfun=${isFunString}&deviceType=${item.subType == 'H5' ? 'h5' : 'pc'}&lobbyUrl=${localUrl}&moduleid=${item.moduleid}`
          }
          break
        case 'PNG':
          if (device == 'mobile') {
            url = `/game/v2/gamePNG.php?gameId=${item.id}&pid=${item.code}&isfun=${isFunString}&deviceType=mobile&lobbyUrl=${localUrl}`
          } else {
            url = `/game/v2/gamePNG.php?gameId=${item.id}&pid=${item.code}&isfun=${isFunString}&deviceType=pc&lobbyUrl=${localUrl}`
          }
          break
        case 'TGP':
          if (device == 'mobile') {
            url = `/game/gameTGP.php?providercode=TGP&gamecode=${item.code}&isfun=${isFunString}&type=1&lobbyUrl=${localUrl}`
          } else {
            url = `/game/gameTGP.php?providercode=TGP&gamecode=${item.code}&isfun=${isFunString}&type=0&lobbyUrl=${localUrl}`
          }
          break
        case 'CQ9':
          if (device == 'mobile') {
            url = `/game/gameCQ9.php?gameId=${item.code}&isfun=${isFunString}&deviceType=mobile&lobbyUrl=${localUrl}`
          } else {
            url = `/game/gameCQ9.php?gameId=${item.code}&isfun=${isFunString}&deviceType=pc&lobbyUrl=${localUrl}`
          }
          break
        case 'PG':
          if (device == 'mobile') {
            url = `/game/gamePG.php?gameId=${item.code}&isfun=${isFunString}&deviceType=mobile&lobbyUrl=${localUrl}`
          } else {
            url = `/game/gamePG.php?gameId=${item.code}&isfun=${isFunString}&deviceType=pc&lobbyUrl=${localUrl}`
          }
          break
        case 'BBSLOT':
          if (device == 'mobile') {
            url = `/game/gameBBSLOT.php?gameId=${item.code}&isfun=${isFunString}&deviceType=mobile&lobbyUrl=${localUrl}`
          } else {
            url = `/game/gameBBSLOT.php?gameId=${item.code}&isfun=${isFunString}&deviceType=pc&lobbyUrl=${localUrl}`
          }
          break
        case 'SW':
          if (device == 'mobile') {
            url = `/game/gameSW.php?gameId=${item.code}&isfun=${isFunString}&deviceType=mobile&lobbyUrl=${localUrl}`
          } else {
            url = `/game/gameSW.php?gameId=${item.code}&isfun=${isFunString}&deviceType=pc&lobbyUrl=${localUrl}`
          }
          break
        case 'LG':
          if (device == 'mobile') {
            url = `/game/gameLG.php?gameId=${item.code}&isfun=${isFunString}&deviceType=mobile&lobbyUrl=${localUrl}`
          } else {
            url = `/game/gameLG.php?gameId=${item.code}&isfun=${isFunString}&deviceType=pc&lobbyUrl=${localUrl}`
          }
          break
        case 'JDBSLOT':
          if (device == 'mobile') {
            url = `/game/gameJDBSLOT.php?gameId=${item.code+'-'+item.id}&isfun=${isFunString}&deviceType=mobile&lobbyUrl=${localUrl}`
          } else {
            url = `/game/gameJDBSLOT.php?gameId=${item.code+'-'+item.id}&isfun=${isFunString}&deviceType=pc&lobbyUrl=${localUrl}`
          }
          break
        case 'MWSLOT':
          if (device == 'mobile') {
            url = `/game/gameMWSLOT.php?gameId=${item.code}&isfun=${isFunString}&deviceType=mobile&lobbyUrl=${localUrl}`
          } else {
            url = `/game/gameMWSLOT.php?gameId=${item.code}&isfun=${isFunString}&deviceType=pc&lobbyUrl=${localUrl}`
          }
          break
        default:
          url = ''
          break
      }
      return url
    },
    /**
     * 进入试玩
     * @param {object} obj
     * @param {EventTarget} e
     */
    tryGame(obj, e, device) {
      let url = ''
      if (obj.state == 'PLA') {
        // PLA状态 不能试玩
        window.toast('该游戏不支持试玩')
      }

      url = this.getGameUrl(obj, true, device)

      if (url) {
        e.currentTarget.target = '_blank'
        e.currentTarget.href = url
      }

      return false
    },
    /**
     * 进入真钱游戏
     * @param {object} obj
     * @param {EventTarget} e
     * @param {String} device
     */
    playGame(obj, e, device) {
      let url = ''
      // DEM状态 不能真玩
      if (obj.state == 'DEM') {
        window.toast('该游戏只能试玩')
        return
      }
      if (!this.islogin) {
        window.toast("请先登录", 'warning');
        return
      }
      if (this.isAgent) {
        window.toast('代理不能进行游戏')
        return
      }

      url = this.getGameUrl(obj, false, device)
      console.log(url)
      console.log(obj)

      if (url) {
        e.currentTarget.target = '_blank'
        e.currentTarget.href = url
        console.log(e.currentTarget)
      }
      return false
    },
    /**
     * 收藏某款游戏
     * @param {object} item
     */
    collect(item) {
      return new Promise((resolve, reject) => {
        // 判断有无登录状态
        if (!this.islogin) {
          return reject({
            message: '请先登录',
            success: false
          })
        } else {
          const $cur = this.statusData.findIndex(el => {
            return el.id === item.id
          })
          if ($cur > -1) {
            this.statusData.splice($cur, 1)
          } else {
            this.statusData.unshift(item)
            this.statusData.length > 18 && this.statusData.pop()
          }
          saveOrUpdateGameStatus({
            gameList: JSON.stringify(this.statusData)
          }).then(res => {
            if ($cur > -1) {
              res.message = '已取消收藏'
            } else {
              res.message = '添加收藏成功'
            }
            return resolve(res)
          }).catch(err => {
            return reject(err)
          })
        }
      })
    }
  },
  watch: {
    '$route'(val) {
      // 根据路由params来筛选平台
      if (val.params && val.params.type) {
        this.filter.category = val.params.type
        this.search()
      }
    },
    islogin(newData, oldData) {
      if (!newData) {
        // console.log(newData, oldData)
        //this.getGames()
      }
    }
  },
  computed: {
    ...mapGetters(['islogin', 'isAgent', 'userData'])
  },
  created() {
    // 监听筛选事件
    this.$bus.$on('serachGame', (key, value) => {
      this.search(key, value)
    })
    // 监听根据中英文名筛选
    this.$bus.$on('searchByInput', eventData => {
      this.searchByInput(eventData)
    })
    // 初始化获取当前平台类型
    if (this.$route.params && this.$route.params.type) {
      this.filter.category = this.$route.params.type
      // H5首页 进入游戏大厅的  由于路由params参数并非老虎机类型  故默认调整为空 筛选全部
      if (this.$route.params.flag) {
        this.filter.category = 'PT2TIGER'
      }
    }
  }
}
