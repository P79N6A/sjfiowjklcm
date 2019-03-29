import {queryCreditlogs} from "@/api/user"


export const creditLog = {
  data() {
    return {
      pageContents: [],
      searchData: {
        starttime: '',
        endtime: '',
        size: 10,
        pageIndex: 1,
        totalRecords: 0
      }
    }
  },
  methods: {
    getDatas(obj) {
      // 加载数据
      return new Promise((resolve, reject) => {
        queryCreditlogs(obj).then(res => {
          if (res.success) {
            // 保存数据
            this.pageContents = res.data.pageContents
            // 保存查询条件
            this.searchData.totalRecords = res.data.totalRecords
            this.searchData.pageIndex = res.data.pageNumber
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
