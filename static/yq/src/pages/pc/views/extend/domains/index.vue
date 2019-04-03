<template>
<div class="domain">
    <div class="lineswp">
        <h3>域名线路测试：</h3>
        <div class="linesItems">
            <div class="item" v-for="(item,i) in Domains" :key="i">
                <input type="text" class="ceshi" :value="'时间'+item.time+'秒'">
                =>>
                <input type="text" class="ceshi" :value="item.link">
                =>>
                <a :href="item.link" target="_blank" class="button">前往网址</a>
            </div>
        </div>
        <a href="javascript:void(0);" class="btn" @click.prevent="reload()">刷新</a>
    </div>
</div>
</template>
<script>

  import {
    Domains
  } from "@/assets/data"
export default {
    data() {
        return {
            Domains,
            links:[]
        }
    },
    methods: {
        sort(property){
            return function(a,b){
                let val1 = a[property]
                let val2 = b[property]
                return val1 - val2
            }
        },
        reload(){
            window.location.reload()
        }
    },
    created() {
        let len = this.Domains.length     
        let idx
        let arr = []
        for (let i = 0; i < 8; i++) {
            idx = Math.floor(Math.random()*(len+1))
            if (arr.includes(this.Domains[idx])) {
                idx = Math.floor(Math.random()*(len+1))
            }
            arr[i] = this.Domains[idx]
        }
        if (arr.indexOf(undefined)>-1) {
            arr[arr.indexOf(undefined)] = this.Domains[Math.floor(Math.random()*(len+1))]
        }
        this.links = arr.sort(this.sort('time'))
    },
}
</script>
<style lang="scss" scoped>
.domain{
    width: 100%;
    height: 100vh;
    background: #fff;
    padding-top: 50px;
}
.lineswp{

    width: 960px;
    margin: 0 auto;
    background-color: #fff;
    h3{
        font-size: 25px;
        text-align: center;
        margin: 50px 0;
    }
    .linesItems{
        .ceshi{
            height: 35px;
            padding: 0 20px;
            line-height: 31px;
            border: 1px solid #f60;
            margin: 10px 0 10px 70px;
        }
        .button{
            background: #e16d00;
            height: 35px;
            line-height: 35px;
            cursor: pointer;
            padding: 10px;
            color: #fff;
        }
    }
    .btn{
        background: #e16d00;
        height: 35px;
        line-height: 35px;
        cursor: pointer;
        padding: 10px;
        color: #fff;
        margin-left: 70px;
    }
}
</style>
