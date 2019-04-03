<template>
    <div id="j-title-content" class="contents" style="display: block;">
        <header class="header-back">
            <a @click="doClick" class="back-link"><i class="iconfont icon-arrow_l"></i></a>
            <slot>
                {{$route.meta.headName||$route.meta.title}}
            </slot>
        </header>
        <div class="center-top">
            <div class="o-wrapper">
                <div class="balance">
                    <p class="amount-tit">主账户余额</p>
                    <div>￥{{wallet['MAIN']}}</div>
                </div>
            </div>
        </div>
        <div class="center-list pay-tabctrl">
            <ul>
                <li class="title" id="deposit-juanZ" v-for="(item,i) in payMenus" @click="setPaytype(item)"
                    :key="i">
                    <i :class="['icobjh',`bjh-${item.type}`]"></i>
                    <div class="deposit-title">
                        {{item.name}}
                        <!-- <img src="./img/ico1.png" v-if="item.rate4deputy" class="tips"> -->
                    </div>
                    <i class="iconay ay-xiangyou"></i>
                </li>
            </ul>
        </div>
        <v-footer></v-footer>
    </div>
</template>
<script>
import {    mapGetters,    mapActions  } from 'vuex'
import {
    depositMenu
  } from '@/controls/money/deposit'
import vFooter from 'mobile/master/t1/show/components/footer'
export default {
    mixins: [depositMenu],
    data(){
        return{

        }
    },
    methods: {
       setPaytype(item) {
        if (this.paySelect == item) return
        this.paySelect = item;
        this.$bus.$emit('setClasses', item);
        this.$router.push({name:'money_depositItem',params:{type:item.type,setClasses:item}})
      },
      doClick(){
        if (this.back && typeof this.back == 'function') {
          this.back();
        } else {
          this.$router.back();
        }
      }
    },
    created() {
      this.getPaymentConfigInfo({terminalType: 1,separateMcpay:1}).then(res=>{
        // 默认选中第一个
        // this.setPaytype(res.data[0])
      }).catch(err=>{
        console.log(err)
      })
    },
    computed: {
        ...mapGetters(["wallet"])
    },
    props: {
      back: {
        type: Function
      }
    },
    components: {vFooter}
}
</script>
<style lang="scss" scoped>
  @import "~mobile/assets/scss/mixin.scss";
    .header-back{
        position: fixed;
        top:0;
        width:100%;
        z-index: 99;
        background:$header-bg;
        color: $main-cl;
        height: r(100);
        text-align: center;
        line-height: r(100);
        @include  f(36px);
        .back-link{
        position: absolute;
        height: 100%;
        left:0;
        width:r(88);
        top:50%;
        transform:translateY(-50%);
        text-align: center;
        }
        .icon-arrow_l{
        @include f(44px)
        }
    }
    .o-wrapper {
        min-height: r(180);
        overflow: hidden;
        background: url('./img/deposit-bg.jpg');
        margin-top: r(100);
        .balance{
            color: #fff;
            text-align: center;
            padding: 20px 0 18px;
            .amount-tit {
                color: #fff;
                padding: 0 0 6px 0;
                @include f(32px);
            }
            div{
                border-radius: 20px;
                color: #fff;
                @include f(32px);
                width: 10em;
                margin: 0 auto;
            }
        }
    }
    .center-list{
        ul,ol,li{
            list-style: none;
            margin: 0;
            padding: 0;
        }
        ul{
            padding-bottom: r(100);
        }
        .title{
            height: r(98);
            line-height: r(98);
            padding: 0 0 0 10px;
            letter-spacing: 0;
            @include f(36px);
            text-indent: 0;
            text-align: left;
            color: #747474;
            border-bottom: 1px solid #e2e2e3;
            position: relative;
            background: #fff;
            margin-bottom: 6px;
            .deposit-title {
                left: r(90);
                position: absolute;
                top: 0px;
                @include f(38px)
            }
            .tips{
                display:inline-block;
                height:r(50);
                margin-left:r(10);
            }
            .iconay{
                @include f(32px);
                position: absolute;
                right: r(10);
            }
            .icobjh{
                @include f(50px);
                position: absolute;
                left: r(30);
            }
        }
    }
</style>
