<template>
    <div class="other-game-list cfx">
        <a v-for="(item,i) in items" class="gameImg" :key="i+item.name" @click="open(item.href, item.name, 900, 640, true, islogin)">
            <img :src="item.imgsrc" :alt="item.name">
            <div class="div-text">
                <span class="span-text">{{item.name}}</span>
            </div>
        </a>
        <router-link :to="{name:'chessHall',params:{type:'DTQP'}}" class="gameImg" v-if="this.value == 'chess'">
            <img src="./images/dtchess.jpg" alt="">
            <div class="div-text">
                <span class="span-text">DT棋牌</span>
            </div>
        </router-link>
    </div>
</template>
<script>
import openWindow from '@/util/openWindow'
import {mapGetters} from 'vuex'
import {Games} from "@/assets/data"

const real = [
    {name: "AG真人", href: Games.href_ag, imgsrc:require('./images/ag.png')},
    {name: "申博真人", href: Games.href_sunbetH5, imgsrc:require('./images/live-sunbet.jpg')},
    {name: "OG真人", href: Games.href_og, imgsrc:require('./images/og.png')},
    {name: "BBIN真人", href: Games.href_bbin, imgsrc:require('./images/bbin.jpg')},
    {name: "DG真人", href: Games.href_dg_mobile, imgsrc:require('./images/dg.png')},
]
const fish = [
    {name: "JDB捕鱼", href: Games.href_fish_jdb, imgsrc:require('./images/jdbfish.png')},
    {name: "AG捕鱼", href: Games.href_fish_ag, imgsrc:require('./images/agfish.png')},
    {name: "MW捕鱼", href: Games.href_fish_mw_mobile, imgsrc:require('./images/mwfish.png')},
]
const sport = [
    {name: "沙巴体育", href: Games.href_sb_mobile, imgsrc:require('./images/sbsport.png')},
    {name: "新皇冠体育", href: Games.href_ug_mobile, imgsrc:require('./images/ugsport.png')},
    {name: "BTI体育", href: Games.href_bti, imgsrc:require('./images/btisport.png')},   
    {name: "泛亚电竞", href: Games.href_avia, imgsrc:require('./images/fanya.png')},
]
const lottery = [
    {name: "IG时时彩", href: Games.href_ig_ssc_mobile, imgsrc:require('./images/ig1.png')},
    {name: "IG香港彩", href: Games.href_ig_hk_mobile, imgsrc:require('./images/ig2.png')},
    {name: "VR彩票", href: Games.href_vr, imgsrc:require('./images/sport-vr.jpg')},
    {name: "彩播彩票", href: Games.href_cb_mobile, imgsrc:require('./images/cb.jpg')}
]
const chess = [
    {name: "开元棋牌", href: Games.href_kyqp, imgsrc:require('./images/kyqp.jpg')},
    {name: "761棋牌", href: Games.href_city761, imgsrc:require('./images/sport-761.jpg')},
    {name: "幸运棋牌", href: Games.href_lgqp, imgsrc:require('./images/lgqp.png')},
    {name: "BY棋牌", href: Games.href_by, imgsrc:require('./images/by.png')},
]
export default {
    data(){
        return{
            items:[]
        }
    },
    methods: {
        open(url, title, w, h, needLogin, loginState) {
        openWindow(url, title, w, h, needLogin, loginState)
        },
    },
    computed: {
        ...mapGetters(["islogin"])
    },
    props:{
        value:String
    },
    watch:{
        value(val){
            switch (val) {
            case 'real':
                this.items = real;
                break;
            case 'sport':
                this.items = sport;
                break;
            case 'fish':
                this.items = fish;
                break;
            case 'lottery':
                this.items = lottery;
                break;
            case 'chess':
                this.items = chess;
                break;
            }
        }
    },
    created() {       
        switch (this.value) {
        case 'real':
            this.items = real;
            break;
        case 'sport':
            this.items = sport;
            break;
        case 'fish':
            this.items = fish;
            break;
        case 'lottery':
            this.items = lottery;
            break;
        case 'chess':
            this.items = chess;
            break;        
        }       
    }
}
</script>

<style lang="scss">
@import "~mobile/assets/scss/mixin.scss";
.other-game-list{
    display: flex;
    flex-flow: row wrap;
    padding: 0 r(20);
    border-radius:r(25); 
    .gameImg{
        width: 46%;
        display: block;
        margin: r(20) 2%;
        background: $main-bg;
        img{
            width: 100%;
        }
    }
    .div-text {
        padding: r(20) r(10);
        text-align: center;
        .span-text {
            @include f(28px);
            display: inline-block;
            height: r(50);
            line-height: r(50);
        }
    }
}
</style>

