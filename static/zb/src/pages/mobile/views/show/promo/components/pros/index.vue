<template>
    <div class="promotions_content">
      <a class="promotion_item" v-for="item in allData" @click="itemClk(item)" :key="item.id" v-if="!filtType || item.type == filtType">
        
        <img v-lazy="item.activityImageUrl" :alt="item.activitySummary" :title="item.activitySummary">
        <div class="title_wrap">
          <h2>{{item.activityTitle}}</h2>
            <div class="promotion_time icon_with_text">查看详情</div>
        </div>
      </a>
    </div>
</template>
<script>
  import {promos} from '@/controls/shows/promos'
  export default {
    name: "promos-c",
    mixins:[promos],
    data() {
      return {

      }
    },
    methods: {
      itemClk(item, i) {
        this.readPros(item.id).then(res=>{
        this.$bus.$emit('showProDetail',res)

        }).catch(err=>{
          console.log(err)
          window.toast(err.message)
        })
      },
      findActive(){
          if (this.$route.params && this.$route.params.id) {
          const _index = this.allData.findIndex(item=>{
            return item.id==this.$route.params.id
          })
          if(_index>=0){
            this.itemClk(this.allData[_index])
          }
        }
      }
    },
    created(){
      // 筛选事件监听
      this.$bus.$on('filtPros',eventData=>{
        this.filtType=eventData
      })
      this.getPromos('mobile').then(res=>{
        // 设置菜单
        this.$bus.$emit('setProMenu',res.data.types)
        this.findActive()
      }).catch(err=>{
        window.toast(err.message)
      })
    },
    activated(){
        // 是否要显示
        this.findActive()
    }
  }

</script>
<style lang="scss" scoped>
  @import "~mobile/assets/scss/mixin.scss";
  .promotion_item {  
    display: block;
    padding:r(20) r(20) 0 r(20);
    border-radius: r(20);
    overflow: hidden;
    img {
      display: block;
      width: 100%;
      height: r(250);
    }
    .title_wrap {
      position: relative;
      padding:r(20);
      background: $main-bg;
        h2 {
        @include f(28px);
        font-weight: normal;
        color: #fff;
        width: 80%;
        overflow: hidden;

      }
    }
    .icon_with_text{
      position: absolute;
      top: 50%;
      right: r(20);
      transform: translateY(-50%);
      color:#ff2c3e;
      background: #fff;
      border-radius: r(25);
      padding: r(10) r(20);
    }
  }
</style>
