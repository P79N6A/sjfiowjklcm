import {searchsubuserProposalData} from "@/api/agent";

export const memberBill = {
  data() {
    return {
      pageContents: [],
      searchData: {
        loginname: "",
        tail: "",
        total: 0,
        starttime: "",
        endtime: "",
        proposalType: "-1",
        size: 10,
        pageIndex: 1,
        totalRecords:0
      }
    }
  },
  methods: {
    getDatas(obj) {
      // 加载数据
      return new Promise((resolve, reject) => {
        searchsubuserProposalData(obj).then(res => {
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
