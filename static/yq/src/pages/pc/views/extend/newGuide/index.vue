<template>
  <div class="newGuide">
    <iframe src="/static/page/newTutorial/index.html"></iframe>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {},
  created() {
    // location.href = '/static/page/newTutorial/index.html'
  },
};
</script>
<style lang="scss" scoped>
.newGuide {
  iframe {
    overflow: hidden;
    border: none;
    width: 100%;
    height: 4710px;
    background: #fff;
    padding: 0;
    margin: 0;
  }
}
</style>