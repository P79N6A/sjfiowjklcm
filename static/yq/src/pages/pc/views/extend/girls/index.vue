<template>
  <div class="girl-container">
    <!-- <iframe src="/static/page/girls/pc.html"></iframe> -->
  </div>
</template>
<script>
import services from "./services";
export default {
  data() {
    return {};
  },
  methods: {},
  components: { services },
  created() {
    location.href = '/static/page/girls/pc.html'
  },
};
</script>
<style lang="scss" scoped>
.girl-container {
  iframe {
    overflow: hidden;
    border: none;
    width: 100%;
    height: 4650px;
    background: #fff;
    padding: 0;
    margin: 0;
  }
}
</style>