<template>
    <div class="u-c-shows">
        <div class="u-c-box">
            <!-- <div class="wallet-menus" v-show="isUser">
                <router-link  :to="{name: 'deposit'}"><div class="u-c-router"><span class="icobjh bjh-Management"></span>存款</div></router-link>
                <router-link  :to="{name: 'transfer'}"><div class="u-c-router"><span class="icobjh bjh-qianbao"></span>户内转账</div></router-link>
                <router-link  :to="{name: 'drawmoney'}"><div class="u-c-router"><span class="icobjh bjh-suo1"></span>提款</div></router-link>
            </div> -->
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>

<script>
import {
mapGetters
} from 'vuex'
export default {
    
    computed: {
      ...mapGetters(['isUser'])
    },
}
</script>

<style lang="scss" scoped>
.u-c-shows{
    .wallet-menus{
        width: 100%;
        // padding: 0 3%;
        margin-bottom: 20px;
        .u-c-router{
            padding: 6px 20px;
            font-size: 16px;
            width: 140px;
            height: 40px;
            line-height: 30px;
            color: #ddd;
            margin-right: 15px;
            text-align: center;
            background: #0a435d;
            display: inline-block;
        }
        .active{
            .u-c-router{
                background: #ed7e12;
                color: #fff;
            }
        }
    }
}
</style>

