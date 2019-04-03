<template>
    <div class="platform">
        <div class="logo" :class="{active:cur == item.value}" @click="choosePlatform(item.value)" v-for="item in chessData" :key="item.value">
            <img :src="getImg(item.value)">
        </div>
    </div>
</template>
<script>
// import {chessData} from "@/assets/data/index"
export default {
    data(){
        return{
            chessData:[{name:'DT棋牌',value:'DTQP'}],
            cur:'DTQP'
        }
    },
    methods:{
        getImg(val){
            return require(`./images/${val}.png`)
        },
        choosePlatform(val){
            // this.$bus.$emit('selectChessPlatform',val)
            this.$router.push({name:'chessHall',params:{type:val}})
            this.cur = val
        }
    }
}
</script>
<style lang="scss" scoped>
    .platform{
        width: 100%;
        background: #110b06;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
        padding: 15px 20px;
        .logo{
            margin-right: 15px;
            padding: 10px 20px;
            cursor: pointer;
            &.active{
                // background: #e2b85a;
                border-radius: 30px;
            }
        }
    }
</style>
