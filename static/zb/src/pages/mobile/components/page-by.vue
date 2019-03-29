<template>
  <div class="page-by" v-show="mydata.totalPages>1">
    <div class="btn-warp">
      <div class="pageItem" @click="pageFun(1)">第一页</div>
      <div class="pageItem" @click="prev()">上一页</div>
      <div class="pageIndex">第 {{mydata.pageNumber}} / {{mydata.totalPages}}页</div>
      <div class="pageItem" @click="next()">下一页</div>
      <div class="pageItem" @click="pageFun(mydata.totalPages)">最后一页</div>
    </div>
    <!-- <div class="txt-info">
      共{{mydata.totalPages}}页,共{{mydata.totalRecords}}笔
    </div> -->
  </div>
</template>
<script>
  export default {
    props: {
      data: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {pageNumber: 1}
    },
    computed: {
      mydata() {
        let mydateInit = {
          numberOfRecordsShown: 0, //当前页多少条
          pageNumber: 1,//当前页
          size: 0,  //页大小
          totalPages: 0,//总页数，
          totalRecords: 0//总记录条数,
        };
        Object.assign(mydateInit, this.data);
        this.pageNumber = mydateInit.pageNumber;
        return mydateInit;
      }
    },
    methods: {
      pageFun(index) {
        this.$emit("search", index);
      },
      prev() {
        if (this.mydata.pageNumber == 1) return;
        this.pageFun(--this.mydata.pageNumber);
      },
      next() {

        if (this.mydata.pageNumber >= this.mydata.totalPages) return
        this.pageFun(++this.mydata.pageNumber);
      }
    }
  }
</script>
<style lang="scss">
  @import "~mobile/assets/scss/mixin.scss";

  .page-by {
    // margin: r(20) auto;
    // position: absolute;
    // left: 0;
    // bottom: 0;
    background: #ffffff;
    width: 100%;
    padding: r(30) r(20);
    .btn-warp {
      text-align: center;
      display: flex;
      // height: r(47);
      // line-height: r(47);
      justify-content: space-between;
      @include f(24px);
      white-space: nowrap;
      color: #333;
      input {
        background: none;
        border: none;
        width: r(63);
        height: r(47);
        text-align: center;
      }
    }
    .pageItem {
      border: 1px solid rgba($color: #ddd, $alpha: .6);
      border-radius: r(40);
      color: $cl2;
      padding:r(15) r(25);
    }
    .pageIndex {
      padding:r(15) r(25);
      color: $cl4;
    }
    .txt-info {
      text-align: right;
      line-height: r(70);
      color: #333;
    }
  }
</style>
