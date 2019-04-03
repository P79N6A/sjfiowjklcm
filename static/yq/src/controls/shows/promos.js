import {
  queryLatestPreferential,
  findLatestPreferentialById

} from '@/api/show'

export const promos = {
  data() {
    return {
      cur: {},
      show: false,
      filter: '',
      menuData: [],
      allData: [],
      filtType: null,
      details: {},
      searchData: {
        platFormType: 'pc', // 终端
        type: '000', // 所有优惠
        pageIndex: 0, // 取得所有资料
        pageSize: 0 // 取得所有资料
      }

    }
  },
  watch: {

  },
  methods: {
    /**
     *
     * @param {object} obj // 提交的表单
     * @param {object} payInfo // 当前支付方式
     */

    getPromos(type) {
      if (type) {
        this.searchData.platFormType = type
      }
      return new Promise((resolve, reject) => {
        queryLatestPreferential(this.searchData).then(res => {
          if (res.success) {
            this.allData = res.data.records
            this.menuData = res.data.types
            return resolve(res)
          } else {
            return reject(res)
          }
        }).catch(err => {
          return reject(err)
        })
      })
    },
    /**
     *
     */
    readPros(id) {
      return new Promise((resolve, reject) => {
        if (this.details[id]) {
          return resolve(this.details[id])
        }
        findLatestPreferentialById({
          platFormType: this.searchData.platFormType,
          id: id
        }).then(res => {
          if (res.success) {
            this.details[id] = res // 缓存当前数据
            return resolve(res)
          } else {
            return reject(res)
          }
        }).catch(err => {
          return reject(err)
        })
      })
    }
  }
}
