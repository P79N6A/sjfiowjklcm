<template>
    <div class="bankList">
        <div class="bank" v-for="(item,i) in list" :key="i" :class="getClass(item)">
            <div class="bankTitle">
                <span class="bankIco">{{item.bankname.substr(0,1)}}</span>
                <span class="bankName">{{item.bankname}}</span>
            </div>
            <div class="bankNumber">
                **** **** **** {{item.bankno}}
            </div>
        </div>
        <router-link class="bankAdd" :to="{name:'addbank'}" v-if="list.length<3" tag="div">
            <i class="iconcent ct-icon02"></i>
            <p>添加银行卡</p>
        </router-link>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
  import {bank} from "@/controls/common/bank"
  export default {
    mixins: [bank],
    data() {
      return {

      }
    },
    methods: {
        getClass(item){
        switch(item.bankname){
          case "中国银行": return "bg1"
          case "中国农业银行":
          case "农业银行": return "bg2"
          case "光大银行": return "bg3"
          case "交通银行": return "bg4"
          case "民生银行": return "bg5"
          case "中国建设银行":
          case "建设银行": return "bg6"
          case "北京银行": return "bg7"
          case "华夏银行": return "bg8"
          case "邮政储蓄": return "bg9"
          case "兴业银行": return "bg10"
          case "": return "bg11"
          case "工商银行": return "bg12"
          case "招商银行": return "bg13"
          default:
            return "bg11"
        }
      }
    },
    created() {
      this.getBankList()
      this.$bus.$on('getBankList',eventData=>{
        this.getBankList()
      })
    },
    activated(){
      this.getBankList()
    }
  }
</script>
<style lang="scss" scoped>
  @import "~mobile/assets/scss/mixin.scss";
    .bankList{
        padding: r(30);
        background: #f7f7f7;
        min-height: 90vh;
        .bank{
            width: 100%;
            height: r(350);
            padding: r(40) r(30);
            border-radius: 5px 5px 0 0;
            position: relative;
            margin-bottom: r(20);
            background-size: 100% 100%;
            &.bg1{ background-image: url("./images/01.jpg");}
            &.bg2{ background-image: url("./images/02.jpg");}
            &.bg3{ background-image: url("./images/03.jpg");}
            &.bg4{ background-image: url("./images/04.jpg");}
            &.bg5{ background-image: url("./images/05.jpg");}
            &.bg6{ background-image: url("./images/06.jpg");}
            &.bg7{ background-image: url("./images/07.jpg");}
            &.bg8{ background-image: url("./images/08.jpg");}
            &.bg9{ background-image: url("./images/09.jpg");}
            &.bg10{ background-image: url("./images/10.jpg");}
            &.bg11{ background-image: url("./images/11.jpg");}
            &.bg12{ background-image: url("./images/12.jpg");}
            &.bg13{ background-image: url("./images/13.jpg");}
            .bankTitle{
                .bankIco{
                    border-radius: 50%;
                    background: #fff;
                    color:#23AFFF;
                    padding: r(12);
                    display: inline-block;
                    font-weight:bold;
                    @include f(30px);
                }
                .bankName{
                    color: #fff;
                    font-family: PingFangSC-Regular;
                    @include f(28px);
                    margin-left: r(10);
                }
            }
            .bankNumber{
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                font-family: STXihei;
                @include f(36px);
                color: #fff;
                letter-spacing: 4px;
                line-height: r(50);
                width: 90%;
                text-align: center;
            }
        }
        .bankAdd{
            border: 1px dotted #ddd;
            width: 100%;
            background: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            height: r(120);
            .iconcent{
                @include f(38px);
                color: $cl1;
            }
            p{
                font-family: STXihei;
                @include f(28px);
                color: #303030;
                letter-spacing: 0;
                text-align: center;
                padding-left: r(10);
            }
        }
    }
</style>
