<template>
  <transition name="mint-toast-pop">
    <div class="mint-toast" v-show="visible" :class="customClass"
         :style="{ 'padding': iconClass === '' ? '10px' : '20px' }">
      <i class="mint-toast-icon" :class="iconClass" v-if="iconClass !== ''"></i>
      <span class="mint-toast-text" >{{ message }}</span>
    </div>
  </transition>
</template>
<style lang="scss">
  @import "~mobile/assets/scss/mixin.scss";
  .mint-toast {
    position: fixed;
    margin-top: r(50);
    width:65%;
    border-radius: r(10);
    background: rgba(0, 0, 0, 0.9);
    color: #fff;
    box-sizing: border-box;
    text-align: center;
    z-index:9000;
    -webkit-transition: opacity .3s linear;
    transition: opacity .3s linear;
    &.is-placebottom {
      bottom: r(50);
      left: 50%;
      -webkit-transform: translate(-50%, 0);
      transform: translate(-50%, 0)
    }
    &.is-placemiddle {
      left: 50%;
      top: 50%;
      -webkit-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%)
    }
    &.is-placetop {
      top: r(100);
      left: 50%;
      -webkit-transform: translate(-50%, 0);
      transform: translate(-50%, 0)
    }
    .mint-toast-icon {
      display: block;
      text-align: center;
      @include f(56px)
    }
    .mint-toast-text {
      @include f(38px);
      padding:r(20);
      width: 100%;
      line-height: 1.2;
      display: inline-block;
      text-align: center
    }
  }
  .mint-toast-pop-enter, .mint-toast-pop-leave-active {
    opacity: 0
  }
</style>
<script type="text/babel">
  export default {
    props: {
      message: String,
      className: {
        type: String,
        default: ''
      },
      position: {
        type: String,
        default: 'middle'
      },
      iconClass: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        visible: false
      };
    },
    computed: {
      customClass() {
        var classes = [];
        switch (this.position) {
          case 'top':
            classes.push('is-placetop');
            break;
          case 'bottom':
            classes.push('is-placebottom');
            break;
          default:
            classes.push('is-placemiddle');
        }
        classes.push(this.className);
        return classes.join(' ');
      }
    }
  };
</script>
