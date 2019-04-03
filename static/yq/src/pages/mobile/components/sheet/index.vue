<template>
  <transition name="slideBottom">
    <div v-show="curShow" class="sheet">
      <ul class="sheet-list" :style="{ 'margin-bottom': cancelText ? '5px' : '0' }">
        <!--<li v-for="( item, index ) in data" class="sheet-list-item">-->
        <!--{{item.name}}-->
        <!--</li>-->
        <li v-for="( item, index ) in data" class="sheet-list-item" @click.stop="itemClick(item, index)">
          <router-link v-if="item.to" :to="item.to">{{item.name}}</router-link>
          <a v-else :href="item.href||'javascript:;'" :target="item.target">
            {{item.name}}
          </a>
        </li>
      </ul>
      <a class="sheet-btn-cancel" @click.stop="curShow=false" v-if="cancelText!=''">{{ cancelText }}</a>
    </div>
  </transition>
</template>

<script type="text/babel">
  import cover from '@/base/cover/cover';

  export default {
    name: 'mt-sheet',
    mixins: [cover],
    props: {
      cancelText: {
        type: String,
        default: '取消'
      },
      data: {
        type: Array,
        default: () => []
      },
      showModel: {
        default: true
      },
      modelClick: {
        default: true
      }
    },
    data() {
      return {
        curShow: false
      }
    },
    watch: {
      value(val) {
        this.curShow = val;
      },
      curShow(val) {
        this.$emit("input", val)
      }
    },
    methods: {
      itemClick(item, index) {
        if (item.method && typeof item.method === 'function') {
          item.method(item, index);
        }
        this.curShow = false;
      },
    }
  };
</script>
<style lang="scss">
  @import "~mobile/assets/scss/mixin.scss";

  .sheet {
    z-index: 99;
    position: fixed;
    width: 94%;
    text-align: center;
    bottom: 0;
    margin: 0 3%;
    @include f(35px);
    backface-visibility: hidden;
    .sheet-list {
      list-style: none;
      margin: 0;
      border-radius:r(10);
      overflow: hidden;
      padding: 0 2%;
      background-color: #b027a2;
      border:1px solid #b027a2;
    }
    .sheet-list-item {
      display: block;
      line-height: r(74);
      border-top: 1px solid #e843d7;
      color: #fff;
      &:first-child {
        border-top: none;
      }
    }
    .sheet-btn-cancel {
      margin-top: r(23);
      background-color: #b027a2;
      margin-bottom:r(15);
      color: red;
      display: block;
      border:1px solid #b027a2;
      color: #fff;
      border-radius:r(10);
      line-height: r(74);
    }
    .sheet-float-enter, .sheet-float-leave-active {
      transform: translate3d(-50%, 100%, 0);
    }
  }
</style>
