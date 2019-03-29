<template>
  <div class="page_content_wrap memberbill">
    <div class="layout_form layout_form04">
      <!-- <search-form @search="search" :data="searchData">
        <div class="form-group-inline" slot="form">
          <span class="form-label">账务类型：</span>
          <div class="form-control">
            <select v-model="searchData.proposalType" class="without_style with_arrow">
              <option v-for="item in type" :value="item.value" :key="item.value">{{item.name}}</option>
            </select>
          </div>
        </div>
      </search-form> -->
      <search-form @search="search" :data="searchData">
        <div class="formbox" slot="form">
          <div class="formItem" 
              v-for="item in type" :key="item.value" 
              @click="searchData.proposalType = item.value;" 
              :class="{active:searchData.proposalType == item.value}">{{item.name}}</div>
        </div>
      </search-form>

      <winlose :searchData='searchData' ref="-1" v-show="searchData.proposalType==-1"></winlose>
      <recharge   v-for="item in type.slice(1)" :searchData="searchData" :key="item.value"
                :ref="item.value" v-show="searchData.proposalType==item.value">
      </recharge>
    </div>
  </div>
</template>
<script>
  import {getAgentQueryType, searchagprofitData, searchsubuserProposalData} from "@/api/agent";
  import tableData from "mobile/components/table-data"
  import searchForm from "mobile/components/search-form"
  import winlose from './components/win-lose';//会员账务  》  输赢
  import recharge from './components/recharge';//会员账务  》  公共页  提款 存款 反水 优惠
  export default {
    data() {
      return {
        type: [{name: "输赢", value: "-1"}],
        searchData: {
          loginname: "",
          tail: "",
          starttime: "",
          endtime: "",
          proposalType: "-1",
          size: 10,
          pageIndex: 1
        }
      }
    },
    methods: {
      search() {
        this.searchData.pageIndex=1
        if (!Array.isArray(this.$refs[this.searchData.proposalType]) ) {
          this.$refs[this.searchData.proposalType].search()
          console.log('111')
        }
        else {
          this.$refs[this.searchData.proposalType][0].search()
          console.log('222')
        }
      }
    },
    created() {
      // 读取账户类型
      getAgentQueryType().then(res => {
        if (res.success) {
          this.type.push(...res.data);
        } else {
          window.toast(res.message)
        }
      }).catch(err => {
        window.toast("类型加载失败")
      })     
    },
    components: {
      tableData, searchForm, winlose, recharge
    }
  }
</script>
<style lang="scss">
@import "~mobile/assets/scss/mixin.scss";
  .memberbill{
    // margin:0 r(10);
    .total{
      line-height:2;
      color: $cl5;
      padding-left: r(15);
    }
    .formbox {
      display: flex;
      justify-content: space-between;
      padding: r(30) ;
      border-bottom: 1px solid rgba($color: #ddd, $alpha: 0.6);
      .formItem {
        border:1px solid  rgba($color: #ddd, $alpha: 0.6);
        padding:r(15) r(36);
        border-radius: r(40);
        text-align: center;
        &.active {
          background:rgba($color: $cl1, $alpha: 0.1);
          border:1px solid  $cl1;
          color: $cl1;
        }
      }
    }
  }
</style>