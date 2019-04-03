<template>
    <div class="u-c-shows">
        <div class="u-c-box">
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
            color: #666;
            margin-right: 15px;
            text-align: center;
            background: #ebebeb;
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

