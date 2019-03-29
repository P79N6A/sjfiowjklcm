<template>
  <!-- 一键归集 -->
  <transition enter-active-class="animated pulse" leave-active-class="animated zoomOut">
    <div class="process-info" v-show="dialogVisible" @click.self="dialogVisible = false">
      <transition enter-active-class="animated bounceInDown" leave-active-class="animated bounceOutUp">
        <div class="processTable" v-if="dialogVisible">
          <table>
            <tr>
              <th>平台</th>
              <th>余额</th>
              <th>归户金额</th>
              <th>状态</th>
              <th>备注</th>
            </tr>
            <tr v-for="(data,i) in filterTableData" :key="i">
              <td>{{data.gamePlatform}}</td>
              <td>{{data.balance}}</td>
              <td>{{data.realRemit}}</td>
              <td>
                <span v-if="data.status=='PROCESSING'">转账中...</span>
                <span type="success" v-if="data.status=='SUCCESS'">成功</span>
                <span type="info" v-if="data.status=='FAIL'">失败</span>
              </td>
              <td style="text-align:left;">
                <span style="color:red;">{{data.remark}}</span>
              </td>
            </tr>
            <tr v-show="!transferAllIng">
              <td>汇总</td>
              <td></td>
              <td>{{main.totalAmount}}</td>
              <td></td>
              <td></td>
            </tr>
          </table>
          <p style="text-align:center;" v-if="transferAllIng"><img src="./loading.gif"></p>
          <vButton @click="dialogVisible=false" class="frombtn2" v-show="transferAllIng">关闭</vButton>
          <vButton @click="dialogVisible=false" class="frombtn2" v-show="!transferAllIng">确认</vButton>
        </div>
      </transition>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import formTip from "mobile/components/form-tip";
  import vButton from "mobile/components/form/button";
  import {
    mapGetters,
    mapActions,
    mapMutations
  } from "vuex";
  import {
    getTransferOnceProgress
  } from "@/api/payment";

  export default {
    data() {
      return {
        transferAllIng: false,
        main: {},
        dialogVisible: false,
        tableData: []
      };
    },
    computed: {
      filterTableData(){
        return this.tableData.filter((item)=>{
          return item.balance>=1 && !this.transferAllIng
        })
      }
    },
    methods: {
    ...mapActions(["UPDATE_MONEY"]),
      getProgress() {
        window.clearInterval(window.transferTimer)
        window.transferTimes = 0;
        const $this = this
        this.transferAllIng = true
        window.transferTimer = setInterval(() => {
          getTransferOnceProgress()
            .then(res => {
              window.$load.close()
              window.transferTimes++
              if (window.transferTimes > 20) {
                this.closeProgress()
                $this.tableData = res.details;
                $this.main=res.main
              } else if (res.main.status == "SUCCESS") {
                this.closeProgress()
                $this.tableData = res.details;
                $this.main=res.main
              }
            })
            .catch(err => {
              window.$load.close()
              this.closeProgress()
              window.toast(err.message);
            });
        }, 5000)
      },
      closeProgress(){
        window.clearInterval(window.transferTimer)
        this.transferAllIng=false;
      }
    },
    watch: {
      dialogVisible(val) {
        if (val) {
          this.getProgress();
        } else {
          this.closeProgress()
          const $this=this;
          let i=0;
          for(let key in this.wallet){
            i++
            window.setTimeout(()=>{
              $this.UPDATE_MONEY(key);
            },100*i)
          }
        }
      }
    },
    created() {
      this.$bus.$on("showTransferProce", eventData => {
        this.dialogVisible = eventData;
      });
    },
    components: {
      formTip,
      vButton
    }
  };

</script>
<style lang="scss" scoped>
  @import "~mobile/assets/scss/mixin.scss";

  .process-info {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;

    .processTable {
      width: 90vw;
      height: 80vh;
      background: #fff;
      overflow-y: scroll;
      z-index: 9999;
      padding: r(20) r(20) r(100);
      position: relative;

      table {
        table-layout: fixed;
        width: 100%;

        td,
        th {
          @include f(28px);
          padding: r(20) 0;
          text-align: center;
          border: solid 1px #343434;
          word-break: break-all;
        }
      }
    }
  .frombtn2 {
    background: #62afff;
    background: -webkit-gradient(
      linear,
      left top,
      left bottom,
      from(#62afff),
      to(#409eff)
    );
    background: linear-gradient(to bottom, #62afff 0%, #409eff 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#62afff', endColorstr='#409eff',GradientType=0 );
  }
  }

</style>
