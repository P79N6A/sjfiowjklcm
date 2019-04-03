<template>
    <div id="j-title-content" class="tech-contents" style="display: block;">
        <div class="center-top">
            <div class="o-wrapper">
                <img src="./images/QHC.png" alt="">
            </div>
        </div>
        <div class="center-list pay-tabctrl">
            <ul>
                <router-link :to="{name:'guideWeixin'}" class="title">
                    <i :class="['left','iconfont','icon-changtiao']"></i>
                    <div class="deposit-title">存款教程</div>
                    <i class="right iconfont icon-xiangyou1"></i>
                </router-link>
                <router-link :to="{name:'guideWechat'}" class="title">
                    <i :class="['left','iconfont','icon-changtiao']"></i>
                    <div class="deposit-title">如何取款</div>
                    <i class="right iconfont icon-xiangyou1"></i>
                </router-link>
                <router-link :to="{name:'guideEbank'}" class="title">
                    <i :class="['left','iconfont','icon-changtiao']"></i>
                    <div class="deposit-title">户内转账教程</div>
                    <i class="right iconfont icon-xiangyou1"></i>
                </router-link>
                <router-link :to="{name:'guideForget'}" class="title">
                    <i :class="['left','iconfont','icon-changtiao']"></i>
                    <div class="deposit-title">忘记密码</div>
                    <i class="right iconfont icon-xiangyou1"></i>
                </router-link>
                <router-link :to="{name:'guideEnrol'}" class="title">
                    <i :class="['left','iconfont','icon-changtiao']"></i>
                    <div class="deposit-title">如何注册账号</div>
                    <i class="right iconfont icon-xiangyou1"></i>
                </router-link>
                <router-link :to="{name:'guideLogin'}" class="title">
                    <i :class="['left','iconfont','icon-changtiao']"></i>
                    <div class="deposit-title">如何登陆账号</div>
                    <i class="right iconfont icon-xiangyou1"></i>
                </router-link>
                <router-link :to="{name:'guideFavorable'}" class="title">
                    <i :class="['left','iconfont','icon-changtiao']"></i>
                    <div class="deposit-title">如何自助申请优惠</div>
                    <i class="right iconfont icon-xiangyou1"></i>
                </router-link>
                <router-link :to="{name:'guideDownloadios'}" class="title">
                    <i :class="['left','iconfont','icon-changtiao']"></i>
                    <div class="deposit-title">奇幻城APP下载指南</div>
                    <i class="right iconfont icon-xiangyou1"></i>
                </router-link>
            </ul>
        </div>
    </div>
</template>
<script>
import {    mapGetters,    mapActions  } from 'vuex'
// import vFooter from 'mobile/master/t1/show/components/footer'
export default {
    data(){
        return{

        }
    },

    computed: {
        ...mapGetters(["userData"])
    },
    props: {
      back: {
        type: Function
      }
    },
    // components: {vFooter}
}
</script>
<style lang="scss" scoped>
  @import "~mobile/assets/scss/mixin.scss";
  .tech-contents{
      padding: 0;
  }
    .o-wrapper {
        min-height: r(243);
        background: url('./images/guide-bg.jpg');
        background-size:100% 100%;
        text-align: center;
        img{
            width: 47%;
            margin-top: r(70);
        }
    }
    .center-list{
        ul,ol,li{
            list-style: none;
            margin: 0;
            padding: 0;
        }
        .title{
            height: r(80);
            line-height: r(80);
            padding: 0 0 0 10px;
            letter-spacing: 0;
            font-size: 1.8rem;
            text-indent: 0;
            text-align: left;
            color: #333;
            border-bottom: 1px solid #e2e2e3;
            position: relative;
            background: #fff;
            margin-bottom: r(10);
            display: block;
            .deposit-title {
                left: r(95);
                position: absolute;
                top: 0px;
                @include f(32px)
            }
            .tips{
                display:inline-block;
                height:r(50);
                margin-left:r(10);
            }
            .right{
                @include f(32px);
                position: absolute;
                right: r(50);
                color: #6a6a6a;
            }
            .left{
                @include f(60px);
                position: absolute;
                top: r(-10);
                color: #44A7E0;
            }
        }
    }
</style>
