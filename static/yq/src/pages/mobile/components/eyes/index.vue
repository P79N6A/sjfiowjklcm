<template>
  <span class="pubeyes iconfont icon-yanjing2" @click="checkpwd"></span>
</template>
<script>
export default {
  name: "",
  data() {
    return {};
  },
  props: ["dom"],
  computed: {},
  watch: {},
  methods: {
    checkpwd(e) {
      e.currentTarget.classToggle("icon-yanjing2 icon-yanjing1");
      let dom = e.currentTarget.previousElementSibling;
      if (["text", "password"].indexOf(dom.type) > -1) {
        dom.type = dom.type == "password" ? "text" : "password";
      } else {
        dom = e.currentTarget.nextElementSibling;
        if (["text", "password"].indexOf(dom.type) > -1) {
          dom.type = dom.type == "password" ? "text" : "password";
        }
      }
    }
  },
  created() {},
  activated() {},
  components: {}
};
</script>
<style lang="scss">
@import "~mobile/assets/scss/mixin.scss";
span.pubeyes {
  position: absolute;
  top: 0;
  right: 5%;
  @include f(40px);
  cursor: pointer;
  height: 100% !important;
  color: #4db7f4;
}
</style>
