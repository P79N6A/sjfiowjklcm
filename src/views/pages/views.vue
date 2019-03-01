<template>
  <div class="Layoutshow-container" v-if="selectNode&&selectNode.value">
    <Layout :layoutTemp="selectNode.value.content" v-if="selectNode.value.content"></Layout>
  </div>
</template>

<script>
import Layout from "./components/Layout";
export default {
  name: "Page401",
  data() {
    return {
      selectNode: {
        value: "test"
      }
    };
  },
  mounted() {
    //监听消息反馈
    window.addEventListener(
      "message",
      event => {
        this.selectNode = event.data;
      },
      false
    );
  },
  methods: {},
  components: {
    Layout
  }
};
</script>