<template>
  <button  :class="myClass" @click.prevent="click">
    <slot></slot>
  </button>
</template>
<script>
  export default {
    name: "",
    data() {
      return {}
    },
    props: {
      model:{
        default: -1
      }
    },
    computed: {
      myClass() {
        let $class = "btn-submit ";
        switch(this.model.toString()) {
          case "1":
            $class += " btn-disable ";
            break;
          case "0":
            $class += " btn-reset ";
            break;
        }
        return $class;
      }
    },

    watch: {},
    methods: {
      click(){
        this.$emit('click')
      }
    },
    created() {
    },
    activated() {
    },
    components: {}
  }
</script>
<style lang="scss" scoped>
  @import "~mobile/assets/scss/mixin.scss";
  .btn-submit {
    display: block;
    margin: 0 auto;
    margin-top:r(20);
    background: $cl1;
    text-align: center;
    @include f(36px);
    color: #fff;
    width: 98%;
    border-radius: r(100);
    line-height: r(78);
  }
  .btn-reset{
    background: $btn-bg2;
    margin-top: r(20);
  }
  .btn-disable,.btn-submit[disabled] {
    background: $btn-dis;
    cursor: not-allowed;
  }
</style>
