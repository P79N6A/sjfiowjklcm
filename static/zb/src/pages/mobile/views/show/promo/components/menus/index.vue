<template>
    <div class="promotion_select">
      <nav class="promotion_content cfx">
        <span @click="setMenu('')" :class="['promotion_select_item',{active:filter==''}]">全部优惠</span>
        <span v-for="(item,i) in menuData" :class="['promotion_select_item',{active:filter==item.typeId}]" @click="setMenu(item.typeId)" :key="i">
          {{item.typeName}}
        </span>
      </nav>
    </div>

</template>
<script>
  import {
    queryLatestPreferential
  } from '@/api/show'
  export default {
    name: "",
    data() {
      return {
        filter: "",
        menuData:[]
      }
    },
    computed: {},
    watch: {},
    methods: {
      setMenu(type){
        this.filter=type;
        this.$bus.$emit('filtPros',type);
      }
    },
    created() {
      this.$bus.$on('setProMenu',eventData=>{
        this.menuData=eventData;
      })
    },
    activated() {},
    components: {}
  }

</script>
<style lang="scss" scoped>
  @import "~mobile/assets/scss/mixin.scss";
  .promotion_select {
  	padding: r(20);
    .promotion_content {
      width: 100%;
      overflow-y: hidden;
      overflow-x: scroll;
      display: flex;
      justify-content: space-between;
      .promotion_select_item {
        display: block;
        width: 19%;
        height: r(56);
        line-height: r(56);
        text-align: center;
        border-radius: r(25);
        @include f(24px);
        color:#090e1d;
        background:#f4faff;
        transition: all 0.6s;
        overflow: hidden;
        &.active {
          background-color:#ff5544;
          background-image:linear-gradient(-51deg, #ff5544 0%, #ff3751 100%);
          color: #fff;
        }
      }
    }
  }
</style>
