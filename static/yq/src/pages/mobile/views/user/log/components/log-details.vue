<template>
  <div class="log-detail"> 
    <div class="detail-top">
        <div class="top-title">
            <p class="p"><span class="lefeIcon">{{myAllData.title.substr(0, 1)}}</span>{{myAllData.title}}</p>
            <p>{{myAllData.data.money || myAllData.data.amount || myAllData.data.remit || myAllData.data.ximaAmount}}</p>
        </div>
    </div>
    <div class="text-list-box">
        <div class="text-list cfx" v-for="item in myAllData.thead" :key="item.value">
            <span class="fl">{{item.name}}</span>
            <span class="fr">{{myAllData.data[item.value]}}</span>
        </div>
    </div>
  </div>
</template>
<script>
import {$sessionStorage} from '@/util/storage';
  export default {
    data() {
      return {
          myAllData:{},
          mydata:{},
          mytitle:'',
          mythead:[]
      };
    },
    methods: {
     
    },
    created() {
        if($sessionStorage.get('logData')){
            this.myAllData =JSON.parse($sessionStorage.get('logData')) ;
        }
    },
    activated(){
      if($sessionStorage.get('logData')){
        this.myAllData =JSON.parse($sessionStorage.get('logData')) ;
      }
    },
    components: {
     
    }
  };

</script>
<style lang="scss">
  @import "~mobile/assets/scss/mixin.scss";
  .log-detail {
    background: #ffffff;
    .detail-top{
        padding: r(100) 0 ;
        text-align: center;
        border-bottom: 1px solid rgba($color: #ddd, $alpha: .6);
        .top-title {
            position: relative;
            @include f(32px);
            .p {
                margin-bottom: r(30);
            }
            .lefeIcon {
                background: $cl1;
                color: #ffffff;
                border-radius: 50%;
                width: r(60);
                height: r(60);
                line-height: r(60);
                @include f(28px);
                margin-right: r(10);
                display: inline-block;
            }
        }
    }
    .text-list {
        padding: 0 r(30);
        height: r(80);
        line-height: r(80);
        border-bottom: 1px solid rgba($color: #ddd, $alpha: .6);
        color: #888888;
    }
 }
</style>
