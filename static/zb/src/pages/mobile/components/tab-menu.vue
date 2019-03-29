<template>
  <div class="tab-menu">
    <div v-if="!isLink" v-for="(item,i) in data"
         @click="tabclick(item,i)"
         :key="i"
         :class="['tab-menu-item',{active:index==i}]"
         :style="{width:100/data.length+'%'}">
      <router-link v-if="item.to" class="name" :to="item.to">
        {{item.name}}
      </router-link>
      <a  v-else-if="item.href" target="_blank" class="name" :href="item.href">{{item.name}}</a>
      <div v-else  class="name">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      data: {
        type: Array,
        default() {
          return []
        }
      },
      isLink: {
        type: Boolean,
        default: false
      },
      active: {
        type: Number,
        default: 0
      }
    },
    created() {
      this.index = this.active;
    },
    methods: {
      tabclick(item, i) {
        if(item.method){
          item.method();
        }
        this.index = i;
        this.$emit("tabmenu", item, i)
      }
    },
    data() {
      return {
        index: 0
      }
    }
  }
</script>
<style lang="scss">
  @import "~mobile/assets/scss/mixin.scss";

  .tab-menu {
    display: flex;
    flex-direction: row;
    text-align: center;
    color: #fff;
    height: r(94);
    @include f(28px);
    .tab-menu-item {
      padding: r(10) 0;
      height: r(94);
      line-height: r(74);
      display: block;
      background: #a9257d;
      flex: 1;
      div {
        border-right: 1px solid #d83da4;
        box-shadow: -1px 0 #711452 inset;
      }
      box-sizing: border-box;
      &.tab-menu-item:last-child div {
        border-right: none;
        box-shadow: none;
      }
      &.active {
        background: #2c1f2d;
        div {
          border-right: none;
          box-shadow: none;
        }
      }
    }
  }
</style>
