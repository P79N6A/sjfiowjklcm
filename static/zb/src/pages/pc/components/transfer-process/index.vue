<template>
        <transition enter-active-class="animated pulse" leave-active-class="animated zoomOut">
          <div class="process-info" v-show="dialogVisible">
            <transition enter-active-class="animated bounceInDown" leave-active-class="animated bounceOutUp">
              <div class="process-info-wrap" v-show="dialogVisible">
                <div class="btn-close" @click="dialogVisible = false"></div>
                <h2 class="process-activityTitle">资金一键归户</h2>
                <div class="process-info-content">
                  <div class="content-info" >
                    <table class="processTable" v-loading="transferAllIng" element-loading-text="请求正在执行，请稍等...">
                      <tbody>
                        <tr>
                          <td width="100px">游戏平台</td>
                          <td width="100px">余额</td>
                          <td width="100px">归户金额</td>
                          <td width="100px">归户状态</td>
                          <td>备注</td>
                        </tr>
                        <!-- <tr>
                          <td width="100px">归户成功</td>
                        </tr> -->
                        <tr v-for="(trData,i) in filterTableData" :key="i">
                          <td>{{trData.gamePlatform}}</td>
                          <td>{{trData.balance}}</td>
                          <td>{{trData.realRemit}}</td>
                          <td>
                            <el-tag v-if="trData.status=='PROCESSING'">归户中...</el-tag>
                            <el-tag type="success" v-if="trData.status=='SUCCESS'">成功</el-tag>
                            <el-tag type="info" v-if="trData.status=='FAIL'">失败</el-tag>
                          </td>
                          <td><span style="color:red;">{{trData.remark}}</span></td>
                        </tr>
                        <tr v-show="!transferAllIng">
                          <td>汇总</td>
                          <td></td>
                          <td>{{main.totalAmount}}</td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td colspan="5">
                            <el-button type="danger" @click="dialogVisible = false" v-show="!transferAllIng">关闭</el-button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </transition>
</template>
<script>
  import {validateBankNo, bindBankNo} from "@/api/payment";
import { mapGetters, mapActions, mapMutations } from "vuex";
import { getTransferOnceProgress } from "@/api/payment";
  import  check from "@/util/RegExp"
  export default {
    props:{value:Boolean},
    data() {
      return {
        dialogVisible:false,
        transferAllIng:false,
        main:{},
        tableData: []
      };
    },
    methods: {
    ...mapActions(["UPDATE_MONEY"]),
      getProgress() {
        this.transferAllIng=true;
        window.clearInterval(window.transferTimer)
        window.transferTimes=0;
        const $this=this
        // 5s定时查询接口
        window.transferTimer=setInterval(()=>{
          getTransferOnceProgress()
            .then(res => {
              window.$load.close()
              window.transferTimes++
              // 请求上限20次
              if(window.transferTimes>20){
                this.closeProgress()
                $this.tableData = res.details;
                $this.main=res.main
              }
              // 请求正常成功
              else if(res.main.status == "SUCCESS") {
                this.closeProgress()
                $this.tableData = res.details;
                $this.main=res.main
              }
            })
            // 请求失败
            .catch(err => {
              this.closeProgress()
              window.$load.close()
              window.toast(err.message);
            });
        },5000)
      },
      closeProgress(){
        window.clearInterval(window.transferTimer)
        this.transferAllIng=false;
      }
    },
  computed: {
    ...mapGetters(["wallet"]),
    filterTableData(){
      return this.tableData.filter((item)=>{
        return item.balance>=1 && !this.transferAllIng
      })
    }
  },
  watch: {
    dialogVisible(val) {
      if (val) {
      this.getProgress();
      }else{
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
        console.log('tell me')

      this.dialogVisible = eventData;
    });
  }
  };
</script>
<style lang="scss" scoped>
  .process-info {
    position: fixed;
    background: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1000;
    text-align: center;
    &::before {
      content: "";
      height: 100%;
      display: inline-block;
      vertical-align: middle;
    }
    .process-info-wrap {
      position: relative;
      width: 750px;
      vertical-align: middle;
      height: 600px;
      display: inline-block;
      background:#fff;
      // background: url(/static/images/logo.png) bottom right no-repeat #fff;
      padding-bottom: 40px;
      border-radius: 20px;
      overflow: hidden;
    }
    .btn-close {
      position: absolute;
      top: 12px;
      right: 20px;
      cursor: pointer;
      height: 40px;
      width: 40px;
      background: url(./images/close.png) no-repeat;
    }
    .join-btn {
      position: absolute;
      top: 70px;
      right: 20px;
      border: 2px solid #ffffff;
      padding: 4px 20px;
      border-radius: 10px;
      cursor: pointer;
      color: #7f5400;
      background: #fff300;
      /* Old browsers */
      background: -moz-linear-gradient(
        top,
        #fff300 0%,
        #ffc739 50%,
        #fff300 100%
      );
      /* FF3.6-15 */
      background: -webkit-linear-gradient(
        top,
        #fff300 0%,
        #ffc739 50%,
        #fff300 100%
      );
      /* Chrome10-25,Safari5.1-6 */
      background: linear-gradient(
        to bottom,
        #fff300 0%,
        #ffc739 50%,
        #fff300 100%
      );
      /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
      filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#fff300', endColorstr='#fff300', GradientType=0);
      /* IE6-9 */
    }
    .process-activityTitle {
      text-align: center;
      height: 70px;
      line-height: 70px;
      color: #ffffff;
      font-size: 36px;
      border-radius: 10px 10px 0 0;
      background: #62afff;
      background: -webkit-gradient(linear, left top, left bottom, from(#62afff), to(#409eff));
      background: linear-gradient(to bottom, #62afff 0%, #409eff 100%);
      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#62afff', endColorstr='#409eff', GradientType=0);
    }
    .process-info-content {
      margin-top: 20px;
      padding:0 20px;
      line-height: 1;
      height: 510px;
      text-align: left;
      font-size: 16px;
      line-height:1.5;
      // overflow-y: auto;
      color: #000;
    }
    .content-info {
      overflow: hidden;
      height: 100%;
      padding-bottom: 20px;
      &:hover{
        overflow-y:scroll;
      }
    }
    .processTable{
      table-layout: fixed;
      width:100%;
      border-collapse:collapse;
      td{
        text-align:center;
        padding:8px;
        border:solid 1px #ececec;
      }
    }
  }
</style>
